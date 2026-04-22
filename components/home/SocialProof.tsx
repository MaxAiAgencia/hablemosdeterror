'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

interface Counter {
  value: number
  suffix: string
  label: string
}

const counters: Counter[] = [
  { value: 191, suffix: 'K+', label: 'Suscriptores YouTube' },
  { value: 200, suffix: '+', label: 'Episodios' },
  { value: 5, suffix: 'K+', label: 'Relatos recibidos' },
  { value: 50, suffix: 'K+', label: 'Oyentes mensuales' },
]

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!active) return

    const duration = 1800
    const steps = 60
    const increment = target / steps
    const interval = duration / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      const next = Math.min(Math.round(increment * step), target)
      setCurrent(next)
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [active, target])

  return (
    <span>
      {current}
      {suffix}
    </span>
  )
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: i * 0.1 },
  }),
}

export function SocialProof() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      style={{
        backgroundColor: 'var(--deep)',
        padding: '60px 1.5rem',
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
        }}
        className="sm:grid-cols-4"
      >
        {counters.map(({ value, suffix, label }, i) => (
          <motion.div
            key={label}
            custom={i}
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              textAlign: 'center',
            }}
          >
            <div
              className="font-nidex"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                color: 'var(--crimson)',
                lineHeight: 1,
                letterSpacing: '0.02em',
              }}
            >
              <CountUp target={value} suffix={suffix} active={inView} />
            </div>
            <span
              style={{
                color: 'var(--fog)',
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                maxWidth: '120px',
              }}
            >
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
