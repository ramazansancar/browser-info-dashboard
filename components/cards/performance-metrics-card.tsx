import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Activity } from 'lucide-react'
import { ExperimentalBadge } from '../badges/experimental-badge'
import { LiveDataBadge } from '../badges/live-data-badge'
import type { PerformanceMetrics } from '../../utils/performance-metrics'

interface PerformanceMetricsCardProps {
  performanceMetrics: PerformanceMetrics
  isLive?: boolean
}

export function PerformanceMetricsCard({
  performanceMetrics,
  isLive = false,
}: PerformanceMetricsCardProps) {
  return (
    <Card className={isLive ? 'border-l-4 border-l-emerald-500' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Performans Metrikleri
          {isLive && <LiveDataBadge updateInterval="10 saniyede bir" />}
          <ExperimentalBadge />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Memory Information */}
          {performanceMetrics.memoryInfo && (
            <>
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-700">Bellek Kullanımı</p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Kullanılan</p>
                    <p className="font-mono text-sm">
                      {performanceMetrics.memoryInfo.usedJSHeapSize}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Toplam</p>
                    <p className="font-mono text-sm">
                      {performanceMetrics.memoryInfo.totalJSHeapSize}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Limit</p>
                    <p className="font-mono text-sm">
                      {performanceMetrics.memoryInfo.jsHeapSizeLimit}
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Timing Information */}
          {performanceMetrics.timing && (
            <>
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-700">Sayfa Yükleme</p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium text-gray-500">DOM Yükleme</p>
                    <p className="text-sm">{performanceMetrics.timing.domContentLoaded}ms</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Toplam Yükleme</p>
                    <p className="text-sm">{performanceMetrics.timing.pageLoadTime}ms</p>
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Device Information */}
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-700">Cihaz Özellikleri</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-gray-500">Piksel Oranı</p>
                <p className="text-sm">{performanceMetrics.devicePixelRatio}x</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">CPU Çekirdekleri</p>
                <p className="text-sm">{performanceMetrics.concurrency}</p>
              </div>
            </div>
          </div>

          {/* Connection Information */}
          {performanceMetrics.connection && (
            <>
              <Separator />
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-700">Bağlantı Performansı</p>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Tip</p>
                    <p className="text-sm">{performanceMetrics.connection.effectiveType}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Hız</p>
                    <p className="text-sm">{performanceMetrics.connection.downlink} Mbps</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Gecikme</p>
                    <p className="text-sm">{performanceMetrics.connection.rtt}ms</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Tasarruf</p>
                    <p className="text-sm">
                      {performanceMetrics.connection.saveData ? 'Evet' : 'Hayır'}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
