/**
 * importPlacementFromPdf.js
 * Scans public/raw/placement/ for PDFs, extracts text, parses passages/questions/answers,
 * then writes src/data/placement/{level}.js stubs and extraction_review.md.
 *
 * Usage: node scripts/importPlacementFromPdf.js
 * Install dep first: npm install --save-dev pdf-parse
 */

import { createRequire } from 'module'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
// Use the lib entry directly to avoid the test-file side-effect in the index
const pdfParse = require('pdf-parse/lib/pdf-parse.js')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

// ─── Paths ────────────────────────────────────────────────────────────────────
const PLACEMENT_PDF_DIR = path.join(ROOT, 'public', 'raw', 'placement')
const RAW_PDF_DIR = path.join(ROOT, 'public', 'raw')  // fallback for level-named folders
const RAW_EXTRACTED_DIR = path.join(ROOT, 'src', 'data', 'placement', 'rawExtracted')
const DATA_DIR = path.join(ROOT, 'src', 'data', 'placement')
const REVIEW_FILE = path.join(ROOT, 'extraction_review.md')

// ─── Skill label mapping ──────────────────────────────────────────────────────
const SKILL_MAP = {
  'main idea and details': '主旨与细节',
  'vocabulary': '词汇理解',
  'make inferences': '推理判断',
  'draw conclusions': '推理判断',
  'make inferences / draw conclusions': '推理判断',
  'cause and effect': '因果关系',
  'compare and contrast': '比较理解',
  'classify information': '分类理解',
  'sequence events': '顺序理解',
  'story elements': '故事要素',
  "author's purpose": '作者意图',
  'analyze character': '人物分析',
  'problem and solution': '问题解决',
  'fact or opinion': '事实判断',
  "author's point of view": '作者观点',
}

function mapSkill(raw) {
  if (!raw) return { zh: '', unknown: false }
  const key = raw.trim().toLowerCase()
  if (SKILL_MAP[key]) return { zh: SKILL_MAP[key], unknown: false }
  // partial matches
  for (const [k, v] of Object.entries(SKILL_MAP)) {
    if (key.includes(k)) return { zh: v, unknown: false }
  }
  return { zh: raw.trim(), unknown: true }
}

// ─── questionZh generation ────────────────────────────────────────────────────
function generateQuestionZh(question) {
  const q = question.toLowerCase().trim()
  if (q.includes('main idea')) return '这篇文章主要讲什么？'
  if ((q.includes('what does') && q.includes('mean')) || q.includes('which word means')) {
    // Try to extract the word from quotes or "the word X"
    const quoteMatch = question.match(/[""]([^""]+)[""]/)
    const wordMatch = question.match(/the word[s]?\s+"?([A-Za-z]+)"?/i) ||
                      question.match(/what does\s+"?([A-Za-z]+)"?\s+mean/i)
    const word = (quoteMatch && quoteMatch[1]) || (wordMatch && wordMatch[1]) || ''
    return word ? `"${word}" 是什么意思？` : '这个词是什么意思？'
  }
  if (q.startsWith('why')) return '为什么...？'
  if (q.startsWith('how did') || q.startsWith('how does')) return '...是怎样的？'
  if (q.startsWith('where')) return '...在哪里？'
  if (q.startsWith('when')) return '...是什么时候发生的？'
  if (q.startsWith('who')) return '...是谁？'
  if (q.includes('first') || q.includes('next') || q.includes('last') ||
      q.includes('then') || q.includes('after')) return '顺序是什么？'
  if (q.includes('according to') || q.includes('based on')) return '根据文章...'
  if (q.includes('best describes') || q.includes('best title')) return '哪个最准确？'
  if (q.includes('most likely')) return '最有可能是什么？'
  if (q.includes('feel') || q.includes('feeling')) return '...有什么感受？'
  if (q.includes('purpose') || q.includes('author')) return '作者的目的是什么？'
  return '请根据文章内容作答。'
}

