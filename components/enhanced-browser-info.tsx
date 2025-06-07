'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  getCanvas2dHash,
  getCanvasWebGLHash,
  getWebGLExtensions,
} from '../utils/canvas-fingerprint'
import {
  getSupportedAudioCodecs,
  getSupportedVideoCodecs,
  getSpeechVoices,
} from '../utils/media-codecs'
import { getIPInfo, type IPInfo } from '../utils/ip-info'
import { BasicInfoCard } from './cards/basic-info-card'
import { IPInfoCard } from './cards/ip-info-card'
import { SystemInfoCard } from './cards/system-info-card'
import { ScreenInfoCard } from './cards/screen-info-card'
import { NetworkInfoCard } from './cards/network-info-card'
import { MediaCapabilitiesCard } from './cards/media-capabilities-card'
import { CanvasFingerprintCard } from './cards/canvas-fingerprint-card'
import { BatteryInfoCard } from './cards/battery-info-card'
import { KeyboardInputCard } from './cards/keyboard-input-card'
import { PrivacySecurityCard } from './cards/privacy-security-card'
import { PluginsCard } from './cards/plugins-card'
import { TimeInfoCard } from './cards/time-info-card'
import { APISupportsCard } from './cards/api-supports-card'
import { getCloudflareColoInfo, type CloudflareColo } from '../utils/cloudflare-colo'
import { getHardwareAcceleration, type HardwareAcceleration } from '../utils/hardware-acceleration'
import { getPerformanceMetrics, type PerformanceMetrics } from '../utils/performance-metrics'
import { getEnhancedDetection, type EnhancedDetection } from '../utils/enhanced-detection'
import { HardwareAccelerationCard } from './cards/hardware-acceleration-card'
import { PerformanceMetricsCard } from './cards/performance-metrics-card'
import { EnhancedFeaturesCard } from './cards/enhanced-features-card'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

interface EnhancedBrowserInfo {
  // Temel bilgiler
  userAgent: string
  appName: string
  browser: string
  appVersion: string
  vendor: string
  vendorSub: string
  product: string
  productSub: string
  platform: string

  // Dil ve bölge
  language: string
  languages: string[]
  timezone: string
  timezoneOffset: number

  // Sistem özellikleri
  hardwareConcurrency: number
  deviceMemory?: number
  maxTouchPoints: number
  oscpu?: string
  heapSizeLimit: string

  // Ekran bilgileri
  screenWidth: number
  screenHeight: number
  screenAvailWidth: number
  screenAvailHeight: number
  colorDepth: number
  pixelDepth: number
  screenIsExtended: boolean

  // Ağ ve bağlantı
  onLine: boolean
  connection?: any
  connectionType: string
  ipInfo: IPInfo | null

  // Medya yetenekleri
  audioCodecs: string[]
  videoCodecs: string[]
  speechVoices: string[]

  // Canvas parmak izi
  canvas2dHash: string
  canvasWebGLHash: string
  webGLExtensions: string

  // Gizlilik ve güvenlik
  cookieEnabled: boolean
  doNotTrack: string | null
  globalPrivacyControl: string
  webdriver: boolean

  // Cihaz özellikleri
  batteryInfo: any
  keyboardLayout: string
  pdfViewerEnabled: boolean

  // Plugin ve API desteği
  plugins: any[]
  geolocationSupported: boolean
  serviceWorkerSupported: boolean
  webglSupported: boolean
  localStorageSupported: boolean
  sessionStorageSupported: boolean
  indexedDBSupported: boolean
  webRTCSupported: boolean
  notificationSupported: boolean
  clipboardSupported: boolean
  mediaDevicesSupported: boolean
  bluetoothSupported: boolean
  usbSupported: boolean
  gamepadsSupported: boolean
  vibrationSupported: boolean
  batterySupported: boolean

  // Zaman bilgileri
  localTime: string
  deviceTime: number

