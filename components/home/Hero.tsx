'use client'

import { motion, type Variants } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { ParticleCanvas } from '@/components/ui/ParticleCanvas'
import { GlitchText } from '@/components/ui/GlitchText'
import { Button } from '@/components/ui/Button'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const, delay },
  }),
}

export function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--black)',
      }}
    >
      {/* Background image with overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(5,2,8,0.7) 0%, rgba(5,2,8,0.9) 100%)',
          zIndex: 1,
        }}
      />

      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        <ParticleCanvas />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 1.5rem',
          gap: '1.5rem',
          maxWidth: '900px',
          width: '100%',
        }}
      >
        {/* Logo icon */}
        <motion.div
          custom={0}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          style={{ animation: 'float 6s ease-in-out infinite' }}
        >
          <img
            src="/images/logo-icon.png"
            alt=""
            width={80}
            height={80}
            style={{ display: 'block' }}
          />
        </motion.div>

        {/* Glitch title */}
        <motion.div
          custom={0.15}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <GlitchText
            text="HABLEMOS DE TERROR"
            className="text-4xl md:text-7xl"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          custom={0.3}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          style={{
            fontStyle: 'italic',
            color: 'var(--fog)',
            fontSize: '1rem',
            maxWidth: '520px',
            lineHeight: 1.6,
          }}
        >
          Ten cuidado al entrar... porque tu alma nunca va a descansar.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.45}
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Button variant="primary" size="lg" href="/videos">
            Ver Últimos Episodios
          </Button>
          <Button variant="ghost" size="lg" href="/relatos#enviar">
            Comparte tu Relato
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.25rem',
          color: 'var(--fog)',
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ opacity: 0.7 }}
        >
          <ChevronDown size={24} />
        </motion.div>
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.5 }}>
          Desciende
        </span>
      </motion.div>
    </section>
  )
}
