import { listeningBands } from '../data/listening.js'

let activeAudio = null
let playbackId = 0

export function stopListeningAudio() {
  playbackId += 1
  if (activeAudio) {
    activeAudio.pause()
    activeAudio = null
  }
  if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
}

function speakWithBrowser(text, speaker, rate) {
  if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
    throw new Error('当前浏览器不支持语音朗读，请更换浏览器或补充 MP3。')
  }
  return new Promise((resolve, reject) => {
    const utterance = new window.SpeechSynthesisUtterance(text)
    const voices = window.speechSynthesis.getVoices().filter(voice => voice.lang.startsWith('en'))
    const preferred = voices.filter(voice => voice.lang === 'en-GB')
    const voicePool = preferred.length ? preferred : voices
    const secondSpeaker = ['child', 'student', 'clerk'].includes(speaker)
    utterance.voice = voicePool[secondSpeaker ? 1 : 0] || voicePool[0] || null
    utterance.lang = utterance.voice?.lang || 'en-GB'
    utterance.rate = rate
    utterance.pitch = secondSpeaker ? 1.12 : 0.96
    utterance.onend = () => resolve('tts')
    utterance.onerror = event => reject(new Error(
      ['interrupted', 'canceled'].includes(event.error)
        ? '朗读已停止'
        : '语音播放失败，请检查设备音量与浏览器语音设置。',
    ))
    window.speechSynthesis.speak(utterance)
  })
}

export async function playListeningClip(clip, onSource) {
  stopListeningAudio()
  const currentPlayback = playbackId
  if (clip.audioSrc) {
    try {
      const audio = new Audio(clip.audioSrc)
      activeAudio = audio
      const finished = new Promise((resolve, reject) => {
        audio.onended = resolve
        audio.onerror = () => reject(new Error('MP3 无法播放'))
        audio.onpause = () => reject(new Error('朗读已停止'))
      })
      void finished.catch(() => {})
      await audio.play()
      onSource?.('mp3')
      await finished
      activeAudio = null
      return 'mp3'
    } catch (error) {
      activeAudio = null
      if (currentPlayback !== playbackId || error.message === '朗读已停止') {
        throw new Error('朗读已停止', { cause: error })
      }
      // A missing or unplayable MP3 should leave the question usable.
    }
  }
  onSource?.('tts')
  const segments = clip.segments?.length ? clip.segments : [{ speaker: 'narrator', text: clip.script }]
  const rate = listeningBands[clip.band]?.ttsRate || 0.9
  for (const segment of segments) {
    if (currentPlayback !== playbackId) throw new Error('朗读已停止')
    await speakWithBrowser(segment.text, segment.speaker, rate)
  }
  return 'tts'
}
