import { useNavigate } from 'react-router-dom'
import { getSalesNextStep } from '../utils/salesFlow'

export default function SalesNextStep({ score, levelId }) {
  const navigate = useNavigate()
  const step = getSalesNextStep(score, levelId)
  if (!step) return null

  if (step.kind === 'retest') {
    return (
      <section className="report-section sales-next">
        <div className="report-section-heading compact">
          <span className="report-section-icon tone-coral">➤</span>
          <div>
            <h2>下一步：再测一个级别</h2>
            <p>本次 {score} 分，{levelId} 级对孩子还有点难，建议往下降 {step.drop} 级再测一次，找到最合适的起点。</p>
          </div>
        </div>
        <button type="button" className="sales-next-btn" onClick={() => navigate(step.test.path)}>
          📝 去做 {step.test.label} <span>→</span>
        </button>
      </section>
    )
  }

  return (
    <section className="report-section sales-next">
      <div className="report-section-heading compact">
        <span className="report-section-icon tone-mint">✓</span>
        <div>
          <h2>{step.dropped ? '建议从启蒙阶段开始' : `孩子可以读 ${step.level} 级别`}</h2>
          <p>
            适合：<b>小麦 RAZ 精品陪跑营 · {step.stage.name}（RAZ {step.stage.range}）</b>
          </p>
        </div>
      </div>
      <ul className="sales-next-points">
        <li>Listen → Read → Quiz 教学闭环，先听后读，避免假听假读</li>
        <li>主题式集群阅读，每日 3-5 本，搭配平行阅读</li>
        <li>班主任负责规划和纠偏，阅读老师精细化点评，小班人数少</li>
      </ul>
      <div className="sales-next-contact">
        <img src="/stacey-qr.png" alt="Stacey老师微信二维码" />
        <p>长按识别二维码添加 Stacey 老师，<br />把这份报告发给老师，领取孩子的阅读规划。</p>
      </div>
    </section>
  )
}
