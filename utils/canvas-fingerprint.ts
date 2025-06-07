export function getCanvas2dHash(): string {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return 'Desteklenmiyor'

    ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = '#f60'
    ctx.fillRect(125, 1, 62, 20)
    ctx.fillStyle = '#069'
    ctx.font = '11pt sans-serif'
    ctx.fillText('HTML Test', 2, 15)
    ctx.fillStyle = 'rgba(102, 204, 0, 0.2)'
    ctx.font = '18pt Arial'
    ctx.fillText('HTML Test', 4, 45)

    const dataURL = canvas.toDataURL()
    let hash = 0
    for (let i = 0; i < dataURL.length; i++) {
      const char = dataURL.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return hash.toString(16)
  } catch (error) {
    return 'Hata'
  }
}

export function getCanvasWebGLHash(): string {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return 'WebGL Desteklenmiyor'

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    const vendor = gl.getParameter(debugInfo?.UNMASKED_VENDOR_WEBGL || gl.VENDOR)
    const renderer = gl.getParameter(debugInfo?.UNMASKED_RENDERER_WEBGL || gl.RENDERER)

    const fingerprint = `${vendor}~${renderer}`
    let hash = 0
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return hash.toString(16)
  } catch (error) {
    return 'Hata'
  }
}

export function getWebGLExtensions(): string {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return 'WebGL Desteklenmiyor'

    const extensions = gl.getSupportedExtensions()
    return extensions ? extensions.join(', ') : 'Yok'
  } catch (error) {
    return 'Hata'
  }
}
