import { useNavigate, Link } from 'react-router-dom'
import LevelCard from '../components/LevelCard'

const UPGRADE_LEVELS = [
  { id: 'A', name: 'A级别', status: 'open', desc: '4篇文章 · 20题', icon: '📖' },
  { id: 'D', name: 'D级别', status: 'open', desc: '4篇文章 · 20题', icon: '📚' },
  { id: 'G', name: 'G级别', status: 'open', desc: '4篇文章 · 20题', icon: '🌿' },
  { id: 'K', name: 'K级别', status: 'open', desc: '4篇文章 · 20题', icon: '🚀' },
  { id: 'O', name: 'O级别', status: 'open', desc: '4篇文章 · 20题', icon: '🏆' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-cream-100">

      {/* ── Header ── */}
      <header className="bg-white/80 backdrop-blur border-b border-cream-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2.5">
          <div className="w-8 h-8 bg-teal-500 rounded-xl flex items-center justify-center
                          text-white font-black text-sm shadow-sm flex-shrink-0">
            R
          </div>
          <span className="font-extrabold text-gray-700 text-sm tracking-tight">
            Stacey老师RAZ测试系统
          </span>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="max-w-3xl mx-auto px-4 pt-8 pb-5 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800 leading-tight mb-3 tracking-tight">
          Stacey老师<span className="text-teal-500">RAZ</span>测试
        </h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-xs sm:max-w-lg mx-auto leading-relaxed">
          选择级别，完成后自动生成阅读诊断报告
        </p>
      </section>

      {/* ── Upgrade test card ── */}
      <section className="max-w-lg mx-auto px-4 pb-10">
        <div className="bg-white rounded-2xl shadow-card border-2 border-teal-200 p-5 sm:p-6">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mb-4 flex-wrap">
            <span>✅ 自动判分</span>
            <span>📊 能力诊断</span>
            <span>📄 可分享报告</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {UPGRADE_LEVELS.map((level) => (
              <LevelCard
                key={level.id}
                level={level}
                onClick={() => navigate(`/test/${level.id.toLowerCase()}`)}
              />
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-gray-400">
            每题 5 分 · 满分 100 分 · 80 分以上可读下一级别
          </p>
        </div>
      </section>

      {/* ── Placement entry ── */}
      <div className="pb-20 text-center">
        <Link to="/placement" className="text-xs text-gray-300 hover:text-gray-400 transition-colors">
          插班测试
        </Link>
      </div>

    </div>
  )
}
