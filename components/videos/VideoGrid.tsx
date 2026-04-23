'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Eye, Clock, X, Calendar } from 'lucide-react'
import type { YoutubeVideo } from '@/app/videos/page'

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toString()
}

function fechaRelativa(iso: string): string {
  if (!iso) return ''
  try {
    const diff = Date.now() - new Date(iso).getTime()
    const days = Math.floor(diff / 86400000)
    if (days === 0) return 'Hoy'
    if (days < 7) return `Hace ${days} días`
    if (days < 30) return `Hace ${Math.floor(days / 7)} sem.`
    if (days < 365) return `Hace ${Math.floor(days / 30)} meses`
    return `Hace ${Math.floor(days / 365)} años`
  } catch {
    return ''
  }
}

function VideoModal({ video, onClose }: { video: YoutubeVideo; onClose: () => void }) {
  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5,2,8,0.92)', backdropFilter: 'blur(4px)' }}
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-4xl rounded-xl overflow-hidden"
        style={{
          background: 'var(--dark)',
          border: '1px solid rgba(139,0,0,0.4)',
          boxShadow: '0 0 80px rgba(139,0,0,0.3)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: '1px solid rgba(139,0,0,0.2)' }}
        >
          <span className="font-bold text-sm line-clamp-1" style={{ color: 'var(--parchment)' }}>
            {video.title}
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg transition-colors"
            style={{ color: 'var(--fog)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--parchment)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--fog)')}
          >
            <X size={20} />
          </button>
        </div>

        {/* YouTube embed — no autoplay */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=0&rel=0`}
            title={video.title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}

function VideoCard({ video, index }: { video: YoutubeVideo; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
        className="card-dark border-blood-subtle rounded-xl overflow-hidden flex flex-col"
        style={{ cursor: 'crosshair', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
        onMouseEnter={() => {
          setHovered(true)
        }}
        onMouseLeave={() => {
          setHovered(false)
        }}
        onClick={() => setOpen(true)}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to top, rgba(5,2,8,0.9) 0%, rgba(5,2,8,0.2) 60%, transparent 100%)',
              opacity: hovered ? 1 : 0.6,
            }}
          />
          {/* Play button */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'scale(1)' : 'scale(0.8)',
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(139,0,0,0.9)', border: '2px solid var(--crimson)' }}
            >
              <Play size={24} fill="white" style={{ color: 'white', marginLeft: '3px' }} />
            </div>
          </div>
          {/* Duration badge (if available) */}
          {video.duration && (
            <span
              className="absolute bottom-2 right-2 text-xs font-bold px-1.5 py-0.5 rounded"
              style={{ background: 'rgba(5,2,8,0.9)', color: 'var(--parchment)' }}
            >
              {video.duration}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-1.5 flex-1">
          <h3
            className="font-bold text-sm leading-snug line-clamp-2"
            style={{ color: 'var(--parchment)' }}
          >
            {video.title}
          </h3>
          <div className="flex items-center gap-3 mt-auto pt-1 flex-wrap">
            {typeof video.views === 'number' && (
              <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted)' }}>
                <Eye size={11} />
                {formatViews(video.views)}
              </span>
            )}
            {video.duration && (
              <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted)' }}>
                <Clock size={11} />
                {video.duration}
              </span>
            )}
            {video.date && (
              <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted)' }}>
                <Calendar size={11} />
                {fechaRelativa(video.date)}
              </span>
            )}
          </div>
        </div>
      </motion.article>

      {open && <VideoModal video={video} onClose={() => setOpen(false)} />}
    </>
  )
}

export function VideoGrid({ videos }: { videos: YoutubeVideo[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {videos.map((v, i) => (
        <VideoCard key={v.id} video={v} index={i} />
      ))}
    </div>
  )
}
