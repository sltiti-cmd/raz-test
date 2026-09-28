import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { camps, findCamp } from '../data/camps'
import { campThemes, campThemeStyle } from '../data/campThemes'
import { CampIcon, LearningIcon } from '../components/CampIcons'
import '../camp-home.css'
import '../camp-detail.css'

// Remove decorative emoji only; retain the original course wording and numbers.
const plain = (text) => String(text).replace(/^[^\p{L}\p{N}]+/u, '').trim()
const taskItems = (text) => text.split('　').filter(Boolean).map(plain)

function Topbar() {
  return <header className="cc-top"><Link to="/camp" className="cc-brand"><span aria-hidden="true" />小麦陪跑营</Link><nav aria-label="主导航"><Link to="/camp">全部营</Link><Link to="/">级别测试 ↗</Link></nav></header>
}

function CampPath({ camp }) {
  return <section className="cd-section cd-path-section" aria-labelledby="path-title">
    <h2 id="path-title">孩子现在这一站</h2>
    <nav className="cd-path" aria-label="各营阅读路线">
      {camps.map((item, index) => <Link key={item.id} to={`/camp/${item.id}`} style={campThemeStyle(item.id)} className={`cd-stop${item.id === camp.id ? ' is-current' : ''}`} aria-current={item.id === camp.id ? 'page' : undefined} aria-label={`${item.name}，RAZ ${item.range}${item.comingSoon ? '，待上线' : ''}`}>
        <span className="cd-stop-orb"><CampIcon index={index} /><strong>{item.name}</strong></span>
        <span className="cd-stop-range">{item.range.replaceAll('-', '–')}</span>
        {item.id === camp.id && <span className="cd-current">当前</span>}
      </Link>)}
    </nav>
  </section>
}

function Objectives({ camp }) {
  const stats = camp.stats
  const metrics = stats && camp.tier === 1 ? [['主题式阅读', stats.themes], ['阅读本数', stats.books], ['阅读量', stats.words], ['口语 / 输出', stats.oral]] : []
  return <section className="cd-section" aria-labelledby="objectives-title">
    <h2 id="objectives-title">这一阶段，重点练什么</h2>
    {camp.focus && <ol className="cd-focus">{camp.focus.map((focus, i) => <li key={focus}><span className="cd-number">{String(i + 1).padStart(2, '0')}</span><h3>{focus}</h3></li>)}</ol>}
    {camp.abilities && <ul className="cd-abilities">{camp.abilities.map((item) => <li key={item}>{plain(item)}</li>)}</ul>}
    {metrics.length > 0 && <dl className="cd-metrics">{metrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
    {stats && <p className="cd-stat-note">{stats.listening !== '—' && <>听力量 {stats.listening}<span aria-hidden="true"> · </span></>}{stats.vocab}</p>}
    <dl className="cd-goals">{camp.goals.map((goal) => <div key={goal.k}><dt>{goal.k}</dt><dd><strong>{goal.v}</strong>{goal.d && <span>{goal.d}</span>}</dd></div>)}</dl>
    {stats && <p className="cd-stage-goal"><span>阶段目标</span>{stats.stageGoal}</p>}
  </section>
}

function DailyPlan({ camp }) {
  if (!camp.days) return null
  const rhythm = camp.rhythm
  return <section className="cd-section cd-daily-section" aria-labelledby="daily-title">
    <h2 id="daily-title">{camp.tier === 2 ? '每周怎么学？' : '每天怎么学？'}</h2>
    {rhythm && <p className="cd-cycle">{rhythm.note}</p>}
    <div className="cd-plan">
      <ol className="cd-days">{camp.days.map((day, index) => <li key={day.t} className={day.rest ? 'is-rest' : undefined}>
        <span className="cd-day-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <div><h3>{day.t}</h3><ul className="cd-task-list">{taskItems(day.items).map((item) => <li key={item}>{item}</li>)}</ul></div>
      </li>)}</ol>
      {rhythm && <aside className="cd-rhythm" aria-label="学习节奏与用时">
        {[['audio', '每日贯穿', rhythm.daily], ['repeat', camp.tier === 2 ? '每周输出' : '周期穿插', rhythm.periodic], ['clock', camp.tier === 2 ? '重要节点' : '建议用时', rhythm.time]].map(([icon, title, items]) => <div className="cd-rhythm-group" key={title}><span className="cd-small-icon"><LearningIcon type={icon} /></span><div><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{plain(item)}</li>)}</ul></div></div>)}
      </aside>}
    </div>
  </section>
}

