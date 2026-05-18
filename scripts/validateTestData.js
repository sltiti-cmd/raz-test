#!/usr/bin/env node
/**
 * 测试数据完整性验收脚本
 * 运行：npm run validate:data
 */

import { readdir, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join, resolve, dirname } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')

// /raw/... 路径映射到 test/raw/...（raz-test 的父目录）
function resolvePdfPath(printPdf) {
  if (!printPdf) return null
  const parts = printPdf.split('/').filter(Boolean) // ['raw', 'Q', 'file.pdf']
  return join(projectRoot, '..', ...parts)
}

function checkPdfExists(printPdf) {
  if (!printPdf) return { exists: false, resolvedPath: null }
  const resolvedPath = resolvePdfPath(printPdf)
  return { exists: existsSync(resolvedPath), resolvedPath }
}

// 插班测试 TTS 规则
const TTS_QUESTION_ONLY = new Set(['B', 'C', 'E', 'F'])
const TTS_NONE = new Set(['I', 'J', 'L', 'M', 'N', 'P', 'Q'])

function validateLevel(level, { isPlacement }) {
  const issues = []

  // 必要顶级字段
  if (!level.id) issues.push('缺少 id')
  if (!level.name) issues.push('缺少 name')
  if (level.passScore == null) issues.push('缺少 passScore')
  if (!level.printPdf) issues.push('缺少 printPdf')

  if (!level.passages || !Array.isArray(level.passages)) {
    issues.push('缺少 passages 或格式错误')
    return issues
  }

  if (level.passages.length !== 4) {
    issues.push(`文章数为 ${level.passages.length}，预期 4 篇`)
  }

  let totalQuestions = 0
  const allQIds = []

  for (const passage of level.passages) {
    const pid = passage.id ?? '?'

    if (!passage.id) issues.push('某 passage 缺少 id')
    if (!passage.title) issues.push(`[${pid}] 缺少 title`)
    if (!passage.text || passage.text.trim() === '') issues.push(`[${pid}] text 为空`)

    if (!['fiction', 'nonfiction'].includes(passage.type)) {
      issues.push(`[${pid}] type="${passage.type}" 不合法，只能是 fiction / nonfiction`)
    }
    if (!['虚构', '非虚构'].includes(passage.typeLabel)) {
      issues.push(`[${pid}] typeLabel="${passage.typeLabel}" 不合法，只能是 虚构 / 非虚构`)
    }

    if (!passage.questions || !Array.isArray(passage.questions)) {
      issues.push(`[${pid}] 缺少 questions`)
      continue
    }
    if (passage.questions.length !== 5) {
      issues.push(`[${pid}] 题目数 ${passage.questions.length}，预期 5 道`)
    }
    totalQuestions += passage.questions.length

    for (const q of passage.questions) {
      const qid = q.id ?? '?'
      allQIds.push(q.id)

      if (q.id == null) issues.push(`[${pid}] 某题缺少 id`)
      if (!q.question) issues.push(`[${pid}] Q${qid} 缺少 question`)
      if (!q.skill) issues.push(`[${pid}] Q${qid} 缺少 skill`)

      if (!q.answer) {
        issues.push(`[${pid}] Q${qid} 缺少 answer`)
      } else if (!['A', 'B', 'C', 'D'].includes(q.answer)) {
        issues.push(`[${pid}] Q${qid} answer="${q.answer}" 不合法，只能是 A/B/C/D`)
      }

      if (!q.options || !Array.isArray(q.options) || q.options.length < 2) {
        issues.push(`[${pid}] Q${qid} options 缺失或不足 2 个`)
      } else if (q.answer && !q.options.find(o => o.key === q.answer)) {
        issues.push(`[${pid}] Q${qid} options 中找不到 answer="${q.answer}" 的选项`)
      }

      // questionZh 检查（仅插班测试）
      if (isPlacement && TTS_NONE.has(level.id) && q.questionZh) {
        issues.push(`[${pid}] Q${qid} 不应有 questionZh（${level.id} 级别无需中文题干）`)
      }
    }
  }

  // 总题数
  if (totalQuestions !== 20) {
    issues.push(`总题数 ${totalQuestions}，预期 20 题`)
  }

  // 题目 id 连续性
  const numIds = allQIds.filter(id => typeof id === 'number')
  const missing = []
  const dups = []
  for (let i = 1; i <= 20; i++) {
    if (!numIds.includes(i)) missing.push(i)
  }
  for (const id of numIds) {
    if (numIds.indexOf(id) !== numIds.lastIndexOf(id) && !dups.includes(id)) dups.push(id)
  }
  if (missing.length) issues.push(`题目 id 缺失：${missing.join(', ')}`)
  if (dups.length) issues.push(`题目 id 重复：${dups.join(', ')}`)

  // TTS 规则（仅插班测试中的指定级别）
  if (isPlacement) {
    if (!level.tts) {
      issues.push('缺少 tts 配置')
    } else {
      const id = level.id
      if (TTS_QUESTION_ONLY.has(id)) {
        if (level.tts.passage !== false) issues.push('tts.passage 应为 false')
        if (level.tts.question !== true)  issues.push('tts.question 应为 true（该级别需要题干 TTS）')
        if (level.tts.options !== false)  issues.push('tts.options 应为 false')
      } else if (TTS_NONE.has(id)) {
        if (level.tts.passage !== false) issues.push('tts.passage 应为 false')
        if (level.tts.question !== false) issues.push('tts.question 应为 false（该级别不需要 TTS）')
        if (level.tts.options !== false)  issues.push('tts.options 应为 false')
      }
    }
  }

  return issues
}

