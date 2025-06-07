'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, MapPin, Loader2 } from 'lucide-react'

interface LocationMapProps {
  ipLocation: {
    lat: number
    lon: number
    city: string
    country: string
    ip: string
  }
  coloLocation?: {
    lat: number
    lon: number
    name: string
    city: string
    country: string
  } | null
}

const mapTypes = [
  {
    value: 'osm',
    label: 'OpenStreetMap',
    tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribute:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: ['a', 'b', 'c'],
    maxZoom: 19,
  },
  {
    value: 'satellite',
    label: 'Uydu Görünümü',
    tileLayer:
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribute:
      '&copy; <a href="https://www.esri.com/">Esri</a>, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS',
    maxZoom: 19,
  },
  {
    value: 'google',
    label: 'Google Haritalar',
    tileLayer: 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    attribute: '&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 19,
  },
  {
    value: 'google-satellite',
    label: 'Google Uydu',
    tileLayer: 'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    attribute: '&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 19,
  },
]

const getTileLayer = (mapType: string) => {
  const type = mapTypes.find((type) => type.value === mapType)
  if (type) {
    return {
      url: type.tileLayer,
      attribution: type.attribute,
      subdomains: type.subdomains || [],
      maxZoom: type.maxZoom || 19,
    }
  }
  return {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: ['a', 'b', 'c'],
    maxZoom: 19,
  }
}

