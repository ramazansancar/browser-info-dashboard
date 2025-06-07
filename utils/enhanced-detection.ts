export interface EnhancedDetection {
  touchSupport: {
    maxTouchPoints: number
    touchEventsSupported: boolean
    pointerEventsSupported: boolean
  }
  audioContext: {
    supported: boolean
    sampleRate: number
    maxChannelCount: number
    state: string
  } | null
  sensors: {
    accelerometer: boolean
    gyroscope: boolean
    magnetometer: boolean
    ambientLight: boolean
    proximity: boolean
  }
  webAssembly: {
    supported: boolean
    version: string
  }
  serviceWorker: {
    supported: boolean
    controller: boolean
  }
  pushNotifications: {
    supported: boolean
    permission: string
  }
}

export function getEnhancedDetection(): EnhancedDetection {
  // Touch Support
  const touchSupport = {
    maxTouchPoints: navigator.maxTouchPoints || 0,
    touchEventsSupported: 'ontouchstart' in window,
    pointerEventsSupported: 'onpointerdown' in window,
  }

  // Audio Context
  let audioContext = null
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    if (AudioContext) {
      const ctx = new AudioContext()
      audioContext = {
        supported: true,
        sampleRate: ctx.sampleRate,
        maxChannelCount: ctx.destination.maxChannelCount,
        state: ctx.state,
      }
      ctx.close()
    }
  } catch (error) {
    audioContext = {
      supported: false,
      sampleRate: 0,
      maxChannelCount: 0,
      state: 'unavailable',
    }
  }

  // Sensors
  const sensors = {
    accelerometer: 'DeviceMotionEvent' in window,
    gyroscope: 'DeviceOrientationEvent' in window,
    magnetometer: 'ondeviceorientationabsolute' in window,
    ambientLight: 'ondevicelight' in window,
    proximity: 'ondeviceproximity' in window,
  }

  // WebAssembly
  const webAssembly = {
    supported: 'WebAssembly' in window,
    version: 'WebAssembly' in window ? '1.0' : 'Desteklenmiyor',
  }

  // Service Worker
  const serviceWorker = {
    supported: 'serviceWorker' in navigator,
    controller: !!(navigator.serviceWorker && navigator.serviceWorker.controller),
  }

  // Push Notifications
  const pushNotifications = {
    supported: 'PushManager' in window,
    permission: 'Notification' in window ? Notification.permission : 'default',
  }

  return {
    touchSupport,
    audioContext,
    sensors,
    webAssembly,
    serviceWorker,
    pushNotifications,
  }
}