function LearningContent({ camp }) {
  if (!camp.content && !camp.mainLine) return null
  const steps = camp.id === 'aa' ? [['audio', '听力'], ['page', '动画'], ['repeat', '儿歌'], ['book', '听读'], ['speech', '互动']] : camp.tier === 2 ? [['book', '精读'], ['page', '泛读'], ['audio', '听力'], ['speech', '演讲'], ['page', '写作']] : [['book', '精读'], ['page', '泛读'], ['audio', '听力'], ['speech', '口语'], ['chart', '反馈']]
  return <section className="cd-section cd-learning" aria-labelledby="learning-title">
    <h2 id="learning-title">怎么学？输入与输出连起来</h2>
    <ol className="cd-learning-path">{steps.map(([icon, label]) => <li key={label}><span><LearningIcon type={icon} /></span><strong>{label}</strong></li>)}</ol>
    {camp.mainLine && <div className="cd-main-lines"><div><span>精读主线</span><h3>{camp.mainLine.main.title}</h3><p>{camp.mainLine.main.text}</p></div><div><span>泛读搭配</span><h3>{camp.mainLine.side.title}</h3><p>{camp.mainLine.side.text}</p></div></div>}
    {camp.content && <>
      <p className="cd-content-cycle">{camp.content.cycle}</p>
      <div className="cd-content-columns">
        <div><h3>{camp.content.intensiveTitle}</h3><ul className={camp.content.intensive.length > 8 ? 'cd-topics' : undefined}>{camp.content.intensive.map((item) => <li key={item}>{plain(item)}</li>)}</ul></div>
        <div><h3>{camp.id === 'aa' ? '启蒙搭配' : '泛读做拓展'}</h3><ul>{camp.content.extensive.map((item) => <li key={item}>{plain(item)}</li>)}</ul></div>
      </div>
      <div className="cd-learning-note"><LearningIcon type="speech" /><div><h3>{camp.id === 'aa' ? '听说互动，从愿意开口开始' : camp.tier === 2 ? '演讲与写作，有输出，也有反馈' : '口语输出，不止读出声音'}</h3>{camp.content.mix.map((mix) => <p key={mix}>{mix}</p>)}{camp.id !== 'aa' && camp.tier === 1 && <p>复述与主题口语表达，专八老师一对一点评。</p>}</div></div>
      {camp.content.oneEquals && <div className="cd-includes"><h3>1 个{camp.name}，包含这些学习内容</h3><ul>{camp.content.oneEquals.map((item) => <li key={item}>{item}</li>)}</ul></div>}
    </>}
    {camp.output && <div className="cd-output">{camp.output.map((item) => <div key={item.t}><span className="cd-output-value">{item.n}<small>{item.u}</small></span><div><h3>{item.t}</h3><p>{item.s}</p></div></div>)}</div>}
  </section>
}

