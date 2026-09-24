let currentAudio = null

export function stopReadingAudio() {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio.currentTime = 0
    currentAudio = null
  }
}

function play(path) {
  stopReadingAudio()
  const audio = new Audio(`${import.meta.env.BASE_URL}audio/reading/v1/${path}.mp3`)
  // A 级面向启蒙阶段，朗读放慢便于跟读（保持音高不变）
  if (path.startsWith('A/')) {
    audio.preservesPitch = true
    audio.playbackRate = 0.75
  }
  currentAudio = audio
  audio.onended = () => {
    if (currentAudio === audio) currentAudio = null
  }
  audio.play().catch((error) => {
    if (currentAudio === audio) currentAudio = null
    console.error(`无法播放朗读音频：${path}`, error)
  })
}

const qid = (questionId) => `q${String(questionId).padStart(2, '0')}`

export function playReadingTitle(passageId) {
  play(`A/${passageId}-title`)
}

export function playReadingPassage(passageId) {
  play(`A/${passageId}-passage`)
}

export function playReadingQuestion(levelId, questionId) {
  play(`${levelId}/${qid(questionId)}`)
}

export function playReadingOption(questionId, optionKey) {
  play(`A/${qid(questionId)}-${optionKey}`)
}
