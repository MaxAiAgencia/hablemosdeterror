'use client'

import { useState, useMemo } from 'react'
import { Play, Search, Clock, Calendar, Moon } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { usePlayerStore, type Episode } from '@/store/playerStore'

// ─── Types ────────────────────────────────────────────────────────────────────

type Categoria = 'aparicion' | 'brujeria' | 'criatura' | 'paranormal' | 'sueno' | 'objeto_maldito'

interface PodcastEpisode extends Episode {
  descripcion: string
  categoria: Categoria
  numero: number
  publicado_at: string
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const EPISODIOS: PodcastEpisode[] = [
  {
    id: 'ep-042',
    titulo: 'La Sombra del Pasillo',
    descripcion: 'Una familia en Guadalajara comienza a escuchar pasos nocturnos en su corredor, hasta que descubren que no están solos.',
    duracion_seg: 2847,
    imagen_url: '/images/ep-placeholder.jpg',
    audio_url: '',
    categoria: 'aparicion',
    numero: 42,
    publicado_at: '2026-04-10',
  },
  {
    id: 'ep-041',
    titulo: 'El Pacto de la Curandera',
    descripcion: 'En un pueblo de Oaxaca, una curandera lleva décadas haciendo el mismo ritual. Nadie sabe a quién se lo prometió.',
    duracion_seg: 3412,
    imagen_url: '/images/ep-placeholder.jpg',
    audio_url: '',
    categoria: 'brujeria',
    numero: 41,
    publicado_at: '2026-04-03',
  },
  {
    id: 'ep-040',
    titulo: 'Criatura del Lago Chapala',
    descripcion: 'Pescadores reportan avistamientos de algo enorme bajo la superficie del lago. Las fotografías no mienten.',
    duracion_seg: 2640,
    imagen_url: '/images/ep-placeholder.jpg',
    audio_url: '',
    categoria: 'criatura',
    numero: 40,
    publicado_at: '2026-03-27',
  },
  {
    id: 'ep-039',
    titulo: 'La Casa que Recuerda',
    descripcion: 'Una joven hereda la casa de su abuela y empieza a soñar con eventos que ocurrieron ahí hace 60 años.',
    duracion_seg: 3100,
    imagen_url: '/images/ep-placeholder.jpg',
    audio_url: '',
    categoria: 'paranormal',
    numero: 39,
    publicado_at: '2026-03-20',
  },
  {
    id: 'ep-038',
    titulo: 'El Sueño del Abismo',
    descripcion: 'Cada noche el mismo sueño: una puerta al fondo de un mar oscuro. Hasta que una noche la puerta se abre.',
    duracion_seg: 2220,
    imagen_url: '/images/ep-placeholder.jpg',
    audio_url: '',
    categoria: 'sueno',
    numero: 38,
    publicado_at: '2026-03-13',
  },
  {
    id: 'ep-037',
    titulo: 'El Espejo de los Ausentes',
    descripcion: 'Un anticuario compra un espejo en subasta. Desde esa noche, el reflejo no siempre lo muestra solo.',
    duracion_seg: 2990,
    imagen_url: '/images/ep-placeholder.jpg',
    audio_url: '',
    categoria: 'objeto_maldito',
    numero: 37,
    publicado_at: '2026-03-06',
  },
]

const NOCHE_DE_MIEDO_IDS = ['ep-042', 'ep-039', 'ep-037']

const CATEGORIA_LABELS: Record<Categoria, string> = {
  aparicion: 'Aparición',
  brujeria: 'Brujería',
  criatura: 'Criatura',
  paranormal: 'Paranormal',
  sueno: 'Sueño',
  objeto_maldito: 'Objeto Maldito',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDuracion(seg: number): string {
  const m = Math.floor(seg / 60)
  const s = seg % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function fechaRelativa(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Hoy'
  if (days === 1) return 'Ayer'
  if (days < 7) return `Hace ${days} días`
  if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`
  if (days < 365) return `Hace ${Math.floor(days / 30)} meses`
  return `Hace ${Math.floor(days / 365)} años`
}

// ─── EpisodeCard ──────────────────────────────────────────────────────────────

function EpisodeCard({ ep }: { ep: PodcastEpisode }) {
  const { play } = usePlayerStore()

  return (
    <div
      className="card-dark border-blood-subtle rounded-xl overflow-hidden flex flex-col"
      style={{ transition: 'transform 0.2s ease' }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {/* Image */}
      <div className="relative aspect-square w-full overflow-hidden">
        <img
          src={ep.imagen_url}
          alt={ep.titulo}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.5)' }}
          onError={e => {
            const t = e.currentTarget
            t.style.display = 'none'
            const parent = t.parentElement
            if (parent) parent.style.background = 'var(--dark)'
          }}
        />
        {/* Episode number */}
        <span
          className="absolute top-3 left-3 font-nidex text-sm px-2 py-0.5 rounded"
          style={{ background: 'rgba(5,2,8,0.85)', color: 'var(--gold)' }}
        >
          #{ep.numero}
        </span>
        {/* Category badge */}
        <span
          className="absolute bottom-3 left-3 text-xs font-bold uppercase tracking-widest px-2 py-1 rounded"
          style={{ background: 'var(--blood)', color: 'var(--parchment)' }}
        >
          {CATEGORIA_LABELS[ep.categoria]}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3
          className="font-nidex text-lg leading-tight"
          style={{ color: 'var(--parchment)' }}
        >
          {ep.titulo}
        </h3>
        <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--fog)' }}>
          {ep.descripcion}
        </p>

        <div className="flex items-center gap-4 mt-auto pt-2">
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted)' }}>
            <Clock size={12} />
            {formatDuracion(ep.duracion_seg ?? 0)}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted)' }}>
            <Calendar size={12} />
            {fechaRelativa(ep.publicado_at)}
          </span>
        </div>

        <button
          onClick={() => play(ep)}
          className="mt-3 flex items-center justify-center gap-2 w-full py-2 rounded-lg font-bold text-sm transition-all"
          style={{
            background: 'var(--blood)',
            color: 'var(--parchment)',
            border: '1px solid var(--crimson)',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--crimson)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--blood)')}
        >
          <Play size={14} fill="currentColor" />
          Escuchar
        </button>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PodcastPage() {
  const [busqueda, setBusqueda] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState<Categoria | ''>('')
  const { play, setQueue } = usePlayerStore()

  const episodiosFiltrados = useMemo(() => {
    return EPISODIOS.filter(ep => {
      const matchCategoria = !categoriaFiltro || ep.categoria === categoriaFiltro
      const matchBusqueda =
        !busqueda ||
        ep.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        ep.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      return matchCategoria && matchBusqueda
    })
  }, [busqueda, categoriaFiltro])

  const nocheEpisodios = EPISODIOS.filter(ep => NOCHE_DE_MIEDO_IDS.includes(ep.id))

  function iniciarPlaylist() {
    setQueue(nocheEpisodios)
    if (nocheEpisodios[0]) play(nocheEpisodios[0])
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--black)' }}>
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col gap-16">

        {/* Header */}
        <SectionHeader
          title="PODCAST"
          subtitle="Todas las historias de terror narradas por Efraín Sosa"
        />

        {/* Spreaker Embed */}
        <section className="w-full rounded-xl overflow-hidden border-blood-subtle">
          <iframe
            src="https://widget.spreaker.com/player?show_id=4269158&theme=dark&playlist=show&playlist-continuous=true&chapters-image=true"
            width="100%"
            height="400px"
            title="Hablemos de Terror"
            frameBorder="0"
            style={{ display: 'block' }}
          />
        </section>

        {/* Filters */}
        <section className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--muted)' }}
            />
            <input
              type="text"
              placeholder="Buscar episodio..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm outline-none"
              style={{
                background: 'var(--dark)',
                border: '1px solid rgba(139,0,0,0.3)',
                color: 'var(--parchment)',
              }}
            />
          </div>

          {/* Category select */}
          <select
            value={categoriaFiltro}
            onChange={e => setCategoriaFiltro(e.target.value as Categoria | '')}
            className="px-4 py-2.5 rounded-lg text-sm outline-none"
            style={{
              background: 'var(--dark)',
              border: '1px solid rgba(139,0,0,0.3)',
              color: 'var(--parchment)',
              minWidth: '180px',
            }}
          >
            <option value="">Todas las categorías</option>
            {(Object.keys(CATEGORIA_LABELS) as Categoria[]).map(cat => (
              <option key={cat} value={cat}>
                {CATEGORIA_LABELS[cat]}
              </option>
            ))}
          </select>
        </section>

        {/* Episodes Grid */}
        <section>
          {episodiosFiltrados.length === 0 ? (
            <p className="text-center py-16" style={{ color: 'var(--muted)' }}>
              No se encontraron episodios con esos filtros.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {episodiosFiltrados.map(ep => (
                <EpisodeCard key={ep.id} ep={ep} />
              ))}
            </div>
          )}
        </section>

        {/* Noche de Miedo */}
        <section
          className="rounded-2xl p-8 flex flex-col gap-6"
          style={{ background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.2)' }}
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-nidex text-3xl md:text-4xl" style={{ color: 'var(--gold)' }}>
              🌙 NOCHE DE MIEDO
            </h2>
            <p style={{ color: 'var(--fog)' }}>
              La playlist curada para escuchar en la oscuridad
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {nocheEpisodios.map((ep, i) => (
              <li
                key={ep.id}
                className="flex items-center gap-4 p-3 rounded-lg"
                style={{ background: 'rgba(5,2,8,0.5)' }}
              >
                <span className="font-nidex text-xl w-8 text-center" style={{ color: 'var(--gold)' }}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate" style={{ color: 'var(--parchment)' }}>
                    {ep.titulo}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>
                    {formatDuracion(ep.duracion_seg ?? 0)} · {CATEGORIA_LABELS[ep.categoria]}
                  </p>
                </div>
                <Moon size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              </li>
            ))}
          </ul>

          <button
            onClick={iniciarPlaylist}
            className="self-start flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all"
            style={{
              background: 'var(--gold)',
              color: 'var(--black)',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <Play size={16} fill="currentColor" />
            Iniciar Playlist
          </button>
        </section>

      </div>
    </main>
  )
}
