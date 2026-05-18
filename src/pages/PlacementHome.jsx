import { useNavigate, Link } from 'react-router-dom'
import { placementList } from '../data/placement/index'
import LevelCard from '../components/LevelCard'

export default function PlacementHome() {
  const navigate = useNavigate()

  const cards = placementList.map(p => ({
    id: p.id,
    name: p.name,
    status: p.passages.length > 0 ? 'open' : 'coming',
    desc: p.passages.length > 0
      ? `${p.passages.length}篇文章 · ${p.passages.reduce((n, ps) => n + ps.questions.length, 0)}题`
      : '待导入PDF',
    icon: '📋',
  }))

  return (
    <div className="min-h-screen bg-cream-100">

      {/* ── Header ─────────────────────────────── */}
      <header className="bg-white/80 backdrop-blur border-b border-cream-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center gap-3">
          <Link to="/" className="text-gray-400 hover:text-gray-600 font-bold text-lg">←</Link>
          <div className="w-8 h-8 bg-purple-500 rounded-xl flex items-center justify-center
                          text-white font-black text-sm shadow-sm">
            P
          </div>
          <span className="font-extrabold text-gray-700 text-sm tracking-tight hidden sm:block">
            Stacey老师RAZ插班测试
          </span>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 pt-12 pb-8 text-center">
        <div className="inline-flex items-center gap-1.5 bg-purple-50 border border-purple-200
                        text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full mb-5">
          <span>📋</span>
          <span>插班测试</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-gray-800 leading-tight mb-4 tracking-tight">
          Stacey老师<span className="text-purple-500">插班</span>测试
        </h1>

        <p className="text-gray-500 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
          选择插班级别，完成测试后自动生成阅读诊断报告
        </p>

        <div className="mt-5 flex items-center justify-center gap-5 text-sm text-gray-400 flex-wrap">
          <span className="flex items-center gap-1">✅ 自动判分</span>
          <span className="flex items-center gap-1">📊 能力诊断</span>
          <span className="flex items-center gap-1">📄 可分享报告</span>
          <span className="flex items-center gap-1">🔊 英文发音</span>
        </div>
      </section>

      {/* ── Level grid ─────────────────────────── */}
      <section className="max-w-5xl mx-auto px-5 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {cards.map((card) => (
            <LevelCard
              key={card.id}
              level={card}
              onClick={() => navigate(`/placement/${card.id.toLowerCase()}`)}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          每题 5 分 · 满分 100 分 · 80 分以上可读该级别
        </p>
      </section>

    </div>
  )
}
