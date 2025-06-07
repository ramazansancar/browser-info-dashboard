export function getSupportedAudioCodecs(): string[] {
  const audioCodecs = [
    'audio/mpeg',
    'audio/mp4; codecs="mp4a.40.2"',
    'audio/ogg; codecs="vorbis"',
    'audio/ogg; codecs="opus"',
    'audio/webm; codecs="vorbis"',
    'audio/wav; codecs="1"',
  ]

  const supported: string[] = []
  audioCodecs.forEach((codec) => {
    if (typeof MediaSource !== 'undefined' && MediaSource.isTypeSupported(codec)) {
      supported.push(codec.split(';')[0].trim())
    }
  })

  return supported
}

export function getSupportedVideoCodecs(): string[] {
  const videoCodecs = [
    'video/mp4; codecs="avc1.42c00d"',
    'video/ogg; codecs="theora"',
    'video/webm; codecs="vorbis,vp8"',
    'video/webm; codecs="vorbis,vp9"',
    'video/mp2t; codecs="avc1.42E01E,mp4a.40.2"',
  ]

  const supported: string[] = []
  videoCodecs.forEach((codec) => {
    if (typeof MediaSource !== 'undefined' && MediaSource.isTypeSupported(codec)) {
      supported.push(codec.split(';')[0].trim())
    }
  })

  return supported
}

export function getSpeechVoices(): Promise<string[]> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve([])
      return
    }

    const getVoices = () => {
      const voices = speechSynthesis.getVoices()
      resolve(voices.map((voice) => `${voice.name} (${voice.lang})`))
    }

    speechSynthesis.onvoiceschanged = getVoices

    // Eğer sesler zaten yüklüyse
    const initialVoices = speechSynthesis.getVoices()
    if (initialVoices.length > 0) {
      resolve(initialVoices.map((voice) => `${voice.name} (${voice.lang})`))
    }
  })
}
