import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Cpu } from 'lucide-react'
import { ExperimentalBadge } from '../badges/experimental-badge'

interface SystemInfoCardProps {
  hardwareConcurrency: number
  deviceMemory?: number
  heapSizeLimit: string
  maxTouchPoints: number
  oscpu?: string
}

export function SystemInfoCard({
  hardwareConcurrency,
  deviceMemory,
  heapSizeLimit,
  maxTouchPoints,
  oscpu,
}: SystemInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5" />
          Sistem Özellikleri
          {deviceMemory && <ExperimentalBadge />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-500">CPU Çekirdek Sayısı</p>
            <p className="mt-1 text-sm">{hardwareConcurrency || 'Bilinmiyor'}</p>
          </div>
          {deviceMemory && (
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-500">
                Cihaz Belleği
                <ExperimentalBadge className="h-3 w-3" />
              </p>
              <p className="mt-1 text-sm">{deviceMemory} GB</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-500">Heap Boyut Limiti</p>
            <p className="mt-1 text-sm">{heapSizeLimit}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Dokunma Noktaları</p>
            <p className="mt-1 text-sm">{maxTouchPoints}</p>
          </div>
          {oscpu && (
            <div>
              <p className="text-sm font-medium text-gray-500">İşletim Sistemi</p>
              <p className="mt-1 text-sm">{oscpu}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
