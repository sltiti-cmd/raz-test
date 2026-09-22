import { createHash } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { levelA } from '../../src/data/levels/a.js'
import { levelD } from '../../src/data/levels/d.js'
import { placementB } from '../../src/data/placement/b.js'
import { placementC } from '../../src/data/placement/c.js'
import { placementE } from '../../src/data/placement/e.js'
import { placementF } from '../../src/data/placement/f.js'
import { levelC } from '../../src/data/levels/c.js'
import { levelE } from '../../src/data/levels/e.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const output = resolve(root, 'audio-work/reading-manifest.json')
const levels = [levelA, placementB, placementC, levelD, placementE, placementF]
// The displayed cloze remains untouched. These spoken versions make the blank
// intelligible without reading the answer or trailing off mid-sentence.
const speechOverrides = {
  'C-q15': 'A birthday is the day someone was ... Which word completes the sentence?',
  'C-q20': 'In this sentence, busy means that monkeys ... Which phrase completes the sentence?',
  'D-q02': 'Food is ... for all animals. Which word completes the sentence?',
  'D-q09': 'In order to play on the slide, the girl first has to ... Which action completes the sentence?',
  'E-q02': 'The boy probably wants to ... Which phrase completes the sentence?',
}

function spokenQuestions(level) {
  return level.passages.flatMap(passage => passage.questions.map(question => ({
    id: `${passage.id}-q${String(question.id).padStart(2, '0')}`,
    en: question.ttsText || question.question,
    zh: question.questionZh,
  })))
}

for (const [upgrade, placement] of [[levelC, placementC], [levelE, placementE]]) {
  if (JSON.stringify(spokenQuestions(upgrade)) !== JSON.stringify(spokenQuestions(placement))) {
    throw new Error(`${upgrade.id} upgrade and placement questions differ; audio cannot be shared safely`)
  }
}

const entries = []
for (const level of levels) {
  if (level.passages.length !== 4) throw new Error(`${level.id}: expected 4 passages`)
  for (const passage of level.passages) {
    if (level.id === 'A') {
      entries.push({
        id: `A-${passage.id}-title`, kind: 'title', level: 'A', passageId: passage.id,
        file: `reading/v1/A/${passage.id}-title.mp3`,
        segments: [{ lang: 'en-US', text: passage.title, repeats: 1 }],
      })
      entries.push({
        id: `A-${passage.id}-passage`, kind: 'passage', level: 'A', passageId: passage.id,
        file: `reading/v1/A/${passage.id}-passage.mp3`,
        segments: [{ lang: 'en-US', text: passage.text.replace(/\s*\n\s*/g, ' '), repeats: 2 }],
      })
    }
    for (const question of passage.questions) {
      if (!question.question || !question.questionZh) {
        throw new Error(`${level.id} question ${question.id} is missing English or Chinese text`)
      }
      const qid = `q${String(question.id).padStart(2, '0')}`
      const override = speechOverrides[`${level.id}-${qid}`]
      const en = override || question.ttsText || question.question
      const zh = question.questionZh
      entries.push({
        id: `${level.id}-${qid}`, kind: 'question', level: level.id,
        passageId: passage.id, questionId: question.id,
        file: `reading/v1/${level.id}/${qid}.mp3`,
        segments: [{ lang: 'en-US', text: en, repeats: 1 }, { lang: 'zh-CN', text: zh, repeats: 1 }],
        sourceText: question.question,
        reviewFlags: [
          override && 'spoken-cloze-override',
          /_{3,}/.test(`${question.question} ${zh}`) && 'blank-in-source',
          /[A-Za-z]/.test(zh) && 'English-word-in-Chinese',
        ].filter(Boolean),
      })
      if (level.id !== 'A') continue
      for (const option of question.options) {
        // These are pictures of dots, not words. Reading their counts gives away the answer.
        if (/^[●\s]+$/.test(option.text)) continue
        const spoken = /^\d$/.test(option.text)
          ? { 3: 'three', 5: 'five', 7: 'seven' }[option.text] || option.text
          : option.text
        entries.push({
          id: `A-${qid}-${option.key}`, kind: 'option', level: 'A',
          passageId: passage.id, questionId: question.id, optionKey: option.key,
          file: `reading/v1/A/${qid}-${option.key}.mp3`,
          segments: [{ lang: 'en-US', text: spoken, repeats: 1 }],
          sourceText: option.text,
        })
      }
    }
  }
}

const counts = Object.fromEntries(['title', 'passage', 'question', 'option'].map(kind => [
  kind, entries.filter(entry => entry.kind === kind).length,
]))
if (counts.title !== 4 || counts.passage !== 4 || counts.question !== 120 || counts.option !== 54) {
  throw new Error(`Unexpected inventory: ${JSON.stringify(counts)}`)
}

const manifest = {
  schemaVersion: 1,
  source: 'Current A-F reading test data; G and above have no audio',
  policy: 'A titles once, A passages English twice, A-F questions English then Chinese once each, A options except six dot-picture choices once',
  counts,
  entries,
}
manifest.sourceSha256 = createHash('sha256').update(JSON.stringify(entries)).digest('hex')
await mkdir(dirname(output), { recursive: true })
await writeFile(output, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
console.log(`${output}\n${JSON.stringify(counts)}\nsha256 ${manifest.sourceSha256}`)
