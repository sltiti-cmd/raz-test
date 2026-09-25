import { useRef } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import html2canvas from 'html2canvas'
import ResultReport from '../components/ResultReport'
import { generateReportText } from '../utils/report'
import Toast from '../components/Toast'
import { useToast } from '../hooks/useToast'
import BackArrow from '../components/BackArrow'

export default function ResultPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const reportRef = useRef(null)
  const { toast, showToast } = useToast()

  if (!state) {
    return (
      <div className="min-h-screen bg-[#fffdf9] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#747b91] mb-4">没有找到测试结果</p>
          <Link to="/" className="inline-flex items-center gap-1.5 text-[#3f948d] font-bold hover:underline">
            <BackArrow className="w-4 h-4" /> 返回大厅
          </Link>
        </div>
      </div>
    )
  }

  const { result, studentInfo, levelId, testType, testPath } = state
  const retestPath = testPath || `/test/${levelId.toLowerCase()}`

  const handleDownload = async () => {
    if (!reportRef.current) return
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#fffdf9',
        logging: false,
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
    <div className="report-page-shell">
      <Toast toast={toast} />

      <div className="report-page-inner">
        <div className="report-actions-top">
          <Link to="/" className="report-back-link">
            <BackArrow className="w-4 h-4" /> 返回大厅
          </Link>
          <div className="report-action-group">
            <button onClick={() => navigate(retestPath)} className="report-action-btn">
              ↻ 重新测试
            </button>
            <button onClick={handleCopyText} className="report-action-btn">
              ▤ 复制文字
            </button>
            <button onClick={handleDownload} className="report-action-btn primary">
              ↓ 下载报告
            </button>
          </div>
        </div>

        <ResultReport
          ref={reportRef}
          studentInfo={studentInfo}
          gradingResult={result}
          levelId={levelId}
          testType={testType}
        />

        <div className="report-bottom-actions">
          <button onClick={handleDownload} className="report-bottom-btn primary">
            ↓ 下载报告
          </button>
          <button onClick={handleCopyText} className="report-bottom-btn">
            ▤ 复制文字
          </button>
          <button onClick={() => navigate(retestPath)} className="report-bottom-btn">
            ↻ 重新测试
          </button>
          <Link to="/" className="report-bottom-btn">
            ⌂ 返回大厅
          </Link>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
