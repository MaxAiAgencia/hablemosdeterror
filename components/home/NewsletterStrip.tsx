'use client'

import { useState, useRef } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'

export function NewsletterStrip() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const captchaRef = useRef<HCaptcha>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    // Ejecutar captcha invisible y esperar el token
    captchaRef.current?.execute()
  }

  const onCaptchaVerify = async (token: string) => {
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, hcaptchaToken: token }),
      })
      if (res.ok) {
        setStatus('success')
        setMessage('¡Bienvenido a los Terroríficos! Revisa tu correo.')
        setEmail('')
      } else {
        throw new Error()
      }
    } catch {
      setStatus('error')
      setMessage('Algo salió mal. Intenta de nuevo.')
    }
    captchaRef.current?.resetCaptcha()
  }

  return (
    <section
      style={{
        backgroundColor: 'var(--deep)',
        padding: '60px 1.5rem',
        borderTop: '1px solid rgba(139,0,0,0.15)',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          textAlign: 'center',
        }}
      >
        <div>
          <p style={{ color: 'var(--blood)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Newsletter
          </p>
          <h2 className="font-nidex" style={{ color: 'var(--parchment)', fontSize: 'clamp(1.5rem, 4vw, 2rem)', margin: 0, letterSpacing: '0.04em' }}>
            Únete a los Terroríficos
          </h2>
          <p style={{ color: 'var(--fog)', fontSize: '0.88rem', marginTop: '0.5rem', lineHeight: 1.5 }}>
            Recibe los nuevos episodios, relatos y noticias de terror directo en tu correo.
          </p>
        </div>

        {status === 'success' ? (
          <div style={{ background: 'rgba(139,0,0,0.12)', border: '1px solid rgba(139,0,0,0.3)', borderRadius: '8px', padding: '1rem 1.5rem', color: 'var(--parchment)', fontSize: '0.9rem' }}>
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              disabled={status === 'loading'}
              style={{ flex: '1 1 220px', background: 'var(--dark)', border: '1px solid rgba(139,0,0,0.3)', borderRadius: '6px', padding: '0.75rem 1rem', color: 'var(--parchment)', fontSize: '0.9rem', outline: 'none', minWidth: 0 }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(139,0,0,0.6)' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(139,0,0,0.3)' }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{ flexShrink: 0, background: 'var(--blood)', color: 'var(--parchment)', border: 'none', borderRadius: '6px', padding: '0.75rem 1.5rem', fontWeight: 600, fontSize: '0.9rem', cursor: status === 'loading' ? 'not-allowed' : 'crosshair', opacity: status === 'loading' ? 0.6 : 1, transition: 'background 0.2s ease' }}
              onMouseEnter={(e) => { if (status !== 'loading') e.currentTarget.style.background = 'var(--crimson)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--blood)' }}
            >
              {status === 'loading' ? 'Suscribiendo...' : 'Suscribirme'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p style={{ color: 'var(--crimson)', fontSize: '0.82rem', margin: 0 }}>{message}</p>
        )}

        <HCaptcha
          ref={captchaRef}
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
          onVerify={onCaptchaVerify}
          onExpire={() => captchaRef.current?.resetCaptcha()}
          size="invisible"
          theme="dark"
        />
      </div>
    </section>
  )
}
