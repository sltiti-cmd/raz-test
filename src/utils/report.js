export function generateReportText(studentInfo, gradingResult, levelId, testType = 'upgrade') {
  const testLabel = testType === 'placement' ? '插班' : '入门'
  const footerLabel = testType === 'placement' ? 'RAZ插班测试' : 'RAZ升级测试'
  const {
    score,
    correctCount,
    total,
    wrongQuestions,
    skillCounts,
    fictionWrong,
    nonfictionWrong,
    passed,
  } = gradingResult

  const wrongList = wrongQuestions.map((q) => `Q${q.id}`).join('、')
  const wrongAnswerLines = wrongQuestions
    .map((q) => `  Q${q.id} 正解：${q.correctAnswer}`)
    .join('\n')

  const sortedSkills = Object.entries(skillCounts).sort((a, b) => b[1] - a[1])
  const topSkills = sortedSkills.slice(0, 2).map(([s]) => s)

  let skillDiagnosis = ''
  if (topSkills.length === 0) {
    skillDiagnosis = '全部答对，非常出色！'
  } else if (topSkills.length === 1) {
    skillDiagnosis = `本次错题主要集中在"${topSkills[0]}"，说明这一能力还需要多加练习。`
  } else {
    skillDiagnosis = `本次错题主要集中在"${topSkills[0]}"和"${topSkills[1]}"，说明这两个方面还需要多加练习。`
  }

  let textureAnalysis = ''
  if (fictionWrong === 0 && nonfictionWrong === 0) {
    textureAnalysis = '虚构和非虚构文章均全部答对，文体理解能力优秀！'
  } else if (fictionWrong > nonfictionWrong) {
    textureAnalysis = `虚构类错题较多（${fictionWrong}题）：说明故事情节、人物动作和顺序理解还需加强。`
  } else if (nonfictionWrong > fictionWrong) {
    textureAnalysis = `非虚构类错题较多（${nonfictionWrong}题）：说明信息类文章中的事实提取、概念识别还需加强。`
  } else {
    textureAnalysis = `虚构错题${fictionWrong}题，非虚构错题${nonfictionWrong}题，两种文体表现较为均衡。`
  }

  const suggestions = passed
    ? [
        '继续保持阅读习惯，每天朗读短文',
        '可以尝试挑战下一个级别',
        '多练习词汇，扩大词汇量',
      ]
    : [
        '多读短句，每天坚持朗读',
        '看清题目关键词，读完再选，不要着急',
        '练习数字、动作、场景类词汇',
        '跟着老师做图文配对练习',
      ]

  const wrongSection =
    wrongList
      ? `错题：${wrongList}\n正确答案：\n${wrongAnswerLines}`
      : '🎊 恭喜！全部答对！'

  return `🌟 ${studentInfo.name} 的RAZ ${levelId}级${testLabel}测试报告
━━━━━━━━━━━━━━━━━━

🎯 成绩速览
卷面得分：${score} / 100
正确题数：${correctCount} / ${total}
阅读判断：${passed ? `✅ 可以读${levelId}级` : `📖 建议继续巩固${levelId}级`}

📊 错题情况
${wrongSection}

💡 能力诊断
${skillDiagnosis}

📚 文体表现
${textureAnalysis}

🚀 提升建议
${suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}

━━━━━━━━━━━━━━━━━━
Stacey老师${footerLabel} · ${studentInfo.date}`
}
