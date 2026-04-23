'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const STORAGE_KEY = 'hdt-newsletter-shown';
const DELAY_MS = 30_000; // 30 segundos
const SCROLL_THRESHOLD = 0.5; // 50% de scroll

export default function NewsletterPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const captchaRef = useRef<HCaptcha>(null);

  // No mostrar en rutas de admin
  const esAdmin = pathname?.startsWith('/admin');

  const mostrarPopup = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(true);
  }, []);

  useEffect(() => {
    if (esAdmin) return;

    // Temporizador de 30 segundos
    const timer = setTimeout(mostrarPopup, DELAY_MS);

    // Detector de scroll al 50%
    function handleScroll() {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total >= SCROLL_THRESHOLD) {
        mostrarPopup();
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [esAdmin, mostrarPopup]);

  function cerrar() {
    setVisible(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setEstado('loading');
    setErrorMsg('');
    captchaRef.current?.execute();
  }

  async function onCaptchaVerify(token: string) {
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, hcaptchaToken: token }),
      });

      if (res.ok) {
        setEstado('success');
        setTimeout(() => setVisible(false), 2000);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.error ?? 'Error al suscribirse. Intenta de nuevo.');
        setEstado('error');
      }
    } catch {
      setErrorMsg('Error de red. Intenta de nuevo.');
      setEstado('error');
    }
    captchaRef.current?.resetCaptcha();
  }

  if (!visible) return null;

  return (
    // Overlay con blur
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5,2,8,0.80)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) cerrar();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-popup-title"
    >
      {/* Modal */}
      <div
        className="w-full max-w-md rounded-2xl p-8 relative shadow-2xl"
        style={{
          background: 'var(--dark)',
          border: '1px solid var(--blood)',
          boxShadow: '0 0 60px rgba(139,0,0,0.3)',
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={cerrar}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-lg leading-none transition-opacity hover:opacity-60"
          style={{ color: 'var(--fog)', background: 'rgba(255,255,255,0.05)' }}
          aria-label="Cerrar"
        >
          ✕
        </button>

        {/* Ícono decorativo */}
        <div className="text-center text-4xl mb-4" role="presentation">
          🕯️
        </div>

        {/* Título */}
        <h2
          id="newsletter-popup-title"
          className="font-nidex text-center text-2xl tracking-widest mb-3"
          style={{ color: 'var(--gold)' }}
        >
          ÚNETE A LOS TERRORÍFICOS
        </h2>

        {/* Subtítulo */}
        <p className="text-center text-sm mb-6 leading-relaxed" style={{ color: 'var(--fog)' }}>
          Historias exclusivas directo a tu correo.
          <br />
          Sin spam. Solo terror.
        </p>

        {/* Formulario / Éxito */}
        {estado === 'success' ? (
          <div className="text-center py-4">
            <p className="text-2xl mb-2">✓</p>
            <p className="font-semibold" style={{ color: '#4ade80' }}>
              ¡Bienvenido a la oscuridad!
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--fog)' }}>
              Revisa tu correo para confirmar.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={estado === 'loading'}
              className="w-full rounded-lg px-4 py-3 text-sm outline-none disabled:opacity-50"
              style={{
                background: 'var(--deep)',
                color: 'var(--parchment)',
                border: '1px solid var(--blood)',
              }}
            />

            {estado === 'error' && errorMsg && (
              <p className="text-xs text-center" style={{ color: 'var(--crimson)' }}>
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={estado === 'loading'}
              className="w-full rounded-lg py-3 font-bold tracking-wider text-sm transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ background: 'var(--blood)', color: 'var(--parchment)' }}
            >
              {estado === 'loading' ? 'Enviando...' : 'Quiero tener miedo'}
            </button>

            <p className="text-center text-xs" style={{ color: 'rgba(184,168,152,0.5)' }}>
              Puedes darte de baja cuando quieras.
            </p>

            <HCaptcha
              ref={captchaRef}
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
              onVerify={onCaptchaVerify}
              onExpire={() => captchaRef.current?.resetCaptcha()}
              size="invisible"
              theme="dark"
            />
          </form>
        )}
      </div>
    </div>
  );
}
