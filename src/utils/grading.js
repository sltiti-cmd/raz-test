export function gradeTest(levelData, answers) {
  const pointsPerQuestion = 5
  let correctCount = 0
  const wrongQuestions = []
  const skillCounts = {}
  let fictionWrong = 0
  let nonfictionWrong = 0

  levelData.passages.forEach((passage) => {
    passage.questions.forEach((q) => {
      const userAnswer = answers[q.id]
      if (userAnswer === q.answer) {
        correctCount++
      } else {
        wrongQuestions.push({
          id: q.id,
          userAnswer: userAnswer || '未作答',
          correctAnswer: q.answer,
          skill: q.skill,
          passageType: passage.type,
        })
        skillCounts[q.skill] = (skillCounts[q.skill] || 0) + 1
        if (passage.type === 'fiction') {
          fictionWrong++
        } else {
          nonfictionWrong++
        }
      }
    })
  })

  const total = levelData.passages.reduce((n, p) => n + p.questions.length, 0)
  const score = correctCount * pointsPerQuestion
  const passed = score >= 80

  return {
    score,
    maxScore: total * pointsPerQuestion,
    correctCount,
    total,
    wrongQuestions,
    skillCounts,
    fictionWrong,
    nonfictionWrong,
    passed,
  }
}
