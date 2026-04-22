'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { X, Play } from 'lucide-react'

const video = {
  id: 'dQw4w9WgXcQ',
  title: 'El Fantasma del Panteón Municipal',
  views: '245K',
  duration: '28:14',
  date: 'Hace 3 días',
}

export function LatestVideo() {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openModal = () => {
    dialogRef.current?.showModal()
  }

  const closeModal = () => {
    dialogRef.current?.close()
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`

  return (
    <section
      style={{
        backgroundColor: 'var(--dark)',
        padding: '80px 1.5rem',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '1.5rem' }}
        >
          <span
            style={{
              color: 'var(--crimson)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 700,
              border: '1px solid rgba(192,20,42,0.35)',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
            }}
          >
            Último Video
          </span>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card-dark"
          style={{ overflow: 'hidden' }}
        >
          {/* Thumbnail */}
          <div
            style={{
              position: 'relative',
              aspectRatio: '16/9',
              overflow: 'hidden',
              cursor: 'crosshair',
            }}
            onClick={openModal}
            role="button"
            tabIndex={0}
            aria-label={`Ver: ${video.title}`}
            onKeyDown={(e) => e.key === 'Enter' && openModal()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailUrl}
              alt={video.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.4s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            />

            {/* Dark gradient overlay */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(5,2,8,0.75) 0%, rgba(5,2,8,0.1) 60%)',
                pointerEvents: 'none',
              }}
            />

            {/* Play button */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'rgba(139,0,0,0.85)',
                  border: '2px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                  transition: 'transform 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'
                  e.currentTarget.style.background = 'rgba(192,20,42,0.9)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.background = 'rgba(139,0,0,0.85)'
                }}
              >
                <Play size={26} fill="white" color="white" style={{ marginLeft: '3px' }} />
              </div>
            </div>

            {/* Duration badge */}
            <span
              style={{
                position: 'absolute',
                bottom: '0.75rem',
                right: '0.75rem',
                background: 'rgba(5,2,8,0.85)',
                color: 'var(--parchment)',
                fontSize: '0.78rem',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              {video.duration}
            </span>
          </div>

          {/* Info */}
          <div style={{ padding: '1.5rem' }}>
            <h3
              style={{
                color: 'var(--parchment)',
                fontSize: '1.2rem',
                fontWeight: 700,
                margin: '0 0 0.75rem 0',
                lineHeight: 1.3,
              }}
            >
              {video.title}
            </h3>
            <div
              style={{
                display: 'flex',
                gap: '1.25rem',
                color: 'var(--fog)',
                fontSize: '0.82rem',
                marginBottom: '1.25rem',
              }}
            >
              <span>{video.views} vistas</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{video.date}</span>
            </div>
            <button
              onClick={openModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'var(--blood)',
                color: 'var(--parchment)',
                border: 'none',
                padding: '0.65rem 1.4rem',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'crosshair',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--crimson)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--blood)' }}
            >
              ▶ Ver Ahora
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <dialog
        ref={dialogRef}
        style={{
          background: 'rgba(5,2,8,0.97)',
          border: '1px solid rgba(139,0,0,0.3)',
          borderRadius: '10px',
          padding: 0,
          maxWidth: '900px',
          width: 'calc(100vw - 2rem)',
          overflow: 'hidden',
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeModal()
        }}
      >
        <style>{`
          dialog::backdrop {
            background: rgba(5,2,8,0.85);
            backdrop-filter: blur(4px);
          }
        `}</style>

        {/* Modal header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            borderBottom: '1px solid rgba(139,0,0,0.2)',
          }}
        >
          <span
            style={{
              color: 'var(--fog)',
              fontSize: '0.85rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
              marginRight: '1rem',
            }}
          >
            {video.title}
          </span>
          <button
            onClick={closeModal}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--fog)',
              cursor: 'crosshair',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
            aria-label="Cerrar video"
          >
            <X size={20} />
          </button>
        </div>

        {/* iframe */}
        <div style={{ aspectRatio: '16/9', width: '100%' }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
            }}
          />
        </div>
      </dialog>
    </section>
  )
}
