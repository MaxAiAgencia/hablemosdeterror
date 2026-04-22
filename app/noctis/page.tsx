'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Loader2, CheckCircle2, MapPin, Cpu, Gift } from 'lucide-react'

// ─── Tokenomics data ──────────────────────────────────────────────────────────

const TOKENOMICS = [
  { label: 'Comunidad', pct: 40, color: '#a855f7' },
  { label: 'Desarrollo', pct: 20, color: '#7c3aed' },
  { label: 'Equipo', pct: 15, color: '#6d28d9' },
  { label: 'Tour Partners', pct: 15, color: '#5b21b6' },
  { label: 'Marketing', pct: 10, color: '#4c1d95' },
]

// ─── Float animation ──────────────────────────────────────────────────────────

const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-12, 12, -12],
    transition: { duration: 4, repeat: Infinity, ease: [0.45, 0, 0.55, 1] as const },
  },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NoctisPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tag: 'noctis' }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
      } else {
        throw new Error(data.message)
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #050208 0%, #0d0520 30%, #1a0535 60%, #050208 100%)',
      }}
    >

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 gap-8">
        {mounted && (
          <motion.div
            variants={floatVariants}
            initial="initial"
            animate="animate"
            className="flex items-center justify-center rounded-full w-32 h-32 font-nidex text-6xl select-none"
            style={{
              background: 'radial-gradient(circle at 40% 40%, #6d28d9, #1a0535)',
              border: '2px solid rgba(168,85,247,0.4)',
              boxShadow: '0 0 60px rgba(168,85,247,0.35), 0 0 120px rgba(168,85,247,0.15)',
              color: '#e9d5ff',
            }}
          >
            N
          </motion.div>
        )}

        <div className="flex flex-col gap-4 max-w-2xl">
          <h1
            className="font-nidex text-5xl md:text-7xl lg:text-8xl leading-none"
            style={{ color: '#a855f7' }}
          >
            NOCTIS
          </h1>
          <p
            className="font-nidex text-2xl md:text-3xl"
            style={{ color: '#e9d5ff', letterSpacing: '0.1em' }}
          >
            MONETIZA TU MIEDO
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: '#c4b5fd' }}>
            El protocolo que convierte la exploración de lugares de terror en recompensas reales.
            Documenta, valida y gana con cada aventura.
          </p>
        </div>

        <a
          href="#lista"
          className="px-8 py-3 rounded-full font-bold text-sm transition-all"
          style={{
            background: 'rgba(168,85,247,0.15)',
            border: '1px solid rgba(168,85,247,0.5)',
            color: '#a855f7',
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(168,85,247,0.25)'
            e.currentTarget.style.borderColor = '#a855f7'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(168,85,247,0.15)'
            e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)'
          }}
        >
          Unirme a la lista de espera ↓
        </a>
      </section>

      {/* ── 2. Qué es ────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-16 flex flex-col gap-10">
        <h2
          className="font-nidex text-3xl md:text-4xl text-center"
          style={{ color: '#e9d5ff' }}
        >
          ¿CÓMO FUNCIONA?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <MapPin size={32} style={{ color: '#a855f7' }} />,
              title: 'Explora',
              desc: 'Visita lugares con historia de terror: casas abandonadas, cementerios, ruinas. Documenta tu experiencia.',
            },
            {
              icon: <Cpu size={32} style={{ color: '#a855f7' }} />,
              title: 'Valida con NOCT',
              desc: 'El protocolo verifica tu visita a través de geolocalización y prueba de actividad. Sin trampa.',
            },
            {
              icon: <Gift size={32} style={{ color: '#a855f7' }} />,
              title: 'Gana recompensas',
              desc: 'Acumula $NOCT por cada exploración validada. Canjéalos por merch, experiencias exclusivas y más.',
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col gap-4 p-6 rounded-2xl"
              style={{
                background: 'rgba(109,40,217,0.1)',
                border: '1px solid rgba(168,85,247,0.2)',
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(109,40,217,0.2)' }}
              >
                {step.icon}
              </div>
              <h3 className="font-nidex text-xl" style={{ color: '#e9d5ff' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#c4b5fd' }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. Tokenomics ────────────────────────────────────────────────── */}
      <section
        className="max-w-5xl mx-auto px-4 py-16 flex flex-col gap-10"
        style={{ borderTop: '1px solid rgba(168,85,247,0.15)' }}
      >
        <h2
          className="font-nidex text-3xl md:text-4xl text-center"
          style={{ color: '#e9d5ff' }}
        >
          DISTRIBUCIÓN DE $NOCT
        </h2>

        <div className="flex flex-col gap-5 max-w-2xl mx-auto w-full">
          {TOKENOMICS.map((t, i) => (
            <div key={t.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: '#c4b5fd' }}>
                  {t.label}
                </span>
                <span className="text-sm font-bold" style={{ color: '#a855f7' }}>
                  {t.pct}%
                </span>
              </div>
              <div
                className="h-3 rounded-full overflow-hidden"
                style={{ background: 'rgba(109,40,217,0.2)' }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${t.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: t.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Stats ─────────────────────────────────────────────────────── */}
      <section
        className="max-w-5xl mx-auto px-4 py-16 flex flex-col gap-10"
        style={{ borderTop: '1px solid rgba(168,85,247,0.15)' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { value: '2,400', label: 'Exploradores' },
            { value: '12', label: 'Nodos Activos' },
            { value: '1.2M', label: '$NOCT Distribuidos' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col gap-2 p-6 rounded-2xl"
              style={{
                background: 'rgba(109,40,217,0.08)',
                border: '1px solid rgba(168,85,247,0.2)',
              }}
            >
              <span className="font-nidex text-4xl md:text-5xl" style={{ color: '#a855f7' }}>
                {stat.value}
              </span>
              <span className="text-sm uppercase tracking-widest font-bold" style={{ color: '#c4b5fd' }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 5. Lista de espera ───────────────────────────────────────────── */}
      <section
        id="lista"
        className="max-w-2xl mx-auto px-4 py-16 flex flex-col items-center gap-8 text-center"
        style={{ borderTop: '1px solid rgba(168,85,247,0.15)' }}
      >
        <h2 className="font-nidex text-3xl md:text-4xl" style={{ color: '#e9d5ff' }}>
          ÚNETE PRIMERO
        </h2>
        <p className="text-base leading-relaxed" style={{ color: '#c4b5fd' }}>
          Los primeros 500 en lista de espera recibirán un bono de 1,000 $NOCT al lanzamiento.
        </p>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 size={48} style={{ color: '#a855f7' }} />
            <p className="font-bold text-lg" style={{ color: '#e9d5ff' }}>
              Estás en la lista. Nos vemos en la oscuridad.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
              style={{
                background: 'rgba(109,40,217,0.15)',
                border: '1px solid rgba(168,85,247,0.3)',
                color: '#e9d5ff',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#a855f7')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)')}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap"
              style={{
                background: status === 'loading' ? 'rgba(109,40,217,0.3)' : '#7c3aed',
                color: '#f5f3ff',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={e => {
                if (status !== 'loading') e.currentTarget.style.background = '#6d28d9'
              }}
              onMouseLeave={e => {
                if (status !== 'loading') e.currentTarget.style.background = '#7c3aed'
              }}
            >
              {status === 'loading' && <Loader2 size={15} className="animate-spin" />}
              Quiero ser Noctis
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-sm" style={{ color: '#f87171' }}>
            Algo salió mal. Intenta de nuevo.
          </p>
        )}
      </section>

      {/* ── 6. CTA externo ───────────────────────────────────────────────── */}
      <section
        className="flex justify-center py-12 px-4"
        style={{ borderTop: '1px solid rgba(168,85,247,0.15)' }}
      >
        <a
          href="https://noctisprotocol.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-bold text-base transition-all"
          style={{ color: '#a855f7', textDecoration: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#c084fc')}
          onMouseLeave={e => (e.currentTarget.style.color = '#a855f7')}
        >
          Ver el Protocolo Completo →
          <ExternalLink size={16} />
        </a>
      </section>

    </main>
  )
}
