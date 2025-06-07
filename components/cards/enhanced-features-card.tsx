import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Smartphone, Volume2, Compass, Cpu, Cog } from 'lucide-react'
import { ExperimentalBadge } from '../badges/experimental-badge'
import type { EnhancedDetection } from '../../utils/enhanced-detection'

interface EnhancedFeaturesCardProps {
  enhancedDetection: EnhancedDetection
}

export function EnhancedFeaturesCard({ enhancedDetection }: EnhancedFeaturesCardProps) {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cog className="h-5 w-5" />
          Gelişmiş Özellikler
          <ExperimentalBadge />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Touch Support */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <p className="text-sm font-semibold text-gray-700">Dokunmatik Destek</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs font-medium text-gray-500">Maksimum Dokunma</p>
                <p className="text-sm">{enhancedDetection.touchSupport.maxTouchPoints} nokta</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Touch Events</p>
                <Badge
                  variant={
                    enhancedDetection.touchSupport.touchEventsSupported ? 'default' : 'secondary'
                  }
                  className={
                    enhancedDetection.touchSupport.touchEventsSupported
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }
                >
                  {enhancedDetection.touchSupport.touchEventsSupported ? '✓' : '✗'}
                </Badge>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Pointer Events</p>
                <Badge
                  variant={
                    enhancedDetection.touchSupport.pointerEventsSupported ? 'default' : 'secondary'
                  }
                  className={
                    enhancedDetection.touchSupport.pointerEventsSupported
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }
                >
                  {enhancedDetection.touchSupport.pointerEventsSupported ? '✓' : '✗'}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Audio Context */}
          {enhancedDetection.audioContext && (
            <>
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  <p className="text-sm font-semibold text-gray-700">Ses Bağlamı</p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Destek</p>
                    <Badge
                      variant={enhancedDetection.audioContext.supported ? 'default' : 'secondary'}
                      className={
                        enhancedDetection.audioContext.supported
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }
                    >
                      {enhancedDetection.audioContext.supported ? '✓' : '✗'}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Örnekleme Hızı</p>
                    <p className="text-sm">{enhancedDetection.audioContext.sampleRate} Hz</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Kanal Sayısı</p>
                    <p className="text-sm">{enhancedDetection.audioContext.maxChannelCount}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Durum</p>
                    <p className="text-sm capitalize">{enhancedDetection.audioContext.state}</p>
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Sensors */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Compass className="h-4 w-4" />
              <p className="text-sm font-semibold text-gray-700">Cihaz Sensörleri</p>
              <ExperimentalBadge className="h-3 w-3" />
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              <div>
                <p className="mb-1 text-xs font-medium text-gray-500">İvmeölçer</p>
                <Badge
                  variant={enhancedDetection.sensors.accelerometer ? 'default' : 'secondary'}
                  className={
                    enhancedDetection.sensors.accelerometer
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }
                >
                  {enhancedDetection.sensors.accelerometer ? '✓' : '✗'}
                </Badge>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-gray-500">Jiroskop</p>
                <Badge
                  variant={enhancedDetection.sensors.gyroscope ? 'default' : 'secondary'}
                  className={
                    enhancedDetection.sensors.gyroscope
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }
                >
                  {enhancedDetection.sensors.gyroscope ? '✓' : '✗'}
                </Badge>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-gray-500">Manyetometre</p>
                <Badge
                  variant={enhancedDetection.sensors.magnetometer ? 'default' : 'secondary'}
                  className={
                    enhancedDetection.sensors.magnetometer
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }
                >
                  {enhancedDetection.sensors.magnetometer ? '✓' : '✗'}
                </Badge>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-gray-500">Işık Sensörü</p>
                <Badge
                  variant={enhancedDetection.sensors.ambientLight ? 'default' : 'secondary'}
                  className={
                    enhancedDetection.sensors.ambientLight
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }
                >
                  {enhancedDetection.sensors.ambientLight ? '✓' : '✗'}
                </Badge>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-gray-500">Yakınlık</p>
                <Badge
                  variant={enhancedDetection.sensors.proximity ? 'default' : 'secondary'}
                  className={
                    enhancedDetection.sensors.proximity
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }
                >
                  {enhancedDetection.sensors.proximity ? '✓' : '✗'}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Modern APIs */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              <p className="text-sm font-semibold text-gray-700">Modern API'ler</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs font-medium text-gray-500">WebAssembly</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge
                    variant={enhancedDetection.webAssembly.supported ? 'default' : 'secondary'}
                    className={
                      enhancedDetection.webAssembly.supported
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }
                  >
                    {enhancedDetection.webAssembly.supported ? '✓' : '✗'}
                  </Badge>
                  <span className="text-xs text-gray-600">
                    {enhancedDetection.webAssembly.version}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Service Worker</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge
                    variant={enhancedDetection.serviceWorker.supported ? 'default' : 'secondary'}
                    className={
                      enhancedDetection.serviceWorker.supported
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }
                  >
                    {enhancedDetection.serviceWorker.supported ? '✓' : '✗'}
                  </Badge>
                  {enhancedDetection.serviceWorker.controller && (
                    <span className="text-xs text-green-600">Aktif</span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Push Notifications</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge
                    variant={
                      enhancedDetection.pushNotifications.supported ? 'default' : 'secondary'
                    }
                    className={
                      enhancedDetection.pushNotifications.supported
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }
                  >
                    {enhancedDetection.pushNotifications.supported ? '✓' : '✗'}
                  </Badge>
                  <span className="text-xs capitalize text-gray-600">
                    {enhancedDetection.pushNotifications.permission}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
