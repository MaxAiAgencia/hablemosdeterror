'use client'

import { SectionHeader } from '@/components/ui/SectionHeader'

const STORE_URL = 'https://hablemosdeterror-shop.fourthwall.com/collections/all'

const categories = [
  { icon: '👕', label: 'Playeras' },
  { icon: '🧢', label: 'Gorras' },
  { icon: '☕', label: 'Tazas' },
  { icon: '🎒', label: 'Accesorios' },
]

export default function MerchPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--black)' }}>
      <div className="max-w-3xl mx-auto px-4 py-16 flex flex-col items-center gap-12 text-center">

        <SectionHeader
          title="MERCH OFICIAL"
          subtitle="Representa al podcast con estilo"
        />

        {/* Hero card */}
        <div
          className="w-full rounded-2xl p-10 flex flex-col items-center gap-6"
          style={{
            background: 'linear-gradient(135deg, rgba(139,0,0,0.18) 0%, rgba(5,2,8,0.95) 100%)',
            border: '1px solid rgba(139,0,0,0.35)',
          }}
        >
          <img
            src="/images/logo-icon.png"
            alt="Hablemos de Terror"
            style={{ width: 96, height: 96, objectFit: 'contain', opacity: 0.9 }}
          />

          <div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: 'var(--parchment)', fontFamily: 'var(--font-nidex)' }}
            >
              Tienda oficial en Fourthwall
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 15 }}>
              Playeras, gorras, tazas y más — envíos a México y LATAM.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(({ icon, label }) => (
              <span
                key={label}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(139,0,0,0.2)',
                  border: '1px solid rgba(139,0,0,0.4)',
                  color: 'var(--fog)',
                }}
              >
                {icon} {label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-base transition-all"
            style={{
              background: 'var(--blood)',
              color: 'var(--parchment)',
              border: '1px solid var(--crimson)',
              textDecoration: 'none',
              fontSize: 16,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--crimson)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--blood)')}
          >
            Ir a la tienda →
          </a>

          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            Serás redirigido a hablemosdeterror-shop.fourthwall.com
          </p>
        </div>

      </div>
    </main>
  )
}
