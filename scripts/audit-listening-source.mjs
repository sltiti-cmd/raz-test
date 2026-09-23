import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { listeningTests } from '../src/data/listening.js'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const expected = {
  'a-c': [
    { id: 'ac-test1-part3', sourceNumbers: [1, 2, 3, 4, 5], answers: 'ACBCC' },
    { id: 'ac-test2-part3', sourceNumbers: [1, 2, 3, 4, 5], answers: 'ACABA' },
  ],
  'd-f': [
    { id: 'df-test1-part4', sourceNumbers: [1, 2, 3, 4, 5], answers: 'ABACB' },
    { id: 'df-test2-part4', sourceNumbers: [1, 2, 3, 4, 5], answers: 'CABBA' },
  ],
  'g-j': [
    { id: 'gj-test2-part4', sourceNumbers: [1, 2, 3, 4, 5], answers: 'AACBB' },
    { id: 'gj-test1-part4', sourceNumbers: [1, 2, 3, 4, 5], answers: 'CCBAB' },
  ],
  'k-n': [
    { id: 'kn-test1-part3', sourceNumbers: [11, 12, 13, 14, 15], answers: 'BBACA' },
    { id: 'kn-test1-part4', sourceNumbers: [16, 17, 18, 19, 20], answers: 'BACCC' },
  ],
  'o-t': [
    { id: 'ot-test1-part2', sourceNumbers: [8, 9, 10, 11, 12], answers: 'CACAB' },
    { id: 'ot-test1-part4', sourceNumbers: [20, 21, 22, 23, 24], answers: 'ACBAC' },
  ],
}

const issues = []
const questionIds = new Set()

const check = (condition, message) => {
  if (!condition) issues.push(message)
}

const checkAsset = (assetPath, owner) => {
  if (!assetPath) return
  const localPath = path.join(projectRoot, 'public', assetPath.replace(/^\//, ''))
  check(fs.existsSync(localPath), `${owner}: missing asset ${assetPath}`)
}

check(listeningTests.length === 5, `expected 5 level bands, found ${listeningTests.length}`)

let totalQuestions = 0

for (const test of listeningTests) {
  const expectedSections = expected[test.id]
  check(Boolean(expectedSections), `${test.id}: no verified source key registered`)
  check(test.passScore === 70, `${test.id}: pass score should be 70`)
  check(test.questionCount === 10, `${test.id}: declared questionCount should be 10`)
  check(test.sections.length === 2, `${test.id}: expected 2 sections`)

  let testQuestionCount = 0
  for (const [sectionIndex, section] of test.sections.entries()) {
    const sourceKey = expectedSections?.[sectionIndex]
    const owner = `${test.id}/${section.id}`
    check(section.id === sourceKey?.id, `${owner}: unexpected section order or id`)
    check(section.questions.length === 5, `${owner}: expected 5 questions`)
    check(section.questions.map(question => question.answer).join('') === sourceKey?.answers,
      `${owner}: answer key differs from the verified source`)
    check(section.questions.map(question => question.sourceNumber).join(',') === sourceKey?.sourceNumbers.join(','),
      `${owner}: source question numbers differ from the verified source`)

    checkAsset(section.audioSrc, owner)
    for (const pageImage of section.pageImages ?? []) checkAsset(pageImage, owner)

    for (const question of section.questions) {
      totalQuestions += 1
      testQuestionCount += 1
      check(!questionIds.has(question.id), `${owner}: duplicate question id ${question.id}`)
      questionIds.add(question.id)
      check(question.options.includes(question.answer), `${owner}/${question.id}: answer is not an option`)
      check(Boolean(question.label?.trim()), `${owner}/${question.id}: blank question label`)
      checkAsset(question.audioSrc, `${owner}/${question.id}`)
      checkAsset(question.imageSrc, `${owner}/${question.id}`)
      checkAsset(question.promptImage, `${owner}/${question.id}`)
      for (const optionImage of Object.values(question.optionImages ?? {})) {
        checkAsset(optionImage, `${owner}/${question.id}`)
      }
      check(Boolean(section.audioSrc || question.audioSrc), `${owner}/${question.id}: no playable audio`)
    }
  }

  check(testQuestionCount === test.questionCount,
    `${test.id}: declared ${test.questionCount} questions but found ${testQuestionCount}`)
  console.log(`${test.levelRange}: ${testQuestionCount} questions checked`)
}

console.log(`Total checked: ${totalQuestions} questions`)
console.log(`Issues: ${issues.length}`)

if (issues.length) {
  for (const issue of issues) console.error(`- ${issue}`)
  process.exitCode = 1
}