async function loadLevel(filePath) {
  const url = pathToFileURL(filePath).href
  let mod
  try {
    mod = await import(url)
  } catch (e) {
    throw e
  }
  // 优先找命名导出中有 id 字段的对象
  for (const [key, val] of Object.entries(mod)) {
    if (key !== 'default' && val && typeof val === 'object' && val.id) return val
  }
  // 再找 default 导出
  if (mod.default && typeof mod.default === 'object' && mod.default.id) return mod.default
  return null
}

async function scanDir(dir, isPlacement) {
  const files = (await readdir(dir))
    .filter(f => f.endsWith('.js') && f !== 'index.js')
    .sort()

  const entries = []
  for (const file of files) {
    const filePath = join(dir, file)
    let level = null
    let loadError = null

    try {
      level = await loadLevel(filePath)
    } catch (e) {
      loadError = e.message
    }

    if (loadError) {
      entries.push({ file, level: null, issues: [], loadError })
      continue
    }
    if (!level) {
      entries.push({ file, level: null, issues: ['未找到有效的数据导出（可能是空 stub）'], loadError: null })
      continue
    }

    const issues = validateLevel(level, { isPlacement })
    const pdfCheck = checkPdfExists(level.printPdf)
    if (level.printPdf && !pdfCheck.exists) {
      issues.push(`printPdf 文件不存在：${pdfCheck.resolvedPath}`)
    }

    entries.push({ file, level, issues, loadError: null, pdfCheck })
  }
  return entries
}

function renderTable(entries) {
  if (entries.length === 0) return '（无数据）\n'

  let md = `| 级别 | 文件 | 文章数 | 题目数 | printPdf | PDF存在 | 状态 |\n`
  md     += `|:----:|------|:------:|:------:|----------|:-------:|------|\n`

  for (const e of entries) {
    const id       = e.level?.id ?? '?'
    const passages = e.level?.passages?.length ?? '-'
    const qCount   = e.level?.passages
      ?.reduce((n, p) => n + (p.questions?.length ?? 0), 0) ?? '-'
    const pdf      = e.level?.printPdf ? `\`${e.level.printPdf}\`` : '❌ 缺失'
    const pdfOk    = !e.level?.printPdf ? '—' : e.pdfCheck?.exists ? '✅' : '❌'
    let status
    if (e.loadError) status = '❌ 加载失败'
    else if (e.issues.length === 0) status = '✅ 通过'
    else status = `⚠️ ${e.issues.length} 项问题`

    md += `| ${id} | ${e.file} | ${passages} | ${qCount} | ${pdf} | ${pdfOk} | ${status} |\n`
  }
  return md
}

function buildReport(levelEntries, placementEntries) {
  const now = new Date().toLocaleString('zh-CN')
  let md = `# 测试数据验收报告\n\n> 生成时间：${now}\n\n---\n\n`

  md += `## 一、升级测试（src/data/levels/）\n\n`
  md += renderTable(levelEntries)

  md += `\n## 二、插班测试（src/data/placement/）\n\n`
  md += renderTable(placementEntries)

  const allProblems = [...levelEntries, ...placementEntries]
    .filter(e => e.loadError || e.issues.length > 0)

  md += `\n---\n\n## 三、问题清单\n\n`
  if (allProblems.length === 0) {
    md += `✅ 所有文件验收通过，无问题发现。\n`
  } else {
    for (const e of allProblems) {
      const label = e.level ? `${e.level.id} 级别（${e.file}）` : e.file
      md += `### ${label}\n\n`
      if (e.loadError) md += `- ❌ 加载失败：${e.loadError}\n`
      for (const issue of e.issues) md += `- ⚠️ ${issue}\n`
      md += '\n'
    }
  }

  return md
}

async function main() {
  console.log('🔍 开始验收测试数据...\n')

  const levelsDir    = join(projectRoot, 'src/data/levels')
  const placementDir = join(projectRoot, 'src/data/placement')

  const [levelEntries, placementEntries] = await Promise.all([
    scanDir(levelsDir, false),
    scanDir(placementDir, true),
  ])

  const report = buildReport(levelEntries, placementEntries)
  const reportPath = join(projectRoot, 'DATA_VALIDATION_REPORT.md')
  await writeFile(reportPath, report, 'utf8')

  const all     = [...levelEntries, ...placementEntries]
  const passed  = all.filter(e => !e.loadError && e.issues.length === 0).length
  const failing = all.length - passed

  console.log(`📊 结果：共 ${all.length} 个文件，${passed} 通过，${failing} 有问题`)
  console.log(`📄 报告已写入：DATA_VALIDATION_REPORT.md\n`)

  const problems = all.filter(e => e.loadError || e.issues.length > 0)
  if (problems.length > 0) {
    console.log('⚠️  有问题的文件：')
    for (const e of problems) {
      const label = e.level?.id ?? e.file
      const msg = e.loadError
        ?? (e.issues.slice(0, 3).join(' | ') + (e.issues.length > 3 ? ` …共 ${e.issues.length} 项` : ''))
      console.log(`   [${label}] ${msg}`)
    }
  }
}

main().catch(err => {
  console.error('脚本执行失败:', err)
  process.exit(1)
})
