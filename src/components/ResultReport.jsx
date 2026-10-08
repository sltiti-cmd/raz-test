import { forwardRef } from 'react'
import SkillRadar from './SkillRadar'

const ResultReport = forwardRef(function ResultReport(
  { studentInfo, gradingResult, levelId, testType, children }, ref,
) {
  const { score, maxScore = 100, correctCount, total, wrongQuestions = [],
    readingDimensions = [], fictionWrong = 0, nonfictionWrong = 0,
    fictionTotal = 0, nonfictionTotal = 0, durationText, passed } = gradingResult
  const canReadLevel = typeof passed === 'boolean' ? passed : score >= 80
  const scoreRatio = maxScore > 0 ? Math.max(0, Math.min(1, score / maxScore)) : 0
  const dimensions = readingDimensions.filter(dimension => dimension.total > 0)
  const genreNote = fictionWrong === 0 && nonfictionWrong === 0
    ? '本次已测文体的题目均全部答对。'
    : fictionWrong > nonfictionWrong
      ? '虚构类可重点复盘情节、人物与顺序信息。'
      : nonfictionWrong > fictionWrong
        ? '非虚构类可重点复盘事实信息与概念关系。'
        : '两类文章可结合错题逐篇复盘。'
  const suggestions = canReadLevel ? [
    [`继续阅读 ${levelId} 级`, '巩固当前级别的阅读体验'],
    ['结合原文复盘错题', '找到选项对应的文字依据'],
    ['保持稳定阅读', '用下一次测评观察变化'],
  ] : [
    ['先降级巩固', '找到更适合当前能力的阅读起点'],
    ['补足词汇与句子理解', '结合原文复盘本次错题'],
    ['巩固后再挑战', '用下一次测评观察变化'],
  ]

  return (
    <article ref={ref} className="br-report">
      <header className="br-heading">
        <div>
          <p className="bm-eyebrow">{testType === 'placement' ? 'PLACEMENT REPORT' : 'READING REPORT'}</p>
          <h1>{testType === 'placement' ? '插班诊断报告' : '阅读诊断报告'}</h1>
          <p className="br-student">{studentInfo.name} <span>·</span> {levelId} 级 <span>·</span> {studentInfo.date}</p>
        </div>
        <div className="br-heading-dots" aria-hidden="true"><i /><i /><i /></div>
      </header>
      <section className="br-summary" data-report-part="summary" aria-label="本次测评结果">
        <div className={`br-score ${canReadLevel ? '' : 'br-score-review'}`}>
          <svg viewBox="0 0 180 180" aria-hidden="true">
            <circle cx="90" cy="90" r="78" fill="none" stroke="#e9f3e5" strokeWidth="13" />
            <circle cx="90" cy="90" r="78" fill="none" stroke="currentColor" strokeWidth="13" strokeLinecap="round" pathLength="100" strokeDasharray={`${scoreRatio * 100} 100`} transform="rotate(-90 90 90)" />
          </svg>
          <div><strong>{score}</strong><span>/ {maxScore} 分</span></div>
          <p>本次得分</p>
        </div>
        <div className="br-summary-copy">
          <h2>{canReadLevel ? `可以继续读 ${levelId} 级别` : '建议先降级巩固'}</h2>
          <div className="br-summary-meta"><p>答对 <strong>{correctCount} / {total}</strong> 题</p>{durationText && <p>用时 <strong>{durationText}</strong></p>}</div>
          <p className="br-summary-note">先读懂，再稳稳向前。</p>
        </div>
      </section>

      <section className="br-section" data-report-part="dimensions" aria-labelledby="br-dimensions-title">
        <h2 id="br-dimensions-title">这次阅读，表现在哪里？</h2>
        <div className="br-dimensions">
          <SkillRadar groups={dimensions} />
          <div className="br-bars">
            {dimensions.map((dimension, index) => {
              const accuracy = Math.round(dimension.correct / dimension.total * 100)
              return <div className={`br-dimension br-tone-${index % 6}`} key={dimension.key}>
                <div className="br-dimension-label"><span className="br-dimension-dot" aria-hidden="true" /><h3>{dimension.label}</h3></div>
                <div className="br-bar-row">
                  <div className="br-bar" role="meter" aria-label={dimension.label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={accuracy} aria-valuetext={`答对 ${dimension.correct}/${dimension.total}，${accuracy}%`}><span style={{ width: `${accuracy}%` }} /></div>
                  <span className="br-bar-value">{dimension.correct} / {dimension.total} · {accuracy}%</span>
                </div>
              </div>
            })}
            {dimensions.length === 0 && <p className="br-muted">本次暂无阅读维度数据。</p>}
          </div>
        </div>
        <p className="br-disclaimer">ⓘ 仅反映本次题型表现，不等同于标准化能力评分。</p>
      </section>

      <section className="br-section" data-report-part="genres" aria-labelledby="br-genre-title">
        <h2 id="br-genre-title">不同文体的表现</h2>
        <div className="br-genres">
          {[['虚构类', fictionTotal, fictionWrong], ['非虚构类', nonfictionTotal, nonfictionWrong]].map(([label, count, wrong], index) => (
            <div className="br-genre" key={label}>
              <span className={`br-genre-icon br-genre-icon-${index}`} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></svg></span>
              <div><h3>{label}</h3><p>{count ? `答对 ${count - wrong} / ${count} 题 · 错 ${wrong} 题` : '本次未涉及'}</p></div>
            </div>
          ))}
        </div>
        <p className="br-genre-note">{genreNote}</p>
      </section>

      <section className="br-section" data-report-part="wrong" aria-labelledby="br-wrong-title">
        <h2 id="br-wrong-title">{wrongQuestions.length ? `这 ${wrongQuestions.length} 道题，值得再看一遍` : '本次全部答对，继续保持'}</h2>
        {wrongQuestions.length > 0 ? <div className="br-table-wrap"><table className="br-wrong-table">
          <caption className="sr-only">错题及答案对照</caption>
          <thead><tr><th scope="col">题号</th><th scope="col">关注题型</th><th scope="col">你的答案</th><th scope="col">正确答案</th></tr></thead>
          <tbody>{wrongQuestions.map(question => <tr key={question.id}><td><span>Q{question.id}</span></td><td>{question.skill}</td><td><span className="br-answer-label" aria-hidden="true">你的答案</span>{question.userAnswer}</td><td><span className="br-answer-label" aria-hidden="true">正确答案</span>{question.correctAnswer}</td></tr>)}</tbody>
        </table></div> : <p className="br-muted">每一次认真阅读，都是向前的一步。</p>}
      </section>

      <section className="br-section br-suggestions" data-report-part="suggestions" aria-labelledby="br-next-title">
        <h2 id="br-next-title">接下来，可以这样读</h2>
        <ol>{suggestions.map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
      </section>
      {children}
      <footer className="br-footer">Stacey老师测评网站 · 仅供参考</footer>
    </article>
  )
})

export default ResultReport
