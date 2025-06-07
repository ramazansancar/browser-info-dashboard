import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock } from 'lucide-react'
import { LiveDataBadge } from '../badges/live-data-badge'

interface TimeInfoCardProps {
  localTime: string
  timezone: string
  timezoneOffset: number
  deviceTime: number
  isLive?: boolean
}

export function TimeInfoCard({
  localTime,
  timezone,
  timezoneOffset,
  deviceTime,
  isLive = false,
}: TimeInfoCardProps) {
  return (
    <Card className={isLive ? 'border-l-4 border-l-emerald-500' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Zaman Bilgileri
          {isLive && <LiveDataBadge updateInterval="her saniye" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-500">Yerel Zaman</p>
            <p className="mt-1 font-mono text-sm">{localTime}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Zaman Dilimi</p>
            <p className="mt-1 text-sm">{timezone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">UTC Offset</p>
            <p className="mt-1 text-sm">
              {Math.abs(timezoneOffset / 60)
                .toString()
                .padStart(2, '0')}
              .
              {Math.abs(timezoneOffset % 60)
                .toString()
                .padStart(2, '0')}
              {timezoneOffset <= 0 ? '+' : '-'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Unix Timestamp</p>
            <p className="mt-1 font-mono text-sm">{Math.round(deviceTime)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
