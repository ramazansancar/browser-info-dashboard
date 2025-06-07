import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Volume2 } from 'lucide-react'

interface MediaCapabilitiesCardProps {
  audioCodecs: string[]
  videoCodecs: string[]
  speechVoices: string[]
}

export function MediaCapabilitiesCard({
  audioCodecs,
  videoCodecs,
  speechVoices,
}: MediaCapabilitiesCardProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Medya Yetenekleri
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-500">Desteklenen Ses Formatları</p>
            <div className="flex flex-wrap gap-1">
              {audioCodecs.length > 0 ? (
                audioCodecs.map((codec, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {codec}
                  </Badge>
                ))
              ) : (
                <Badge variant="secondary">Hiçbiri</Badge>
              )}
            </div>
          </div>
          <Separator />
          <div>
            <p className="mb-2 text-sm font-medium text-gray-500">Desteklenen Video Formatları</p>
            <div className="flex flex-wrap gap-1">
              {videoCodecs.length > 0 ? (
                videoCodecs.map((codec, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {codec}
                  </Badge>
                ))
              ) : (
                <Badge variant="secondary">Hiçbiri</Badge>
              )}
            </div>
          </div>
          <Separator />
          <div>
            <p className="mb-2 text-sm font-medium text-gray-500">Konuşma Sentezi Sesleri</p>
            <p className="mb-2 text-xs text-gray-600">
              {speechVoices.length > 0 ? `${speechVoices.length} ses mevcut` : 'Desteklenmiyor'}
            </p>
            {speechVoices.length > 0 && (
              <div className="flex max-h-20 flex-wrap gap-1 overflow-y-auto">
                {speechVoices.map((voice, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {voice}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
