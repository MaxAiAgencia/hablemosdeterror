'use client'

import { useState } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CheckCircle2, Loader2 } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Categoria =
  | 'aparicion'
  | 'brujeria'
  | 'criatura'
  | 'paranormal'
  | 'sueno'
  | 'objeto_maldito'
  | 'ritual'
  | 'urbano'

const CATEGORIAS: { value: Categoria | ''; label: string }[] = [
  { value: '', label: 'Todos' },
  { value: 'aparicion', label: 'Aparición' },
  { value: 'brujeria', label: 'Brujería' },
  { value: 'criatura', label: 'Criatura' },
  { value: 'paranormal', label: 'Paranormal' },
  { value: 'sueno', label: 'Sueño' },
  { value: 'objeto_maldito', label: 'Objeto Maldito' },
  { value: 'ritual', label: 'Ritual' },
  { value: 'urbano', label: 'Leyenda Urbana' },
]

// ─── Input style helper ───────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  background: 'var(--dark)',
  border: '1px solid rgba(139,0,0,0.3)',
  color: 'var(--parchment)',
  borderRadius: '6px',
  padding: '10px 14px',
  width: '100%',
  outline: 'none',
  fontSize: '0.9rem',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TestimoniosPage() {
  // Form state
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [tituloTestimonio, setTituloTestimonio] = useState('')
  const [categoria, setCategoria] = useState<Categoria>('aparicion')
  const [esReal, setEsReal] = useState<'real' | 'ficcion'>('real')
  const [contenido, setContenido] = useState('')
  const [consentimiento, setConsentimiento] = useState(false)

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!consentimiento) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/testimonios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          email,
          ciudad,
          titulo_testimonio: tituloTestimonio,
          categoria,
          es_real: esReal === 'real',
          contenido,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
      } else {
        throw new Error(data.message ?? 'Error desconocido')
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Ocurrió un error. Intenta de nuevo.')
    }
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--black)' }}>
      <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col gap-20">

        {/* ── Formulario de envío ────────────────────────────────────── */}
        <section id="enviar" className="flex flex-col gap-8">
          <SectionHeader
            title="TESTIMONIOS"
            subtitle="¿Viviste algo inexplicable? Cuéntanos tu testimonio. Puede aparecer en el podcast."
          />

          {status === 'success' ? (
            <div
              className="rounded-xl p-8 flex flex-col items-center gap-4 text-center"
              style={{ background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.3)' }}
            >
              <CheckCircle2 size={48} style={{ color: 'var(--gold)' }} />
              <h3 className="font-nidex text-2xl" style={{ color: 'var(--parchment)' }}>
                Testimonio recibido
              </h3>
              <p style={{ color: 'var(--fog)' }}>
                Tu testimonio ha llegado al archivo. Si lo seleccionamos, te avisaremos por email.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-nidex text-2xl md:text-3xl" style={{ color: 'var(--parchment)' }}>
                ENVÍA TU TESTIMONIO
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Nombre + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--fog)' }}>
                      Nombre *
                    </label>
                    <input
                      type="text"
                      required
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                      placeholder="Tu nombre"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.border = '1px solid var(--crimson)')}
                      onBlur={e => (e.currentTarget.style.border = '1px solid rgba(139,0,0,0.3)')}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--fog)' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.border = '1px solid var(--crimson)')}
                      onBlur={e => (e.currentTarget.style.border = '1px solid rgba(139,0,0,0.3)')}
                    />
                  </div>
                </div>

                {/* Ciudad + Título */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--fog)' }}>
                      Ciudad
                    </label>
                    <input
                      type="text"
                      value={ciudad}
                      onChange={e => setCiudad(e.target.value)}
                      placeholder="Ciudad, País"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.border = '1px solid var(--crimson)')}
                      onBlur={e => (e.currentTarget.style.border = '1px solid rgba(139,0,0,0.3)')}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--fog)' }}>
                      Título del testimonio *
                    </label>
                    <input
                      type="text"
                      required
                      value={tituloTestimonio}
                      onChange={e => setTituloTestimonio(e.target.value)}
                      placeholder="Ponle nombre a tu historia"
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.border = '1px solid var(--crimson)')}
                      onBlur={e => (e.currentTarget.style.border = '1px solid rgba(139,0,0,0.3)')}
                    />
                  </div>
                </div>

                {/* Categoría */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--fog)' }}>
                    Categoría
                  </label>
                  <select
                    value={categoria}
                    onChange={e => setCategoria(e.target.value as Categoria)}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.border = '1px solid var(--crimson)')}
                    onBlur={e => (e.currentTarget.style.border = '1px solid rgba(139,0,0,0.3)')}
                  >
                    {CATEGORIAS.filter(c => c.value !== '').map(c => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Es real */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--fog)' }}>
                    Tipo de historia
                  </label>
                  <div className="flex gap-6">
                    {(['real', 'ficcion'] as const).map(val => (
                      <label key={val} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="es_real"
                          value={val}
                          checked={esReal === val}
                          onChange={() => setEsReal(val)}
                          style={{ accentColor: 'var(--crimson)' }}
                        />
                        <span className="text-sm" style={{ color: 'var(--fog)' }}>
                          {val === 'real' ? 'Experiencia real' : 'Ficción'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Contenido */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--fog)' }}>
                      Tu testimonio *
                    </label>
                    <span
                      className="text-xs"
                      style={{ color: contenido.length >= 500 ? 'var(--gold)' : 'var(--muted)' }}
                    >
                      {contenido.length} / 500 mín.
                    </span>
                  </div>
                  <textarea
                    required
                    minLength={500}
                    rows={10}
                    value={contenido}
                    onChange={e => setContenido(e.target.value)}
                    placeholder="Escribe tu testimonio aquí. Sé específico: dónde, cuándo, qué pasó. Mínimo 500 caracteres."
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.7' }}
                    onFocus={e => (e.currentTarget.style.border = '1px solid var(--crimson)')}
                    onBlur={e => (e.currentTarget.style.border = '1px solid rgba(139,0,0,0.3)')}
                  />
                </div>

                {/* Consentimiento */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consentimiento}
                    onChange={e => setConsentimiento(e.target.checked)}
                    style={{ accentColor: 'var(--crimson)', marginTop: '2px', flexShrink: 0 }}
                  />
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--fog)' }}>
                    Acepto que Hablemos de Terror pueda leer y adaptar mi testimonio en el podcast, mencionando mi nombre si así lo deseo. No cedo derechos de autoría.
                  </span>
                </label>

                {/* Error */}
                {status === 'error' && (
                  <p
                    className="text-sm px-4 py-3 rounded-lg"
                    style={{ background: 'rgba(139,0,0,0.15)', color: 'var(--crimson)', border: '1px solid rgba(139,0,0,0.3)' }}
                  >
                    {errorMsg}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-2 py-3 px-8 rounded-lg font-bold text-base transition-all self-start"
                  style={{
                    background: status === 'loading' ? 'var(--dark)' : 'var(--blood)',
                    color: 'var(--parchment)',
                    border: '1px solid var(--crimson)',
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    opacity: status === 'loading' ? 0.7 : 1,
                  }}
                >
                  {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
                  {status === 'loading' ? 'Enviando...' : 'Enviar mi testimonio'}
                </button>
              </form>
            </>
          )}
        </section>

      </div>
    </main>
  )
}
