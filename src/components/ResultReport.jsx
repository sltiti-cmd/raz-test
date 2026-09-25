import { forwardRef } from 'react'
import StudyBuddy from './StudyBuddy'
import SkillRadar from './SkillRadar'

function SectionIcon({ tone = 'mint', children }) {
  return <span className={`report-section-icon tone-${tone}`}>{children}</span>
}

const ResultReport = forwardRef(function ResultReport(
  { studentInfo, gradingResult, levelId, testType },
  ref,
) {
  const reportTitle = testType === 'placement' ? '插班诊断报告' : '阅读诊断报告'
  const {
    score,
    maxScore = 100,
    correctCount,
    total,
    wrongQuestions = [],
    skillStats = {},
    readingDimensions = [],
    fictionWrong = 0,
    nonfictionWrong = 0,
    fictionTotal = 0,
    nonfictionTotal = 0,
    durationText,
    passed,
  } = gradingResult

  const canReadLevel = typeof passed === 'boolean' ? passed : score >= 80

  const weakSkills = Object.values(skillStats)
    .filter(stat => stat.wrong > 0)
    .sort((a, b) => {
      if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy
      if (a.wrong !== b.wrong) return b.wrong - a.wrong
      return b.total - a.total
    })
    .slice(0, 8)

  const genreNote = fictionWrong === 0 && nonfictionWrong === 0
    ? '本次虚构与非虚构文章均全部答对。'
    : fictionWrong > nonfictionWrong
      ? `虚构类本次答错 ${fictionWrong} 题，可重点复盘情节、人物与顺序信息。`
      : nonfictionWrong > fictionWrong
        ? `非虚构类本次答错 ${nonfictionWrong} 题，可重点复盘事实信息与概念关系。`
        : `两类文章本次各答错 ${fictionWrong} 题，可结合错题逐篇复盘。`

  const suggestions = canReadLevel
    ? ['可以继续阅读当前级别', '复盘本次错题对应的题型与定位依据', '保持稳定阅读量，再用下一次测评观察变化']
    : ['建议先降级巩固', '补足基础词汇和句子理解', '完成巩固后再挑战当前级别']

  return (
    <article ref={ref} className="report-card">
      <section className="report-hero">
        <div className="report-hero-copy">
          <span className="report-eyebrow"><i /> READING REPORT</span>
          <h1>{reportTitle}</h1>
          <p>{studentInfo.name} <b>·</b> {levelId}级 <b>·</b> {studentInfo.date}</p>
        </div>
        <div className="report-hero-art" aria-hidden="true">
          <span className="report-spark report-spark-one">✦</span>
          <span className="report-spark report-spark-two">✧</span>
          <StudyBuddy className="report-hero-buddy" decorative />
          <p>每一次阅读<br />都是向更大的世界<br />靠近一步 ♡</p>
        </div>
      </section>

      <section className="report-summary report-section">
        <div className="report-score-orb">
          <small>本次得分</small>
          <strong>{score}</strong>
          <span>/ {maxScore} 分</span>
        </div>
        <div className="report-summary-copy">
          <h2>{studentInfo.name}</h2>
          <p><span>▤</span> 答对 <strong>{correctCount}</strong> / {total} 题</p>
          {durationText && <p><span>◷</span> 用时 <strong>{durationText}</strong></p>}
          <div className={`report-level-note ${canReadLevel ? 'is-pass' : 'is-review'}`}>
            {canReadLevel ? `✓ 可以继续读 ${levelId} 级别` : '📖 建议降级巩固'}
          </div>
          <blockquote>“阅读是点亮思考的星光。”</blockquote>
        </div>
      </section>

      <section className="report-section report-radar-section">
        <div className="report-section-heading">
          <SectionIcon tone="mint">▥</SectionIcon>
          <div>
            <h2>阅读表现雷达图</h2>
            <p>基于本次测评各类题目的真实答题表现</p>
          </div>
        </div>

        <div className="report-radar-grid">
          <div className="report-radar-main">
            <SkillRadar groups={readingDimensions} />
          </div>

          <aside className="report-radar-aside">
            <h3><i /> 本次维度</h3>
            <div className="report-dimension-list">
              {readingDimensions.map((dimension) => (
                <div className="report-dimension-row" key={dimension.key}>
                  <span>{dimension.label}</span>
                  <strong>答对 {dimension.correct}/{dimension.total}</strong>
                </div>
              ))}
            </div>

            <h3 className="report-weak-title"><i /> 需要加强的题型</h3>
            {weakSkills.length > 0 ? (
              <div className="report-skill-chips">
                {weakSkills.map((skill) => (
                  <span key={skill.label}>
                    <b>{skill.label}</b>
                    <small>答对 {skill.correct}/{skill.total}</small>
                  </span>
                ))}
              </div>
            ) : (
              <p className="report-all-good">本次暂无明显薄弱项 ✨</p>
            )}
          </aside>
        </div>

        <p className="report-radar-note">
          图表仅反映本次测评中对应题型的答题表现，不等同于标准化能力评分。
        </p>
      </section>

      <section className="report-section">
        <div className="report-section-heading compact">
          <SectionIcon tone="mint">▥</SectionIcon>
          <div>
            <h2>文体表现</h2>
            <p>{genreNote}</p>
          </div>
        </div>
        <div className="report-genre-grid">
          <div className="report-genre-card fiction">
            <span>虚构类错题</span>
            <strong>{fictionWrong}</strong>
            <small>/ {fictionTotal || '—'} 题</small>
          </div>
          <div className="report-genre-card nonfiction">
            <span>非虚构类错题</span>
            <strong>{nonfictionWrong}</strong>
            <small>/ {nonfictionTotal || '—'} 题</small>
          </div>
        </div>
      </section>

      <section className="report-section">
        <div className="report-section-heading compact">
          <SectionIcon tone="coral">▤</SectionIcon>
          <div>
            <h2>错题情况</h2>
            <p>
              {wrongQuestions.length === 0
                ? '本次全部答对，继续保持。'
                : `共 ${wrongQuestions.length} 题答错，建议结合原文逐题复盘。`}
            </p>
          </div>
        </div>

        {wrongQuestions.length === 0 ? (
          <div className="report-perfect">全部答对 ✦</div>
        ) : (
          <div className="report-wrong-list">
            {wrongQuestions.map(question => (
              <span key={question.id}>
                Q{question.id}
                <b>{question.correctAnswer}</b>
              </span>
            ))}
          </div>
        )}
      </section>

      <section className="report-section report-suggestions">
        <div className="report-section-heading compact">
          <SectionIcon tone="coral">➤</SectionIcon>
          <div>
            <h2>提升建议</h2>
          </div>
        </div>
        <div className="report-suggestion-body">
          <ol>
            {suggestions.map((suggestion, index) => (
              <li key={suggestion}>
                <span>{index + 1}</span>
                <p>{suggestion}</p>
              </li>
            ))}
          </ol>
          <div className="report-growth-note" aria-hidden="true">
            <span>♧</span>
            <p>一点一滴的积累<br />会带来看得见的进步！</p>
          </div>
        </div>
      </section>

      <footer className="report-footer">
        Stacey老师测评网站 · 仅供参考
      </footer>
    </article>
  )
})

export default ResultReport
