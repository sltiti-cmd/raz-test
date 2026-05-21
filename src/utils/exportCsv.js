export function exportCsv(records) {
  const headers = [
    '提交时间',
    '微信名',
    '测试类型',
    '测试级别',
    '分数',
    '正确题数',
    '错题',
    '阅读判断',
    '薄弱能力',
    '虚构错题数',
    '非虚构错题数',
    '备注',
  ]

  const rows = records.map((r) => [
    r.submittedAt,
    r.studentName,
    (r.testType || 'upgrade') === 'placement' ? '插班测试' : '升级测试',
    r.levelId + '级别',
    r.score,
    r.correctCount,
    (r.wrongQuestions || []).map((q) => `Q${q.id}`).join(' '),
    r.score >= 80 ? `可以读${r.levelId}级别` : '建议降级巩固',
    (r.weakSkills || []).join(' / '),
    r.fictionWrong,
    r.nonfictionWrong,
    r.notes || '',
  ])

  const csvContent = [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    )
    .join('\n')

  const blob = new Blob(['﻿' + csvContent], {
    type: 'text/csv;charset=utf-8;',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `RAZ测试记录_${new Date().toLocaleDateString('zh-CN')}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
