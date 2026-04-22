import { SectionHeader } from '@/components/ui/SectionHeader'
import { VideoGrid } from '@/components/videos/VideoGrid'
import { ExternalLink } from 'lucide-react'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const YT_IDS = ['dQw4w9WgXcQ', 'jNQXAC9IVRw', 'M7lc1UVf-VE', '9bZkp7q19f0']

const VIDEOS = [
  {
    id: 'v-01',
    title: 'Los 5 Casos Paranormales Más Aterradores de México',
    thumbnail: `https://img.youtube.com/vi/${YT_IDS[0]}/mqdefault.jpg`,
    views: 342000,
    duration: '18:42',
    date: '2026-04-01',
    youtubeId: YT_IDS[0],
  },
  {
    id: 'v-02',
    title: 'Rituales de Brujería que Nunca Debes Intentar',
    thumbnail: `https://img.youtube.com/vi/${YT_IDS[1]}/mqdefault.jpg`,
    views: 215000,
    duration: '22:15',
    date: '2026-03-25',
    youtubeId: YT_IDS[1],
  },
  {
    id: 'v-03',
    title: 'La Historia Real Detrás de La Llorona',
    thumbnail: `https://img.youtube.com/vi/${YT_IDS[2]}/mqdefault.jpg`,
    views: 589000,
    duration: '31:07',
    date: '2026-03-18',
    youtubeId: YT_IDS[2],
  },
  {
    id: 'v-04',
    title: 'Criaturas del Bosque: Testimonios sin Explicación',
    thumbnail: `https://img.youtube.com/vi/${YT_IDS[3]}/mqdefault.jpg`,
    views: 178000,
    duration: '25:33',
    date: '2026-03-10',
    youtubeId: YT_IDS[3],
  },
  {
    id: 'v-05',
    title: 'Casa Encantada: Pasé la Noche en el Lugar Más Aterrador',
    thumbnail: `https://img.youtube.com/vi/${YT_IDS[0]}/mqdefault.jpg`,
    views: 423000,
    duration: '41:20',
    date: '2026-03-03',
    youtubeId: YT_IDS[0],
  },
  {
    id: 'v-06',
    title: 'El Cuarto de los Espejos: Historia Completa',
    thumbnail: `https://img.youtube.com/vi/${YT_IDS[1]}/mqdefault.jpg`,
    views: 130000,
    duration: '19:58',
    date: '2026-02-24',
    youtubeId: YT_IDS[1],
  },
  {
    id: 'v-07',
    title: 'Objetos Malditos que Siguen Activos en México',
    thumbnail: `https://img.youtube.com/vi/${YT_IDS[2]}/mqdefault.jpg`,
    views: 267000,
    duration: '28:14',
    date: '2026-02-17',
    youtubeId: YT_IDS[2],
  },
  {
    id: 'v-08',
    title: 'Entrevista con un Cazador de Fantasmas Profesional',
    thumbnail: `https://img.youtube.com/vi/${YT_IDS[3]}/mqdefault.jpg`,
    views: 198000,
    duration: '37:45',
    date: '2026-02-10',
    youtubeId: YT_IDS[3],
  },
  {
    id: 'v-09',
    title: 'Los Sueños Lúcidos y la Brecha al Otro Mundo',
    thumbnail: `https://img.youtube.com/vi/${YT_IDS[0]}/mqdefault.jpg`,
    views: 312000,
    duration: '23:02',
    date: '2026-02-03',
    youtubeId: YT_IDS[0],
  },
  {
    id: 'v-10',
    title: 'Noche de Relatos: Escucha con las Luces Apagadas',
    thumbnail: `https://img.youtube.com/vi/${YT_IDS[1]}/mqdefault.jpg`,
    views: 445000,
    duration: '55:30',
    date: '2026-01-27',
    youtubeId: YT_IDS[1],
  },
  {
    id: 'v-11',
    title: 'La Verdad sobre los Duendes en Latinoamérica',
    thumbnail: `https://img.youtube.com/vi/${YT_IDS[2]}/mqdefault.jpg`,
    views: 144000,
    duration: '17:49',
    date: '2026-01-20',
    youtubeId: YT_IDS[2],
  },
  {
    id: 'v-12',
    title: 'Psicología del Miedo: ¿Por Qué Nos Aterroriza el Horror?',
    thumbnail: `https://img.youtube.com/vi/${YT_IDS[3]}/mqdefault.jpg`,
    views: 89000,
    duration: '26:11',
    date: '2026-01-13',
    youtubeId: YT_IDS[3],
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VideosPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--black)' }}>
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col gap-12">

        <SectionHeader
          title="VIDEOS"
          subtitle="Documentales, relatos y análisis del terror en español"
        />

        <VideoGrid videos={VIDEOS} />

        <p className="text-center text-sm" style={{ color: 'var(--fog)' }}>
          ¿Quieres ver más?{' '}
          <a
            href="https://youtube.com/@hablemosdeterror"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold transition-colors"
            style={{ color: 'var(--crimson)' }}
          >
            Visita el canal de YouTube
            <ExternalLink size={13} />
          </a>
        </p>

      </div>
    </main>
  )
}
