import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Keyboard } from 'lucide-react'
import { ExperimentalBadge } from '../badges/experimental-badge'

interface KeyboardInputCardProps {
  keyboardLayout: string
  pdfViewerEnabled: boolean
}

export function KeyboardInputCard({ keyboardLayout, pdfViewerEnabled }: KeyboardInputCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Keyboard className="h-5 w-5" />
          Klavye ve Girdi
          <ExperimentalBadge />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-500">
              Klavye Layout
              <ExperimentalBadge className="h-3 w-3" />
            </p>
            <p className="mt-1 max-h-20 overflow-y-auto rounded bg-gray-50 p-2 text-xs">
              {keyboardLayout}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">PDF Görüntüleyici</p>
            <Badge
              variant={pdfViewerEnabled ? 'default' : 'secondary'}
              className={pdfViewerEnabled ? 'bg-green-500 hover:bg-green-600' : ''}
            >
              {pdfViewerEnabled ? 'Etkin' : 'Devre Dışı'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
