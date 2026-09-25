const READING_DIMENSIONS = [
  {
    key: 'vocabulary',
    label: '词汇语义',
    skills: ['词汇理解', '反义理解', '符号理解', '数字识别'],
  },
  {
    key: 'information',
    label: '信息定位',
    skills: [
      '信息提取', '细节理解', '细节支持', '场景理解', '动作理解',
      '人物识别', '图形识别', '数量理解', '数量比较', '功能理解', '描述理解',
    ],
  },
  {
    key: 'structure',
    label: '篇章理解',
    skills: ['主旨理解', '主旨与细节', '顺序理解', '故事要素', '情节理解', '文章结构', '分类理解'],
  },
  {
    key: 'reasoning',
    label: '推理分析',
    skills: [
      '推断理解', '推理判断', '因果理解', '因果关系', '比较理解', '比较对比',
      '问题解决', '问题分析', '人物分析', '情绪变化',
    ],
  },
  {
    key: 'author',
    label: '作者意图',
    skills: ['作者意图', '作者目的', '作者观点'],
  },
]

function getDimension(skill) {
  return READING_DIMENSIONS.find(dimension => dimension.skills.includes(skill)) || {
    key: 'other',
    label: '其他理解',
    skills: [skill],
  }
}

function makeStat(label) {
  return {
    label,
    total: 0,
    correct: 0,
    wrong: 0,
    accuracy: 0,
  }
}

export function gradeTest(levelData, answers) {
  const pointsPerQuestion = 5
  let correctCount = 0
  const wrongQuestions = []
  const skillCounts = {}
  const skillStats = {}
  const dimensionStats = {}
  let fictionWrong = 0
  let nonfictionWrong = 0
  let fictionTotal = 0
  let nonfictionTotal = 0

  levelData.passages.forEach((passage) => {
    passage.questions.forEach((q) => {
      const isCorrect = answers[q.id] === q.answer
      const skill = q.skill || '其他理解'
      const dimension = getDimension(skill)

      if (!skillStats[skill]) skillStats[skill] = makeStat(skill)
      if (!dimensionStats[dimension.key]) {
        dimensionStats[dimension.key] = {
          ...makeStat(dimension.label),
          key: dimension.key,
          skills: {},
        }
      }

      skillStats[skill].total += 1
      dimensionStats[dimension.key].total += 1
      dimensionStats[dimension.key].skills[skill] = dimensionStats[dimension.key].skills[skill] || makeStat(skill)
      dimensionStats[dimension.key].skills[skill].total += 1

      if (passage.type === 'fiction') fictionTotal += 1
      else nonfictionTotal += 1

      if (isCorrect) {
        correctCount += 1
        skillStats[skill].correct += 1
        dimensionStats[dimension.key].correct += 1
        dimensionStats[dimension.key].skills[skill].correct += 1
      } else {
        skillStats[skill].wrong += 1
        dimensionStats[dimension.key].wrong += 1
        dimensionStats[dimension.key].skills[skill].wrong += 1

        wrongQuestions.push({
          id: q.id,
          userAnswer: answers[q.id] || '未作答',
          correctAnswer: q.answer,
          skill,
          dimension: dimension.label,
          passageType: passage.type,
        })

        skillCounts[skill] = (skillCounts[skill] || 0) + 1
        if (passage.type === 'fiction') fictionWrong += 1
        else nonfictionWrong += 1
      }
    })
  })

  Object.values(skillStats).forEach(stat => {
    stat.accuracy = stat.total ? Math.round((stat.correct / stat.total) * 100) : 0
  })

  Object.values(dimensionStats).forEach(stat => {
    stat.accuracy = stat.total ? Math.round((stat.correct / stat.total) * 100) : 0
    Object.values(stat.skills).forEach(skillStat => {
      skillStat.accuracy = skillStat.total
        ? Math.round((skillStat.correct / skillStat.total) * 100)
        : 0
    })
  })

  const dimensionOrder = [...READING_DIMENSIONS.map(item => item.key), 'other']
  const readingDimensions = dimensionOrder
    .map(key => dimensionStats[key])
    .filter(Boolean)

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
    skillStats,
    readingDimensions,
    fictionWrong,
    nonfictionWrong,
    fictionTotal,
    nonfictionTotal,
    passed,
  }
}

export { READING_DIMENSIONS }
