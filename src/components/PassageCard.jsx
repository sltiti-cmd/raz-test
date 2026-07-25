import { speakEnglish } from '../utils/tts'

export default function PassageCard({ passage, passageIndex, tts, hideZh, hideTts, spacedParagraphs }) {
  const showPassageTts = !hideTts && tts?.passage !== false
  const typeDisplay = hideZh
    ? (passage.type === 'fiction' ? 'Fiction' : 'Non-fiction')
    : passage.typeLabel
  // 高级别（G及以上）文章多段落，段间空行更易读；低级别每行一句保持紧凑
  const paragraphs = passage.text.split('\n').map(s => s.trim()).filter(Boolean)
  const textClass = 'text-gray-800 text-base sm:text-lg lg:text-xl xl:text-[22px] ' +
                    'leading-relaxed lg:leading-[1.9] font-bold tracking-wide'
  return (
    <div className="bg-white rounded-2xl shadow-card p-6 h-full">
      {/* Tags row */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-[11px] font-black text-amber-700 bg-amber-100
                         px-2.5 py-1 rounded-full tracking-wide">
          PASSAGE {passageIndex + 1}
        </span>
        <span className={`text-[11px] font-black px-2.5 py-1 rounded-full
          ${passage.type === 'fiction'
            ? 'bg-purple-100 text-purple-700'
            : 'bg-teal-100 text-teal-700'}`}>
          {typeDisplay}
        </span>
        <div className="flex-1" />
        {showPassageTts && (
          <button
            onClick={() => speakEnglish(passage.text.replace(/\n/g, '. '))}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-teal-500
                       bg-gray-50 hover:bg-teal-50 px-3 py-1.5 rounded-full border
                       border-gray-100 hover:border-teal-200 transition-colors font-semibold"
          >
            🔊 朗读
          </button>
        )}
      </div>

      {/* Title */}
      <h3 className="text-base font-extrabold text-gray-700 mb-4">{passage.title}</h3>

      {/* Passage text */}
      <div className="relative">
        <div className="bg-cream-100 rounded-xl p-4 sm:p-5 border border-cream-200
                        max-h-[40vh] md:max-h-none overflow-y-auto md:overflow-visible">
          {spacedParagraphs ? (
            <div className="space-y-3 lg:space-y-4">
              {paragraphs.map((para, i) => (
                <p key={i} className={textClass}>{para}</p>
              ))}
            </div>
          ) : (
            <p className={`${textClass} whitespace-pre-line`}>{passage.text}</p>
          )}
        </div>
        {/* 移动端底部渐隐，提示可上滑 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 rounded-b-xl
                        bg-gradient-to-t from-cream-100 to-transparent md:hidden" />
      </div>
    </div>
  )
}
