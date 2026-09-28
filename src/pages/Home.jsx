import { Link } from 'react-router-dom'
import { levelList } from '../data/levels/index'
import BenchmarkBrand from '../components/BenchmarkBrand'
import '../benchmark.css'

const levelLabels = { A: '自拼认读', D: '流利朗读', G: '自主阅读', K: '初章阅读', O: '中高章阅读', R: '学术预备' }

export default function Home() {
  return (
    <div className="benchmark-page benchmark-home">
      <header className="bm-topbar">
        <BenchmarkBrand />
        <nav className="bm-nav" aria-label="首页导航">
          <a href="#reading" aria-current="page">阅读测试</a>
          <Link to="/listening">听力测试</Link>
          <Link to="/placement">插班测试</Link>
          <Link to="/camp">陪跑营</Link>
        </nav>
      </header>
      <main>
        <section className="bm-hero" aria-labelledby="bm-title">
          <div className="bm-hero-copy">
            <p className="bm-eyebrow">RAZ READING JOURNEY</p>
            <h1 id="bm-title">找到孩子现在的<br /><em>阅读位置</em></h1>
          </div>
          <img className="bm-hero-art" src="/images/benchmark/reading-journey.webp" width="1100" height="825" alt="" fetchPriority="high" />
        </section>
        <section id="reading" className="bm-levels" aria-labelledby="bm-level-title">
          <h2 id="bm-level-title">选择 RAZ 阅读级别</h2>
          <div className="bm-level-grid">
            {levelList.map(level => (
              <Link key={level.id} to={`/test/${level.id.toLowerCase()}`} className={`bm-level bm-level-${level.id.toLowerCase()}`} aria-label={`进入 ${level.id} 级阅读测试 · ${levelLabels[level.id]}`}>
                <span className="bm-level-orb"><span>{level.id}</span></span>
                <span className="bm-level-label">{levelLabels[level.id]} <span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="bm-footer"><BenchmarkBrand /><span>阅读 · 听力 · 成长</span></footer>
    </div>
  )
}
