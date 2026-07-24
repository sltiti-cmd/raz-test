import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import placementB from '../data/placement/b'
import placementC from '../data/placement/c'
import placementE from '../data/placement/e'
import placementF from '../data/placement/f'
import placementH from '../data/placement/h'
import placementI from '../data/placement/i'
import placementJ from '../data/placement/j'
import placementL from '../data/placement/l'
import placementM from '../data/placement/m'
import placementN from '../data/placement/n'
import placementP from '../data/placement/p'
import placementQ from '../data/placement/q'
import { gradeTest } from '../utils/grading'
import PassageCard from '../components/PassageCard'
import QuestionCard from '../components/QuestionCard'
import BatchInputModal from '../components/BatchInputModal'
import SubmitModal from '../components/SubmitModal'
import Toast from '../components/Toast'
import { useToast } from '../hooks/useToast'
import { openPrintPdf } from '../utils/printPdf'
import { formatDurationText, formatTimer } from '../utils/testTiming'

const LEVELS = { b: placementB, c: placementC, e: placementE, f: placementF, h: placementH, i: placementI, j: placementJ, l: placementL, m: placementM, n: placementN, p: placementP, q: placementQ }

// ─── Empty level placeholder ──────────────────────────────────────────────────
function EmptyLevel({ levelId }) {
  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center p-4">
      <div className="text-center max-w-sm">
        <div className="text-6xl mb-4">📋</div>
        <h2 className="text-xl font-black text-gray-700 mb-2">
          {levelId}级插班测试数据尚未导入
        </h2>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          请将 PDF 文件放入{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">
            raw/placement/{levelId}/
          </code>{' '}
          目录，然后运行：
          <br />
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono mt-2 inline-block">
            npm run import:placement
          </code>
        </p>
        <Link to="/placement"
          className="inline-block px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600
                     text-white font-black transition-colors">
          ← 返回插班测试大厅
        </Link>
      </div>
    </div>
  )
}

