import { speakEnglish } from '../utils/tts'

export default function QuestionCard({ question, selectedAnswer, onAnswer, tts, hideZh, hideTts }) {
  const showOptionTts = !hideTts && tts?.options !== false
  return (
    <div className="bg-white rounded-2xl shadow-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs font-bold text-gray-400 bg-gray-100
                         px-2.5 py-1 rounded-full">
          Q{question.id}
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
            className="flex-shrink-0 mt-0.5 w-7 h-7 flex items-center justify-center
                       rounded-full text-gray-300 hover:text-teal-500 hover:bg-teal-50
                       transition-colors"
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
                  ? 'bg-teal-50 border-teal-400 shadow-sm'
                  : 'bg-gray-50 border-gray-100 hover:bg-white hover:border-teal-200 hover:shadow-sm'
                }`}
            >
              {/* Key badge */}
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-lg mr-3 flex items-center
                            justify-center text-xs font-black transition-colors
                  ${isSelected
                    ? 'bg-teal-500 text-white'
                    : 'bg-white text-gray-400 border border-gray-200 group-hover:border-teal-300 group-hover:text-teal-500'
                  }`}
              >
                {opt.key}
              </span>

              {/* Text */}
              <span className={`flex-1 text-sm sm:text-base font-semibold transition-colors
                ${isSelected ? 'text-teal-800' : 'text-gray-700'}`}>
                {opt.text}
              </span>

              {/* TTS button — stopPropagation so it doesn't select */}
              {showOptionTts && (
                <button
                  onClick={(e) => { e.stopPropagation(); speakEnglish(opt.text) }}
                  className="flex-shrink-0 ml-2 w-6 h-6 flex items-center justify-center
                             rounded-full text-gray-300 hover:text-teal-400 hover:bg-teal-50
                             transition-colors text-sm"
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
