import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Monitor } from 'lucide-react'
import { ExperimentalBadge } from '../badges/experimental-badge'

interface ScreenInfoCardProps {
  screenWidth: number
  screenHeight: number
  screenAvailWidth: number
  screenAvailHeight: number
  colorDepth: number
  pixelDepth: number
  screenIsExtended: boolean
}

export function ScreenInfoCard({
  screenWidth,
  screenHeight,
  screenAvailWidth,
  screenAvailHeight,
  colorDepth,
  pixelDepth,
  screenIsExtended,
}: ScreenInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          Ekran Bilgileri
          <ExperimentalBadge />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-500">Tam Çözünürlük</p>
            <p className="mt-1 text-sm">
              {screenWidth} x {screenHeight}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Kullanılabilir Alan</p>
            <p className="mt-1 text-sm">
              {screenAvailWidth} x {screenAvailHeight}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Renk Derinliği</p>
            <p className="mt-1 text-sm">{colorDepth} bit</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Piksel Derinliği</p>
            <p className="mt-1 text-sm">{pixelDepth} bit</p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-500">
              Genişletilmiş Ekran
              <ExperimentalBadge className="h-3 w-3" />
            </p>
            <Badge
              variant={screenIsExtended ? 'default' : 'secondary'}
              className={
                screenIsExtended
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }
            >
              {screenIsExtended ? 'Evet' : 'Hayır'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
