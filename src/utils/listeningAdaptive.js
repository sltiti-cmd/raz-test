import { listeningBands, listeningClips } from '../data/listening.js'

export const MAX_CLIPS = 10
export const QUESTIONS_PER_CLIP = 3

function unusedClip(band, history) {
  const used = new Set(history.map(item => item.clipId))
  return listeningClips.find(item => item.band === band && !used.has(item.id)) || null
}

// Two clips (six answers) are required before advancing. Borderline answers
// trigger a third clip at the same tier. Weak answers at a higher tier end the
// test at the last supported tier, instead of bouncing between difficulties.
export function nextListeningClip(history) {
  if (history.length >= MAX_CLIPS) return null
  if (history.length === 0) return unusedClip(0, history)

  const band = history.at(-1).band
  const attempts = history.filter(item => item.band === band)
  const correct = attempts.reduce((sum, item) => sum + item.correctCount, 0)

  if (attempts.length === 1) return unusedClip(band, history)
  if (attempts.length === 2) {
    if (band === listeningBands.length - 1) return unusedClip(band, history)
    if (correct >= 5 && history.length <= MAX_CLIPS - 2) return unusedClip(band + 1, history)
    if (correct <= 2 && band > 0) return null
    return unusedClip(band, history)
  }
  if (attempts.length === 3 && band < listeningBands.length - 1
      && correct >= 7 && history.length <= MAX_CLIPS - 2) {
    return unusedClip(band + 1, history)
  }
  return null
}

export function scoreListeningClip(clip, answers) {
  const details = clip.questions.map(item => ({
    questionId: item.id,
    selected: answers[item.id],
    correct: item.answer,
    isCorrect: answers[item.id] === item.answer,
  }))
  return {
    clipId: clip.id,
    band: clip.band,
    correctCount: details.filter(item => item.isCorrect).length,
    details,
  }
}

export function summarizeListening(history) {
  const bands = listeningBands.map((band, index) => {
    const attempts = history.filter(item => item.band === index)
    const correct = attempts.reduce((sum, item) => sum + item.correctCount, 0)
    const total = attempts.reduce((sum, item) => sum + item.details.length, 0)
    const supported = total >= 6 && correct >= (total >= 9 ? 7 : 5)
    return { ...band, correct, total, supported }
  })
  const correct = bands.reduce((sum, band) => sum + band.correct, 0)
  const total = bands.reduce((sum, band) => sum + band.total, 0)
  const highest = [...bands].reverse().find(band => band.supported)
  return {
    bands, correct, total,
    percentage: total ? Math.round(correct / total * 100) : 0,
    referenceBand: highest?.id || null,
    referenceLabel: highest ? `${highest.cefr} · ${highest.label}` : null,
  }
}