// ─── Passage type detection ───────────────────────────────────────────────────
function detectPassageType(title, text) {
  const combined = (title + ' ' + text).toLowerCase()
  let fiction = 0
  let nonfiction = 0

  // Fiction indicators
  if (combined.includes(' said')) fiction++
  if (combined.includes(' asked')) fiction++
  if (combined.includes(' felt')) fiction++
  if (combined.includes(' thought')) fiction++
  if (combined.includes(' smiled')) fiction++
  if (combined.includes(' cried')) fiction++
  if (/[""]/.test(combined)) fiction++
  if (combined.includes('once upon')) fiction += 2
  if (combined.includes('one day')) fiction++
  // Check for proper names mid-sentence (capitalized word not at sentence start)
  const properNameMatches = text.match(/(?<=[a-z,;]\s)[A-Z][a-z]+/g)
  if (properNameMatches && properNameMatches.length >= 2) fiction++

  // Nonfiction indicators
  if (combined.includes('there are')) nonfiction++
  if (combined.includes('there is')) nonfiction++
  if (combined.includes('scientists')) nonfiction++
  if (combined.includes('researchers')) nonfiction++
  if (combined.includes('you can')) nonfiction++
  if (combined.includes('in fact')) nonfiction++
  if (combined.includes('for example')) nonfiction++
  if (combined.includes('how to')) nonfiction++
  if (/\d+%|\d+\s*(million|billion|thousand|hundred)/.test(combined)) nonfiction++

  if (fiction === nonfiction || Math.abs(fiction - nonfiction) < 2) {
    return { type: 'unknown', typeLabel: '待确认', uncertain: true }
  }
  if (fiction > nonfiction) return { type: 'fiction', typeLabel: '虚构', uncertain: false }
  return { type: 'nonfiction', typeLabel: '非虚构', uncertain: false }
}