export default function CampPage() {
  const { campId } = useParams()
  const camp = findCamp(campId)
  useEffect(() => {
    const previousTitle = document.title
    document.title = camp ? `${camp.name} · 小麦陪跑营` : '未找到该营 · 小麦陪跑营'
    window.scrollTo(0, 0)
    return () => { document.title = previousTitle }
  }, [camp])

  if (!camp) return <main className="camp-circle-page camp-detail-page"><Topbar /><section className="cd-empty"><h1>没有找到这个营</h1><Link to="/camp">查看全部营 →</Link></section></main>
  const index = camps.indexOf(camp)
  const prev = camps[index - 1]
  const next = camps[index + 1]

  return <main className="camp-circle-page camp-detail-page" style={campThemeStyle(camp.id)} data-camp={camp.id} data-theme={campThemes[camp.id].name}>
    <Topbar />
    <nav className="cd-breadcrumb" aria-label="当前位置"><Link to="/camp">全部营</Link><span aria-hidden="true">/</span><span aria-current="page">{camp.name}</span></nav>
    {camp.id === 'r' && <p className="cd-re-feature"><strong>Reading Explorer 2</strong><span>精读主线</span></p>}
    <header className="cd-hero">
      <div className="cd-hero-orb"><CampIcon index={index} /></div>
      <div className="cd-hero-copy"><p className="cd-eyebrow">{camp.tier} 阶 · {camp.tier === 1 ? '自主阅读' : '学术阅读'}{camp.isNew && <span>新上线</span>}{camp.comingSoon && <span>待上线</span>}</p><h1>{camp.name}</h1><p className="cd-levels">RAZ {camp.levels} · {camp.keyword}</p><ul className="cd-meta">{camp.cambridge !== '—' && <li>{camp.cambridge}</li>}<li>{camp.duration}</li><li>{camp.lexile}</li></ul></div>
      <div className="cd-hero-dots" aria-hidden="true"><i /><i /><i /></div>
    </header>
    <p className="cd-intro">{camp.introLead && <><strong>{camp.introLead}</strong><span className="cd-intro-separator" aria-hidden="true"> · </span></>}{camp.intro}</p>
    <CampPath camp={camp} />
    <Objectives camp={camp} />
    {camp.suitable && <section className="cd-section"><h2>{camp.suitableHeading}</h2><ul className="cd-suitable">{camp.suitable.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></section>}
    <DailyPlan camp={camp} />
    <LearningContent camp={camp} />
    {camp.samples && <section className="cd-section"><h2>{camp.id === 'aa' ? '看看孩子会接触的内容' : '看看孩子会读的书'}</h2><div className="cd-samples">{camp.samples.map((sample) => <figure key={sample.src}><a href={sample.src} target="_blank" rel="noreferrer" aria-label={`放大查看：${sample.cap}`}><img src={sample.src} alt={sample.cap} loading="lazy" /><span aria-hidden="true">放大查看 ↗</span></a><figcaption>{sample.cap}</figcaption></figure>)}</div></section>}
    {camp.service && <section className="cd-section"><h2>孩子有人带，家长有人答</h2><div className="cd-service">{camp.service.map((service, i) => <div key={service.title}><span className="cd-small-icon"><LearningIcon type={i === 0 ? 'phone' : 'people'} /></span><div><h3>{service.title === 'APP 打卡' ? 'APP 每日任务' : '微信双师陪伴'}</h3>{service.text && <p>{service.text}</p>}{service.lines?.map((line) => <p key={line}>{plain(line)}</p>)}</div></div>)}</div>{camp.content?.mail && <p className="cd-mail"><span aria-hidden="true">↳</span>{camp.content.mail}</p>}</section>}
    {camp.comingSoon && <section className="cd-section cd-pending"><h2>{camp.name}正在筹备中</h2><p>具体任务与服务安排待上线后公布。想提前了解，可扫码咨询顾问老师。</p></section>}
    <section className="cd-contact">
      <div><h2>{camp.comingSoon ? '想提前了解秋实营？' : '不确定从哪里开始？'}</h2><p>先了解孩子当前的阅读能力，再找到合适的营。</p><Link className="cd-test-link" to={camp.testLevel ? `/test/${camp.testLevel}` : '/'}>{camp.testLevel ? `做 ${camp.testLevel.toUpperCase()} 级阅读测试` : '做级别测试'} ↗</Link></div>
      <figure><img src="/images/camps/qr.png" alt="顾问老师微信二维码" width="104" height="104" loading="lazy" /><figcaption>微信扫码咨询顾问老师</figcaption></figure>
    </section>
    <nav className="cd-prev-next" aria-label="前后营导航">{prev ? <Link to={`/camp/${prev.id}`}>← {prev.name}</Link> : <span />}<Link to="/camp">全部营</Link>{next ? <Link to={`/camp/${next.id}`}>{next.name} →</Link> : <span />}</nav>
  </main>
}
