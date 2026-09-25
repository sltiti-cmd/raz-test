import { playReadingOption, playReadingQuestion } from '../utils/readingAudio'

export default function QuestionCard({ question, selectedAnswer, onAnswer, levelId, tts, hideZh, hideTts, total, accent = 'teal' }) {
  const showQuestionTts = !hideTts && ['A', 'B', 'C', 'D', 'E', 'F'].includes(levelId) && tts?.question !== false
  const showOptionTts = !hideTts && levelId === 'A' && tts?.options !== false
  const c = { selBg: 'bg-[#edf8f5]', selBorder: 'border-[#8fcfc0]', keyBg: 'bg-[#5daaa1]',
    hoverBorder: 'hover:border-[#b9ddd5]', hoverKey: 'group-hover:border-[#9fd1c6] group-hover:text-[#3f948d]',
    text: 'text-[#365f5a]', tts: 'hover:text-[#3f948d] hover:bg-[#edf8f5]', check: 'text-[#4b9f97]' }
  return (
    <div className="question-card-shell bg-white rounded-2xl shadow-card p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="question-meta-pill question-count-pill">
          Q{question.id}{total ? ` / ${total}` : ''}
        </span>
        <span className="question-meta-pill question-skill-pill">
          {question.skill}
        </span>
      </div>

      {/* English question + TTS */}
      <div className="flex items-start gap-2 mb-1">
        <p className="flex-1 text-base sm:text-lg font-extrabold text-gray-800 leading-snug">
          {question.question}
        </p>
        {showQuestionTts && (
          <button
            onClick={() => playReadingQuestion(levelId, question.id)}
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

              {/* 原卷中的纯图形选项保留图像，不朗读，也不补写答案文字。 */}
              {opt.image ? (
                <img
                  src={`${import.meta.env.BASE_URL}${opt.image.replace(/^\//, '')}`}
                  alt={opt.imageAlt || '图形选项'}
                  className="flex-1 h-20 w-auto max-w-full object-contain object-left"
                />
              ) : (
                <span className={`flex-1 text-sm sm:text-base font-semibold transition-colors
                  ${isSelected ? c.text : 'text-gray-700'}`}>
                  {opt.text}
                </span>
              )}

              {/* Selected checkmark */}
              {isSelected && (
                <span className={`flex-shrink-0 ml-2 font-black ${c.check}`}>✓</span>
              )}

              {/* TTS button — stopPropagation so it doesn't select */}
              {showOptionTts && !opt.graphicOnly && !/^[●\s]+$/.test(opt.text) && (
                <button
                  onClick={(e) => { e.stopPropagation(); playReadingOption(question.id, opt.key) }}
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