// ─── Parse RAZ Benchmark Passage test PDF ─────────────────────────────────────
// Handles two sub-formats:
//   B-style: question number alone on a line ("1"), then question text, then "A" alone, then option text
//   F-style: "1. question text" inline, then "A " (trimmed to "A") alone, then option text
// All formats: questions numbered 1–5 per passage; passages matched positionally to passage-text blocks.
function parseTestText(rawText) {
  const passages = []
  const warnings = []

  const blocks = rawText.split(/www\.readinga-z\.com/i).map(b => b.trim()).filter(b => b.length > 0)

  const STANDALONE_Q_RE = /^(\d+)\.?\s*$/m   // "1" or "1." alone on a line
  const INLINE_Q_RE = /^(\d+)\.\s+\S/m        // "1. question text" inline
  const OPTION_RE = /^[A-D]\s*$/              // option letter with optional trailing space
  const BOILERPLATE_RE = /Learning A|All rights reserved|Benchmark Passage Quick Check|Instructions:|^Name\s|^Name\s*Date/
  const WORD_COUNT_RE = /^Word Count:/
  const BENCHMARK_RE = /Benchmark Passage/

  // Separate blocks into passage-text blocks and question blocks (in document order)
  const passageTextBlocks = []   // { title, text }
  const questionBlocks = []      // { lines, explicitTitle, format: 'standalone'|'inline' }

  for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0)
    if (lines.length < 2) continue

    const hasWordCount = WORD_COUNT_RE.test(block)
    const hasBenchmark = BENCHMARK_RE.test(block)
    const hasStandaloneQ = STANDALONE_Q_RE.test(block)
    const hasInlineQ = INLINE_Q_RE.test(block)
    const hasQuestions = hasStandaloneQ || hasInlineQ
    const isPassageBlock = (hasWordCount || hasBenchmark) && !hasInlineQ

    if (isPassageBlock && !hasStandaloneQ) {
      // Passage prose block — extract title and text
      const firstReal = lines.find(l => !l.includes('www.') && !BOILERPLATE_RE.test(l) &&
                                        !l.startsWith('©') && l.length > 1 && !/^\[/.test(l))
      const title = (firstReal || `Passage ${passageTextBlocks.length + 1}`).trim()
      const copyrightIdx = lines.findIndex(l => l.includes('Learning A') || l.startsWith('©'))
      const endIdx = copyrightIdx >= 0 ? copyrightIdx : lines.length
      const proseLines = lines.slice(1, endIdx).filter(l =>
        !BOILERPLATE_RE.test(l) && !l.startsWith('[') && !l.startsWith('Image') &&
        !l.startsWith('©') && !l.includes('www.') && !/^[A-Z]$/.test(l) &&
        !l.includes('Benchmark') && !WORD_COUNT_RE.test(l)
      )
      const text = proseLines.map(l => l.replace(/\s{2,}/g, ' ')).join('\n').trim()
      passageTextBlocks.push({ title, text })
    } else if (hasQuestions) {
      // Question block — find explicit title if present
      let explicitTitle = null
      for (let i = 0; i < Math.min(lines.length, 6); i++) {
        const l = lines[i]
        if (/^[A-Z]$/.test(l)) continue          // level letter (single uppercase)
        if (/^\d/.test(l)) break                   // hit first question — no title before it
        if (!l.includes('www.') && l.length > 2 && !BOILERPLATE_RE.test(l)) {
          explicitTitle = l; break
        }
      }
      const format = hasInlineQ ? 'inline' : 'standalone'
      questionBlocks.push({ lines, explicitTitle, format })
    }
  }

  // Parse each question block, using positional fallback to passage-text block for title/text
  for (let qi = 0; qi < questionBlocks.length; qi++) {
    const { lines, explicitTitle, format } = questionBlocks[qi]
    const passageInfo = passageTextBlocks[qi]
    const title = explicitTitle || (passageInfo && passageInfo.title) || `Passage ${qi + 1}`
    const text = (passageInfo && passageInfo.text) || ''
    const questions = []
    let i = 0

    // Skip to first question number
    while (i < lines.length && !/^\d/.test(lines[i])) i++

    while (i < lines.length) {
      const line = lines[i]

      if (BOILERPLATE_RE.test(line) || line === 'Benchmark Passage' || line === 'Answer Sheet') { i++; continue }

      // F-style inline question: "1. question text (possibly multiline)"
      const inlineM = line.match(/^(\d+)\.\s+(.+)$/)
      if (inlineM) {
        const localQNum = parseInt(inlineM[1], 10)
        let questionText = inlineM[2]
        i++
        while (i < lines.length && !OPTION_RE.test(lines[i]) && !lines[i].match(/^\d+\./) &&
               !BOILERPLATE_RE.test(lines[i])) {
          questionText += ' ' + lines[i]; i++
        }
        const options = []
        while (i < lines.length && OPTION_RE.test(lines[i])) {
          const key = lines[i].trim(); i++
          let optText = ''
          while (i < lines.length && !OPTION_RE.test(lines[i]) && !lines[i].match(/^\d+\./) &&
                 !BOILERPLATE_RE.test(lines[i])) {
            optText += (optText ? ' ' : '') + lines[i]; i++
          }
          if (optText) options.push({ key, text: optText.trim() })
        }
        if (options.length < 2) warnings.push(`Q${localQNum} (${title}): fewer than 2 options`)
        questions.push({ id: localQNum, question: questionText.trim(), questionZh: generateQuestionZh(questionText), options, answer: '', skill: '' })
        continue
      }

      // B-style standalone question number: "1" or "1."
      const standaloneM = line.match(/^(\d+)\.?\s*$/)
      if (standaloneM) {
        const localQNum = parseInt(standaloneM[1], 10)
        i++
        let questionText = ''
        while (i < lines.length && !OPTION_RE.test(lines[i]) && !/^\d+\.?\s*$/.test(lines[i]) &&
               !BOILERPLATE_RE.test(lines[i])) {
          questionText += (questionText ? ' ' : '') + lines[i]; i++
        }
        const options = []
        while (i < lines.length && OPTION_RE.test(lines[i])) {
          const key = lines[i].trim(); i++
          let optText = ''
          while (i < lines.length && !OPTION_RE.test(lines[i]) && !/^\d+\.?\s*$/.test(lines[i]) &&
                 !BOILERPLATE_RE.test(lines[i])) {
            optText += (optText ? ' ' : '') + lines[i]; i++
          }
          if (optText) options.push({ key, text: optText.trim() })
        }
        if (options.length < 2) warnings.push(`Q${localQNum} (${title}): fewer than 2 options`)
        questions.push({ id: localQNum, question: questionText.trim(), questionZh: generateQuestionZh(questionText), options, answer: '', skill: '' })
        continue
      }

      i++
    }

    if (questions.length > 0) {
      const typeInfo = detectPassageType(title, text)
      if (typeInfo.uncertain) warnings.push(`Passage "${title}": type uncertain`)
      passages.push({
        id: `P${qi + 1}`,
        title,
        type: typeInfo.type,
        typeLabel: typeInfo.typeLabel,
        typeUncertain: typeInfo.uncertain,
        text,
        questions,
      })
    }
  }

  if (passages.length === 0) warnings.push('No passages detected — check rawExtracted txt file manually')

  return { passages, warnings }
}

