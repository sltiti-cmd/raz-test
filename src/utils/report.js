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
    durationText,
  } = gradingResult
  const canReadLevel = score >= 80

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
    textureAnalysis = '虚构和非虚构文章均全部答对。'
  } else if (fictionWrong > nonfictionWrong) {
    textureAnalysis = `虚构类错题较多（${fictionWrong}题）：说明故事情节、人物动作和顺序理解还需加强。`
  } else if (nonfictionWrong > fictionWrong) {
    textureAnalysis = `非虚构类错题较多（${nonfictionWrong}题）：说明信息类文章中的事实提取、概念识别还需加强。`
  } else {
    textureAnalysis = `虚构错题${fictionWrong}题，非虚构错题${nonfictionWrong}题，两种文体表现较为均衡。`
  }

  const suggestions = canReadLevel
    ? [
        `可以继续读${levelId}级别`,
        '复盘少量错题，确认题干和选项理解',
        '保持每天阅读，稳定推进',
      ]
    : [
        '建议先降级巩固',
        '补足基础词汇和句子理解',
        '再挑战当前级别',
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
${durationText ? `用时 ➭ ${durationText}\n` : ''}阅读判断：${canReadLevel ? `✅ 可以读${levelId}级别` : '📖 建议降级巩固'}

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
