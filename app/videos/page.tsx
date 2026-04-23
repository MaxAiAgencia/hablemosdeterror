import { SectionHeader } from '@/components/ui/SectionHeader'
import { VideoGrid } from '@/components/videos/VideoGrid'
import { ExternalLink } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface YoutubeVideo {
  id: string
  youtubeId: string
  title: string
  thumbnail: string
  date: string
  views?: number
  duration?: string
}

// ─── YouTube RSS Fetch ────────────────────────────────────────────────────────

async function fetchLatestVideos(): Promise<YoutubeVideo[]> {
  const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID
  if (!channelId || channelId.startsWith('UC' + 'x')) return []

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const xml = await res.text()

    // Each video is wrapped in <entry> tags
    const entries = xml.match(/<entry>([\s\S]*?)<\/entry>/g)
    if (!entries) return []

    const videos: YoutubeVideo[] = []

    for (const entry of entries.slice(0, 8)) {
      // Video ID: <yt:videoId>XXXXX</yt:videoId>
      const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)
      const youtubeId = videoIdMatch ? videoIdMatch[1].trim() : ''

      // Title: <title>...</title>
      const titleMatch = entry.match(/<title>([^<]+)<\/title>/)
      const title = titleMatch ? decodeXML(titleMatch[1].trim()) : ''

      // Published date
      const dateMatch = entry.match(/<published>([^<]+)<\/published>/)
      const date = dateMatch ? dateMatch[1].trim() : ''

      // Thumbnail from media:thumbnail
      const thumbMatch = entry.match(/media:thumbnail[^>]+url="([^"]+)"/)
      const thumbnail = thumbMatch
        ? thumbMatch[1]
        : `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`

      // View count from media:statistics
      const viewsMatch = entry.match(/media:statistics[^>]+views="([^"]+)"/)
      const views = viewsMatch ? parseInt(viewsMatch[1]) : undefined

      if (youtubeId && title) {
        videos.push({ id: youtubeId, youtubeId, title, thumbnail, date, views })
      }
    }

    return videos
  } catch {
    return []
  }
}

function decodeXML(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function VideosPage() {
  const videos = await fetchLatestVideos()
  const channelUrl = 'https://www.youtube.com/channel/UCr67JlLCGuSZmglP_1e2oQQ'

  return (
    <main className="min-h-screen" style={{ background: 'var(--black)' }}>
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col gap-12">

        <SectionHeader
          title="VIDEOS"
          subtitle="Documentales, relatos y análisis del terror en español"
        />

        {videos.length > 0 ? (
          <VideoGrid videos={videos} />
        ) : (
          /* Fallback if channel ID not set or feed unavailable */
          <div
            className="flex flex-col items-center gap-6 py-16 rounded-xl"
            style={{ background: 'var(--dark)', border: '1px solid rgba(139,0,0,0.25)' }}
          >
            <p className="text-lg font-bold" style={{ color: 'var(--parchment)' }}>
              Ver los últimos episodios en YouTube
            </p>
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all"
              style={{
                background: 'var(--blood)',
                color: 'var(--parchment)',
                textDecoration: 'none',
              }}
            >
              Ir al Canal
              <ExternalLink size={16} />
            </a>
          </div>
        )}

        <p className="text-center text-sm" style={{ color: 'var(--fog)' }}>
          ¿Quieres ver más?{' '}
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold transition-colors"
            style={{ color: 'var(--crimson)', textDecoration: 'none' }}
          >
            Visita el canal de YouTube
            <ExternalLink size={13} />
          </a>
        </p>

      </div>
    </main>
  )
}