// ─── Print-only view ──────────────────────────────────────────────────────────
function PrintContent({ levelData }) {
  const total = levelData.passages.reduce((n, p) => n + p.questions.length, 0)
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-1">Stacey老师RAZ插班测试</h1>
      <h2 className="text-lg font-semibold text-center text-gray-600 mb-1">{levelData.name} 测试卷</h2>
      <p className="text-center text-gray-500 text-sm mb-6">共{total}题 · 每题5分 · 满分100分</p>
      <div className="flex gap-12 mb-8 text-sm">
        <span>微信名：_______________</span>
        <span>日期：_______________</span>
        <span>得分：_______________</span>
      </div>
      {levelData.passages.map((passage, pi) => (
        <div key={passage.id} className="print-article mb-8">
          <h3 className="text-base font-bold mb-1">
            Passage {pi + 1}：{passage.title}
            <span className="text-sm font-normal text-gray-500 ml-2">({passage.typeLabel})</span>
          </h3>
          <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50">
            <p className="text-base leading-relaxed whitespace-pre-line font-medium">{passage.text}</p>
          </div>
          {passage.questions.map((q) => (
            <div key={q.id} className="mb-4">
              <p className="font-medium mb-1.5">Q{q.id}. {q.question}</p>
              <div className="space-y-1 pl-4">
                {q.options.map((opt) => (
                  <p key={opt.key} className="text-sm">（{opt.key}）{opt.text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── Question number button ───────────────────────────────────────────────────
function QNumBtn({ q, idx, currentIdx, answered, onClick }) {
  const isCurrent  = idx === currentIdx
  const isAnswered = !!answered[q.id]
  return (
    <button
      onClick={() => onClick(idx)}
      className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all
        ${isCurrent
          ? 'bg-purple-500 text-white shadow-sm ring-2 ring-purple-300 ring-offset-1 scale-110'
          : isAnswered
            ? 'bg-green-100 text-green-700 border border-green-200'
            : 'bg-white text-gray-500 border border-gray-200 hover:border-purple-300 hover:text-purple-600'
        }`}
    >
      {q.id}
    </button>
  )
}

// ─── Main placement test page ──────────────────────────────────────────────────
export default function PlacementPage() {
  const { levelId } = useParams()
  const navigate    = useNavigate()
  const levelData   = LEVELS[levelId?.toLowerCase()] || placementB
  const { toast, showToast } = useToast()

  const [answers,       setAnswers]       = useState({})
  const [currentIdx,    setCurrentIdx]    = useState(0)
  const [isBatchInputOpen, setIsBatchInputOpen] = useState(false)
  const [showSubmit,    setShowSubmit]    = useState(false)
  const [unanswered,    setUnanswered]    = useState([])
  const [startedAt]                       = useState(() => Date.now())
  const [durationSeconds, setDurationSeconds] = useState(0)
  const [timerStopped, setTimerStopped]   = useState(false)

  useEffect(() => {
    if (!levelData || timerStopped) return undefined
    const tick = () => setDurationSeconds(Math.floor((Date.now() - startedAt) / 1000))
    tick()
    const timer = window.setInterval(tick, 1000)
    return () => window.clearInterval(timer)
  }, [levelData, startedAt, timerStopped])

  // 手机上切到新文章时滚回顶部，避免孩子没注意到文章换了
  const prevPassageRef = useRef(null)
  useEffect(() => {
    if (!levelData) return
    const passageIds = levelData.passages.flatMap(p => p.questions.map(() => p.id))
    const pid = passageIds[currentIdx]
    if (prevPassageRef.current !== null && prevPassageRef.current !== pid
        && window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    prevPassageRef.current = pid
  }, [currentIdx, levelData])

  if (levelData.passages.length === 0) {
    return <EmptyLevel levelId={levelData.id} />
  }

  // A–F 级显示中文题干提示，G 级及以上不显示（与升级测试规则一致）
  const isHighLevel     = !['A', 'B', 'C', 'D', 'E', 'F'].includes(levelData.id)
  const allQuestions    = levelData.passages.flatMap(p => p.questions.map(q => ({ ...q, passage: p })))
  const total           = allQuestions.length
  const currentQuestion = allQuestions[currentIdx]
  const currentPassage  = currentQuestion.passage
  const passageIndex    = levelData.passages.indexOf(currentPassage)
  const answeredCount   = Object.keys(answers).length

  const handleAnswer = (questionId, key) =>
    setAnswers(prev => ({ ...prev, [questionId]: key }))

  const handleSubmitRequest = () => {
    const missing = allQuestions.filter(q => !answers[q.id])
    setUnanswered(missing.map(q => q.id))
    setShowSubmit(true)
  }

  const doSubmit = (name) => {
    const studentInfo = {
      name,
      date: new Date().toLocaleDateString('zh-CN'),
    }

    const result     = gradeTest(levelData, answers)
    const finalDurationSeconds = Math.floor((Date.now() - startedAt) / 1000)
    const finalDurationText = formatDurationText(finalDurationSeconds)
    setDurationSeconds(finalDurationSeconds)
    setTimerStopped(true)
    const weakSkills = Object.entries(result.skillCounts)
      .sort((a, b) => b[1] - a[1]).slice(0, 2).map(([s]) => s)

    const submission = {
      id: Date.now(),
      submittedAt: new Date().toLocaleString('zh-CN'),
      studentName: name,
      levelId: levelData.id,
      testType: 'placement',
      score: result.score,
      correctCount: result.correctCount,
      wrongQuestions: result.wrongQuestions,
      passed: result.passed,
      weakSkills,
      fictionWrong: result.fictionWrong,
      nonfictionWrong: result.nonfictionWrong,
      durationSeconds: finalDurationSeconds,
      durationText: finalDurationText,
      notes: '',
    }

    const existing = JSON.parse(localStorage.getItem('raz-submissions') || '[]')
    localStorage.setItem('raz-submissions', JSON.stringify([...existing, submission]))

    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    }).catch(() => {})

    navigate('/result', {
      state: {
        result: { ...result, durationSeconds: finalDurationSeconds, durationText: finalDurationText },
        studentInfo,
        levelId: levelData.id,
        testType: 'placement',
        testPath: `/placement/${levelData.id.toLowerCase()}`,
      },
    })
  }

  const handleBatchFill = (tokens) => {
    const newAnswers = {}
    allQuestions.forEach((q, idx) => { if (tokens[idx]) newAnswers[q.id] = tokens[idx] })
    setAnswers(newAnswers)
    setIsBatchInputOpen(false)
    // 填完直接进入提交步骤，不用再点一次「提交」
    setUnanswered(allQuestions.filter(q => !newAnswers[q.id]).map(q => q.id))
    setShowSubmit(true)
    showToast(`已填入 ${tokens.length} 题答案`)
  }

  const openBatchInput = (e) => {
    e?.preventDefault?.()
    e?.stopPropagation?.()
    setIsBatchInputOpen(true)
  }

  const handlePrint = () => openPrintPdf(levelData)

  return (
    <div className="min-h-screen bg-cream-100">
      <Toast toast={toast} />

      {/* ── Print-only ── */}
      <div className="hidden print:block">
        <PrintContent levelData={levelData} />
      </div>

      <div className="print:hidden">

        {/* ── Sticky header ── */}
        <header className="bg-white/90 backdrop-blur border-b border-cream-200 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Link to="/placement" aria-label="返回插班测试大厅"
                  className="text-gray-400 hover:text-gray-600 text-lg flex-shrink-0 min-w-[40px] min-h-[40px]
                             -ml-2 flex items-center justify-center">←</Link>
                <span className="font-extrabold text-gray-800 text-sm sm:text-base">
                  RAZ <span className="font-mono text-purple-500">{levelData.id}</span>级
                  <span className="text-purple-400 font-semibold text-xs ml-1">插班</span>
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-mono text-gray-500">
                  <span className="text-purple-600 font-bold">{answeredCount}</span>/{total}
                </span>
                <button
                  onClick={handlePrint}
                  className="min-h-[36px] text-xs bg-purple-50 hover:bg-purple-100 text-purple-700
                             border border-purple-200 px-3 py-1.5 rounded-lg transition-colors
                             whitespace-nowrap no-print font-black"
                >
                  📄 PDF试卷
                </button>
              </div>
            </div>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500
                           bg-gradient-to-r from-purple-500 to-purple-300"
                style={{ width: `${(answeredCount / total) * 100}%` }}
              />
            </div>
          </div>

          {/* Question number scroll (tablet and below) */}
          <div className="lg:hidden overflow-x-auto border-t border-cream-200">
            <div className="flex gap-1.5 px-3 sm:px-4 py-2 w-max">
              {allQuestions.map((q, idx) => (
                <QNumBtn key={q.id} q={q} idx={idx} currentIdx={currentIdx}
                         answered={answers} onClick={setCurrentIdx} />
              ))}
              <button
                onClick={() => {
                  const i = allQuestions.findIndex(q => !answers[q.id])
                  if (i !== -1) setCurrentIdx(i)
                }}
                className="px-3 h-8 rounded-lg text-xs font-bold bg-orange-50
                           text-orange-600 border border-orange-200 hover:bg-orange-100
                           whitespace-nowrap flex-shrink-0 transition-colors"
              >
                未答
              </button>
            </div>
          </div>
        </header>

        {/* ── Main layout ── */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
          <div className="mb-4 rounded-2xl border border-purple-200 bg-white p-3 sm:p-5 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-4 lg:justify-between">
              <div className="min-w-0 flex items-center justify-between gap-3 sm:block">
                <div className="hidden sm:block">
                  <h2 className="text-base font-black text-gray-800 mb-1">测试说明</h2>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    4篇文章20题，约20分钟。可打开PDF记录答案，也可以直接在线答题。
                  </p>
                </div>
                <div className="sm:mt-2 inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-sm font-black text-purple-700 whitespace-nowrap">
                  已用时：{formatTimer(durationSeconds)}
                </div>
              </div>
              <div className="flex flex-row gap-2 lg:flex-shrink-0">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 sm:flex-initial min-h-[44px] px-4 rounded-xl border border-purple-200 bg-purple-50
                             hover:bg-purple-100 text-purple-700 text-sm font-black transition-colors"
                >
                  📄 下载PDF试卷
                </button>
                <button
                  type="button"
                  onClick={openBatchInput}
                  className="flex-1 sm:flex-initial min-h-[44px] px-4 rounded-xl bg-purple-600 hover:bg-purple-700
                             text-white text-sm font-black transition-colors"
                >
                  📝 批量输入答案
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-start">

            {/* ── Col 1: Question number sidebar (desktop only) ── */}
            <aside className="hidden lg:block flex-shrink-0 w-[72px] sticky top-[88px]">
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                {allQuestions.map((q, idx) => (
                  <QNumBtn key={q.id} q={q} idx={idx} currentIdx={currentIdx}
                           answered={answers} onClick={setCurrentIdx} />
                ))}
              </div>
              <button
                onClick={() => {
                  const i = allQuestions.findIndex(q => !answers[q.id])
                  if (i !== -1) setCurrentIdx(i)
                }}
                className="w-full text-[11px] font-bold text-orange-600 bg-orange-50
                           border border-orange-200 rounded-lg py-1.5 hover:bg-orange-100
                           transition-colors"
              >
                未答
              </button>
            </aside>

            {/* ── Col 2: Passage ── */}
            <div className="flex-1 min-w-0 w-full">
              <div className="md:sticky md:top-[88px]">
                <PassageCard
                  passage={currentPassage}
                  passageIndex={passageIndex}
                  tts={levelData.tts}
                  hideZh={isHighLevel}
                />
              </div>
            </div>

            {/* ── Col 3: Question + navigation ── */}
            <div className="w-full md:w-[46%] lg:w-[44%] flex-shrink-0">
              <QuestionCard
                question={currentQuestion}
                selectedAnswer={answers[currentQuestion.id]}
                onAnswer={handleAnswer}
                tts={levelData.tts}
                hideZh={isHighLevel}
                total={total}
                accent="purple"
              />

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => setCurrentIdx(p => Math.max(0, p - 1))}
                  disabled={currentIdx === 0}
                  className="flex-1 min-h-[48px] rounded-2xl bg-white border-2 border-gray-200
                             hover:border-gray-300 text-gray-600 font-black
                             disabled:opacity-40 transition-all text-sm"
                >
                  ← 上一题
                </button>
                {currentIdx < total - 1 ? (
                  <button
                    onClick={() => setCurrentIdx(p => Math.min(total - 1, p + 1))}
                    className="flex-1 min-h-[48px] btn-candy-purple text-sm"
                  >
                    下一题 →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitRequest}
                    className="flex-1 min-h-[48px] btn-candy-orange text-sm"
                  >
                    提交答案 ✓
                  </button>
                )}
              </div>

              <div className="flex gap-3 mt-2.5">
                <button
                  type="button"
                  onClick={openBatchInput}
                  className="flex-1 py-2.5 rounded-xl border border-purple-200 bg-purple-50
                             text-sm font-bold text-purple-700 transition-colors hover:bg-purple-100"
                >
                  📝 批量输入答案
                </button>
                {answeredCount > 0 && (
                  <button
                    onClick={handleSubmitRequest}
                    className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600
                               text-white text-sm font-black transition-colors"
                  >
                    提交 ✓
                  </button>
                )}
              </div>

              {/* Bottom spacer for mobile feedback button */}
              <div className="h-16 md:h-4" />
            </div>

          </div>
        </div>
      </div>

      {isBatchInputOpen && (
        <BatchInputModal
          totalQuestions={total}
          onFill={handleBatchFill}
          onClose={() => setIsBatchInputOpen(false)}
        />
      )}

      {/* ── Submit modal (confirm + name entry in one step) ── */}
      {showSubmit && (
        <SubmitModal
          total={total}
          unanswered={unanswered}
          accent="purple"
          onGoTo={() => {
            setShowSubmit(false)
            const i = allQuestions.findIndex(q => unanswered.includes(q.id))
            if (i !== -1) setCurrentIdx(i)
          }}
          onClose={() => setShowSubmit(false)}
          onSubmit={doSubmit}
        />
      )}
    </div>
  )
}
