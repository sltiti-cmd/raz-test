import { useEffect, useState } from 'react'
import { playReadingPassage, playReadingTitle } from '../utils/readingAudio'

export default function PassageCard({ passage, passageIndex, levelId, tts, hideZh, hideTts, spacedParagraphs }) {
  const [imageOpen, setImageOpen] = useState(false)
  const showPassageTts = !hideTts && levelId === 'A' && tts?.passage !== false
  // 只显示题库明确绑定的原 PDF 插图；没有 image 字段时绝不补装饰图或生成图。
  const passageImage = passage.image
  const typeDisplay = hideZh
    ? (passage.type === 'fiction' ? 'Fiction' : 'Non-fiction')
    : passage.typeLabel
  // G 级及以上根据原文长度自动调整字号；一句一行的短句只做视觉分段，不改内容和顺序。
  const sourceLines = passage.text.split('\n').map(s => s.trim()).filter(Boolean)
  const wordCount = passage.text.trim().split(/\s+/).filter(Boolean).length
  const averageWordsPerLine = sourceLines.length ? wordCount / sourceLines.length : wordCount
  const shouldGroupShortLines = spacedParagraphs && sourceLines.length >= 8 && averageWordsPerLine < 18
  const groupSize = wordCount > 180 ? 2 : 3
  const paragraphs = shouldGroupShortLines
    ? sourceLines.reduce((groups, line, index) => {
        const groupIndex = Math.floor(index / groupSize)
        groups[groupIndex] = groups[groupIndex] ? `${groups[groupIndex]} ${line}` : line
        return groups
      }, [])
    : sourceLines
  const responsiveTextSize = wordCount <= 70
    ? 'text-[20px] sm:text-[22px] lg:text-[24px]'
    : wordCount <= 125
      ? 'text-[18px] sm:text-[20px] lg:text-[21px]'
      : wordCount <= 220
        ? 'text-[17px] sm:text-[18px] lg:text-[19px]'
        : 'text-base sm:text-[17px] lg:text-lg'
  const textClass = `text-[#26384a] ${responsiveTextSize} leading-[1.58] font-semibold tracking-[0.01em]`

  useEffect(() => {
    if (!imageOpen) return undefined
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = event => {
      if (event.key === 'Escape') setImageOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [imageOpen])

  return (
    <div className="bg-[#fffefb] rounded-2xl border border-[#e8e1d2] shadow-card p-5 sm:p-6 h-full">
      {/* Tags row */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="passage-chip passage-chip-number">
          PASSAGE {passageIndex + 1}
        </span>
        <span className={`passage-chip ${passage.type === 'fiction' ? 'passage-chip-fiction' : 'passage-chip-nonfiction'}`}>
          {typeDisplay}
        </span>
        <div className="flex-1" />
        {showPassageTts && (
          <button
            onClick={() => playReadingPassage(passage.id)}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-teal-500
                       bg-gray-50 hover:bg-teal-50 px-3 py-1.5 rounded-full border
                       border-gray-100 hover:border-teal-200 transition-colors font-semibold"
          >
            🔊 朗读
          </button>
        )}
      </div>

      {/* Title */}
      <div className="passage-title-row">
        <h3 className="font-serif text-2xl sm:text-[28px] leading-tight font-black text-[#2d4350]">{passage.title}</h3>
        <div className="passage-title-decoration" aria-hidden="true">
          <span className="pt-leaf pt-leaf-a" />
          <span className="pt-leaf pt-leaf-b" />
          <span className="pt-dot pt-dot-a" />
          <span className="pt-dot pt-dot-b" />
          <span className="pt-spark">✦</span>
        </div>
        {showPassageTts && (
          <button
            onClick={() => playReadingTitle(passage.id)}
            className="text-sm text-gray-400 hover:text-teal-500"
            aria-label="朗读文章标题"
            title="朗读文章标题"
          >
            🔊
          </button>
        )}
      </div>

      {/* Passage text */}
      <div className="relative">
        <div className={`bg-[#fffdf6] rounded-xl p-4 sm:p-5 border border-[#ece3ce]
                        max-h-[48vh] md:max-h-none overflow-y-auto md:overflow-visible
                        ${passageImage ? 'grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_170px] gap-4 items-start' : ''}`}>
          <div>
            {spacedParagraphs ? (
              <div className="space-y-4 lg:space-y-5">
                {paragraphs.map((para, i) => (
                  <p key={i} className={textClass}>{para}</p>
                ))}
              </div>
            ) : (
              <p className={`${textClass} whitespace-pre-line`}>{passage.text}</p>
            )}
          </div>
          {passageImage && (
            <figure className="m-0 rounded-xl border border-[#e8dfc8] bg-white p-2 shadow-sm">
              <button
                type="button"
                onClick={() => setImageOpen(true)}
                className="group block w-full cursor-zoom-in rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d7b84f]"
                aria-label={`放大查看《${passage.title}》原 PDF 插图`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${passageImage.replace(/^\//, '')}`}
                  alt={passage.imageAlt || `${passage.title} 原 PDF 插图`}
                  className="block h-auto max-h-[190px] w-full rounded-md object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
                <span className="mt-2 block text-[11px] font-bold tracking-wide text-[#7b725f]">点击放大</span>
              </button>
            </figure>
          )}
        </div>
        {/* 移动端底部渐隐，提示可上滑 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 rounded-b-xl
                        bg-gradient-to-t from-cream-100 to-transparent md:hidden" />
      </div>

      {imageOpen && passageImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#17232e]/85 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`《${passage.title}》插图大图`}
          onClick={() => setImageOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-white/15 text-3xl leading-none text-white hover:bg-white/25"
            onClick={() => setImageOpen(false)}
            aria-label="关闭大图"
          >
            ×
          </button>
          <div className="max-h-full max-w-[94vw]" onClick={event => event.stopPropagation()}>
            <img
              src={`${import.meta.env.BASE_URL}${passageImage.replace(/^\//, '')}`}
              alt={passage.imageAlt || `${passage.title} 原 PDF 插图`}
              className="max-h-[86vh] max-w-[94vw] rounded-2xl bg-white object-contain p-2 shadow-2xl"
            />
            <p className="mt-3 text-center text-sm font-bold text-white">{passage.title} · 原 PDF 插图</p>
          </div>
        </div>
      )}
    </div>
  )
}
