import { useRef } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import html2canvas from 'html2canvas'
import ResultReport from '../components/ResultReport'
import { generateReportText } from '../utils/report'
import Toast from '../components/Toast'
import { useToast } from '../hooks/useToast'

export default function ResultPage() {
  const { state }  = useLocation()
  const navigate   = useNavigate()
  const reportRef  = useRef(null)
  const { toast, showToast } = useToast()

  if (!state) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">没有找到测试结果</p>
          <Link to="/" className="text-teal-600 font-bold hover:underline">← 返回大厅</Link>
        </div>
      </div>
    )
  }

  const { result, studentInfo, levelId, testType, testPath } = state
  const retestPath = testPath || `/test/${levelId.toLowerCase()}`
  const { score, correctCount, total, wrongQuestions, passed } = result

  const handleDownload = async () => {
    if (!reportRef.current) return
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, useCORS: true, backgroundColor: '#fdf8f0', logging: false,
      })
      const link = document.createElement('a')
      link.download = `RAZ${levelId}级报告_${studentInfo.name}_${studentInfo.date}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      showToast('报告图片已下载 ✓')
    } catch {
      showToast('下载失败，请截图保存', 'error')
    }
  }

  const handleCopyText = () => {
    const text = generateReportText(studentInfo, result, levelId, testType)
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => showToast('报告文字已复制 ✓'))
    } else {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      showToast('报告文字已复制 ✓')
    }
  }

  return (
    <div className="min-h-screen bg-cream-100 py-5 px-4">
      <Toast toast={toast} />

      {/* ── Top action bar ── */}
      <div className="max-w-2xl mx-auto mb-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <Link to="/" className="text-gray-400 hover:text-gray-700 font-bold text-sm">
            ← 返回大厅
          </Link>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate(retestPath)}
              className="px-3 py-1.5 rounded-xl bg-white border border-gray-200
                         text-gray-600 text-xs sm:text-sm font-bold hover:bg-gray-50 transition-colors"
            >
              🔄 重新测试
            </button>
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-xl bg-white border border-teal-200
                         text-teal-700 text-xs sm:text-sm font-bold hover:bg-teal-50 transition-colors"
            >
              📋 复制文字
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-600
                         text-white text-xs sm:text-sm font-black transition-colors shadow-sm"
            >
              ⬇ 下载图片
            </button>
          </div>
        </div>
      </div>

      {/* ── Score banner ── */}
      <div className="max-w-2xl mx-auto mb-4">
        <div className={`rounded-2xl p-4 sm:p-5 flex items-center gap-4 sm:gap-5 border-2
          ${passed ? 'bg-teal-50/60 border-teal-200' : 'bg-orange-50/60 border-orange-200'}`}>
          <div className="text-center flex-shrink-0">
            <div className={`text-5xl sm:text-6xl font-black font-mono leading-none
              ${passed ? 'text-teal-600' : 'text-orange-500'}`}>
              {score}
            </div>
            <div className="text-xs text-gray-400 font-semibold mt-0.5">/ 100 分</div>
          </div>
          <div className="min-w-0">
            <div className="font-extrabold text-gray-800 text-lg sm:text-xl truncate">
              {studentInfo.name}
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1 font-semibold">
              答对 {correctCount}/{total} 题
              {wrongQuestions.length > 0
                ? <span className="ml-1">· 错题：Q{wrongQuestions.map(q => q.id).join('、Q')}</span>
                : <span className="ml-1 text-green-500">· 全部答对！</span>}
            </div>
            <div className={`inline-block mt-2 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-black
              ${passed ? 'bg-teal-500 text-white' : 'bg-orange-500 text-white'}`}>
              {passed ? `✅ 可以读${levelId}级` : `📖 建议继续巩固${levelId}级`}
            </div>
          </div>
        </div>
      </div>

      {/* ── Report card ── */}
      <div className="max-w-2xl mx-auto">
        <p className="text-center text-xs text-gray-400 mb-3">
          ↓ 诊断报告（截图或「下载图片」发给家长）
        </p>
        {/* Scale report to fit mobile screen */}
        <div className="overflow-x-auto pb-2">
          <div className="flex justify-center">
            <ResultReport
              ref={reportRef}
              studentInfo={studentInfo}
              gradingResult={result}
              levelId={levelId}
              testType={testType}
            />
          </div>
        </div>
      </div>

      {/* ── Bottom action buttons ── */}
      <div className="max-w-2xl mx-auto mt-5 grid grid-cols-2 sm:flex sm:flex-wrap gap-3 justify-center">
        <button onClick={handleDownload}
          className="py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-black
                     transition-colors shadow-sm text-sm sm:text-base sm:px-6">
          ⬇ 下载报告
        </button>
        <button onClick={handleCopyText}
          className="py-3 px-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold
                     hover:bg-gray-50 transition-colors text-sm sm:text-base sm:px-6">
          📋 复制文字
        </button>
        <button onClick={() => navigate(retestPath)}
          className="py-3 px-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold
                     hover:bg-gray-50 transition-colors text-sm sm:text-base sm:px-6">
          🔄 重新测试
        </button>
        <Link to="/"
          className="py-3 px-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold
                     hover:bg-gray-50 transition-colors text-center text-sm sm:text-base sm:px-6">
          🏠 返回大厅
        </Link>
      </div>

      {/* Bottom spacer for feedback button */}
      <div className="h-16" />
    </div>
  )
}
