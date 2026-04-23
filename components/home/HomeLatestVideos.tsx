import { VideoGrid } from '@/components/videos/VideoGrid'
import type { YoutubeVideo } from '@/app/videos/page'
import Link from 'next/link'

// ─── RSS Fetch (same logic as /videos page) ───────────────────────────────────

async function fetchLatestVideos(): Promise<YoutubeVideo[]> {
  const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID
  if (!channelId || channelId.startsWith('UCx')) return []

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const xml = await res.text()

    const entries = xml.match(/<entry>([\s\S]*?)<\/entry>/g)
    if (!entries) return []

    const videos: YoutubeVideo[] = []
    for (const entry of entries.slice(0, 8)) {
      const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)
      const youtubeId = videoIdMatch ? videoIdMatch[1].trim() : ''

      const titleMatch = entry.match(/<title>([^<]+)<\/title>/)
      const title = titleMatch ? decodeXML(titleMatch[1].trim()) : ''

      const dateMatch = entry.match(/<published>([^<]+)<\/published>/)
      const date = dateMatch ? dateMatch[1].trim() : ''

      const thumbMatch = entry.match(/media:thumbnail[^>]+url="([^"]+)"/)
      const thumbnail = thumbMatch
        ? thumbMatch[1]
        : `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`

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

// ─── Component ────────────────────────────────────────────────────────────────

export async function HomeLatestVideos() {
  const videos = await fetchLatestVideos()
  if (videos.length === 0) return null

  return (
    <section style={{ backgroundColor: 'var(--dark)', padding: '80px 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ color: 'var(--blood)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              YouTube
            </p>
            <h2
              className="font-nidex"
              style={{ color: 'var(--parchment)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', margin: 0, letterSpacing: '0.04em' }}
            >
              ÚLTIMOS VIDEOS
            </h2>
          </div>
          <Link
            href="/videos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--fog)',
              fontSize: '0.85rem',
              textDecoration: 'none',
              border: '1px solid rgba(139,0,0,0.3)',
              borderRadius: '6px',
              padding: '0.5rem 1rem',
              transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            Ver todos los videos →
          </Link>
        </div>

        {/* Grid */}
        <VideoGrid videos={videos} />
      </div>
    </section>
  )
}
