import { Link, useNavigate } from 'react-router-dom'
import { placementList } from '../data/placement/index'
import BenchmarkBrand from '../components/BenchmarkBrand'
import '../benchmark.css'

export default function PlacementHome() {
  const navigate = useNavigate()

  return (
    <div className="home-soft">
      <header className="home-topbar">
        <BenchmarkBrand />
        <nav className="home-topnav" aria-label="插班测试导航">
          <Link to="/">阅读测试</Link>
          <Link to="/listening">听力测试</Link>
        </nav>
      </header>

      <main>
        <section className="pl-hero">
          <span className="home-kicker"><i /> PLACEMENT CHECK</span>
          <h1>找到孩子的<em>插班起点</em></h1>
          <div className="pl-hero-tags">
            <span>✅ 自动判分</span>
            <span>📊 能力诊断</span>
            <span>📄 PDF 试卷</span>
            <span>🔊 英文发音</span>
          </div>
        </section>

        <section className="pl-section">
          <div className="pl-grid">
            {placementList.map((level, index) => (
              <div className={`home-level-stop tone-${(index % 6) + 1}`} key={level.id}>
                <button
                  type="button"
                  className="home-level-button"
                  onClick={() => navigate(`/placement/${level.id.toLowerCase()}`)}
                  aria-label={`进入 ${level.id} 级插班测试`}
                >
                  <span>{level.id}</span>
                </button>
              </div>
            ))}
          </div>
          <p className="pl-note">每题 5 分 · 满分 100 分 · 80 分及以上可以读对应级别</p>
        </section>
      </main>
    </div>
  )
}