// ─── Parse RAZ Benchmark answer PDF ──────────────────────────────────────────
// Two formats:
//   F-style: clean answer key only; each block: level, title, 1. \n A \n Skill
//   B-style: full PDF with answer sheets appended; each sheet after "Answer Sheet"
// Both formats number answers 1-5 per passage; globalNum = (passageIdx * 5) + localNum
function parseAnswerText(rawText) {
  const answers = {}
  const warnings = []

  // Split into blocks by "www.readinga-z.com"
  const blocks = rawText.split(/www\.readinga-z\.com/i).map(b => b.trim()).filter(b => b.length > 0)

  // Identify answer sheet blocks (contain "Answer Sheet" or are F-style clean answer key)
  // Answer key block heuristic: contains answer letter lines (^[A-D]$) and skill words but NOT full prose
  const answerBlocks = blocks.filter(b => {
    const hasAnswerSheet = b.includes('Answer Sheet')
    const hasQuestionNumbers = /^\d+\.?\s*$/m.test(b)
    return hasAnswerSheet && hasQuestionNumbers
  })

  let passageIdx = 0

  for (const block of answerBlocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0)
    // Skip header lines (level letter, title, "Answer Sheet" etc.)
    // Parse: question number, answer letter, skill
    const baseNum = passageIdx * 5
    let qNum = null
    let i = 0

    // Find where actual answers start (skip past "Answer Sheet" header)
    const answerSheetIdx = lines.findIndex(l => l === 'Answer Sheet')
    const startIdx = answerSheetIdx >= 0 ? answerSheetIdx + 1 : 0

    for (i = 0; i < lines.length; i++) {
      const line = lines[i]
      const numM = line.match(/^(\d+)\.?\s*$/)
      if (numM) {
        qNum = parseInt(numM[1], 10)
        continue
      }
      if (qNum !== null && /^[A-D]$/.test(line)) {
        const globalNum = baseNum + qNum
        // Next line (or same line remainder) has option text + skill
        // Skill is usually at the END of the next line: "option text Skill Words"
        const nextLine = lines[i + 1] || ''
        const skillRaw = extractSkillFromLine(nextLine)
        const { zh: skillZh, unknown } = mapSkill(skillRaw)
        if (unknown && skillRaw) {
          warnings.push(`Q${globalNum}: unknown skill label "${skillRaw}"`)
        }
        answers[globalNum] = { answer: line, skill: skillZh, skillRaw }
        qNum = null
        continue
      }
    }
    passageIdx++
  }

  return { answers, warnings }
}

function extractSkillFromLine(line) {
  if (!line) return ''
  // Known skill phrases to extract from end of option text
  const skillPhrases = [
    'Main Idea and Details', 'Make Inferences / Draw Conclusions', 'Make Inferences',
    'Makes Inferences / Draw Conclusions', 'Cause and Effect', 'Compare and Contrast',
    'Classify Information', 'Sequence Events', 'Sequence  Events',
    'Story Elements', "Author's Purpose", "Author's Point of View",
    'Analyze Character', 'Problem and Solution', 'Fact or Opinion', 'Vocabulary',
    'Author\'s Purpose', 'Analyze  Character', 'Author\'s  Purpose',
  ]
  for (const phrase of skillPhrases) {
    if (line.toLowerCase().includes(phrase.toLowerCase())) return phrase
  }
  // Fallback: last word(s) that look like a skill
  const trimmed = line.trim()
  const words = trimmed.split(/\s+/)
  if (words.length <= 3 && /^[A-Z]/.test(words[0])) return trimmed
  return ''
}

// ─── Merge answers into passages ──────────────────────────────────────────────
// answers are keyed by global question number (1-20);
// passage questions have local IDs (1-5), so globalNum = passageIdx*5 + localId
function mergeAnswers(passages, answers) {
  const warnings = []
  for (let pi = 0; pi < passages.length; pi++) {
    const passage = passages[pi]
    const baseNum = pi * 5
    for (const q of passage.questions) {
      const globalNum = baseNum + q.id
      const ans = answers[globalNum]
      if (ans) {
        q.answer = ans.answer
        q.skill = ans.skill
        if (q.options.length > 0 && !q.options.find(o => o.key === ans.answer)) {
          warnings.push(`Q${globalNum}: answer "${ans.answer}" doesn't match options [${q.options.map(o => o.key).join(',')}]`)
        }
      } else {
        warnings.push(`Q${globalNum} (passage ${pi + 1}): no answer found`)
      }
    }
  }
  return warnings
}

