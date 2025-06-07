import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { MapPin, ExternalLink } from 'lucide-react'
import { LiveDataBadge } from '../badges/live-data-badge'
import { LocationMap } from '../maps/location-map'
import type { IPInfo } from '../../utils/ip-info'
import type { CloudflareColo } from '../../utils/cloudflare-colo'

interface IPInfoCardProps {
  ipInfo: IPInfo
  cloudflareColoInfo?: CloudflareColo | null
  isLive?: boolean
}

export function IPInfoCard({ ipInfo, cloudflareColoInfo, isLive = false }: IPInfoCardProps) {
  if (!ipInfo) return null

  const googleMapsUrl = `https://www.google.com/maps?q=${ipInfo.lat},${ipInfo.lon}`

  // AS numarasını extract et (örn: "AS15169 Google LLC" -> "15169")
  const asNumber = ipInfo.as.match(/AS(\d+)/)?.[1]
  const bgpHeUrl = asNumber ? `https://bgp.he.net/AS${asNumber}` : null

  return (
    <Card className={isLive ? 'border-l-4 border-l-emerald-500' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          IP ve Konum Bilgileri
          {isLive && <LiveDataBadge updateInterval="5 dakikada bir" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Harita */}
        <div className="mb-6">
          <LocationMap
            ipLocation={{
              lat: ipInfo.lat,
              lon: ipInfo.lon,
              city: ipInfo.city,
              country: ipInfo.country,
              ip: ipInfo.ip,
            }}
            coloLocation={
              cloudflareColoInfo
                ? {
                    lat: cloudflareColoInfo.lat,
                    lon: cloudflareColoInfo.lon,
                    name: cloudflareColoInfo.name,
                    city: cloudflareColoInfo.city,
                    country: cloudflareColoInfo.country,
                  }
                : null
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-gray-500">IP Adresi</p>
            <p className="mt-1 font-mono text-sm">{ipInfo.ip}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Network</p>
            <p className="mt-1 font-mono text-sm">{ipInfo.network}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">ISP</p>
            <p className="mt-1 text-sm">{ipInfo.isp}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Organizasyon</p>
            <p className="mt-1 text-sm">{ipInfo.org}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">AS Numarası</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="font-mono text-sm">{ipInfo.as}</p>
              {bgpHeUrl && (
                <a
                  href={bgpHeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
                  title="BGP.HE.NET'te görüntüle"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Ülke</p>
            <p className="mt-1 text-sm">
              {ipInfo.country} ({ipInfo.countryCode})
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Şehir</p>
            <p className="mt-1 text-sm">
              {ipInfo.city}, {ipInfo.regionName}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Posta Kodu</p>
            <p className="mt-1 text-sm">{ipInfo.zip}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Koordinatlar</p>
            <div className="mt-1 flex items-center gap-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                {ipInfo.lat}, {ipInfo.lon}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Zaman Dilimi</p>
            <p className="mt-1 text-sm">{ipInfo.timezone}</p>
          </div>
        </div>

        {/* Cloudflare Ray Bilgileri */}
        <Separator className="my-4" />
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Cloudflare Ray Bilgileri</h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Ray ID</p>
              <p className="mt-1 font-mono text-sm">{ipInfo.cfray}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Full Ray</p>
              <p className="mt-1 font-mono text-sm">{ipInfo.cfrayFull}</p>
            </div>
            {cloudflareColoInfo && (
              <>
                <div>
                  <p className="text-sm font-medium text-gray-500">Colo Lokasyonu</p>
                  <p className="mt-1 text-sm">{cloudflareColoInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Bölge</p>
                  <p className="mt-1 text-sm">{cloudflareColoInfo.region}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Colo Koordinatları</p>
                  <div className="mt-1 flex items-center gap-2">
                    <a
                      href={`https://www.google.com/maps?q=${cloudflareColoInfo.lat},${cloudflareColoInfo.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {cloudflareColoInfo.lat.toFixed(4)}, {cloudflareColoInfo.lon.toFixed(4)}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Ülke Kodu</p>
                  <Badge variant="outline" className="mt-1">
                    {cloudflareColoInfo.cca2}
                  </Badge>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
