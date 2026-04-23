import { SectionHeader } from '@/components/ui/SectionHeader'
import { SpreakerEmbed } from './SpreakerEmbed'

// ─── Types ────────────────────────────────────────────────────────────────────

interface RssEpisode {
  title: string
  pubDate: string
  duration: string
  audioUrl: string
  imageUrl: string
  description: string
  link: string
}

// ─── RSS Fetch & Parse ────────────────────────────────────────────────────────

async function fetchLatestEpisodes(): Promise<RssEpisode[]> {
  try {
    const res = await fetch('https://www.spreaker.com/show/4269158/episodes/feed', {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const xml = await res.text()

    // Extract items
    const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g)
    if (!itemMatches) return []

    const episodes: RssEpisode[] = []

    for (const item of itemMatches.slice(0, 8)) {
      const title = extractTag(item, 'title')
      const pubDate = extractTag(item, 'pubDate')
      const duration = extractTag(item, 'itunes:duration')
      const link = extractTag(item, 'link')
      const description = stripHtml(extractTag(item, 'description'))

      // enclosure url
      const enclosureMatch = item.match(/<enclosure[^>]+url="([^"]+)"/)
      const audioUrl = enclosureMatch ? enclosureMatch[1] : ''

      // itunes:image href
      const itunesImageMatch = item.match(/<itunes:image[^>]+href="([^"]+)"/)
      let imageUrl = itunesImageMatch ? itunesImageMatch[1] : ''

      // fallback: <image> block
      if (!imageUrl) {
        const imageBlockMatch = item.match(/<image>[\s\S]*?<url>([\s\S]*?)<\/url>/)
        if (imageBlockMatch) imageUrl = imageBlockMatch[1].trim()
      }

      if (title) {
        episodes.push({ title, pubDate, duration, audioUrl, imageUrl, description, link })
      }
    }

    return episodes
  } catch {
    return []
  }
}

function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`)
  const cdataMatch = xml.match(regex)
  if (cdataMatch) return cdataMatch[1].trim()

  const plainRegex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`)
  const plainMatch = xml.match(plainRegex)
  return plainMatch ? plainMatch[1].trim() : ''
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').trim()
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function formatDuration(duration: string): string {
  if (!duration) return ''
  // duration may be "HH:MM:SS" or "MM:SS" or raw seconds
  if (/^\d+$/.test(duration)) {
    const secs = parseInt(duration)
    const h = Math.floor(secs / 3600)
    const m = Math.floor((secs % 3600) / 60)
    const s = secs % 60
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    return `${m}:${s.toString().padStart(2, '0')}`
  }
  return duration
}

// ─── EpisodeCard (server) ─────────────────────────────────────────────────────

function EpisodeCard({ ep, index, total }: { ep: RssEpisode; index: number; total: number }) {
  const epNumber = total - index

  return (
    <div
      className="card-dark border-blood-subtle rounded-xl overflow-hidden flex flex-col"
    >
      {/* Image */}
      {ep.imageUrl ? (
        <div className="relative w-full" style={{ aspectRatio: '1 / 1', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ep.imageUrl}
            alt={ep.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.6)' }}
          />
          <span
            className="absolute top-3 left-3 font-nidex text-sm px-2 py-0.5 rounded"
            style={{ background: 'rgba(5,2,8,0.85)', color: 'var(--gold)' }}
          >
            #{epNumber}
          </span>
        </div>
      ) : (
        <div
          className="relative w-full flex items-center justify-center"
          style={{ aspectRatio: '1 / 1', background: 'var(--dark)' }}
        >
          <span className="font-nidex text-4xl" style={{ color: 'var(--blood)' }}>#{epNumber}</span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3
          className="font-nidex text-lg leading-tight"
          style={{ color: 'var(--parchment)' }}
        >
          {ep.title}
        </h3>

        {ep.description && (
          <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--fog)' }}>
            {ep.description}
          </p>
        )}

        <div className="flex items-center gap-4 mt-auto pt-2 flex-wrap">
          {ep.duration && (
            <span className="text-xs" style={{ color: 'var(--muted)' }}>
              {formatDuration(ep.duration)}
            </span>
          )}
          {ep.pubDate && (
            <span className="text-xs" style={{ color: 'var(--muted)' }}>
              {formatDate(ep.pubDate)}
            </span>
          )}
        </div>

        {ep.link && (
          <a
            href={ep.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 w-full py-2 rounded-lg font-bold text-sm transition-all"
            style={{
              background: 'var(--blood)',
              color: 'var(--parchment)',
              border: '1px solid var(--crimson)',
              textDecoration: 'none',
            }}
          >
            ▶ Escuchar
          </a>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PodcastPage() {
  const episodes = await fetchLatestEpisodes()

  return (
    <main className="min-h-screen" style={{ background: 'var(--black)' }}>
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col gap-16">

        {/* Header */}
        <SectionHeader
          title="PODCAST"
          subtitle="Todas las historias de terror narradas por Efraín Sosa"
        />

        {/* Spreaker Embed (client component) */}
        <SpreakerEmbed />

        {/* Latest Episodes from RSS */}
        {episodes.length > 0 && (
          <section className="flex flex-col gap-8">
            <h2 className="font-nidex text-2xl md:text-3xl" style={{ color: 'var(--parchment)' }}>
              ÚLTIMOS EPISODIOS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {episodes.map((ep, i) => (
                <EpisodeCard key={ep.audioUrl || ep.title} ep={ep} index={i} total={episodes.length} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  )
}
