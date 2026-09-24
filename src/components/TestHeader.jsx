import { Link } from 'react-router-dom'
import { formatTimer } from '../utils/testTiming'
import BackArrow from './BackArrow'

export default function TestHeader({
  backTo,
  backLabel,
  levelData,
  currentPassage,
  passageStartIndices,
  onSelectPassage,
  answeredCount,
  total,
  durationSeconds,
  onOpenPdf,
  onBatchInput,
  accent = 'teal',
  testLabel = '',
}) {
  const pdfSrc = `${import.meta.env.BASE_URL}${levelData.printPdf.replace(/^\//, '')}`
  const isPurple = accent === 'purple'
  const levelClasses = isPurple
    ? 'bg-purple-50 text-purple-700 border-purple-200'
    : 'bg-[#eef5e9] text-[#4e6c56] border-[#d4e3d1]'
  const batchClasses = isPurple
    ? 'bg-purple-600 hover:bg-purple-700 shadow-[0_3px_0_#7e22ce]'
    : 'bg-[#29465b] hover:bg-[#203a4d] shadow-[0_3px_0_#173042]'
  const activeTabClasses = isPurple
    ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-white text-purple-900 shadow-[0_5px_0_#c4b5fd] -translate-y-0.5'
    : 'border-[#c8ba82] bg-gradient-to-br from-[#f3ecd2] to-[#fffdf8] text-[#29465b] shadow-[0_5px_0_#b9ab77] -translate-y-0.5'

  return (
    <header className="raz-topbar sticky top-0 z-20 border-b border-[#e8e1d2] bg-[#fffdf6]/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              to={backTo}
              aria-label={backLabel}
              className="text-gray-400 hover:text-gray-700 text-xl flex-shrink-0 min-w-[40px] min-h-[40px] -ml-2 flex items-center justify-center"
            >
              <BackArrow className="w-[22px] h-[22px]" />
            </Link>
            <span className="hidden sm:grid w-10 h-10 place-items-center rounded-xl border border-[#eadc9b] bg-[#fff7c8] text-[#29465b] shadow-sm" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path d="M12 6.4C9.6 4.7 6.8 4.2 3.5 4.7v12.2c3.3-.5 6.1 0 8.5 1.8 2.4-1.8 5.2-2.3 8.5-1.8V4.7c-3.3-.5-6.1 0-8.5 1.7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                <path d="M12 6.4v12.3" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            </span>
            <span className="font-black text-[#26384a] text-sm sm:text-lg whitespace-nowrap">
              Stacey老师测评网站
            </span>
            <span className={`hidden md:inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-black whitespace-nowrap ${levelClasses}`}>
              {levelData.id}级{testLabel ? ` · ${testLabel}` : ''}
            </span>
          </div>

          <div className="grid w-full grid-cols-3 items-center gap-2 sm:flex sm:w-auto sm:justify-end sm:flex-shrink-0">
            <span className="hidden lg:inline-flex min-h-[36px] items-center rounded-lg border border-gray-200 bg-white px-3 text-xs font-bold text-gray-500">
              ◷ {formatTimer(durationSeconds)}
            </span>
            <span className="hidden sm:inline-flex min-h-[36px] items-center rounded-lg border border-gray-200 bg-white px-3 text-xs font-mono text-gray-500">
              已完成&nbsp;<strong className={isPurple ? 'text-purple-700' : 'text-[#4e6c56]'}>{answeredCount}/{total}</strong>
            </span>
            <a
              href={pdfSrc}
              download
              className="raz-tool-btn flex min-h-[42px] items-center justify-center rounded-xl border border-[#d8d4c9] bg-white px-2.5 text-xs sm:text-sm font-black text-[#52616a] shadow-[0_2px_0_#d4d0c5] transition-all hover:bg-[#f4f2ec] active:translate-y-[1px] active:shadow-none whitespace-nowrap"
            >
              <span aria-hidden="true">⇩</span>&nbsp; 下载PDF
            </a>
            <button
              type="button"
              onClick={onOpenPdf}
              className="raz-tool-btn flex min-h-[42px] items-center justify-center rounded-xl border border-[#c9b979] bg-[#f5edcf] px-3 text-xs sm:text-sm font-black text-[#655b38] shadow-[0_2px_0_#c2b273] transition-all hover:bg-[#eee2b7] active:translate-y-[1px] active:shadow-none whitespace-nowrap"
            >
              <span aria-hidden="true">▤</span>&nbsp; PDF对照答题
            </button>
            <button
              type="button"
              onClick={onBatchInput}
              className={`raz-tool-btn flex min-h-[42px] items-center justify-center rounded-xl px-3 text-xs sm:text-sm font-black text-white transition-all active:translate-y-[2px] active:shadow-none whitespace-nowrap ${batchClasses}`}
            >
              <span aria-hidden="true">✎</span>&nbsp; 批量输入答案
            </button>
          </div>
        </div>

        <nav className="mt-2.5 grid grid-cols-4 gap-2 sm:gap-2" aria-label="文章切换">
          {levelData.passages.map((passage, index) => {
            const count = passage.questions.length
            const start = passageStartIndices[index] + 1
            const end = start + count - 1
            const isActive = currentPassage.id === passage.id
            const cn = ['一', '二', '三', '四', '五', '六'][index] || index + 1
            return (
              <button
                key={passage.id}
                type="button"
                onClick={() => onSelectPassage(passageStartIndices[index])}
                className={`raz-passage-tab min-h-[64px] rounded-xl border px-3 py-2 text-left transition-all active:translate-y-[2px] active:shadow-none ${
                  isActive
                    ? activeTabClasses
                    : 'border-[#e6e0d2] bg-white text-[#66737a] shadow-[0_4px_0_#dedbd2] hover:border-[#d7c982] hover:-translate-y-0.5'
                }`}
              >
                <span className="raz-tab-title block text-[15px] lg:text-[17px] leading-tight font-black line-clamp-2">{passage.title}</span>
                <span className="raz-tab-short block font-black">第{cn}篇</span>
                <span className="block mt-1 text-[11px] font-bold opacity-65">第 {start}–{end} 题</span>
              </button>
            )
          })}
        </nav>

        <div className="mt-2 h-1.5 bg-[#efede6] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isPurple ? 'bg-gradient-to-r from-purple-500 to-purple-300' : 'bg-gradient-to-r from-[#6f9678] to-[#d6c36f]'}`}
            style={{ width: `${(answeredCount / total) * 100}%` }}
          />
        </div>
      </div>
    </header>
  )
}
