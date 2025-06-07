export interface IPInfo {
  ip: string
  network: string
  country: string
  countryCode: string
  city: string
  regionName: string
  zip: string
  timezone: string
  lat: number
  lon: number
  isp: string
  org: string
  as: string
  cfray: string
  cfrayFull: string
}

export async function getIPInfo(): Promise<IPInfo | null> {
  try {
    // Belirtilen API endpoint'ini kullanıyoruz
    const response = await fetch('https://labs.ramazansancar.com.tr/browser-info/get_ip_info.php')
    if (!response.ok) throw new Error('IP API yanıt vermedi')

    const data = await response.json()
    return data
  } catch (error) {
    console.error('IP bilgisi alınamadı:', error)
    return null
  }
}
