import {
  Chrome,
  ChromeIcon as Firefox,
  AppleIcon as Safari,
  DotIcon as Edge,
  Globe,
} from 'lucide-react'

export function getBrowserIcon(userAgent: string) {
  const ua = userAgent.toLowerCase()

  if (ua.includes('chrome') && !ua.includes('edg')) {
    return <Chrome className="h-4 w-4 text-blue-500" />
  } else if (ua.includes('firefox')) {
    return <Firefox className="h-4 w-4 text-orange-500" />
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    return <Safari className="h-4 w-4 text-blue-400" />
  } else if (ua.includes('edg')) {
    return <Edge className="h-4 w-4 text-blue-600" />
  } else {
    return <Globe className="h-4 w-4 text-gray-500" />
  }
}

export function getBrowserName(userAgent: string): string {
  const ua = userAgent.toLowerCase()

  if (ua.includes('chrome') && !ua.includes('edg')) {
    return 'Google Chrome'
  } else if (ua.includes('firefox')) {
    return 'Mozilla Firefox'
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    return 'Safari'
  } else if (ua.includes('edg')) {
    return 'Microsoft Edge'
  } else if (ua.includes('opera')) {
    return 'Opera'
  } else {
    return 'Bilinmeyen Tarayıcı'
  }
}
