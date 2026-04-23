import { Hero } from '@/components/home/Hero'
import { HomeLatestVideos } from '@/components/home/HomeLatestVideos'
import { SocialProof } from '@/components/home/SocialProof'
import { NewsletterStrip } from '@/components/home/NewsletterStrip'
import Link from 'next/link'

// ─── CTA Enviar Historia ──────────────────────────────────────────────────────

function SendStoryCTA() {
  return (
    <section
      style={{
        backgroundColor: 'var(--black)',
        padding: '80px 1.5rem',
        borderTop: '1px solid rgba(139,0,0,0.15)',
      }}
    >
      <div
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          textAlign: 'center',
        }}
      >
        <p style={{ color: 'var(--blood)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>
          Comunidad
        </p>
        <h2
          className="font-nidex"
          style={{ color: 'var(--parchment)', fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', margin: 0, lineHeight: 1.1, letterSpacing: '0.03em' }}
        >
          ¿VIVISTE ALGO<br />
          <span style={{ color: 'var(--blood)' }}>INEXPLICABLE?</span>
        </h2>
        <p style={{ color: 'var(--fog)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '480px', margin: 0 }}>
          Tu testimonio puede aparecer en el podcast. Miles de oyentes escucharán tu historia.
        </p>
        <Link
          href="/testimonios#enviar"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'transparent',
            color: 'var(--gold)',
            fontFamily: 'Nidex, Impact, Arial Black, sans-serif',
            fontSize: '0.95rem',
            letterSpacing: '0.08em',
            padding: '0.9rem 2rem',
            borderRadius: '4px',
            border: '1px solid var(--gold)',
            textDecoration: 'none',
          }}
        >
          ✍ Enviar mi Historia
        </Link>
      </div>
    </section>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export default async function HomePage() {
  return (
    <main>
      <Hero />
      <HomeLatestVideos />
      <SocialProof />
      <SendStoryCTA />
      <NewsletterStrip />
    </main>
  )
}
