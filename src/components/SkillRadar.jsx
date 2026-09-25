const DEFAULT_COLORS = ['#ef927e', '#e4b954', '#55b5aa', '#6fa9d8', '#8795d8', '#8fcfc0']

function polarPoint(index, count, radius, center = 210) {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / count
  return {
    x: center + Math.cos(angle) * radius,
    y: center + Math.sin(angle) * radius,
  }
}

export default function SkillRadar({ groups = [] }) {
  const activeGroups = groups.filter(group => group.total > 0)
  if (activeGroups.length < 3) {
    return (
      <div className="report-radar-empty">
        本次涉及的阅读维度较少，暂不绘制雷达图。
      </div>
    )
  }

  const center = 210
  const radius = 118
  const labelRadius = 165
  const rings = [0.25, 0.5, 0.75, 1]

  const polygonPoints = activeGroups.map((group, index) => {
    const ratio = group.total ? group.correct / group.total : 0
    return polarPoint(index, activeGroups.length, radius * ratio, center)
  })

  return (
    <div className="report-radar-wrap">
      <svg
        className="report-radar-svg"
        viewBox="0 0 420 420"
        role="img"
        aria-label="本次阅读表现雷达图"
      >
        {rings.map(ring => (
          <circle
            key={ring}
            cx={center}
            cy={center}
            r={radius * ring}
            fill="none"
            stroke="#dcece8"
            strokeWidth="1.2"
          />
        ))}

        {activeGroups.map((group, index) => {
          const edge = polarPoint(index, activeGroups.length, radius, center)
          return (
            <line
              key={group.key}
              x1={center}
              y1={center}
              x2={edge.x}
              y2={edge.y}
              stroke="#d7e3df"
              strokeWidth="1"
              strokeDasharray="4 5"
            />
          )
        })}

        <polygon
          points={polygonPoints.map(point => `${point.x},${point.y}`).join(' ')}
          fill="rgba(85,181,170,.22)"
          stroke="#55b5aa"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {polygonPoints.map((point, index) => (
          <circle
            key={activeGroups[index].key}
            cx={point.x}
            cy={point.y}
            r="6.5"
            fill={DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
            stroke="#fffdf9"
            strokeWidth="3"
          />
        ))}

        {activeGroups.map((group, index) => {
          const point = polarPoint(index, activeGroups.length, labelRadius, center)
          const anchor = point.x < center - 16 ? 'end' : point.x > center + 16 ? 'start' : 'middle'
          const dy = point.y < center - 90 ? -4 : point.y > center + 90 ? 4 : 0
          return (
            <text
              key={group.key}
              x={point.x}
              y={point.y + dy}
              textAnchor={anchor}
              className="report-radar-label"
            >
              <tspan x={point.x} dy="0">{group.label}</tspan>
              <tspan x={point.x} dy="17" className="report-radar-value">
                答对 {group.correct}/{group.total}
              </tspan>
            </text>
          )
        })}
      </svg>
    </div>
  )
}
