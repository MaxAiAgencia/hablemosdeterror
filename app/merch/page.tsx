'use client'

import { useState, useEffect } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'

export default function MerchPage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <main className="min-h-screen" style={{ background: 'var(--black)' }}>
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col gap-10">

        <SectionHeader
          title="MERCH OFICIAL"
          subtitle="Consigue tu mercancía oficial de Hablemos de Terror"
        />

        {/* Link prominente */}
        <div className="flex justify-center">
          <a
            href="https://hablemosdeterror-shop.fourthwall.com/collections/all"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all"
            style={{
              background: 'var(--blood)',
              color: 'var(--parchment)',
              border: '1px solid var(--crimson)',
              textDecoration: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--crimson)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--blood)')}
          >
            Ver Tienda Completa →
          </a>
        </div>

        {/* Iframe de la tienda */}
        <section className="w-full rounded-xl overflow-hidden" style={{ border: '1px solid rgba(139,0,0,0.25)' }}>
          <iframe
            src="https://hablemosdeterror-shop.fourthwall.com/collections/all"
            width="100%"
            height={isMobile ? '600px' : '900px'}
            title="Tienda oficial de Hablemos de Terror"
            frameBorder="0"
            style={{ display: 'block' }}
            allow="payment"
          />
        </section>

        {/* Mensaje de fallback */}
        <p
          className="text-center text-sm"
          style={{ color: 'var(--muted)' }}
        >
          ¿Problemas para cargar la tienda? Visítala directamente en{' '}
          <a
            href="https://hablemosdeterror-shop.fourthwall.com/collections/all"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--fog)', textDecoration: 'underline' }}
          >
            hablemosdeterror-shop.fourthwall.com
          </a>
        </p>

      </div>
    </main>
  )
}
