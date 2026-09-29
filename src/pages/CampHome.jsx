import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { camps, campFaq } from '../data/camps'
import { CampIcon } from '../components/CampIcons'
import { campThemeStyle } from '../data/campThemes'
import '../camp-home.css'

const tones = ['cream', 'peach', 'sage', 'blue', 'blue', 'peach', 'sage', 'cream']
const stageLabels = { d: '绘本朗读', g: '桥梁过渡' }
const support = [
  { topic: '方法', solo: '陪读靠摸索，遇到问题难判断', camp: '老师答疑，指导阅读方法' },
  { topic: '内容', solo: '书目与任务零散', camp: '主题精泛读，连接输入与输出' },
  { topic: '口语输出', solo: '读得多，复述与表达练习少', camp: '口语输出与复述任务，老师一对一点评' },
  { topic: '坚持', solo: '缺少节奏，容易中断', camp: '每日任务、打卡与阶段反馈' },
]
const comparison = [
  ['阅读组织', '书目零散，主题关联少', '主题式阅读，知识与词汇成体系'],
  ['精读方式', '短视频讲解，以翻译为主', '20–40 分钟精读，讲解阅读策略'],
  ['口语练习', '以朗读、背诵为主', '复述与主题表达，老师一对一点评'],
  ['跟进反馈', '检测与个别指导较少', '打卡跟踪、阶段测评、双师陪伴'],
]


export default function CampHome() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = '小麦陪跑营介绍'
    return () => { document.title = previousTitle }
  }, [])

  return (
    <main className="camp-circle-page">
      <header className="cc-top">
        <a href="#camp-title" className="cc-brand"><span aria-hidden="true" />小麦陪跑营</a>
      </header>

      <section className="cc-banner" aria-labelledby="camp-title">
        <div className="cc-banner-copy">
          <p className="cc-eyebrow">XIAOMAI · READING JOURNEY</p>
          <h1 id="camp-title">小麦陪跑营介绍</h1>
          <ul className="cc-features"><li>口语复述与沉浸式 Project 项目表达</li><li>主题精泛读</li><li>每日任务</li><li>双师陪伴</li></ul>
          <p className="cc-banner-note">30 多人精品小营，听说读写一站式规划</p>
        </div>
        <img className="cc-banner-art" src="/images/camps/camp-book-v1.webp" width="300" height="200" alt="" />
      </section>

      <section className="cc-section cc-directory" id="camps">
        <div className="cc-directory-heading">
          <div><h2>两个月一级别，稳稳进阶</h2></div>
          <div className="cc-legend"><span><i />1 阶 · 自主阅读</span><span><i />2 阶 · 学术阅读</span></div>
        </div>
        <div className="cc-camps">
          {camps.map((camp, index) => (
            <Link to={`/camp/${camp.id}`} className={`cc-camp cc-tone-${tones[index]}${camp.tier === 2 ? ' cc-stage-two' : ''}`} key={camp.id} style={campThemeStyle(camp.id)} aria-label={`${camp.name}，RAZ ${camp.range}，${stageLabels[camp.id] || camp.keyword}${camp.comingSoon ? '，待上线' : ''}`}>
              <span className="cc-orb"><CampIcon index={index} /><strong>{camp.name}</strong></span>
              {camp.isNew && <span className="cc-status">新上线</span>}
              {camp.comingSoon && <span className="cc-status cc-soon">待上线</span>}
              <span className="cc-range">RAZ {camp.range.replaceAll('-', '–')}</span>
              <span className="cc-goal">{stageLabels[camp.id] || camp.keyword}{!camp.comingSoon && <> <span aria-hidden="true">·</span> {camp.duration}</>}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="cc-section cc-support" aria-labelledby="support-title">
        <h2 id="support-title">跟营比自己读，有哪些优势？</h2>
        <div className="cc-support-head" aria-hidden="true"><span>阅读这件事</span><span>自己读</span><span /><strong>跟着小麦读</strong></div>
        {support.map((row, index) => (
          <div className="cc-support-row" key={row.topic}>
            <h3><span className={`cc-number cc-tone-${tones[index]}`}>{String(index + 1).padStart(2, '0')}</span>{row.topic}</h3>
            <p><small>自己读</small>{row.solo}</p>
            <span className="cc-arrow" aria-hidden="true">→</span>
            <p className="cc-supported"><small>跟着小麦读</small>{row.camp}</p>
          </div>
        ))}
      </section>

      <section className="cc-section cc-comparison" aria-labelledby="compare-title">
        <h2 id="compare-title">小麦营和其他营，有什么不同？</h2>
        <table>
          <colgroup><col className="cc-col-topic" /><col /><col /></colgroup>
          <thead><tr><th scope="col">关注点</th><th scope="col">部分常见阅读营</th><th scope="col">小麦陪跑营</th></tr></thead>
          <tbody>{comparison.map(([topic, other, ours]) => <tr key={topic}><th scope="row">{topic}</th><td>{other}</td><td><span aria-hidden="true">✓</span>{ours}</td></tr>)}</tbody>
        </table>
      </section>

      <section className="cc-section cc-start">
        <h2>怎么开始？</h2>
        <ol><li><Link to="/"><span>01</span><strong>测级别</strong><small>了解当前阅读能力 ↗</small></Link></li><li><a href="#camps"><span>02</span><strong>选适合的营</strong><small>找到自己的起点</small></a></li><li><a href="#contact"><span>03</span><strong>每天跟任务</strong><small>在陪伴中持续向前</small></a></li></ol>
      </section>

      <section className="cc-section cc-faq">
        <h2>你可能还想了解</h2>
        {campFaq.map((faq) => <details key={faq.q}><summary>{faq.q}<span aria-hidden="true">+</span></summary><p>{faq.a}</p></details>)}
      </section>

      <section className="cc-contact" id="contact">
        <div><p className="cc-eyebrow">LET’S READ & GROW</p><h2>一起找到适合孩子的阅读路线</h2><p>扫码添加顾问老师，了解测评与跟营安排。</p></div>
        <figure><img src="/images/camps/qr.png" alt="添加小麦陪跑营顾问老师的二维码" width="112" height="112" loading="lazy" /><figcaption>微信扫码咨询</figcaption></figure>
      </section>
      <footer className="cc-footer"><span>小麦陪跑营 · 让每一步阅读，都有方向</span><a href="#camp-title">回到顶部 ↑</a></footer>
    </main>
  )
}