// ─── Generate JS file content ─────────────────────────────────────────────────
function generateJsContent(level, testPdfPath, answerPdfPath, passages, parseWarnings, pdfDirPrefix) {
  const varName = `placement${level}`
  const prefix = pdfDirPrefix || `/raw/placement/${level}`
  const hasAnyPassage = passages.length > 0
  const totalQ = passages.reduce((s, p) => s + p.questions.length, 0)

  const passagesStr = passages.map((p, pi) => {
    const baseNum = pi * 5
    const qStr = p.questions.map(q => {
      const globalId = baseNum + q.id
      const optStr = q.options.map(o => `          { key: '${o.key}', text: ${JSON.stringify(o.text)} }`).join(',\n')
      const ansComment = !q.answer ? ' // TODO: verify — answer missing' : ''
      const zhComment = ' // TODO: verify — auto-generated'
      return `        {
          id: ${globalId},
          question: ${JSON.stringify(q.question)},
          questionZh: ${JSON.stringify(q.questionZh)},${zhComment}
          options: [
${optStr}
          ],
          answer: ${JSON.stringify(q.answer)},${ansComment}
          skill: ${JSON.stringify(q.skill)},
        }`
    }).join(',\n')

    const typeComment = p.typeUncertain ? ' // TODO: verify — type uncertain' : ''
    const noQComment = p.questions.length === 0 ? '\n      // PARSE FAILED — fill manually' : ''
    return `    {
      id: ${JSON.stringify(p.id)},
      title: ${JSON.stringify(p.title)},
      type: ${JSON.stringify(p.type)},${typeComment}
      typeLabel: ${JSON.stringify(p.typeLabel)},${noQComment}
      text: ${JSON.stringify(p.text)},
      questions: [
${qStr}
      ],
    }`
  }).join(',\n')

  const toPdfRef = testPdfPath
    ? `'${prefix}/${path.basename(testPdfPath)}'`
    : `'${prefix}/test.pdf'`
  const aPdfRef = answerPdfPath
    ? `'${prefix}/${path.basename(answerPdfPath)}'`
    : `'${prefix}/answer.pdf'`

  const warningBlock = parseWarnings.length > 0
    ? parseWarnings.map(w => `// ⚠️  ${w}`).join('\n') + '\n\n'
    : ''

  return `// AUTO-GENERATED — edit manually or regenerate with: npm run import:placement
// Status: imported (${new Date().toISOString()})
// Total passages: ${passages.length} | Total questions: ${totalQ}
${warningBlock}
export const ${varName} = {
  id: '${level}',
  name: '${level}级别插班测试',
  passScore: 80,
  printPdf: ${toPdfRef},
  source: {
    testPdf: ${toPdfRef},
    answerPdf: ${aPdfRef},
  },
  passages: [
${passagesStr}
  ],
}
export default ${varName}
`
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const timestamp = new Date().toISOString()
  const reviewSections = []
  const allTodos = []

  // CLI: node importPlacementFromPdf.js B C E F   (specific levels)
  //      node importPlacementFromPdf.js            (scan placement/ subfolders)
  const cliLevels = process.argv.slice(2)
    .filter(a => /^[A-Za-z]$/.test(a))
    .map(a => a.toUpperCase())

  // Ensure rawExtracted dir exists
  fs.mkdirSync(RAW_EXTRACTED_DIR, { recursive: true })

  let levelDirs = []

  if (cliLevels.length > 0) {
    // Use specified levels, resolve PDF dir from raw/ directly
    levelDirs = cliLevels
  } else {
    // Scan placement PDF dir
    if (!fs.existsSync(PLACEMENT_PDF_DIR)) {
      console.error(`❌ Placement PDF directory not found: ${PLACEMENT_PDF_DIR}`)
      process.exit(1)
    }
    levelDirs = fs.readdirSync(PLACEMENT_PDF_DIR, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name.toUpperCase())
      .sort()
    if (levelDirs.length === 0) {
      console.warn('⚠️  No level subdirectories found under', PLACEMENT_PDF_DIR)
    }
  }

  for (const level of levelDirs) {
    console.log(`\n── Level ${level} ──────────────────────────────────`)
    // Resolve level PDF directory: prefer placement/{LEVEL}/, fall back to raw/{LEVEL}/
    let levelDir = path.join(PLACEMENT_PDF_DIR, level)
    if (!fs.existsSync(levelDir)) {
      levelDir = path.join(RAW_PDF_DIR, level)
    }
    const section = { level, warnings: [] }

    // ── A. Find PDFs ──
    let testPdfPath = null
    let answerPdfPath = null
    const pdfFiles = fs.readdirSync(levelDir).filter(f => f.toLowerCase().endsWith('.pdf'))

    // "无答案" = no answers (= test file); "附答案"/"答案页"/-答案 = answer file
    const answerPdfs = pdfFiles.filter(f => f.includes('答案') && !f.includes('无答案'))
    const answerSet = new Set(answerPdfs)
    const testPdfs = pdfFiles.filter(f => !answerSet.has(f))

    if (testPdfs.length === 0) {
      console.log(`  ⚠️  No test PDF found`)
      section.warnings.push('No test PDF found')
    } else {
      testPdfPath = path.join(levelDir, testPdfs[0])
      if (testPdfs.length > 1) {
        section.warnings.push(`Multiple test PDFs found, using first: ${testPdfs[0]}`)
        console.log(`  ⚠️  Multiple test PDFs, using: ${testPdfs[0]}`)
      }
    }

    if (answerPdfs.length === 0) {
      console.log(`  ⚠️  No answer PDF found`)
      section.warnings.push('No answer PDF found')
    } else {
      answerPdfPath = path.join(levelDir, answerPdfs[0])
      if (answerPdfs.length > 1) {
        section.warnings.push(`Multiple answer PDFs found, using first: ${answerPdfs[0]}`)
        console.log(`  ⚠️  Multiple answer PDFs, using: ${answerPdfs[0]}`)
      }
    }

    const isFromPlacementDir = levelDir.startsWith(PLACEMENT_PDF_DIR)
    const pdfDirPrefix = isFromPlacementDir ? `/raw/placement/${level}` : `/raw/${level}`
    section.testPdf = testPdfPath ? `${pdfDirPrefix}/${path.basename(testPdfPath)}` : null
    section.answerPdf = answerPdfPath ? `${pdfDirPrefix}/${path.basename(answerPdfPath)}` : null

    if (!testPdfPath) {
      console.log(`  ❌ Skipping level ${level} — no test PDF`)
      // Leave existing stub as-is; just note in review
      section.passages = 0
      section.questions = 0
      section.answers = 0
      section.skills = 0
      section.fiction = 0
      section.nonfiction = 0
      section.unknown = 0
      reviewSections.push(section)
      continue
    }

    // ── B/C. Extract raw text and save ──
    let testRawText = ''
    let answerRawText = ''
    let parseWarnings = []

    try {
      console.log(`  ✓ Parsing test PDF: ${path.basename(testPdfPath)}`)
      const testBuf = fs.readFileSync(testPdfPath)
      const testData = await pdfParse(testBuf)
      testRawText = testData.text
      fs.writeFileSync(path.join(RAW_EXTRACTED_DIR, `${level}_test.txt`), testRawText, 'utf-8')
      console.log(`  ✓ Saved rawExtracted/${level}_test.txt (${testRawText.length} chars)`)
    } catch (err) {
      console.error(`  ❌ Failed to parse test PDF: ${err.message}`)
      section.warnings.push(`Test PDF parse error: ${err.message}`)
      reviewSections.push(section)
      continue
    }

    if (answerPdfPath) {
      try {
        console.log(`  ✓ Parsing answer PDF: ${path.basename(answerPdfPath)}`)
        const ansBuf = fs.readFileSync(answerPdfPath)
        const ansData = await pdfParse(ansBuf)
        answerRawText = ansData.text
        fs.writeFileSync(path.join(RAW_EXTRACTED_DIR, `${level}_answer.txt`), answerRawText, 'utf-8')
        console.log(`  ✓ Saved rawExtracted/${level}_answer.txt (${answerRawText.length} chars)`)
      } catch (err) {
        console.error(`  ❌ Failed to parse answer PDF: ${err.message}`)
        section.warnings.push(`Answer PDF parse error: ${err.message}`)
      }
    }

    // ── D. Parse test text ──
    const { passages, warnings: testWarnings } = parseTestText(testRawText)
    parseWarnings.push(...testWarnings)
    testWarnings.forEach(w => console.log(`  ⚠️  ${w}`))

    // ── E. Parse answer text ──
    const { answers, warnings: ansWarnings } = parseAnswerText(answerRawText)
    parseWarnings.push(...ansWarnings)
    ansWarnings.forEach(w => console.log(`  ⚠️  ${w}`))

    // ── F/G/H. Merge answers ──
    const mergeWarnings = mergeAnswers(passages, answers)
    parseWarnings.push(...mergeWarnings)
    mergeWarnings.forEach(w => console.log(`  ⚠️  ${w}`))

    // ── K. Validation ──
    const totalQ = passages.reduce((s, p) => s + p.questions.length, 0)
    if (totalQ !== 20) {
      const msg = `Expected 20 questions total, got ${totalQ}`
      parseWarnings.push(msg)
      console.log(`  ⚠️  ${msg}`)
    }

    const fiction = passages.filter(p => p.type === 'fiction').length
    const nonfiction = passages.filter(p => p.type === 'nonfiction').length
    const unknown = passages.filter(p => p.type === 'unknown').length

    console.log(`  ✓ Passages: ${passages.length} | Questions: ${totalQ} | Answers: ${Object.keys(answers).length}`)
    console.log(`  ✓ Fiction: ${fiction} | Nonfiction: ${nonfiction} | Unknown: ${unknown}`)

    // ── I. Generate JS file ──
    const jsContent = generateJsContent(level, testPdfPath, answerPdfPath, passages, parseWarnings, pdfDirPrefix)
    const jsPath = path.join(DATA_DIR, `${level.toLowerCase()}.js`)
    fs.writeFileSync(jsPath, jsContent, 'utf-8')
    console.log(`  ✓ Written: src/data/placement/${level.toLowerCase()}.js`)

    // ── Collect review data ──
    section.passages = passages.length
    section.questions = totalQ
    section.answers = Object.keys(answers).length
    section.skills = Object.values(answers).filter(a => a.skill).length
    section.fiction = fiction
    section.nonfiction = nonfiction
    section.unknown = unknown
    section.warnings.push(...parseWarnings)
    if (parseWarnings.length > 0) {
      allTodos.push(...parseWarnings.map(w => `[${level}] ${w}`))
    }
    reviewSections.push(section)
  }

  // ── J. Generate extraction_review.md ──
  let md = `# PDF 抽取检查报告\nGenerated: ${timestamp}\n\n`

  for (const s of reviewSections) {
    md += `## Level ${s.level}\n`
    md += `- testPdf: ${s.testPdf || '❌ not found'}\n`
    md += `- answerPdf: ${s.answerPdf || '❌ not found'}\n`
    if (s.passages !== undefined) {
      md += `- 文章数: ${s.passages}\n`
      md += `- 题目数: ${s.questions}${s.questions !== 20 ? ' ⚠️ (expected: 20)' : ' (expected: 20)'}\n`
      md += `- 答案数: ${s.answers}\n`
      md += `- 能力标签数: ${s.skills}\n`
      md += `- 虚构: ${s.fiction}篇 / 非虚构: ${s.nonfiction}篇 / 待确认: ${s.unknown}篇\n`
    }
    if (s.warnings.length > 0) {
      md += `- ⚠️ 问题列表:\n`
      s.warnings.forEach(w => { md += `  - ${w}\n` })
    }
    md += '\n'
  }

  if (allTodos.length > 0) {
    md += `## 需要人工检查的内容\n`
    allTodos.forEach(t => { md += `- ${t}\n` })
    md += '\n'
  }

  fs.writeFileSync(REVIEW_FILE, md, 'utf-8')
  console.log(`\n✓ Review written to: extraction_review.md`)
  console.log(`✓ Done. Processed ${reviewSections.length} level(s).`)
}

main().catch(err => {
  console.error('❌ Fatal error:', err)
  process.exit(1)
})
