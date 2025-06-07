import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plug } from 'lucide-react'

interface PluginsCardProps {
  plugins: any[]
}

export function PluginsCard({ plugins }: PluginsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plug className="h-5 w-5" />
          Plugin Bilgileri
        </CardTitle>
      </CardHeader>
      <CardContent>
        {plugins.length > 0 ? (
          <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 max-h-[32rem] space-y-3 overflow-y-auto pr-2">
            {plugins.map((plugin, index) => (
              <div key={index} className="rounded-lg border-l-4 border-blue-200 bg-gray-50 p-2">
                <p className="text-sm font-medium text-gray-800">{plugin.name}</p>
                <p className="mt-1 text-xs text-gray-600">{plugin.description}</p>
                <p className="mt-1 text-xs text-gray-500">
                  <span className="font-medium">Dosya:</span> {plugin.filename}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 text-center">
            <p className="text-sm text-gray-600">Plugin bulunamadı</p>
            <p className="mt-1 text-xs text-gray-500">
              Modern tarayıcılar plugin desteğini kaldırmıştır
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
