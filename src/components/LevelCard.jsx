export default function LevelCard({ level, onClick }) {
  const isOpen = level.status === 'open'

  if (isOpen) {
    return (
      <button
        onClick={onClick}
        className="group relative bg-white rounded-2xl p-5 text-left w-full
                   border-2 border-teal-200 shadow-card
                   hover:shadow-card-hover hover:-translate-y-0.5
                   transition-all duration-200 cursor-pointer"
      >
        {/* Open badge */}
        <span className="absolute top-3 right-3 text-[10px] font-bold
                         bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
          已开放
        </span>

        <div className="text-3xl mb-3">{level.icon || '📖'}</div>

        <div className="font-black text-2xl text-teal-600 font-mono mb-0.5">
          {level.id}
        </div>
        <div className="text-sm font-bold text-gray-700 mb-1">{level.name}</div>
        {level.desc && (
          <div className="text-xs text-gray-400 mb-3">{level.desc}</div>
        )}

        <div className="inline-flex items-center gap-1 text-sm font-bold text-teal-600
                        group-hover:gap-2 transition-all">
          开始测试 <span>→</span>
        </div>
      </button>
    )
  }

  return (
    <div className="relative bg-gray-50 rounded-2xl p-5 border-2 border-gray-100
                    opacity-70 select-none">
      {/* Coming soon badge */}
      <span className="absolute top-3 right-3 text-[10px] font-bold
                       bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
        敬请期待
      </span>

      {/* Lock overlay */}
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
