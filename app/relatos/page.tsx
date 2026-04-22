'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { User, MapPin, CheckCircle2, Loader2 } from 'lucide-react'

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

interface Relato {
  id: string
  titulo: string
  autor_nombre: string
  ciudad: string
  categoria: Categoria
  extracto: string
  slug: string
  publicado_at: string
  es_real: boolean
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const RELATOS: Relato[] = [
  {
    id: 'r-01',
    titulo: 'La vecina del 4B',
    autor_nombre: 'Daniela R.',
    ciudad: 'Ciudad de México',
    categoria: 'aparicion',
    extracto:
      'Llevaba tres semanas escuchando pasos arriba de mi departamento. Cuando subí a quejarme, me dijeron que ese piso estaba vacío desde 2019.',
    slug: 'la-vecina-del-4b',
    publicado_at: '2026-04-08',
    es_real: true,
  },
  {
    id: 'r-02',
    titulo: 'El altar de mi abuela',
    autor_nombre: 'Marco A.',
    ciudad: 'Veracruz',
    categoria: 'brujeria',
    extracto:
      'Cuando limpiamos la casa de mi abuela después de su muerte, encontramos detrás de la pared del baño un altar con nombres escritos en sangre.',
    slug: 'el-altar-de-mi-abuela',
    publicado_at: '2026-03-30',
    es_real: true,
  },
  {
    id: 'r-03',
    titulo: 'El espejo de los tres golpes',
    autor_nombre: 'Sofía M.',
    ciudad: 'Monterrey',
    categoria: 'objeto_maldito',
    extracto:
      'Lo compré en un mercado de pulgas. Esa misma noche, a las 3 a.m., escuché tres golpes que venían de dentro del espejo, desde el otro lado.',
    slug: 'el-espejo-de-los-tres-golpes',
    publicado_at: '2026-03-15',
    es_real: false,
  },
  {
    id: 'r-04',
    titulo: 'La criatura del cerro',
    autor_nombre: 'Jesús V.',
    ciudad: 'Oaxaca',
    categoria: 'criatura',
    extracto:
      'Subíamos el cerro Albotres cuando vimos algo que caminaba en dos patas pero no era humano. Corrimos. Uno de nosotros nunca llegó abajo.',
    slug: 'la-criatura-del-cerro',
    publicado_at: '2026-03-02',
    es_real: true,
  },
]

// ─── RelatoCard ───────────────────────────────────────────────────────────────

function RelatoCard({ relato }: { relato: Relato }) {
  const cat = CATEGORIAS.find(c => c.value === relato.categoria)

  return (
    <Link
      href={`/relatos/${relato.slug}`}
      className="card-dark border-blood-subtle rounded-xl p-5 flex flex-col gap-3 transition-all block"
      style={{ textDecoration: 'none' }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {/* Badges row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded"
          style={{ background: 'var(--blood)', color: 'var(--parchment)' }}
        >
          {cat?.label ?? relato.categoria}
        </span>
        <span
          className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded border"
          style={{
            borderColor: relato.es_real ? 'rgba(192,20,42,0.5)' : 'rgba(90,74,90,0.5)',
            color: relato.es_real ? 'var(--crimson)' : 'var(--muted)',
          }}
        >
          {relato.es_real ? 'Real' : 'Ficción'}
        </span>
      </div>

      <h3 className="font-nidex text-xl leading-tight" style={{ color: 'var(--parchment)' }}>
        {relato.titulo}
      </h3>

      <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--fog)' }}>
        {relato.extracto}
      </p>

      <div className="flex items-center gap-3 mt-auto pt-1">
        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted)' }}>
          <User size={12} />
          {relato.autor_nombre}
        </span>
        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--muted)' }}>
          <MapPin size={12} />
          {relato.ciudad}
        </span>
      </div>
    </Link>
  )
}

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

export default function RelatosPage() {
  const [filtroCategoria, setFiltroCategoria] = useState<Categoria | ''>('')

  // Form state
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [tituloRelato, setTituloRelato] = useState('')
  const [categoria, setCategoria] = useState<Categoria>('aparicion')
  const [esReal, setEsReal] = useState<'real' | 'ficcion'>('real')
  const [contenido, setContenido] = useState('')
  const [consentimiento, setConsentimiento] = useState(false)

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const relatosFiltrados = filtroCategoria
    ? RELATOS.filter(r => r.categoria === filtroCategoria)
    : RELATOS

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!consentimiento) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/relatos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          email,
          ciudad,
          titulo_relato: tituloRelato,
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

        {/* ── A. Archivo de relatos ─────────────────────────────────────── */}
        <section className="flex flex-col gap-8">
          <SectionHeader
            title="RELATOS DE TERROR"
            subtitle="Historias enviadas por nuestra comunidad. Algunas son reales."
          />

          {/* Filtros de categoría */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIAS.map(c => (
              <button
                key={c.value}
                onClick={() => setFiltroCategoria(c.value as Categoria | '')}
                className="px-3 py-1.5 rounded-lg text-sm font-bold transition-all"
                style={{
                  background:
                    filtroCategoria === c.value ? 'var(--blood)' : 'var(--dark)',
                  color:
                    filtroCategoria === c.value ? 'var(--parchment)' : 'var(--fog)',
                  border: '1px solid rgba(139,0,0,0.3)',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Grid de relatos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {relatosFiltrados.map(r => (
              <RelatoCard key={r.id} relato={r} />
            ))}
          </div>
        </section>

        {/* ── B. Formulario de envío ────────────────────────────────────── */}
        <section id="enviar" className="flex flex-col gap-8">
          <SectionHeader
            title="ENVÍA TU RELATO"
            subtitle="¿Tienes una historia que contar? Puede aparecer en el podcast."
          />

          {status === 'success' ? (
            <div
              className="rounded-xl p-8 flex flex-col items-center gap-4 text-center"
              style={{ background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.3)' }}
            >
              <CheckCircle2 size={48} style={{ color: 'var(--gold)' }} />
              <h3 className="font-nidex text-2xl" style={{ color: 'var(--parchment)' }}>
                Historia recibida
              </h3>
              <p style={{ color: 'var(--fog)' }}>
                Tu historia ha llegado al archivo. Si la seleccionamos, te avisaremos por email.
              </p>
            </div>
          ) : (
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
                    Título del relato *
                  </label>
                  <input
                    type="text"
                    required
                    value={tituloRelato}
                    onChange={e => setTituloRelato(e.target.value)}
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
                    Tu relato *
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
                  placeholder="Escribe tu historia aquí. Sé específico: dónde, cuándo, qué pasó. Mínimo 500 caracteres."
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
                  Acepto que Hablemos de Terror pueda leer y adaptar mi relato en el podcast, mencionando mi nombre si así lo deseo. No cedo derechos de autoría.
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
                {status === 'loading' ? 'Enviando...' : 'Enviar mi relato'}
              </button>
            </form>
          )}
        </section>

      </div>
    </main>
  )
}
