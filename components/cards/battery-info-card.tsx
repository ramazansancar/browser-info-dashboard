import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Battery } from 'lucide-react'
import { ExperimentalBadge } from '../badges/experimental-badge'
import { LiveDataBadge } from '../badges/live-data-badge'

interface BatteryInfoCardProps {
  batteryInfo: any
  isLive?: boolean
}

export function BatteryInfoCard({ batteryInfo, isLive = false }: BatteryInfoCardProps) {
  if (!batteryInfo) return null

  return (
    <Card className={isLive ? 'border-l-4 border-l-emerald-500' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Battery className="h-5 w-5" />
          Batarya Durumu
          {isLive && <LiveDataBadge updateInterval="30 saniyede bir" />}
          <ExperimentalBadge />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {batteryInfo.error ? (
          <p className="text-sm text-red-600">{batteryInfo.error}</p>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">Batarya Seviyesi</p>
                <span className="text-sm font-semibold">{batteryInfo.level}%</span>
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    batteryInfo.level > 50
                      ? 'bg-green-500'
                      : batteryInfo.level > 15
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                  style={{
                    width: `${Math.max(0, Math.min(100, batteryInfo.level))}%`,
                  }}
                />
                {batteryInfo.charging && (
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Şarj Durumu</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge
                    variant={batteryInfo.charging ? 'default' : 'secondary'}
                    className={
                      batteryInfo.charging
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }
                  >
                    {batteryInfo.charging ? 'Şarj Oluyor' : 'Şarj Olmuyor'}
                  </Badge>
                  {batteryInfo.charging && (
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                      <span className="text-xs text-green-600">Şarj ediliyor</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Şarj Süresi</p>
                <p className="mt-1 text-sm">{batteryInfo.chargingTime}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Deşarj Süresi</p>
                <p className="mt-1 text-sm">
                  {typeof batteryInfo.dischargingTime === 'number' &&
                  batteryInfo.dischargingTime !== Number.POSITIVE_INFINITY
                    ? (() => {
                        const totalMinutes = Math.floor(batteryInfo.dischargingTime / 60)
                        const hours = Math.floor(totalMinutes / 60)
                        const minutes = totalMinutes % 60

                        if (hours > 0) {
                          return `${hours} saat ${minutes} dakika`
                        } else {
                          return `${minutes} dakika`
                        }
                      })()
                    : 'Takılı / Hesaplanamıyor'}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
