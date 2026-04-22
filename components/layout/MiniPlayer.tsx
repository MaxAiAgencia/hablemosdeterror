'use client'

import { usePlayerStore } from '@/store/playerStore'
import { Mic, SkipBack, Play, Pause, SkipForward, Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function MiniPlayer() {
  const episode = usePlayerStore((s) => s.episode)
  const isPlaying = usePlayerStore((s) => s.isPlaying)
  const currentTime = usePlayerStore((s) => s.currentTime)
  const volume = usePlayerStore((s) => s.volume)
  const toggle = usePlayerStore((s) => s.toggle)
  const next = usePlayerStore((s) => s.next)
  const prev = usePlayerStore((s) => s.prev)
  const setCurrentTime = usePlayerStore((s) => s.setCurrentTime)
  const setVolume = usePlayerStore((s) => s.setVolume)

  if (!episode) return null

  const duration = episode.duracion_seg ?? 0
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex flex-col"
      style={{
        height: 72,
        backgroundColor: 'var(--deep)',
        borderTop: '1px solid rgba(139, 0, 0, 0.35)',
      }}
    >
      {/* Progress bar */}
      <div className="relative w-full h-[3px]" style={{ backgroundColor: 'rgba(139,0,0,0.18)' }}>
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          step={1}
          onChange={(e) => setCurrentTime(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ cursor: 'crosshair' }}
          aria-label="Progreso del episodio"
        />
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            backgroundColor: 'var(--blood)',
          }}
        />
      </div>

      {/* Main row */}
      <div className="flex items-center gap-3 px-4 md:px-6 flex-1">
        {/* Episode image / fallback icon */}
        <div
          className="flex-shrink-0 flex items-center justify-center rounded overflow-hidden"
          style={{
            width: 42,
            height: 42,
            backgroundColor: 'rgba(139,0,0,0.15)',
            border: '1px solid rgba(139,0,0,0.25)',
          }}
        >
          {episode.imagen_url ? (
            <img
              src={episode.imagen_url}
              alt={episode.titulo}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Mic size={18} style={{ color: 'var(--blood)' }} />
          )}
        </div>

        {/* Episode title */}
        <div className="flex-1 min-w-0 hidden sm:block">
          <p
            className="text-sm font-semibold truncate leading-tight"
            style={{ color: 'var(--parchment)' }}
          >
            {episode.titulo}
          </p>
          {episode.numero && (
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              Ep. {episode.numero}
            </p>
          )}
        </div>

        {/* Time */}
        <span
          className="text-xs tabular-nums flex-shrink-0 hidden md:block"
          style={{ color: 'var(--fog)' }}
        >
          {formatTime(currentTime)}
          {duration > 0 && <> / {formatTime(duration)}</>}
        </span>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={prev}
            aria-label="Anterior"
            className="flex items-center justify-center w-8 h-8 rounded-full transition-opacity hover:opacity-70"
            style={{ color: 'var(--fog)', cursor: 'crosshair' }}
          >
            <SkipBack size={17} />
          </button>

          <button
            onClick={toggle}
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 transition-opacity hover:opacity-80"
            style={{
              backgroundColor: 'var(--blood)',
              color: 'var(--parchment)',
              cursor: 'crosshair',
            }}
          >
            {isPlaying ? <Pause size={17} /> : <Play size={17} />}
          </button>

          <button
            onClick={next}
            aria-label="Siguiente"
            className="flex items-center justify-center w-8 h-8 rounded-full transition-opacity hover:opacity-70"
            style={{ color: 'var(--fog)', cursor: 'crosshair' }}
          >
            <SkipForward size={17} />
          </button>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <Volume2 size={15} style={{ color: 'var(--muted)' }} />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volumen"
            className="w-20"
            style={{ cursor: 'crosshair', accentColor: 'var(--blood)' }}
          />
        </div>
      </div>
    </div>
  )
}
