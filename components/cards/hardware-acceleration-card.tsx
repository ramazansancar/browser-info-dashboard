import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Zap } from 'lucide-react'
import { ExperimentalBadge } from '../badges/experimental-badge'
import type { HardwareAcceleration } from '../../utils/hardware-acceleration'

interface HardwareAccelerationCardProps {
  hardwareAcceleration: HardwareAcceleration
}

export function HardwareAccelerationCard({ hardwareAcceleration }: HardwareAccelerationCardProps) {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Donanım İvmesi & GPU
          <ExperimentalBadge />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-500">Genel Durum</p>
            <Badge
              variant={hardwareAcceleration.hardwareAcceleration ? 'default' : 'destructive'}
              className={
                hardwareAcceleration.hardwareAcceleration
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }
            >
              {hardwareAcceleration.hardwareAcceleration ? 'Etkin' : 'Devre Dışı'}
            </Badge>
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-500">GPU Vendor</p>
              <p className="mt-1 rounded bg-gray-50 p-2 font-mono text-xs">
                {hardwareAcceleration.webglVendor}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">GPU Renderer</p>
              <p className="mt-1 rounded bg-gray-50 p-2 font-mono text-xs">
                {hardwareAcceleration.webglRenderer}
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <p className="mb-1 text-sm font-medium text-gray-500">WebGL</p>
              <Badge
                variant={hardwareAcceleration.webglSupported ? 'default' : 'secondary'}
                className={
                  hardwareAcceleration.webglSupported
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }
              >
                {hardwareAcceleration.webglSupported ? '✓' : '✗'}
              </Badge>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-gray-500">WebGL 2</p>
              <Badge
                variant={hardwareAcceleration.webgl2Supported ? 'default' : 'secondary'}
                className={
                  hardwareAcceleration.webgl2Supported
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }
              >
                {hardwareAcceleration.webgl2Supported ? '✓' : '✗'}
              </Badge>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-gray-500">CSS 3D</p>
              <Badge
                variant={hardwareAcceleration.css3dSupported ? 'default' : 'secondary'}
                className={
                  hardwareAcceleration.css3dSupported
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }
              >
                {hardwareAcceleration.css3dSupported ? '✓' : '✗'}
              </Badge>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium text-gray-500">Canvas</p>
              <Badge
                variant={hardwareAcceleration.canvasAccelerated ? 'default' : 'secondary'}
                className={
                  hardwareAcceleration.canvasAccelerated
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }
              >
                {hardwareAcceleration.canvasAccelerated ? '✓' : '✗'}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
