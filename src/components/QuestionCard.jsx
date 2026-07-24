import { speakEnglish } from '../utils/tts'

export default function QuestionCard({ question, selectedAnswer, onAnswer, tts, hideZh, hideTts, total, accent = 'teal' }) {
  const showOptionTts = !hideTts && tts?.options !== false
  const c = accent === 'purple'
    ? { selBg: 'bg-purple-50', selBorder: 'border-purple-400', keyBg: 'bg-purple-500',
        hoverBorder: 'hover:border-purple-200', hoverKey: 'group-hover:border-purple-300 group-hover:text-purple-500',
        text: 'text-purple-800', tts: 'hover:text-purple-500 hover:bg-purple-50', check: 'text-purple-500' }
    : { selBg: 'bg-teal-50', selBorder: 'border-teal-400', keyBg: 'bg-teal-500',
        hoverBorder: 'hover:border-teal-200', hoverKey: 'group-hover:border-teal-300 group-hover:text-teal-500',
        text: 'text-teal-800', tts: 'hover:text-teal-500 hover:bg-teal-50', check: 'text-teal-500' }
  return (
    <div className="bg-white rounded-2xl shadow-card p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs font-black text-gray-500 bg-gray-100
                         px-2.5 py-1 rounded-full">
          Q{question.id}{total ? ` / ${total}` : ''}
        </span>
        <span className="text-xs font-bold bg-blue-50 text-blue-500
                         px-2.5 py-1 rounded-full">
          {question.skill}
        </span>
      </div>

      {/* English question + TTS */}
      <div className="flex items-start gap-2 mb-1">
        <p className="flex-1 text-base sm:text-lg font-extrabold text-gray-800 leading-snug">
          {question.question}
        </p>
        {!hideTts && (
          <button
            onClick={() => speakEnglish(question.ttsText || question.question)}
            className={`flex-shrink-0 mt-0.5 w-7 h-7 flex items-center justify-center
                       rounded-full text-gray-300 transition-colors ${c.tts}`}
            title="朗读题目"
          >
            🔊
          </button>
        )}
      </div>

      {/* Chinese hint */}
      {!hideZh && question.questionZh && (
        <p className="text-xs text-gray-400 mb-5 pl-0.5">
          💡 {question.questionZh}
        </p>
      )}
      {(hideZh || !question.questionZh) && <div className="mb-5" />}

      {/* Options */}
      <div className="space-y-2.5">
        {question.options.map((opt) => {
          const isSelected = selectedAnswer === opt.key
          return (
            <div
              key={opt.key}
              role="button"
              tabIndex={0}
              onClick={() => onAnswer(question.id, opt.key)}
              onKeyDown={(e) => e.key === 'Enter' && onAnswer(question.id, opt.key)}
              className={`group flex items-center px-4 py-3.5 rounded-xl border-2
                          cursor-pointer select-none transition-all duration-150
                ${isSelected
                  ? `${c.selBg} ${c.selBorder} shadow-sm`
                  : `bg-gray-50 border-gray-100 hover:bg-white ${c.hoverBorder} hover:shadow-sm`
                }`}
            >
              {/* Key badge */}
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-lg mr-3 flex items-center
                            justify-center text-xs font-black transition-colors
                  ${isSelected
                    ? `${c.keyBg} text-white`
                    : `bg-white text-gray-400 border border-gray-200 ${c.hoverKey}`
                  }`}
              >
                {opt.key}
              </span>

              {/* Text */}
              <span className={`flex-1 text-sm sm:text-base font-semibold transition-colors
                ${isSelected ? c.text : 'text-gray-700'}`}>
                {opt.text}
              </span>

              {/* Selected checkmark */}
              {isSelected && (
                <span className={`flex-shrink-0 ml-2 font-black ${c.check}`}>✓</span>
              )}

              {/* TTS button — stopPropagation so it doesn't select */}
              {showOptionTts && (
                <button
                  onClick={(e) => { e.stopPropagation(); speakEnglish(opt.text) }}
                  className={`flex-shrink-0 ml-2 w-6 h-6 flex items-center justify-center
                             rounded-full text-gray-300 transition-colors text-sm ${c.tts}`}
                  title="朗读选项"
                >
                  🔊
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
