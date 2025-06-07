import { Monitor, Smartphone, Tablet, Laptop, HardDrive, Globe } from 'lucide-react'

export function getPlatformIcon(userAgent: string, platform: string) {
  const ua = userAgent.toLowerCase()
  const platformLower = platform.toLowerCase()

  // Windows
  if (ua.includes('windows') || platformLower.includes('win')) {
    return <Monitor className="h-4 w-4 text-blue-600" />
  }

  // macOS
  if (ua.includes('macintosh') || ua.includes('mac os') || platformLower.includes('mac')) {
    return <Laptop className="h-4 w-4 text-gray-700" />
  }

  // iOS (iPhone/iPad)
  if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) {
    if (ua.includes('ipad')) {
      return <Tablet className="h-4 w-4 text-gray-600" />
    }
    return <Smartphone className="h-4 w-4 text-gray-600" />
  }

  // Android
  if (ua.includes('android')) {
    // Android tablet detection
    if (ua.includes('tablet') || (!ua.includes('mobile') && ua.includes('android'))) {
      return <Tablet className="h-4 w-4 text-green-600" />
    }
    return <Smartphone className="h-4 w-4 text-green-600" />
  }

  // Linux
  if (ua.includes('linux') || platformLower.includes('linux')) {
    return <HardDrive className="h-4 w-4 text-orange-600" />
  }

  // Chrome OS
  if (ua.includes('cros')) {
    return <Laptop className="h-4 w-4 text-blue-500" />
  }

  // Default
  return <Globe className="h-4 w-4 text-gray-500" />
}

export function getPlatformName(userAgent: string, platform: string): string {
  const ua = userAgent.toLowerCase()
  const platformLower = platform.toLowerCase()

  // Windows versions
  if (ua.includes('windows nt 10.0')) return 'Windows 10/11'
  if (ua.includes('windows nt 6.3')) return 'Windows 8.1'
  if (ua.includes('windows nt 6.2')) return 'Windows 8'
  if (ua.includes('windows nt 6.1')) return 'Windows 7'
  if (ua.includes('windows')) return 'Windows'

  // macOS versions
  if (ua.includes('mac os x')) {
    const macVersion = ua.match(/mac os x (\d+)[._](\d+)/)?.[0]
    if (macVersion) {
      const version = macVersion.replace(/mac os x (\d+)[._](\d+)/, '$1.$2')
      const versionNum = Number.parseFloat(version)

      if (versionNum >= 13) return 'macOS Ventura+'
      if (versionNum >= 12) return 'macOS Monterey'
      if (versionNum >= 11) return 'macOS Big Sur'
      if (versionNum >= 10.15) return 'macOS Catalina'
      if (versionNum >= 10.14) return 'macOS Mojave'
      if (versionNum >= 10.13) return 'macOS High Sierra'
      return `macOS ${version}`
    }
    return 'macOS'
  }

  // iOS versions
  if (ua.includes('iphone')) {
    const iosVersion = ua.match(/os (\d+)[._](\d+)/)?.[0]
    return iosVersion ? `iOS ${iosVersion.replace(/os (\d+)[._](\d+)/, '$1.$2')}` : 'iOS'
  }

  if (ua.includes('ipad')) {
    const iosVersion = ua.match(/os (\d+)[._](\d+)/)?.[0]
    return iosVersion ? `iPadOS ${iosVersion.replace(/os (\d+)[._](\d+)/, '$1.$2')}` : 'iPadOS'
  }

  // Android versions
  if (ua.includes('android')) {
    const androidVersion = ua.match(/android (\d+(?:\.\d+)?)/)?.[1]
    if (androidVersion) {
      const version = Number.parseFloat(androidVersion)
      if (version >= 13) return `Android ${androidVersion} (Tiramisu+)`
      if (version >= 12) return `Android ${androidVersion} (Snow Cone)`
      if (version >= 11) return `Android ${androidVersion} (Red Velvet Cake)`
      if (version >= 10) return `Android ${androidVersion} (Quince Tart)`
      return `Android ${androidVersion}`
    }
    return 'Android'
  }

  // Linux distributions
  if (ua.includes('ubuntu')) return 'Ubuntu Linux'
  if (ua.includes('fedora')) return 'Fedora Linux'
  if (ua.includes('debian')) return 'Debian Linux'
  if (ua.includes('linux')) return 'Linux'

  // Chrome OS
  if (ua.includes('cros')) return 'Chrome OS'

  // FreeBSD, OpenBSD, etc.
  if (ua.includes('freebsd')) return 'FreeBSD'
  if (ua.includes('openbsd')) return 'OpenBSD'
  if (ua.includes('netbsd')) return 'NetBSD'

  // Fallback to platform string
  return platform || 'Bilinmeyen Platform'
}

export function getDeviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase()

  if (ua.includes('mobile') || ua.includes('iphone') || ua.includes('ipod')) {
    return 'Mobil Telefon'
  }

  if (ua.includes('tablet') || ua.includes('ipad')) {
    return 'Tablet'
  }

  if (ua.includes('smart-tv') || ua.includes('smarttv')) {
    return 'Akıllı TV'
  }

  return 'Masaüstü/Laptop'
}

export function getDeviceIcon(userAgent: string) {
  const ua = userAgent.toLowerCase()

  if (ua.includes('mobile') || ua.includes('iphone') || ua.includes('ipod')) {
    return <Smartphone className="h-4 w-4 text-blue-600" />
  }

  if (ua.includes('tablet') || ua.includes('ipad')) {
    return <Tablet className="h-4 w-4 text-green-600" />
  }

  if (ua.includes('smart-tv') || ua.includes('smarttv')) {
    return <Monitor className="h-4 w-4 text-purple-600" />
  }

  return <Laptop className="h-4 w-4 text-gray-700" />
}
