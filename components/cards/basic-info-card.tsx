import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Info, Bot } from 'lucide-react'
import { getBrowserIcon, getBrowserName } from '../../utils/browser-icons'
import {
  getPlatformIcon,
  getPlatformName,
  getDeviceType,
  getDeviceIcon,
} from '../../utils/platform-icons'

interface BasicInfoCardProps {
  userAgent: string
  browser: string
  platform: string
  vendor: string
  product: string
  appName: string
  webdriver: boolean
}

export function BasicInfoCard({
  userAgent,
  browser,
  platform,
  vendor,
  product,
  appName,
  webdriver,
}: BasicInfoCardProps) {
  const browserName = getBrowserName(userAgent)
  const browserIcon = getBrowserIcon(userAgent)
  const platformIcon = getPlatformIcon(userAgent, platform)
  const platformName = getPlatformName(userAgent, platform)
  const deviceTypeIcon = getDeviceIcon(userAgent)
  const deviceType = getDeviceType(userAgent)

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          Temel Browser Bilgileri
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-gray-500">User Agent</p>
            <p className="mt-1 break-all rounded bg-gray-50 p-2 text-xs">{userAgent}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tarayıcı</p>
            <div className="mt-1 flex items-center gap-2">
              {browserIcon}
              <p className="text-sm">{browserName}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Platform</p>
            <div className="mt-1 flex items-center gap-2">
              {platformIcon}
              <p className="text-sm">{platformName}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Cihaz Türü</p>
            <div className="mt-1 flex items-center gap-2">
              {deviceTypeIcon}
              <p className="text-sm">{deviceType}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Vendor</p>
            <p className="mt-1 text-sm">{vendor}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Product</p>
            <p className="mt-1 text-sm">{product}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Uygulama Adı</p>
            <p className="mt-1 text-sm">{appName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-gray-500" />
                WebDriver
              </div>
            </p>
            <Badge
              variant={webdriver ? 'destructive' : 'default'}
              className={
                webdriver
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }
            >
              {webdriver ? 'Evet (Bot Algılandı)' : 'Hayır'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
