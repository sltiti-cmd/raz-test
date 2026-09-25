export default function StudyBuddy({ className = '', decorative = false }) {
  return (
    <svg
      className={className}
      viewBox="0 0 430 320"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={decorative ? undefined : '戴耳机的星星学习伙伴'}
    >
      <defs>
        <linearGradient id="starFill" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffe79b" />
          <stop offset="1" stopColor="#f6bd63" />
        </linearGradient>
        <linearGradient id="bookFill" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#d8f2eb" />
          <stop offset="1" stopColor="#abdcd2" />
        </linearGradient>
      </defs>
      <path d="M26 276c72-48 117-35 174-2 57-51 123-65 202-3v49H26Z" fill="#edf7ee" />
      <path d="M248 86c28-39 86-34 105 8" fill="none" stroke="#7893bc" strokeWidth="12" strokeLinecap="round" />
      <path d="m301 58 22 44 48 7-35 34 9 48-44-23-43 23 8-48-35-34 49-7Z" fill="url(#starFill)" />
      <circle cx="285" cy="129" r="5" fill="#333a5e" />
      <circle cx="320" cy="129" r="5" fill="#333a5e" />
      <path d="M291 144c8 9 17 9 24 0" fill="none" stroke="#333a5e" strokeWidth="4" strokeLinecap="round" />
      <circle cx="273" cy="143" r="8" fill="#f5a8a0" opacity=".7" />
      <circle cx="332" cy="143" r="8" fill="#f5a8a0" opacity=".7" />
      <rect x="244" y="101" width="25" height="66" rx="13" fill="#8298c2" />
      <rect x="337" y="101" width="25" height="66" rx="13" fill="#8298c2" />
      <path d="M109 226c44-20 83-9 111 18v62c-37-21-74-23-111-7Z" fill="url(#bookFill)" />
      <path d="M220 244c30-28 69-38 114-18v73c-41-16-79-13-114 7Z" fill="#fff0be" />
      <path d="M220 244v62" stroke="#8eb6ae" strokeWidth="4" />
      <path d="M66 252c-6-42 4-76 31-102M77 218c-18-9-25-23-21-42M90 189c18-10 26-25 24-44" fill="none" stroke="#82cbb5" strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="59" cy="172" rx="18" ry="31" transform="rotate(-32 59 172)" fill="#bee8d8" />
      <ellipse cx="115" cy="142" rx="18" ry="31" transform="rotate(32 115 142)" fill="#a9dcc8" />
      <circle cx="383" cy="193" r="7" fill="#f2b4a2" />
      <circle cx="402" cy="217" r="4" fill="#f2cf72" />
      <circle cx="376" cy="233" r="5" fill="#8fd0c3" />
    </svg>
  )
}
