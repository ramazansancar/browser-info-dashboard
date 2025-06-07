import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Battery,
  Camera,
  Gamepad2,
  HardDrive,
  Headphones,
  Info,
  MapPin,
  Monitor,
  Smartphone,
} from 'lucide-react'
import { ExperimentalBadge } from '../badges/experimental-badge'

interface APISupportsCardProps {
  geolocationSupported: boolean
  serviceWorkerSupported: boolean
  webglSupported: boolean
  indexedDBSupported: boolean
  webRTCSupported: boolean
  notificationSupported: boolean
  clipboardSupported: boolean
  mediaDevicesSupported: boolean
  bluetoothSupported: boolean
  gamepadsSupported: boolean
  vibrationSupported: boolean
  batterySupported: boolean
  usbSupported: boolean
}

export function APISupportsCard({
  geolocationSupported,
  serviceWorkerSupported,
  webglSupported,
  indexedDBSupported,
  webRTCSupported,
  notificationSupported,
  clipboardSupported,
  mediaDevicesSupported,
  bluetoothSupported,
  gamepadsSupported,
  vibrationSupported,
  batterySupported,
  usbSupported,
}: APISupportsCardProps) {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Gelişmiş API Desteği
          <ExperimentalBadge />
        </CardTitle>
        <CardDescription>Tarayıcınızın desteklediği modern web API'leri</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Geolocation</span>
            <Badge
              variant={geolocationSupported ? 'default' : 'secondary'}
              className={`ml-auto ${
                geolocationSupported
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {geolocationSupported ? '✓' : '✗'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            <span className="text-sm">Service Worker</span>
            <Badge
              variant={serviceWorkerSupported ? 'default' : 'secondary'}
              className={`ml-auto ${
                serviceWorkerSupported
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {serviceWorkerSupported ? '✓' : '✗'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            <span className="text-sm">WebGL</span>
            <Badge
              variant={webglSupported ? 'default' : 'secondary'}
              className={`ml-auto ${
                webglSupported
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {webglSupported ? '✓' : '✗'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            <span className="text-sm">IndexedDB</span>
            <Badge
              variant={indexedDBSupported ? 'default' : 'secondary'}
              className={`ml-auto ${
                indexedDBSupported
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {indexedDBSupported ? '✓' : '✗'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <span className="text-sm">WebRTC</span>
            <Badge
              variant={webRTCSupported ? 'default' : 'secondary'}
              className={`ml-auto ${
                webRTCSupported
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {webRTCSupported ? '✓' : '✗'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span className="text-sm">Notifications</span>
            <Badge
              variant={notificationSupported ? 'default' : 'secondary'}
              className={`ml-auto ${
                notificationSupported
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {notificationSupported ? '✓' : '✗'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span className="text-sm">Clipboard</span>
            <Badge
              variant={clipboardSupported ? 'default' : 'secondary'}
              className={`ml-auto ${
                clipboardSupported
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {clipboardSupported ? '✓' : '✗'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <span className="text-sm">Media Devices</span>
            <Badge
              variant={mediaDevicesSupported ? 'default' : 'secondary'}
              className={`ml-auto ${
                mediaDevicesSupported
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {mediaDevicesSupported ? '✓' : '✗'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Headphones className="h-4 w-4" />
            <span className="flex items-center gap-1 text-sm">
              Bluetooth
              <ExperimentalBadge className="h-3 w-3" />
            </span>
            <Badge
              variant={bluetoothSupported ? 'default' : 'secondary'}
              className={`ml-auto ${
                bluetoothSupported
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {bluetoothSupported ? '✓' : '✗'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            <span className="text-sm">Gamepads</span>
            <Badge
              variant={gamepadsSupported ? 'default' : 'secondary'}
              className={`ml-auto ${
                gamepadsSupported
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {gamepadsSupported ? '✓' : '✗'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            <span className="flex items-center gap-1 text-sm">
              Vibration
              <ExperimentalBadge className="h-3 w-3" />
            </span>
            <Badge
              variant={vibrationSupported ? 'default' : 'secondary'}
              className={`ml-auto ${
                vibrationSupported
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {vibrationSupported ? '✓' : '✗'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Battery className="h-4 w-4" />
            <span className="flex items-center gap-1 text-sm">
              Battery
              <ExperimentalBadge className="h-3 w-3" />
            </span>
            <Badge
              variant={batterySupported ? 'default' : 'secondary'}
              className={`ml-auto ${
                batterySupported
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {batterySupported ? '✓' : '✗'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span className="flex items-center gap-1 text-sm">
              USB
              <ExperimentalBadge className="h-3 w-3" />
            </span>
            <Badge
              variant={usbSupported ? 'default' : 'secondary'}
              className={`ml-auto ${
                usbSupported
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {usbSupported ? '✓' : '✗'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
