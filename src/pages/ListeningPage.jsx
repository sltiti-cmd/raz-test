import { useState } from 'react'
import { Link } from 'react-router-dom'
import { listeningTests, listeningTestsById } from '../data/listening'

const levelAccents = [
  { color: '#1f9e93', soft: '#def2ef', label: '01' },
  { color: '#7c60c6', soft: '#ece5fa', label: '02' },
  { color: '#ef7a5a', soft: '#fce7de', label: '03' },
  { color: '#d6952c', soft: '#faefd7', label: '04' },
  { color: '#3e86e0', soft: '#e5eefb', label: '05' },
]

function formatDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}分${String(seconds).padStart(2, '0')}秒`
}

function saveLocalSubmission(record) {
  try {
    const existing = JSON.parse(localStorage.getItem('raz-submissions') || '[]')
    localStorage.setItem('raz-submissions', JSON.stringify([...existing, record]))
  } catch {
    // The server submission can still succeed when local storage is unavailable.
  }
}

async function sendSubmission(record) {
  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  })
  if (!response.ok) throw new Error(`成绩提交失败：${response.status}`)
}

function BrandMark() {
  return (
    <span className="lt-brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 14h2a2 2 0 0 1 2 2v3H6a2 2 0 0 1-2-2v-3Z" />
        <path d="M20 14h-2a2 2 0 0 0-2 2v3h2a2 2 0 0 0 2-2v-3Z" />
      </svg>
    </span>
  )
}

function LevelChooser({ onStart }) {
  return (
    <div className="lt-page-width">
      <section className="lt-hero">
        <div className="lt-hero-glow" aria-hidden="true" />
        <div className="lt-hero-copy">
          <span className="lt-eyebrow lt-eyebrow-light">LISTENING CHECK · 10 QUESTIONS</span>
          <h1>听力测试</h1>
          <p>选择当前 RAZ 级别开始。</p>
          <div className="lt-hero-tags">
            <span>建议在安静环境听</span>
            <span>可以听 2 遍</span>
            <span>70 分合格</span>
          </div>
        </div>
        <div className="lt-hero-orbit" aria-hidden="true">
          <span>10</span>
          <small>QUESTIONS</small>
        </div>
      </section>

      <div className="lt-section-heading">
        <div>
          <span className="lt-eyebrow">CHOOSE A LEVEL</span>
          <h2>选择测试级别</h2>
        </div>
        <p>无需提前填写姓名，完成后再提交成绩</p>
      </div>

      <div className="lt-level-grid">
        {listeningTests.map((test, index) => {
          const accent = levelAccents[index]
          return (
            <article
              key={test.id}
              className="lt-level-card"
              style={{ '--lt-accent': accent.color, '--lt-accent-soft': accent.soft }}
            >
              <div className="lt-level-card-top">
                <span className="lt-level-number">{accent.label}</span>
                <span className="lt-level-range">RAZ {test.levelRange}</span>
              </div>
              <div className="lt-level-icon" aria-hidden="true"><BrandMark /></div>
              <h3><b>{test.levelRange}</b> 级听力</h3>
              <p>{test.description}</p>
              <div className="lt-level-meta">
                <span>{test.questionCount} 题</span>
                <span>{test.passScore} 分合格</span>
              </div>
              <button type="button" onClick={() => onStart(test.id)}>
                进入 {test.levelRange} 级 <span>→</span>
              </button>
            </article>
          )
        })}
      </div>

      <section className="lt-note-card">
        <span className="lt-note-icon">i</span>
        <div>
          <strong>作答小提示</strong>
          <p>完成 10 题后填写姓名并查看成绩。</p>
        </div>
      </section>
    </div>
  )
}

function AnswerButtons({ question, answers, setAnswers, compact = false }) {
  return (
    <div className={`lt-answer-grid ${compact && !question.optionText ? 'lt-answer-grid-compact' : ''}`}>
      {question.options.map(option => {
        const selected = answers[question.id] === option
        return (
          <button
            key={option}
            type="button"
            onClick={() => setAnswers(previous => ({ ...previous, [question.id]: option }))}
            aria-pressed={selected}
            className={`lt-answer-button ${compact ? 'compact' : ''} ${selected ? 'selected' : ''}`}
          >
            <span>{option}</span>
            {question.optionText && <strong>{question.optionText[option]}</strong>}
            {!question.optionText && !compact && <strong>选择 {option}</strong>}
          </button>
        )
      })}
    </div>
  )
}

function PlaceGallery({ question }) {
  return (
    <div className="lt-place-gallery">
      {question.options.map(option => (
        <div key={option}>
          <img src={question.optionImages[option]} alt={`${option} 选项场景`} />
          <span>{option}</span>
        </div>
      ))}
    </div>
  )
}

function TestWorkspace({ test, answers, setAnswers, currentStep, setCurrentStep, onSubmit, onExit }) {
  const steps = test.sections.flatMap((section, sectionIndex) => (
    section.questions.map((question, sectionQuestionIndex) => ({
      ...question,
      section,
      sectionIndex,
      sectionQuestionIndex,
    }))
  ))
  const current = steps[currentStep]
  const isGrouped = Boolean(current.section.grouped)
  const groupStart = steps.findIndex(question => question.section.id === current.section.id)
  const groupEnd = groupStart + current.section.questions.length - 1
  const visibleQuestions = isGrouped ? current.section.questions : [current]
  const answeredCount = steps.filter(question => answers[question.id]).length
  const allAnswered = answeredCount === steps.length
  const pageComplete = visibleQuestions.every(question => answers[question.id])
  const previousIndex = isGrouped ? groupStart - 1 : currentStep - 1
  const nextIndex = isGrouped ? groupEnd + 1 : currentStep + 1
  const isLastPage = nextIndex >= steps.length
  const currentAudioSrc = isGrouped ? current.section.audioSrc : current.audioSrc

  const goToStep = index => {
    const target = steps[index]
    if (!target) return
    const normalizedIndex = target.section.grouped
      ? steps.findIndex(question => question.section.id === target.section.id)
      : index
    setCurrentStep(normalizedIndex)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="lt-workspace-width">
      <section className="lt-test-banner">
        <div className="lt-test-identity">
          <button type="button" onClick={onExit}>← 重新选级别</button>
          <div>
            <span className="lt-eyebrow lt-eyebrow-light">RAZ {test.levelRange} · LISTENING CHECK</span>
            <h1>{test.levelRange} 级听力测试</h1>
          </div>
        </div>
        <div className="lt-progress-box">
          <div><span>答题进度</span><strong>{answeredCount} / {steps.length}</strong></div>
          <div className="lt-progress-track"><i style={{ width: `${(answeredCount / steps.length) * 100}%` }} /></div>
        </div>
      </section>

      <nav className="lt-question-nav" aria-label="题目进度">
        <div>
          {steps.map((question, index) => {
            const selected = isGrouped ? question.sectionIndex === current.sectionIndex : index === currentStep
            const answered = Boolean(answers[question.id])
            return (
              <button
                key={question.id}
                type="button"
                onClick={() => goToStep(index)}
                aria-label={`第 ${index + 1} 题${answered ? '，已作答' : ''}`}
                aria-current={selected ? 'step' : undefined}
                className={`${selected ? 'current' : ''} ${answered ? 'answered' : ''}`}
              >
                {index + 1}
                {answered && !selected && <span>✓</span>}
              </button>
            )
          })}
        </div>
        <p><span>第 1 组 · 1–5 题</span><span>第 2 组 · 6–10 题</span></p>
      </nav>

      <div className="lt-test-layout">
        <section className="lt-audio-card lt-audio-card-top">
          <div className="lt-audio-copy">
            <div className="lt-audio-heading">
              <BrandMark />
              <div><span className="lt-eyebrow">LISTEN CAREFULLY</span><h2>{current.section.title}</h2></div>
            </div>
            <p>{current.section.instruction}</p>
          </div>
          <div className="lt-audio-player">
            <div className="lt-native-audio">
              <audio
                key={`${current.section.id}-${isGrouped ? 'group' : current.id}`}
                controls
                preload="metadata"
                src={currentAudioSrc}
                aria-label={`${current.section.title}听力音频`}
              />
              <small>已精确裁切 · 可以听 2 遍</small>
            </div>
            <p className="lt-audio-status">
              {isGrouped ? `${current.section.questions.length} 题共用本段录音` : `本组第 ${current.sectionQuestionIndex + 1} 题`}
            </p>
          </div>
        </section>

        <section className="lt-question-card">
          <header>
            <div>
              <span className="lt-eyebrow">{isGrouped ? `${visibleQuestions.length} QUESTIONS · ONE AUDIO` : `QUESTION ${currentStep + 1} OF ${steps.length}`}</span>
              <h2>{isGrouped ? '边听录音，边完成本页题目' : current.label}</h2>
            </div>
            <span className="lt-score-chip">{answeredCount}/{steps.length}</span>
          </header>

          {isGrouped ? (
            <div className="lt-group-content">
              {current.optionImages && (
                <section className="lt-gallery-card">
                  <strong>地点选项 A–H</strong>
                  <PlaceGallery question={current} />
                </section>
              )}
              <div className="lt-group-grid">
                {visibleQuestions.map((question, index) => (
                  <article key={question.id} className="lt-mini-question">
                    <div className="lt-mini-question-title">
                      <span>{groupStart + index + 1}</span>
                      {question.promptImage && <img src={question.promptImage} alt={`${question.label}物品图`} />}
                      <h3 className={question.promptImage ? 'capitalize' : ''}>{question.label}</h3>
                    </div>
                    <AnswerButtons question={question} answers={answers} setAnswers={setAnswers} compact />
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="lt-single-content">
              {current.imageSrc && (
                <div className="lt-question-image">
                  <img src={current.imageSrc} alt={`${current.label}图片选项`} />
                </div>
              )}
              <AnswerButtons question={current} answers={answers} setAnswers={setAnswers} />
            </div>
          )}

          <footer className="lt-question-actions">
            <button type="button" onClick={() => goToStep(previousIndex)} disabled={previousIndex < 0} className="secondary">
              ← {isGrouped ? '上一页' : '上一题'}
            </button>
            {isLastPage ? (
              <button type="button" onClick={onSubmit} disabled={!allAnswered} className="primary honey">
                {allAnswered ? '完成答题，提交成绩 →' : `还有 ${steps.length - answeredCount} 题未完成`}
              </button>
            ) : (
              <button type="button" onClick={() => goToStep(nextIndex)} disabled={!pageComplete} className="primary">
                {isGrouped ? '进入下一组' : '下一题'} →
              </button>
            )}
          </footer>
        </section>
      </div>
    </div>
  )
}

function NameGate({ studentName, setStudentName, onClose, onConfirm, submitting }) {
  const [error, setError] = useState('')

  const submit = event => {
    event.preventDefault()
    const trimmed = studentName.trim()
    if (!trimmed) {
      setError('请填写小朋友姓名后再查看成绩')
      return
    }
    onConfirm(trimmed)
  }

  return (
    <div className="lt-modal-backdrop" role="presentation">
      <form className="lt-name-gate" onSubmit={submit} aria-labelledby="name-gate-title">
        <button type="button" className="lt-modal-close" onClick={onClose} aria-label="关闭">×</button>
        <span className="lt-finish-icon">✓</span>
        <span className="lt-eyebrow">ALL QUESTIONS COMPLETED</span>
        <h2 id="name-gate-title">答题完成，最后一步</h2>
        <p>填写小朋友姓名后提交。成绩会汇总到老师后台，提交成功后才能查看本次成绩。</p>
        <label htmlFor="listening-student-name">小朋友姓名 <i>*</i></label>
        <input
          id="listening-student-name"
          value={studentName}
          onChange={event => { setStudentName(event.target.value); setError('') }}
          maxLength={30}
          autoFocus
          autoComplete="name"
          placeholder="请输入小朋友姓名"
        />
        {error && <div className="lt-name-error">{error}</div>}
        <button type="submit" className="lt-modal-submit" disabled={submitting}>
          {submitting ? '正在提交成绩…' : '提交并查看成绩 →'}
        </button>
        <button type="button" className="lt-modal-return" onClick={onClose}>返回检查答案</button>
      </form>
    </div>
  )
}

function ResultView({ test, studentName, answers, backendStatus, onSync, onRetry, onChoose }) {
  const questions = test.sections.flatMap(section => section.questions)
  const correctCount = questions.filter(question => answers[question.id] === question.answer).length
  const score = Math.round((correctCount / questions.length) * 100)
  const passed = score >= test.passScore
  const report = `${studentName} 听力测试：RAZ ${test.levelRange}，${score} 分，答对 ${correctCount}/${questions.length} 题，${passed ? '合格' : '未达到合格线'}。`
  const [copied, setCopied] = useState(false)

  return (
    <div className="lt-result-width">
      <section className={`lt-result-hero ${passed ? 'passed' : ''}`}>
        <div>
          <span className="lt-eyebrow lt-eyebrow-light">RAZ {test.levelRange} · LISTENING RESULT</span>
          <h1>{passed ? '听力测试合格' : '这次还差一点点'}</h1>
          <p>{studentName} · 答对 {correctCount} / {questions.length} 题</p>
        </div>
        <div className="lt-result-score"><strong>{score}</strong><span>合格线 {test.passScore} 分</span></div>
      </section>

      <div className={`lt-sync-status ${backendStatus}`}>
        <span>{backendStatus === 'saved' ? '✓' : backendStatus === 'saving' ? '…' : '!'}</span>
        <p>
          <strong>{backendStatus === 'saved' ? '成绩已汇总到老师后台' : backendStatus === 'saving' ? '正在汇总成绩' : '成绩已保存在本地后台'}</strong>
          <small>{backendStatus === 'local' ? '服务器暂未连接，请点击右侧按钮重新同步。' : '小朋友姓名与本次答题结果均已记录。'}</small>
        </p>
        {backendStatus === 'local' && <button type="button" onClick={onSync}>重新同步</button>}
      </div>

      <section className="lt-review-card">
        <header>
          <div><span className="lt-eyebrow">ANSWER REVIEW</span><h2>答案回顾</h2></div>
          <p>绿色为正确，红色为需要订正</p>
        </header>
        <div className="lt-review-grid">
          {questions.map((question, index) => {
            const correct = answers[question.id] === question.answer
            return (
              <article key={question.id} className={correct ? 'correct' : 'wrong'}>
                <span>{index + 1}</span>
                <div><strong>{question.label}</strong><p>你的答案：{answers[question.id]} · 正确答案：{question.answer}</p></div>
              </article>
            )
          })}
        </div>
        <div className="lt-result-actions">
          <button type="button" onClick={async () => {
            try { await navigator.clipboard.writeText(report); setCopied(true) } catch { setCopied(false) }
          }} className="primary">{copied ? '已复制结果 ✓' : '复制结果'}</button>
          <button type="button" onClick={onRetry} className="dark">重做本级别</button>
          <button type="button" onClick={onChoose} className="secondary">选择其他级别</button>
        </div>
      </section>
    </div>
  )
}

export default function ListeningPage() {
  const [phase, setPhase] = useState('choose')
  const [studentName, setStudentName] = useState('')
  const [testId, setTestId] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showNameGate, setShowNameGate] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [backendStatus, setBackendStatus] = useState('saving')
  const [lastSubmission, setLastSubmission] = useState(null)
  const [startedAt, setStartedAt] = useState(null)
  const test = testId ? listeningTestsById[testId] : null

  const startTest = id => {
    setTestId(id)
    setStudentName('')
    setAnswers({})
    setCurrentStep(0)
    setStartedAt(Date.now())
    setPhase('test')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const requestSubmit = () => {
    if (!test) return
    const questions = test.sections.flatMap(section => section.questions)
    if (questions.some(question => !answers[question.id])) return
    setShowNameGate(true)
  }

  const syncToBackend = async record => {
    setBackendStatus('saving')
    try {
      await sendSubmission(record)
      setBackendStatus('saved')
    } catch {
      setBackendStatus('local')
    }
  }

  const completeSubmission = async name => {
    if (!test || submitting) return
    setSubmitting(true)
    const questions = test.sections.flatMap(section => section.questions)
    const wrongQuestions = questions.flatMap((question, index) => (
      answers[question.id] === question.answer
        ? []
        : [{ id: index + 1, questionId: question.id, selected: answers[question.id], answer: question.answer }]
    ))
    const correctCount = questions.length - wrongQuestions.length
    const score = Math.round((correctCount / questions.length) * 100)
    const durationSeconds = Math.max(1, Math.floor((Date.now() - (startedAt || Date.now())) / 1000))
    const record = {
      id: Date.now(),
      submittedAt: new Date().toLocaleString('zh-CN'),
      studentName: name,
      levelId: test.levelRange,
      testType: 'listening',
      score,
      correctCount,
      wrongQuestions,
      passed: score >= test.passScore,
      weakSkills: score >= test.passScore ? [] : ['听力理解'],
      fictionWrong: 0,
      nonfictionWrong: 0,
      durationSeconds,
      durationText: formatDuration(durationSeconds),
      notes: '听力测试',
    }

    saveLocalSubmission(record)
    setLastSubmission(record)
    setStudentName(name)
    setShowNameGate(false)
    setPhase('result')
    setSubmitting(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    await syncToBackend(record)
  }

  const chooseAgain = () => {
    setPhase('choose')
    setTestId(null)
    setAnswers({})
    setStudentName('')
    setLastSubmission(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="lt-shell">
      <div className="lt-aurora" aria-hidden="true"><i /><i /><i /><i /></div>
      <header className="lt-topbar">
        <div>
          <Link to="/" className="lt-home-link"><span>←</span> 返回测试首页</Link>
          <div className="lt-brand-title"><BrandMark /><strong>Stacey老师专属加油站</strong></div>
          <span className="lt-top-pill">听力测试</span>
        </div>
      </header>

      <main className="lt-main">
        {phase === 'choose' && <LevelChooser onStart={startTest} />}
        {phase === 'test' && test && (
          <TestWorkspace
            test={test}
            answers={answers}
            setAnswers={setAnswers}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            onSubmit={requestSubmit}
            onExit={chooseAgain}
          />
        )}
        {phase === 'result' && test && studentName && (
          <ResultView
            test={test}
            studentName={studentName}
            answers={answers}
            backendStatus={backendStatus}
            onSync={() => lastSubmission && syncToBackend(lastSubmission)}
            onRetry={() => startTest(test.id)}
            onChoose={chooseAgain}
          />
        )}
      </main>

      {showNameGate && (
        <NameGate
          studentName={studentName}
          setStudentName={setStudentName}
          onClose={() => setShowNameGate(false)}
          onConfirm={completeSubmission}
          submitting={submitting}
        />
      )}
    </div>
  )
}
