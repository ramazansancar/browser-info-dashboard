export interface HardwareAcceleration {
  webglRenderer: string
  webglVendor: string
  gpuInfo: string
  css3dSupported: boolean
  canvasAccelerated: boolean
  webglSupported: boolean
  webgl2Supported: boolean
  hardwareAcceleration: boolean
}

export function getHardwareAcceleration(): HardwareAcceleration {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    const gl2 = canvas.getContext('webgl2')

    let webglRenderer = 'Desteklenmiyor'
    let webglVendor = 'Desteklenmiyor'
    let gpuInfo = 'Bilinmiyor'

    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        webglRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'Gizli'
        webglVendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || 'Gizli'
        gpuInfo = `${webglVendor} - ${webglRenderer}`
      } else {
        webglRenderer = gl.getParameter(gl.RENDERER) || 'Gizli'
        webglVendor = gl.getParameter(gl.VENDOR) || 'Gizli'
        gpuInfo = `${webglVendor} - ${webglRenderer}`
      }
    }

    // CSS 3D transforms test
    const css3dSupported = (() => {
      const el = document.createElement('div')
      const transforms = [
        'transform',
        'webkitTransform',
        'mozTransform',
        'msTransform',
        'oTransform',
      ]
      return transforms.some((transform) => el.style[transform as any] !== undefined)
    })()

    // Canvas acceleration test
    const canvasAccelerated = (() => {
      try {
        const testCanvas = document.createElement('canvas')
        const ctx = testCanvas.getContext('2d')
        if (!ctx) return false

        // Test for hardware acceleration hints
        return (
          !!(ctx as any).webkitBackingStorePixelRatio ||
          !!(ctx as any).mozBackingStorePixelRatio ||
          !!(ctx as any).msBackingStorePixelRatio ||
          !!(ctx as any).oBackingStorePixelRatio ||
          !!(ctx as any).backingStorePixelRatio
        )
      } catch {
        return false
      }
    })()

    // Overall hardware acceleration detection
    const hardwareAcceleration = !!(gl && css3dSupported)

    return {
      webglRenderer,
      webglVendor,
      gpuInfo,
      css3dSupported,
      canvasAccelerated,
      webglSupported: !!gl,
      webgl2Supported: !!gl2,
      hardwareAcceleration,
    }
  } catch (error) {
    console.error('Hardware acceleration bilgisi alınamadı:', error)
    return {
      webglRenderer: 'Hata',
      webglVendor: 'Hata',
      gpuInfo: 'Hata',
      css3dSupported: false,
      canvasAccelerated: false,
      webglSupported: false,
      webgl2Supported: false,
      hardwareAcceleration: false,
    }
  }
}
