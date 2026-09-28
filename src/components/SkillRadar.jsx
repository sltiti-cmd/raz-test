function polarPoint(index, count, radius) {
  const angle = -Math.PI / 2 + Math.PI * 2 * index / count
  return { x: 210 + Math.cos(angle) * radius, y: 185 + Math.sin(angle) * radius }
}

export default function SkillRadar({ groups = [] }) {
  const activeGroups = groups.filter(group => group.total > 0)
  if (activeGroups.length < 3) {
    return <p className="br-radar-empty">本次涉及的阅读维度较少，请查看分项表现。</p>
  }
  const radius = 110
  const points = (scale) => activeGroups.map((_, index) => {
    const point = polarPoint(index, activeGroups.length, radius * scale)
    return `${point.x},${point.y}`
  }).join(' ')
  const dataPoints = activeGroups.map((group, index) =>
    polarPoint(index, activeGroups.length, radius * Math.max(0, Math.min(1, group.correct / group.total))))
  const description = activeGroups.map(group => `${group.label} ${Math.round(group.correct / group.total * 100)}%，答对 ${group.correct}/${group.total}`).join('；')
  return (
    <div className="br-radar">
      <svg viewBox="0 0 420 355" role="img" aria-label={`本次阅读表现雷达图：${description}`}>
        <title>本次阅读表现雷达图</title>
        <desc>{description}。仅反映本次已测维度，不等同于标准化能力评分。</desc>
        {[0.25, 0.5, 0.75, 1].map(ring => (
          <polygon key={ring} points={points(ring)} fill="none" stroke="#d4dee8" strokeWidth="1.2" />
        ))}
        {activeGroups.map((group, index) => {
          const edge = polarPoint(index, activeGroups.length, radius)
          return <line key={group.key} x1="210" y1="185" x2={edge.x} y2={edge.y} stroke="#d4dee8" />
        })}
        <polygon className="br-radar-data" points={dataPoints.map(point => `${point.x},${point.y}`).join(' ')} fill="#add79e" fillOpacity=".35" stroke="#77ad70" strokeWidth="2.5" strokeLinejoin="round" />
        {[25, 50, 75, 100].map(value => <text key={value} x="218" y={185 - radius * value / 100 + 4} className="br-radar-tick">{value}</text>)}
        {dataPoints.map((point, index) => <circle key={activeGroups[index].key} cx={point.x} cy={point.y} r="4.5" fill="#77ad70" />)}
        {activeGroups.map((group, index) => {
          const point = polarPoint(index, activeGroups.length, 145)
          const anchor = point.x < 194 ? 'end' : point.x > 226 ? 'start' : 'middle'
          return <text key={group.key} x={point.x} y={point.y} textAnchor={anchor} className="br-radar-label">
            <tspan x={point.x}>{group.label}</tspan>
            <tspan x={point.x} dy="20" className="br-radar-value">{Math.round(group.correct / group.total * 100)}%</tspan>
          </text>
        })}
      </svg>
    </div>
  )
}
