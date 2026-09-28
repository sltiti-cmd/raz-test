import { Link } from 'react-router-dom'
import { getSalesNextStep } from '../utils/salesFlow'
import { findCamp } from '../data/camps'

export default function SalesNextStep({ score, levelId }) {
  const step = getSalesNextStep(score, levelId)
  if (!step) return null

  if (step.kind === 'retest') {
    return (
      <section className="br-next-step">
        <div className="br-next-overview">
          <div>
            <h2>下一步：再测一个级别</h2>
            <p>本次 {score} 分，建议往下降 {step.drop} 级再测一次，找到更合适的起点。</p>
          </div>
          <Link to={step.test.path}>去做 {step.test.label} <span aria-hidden="true"> →</span></Link>
        </div>
      </section>
    )
  }

  const camp = findCamp(step.level)
  return (
    <section className="br-next-step">
      <div className="br-next-overview">
        <div>
          <h2>{step.dropped ? '建议从启蒙阶段开始' : `适合的阅读起点：${camp?.name || step.stage.name}`}</h2>
          <p>{camp ? `RAZ ${camp.range} · ${camp.keyword}` : `RAZ ${step.stage.range}`}</p>
        </div>
        <Link to={camp ? `/camp/${camp.id}` : '/camp'}>了解{camp?.name || '陪跑营'} <span aria-hidden="true"> →</span></Link>
      </div>
      <details data-html2canvas-ignore="true">
        <summary>联系老师，了解孩子的阅读规划</summary>
        <div className="br-next-contact">
          <img src="/stacey-qr.png" alt="Stacey老师微信二维码" width="96" height="96" loading="lazy" />
          <div>
            <ul>
              <li>Listen → Read → Quiz，先听后读</li>
              <li>主题式阅读，每日任务与阅读规划</li>
              <li>复述与口语输出点评，双师跟进</li>
            </ul>
            <p>长按识别二维码添加 Stacey 老师，把这份报告发给老师，了解孩子的阅读规划。</p>
          </div>
        </div>
      </details>
    </section>
  )
}
