import { Link, useNavigate } from 'react-router-dom'
import { placementList } from '../data/placement/index'
import { openPrintPdf } from '../utils/printPdf'

function Sparkle() {
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 2c2.8 12.6 8.5 18.4 22 22-13.5 3.6-19.2 9.4-22 22C21.2 33.4 15.5 27.6 2 24 15.5 20.4 21.2 14.6 24 2Z" fill="currentColor" /></svg>
}

export default function PlacementHome() {
  const navigate = useNavigate()

  return (
    <div className="home-soft">
      <header className="home-topbar">
        <Link to="/" className="home-brand" aria-label="返回 Stacey老师测评网站首页">
          <span className="home-brand-spark"><Sparkle /></span>
          <span><strong>Stacey老师</strong><small>测评网站</small></span>
        </Link>
        <nav className="home-topnav" aria-label="插班测试导航">
          <Link to="/">阅读测试</Link>
          <Link to="/listening">听力测试</Link>
        </nav>
      </header>

      <main>
        <section className="pl-hero">
          <span className="home-kicker"><i /> PLACEMENT CHECK</span>
          <h1>找到孩子的<em>插班起点</em></h1>
          <p>选择插班级别，在线完成测试，或下载 PDF 打印后再录入答案。</p>
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
                <strong>{level.id} 级插班</strong>
                <small>{level.passages.length} 篇 · {level.passages.reduce((sum, passage) => sum + passage.questions.length, 0)} 题</small>
                {level.printPdf && (
                  <button type="button" className="home-pdf-link" onClick={() => openPrintPdf(level)}>⇩ PDF 试卷</button>
                )}
              </div>
            ))}
          </div>
          <p className="pl-note">每题 5 分 · 满分 100 分 · 80 分及以上可以读对应级别</p>
        </section>
      </main>
    </div>
  )
}
