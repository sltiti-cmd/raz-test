const fills = {
  red: '#ed6b67', yellow: '#f4c95d', blue: '#6da9dc', green: '#81b98a',
  brown: '#ad805e', white: '#f8fafc', black: '#4b5563',
}

function PictureSymbol({ kind, color, label }) {
  const fill = fills[color] || '#75b8ad'
  const line = '#385164'
  const common = { stroke: line, strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' }

  switch (kind) {
    case 'dog': return <g {...common}>
      <ellipse cx="28" cy="43" rx="20" ry="12" fill={fill} />
      <circle cx="45" cy="27" r="12" fill={fill} />
      <path d="M37 20 Q28 12 30 31 M51 20 Q59 15 58 31" fill={fill} />
      <path d="M11 38 Q2 29 8 25 M18 51 L16 59 M39 51 L40 59" fill="none" />
      <circle cx="49" cy="26" r="1.6" fill={line} stroke="none" />
      <circle cx="55" cy="31" r="2" fill={line} stroke="none" />
    </g>
    case 'cat': return <g {...common}>
      <ellipse cx="31" cy="43" rx="18" ry="12" fill={fill} />
      <path d="M19 22 L19 9 L28 17 Q32 15 36 17 L45 9 L45 22 Q48 31 43 36 Q32 42 21 36 Q16 31 19 22Z" fill={fill} />
      <path d="M13 45 Q3 45 8 30 Q9 27 13 29 M22 52 L21 59 M40 52 L41 59" fill="none" />
      <circle cx="27" cy="27" r="1.5" fill={line} stroke="none" /><circle cx="37" cy="27" r="1.5" fill={line} stroke="none" />
      <path d="M30 33 L34 33" fill="none" />
    </g>
    case 'ball': return <g {...common}>
      <circle cx="32" cy="33" r="22" fill={fill} />
      <path d="M13 22 Q33 31 52 21 M13 44 Q31 35 51 45" fill="none" opacity=".7" />
    </g>
    case 'book': return <g {...common}>
      <path d="M14 12 Q28 8 32 15 Q39 8 51 12 L51 54 Q39 50 32 56 Q25 50 14 54Z" fill={fill} />
      <path d="M32 15 L32 56 M19 25 L27 24 M37 24 L46 23" fill="none" />
    </g>
    case 'bag': return <g {...common}>
      <rect x="13" y="25" width="38" height="32" rx="6" fill={fill} />
      <path d="M22 25 L22 18 Q22 12 32 12 Q42 12 42 18 L42 25 M23 40 L41 40" fill="none" />
    </g>
    case 'apple': return <g {...common}>
      <path d="M32 23 Q22 14 15 25 Q9 39 18 53 Q25 62 32 56 Q39 62 46 53 Q55 39 49 25 Q42 14 32 23Z" fill={color === 'green' ? fills.green : fills.red} />
      <path d="M32 22 Q32 14 35 10 M34 17 Q42 10 48 13 Q43 19 34 17" fill={fills.green} />
    </g>
    case 'banana': return <g {...common}>
      <path d="M9 40 Q29 54 54 17 Q48 52 25 54 Q13 53 9 40Z" fill={fills.yellow} />
      <path d="M9 40 L7 36 M54 17 L57 14" fill="none" />
    </g>
    case 'tree': return <g {...common}>
      <path d="M29 38 L29 58 L36 58 L36 38" fill={fills.brown} />
      <circle cx="23" cy="30" r="15" fill={fills.green} /><circle cx="40" cy="29" r="15" fill={fills.green} /><circle cx="31" cy="18" r="15" fill={fills.green} />
    </g>
    case 'house': return <g {...common}>
      <path d="M9 31 L32 12 L55 31" fill={fills.red} /><rect x="14" y="30" width="36" height="28" fill="#fff6e9" />
      <rect x="28" y="40" width="10" height="18" fill={fills.brown} /><rect x="17" y="35" width="8" height="8" fill={fills.blue} />
    </g>
    case 'bus': return <g {...common}>
      <rect x="6" y="21" width="52" height="31" rx="5" fill={fills.yellow} />
      <rect x="11" y="26" width="11" height="13" rx="2" fill={fills.blue} /><rect x="26" y="26" width="11" height="13" rx="2" fill={fills.blue} /><rect x="41" y="26" width="11" height="13" rx="2" fill={fills.blue} />
      <circle cx="18" cy="53" r="5" fill={line} /><circle cx="47" cy="53" r="5" fill={line} />
    </g>
    case 'pool': return <g {...common}>
      <path d="M6 25 L58 25 L53 54 L11 54Z" fill={fills.blue} /><path d="M12 38 Q18 33 24 38 T36 38 T48 38" fill="none" stroke="#fff" />
      <path d="M15 23 L15 14 M22 23 L22 14 M15 14 L22 14" fill="none" />
    </g>
    case 'library': return <g {...common}>
      <path d="M6 23 L32 9 L58 23Z" fill={fills.brown} /><rect x="10" y="23" width="44" height="32" fill="#fff6e9" />
      <path d="M17 26 L17 51 M26 26 L26 51 M38 26 L38 51 M47 26 L47 51 M7 55 L57 55" fill="none" />
    </g>
    case 'park': return <g {...common}>
      <path d="M9 53 L55 53 M19 46 L46 46 M22 46 L22 52 M43 46 L43 52" fill="none" />
      <path d="M13 38 L13 49" fill="none" /><circle cx="13" cy="27" r="12" fill={fills.green} />
      <circle cx="51" cy="18" r="7" fill={fills.yellow} />
    </g>
    case 'clock': return <g {...common}>
      <circle cx="32" cy="32" r="25" fill="#fff" /><path d="M32 10 L32 15 M32 49 L32 54 M9 32 L14 32 M50 32 L55 32" fill="none" />
      <text x="32" y="39" textAnchor="middle" fontSize="17" fontWeight="800" fill={line} stroke="none">{label}</text>
    </g>
    case 'fridge': return <g {...common}>
      <rect x="16" y="7" width="32" height="52" rx="4" fill="#e5eef4" /><path d="M16 27 L48 27 M22 15 L22 22 M22 34 L22 46" fill="none" />
    </g>
    case 'table': return <g {...common}>
      <path d="M8 28 L56 28 L56 36 L8 36Z M15 36 L15 57 M49 36 L49 57" fill={fills.brown} />
    </g>
    case 'pencil': return <g {...common}>
      <path d="M19 54 L42 12 L51 17 L28 59Z" fill={fills.yellow} /><path d="M19 54 L28 59 L16 62Z" fill="#f1d2b0" /><path d="M42 12 L46 6 L55 11 L51 17" fill={fills.red} />
    </g>
    case 'notebook': return <g {...common}>
      <rect x="15" y="8" width="36" height="51" rx="3" fill={fills.blue} /><path d="M23 8 L23 59 M28 22 L43 22 M28 31 L43 31 M28 40 L43 40" fill="none" />
    </g>
    default: return null
  }
}

export default function ListeningPicture({ picture }) {
  if (!picture) return null
  const count = Math.max(1, Math.min(3, picture.count || 1))
  const scale = count === 1 ? 1 : 0.72
  const step = count === 1 ? 0 : 51
  const symbolWidth = 64 * scale
  const start = (160 - (symbolWidth + step * (count - 1))) / 2
  const top = count === 1 ? 12 : 21

  return <svg viewBox="0 0 160 90" className="w-full max-w-[160px] h-[90px]" aria-hidden="true" focusable="false">
    <rect x="2" y="2" width="156" height="86" rx="16" fill="#eef7f4" />
    <path d="M15 72 Q80 66 145 72" stroke="#d2e9df" strokeWidth="2" fill="none" />
    {Array.from({ length: count }, (_, index) => (
      <g key={index} transform={`translate(${start + index * step} ${top}) scale(${scale})`}>
        <PictureSymbol kind={picture.kind} color={picture.color} label={picture.label} />
      </g>
    ))}
  </svg>
}
