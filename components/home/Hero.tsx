'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Mic, BookOpen, PenLine } from 'lucide-react'
import { ParticleCanvas } from '@/components/ui/ParticleCanvas'

export function Hero() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'var(--black)',
      }}
    >
      {/* Background image */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: isMobile ? 'right top' : 'center top',
          zIndex: 0,
        }}
      />

      {/* Gradient overlays */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, rgba(5,2,8,0.92) 0%, rgba(5,2,8,0.5) 60%, rgba(5,2,8,0.15) 100%)',
      }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(5,2,8,1) 0%, rgba(5,2,8,0.6) 30%, transparent 70%)',
      }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(5,2,8,0.7) 0%, transparent 20%)',
      }} />

      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        <ParticleCanvas />
      </div>

      {/* Content — bottom left, movie poster style */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          padding: 'clamp(2rem, 5vw, 5rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
          maxWidth: '700px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        {/* Logo icon small */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <img
            src="/images/logo-icon.png"
            alt=""
            width={48}
            height={48}
            style={{ display: 'block' }}
          />
          <span style={{
            fontFamily: 'Nidex, Impact, Arial Black, sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            color: 'var(--blood)',
            textTransform: 'uppercase',
          }}>
            El Podcast de Terror en Español
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            fontFamily: 'Nidex, Impact, Arial Black, sans-serif',
            fontSize: 'clamp(2.8rem, 9vw, 7rem)',
            lineHeight: 0.95,
            color: '#ffffff',
            letterSpacing: '-0.01em',
            textShadow: '0 2px 40px rgba(0,0,0,0.8)',
            margin: 0,
          }}
        >
          HABLEMOS<br />
          <span style={{ color: 'var(--blood)' }}>DE TERROR</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            color: 'var(--fog)',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            lineHeight: 1.6,
            maxWidth: '480px',
            margin: 0,
          }}
        >
          Ten cuidado al entrar... porque tu alma nunca va a descansar.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}
        >
          <a
            href="/videos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--blood)',
              color: '#fff',
              fontFamily: 'Nidex, Impact, Arial Black, sans-serif',
              fontSize: '0.9rem',
              letterSpacing: '0.08em',
              padding: '0.8rem 1.75rem',
              borderRadius: '4px',
              textDecoration: 'none',
              cursor: 'crosshair',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--crimson)')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--blood)')}
          >
            ▶ Ver Últimos Episodios
          </a>
          <a
            href="/testimonios#enviar"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'transparent',
              color: 'var(--gold)',
              fontFamily: 'Nidex, Impact, Arial Black, sans-serif',
              fontSize: '0.9rem',
              letterSpacing: '0.08em',
              padding: '0.8rem 1.75rem',
              borderRadius: '4px',
              border: '1px solid var(--gold)',
              textDecoration: 'none',
              cursor: 'crosshair',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(201,168,76,0.1)')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            ✍ Enviar mi Historia
          </a>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ display: 'flex', gap: '2rem', paddingTop: '0.25rem' }}
        >
          {[
            { n: '191K+', l: 'Suscriptores' },
            { n: '200+', l: 'Episodios' },
            { n: '5K+', l: 'Relatos' },
          ].map(({ n, l }) => (
            <div key={l}>
              <div style={{
                fontFamily: 'Nidex, Impact, Arial Black, sans-serif',
                fontSize: '1.4rem',
                color: '#fff',
                lineHeight: 1,
              }}>{n}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Quick actions strip at the bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          borderTop: '1px solid rgba(139,0,0,0.3)',
          backgroundColor: 'rgba(5,2,8,0.85)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {[
          { icon: Mic, label: 'Podcast', href: '/podcast' },
          { icon: BookOpen, label: 'Testimonios', href: '/testimonios' },
          { icon: PenLine, label: 'Enviar Historia', href: '/testimonios#enviar' },
        ].map(({ icon: Icon, label, href }, i) => (
          <a
            key={label}
            href={href}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1rem',
              color: 'var(--fog)',
              textDecoration: 'none',
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              fontFamily: 'Nidex, Impact, Arial Black, sans-serif',
              borderRight: i < 2 ? '1px solid rgba(139,0,0,0.2)' : 'none',
              transition: 'color 0.2s, background-color 0.2s',
              cursor: 'crosshair',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.backgroundColor = 'rgba(139,0,0,0.15)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = 'var(--fog)'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <Icon size={16} />
            {label}
          </a>
        ))}
      </motion.div>
    </section>
  )
}
