import { useEffect, useRef, useState } from 'react'

const RATES = [1, 1.25, 1.5, 0.75]
// Remembered across questions (the component is remounted per audio via `key`).
let savedRateIdx = 0

function fmt(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function ListeningAudio({ src }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [rateIdx, setRateIdx] = useState(savedRateIdx)

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = RATES[rateIdx]
  }, [rateIdx])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().catch(() => {})
    else audio.pause()
  }

  const cycleRate = () => {
    setRateIdx((index) => {
      const next = (index + 1) % RATES.length
      savedRateIdx = next
      return next
    })
  }

  return (
    <div className="lt-audio2">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={() => setPlaying(false)}
      />
      <button type="button" className="lt-audio2-play" onClick={toggle} aria-label={playing ? '暂停' : '播放'}>
        {playing ? (
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.3" /><rect x="14" y="5" width="4" height="14" rx="1.3" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5Z" /></svg>
        )}
      </button>
      <input
        type="range"
        className="lt-audio2-seek"
        min="0"
        max={duration || 0}
        step="0.1"
        value={current}
        onChange={(e) => {
          const audio = audioRef.current
          const value = Number(e.target.value)
          if (audio) audio.currentTime = value
          setCurrent(value)
        }}
        aria-label="播放进度"
      />
      <span className="lt-audio2-time">{fmt(current)} / {fmt(duration)}</span>
      <button type="button" className="lt-audio2-rate" onClick={cycleRate} aria-label={`倍速 ${RATES[rateIdx]} 倍`}>
        {RATES[rateIdx]}×
      </button>
    </div>
  )
}
