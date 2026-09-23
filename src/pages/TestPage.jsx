import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import levelA from '../data/levels/a'
import levelC from '../data/levels/c'
import levelD from '../data/levels/d'
import levelE from '../data/levels/e'
import levelG from '../data/levels/g'
import levelK from '../data/levels/k'
import levelO from '../data/levels/o'
import levelR from '../data/levels/r'
import { gradeTest } from '../utils/grading'
import PassageCard from '../components/PassageCard'
import QuestionCard from '../components/QuestionCard'
import TestHeader from '../components/TestHeader'
import { stopReadingAudio } from '../utils/readingAudio'
import BatchInputModal from '../components/BatchInputModal'
import PdfAnswerWorkspace from '../components/PdfAnswerWorkspace'
import SubmitModal from '../components/SubmitModal'
import Toast from '../components/Toast'
import { useToast } from '../hooks/useToast'
import { formatDurationText } from '../utils/testTiming'

const LEVELS = { a: levelA, c: levelC, d: levelD, e: levelE, g: levelG, k: levelK, o: levelO, r: levelR }

function UnknownLevel({ levelId }) {
  const displayLevel = (levelId || '').toUpperCase()

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center p-4">
      <div className="text-center max-w-sm">
        <div className="text-5xl mb-4">?</div>
        <h2 className="text-xl font-black text-gray-700 mb-2">
          级别暂未开放
        </h2>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          {displayLevel ? `${displayLevel}级别暂未开放，` : ''}请返回选择页面。
        </p>
        <Link to="/"
          className="inline-block px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-600
                     text-white font-black transition-colors">
          返回测试大厅
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
      <h1 className="text-2xl font-bold text-center mb-1">Stacey老师RAZ阅读测评</h1>
      <h2 className="text-lg font-semibold text-center text-gray-600 mb-1">{levelData.name} 测试卷</h2>
      <p className="text-center text-gray-500 text-sm mb-6">共{total}题 · 每题5分 · 满分100分</p>
      <div className="flex gap-12 mb-8 text-sm">
        <span>宝贝姓名：_______________</span>
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
          ? 'bg-[#29465b] text-white shadow-sm ring-2 ring-[#c7b87e] ring-offset-1 scale-110'
          : isAnswered
            ? 'bg-green-100 text-green-700 border border-green-200'
            : 'bg-white text-gray-500 border border-gray-200 hover:border-teal-300 hover:text-teal-600'
        }`}
    >
      {q.id}
    </button>
  )
}

// ─── Main test page ────────────────────────────────────────────────────────────
export default function TestPage() {
  const { levelId } = useParams()
  const navigate    = useNavigate()
  const levelData   = LEVELS[levelId?.toLowerCase()]
  const { toast, showToast } = useToast()

  const [answers,       setAnswers]       = useState({})
  const [currentIdx,    setCurrentIdx]    = useState(0)
  useEffect(() => () => stopReadingAudio(), [currentIdx, levelId])
  const [isBatchInputOpen, setIsBatchInputOpen] = useState(false)
  const [isPdfWorkspaceOpen, setIsPdfWorkspaceOpen] = useState(false)
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

  if (!levelData) {
    return <UnknownLevel levelId={levelId} />
  }

  const isHighLevel     = !['A', 'B', 'C', 'D', 'E', 'F'].includes(levelData.id)
  const allQuestions    = levelData.passages.flatMap(p => p.questions.map(q => ({ ...q, passage: p })))
  const passageStartIndices = levelData.passages.map((_, passageIndex) =>
    levelData.passages.slice(0, passageIndex).reduce((sum, passage) => sum + passage.questions.length, 0))
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
      testType: 'upgrade',
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

  return (
    <div className="raz-test-page min-h-screen">
      <Toast toast={toast} />

      {/* ── Print-only ── */}
      <div className="hidden print:block">
        <PrintContent levelData={levelData} />
      </div>

      <div className="print:hidden">

        <TestHeader
          backTo="/"
          backLabel="返回测试大厅"
          levelData={levelData}
          currentPassage={currentPassage}
          passageStartIndices={passageStartIndices}
          onSelectPassage={setCurrentIdx}
          answeredCount={answeredCount}
          total={total}
          durationSeconds={durationSeconds}
          onOpenPdf={() => setIsPdfWorkspaceOpen(true)}
          onBatchInput={openBatchInput}
          accent="teal"
        />

        {/* Question number scroll (tablet and below) */}
        <div className="lg:hidden overflow-x-auto border-b border-[#e8e1d2] bg-[#fffdf6]">
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
              className="px-3 h-8 rounded-lg text-xs font-bold bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100 whitespace-nowrap flex-shrink-0 transition-colors"
            >
              未答
            </button>
          </div>
        </div>

        {/* ── Main layout ── */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start">

            {/* ── Col 1: Question number sidebar (desktop only) ── */}
            <aside className="hidden lg:block flex-shrink-0 w-[72px] sticky top-[166px]">
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
              <div className="lg:sticky lg:top-[166px]">
                <PassageCard
                  passage={currentPassage}
                  passageIndex={passageIndex}
                  levelId={levelData.id}
                  tts={levelData.tts}
                  hideZh={isHighLevel}
                  hideTts={isHighLevel}
                  spacedParagraphs={isHighLevel}
                />
              </div>
            </div>

            {/* ── Col 3: Question + navigation ── */}
            <div className="w-full lg:w-[40%] flex-shrink-0">
              <QuestionCard
                question={currentQuestion}
                levelId={levelData.id}
                selectedAnswer={answers[currentQuestion.id]}
                onAnswer={handleAnswer}
                tts={levelData.tts}
                hideZh={isHighLevel}
                hideTts={isHighLevel}
                total={total}
                accent="teal"
              />

              {/* Navigation */}
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
                    className="flex-1 min-h-[48px] btn-candy-teal text-sm"
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

              {/* Bottom spacer for mobile feedback button */}
              <div className="h-16 md:h-4" />
            </div>

          </div>
        </div>
      </div>

      {isBatchInputOpen && (
        <BatchInputModal
          totalQuestions={total}
          allowedKeysByQuestion={allQuestions.map(q => q.options.map(option => option.key))}
          onFill={handleBatchFill}
          onClose={() => setIsBatchInputOpen(false)}
        />
      )}

      {isPdfWorkspaceOpen && (
        <PdfAnswerWorkspace
          levelData={levelData}
          questions={allQuestions}
          currentAnswers={answers}
          onApply={(nextAnswers) => {
            setAnswers(nextAnswers)
            setIsPdfWorkspaceOpen(false)
            showToast(`已保存 ${Object.keys(nextAnswers).length} 题答案`)
          }}
          onClose={() => setIsPdfWorkspaceOpen(false)}
        />
      )}

      {/* ── Submit modal (confirm + name entry in one step) ── */}
      {showSubmit && (
        <SubmitModal
          total={total}
          unanswered={unanswered}
          accent="teal"
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
