import { forwardRef } from 'react'

const ResultReport = forwardRef(function ResultReport({ studentInfo, gradingResult, levelId, testType }, ref) {
  const testLabel = testType === 'placement' ? 'RAZ插班测试' : 'RAZ升级测试'
  const { score, correctCount, total, wrongQuestions, skillCounts,
          fictionWrong, nonfictionWrong, durationText } = gradingResult
  const canReadLevel = score >= 80

  const sortedSkills = Object.entries(skillCounts).sort((a, b) => b[1] - a[1])
  const topSkills    = sortedSkills.slice(0, 2).map(([s]) => s)

  const skillDiag = topSkills.length === 0
    ? '全部答对，太棒了！'
    : topSkills.length === 1
      ? `"${topSkills[0]}"还需多加练习。`
      : `"${topSkills[0]}"和"${topSkills[1]}"还需多加练习。`

  const genreNote = fictionWrong === 0 && nonfictionWrong === 0
    ? '虚构与非虚构文章均全部答对！'
    : fictionWrong > nonfictionWrong
      ? `虚构文章错${fictionWrong}题，故事情节和顺序理解需加强。`
      : nonfictionWrong > fictionWrong
        ? `非虚构文章错${nonfictionWrong}题，事实提取和概念识别需加强。`
        : `两类文章各错${fictionWrong}题，均需进一步巩固。`

  const suggestions = canReadLevel
    ? ['可以继续读该级别', '复盘少量错题，确认题干和选项理解', '保持每天阅读，稳定推进']
    : ['建议先降级巩固', '补足基础词汇和句子理解', '再挑战当前级别']

  // ── Inline styles for html2canvas capture ──────────────────────
  const root = {
    width: '600px',
    background: '#fdf8f0',
    fontFamily: "Nunito, 'Noto Sans SC', -apple-system, sans-serif",
    padding: '40px',
    borderRadius: '24px',
  }
  const section = (bg = '#ffffff', borderColor = '#e8dcc8') => ({
    background: bg,
    border: `1.5px solid ${borderColor}`,
    borderRadius: '14px',
    padding: '18px 22px',
    marginBottom: '14px',
  })
  const sectionTitle = {
    fontSize: '13px', fontWeight: 800, color: '#374151', marginBottom: '10px',
    letterSpacing: '0.3px',
  }
  const small = { fontSize: '12px', color: '#6b7280', lineHeight: '1.65' }

  return (
    <div ref={ref} style={root}>

      {/* ── Certificate header ── */}
      <div style={{ textAlign: 'center', marginBottom: '28px', paddingBottom: '20px',
                    borderBottom: '2px solid #e8dcc8' }}>
        <div style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '2px',
                      textTransform: 'uppercase', marginBottom: '8px' }}>
          STACEY老师 · {testLabel}
        </div>
        <div style={{ fontSize: '22px', fontWeight: 900, color: '#1f2937', marginBottom: '4px' }}>
          阅读诊断报告
        </div>
        <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: 600 }}>
          {studentInfo.name} · {levelId}级 · {studentInfo.date}
        </div>
      </div>

      {/* ── Score ── */}
      <div style={{
        ...section(canReadLevel ? '#f0fdf9' : '#fff7ed', canReadLevel ? '#99f6e4' : '#fdba74'),
        display: 'flex', alignItems: 'center', gap: '20px',
      }}>
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{ fontSize: '60px', fontWeight: 900, lineHeight: 1,
                        color: canReadLevel ? '#0f766e' : '#ea580c',
                        fontFamily: "'JetBrains Mono', monospace" }}>
            {score}
          </div>
          <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 700 }}>/ 100 分</div>
        </div>
        <div>
          <div style={{ fontSize: '13px', color: '#4b5563', marginBottom: '6px', fontWeight: 600 }}>
            答对：<strong>{correctCount}</strong> / {total} 题
          </div>
          {durationText && (
            <div style={{ fontSize: '13px', color: '#4b5563', marginBottom: '6px', fontWeight: 600 }}>
              用时 ➭ {durationText}
            </div>
          )}
          <div style={{
            display: 'inline-block',
            background: canReadLevel ? '#14b8a6' : '#f97316',
            color: 'white', borderRadius: '20px',
            padding: '5px 16px', fontSize: '13px', fontWeight: 800,
          }}>
            {canReadLevel ? `✅ 可以读${levelId}级别` : '📖 建议降级巩固'}
          </div>
        </div>
      </div>

      {/* ── Wrong questions ── */}
      <div style={section()}>
        <div style={sectionTitle}>📊 错题情况</div>
        {wrongQuestions.length === 0 ? (
          <div style={{ ...small, color: '#16a34a', fontWeight: 700 }}>🎊 全部答对！满分！</div>
        ) : (
          <>
            <div style={{ ...small, marginBottom: '8px' }}>
              错题：{wrongQuestions.map(q => `Q${q.id}`).join('、')}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {wrongQuestions.map(q => (
                <span key={q.id} style={{
                  background: '#fef3c7', border: '1px solid #fcd34d',
                  borderRadius: '8px', padding: '3px 10px',
                  fontSize: '12px', color: '#92400e', fontWeight: 700,
                }}>
                  Q{q.id} 正解：{q.correctAnswer}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Skill diagnosis ── */}
      <div style={section()}>
        <div style={sectionTitle}>💡 能力诊断</div>
        {sortedSkills.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
            {sortedSkills.slice(0, 4).map(([skill, cnt]) => (
              <span key={skill} style={{
                background: '#ede9fe', color: '#5b21b6',
                borderRadius: '8px', padding: '3px 10px',
                fontSize: '11px', fontWeight: 800,
              }}>
                {skill} ×{cnt}
              </span>
            ))}
          </div>
        )}
        <div style={small}>{skillDiag}</div>
      </div>

      {/* ── Genre performance ── */}
      <div style={section()}>
        <div style={sectionTitle}>📚 文体表现</div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
          {[['虚构类错题', fictionWrong], ['非虚构类错题', nonfictionWrong]].map(([label, n]) => (
            <div key={label} style={{
              flex: 1, textAlign: 'center', background: '#f9fafb',
              borderRadius: '10px', padding: '10px',
            }}>
              <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '2px' }}>{label}</div>
              <div style={{ fontSize: '26px', fontWeight: 900,
                            color: n > 0 ? '#ef4444' : '#16a34a',
                            fontFamily: "'JetBrains Mono', monospace" }}>{n}</div>
            </div>
          ))}
        </div>
        <div style={small}>{genreNote}</div>
      </div>

      {/* ── Suggestions ── */}
      <div style={section()}>
        <div style={sectionTitle}>🚀 提升建议</div>
        {suggestions.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '7px', ...small }}>
            <span style={{
              background: '#dbeafe', color: '#1d4ed8', borderRadius: '50%',
              width: '18px', height: '18px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontWeight: 800, fontSize: '10px', flexShrink: 0,
            }}>{i + 1}</span>
            <span>{s}</span>
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div style={{ textAlign: 'center', fontSize: '11px', color: '#d1d5db',
                    paddingTop: '16px', borderTop: '1px solid #e8dcc8' }}>
        Stacey老师{testLabel} · 仅供参考
      </div>
    </div>
  )
})

export default ResultReport
