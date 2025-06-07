import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield } from 'lucide-react'
import { ExperimentalBadge } from '../badges/experimental-badge'

interface PrivacySecurityCardProps {
  cookieEnabled: boolean
  doNotTrack: string | null
  globalPrivacyControl: string
  localStorageSupported: boolean
}

export function PrivacySecurityCard({
  cookieEnabled,
  doNotTrack,
  globalPrivacyControl,
  localStorageSupported,
}: PrivacySecurityCardProps) {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Gizlilik ve Güvenlik
          <ExperimentalBadge />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-gray-500">Çerezler</p>
            <Badge
              variant={cookieEnabled ? 'default' : 'destructive'}
              className={
                cookieEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
              }
            >
              {cookieEnabled ? 'Etkin' : 'Devre Dışı'}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Do Not Track</p>
            <p className="mt-1 text-sm">{doNotTrack || 'Belirtilmemiş'}</p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-500">
              Global Privacy Control
              <ExperimentalBadge className="h-3 w-3" />
            </p>
            <p className="mt-1 text-sm">{globalPrivacyControl}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Local Storage</p>
            <Badge
              variant={localStorageSupported ? 'default' : 'destructive'}
              className={
                localStorageSupported
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600'
              }
            >
              {localStorageSupported ? 'Destekleniyor' : 'Desteklenmiyor'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
