export function CampIcon({ index }) {
  const icons = [
    <g key="sun"><circle cx="24" cy="24" r="9" /><path d="M24 3v5m0 32v5M3 24h5m32 0h5M9 9l4 4m22 22 4 4M9 39l4-4m22-22 4-4" /></g>,
    <g key="seed"><path d="M24 41V25M24 30C9 31 7 20 8 13c13-1 19 7 16 17Zm0-6C22 12 30 7 40 8c1 11-5 18-16 16Z" /></g>,
    <g key="shoot"><path d="M24 43V17m0 17C11 34 7 26 8 19c12-1 17 5 16 15Zm0-11C24 10 32 5 40 6c1 12-5 19-16 17ZM18 43h12" /></g>,
    <g key="book"><path d="M24 13C18 9 10 8 4 10v28c7-2 14-1 20 3 6-4 13-5 20-3V10c-6-2-14-1-20 3Zm0 0v28M10 17l8 2m-8 5 8 2m12-7 8-2m-8 9 8-2" /></g>,
    <g key="books"><path d="M10 8h28v9H10a4.5 4.5 0 0 1 0-9ZM9 21h29v9H9a4.5 4.5 0 0 1 0-9Zm1 13h28v9H10a4.5 4.5 0 0 1 0-9ZM34 8v9m-3 4v9m3 4v9" /></g>,
    <path key="star" d="m24 4 6 13 14 2-10 10 2 15-12-7-12 7 2-15L4 19l14-2Z" />,
    <g key="compass"><circle cx="24" cy="24" r="19" /><path d="m31 15-4 12-12 6 5-13 11-5ZM24 5v4m0 30v4M5 24h4m30 0h4" /></g>,
    <g key="flag"><path d="M12 43V6c9-7 15 7 27 0v24c-12 7-18-7-27 0M6 43h13" /></g>,
  ]
  return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[index]}</svg>
}

export function LearningIcon({ type }) {
  const paths = {
    book: <><path d="M24 12C17 8 10 8 5 10v28c7-2 13-1 19 3 6-4 12-5 19-3V10c-5-2-12-2-19 2Z" /><path d="M24 12v29" /></>,
    page: <><path d="M11 4h19l8 8v31H11Z M30 4v10h8M17 21h15m-15 7h15m-15 7h9" /></>,
    audio: <><path d="M7 29v-7a17 17 0 0 1 34 0v7" /><rect x="4" y="24" width="10" height="17" rx="5" /><rect x="34" y="24" width="10" height="17" rx="5" /></>,
    speech: <path d="M42 22c0 10-8 16-18 16-3 0-6 0-9-2L6 42l3-12C2 17 11 7 24 7c10 0 18 5 18 15Z" />,
    chart: <><path d="M10 40V28m14 12V17m14 23V6" strokeWidth="5" /></>,
    clock: <><circle cx="24" cy="24" r="19" /><path d="M24 12v13l8 5" /></>,
    repeat: <><path d="M39 17a17 17 0 0 0-29-5l-5 6m0-11v11h11M9 31a17 17 0 0 0 29 5l5-6m0 11V30H32" /></>,
    phone: <><rect x="13" y="3" width="22" height="42" rx="4" /><path d="M21 38h6" /></>,
    people: <><circle cx="18" cy="15" r="7" /><path d="M4 41v-6c0-11 28-11 28 0v6H4m27-31c9 0 9 13 0 13m6 5c8 2 7 8 7 13h-7" /></>,
  }
  return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type] || paths.book}</svg>
}
