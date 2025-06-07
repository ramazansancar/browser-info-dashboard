import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Fingerprint } from 'lucide-react'
import { ExperimentalBadge } from '../badges/experimental-badge'

interface CanvasFingerprintCardProps {
  canvas2dHash: string
  canvasWebGLHash: string
  webGLExtensions: string
}

export function CanvasFingerprintCard({
  canvas2dHash,
  canvasWebGLHash,
  webGLExtensions,
}: CanvasFingerprintCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Fingerprint className="h-5 w-5" />
          Canvas Parmak İzi
          <ExperimentalBadge />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-500">2D Canvas Hash</p>
            <p className="mt-1 rounded bg-gray-50 p-2 font-mono text-xs">{canvas2dHash}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">WebGL Canvas Hash</p>
            <p className="mt-1 rounded bg-gray-50 p-2 font-mono text-xs">{canvasWebGLHash}</p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-500">
              WebGL Uzantıları
              <ExperimentalBadge className="h-3 w-3" />
            </p>
            <p className="mt-1 max-h-48 overflow-y-auto text-xs">{webGLExtensions}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
