'use client'

import { motion, type Variants } from 'framer-motion'
import { Mic, BookOpen, PenLine } from 'lucide-react'
import Link from 'next/link'

const cards = [
  {
    icon: Mic,
    title: 'Escuchar Podcast',
    description: 'Todos los episodios de terror',
    href: '/podcast',
  },
  {
    icon: BookOpen,
    title: 'Ver Testimonios',
    description: 'Historias enviadas por la comunidad',
    href: '/testimonios',
  },
  {
    icon: PenLine,
    title: 'Enviar mi Historia',
    description: 'Comparte tu experiencia aterradora',
    href: '/testimonios#enviar',
  },
]

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const, delay: i * 0.12 },
  }),
}

export function QuickActions() {
  return (
    <section
      style={{
        backgroundColor: 'var(--black)',
        padding: '80px 1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {cards.map(({ icon: Icon, title, description, href }, i) => (
          <motion.div
            key={href}
            custom={i}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Link
              href={href}
              style={{ textDecoration: 'none', display: 'block', height: '100%' }}
            >
              <div
                style={{
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  height: '100%',
                  cursor: 'crosshair',
                  background: 'var(--dark)',
                  border: '1px solid rgba(139,0,0,0.35)',
                  borderRadius: '8px',
                  transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(139,0,0,0.7)'
                  el.style.boxShadow = '0 0 30px rgba(139,0,0,0.2)'
                  el.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(139,0,0,0.35)'
                  el.style.boxShadow = 'none'
                  el.style.transform = 'translateY(0)'
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: 'rgba(139,0,0,0.15)',
                    border: '1px solid rgba(139,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={24} color="var(--blood)" />
                </div>
                <h3
                  className="font-nidex"
                  style={{
                    color: 'var(--parchment)',
                    fontSize: '1.25rem',
                    margin: 0,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    color: 'var(--fog)',
                    fontSize: '0.9rem',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {description}
                </p>
                <span
                  style={{
                    marginTop: 'auto',
                    color: 'var(--blood)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  Entrar →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
