import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wifi } from 'lucide-react'
import { LiveDataBadge } from '../badges/live-data-badge'

interface NetworkInfoCardProps {
  onLine: boolean
  connection: any
  isLive?: boolean
}

export function NetworkInfoCard({ onLine, connection, isLive = false }: NetworkInfoCardProps) {
  return (
    <Card className={isLive ? 'border-l-4 border-l-emerald-500' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wifi className="h-5 w-5" />
          Ağ Durumu
          {isLive && <LiveDataBadge updateInterval="10 saniyede bir" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-500">Çevrimiçi Durumu</p>
            <Badge
              variant={onLine ? 'default' : 'destructive'}
              className={
                onLine
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }
            >
              {onLine ? 'Çevrimiçi' : 'Çevrimdışı'}
            </Badge>
          </div>
          {connection && (
            <>
              <div>
                <p className="text-sm font-medium text-gray-500">Bağlantı Türü</p>
                <p className="mt-1 text-sm">{connection.effectiveType || 'Bilinmiyor'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">İndirme Hızı</p>
                <p className="mt-1 text-sm">{connection.downlink || 0} Mbps</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Gecikme</p>
                <p className="mt-1 text-sm">{connection.rtt || 0} ms</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Veri Tasarrufu</p>
                <Badge
                  variant={connection.saveData ? 'default' : 'secondary'}
                  className={
                    connection.saveData
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }
                >
                  {connection.saveData ? 'Etkin' : 'Devre Dışı'}
                </Badge>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