export function LocationMap({ ipLocation, coloLocation }: LocationMapProps) {
  const [mapType, setMapType] = useState<'osm' | 'satellite' | 'google' | 'google-satellite'>('osm')
  const [isLoaded, setIsLoaded] = useState(false)
  const [mapInstance, setMapInstance] = useState<any>(null)

  // Harita merkezi hesapla
  const centerLat = coloLocation ? (ipLocation.lat + coloLocation.lat) / 2 : ipLocation.lat
  const centerLon = coloLocation ? (ipLocation.lon + coloLocation.lon) / 2 : ipLocation.lon

  // Zoom seviyesi hesapla
  const getZoomLevel = () => {
    if (!coloLocation) return 10

    const latDiff = Math.abs(ipLocation.lat - coloLocation.lat)
    const lonDiff = Math.abs(ipLocation.lon - coloLocation.lon)
    const maxDiff = Math.max(latDiff, lonDiff)
    if (maxDiff > 100) return 1
    if (maxDiff > 50) return 2
    if (maxDiff > 20) return 3
    if (maxDiff > 10) return 4
    if (maxDiff > 5) return 5
    if (maxDiff > 2) return 6
    if (maxDiff > 1) return 7
    if (maxDiff > 0.5) return 8
    if (maxDiff > 0.1) return 9
    return 10
  }

  const zoom = getZoomLevel()

  // Leaflet'i CDN'den yükle
  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        // CSS'i yükle
        if (!document.querySelector('link[href*="leaflet"]')) {
          const cssLink = document.createElement('link')
          cssLink.rel = 'stylesheet'
          cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
          cssLink.crossOrigin = ''
          document.head.appendChild(cssLink)
        }

        // Leaflet JS'i yükle
        if (!(window as any).L) {
          const script = document.createElement('script')
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
          script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
          script.crossOrigin = ''

          script.onload = () => {
            setIsLoaded(true)
          }

          document.head.appendChild(script)
        } else {
          setIsLoaded(true)
        }
      } catch (error) {
        console.error('Leaflet yükleme hatası:', error)
      }
    }

    loadLeaflet()
  }, [])

  // Haritayı oluştur
  useEffect(() => {
    if (!isLoaded || mapInstance) return

    const L = (window as any).L
    if (!L) return

    // Harita container'ını temizle
    const container = document.getElementById('map-container')
    if (!container) return

    container.innerHTML = ''

    try {
      // Harita oluştur
      const map = L.map('map-container').setView([centerLat, centerLon], zoom)

      // Tile layer ekle
      L.tileLayer(getTileLayer(mapType).url, {
        attribution: getTileLayer(mapType).attribution,
        maxZoom: getTileLayer(mapType).maxZoom,
        subdomains: getTileLayer(mapType).subdomains,
      }).addTo(map)

      // Custom icon oluştur
      const createCustomIcon = (color: string) => {
        return L.divIcon({
          className: 'custom-div-icon',
          html: `
            <div style="
              background-color: ${color};
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              position: relative;
            ">
              <div style="
                position: absolute;
                top: -8px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 8px solid ${color};
              "></div>
            </div>
          `,
          iconSize: [20, 28],
          iconAnchor: [10, 28],
          popupAnchor: [0, -28],
        })
      }

      // IP marker ekle
      const ipMarker = L.marker([ipLocation.lat, ipLocation.lon], {
        icon: createCustomIcon('#ef4444'),
      }).addTo(map)

      ipMarker.bindPopup(`
        <div style="font-size: 14px; line-height: 1.4; min-width: 200px;">
          <div style="font-weight: bold; color: #ef4444; margin-bottom: 8px;">📍 IP Konumunuz</div>
          <div><strong>IP:</strong> ${ipLocation.ip}</div>
          <div><strong>Şehir:</strong> ${ipLocation.city}</div>
          <div><strong>Ülke:</strong> ${ipLocation.country}</div>
          <div style="font-size: 12px; color: #666; margin-top: 8px;">
            ${ipLocation.lat.toFixed(4)}, ${ipLocation.lon.toFixed(4)}
          </div>
        </div>
      `)

      // Cloudflare Colo marker ekle
      if (coloLocation) {
        const coloMarker = L.marker([coloLocation.lat, coloLocation.lon], {
          icon: createCustomIcon('#3b82f6'),
        }).addTo(map)

        coloMarker.bindPopup(`
          <div style="font-size: 14px; line-height: 1.4; min-width: 200px;">
            <div style="font-weight: bold; color: #3b82f6; margin-bottom: 8px;">🌐 Cloudflare Colo</div>
            <div><strong>Lokasyon:</strong> ${coloLocation.name}</div>
            <div><strong>Şehir:</strong> ${coloLocation.city}</div>
            <div><strong>Ülke:</strong> ${coloLocation.country}</div>
            <div style="font-size: 12px; color: #666; margin-top: 8px;">
              ${coloLocation.lat.toFixed(4)}, ${coloLocation.lon.toFixed(4)}
            </div>
          </div>
        `)
      }

      setMapInstance(map)
    } catch (error) {
      console.error('Harita oluşturma hatası:', error)
    }
  }, [isLoaded, centerLat, centerLon, zoom, ipLocation, coloLocation])

  // Map type değiştiğinde tile layer'ı güncelle
  useEffect(() => {
    if (!mapInstance || !isLoaded) return

    const L = (window as any).L
    if (!L) return

    // Mevcut tile layer'ları temizle
    mapInstance.eachLayer((layer: any) => {
      if (layer instanceof L.TileLayer) {
        mapInstance.removeLayer(layer)
      }
    })

    // Yeni tile layer ekle
    L.tileLayer(getTileLayer(mapType).url, {
      attribution: getTileLayer(mapType).attribution,
      maxZoom: getTileLayer(mapType).maxZoom,
      subdomains: getTileLayer(mapType).subdomains,
    }).addTo(mapInstance)
  }, [mapType, mapInstance, isLoaded])

  // Cleanup
  useEffect(() => {
    return () => {
      if (mapInstance) {
        mapInstance.remove()
        setMapInstance(null)
      }
    }
  }, [])

  if (!isLoaded) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Harita:</span>
          <div className="rounded bg-gray-200 px-3 py-1">Yükleniyor...</div>
        </div>
        <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-100">
          <div className="text-center">
            <Loader2 className="mx-auto mb-2 h-6 w-6 animate-spin text-gray-500" />
            <p className="text-sm text-gray-600">Leaflet yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Harita Türü Seçici */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-600">Harita:</span>
        {mapTypes.map((type) => (
          <button
            key={type.value}
            onClick={() =>
              setMapType(type.value as 'osm' | 'satellite' | 'google' | 'google-satellite')
            }
            className={`rounded px-3 py-1 transition-colors ${
              mapType === type.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Harita Container */}
      <div className="relative h-64 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
        <div id="map-container" className="h-full w-full" />
        <div className="absolute bottom-2 right-2 rounded bg-white/90 px-2 py-1 text-xs text-gray-600">
          Leaflet ✓
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <span>IP Konumunuz</span>
        </div>
        {coloLocation && (
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span>Cloudflare Colo</span>
          </div>
        )}
      </div>

      {/* Konum Bilgileri */}
      <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
        {/* IP Konumu */}
        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="font-semibold text-red-700">IP Konumunuz</span>
          </div>
          <div className="space-y-1 text-gray-700">
            <div>
              <strong>IP:</strong> {ipLocation.ip}
            </div>
            <div>
              <strong>Şehir:</strong> {ipLocation.city}
            </div>
            <div>
              <strong>Ülke:</strong> {ipLocation.country}
            </div>
            <div className="text-xs text-gray-500">
              {ipLocation.lat.toFixed(4)}, {ipLocation.lon.toFixed(4)}
            </div>
            <a
              href={`https://www.google.com/maps?q=${ipLocation.lat},${ipLocation.lon}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline"
            >
              <MapPin className="h-3 w-3" />
              Google Maps'te Aç
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Cloudflare Colo */}
        {coloLocation && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="font-semibold text-blue-700">Cloudflare Colo</span>
            </div>
            <div className="space-y-1 text-gray-700">
              <div>
                <strong>Lokasyon:</strong> {coloLocation.name}
              </div>
              <div>
                <strong>Şehir:</strong> {coloLocation.city}
              </div>
              <div>
                <strong>Ülke:</strong> {coloLocation.country}
              </div>
              <div className="text-xs text-gray-500">
                {coloLocation.lat.toFixed(4)}, {coloLocation.lon.toFixed(4)}
              </div>
              <a
                href={`https://www.google.com/maps?q=${coloLocation.lat},${coloLocation.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline"
              >
                <MapPin className="h-3 w-3" />
                Google Maps'te Aç
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Hızlı Linkler */}
      <div className="flex flex-wrap gap-2 text-xs">
        <a
          href={`https://www.google.com/maps?q=${ipLocation.lat},${ipLocation.lon}&z=${zoom}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded bg-blue-100 px-3 py-1 text-blue-700 hover:bg-blue-200"
        >
          <ExternalLink className="h-3 w-3" />
          Google Maps'te Görüntüle
        </a>
        <a
          href={`https://www.openstreetmap.org/?mlat=${centerLat}&mlon=${centerLon}&zoom=${zoom}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded bg-green-100 px-3 py-1 text-green-700 hover:bg-green-200"
        >
          <ExternalLink className="h-3 w-3" />
          OpenStreetMap'te Görüntüle
        </a>
        {coloLocation && (
          <a
            href={`https://www.google.com/maps/dir/${ipLocation.lat},${ipLocation.lon}/${coloLocation.lat},${coloLocation.lon}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded bg-purple-100 px-3 py-1 text-purple-700 hover:bg-purple-200"
          >
            <ExternalLink className="h-3 w-3" />
            Yol Tarifi Al
          </a>
        )}
      </div>
    </div>
  )
}
