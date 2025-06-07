export interface PerformanceMetrics {
  memoryInfo: {
    usedJSHeapSize: string
    totalJSHeapSize: string
    jsHeapSizeLimit: string
  } | null
  timing: {
    navigationStart: number
    loadEventEnd: number
    domContentLoaded: number
    pageLoadTime: number
  } | null
  connection: {
    effectiveType: string
    downlink: number
    rtt: number
    saveData: boolean
  } | null
  devicePixelRatio: number
  concurrency: number
}

export function getPerformanceMetrics(): PerformanceMetrics {
  const performance = window.performance as any

  // Memory bilgisi
  const memoryInfo = performance.memory
    ? {
        usedJSHeapSize: `${(performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(2)} MB`,
        totalJSHeapSize: `${(performance.memory.totalJSHeapSize / (1024 * 1024)).toFixed(2)} MB`,
        jsHeapSizeLimit: `${(performance.memory.jsHeapSizeLimit / (1024 * 1024)).toFixed(2)} MB`,
      }
    : null

  // Timing bilgisi
  const timing = performance.timing
    ? {
        navigationStart: performance.timing.navigationStart,
        loadEventEnd: performance.timing.loadEventEnd,
        domContentLoaded:
          performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        pageLoadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
      }
    : null

  // Connection bilgisi
  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection
  const connectionInfo = connection
    ? {
        effectiveType: connection.effectiveType || 'Bilinmiyor',
        downlink: connection.downlink || 0,
        rtt: connection.rtt || 0,
        saveData: connection.saveData || false,
      }
    : null

  return {
    memoryInfo,
    timing,
    connection: connectionInfo,
    devicePixelRatio: window.devicePixelRatio || 1,
    concurrency: navigator.hardwareConcurrency || 1,
  }
}
