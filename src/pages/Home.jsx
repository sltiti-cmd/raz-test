import { useNavigate, Link } from 'react-router-dom'
import LevelCard from '../components/LevelCard'
import { levelList } from '../data/levels/index'
import { openPrintPdf } from '../utils/printPdf'

const ICONS = {
  A: '📖',
  D: '📚',
  G: '🌿',
  K: '🚀',
  O: '🏆',
  R: '⭐',
}

export default function Home() {
  const navigate = useNavigate()

  const upgradeLevels = levelList.map(level => ({
    ...level,
    status: level.passages.length > 0 ? 'open' : 'coming',
    desc: `${level.passages.length}篇文章 · ${level.passages.reduce((n, p) => n + p.questions.length, 0)}题`,
    icon: ICONS[level.id] || '📖',
  }))

  return (
    <div className="min-h-screen bg-cream-100">

      <header className="bg-white/80 backdrop-blur border-b border-cream-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2.5">
          <div className="w-8 h-8 bg-teal-500 rounded-xl flex items-center justify-center
                          text-white font-black text-sm shadow-sm flex-shrink-0">
            R
          </div>
          <span className="font-extrabold text-gray-700 text-sm tracking-tight">
            Stacey老师英语能力测试
          </span>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-4 pt-8 pb-5 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800 leading-tight mb-3 tracking-tight">
          Stacey老师<span className="text-teal-500">英语能力</span>测试
        </h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-xs sm:max-w-lg mx-auto leading-relaxed">
          选择阅读或听力，找到适合孩子的下一步练习内容。
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-7 grid sm:grid-cols-2 gap-4">
        <a href="#reading" className="bg-white rounded-2xl shadow-card border-2 border-teal-200 p-5 sm:p-6 hover:shadow-card-hover transition-shadow">
          <div className="text-3xl mb-3">📖</div>
          <h2 className="text-xl font-black text-gray-800">RAZ 阅读测试</h2>
          <p className="text-sm text-gray-500 mt-2">按阅读级别选择试卷，自动判分，支持打印。</p>
          <div className="text-sm font-black text-teal-700 mt-4">查看阅读级别 ↓</div>
        </a>
        <Link to="/listening" className="bg-white rounded-2xl shadow-card border-2 border-purple-200 p-5 sm:p-6 hover:shadow-card-hover transition-shadow">
          <div className="text-3xl mb-3">🎧</div>
          <h2 className="text-xl font-black text-gray-800">听力测试</h2>
          <p className="text-sm text-gray-500 mt-2">按当前 RAZ 级别进入对应的 10 题听力测试。</p>
          <div className="text-sm font-black text-purple-700 mt-4">选择听力级别 →</div>
        </Link>
      </section>

      <section id="reading" className="max-w-3xl mx-auto px-4 pb-10 scroll-mt-20">
        <div className="bg-white rounded-2xl shadow-card border-2 border-teal-200 p-5 sm:p-6">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mb-4 flex-wrap">
            <span>✅ 自动判分</span>
            <span>📊 能力诊断</span>
            <span>📄 PDF试卷</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {upgradeLevels.map((level) => (
              <LevelCard
                key={level.id}
                level={level}
                onClick={() => navigate(`/test/${level.id.toLowerCase()}`)}
                onPdfClick={() => openPrintPdf(level)}
              />
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-gray-400">
            每题 5 分 · 满分 100 分 · 80 分及以上可以读对应级别
          </p>
        </div>
      </section>

      <div className="pb-20 text-center">
        <Link to="/placement"
          className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-xl
                     text-sm text-gray-400 hover:text-gray-600 border border-cream-200
                     bg-white/60 hover:bg-white transition-colors">
          插班测试 →
        </Link>
      </div>

    </div>
  )
}
