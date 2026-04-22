'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import Link from 'next/link'

const steps = [
  { icon: '👁️', label: 'Visita', desc: 'Explora lugares paranormales verificados' },
  { icon: '✅', label: 'Valida', desc: 'Documenta y valida tu experiencia' },
  { icon: '💎', label: 'Gana $NOCT', desc: 'Recibe tokens por tu exploración' },
]

const stats = [
  { value: '2,400', label: 'Exploradores' },
  { value: '12', label: 'Nodos Activos' },
  { value: '1.2M $NOCT', label: 'Distribuidos' },
]

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const, delay: i * 0.12 },
  }),
}

export function NoctisTeaser() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #0d0520, #1a0535)',
        borderTop: '1px solid rgba(147,51,234,0.3)',
        borderBottom: '1px solid rgba(147,51,234,0.3)',
        padding: '80px 1.5rem',
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
          textAlign: 'center',
        }}
      >
        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}
        >
          <span
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(168,85,247,0.7)',
              border: '1px solid rgba(147,51,234,0.3)',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
            }}
          >
            Nuevo Protocolo
          </span>
          <h2
            className="font-nidex"
            style={{
              color: '#a855f7',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              margin: 0,
              letterSpacing: '0.08em',
            }}
          >
            NOCTIS PROTOCOL
          </h2>
          <p
            style={{
              color: 'rgba(216,180,254,0.8)',
              fontSize: '1rem',
              margin: 0,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            MONETIZA TU MIEDO — El primer protocolo de turismo paranormal
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          custom={1}
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            width: '100%',
          }}
        >
          {steps.map(({ icon, label, desc }, i) => (
            <div
              key={label}
              style={{
                background: 'rgba(147,51,234,0.08)',
                border: '1px solid rgba(147,51,234,0.25)',
                borderRadius: '10px',
                padding: '1.75rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <span style={{ fontSize: '2rem' }}>{icon}</span>
              <span
                className="font-nidex"
                style={{ color: '#c084fc', fontSize: '1rem', letterSpacing: '0.05em' }}
              >
                {label}
              </span>
              <span style={{ color: 'rgba(216,180,254,0.6)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                {desc}
              </span>
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  style={{
                    display: 'none',
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={2}
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            width: '100%',
            background: 'rgba(147,51,234,0.06)',
            border: '1px solid rgba(147,51,234,0.2)',
            borderRadius: '10px',
            padding: '1.5rem',
          }}
        >
          {stats.map(({ value, label }) => (
            <div
              key={label}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center' }}
            >
              <span
                className="font-nidex"
                style={{ color: '#a855f7', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}
              >
                {value}
              </span>
              <span style={{ color: 'rgba(216,180,254,0.55)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          custom={3}
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <Link
            href="/noctis"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#7c3aed',
              color: 'white',
              padding: '0.875rem 2rem',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.95rem',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'background 0.2s ease, transform 0.15s ease',
              cursor: 'crosshair',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#6d28d9'
              e.currentTarget.style.transform = 'scale(1.03)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#7c3aed'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            💎 Unirme al Protocolo
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
