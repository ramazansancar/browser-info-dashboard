export interface CloudflareColo {
  cca2: string
  city: string
  country: string
  lat: number
  lon: number
  name: string
  region: string
}

export async function getCloudflareColoInfo(coloCode: string): Promise<CloudflareColo | null> {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/Netrvin/cloudflare-colo-list/main/DC-Colos.json'
    )
    if (!response.ok) throw new Error('Cloudflare colo API yanıt vermedi')

    const data = await response.json()
    return data[coloCode] || null
  } catch (error) {
    console.error('Cloudflare colo bilgisi alınamadı:', error)
    return null
  }
}