  // New properties
  hardwareAcceleration: HardwareAcceleration
  performanceMetrics: PerformanceMetrics
  enhancedDetection: EnhancedDetection
}

export default function EnhancedBrowserInfo() {
  const [browserInfo, setBrowserInfo] = useState<EnhancedBrowserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [cloudflareColoInfo, setCloudflareColoInfo] = useState<CloudflareColo | null>(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const { toast } = useToast()

  const saveInfo = useCallback(async (info: EnhancedBrowserInfo) => {
    try {
      let temp = {
        ...info,
        referrer: document.referrer || 'Yok',
        url: window.location.href,
        localstorage: window.localStorage,
      }
      await fetch('https://labs.ramazansancar.com.tr/browser-info/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(temp),
      })
    } catch (error) {
      console.error('Browser bilgileri sunucuya gönderilemedi:', error)
    }
  }, [])

  // Batarya bilgilerini güncelle
  const updateBatteryInfo = useCallback(async () => {
    if (!('getBattery' in navigator)) return

    try {
      const battery = await (navigator as any).getBattery()
      const newBatteryInfo = {
        charging: battery.charging,
        level: Math.round(battery.level * 100),
        chargingTime:
          battery.chargingTime === Number.POSITIVE_INFINITY
            ? 'Hesaplanamıyor'
            : `${Math.round(battery.chargingTime / 60)} dakika`,
        dischargingTime: battery.dischargingTime,
      }

      setBrowserInfo((prev) => {
        if (!prev) return null

        // Sadece değişiklik varsa güncelle ve toast göster
        const hasChanged =
          prev.batteryInfo?.level !== newBatteryInfo.level ||
          prev.batteryInfo?.charging !== newBatteryInfo.charging

        if (hasChanged && !isInitialLoad) {
          toast({
            title: '🔋 Batarya bilgileri güncellendi',
            description: `Seviye: %${newBatteryInfo.level} - ${newBatteryInfo.charging ? 'Şarj oluyor' : 'Şarj olmuyor'}`,
            duration: 3000,
          })
        }

        return {
          ...prev,
          batteryInfo: newBatteryInfo,
        }
      })
    } catch (error) {
      console.error('Batarya bilgisi güncellenemedi:', error)
    }
  }, [isInitialLoad, toast])

  // Ağ durumunu güncelle
  const updateNetworkInfo = useCallback(() => {
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection
    const newOnlineStatus = navigator.onLine

    setBrowserInfo((prev) => {
      if (!prev) return null

      const hasChanged = prev.onLine !== newOnlineStatus

      if (hasChanged && !isInitialLoad) {
        toast({
          title: '🌐 Ağ durumu güncellendi',
          description: `Durum: ${newOnlineStatus ? 'Çevrimiçi' : 'Çevrimdışı'}${connection ? ` - ${connection.effectiveType}` : ''}`,
          duration: 3000,
        })
      }

      return {
        ...prev,
        onLine: newOnlineStatus,
        connection: connection,
      }
    })
  }, [isInitialLoad, toast])

  // Zaman bilgilerini güncelle
  const updateTimeInfo = useCallback(() => {
    setBrowserInfo((prev) => {
      if (!prev) return null

      return {
        ...prev,
        localTime: new Date().toLocaleString('tr-TR'),
        deviceTime: Date.now() / 1000,
        timezoneOffset: new Date().getTimezoneOffset(),
      }
    })
  }, [])

  // Performans metriklerini güncelle
  const updatePerformanceMetrics = useCallback(() => {
    const newPerformanceMetrics = getPerformanceMetrics()

    setBrowserInfo((prev) => {
      if (!prev) return null

      if (!isInitialLoad) {
        toast({
          title: '📊 Performans metrikleri güncellendi',
          description: newPerformanceMetrics.memoryInfo
            ? `Bellek: ${newPerformanceMetrics.memoryInfo.usedJSHeapSize}`
            : 'Performans verileri yenilendi',
          duration: 3000,
        })
      }

      return {
        ...prev,
        performanceMetrics: newPerformanceMetrics,
      }
    })
  }, [isInitialLoad, toast])

  // IP bilgilerini güncelle
  const updateIPInfo = useCallback(async () => {
    try {
      const newIPInfo = await getIPInfo()

      if (newIPInfo && newIPInfo.cfray) {
        const coloInfo = await getCloudflareColoInfo(newIPInfo.cfray.split('-')[0])
        setCloudflareColoInfo(coloInfo)
      }

      setBrowserInfo((prev) => {
        if (!prev) return null

        if (!isInitialLoad && newIPInfo) {
          toast({
            title: '🌍 IP bilgileri güncellendi',
            description: `IP: ${newIPInfo.ip} - ${newIPInfo.city}, ${newIPInfo.country}`,
            duration: 3000,
          })
        }

        return {
          ...prev,
          ipInfo: newIPInfo,
        }
      })
    } catch (error) {
      console.error('IP bilgisi güncellenemedi:', error)
    }
  }, [isInitialLoad, toast])

  useEffect(() => {
    const getEnhancedBrowserInfo = async () => {
      try {
        // IP bilgisini al
        const ipInfo = await getIPInfo()

        // IP bilgisini aldıktan sonra, cloudflare colo bilgisini de al
        if (ipInfo && ipInfo.cfray) {
          const coloInfo = await getCloudflareColoInfo(ipInfo.cfray.split('-')[0])
          setCloudflareColoInfo(coloInfo)
        }

        // Medya codec'lerini al
        const audioCodecs = getSupportedAudioCodecs()
        const videoCodecs = getSupportedVideoCodecs()
        const speechVoices = await getSpeechVoices()

        // Canvas parmak izlerini al
        const canvas2dHash = getCanvas2dHash()
        const canvasWebGLHash = getCanvasWebGLHash()
        const webGLExtensions = getWebGLExtensions()

        // Klavye layout bilgisi
        let keyboardLayout = 'Desteklenmiyor'
        if ('keyboard' in navigator && 'getLayoutMap' in (navigator as any).keyboard) {
          try {
            const layoutMap = await (navigator as any).keyboard.getLayoutMap()
            const layouts: string[] = []
            layoutMap.forEach((value: string, key: string) => {
              layouts.push(`${key}: ${value}`)
            })
            keyboardLayout = layouts.join(', ') || 'Boş'
          } catch (error) {
            keyboardLayout = 'Erişim engellendi'
          }
        }

        // Batarya bilgisi
        let batteryInfo = null
        if ('getBattery' in navigator) {
          try {
            const battery = await (navigator as any).getBattery()
            batteryInfo = {
              charging: battery.charging,
              level: Math.round(battery.level * 100),
              chargingTime:
                battery.chargingTime === Number.POSITIVE_INFINITY
                  ? 'Hesaplanamıyor'
                  : `${Math.round(battery.chargingTime / 60)} dakika`,
              dischargingTime: battery.dischargingTime,
            }
          } catch (error) {
            batteryInfo = {
              error: 'Erişim engellendi',
            }
          }
        }

        // Plugin bilgileri
        const plugins = Array.from(navigator.plugins || []).map((plugin) => ({
          name: plugin.name,
          description: plugin.description,
          filename: plugin.filename,
          length: plugin.length,
        }))

        // Hardware acceleration bilgisi
        const hardwareAcceleration = getHardwareAcceleration()

        // Performance metrics
        const performanceMetrics = getPerformanceMetrics()

        // Enhanced detection
        const enhancedDetection = getEnhancedDetection()

        const info: EnhancedBrowserInfo = {
          // Temel bilgiler
          userAgent: navigator.userAgent,
          appName: navigator.appName,
          appVersion: navigator.appVersion,
          vendor: navigator.vendor || 'Bilinmiyor',
          vendorSub: (navigator as any).vendorSub || 'Bilinmiyor',
          product: navigator.product || 'Bilinmiyor',
          productSub: (navigator as any).productSub || 'Bilinmiyor',
          platform: navigator.platform,
          browser:
            ' ' +
            ((navigator as any).userAgentData
              ? (navigator as any).userAgentData.brands
                  .map((brand: any) => brand.brand + ' ' + brand.version)
                  .join(', ')
              : ''),

          // Dil ve bölge
          language: navigator.language,
          languages: navigator.languages ? Array.from(navigator.languages) : [navigator.language],
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          timezoneOffset: new Date().getTimezoneOffset(),

          // Sistem özellikleri
          hardwareConcurrency: navigator.hardwareConcurrency || 0,
          deviceMemory: (navigator as any).deviceMemory,
          maxTouchPoints: navigator.maxTouchPoints || 0,
          oscpu: (navigator as any).oscpu,
          heapSizeLimit: (window.performance as any)?.memory
            ? `${((window.performance as any).memory.jsHeapSizeLimit / (1024 * 1024)).toFixed(2)} MB`
            : 'Bilgi yok',

          // Ekran bilgileri
          screenWidth: screen.width,
          screenHeight: screen.height,
          screenAvailWidth: screen.availWidth,
          screenAvailHeight: screen.availHeight,
          colorDepth: screen.colorDepth,
          pixelDepth: screen.pixelDepth,
          screenIsExtended: (screen as any).isExtended || false,

          // Ağ ve bağlantı
          onLine: navigator.onLine,
          connection:
            (navigator as any).connection ||
            (navigator as any).mozConnection ||
            (navigator as any).webkitConnection,
          connectionType:
            (
              (navigator as any).connection ||
              (navigator as any).mozConnection ||
              (navigator as any).webkitConnection
            )?.type || 'Bilinmiyor',
          ipInfo,

          // Medya yetenekleri
          audioCodecs,
          videoCodecs,
          speechVoices,

          // Canvas parmak izi
          canvas2dHash,
          canvasWebGLHash,
          webGLExtensions,

          // Gizlilik ve güvenlik
          cookieEnabled: navigator.cookieEnabled,
          doNotTrack: navigator.doNotTrack || null,
          globalPrivacyControl:
            (navigator as any).globalPrivacyControl === true ? 'Etkin' : 'Devre Dışı / Yok',
          webdriver: (navigator as any).webdriver || false,

          // Cihaz özellikleri
          batteryInfo,
          keyboardLayout,
          pdfViewerEnabled: (navigator as any).pdfViewerEnabled || false,

          // Plugin bilgileri
          plugins,

          // API desteği
          geolocationSupported: 'geolocation' in navigator,
          serviceWorkerSupported: 'serviceWorker' in navigator,
          webglSupported: !!document.createElement('canvas').getContext('webgl'),
          localStorageSupported: typeof Storage !== 'undefined' && !!localStorage,
          sessionStorageSupported: typeof Storage !== 'undefined' && !!sessionStorage,
          indexedDBSupported: 'indexedDB' in window,
          webRTCSupported:
            !!(window as any).RTCPeerConnection ||
            !!(window as any).mozRTCPeerConnection ||
            !!(window as any).webkitRTCPeerConnection,
          notificationSupported: 'Notification' in window,
          clipboardSupported: 'clipboard' in navigator,
          mediaDevicesSupported: 'mediaDevices' in navigator,
          bluetoothSupported: 'bluetooth' in navigator,
          usbSupported: 'usb' in navigator,
          gamepadsSupported: 'getGamepads' in navigator,
          vibrationSupported: 'vibrate' in navigator,
          batterySupported: 'getBattery' in navigator,

          // Zaman bilgileri
          localTime: new Date().toLocaleString('tr-TR'),
          deviceTime: Date.now() / 1000,

          // New properties
          hardwareAcceleration,
          performanceMetrics,
          enhancedDetection,
        }

        saveInfo(info)

        setBrowserInfo(info)
        setIsInitialLoad(false)
      } catch (error) {
        console.error('Browser bilgileri alınırken hata:', error)
      } finally {
        setLoading(false)
        if (browserInfo) {
          saveInfo(browserInfo)
        }
      }
    }

    getEnhancedBrowserInfo()
  }, [])

  // Otomatik güncellemeler için interval'lar
  useEffect(() => {
    if (!browserInfo || isInitialLoad) return

    // Zaman bilgilerini her saniye güncelle
    const timeInterval = setInterval(updateTimeInfo, 1000)

    // Ağ durumunu her 10 saniyede güncelle
    const networkInterval = setInterval(updateNetworkInfo, 10000)

    // Batarya bilgilerini her 30 saniyede güncelle
    const batteryInterval = setInterval(updateBatteryInfo, 30000)

    // Performans metriklerini her 10 saniyede güncelle
    const performanceInterval = setInterval(updatePerformanceMetrics, 10000)

    // IP bilgilerini her 5 dakikada güncelle
    const ipInterval = setInterval(updateIPInfo, 300000)

    return () => {
      clearInterval(timeInterval)
      clearInterval(networkInterval)
      clearInterval(batteryInterval)
      clearInterval(performanceInterval)
      clearInterval(ipInterval)
    }
  }, [
    browserInfo,
    isInitialLoad,
    updateTimeInfo,
    updateNetworkInfo,
    updateBatteryInfo,
    updatePerformanceMetrics,
    updateIPInfo,
  ])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Detaylı browser bilgileri yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!browserInfo) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="text-center">
          <p className="text-red-600">Browser bilgileri yüklenemedi.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">Browser Bilgi Paneli</h1>
          <p className="text-gray-600">
            Tarayıcınız ve cihazınız hakkında kapsamlı detaylı bilgiler
          </p>
        </div>

        <div className="space-y-6">
          {/* === KULLANICI DOSTU BİLGİLER (ÜST SEVİYE) === */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Temel Browser Bilgileri - Geniş */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <BasicInfoCard
                userAgent={browserInfo.userAgent}
                browser={browserInfo.browser}
                platform={browserInfo.platform}
                vendor={browserInfo.vendor}
                product={browserInfo.product}
                appName={browserInfo.appName}
                webdriver={browserInfo.webdriver}
              />
            </div>

            {/* IP ve Konum Bilgileri - Orta */}
            {browserInfo.ipInfo && (
              <div className="col-span-1 md:col-span-2">
                <IPInfoCard
                  ipInfo={browserInfo.ipInfo}
                  cloudflareColoInfo={cloudflareColoInfo}
                  isLive={true}
                />
              </div>
            )}

            {/* Ağ Durumu - Küçük */}
            <NetworkInfoCard
              onLine={browserInfo.onLine}
              connection={browserInfo.connection}
              isLive={true}
            />

            {/* Batarya Durumu - Küçük */}
            {browserInfo.batteryInfo && (
              <BatteryInfoCard batteryInfo={browserInfo.batteryInfo} isLive={true} />
            )}

            {/* Ekran Bilgileri - Küçük */}
            <ScreenInfoCard
              screenWidth={browserInfo.screenWidth}
              screenHeight={browserInfo.screenHeight}
              screenAvailWidth={browserInfo.screenAvailWidth}
              screenAvailHeight={browserInfo.screenAvailHeight}
              colorDepth={browserInfo.colorDepth}
              pixelDepth={browserInfo.pixelDepth}
              screenIsExtended={browserInfo.screenIsExtended}
            />

            {/* Zaman Bilgileri - Küçük */}
            <TimeInfoCard
              localTime={browserInfo.localTime}
              timezone={browserInfo.timezone}
              timezoneOffset={browserInfo.timezoneOffset}
              deviceTime={browserInfo.deviceTime}
              isLive={true}
            />
          </div>

          {/* === GENEL TEKNİK BİLGİLER (ORTA SEVİYE) === */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800">
              Teknik Özellikler
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Sistem Özellikleri - Küçük */}
              <SystemInfoCard
                hardwareConcurrency={browserInfo.hardwareConcurrency}
                deviceMemory={browserInfo.deviceMemory}
                heapSizeLimit={browserInfo.heapSizeLimit}
                maxTouchPoints={browserInfo.maxTouchPoints}
                oscpu={browserInfo.oscpu}
              />

              {/* Donanım İvmesi & GPU - Orta */}
              <div className="col-span-1 md:col-span-2">
                <HardwareAccelerationCard hardwareAcceleration={browserInfo.hardwareAcceleration} />
              </div>

              {/* Performans Metrikleri - Orta */}
              <div className="col-span-1 md:col-span-2">
                <PerformanceMetricsCard
                  performanceMetrics={browserInfo.performanceMetrics}
                  isLive={true}
                />
              </div>

              {/* Medya Yetenekleri - Küçük */}
              <div className="col-span-1">
                <MediaCapabilitiesCard
                  audioCodecs={browserInfo.audioCodecs}
                  videoCodecs={browserInfo.videoCodecs}
                  speechVoices={browserInfo.speechVoices}
                />
              </div>

              {/* API Desteği - Geniş */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <APISupportsCard
                  geolocationSupported={browserInfo.geolocationSupported}
                  serviceWorkerSupported={browserInfo.serviceWorkerSupported}
                  webglSupported={browserInfo.webglSupported}
                  indexedDBSupported={browserInfo.indexedDBSupported}
                  webRTCSupported={browserInfo.webRTCSupported}
                  notificationSupported={browserInfo.notificationSupported}
                  clipboardSupported={browserInfo.clipboardSupported}
                  mediaDevicesSupported={browserInfo.mediaDevicesSupported}
                  bluetoothSupported={browserInfo.bluetoothSupported}
                  gamepadsSupported={browserInfo.gamepadsSupported}
                  vibrationSupported={browserInfo.vibrationSupported}
                  batterySupported={browserInfo.batterySupported}
                  usbSupported={browserInfo.usbSupported}
                />
              </div>
            </div>
          </div>

          {/* === DEBUG/TEKNİSYEN BİLGİLERİ (ALT SEVİYE) === */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800">
              Debug & Gelişmiş Bilgiler
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Gelişmiş Özellikler - Geniş */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <EnhancedFeaturesCard enhancedDetection={browserInfo.enhancedDetection} />
              </div>

              {/* Gizlilik ve Güvenlik - Orta */}
              <div className="col-span-1 md:col-span-2">
                <PrivacySecurityCard
                  cookieEnabled={browserInfo.cookieEnabled}
                  doNotTrack={browserInfo.doNotTrack}
                  globalPrivacyControl={browserInfo.globalPrivacyControl}
                  localStorageSupported={browserInfo.localStorageSupported}
                />
              </div>

              {/* Klavye ve Girdi - Küçük */}
              <KeyboardInputCard
                keyboardLayout={browserInfo.keyboardLayout}
                pdfViewerEnabled={browserInfo.pdfViewerEnabled}
              />

              {/* Canvas Parmak İzi - Küçük */}
              <CanvasFingerprintCard
                canvas2dHash={browserInfo.canvas2dHash}
                canvasWebGLHash={browserInfo.canvasWebGLHash}
                webGLExtensions={browserInfo.webGLExtensions}
              />

              {/* Plugin Bilgileri - Küçük */}
              <PluginsCard plugins={browserInfo.plugins} />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Bu bilgiler Navigator API ve diğer web API'leri kullanılarak gerçek zamanlı olarak
            alınmıştır.
          </p>
          <p className="mt-1">
            Bazı özellikler tarayıcı, cihaz desteği ve gizlilik ayarlarına bağlı olarak değişebilir.
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
