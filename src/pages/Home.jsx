import { Link, useNavigate } from 'react-router-dom'
import { levelList } from '../data/levels/index'
import StudyBuddy from '../components/StudyBuddy'

function Sparkle({ className = '' }) {
  return <svg className={className} viewBox="0 0 48 48" aria-hidden="true"><path d="M24 2c2.8 12.6 8.5 18.4 22 22-13.5 3.6-19.2 9.4-22 22C21.2 33.4 15.5 27.6 2 24 15.5 20.4 21.2 14.6 24 2Z" fill="currentColor" /></svg>
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-soft">
      <header className="home-topbar">
        <Link to="/" className="home-brand" aria-label="Stacey老师测评网站首页">
          <span className="home-brand-spark"><Sparkle /></span>
          <span><strong>Stacey老师</strong><small>测评网站</small></span>
        </Link>
        <nav className="home-topnav" aria-label="首页导航"><a href="#reading">阅读测试</a><Link to="/listening">听力测试</Link><Link to="/placement">插班测试</Link></nav>
      </header>

      <main>
        <section className="home-hero">
          <div className="home-hero-dots" aria-hidden="true" />
          <div className="home-hero-copy">
            <span className="home-kicker"><i /> RAZ READING JOURNEY</span>
            <h1>找到孩子现在的<br /><em>阅读位置</em></h1>
          </div>
          <div className="home-hero-art" aria-hidden="true"><span className="home-mini-spark one">✦</span><span className="home-mini-spark two">✧</span><StudyBuddy className="home-buddy" decorative /></div>
        </section>

        <section id="reading" className="home-level-section">
          <div className="home-section-heading">
            <div><span className="home-kicker"><i /> CHOOSE A LEVEL</span><h2>选择阅读级别</h2></div>
          </div>
          <div className="home-level-journey">
            {levelList.map((level, index) => (
              <div className={`home-level-stop tone-${index + 1}`} key={level.id}>
                <button type="button" className="home-level-button" onClick={() => navigate(`/test/${level.id.toLowerCase()}`)} aria-label={`进入 ${level.id} 级阅读测试`}><span>{level.id}</span></button>
              </div>
            ))}
          </div>
        </section>

        <section className="home-mode-ribbon" aria-hidden="true">
          <span className="home-kicker"><i /> TWO WAYS TO PRACTISE</span>
          <p className="home-mode-art">Read <em>&amp;</em> Listen</p>
        </section>
      </main>
    </div>
  )
}
