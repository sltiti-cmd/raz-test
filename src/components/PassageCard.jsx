import { speakEnglish } from '../utils/tts'

export default function PassageCard({ passage, passageIndex, tts, hideZh, hideTts }) {
  const showPassageTts = !hideTts && tts?.passage !== false
  const typeDisplay = hideZh
    ? (passage.type === 'fiction' ? 'Fiction' : 'Non-fiction')
    : passage.typeLabel
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
      <div className="bg-cream-100 rounded-xl p-4 sm:p-5 border border-cream-200
                      max-h-[40vh] md:max-h-none overflow-y-auto md:overflow-visible">
        <p className="text-gray-800 text-base sm:text-lg lg:text-xl xl:text-[22px]
                      leading-relaxed lg:leading-[1.9] font-bold tracking-wide
                      whitespace-pre-line">
          {passage.text}
        </p>
      </div>
    </div>
  )
}
