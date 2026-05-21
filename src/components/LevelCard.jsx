export default function LevelCard({ level, onClick, onPdfClick, theme = 'teal' }) {
  const isOpen = level.status === 'open'
  const lowLevelIds = ['A', 'B', 'C', 'D', 'E', 'F']
  const readingRule = lowLevelIds.includes(level.id)
    ? '题干个别生词可看中文提示；文章和选项不读、不解释。'
    : '独立阅读文章和选项，不翻译、不解释。'
  const isPurple = theme === 'purple'
  const accentText = isPurple ? 'text-purple-600' : 'text-teal-600'
  const accentBorder = isPurple ? 'border-purple-200' : 'border-teal-200'
  const accentBadge = isPurple ? 'bg-purple-100 text-purple-700' : 'bg-teal-100 text-teal-700'
  const primaryButton = isPurple
    ? 'bg-purple-500 hover:bg-purple-600 focus:ring-purple-300'
    : 'bg-teal-500 hover:bg-teal-600 focus:ring-teal-300'
  const secondaryButton = isPurple
    ? 'border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100'
    : 'border-teal-200 text-teal-700 bg-teal-50 hover:bg-teal-100'

  if (isOpen) {
    return (
      <div
        className={`group relative bg-white rounded-2xl p-5 text-left w-full
                   border-2 ${accentBorder} shadow-card
                   hover:shadow-card-hover hover:-translate-y-0.5
                   transition-all duration-200`}
      >
        <span className={`absolute top-3 right-3 text-[10px] font-bold
                         ${accentBadge} px-2 py-0.5 rounded-full`}>
          已开放
        </span>

        <div className="text-3xl mb-3">{level.icon || '📖'}</div>

        <div className={`font-black text-2xl ${accentText} font-mono mb-0.5`}>
          {level.id}
        </div>
        <div className="text-sm font-bold text-gray-700 mb-1">{level.name}</div>
        <div className="text-xs text-gray-500 leading-relaxed mb-3 space-y-1">
          <p className="font-bold text-gray-500">4篇文章 · 20题 · 每题5分 · 约20分钟</p>
          <p>请孩子自主认读完成。</p>
          <p className="text-gray-400">{readingRule}</p>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={onClick}
            className={`min-h-[44px] rounded-xl px-3 py-2.5 text-sm font-black text-white
                       ${primaryButton} shadow-sm transition-colors focus:outline-none focus:ring-2
                       focus:ring-offset-1`}
          >
            在线做题
          </button>
          {level.printPdf ? (
            <button
              type="button"
              onClick={onPdfClick}
              className={`min-h-[44px] rounded-xl px-3 py-2.5 text-sm font-black
                         border ${secondaryButton} transition-colors`}
            >
              📄 下载PDF打印
            </button>
          ) : (
            <div className="min-h-[44px] rounded-xl px-3 py-2.5 text-sm font-bold
                            border border-gray-200 bg-gray-50 text-gray-400 flex items-center justify-center">
              PDF暂未提供
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-gray-50 rounded-2xl p-5 border-2 border-gray-100
                    opacity-70 select-none">
      <span className="absolute top-3 right-3 text-[10px] font-bold
                       bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
        敬请期待
      </span>

      <div className="absolute top-3 left-3 text-lg opacity-40">🔒</div>

      <div className="text-3xl mb-3 opacity-40">{level.icon || '📚'}</div>

      <div className="font-black text-2xl text-gray-300 font-mono mb-0.5">
        {level.id}
      </div>
      <div className="text-sm font-bold text-gray-400 mb-1">{level.name}</div>
      <div className="text-xs text-gray-300">即将开放</div>
    </div>
  )
}
