import { Link, useNavigate } from 'react-router-dom'
import { levelList } from '../data/levels/index'
import { openPrintPdf } from '../utils/printPdf'

function Sparkle({ className = '' }) {
  return <svg className={className} viewBox="0 0 48 48" aria-hidden="true"><path d="M24 2c2.8 12.6 8.5 18.4 22 22-13.5 3.6-19.2 9.4-22 22C21.2 33.4 15.5 27.6 2 24 15.5 20.4 21.2 14.6 24 2Z" fill="currentColor" /></svg>
}

function StudyBuddy() {
  return (
    <svg className="home-buddy" viewBox="0 0 430 320" role="img" aria-label="戴耳机的星星学习伙伴">
      <defs>
        <linearGradient id="starFill" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffe79b" /><stop offset="1" stopColor="#f6bd63" /></linearGradient>
        <linearGradient id="bookFill" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d8f2eb" /><stop offset="1" stopColor="#abdcd2" /></linearGradient>
      </defs>
      <path d="M26 276c72-48 117-35 174-2 57-51 123-65 202-3v49H26Z" fill="#edf7ee" />
      <path d="M248 86c28-39 86-34 105 8" fill="none" stroke="#7893bc" strokeWidth="12" strokeLinecap="round" />
      <path d="m301 58 22 44 48 7-35 34 9 48-44-23-43 23 8-48-35-34 49-7Z" fill="url(#starFill)" />
      <circle cx="285" cy="129" r="5" fill="#333a5e" /><circle cx="320" cy="129" r="5" fill="#333a5e" />
      <path d="M291 144c8 9 17 9 24 0" fill="none" stroke="#333a5e" strokeWidth="4" strokeLinecap="round" />
      <circle cx="273" cy="143" r="8" fill="#f5a8a0" opacity=".7" /><circle cx="332" cy="143" r="8" fill="#f5a8a0" opacity=".7" />
      <rect x="244" y="101" width="25" height="66" rx="13" fill="#8298c2" /><rect x="337" y="101" width="25" height="66" rx="13" fill="#8298c2" />
      <path d="M109 226c44-20 83-9 111 18v62c-37-21-74-23-111-7Z" fill="url(#bookFill)" />
      <path d="M220 244c30-28 69-38 114-18v73c-41-16-79-13-114 7Z" fill="#fff0be" /><path d="M220 244v62" stroke="#8eb6ae" strokeWidth="4" />
      <path d="M66 252c-6-42 4-76 31-102M77 218c-18-9-25-23-21-42M90 189c18-10 26-25 24-44" fill="none" stroke="#82cbb5" strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="59" cy="172" rx="18" ry="31" transform="rotate(-32 59 172)" fill="#bee8d8" /><ellipse cx="115" cy="142" rx="18" ry="31" transform="rotate(32 115 142)" fill="#a9dcc8" />
      <circle cx="383" cy="193" r="7" fill="#f2b4a2" /><circle cx="402" cy="217" r="4" fill="#f2cf72" /><circle cx="376" cy="233" r="5" fill="#8fd0c3" />
    </svg>
  )
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
        <nav className="home-topnav" aria-label="首页导航"><a href="#reading">阅读测试</a><Link to="/listening">听力测试</Link><a href="/admin/login">老师后台</a></nav>
      </header>

      <main>
        <section className="home-hero">
          <div className="home-hero-dots" aria-hidden="true" />
          <div className="home-hero-copy">
            <span className="home-kicker"><i /> RAZ READING JOURNEY</span>
            <h1>找到孩子现在的<br /><em>阅读位置</em></h1>
            <div className="home-actions"><a href="#reading" className="home-primary-action">开始阅读测试 <span>→</span></a><Link to="/listening" className="home-secondary-action">🎧 进入听力测试</Link></div>
            <div className="home-feature-line"><span>20 道阅读题</span><i /><span>自动判分</span><i /><span>支持 PDF 对照</span></div>
          </div>
          <div className="home-hero-art" aria-hidden="true"><span className="home-mini-spark one">✦</span><span className="home-mini-spark two">✧</span><StudyBuddy /></div>
        </section>

        <section id="reading" className="home-level-section">
          <div className="home-section-heading">
            <div><span className="home-kicker"><i /> CHOOSE A LEVEL</span><h2>选择阅读级别</h2></div>
            <p>每题 5 分 · 满分 100 分 · 80 分及以上合格</p>
          </div>
          <div className="home-level-journey">
            <div className="home-level-line" aria-hidden="true" />
            {levelList.map((level, index) => (
              <div className={`home-level-stop tone-${index + 1}`} key={level.id}>
                <button type="button" className="home-level-button" onClick={() => navigate(`/test/${level.id.toLowerCase()}`)} aria-label={`进入 ${level.id} 级阅读测试`}><span>{level.id}</span></button>
                <small>{level.passages.length} 篇 · {level.passages.reduce((sum, passage) => sum + passage.questions.length, 0)} 题</small>
                {level.printPdf && <button type="button" className="home-pdf-link" onClick={() => openPrintPdf(level)}>⇩ PDF 试卷</button>}
              </div>
            ))}
          </div>
        </section>

        <section className="home-mode-ribbon" aria-hidden="true">
          <span className="home-kicker"><i /> TWO WAYS TO PRACTISE</span>
          <p className="home-mode-art">Read <em>&amp;</em> Listen</p>
        </section>

        <div className="home-quiet-link"><Link to="/placement">需要重新确认起点？进入插班测试</Link></div>
      </main>
    </div>
  )
}
