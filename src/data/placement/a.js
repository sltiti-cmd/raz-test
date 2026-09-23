import { levelA } from '../levels/a.js'

// 插班与升级测试使用同一份 A 级学生试卷；题目和选项统一以原版测试 PDF 为准。
export const placementA = {
  ...levelA,
  name: 'A级别插班测试',
  tts: {
    passage: true,
    question: true,
    options: true,
  },
  source: {
    testPdf: '/raw/A/A级别-入门-升级-测试.pdf',
    answerPdf: '/raw/A/A级别-入门-升级-答案.pdf',
  },
}

export default placementA
