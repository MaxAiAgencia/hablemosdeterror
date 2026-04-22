'use client'

import { useState } from 'react'
import { Check, Heart } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

// ─── Tiers ────────────────────────────────────────────────────────────────────

interface Tier {
  nombre: string
  precio: string
  icono: string
  beneficios: string[]
  destacado: boolean
}

const TIERS: Tier[] = [
  {
    nombre: 'Primigenio',
    precio: '$50 MXN/mes',
    icono: '🌙',
    destacado: false,
    beneficios: [
      'Acceso al Discord exclusivo de oyentes',
      'Mención en el episodio mensual',
      'Badge de Primigenio en Discord',
    ],
  },
  {
    nombre: 'Cazador',
    precio: '$150 MXN/mes',
    icono: '👻',
    destacado: true,
    beneficios: [
      'Todo lo del nivel Primigenio',
      'Voto en los temas del próximo episodio',
      'Acceso a episodios extra exclusivos',
      'Canal privado de voz en Discord',
    ],
  },
  {
    nombre: 'Ancestral',
    precio: '$500 MXN/mes',
    icono: '💀',
    destacado: false,
    beneficios: [
      'Todo lo del nivel Cazador',
      'Videollamada mensual con Efraín',
      'Tu relato tiene prioridad en el archivo',
      'Crédito especial en el podcast',
      'Acceso anticipado a nuevos proyectos',
    ],
  },
]

const MONTOS_RAPIDOS = [20, 50, 100, 200]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ApoyaPage() {
  const [montoSeleccionado, setMontoSeleccionado] = useState<number | null>(null)
  const [montoCustom, setMontoCustom] = useState('')

  function handleApoyar(metodo: 'mercadopago' | 'paypal') {
    const monto = montoCustom ? parseInt(montoCustom) : montoSeleccionado
    if (!monto || monto <= 0) {
      alert('Selecciona o ingresa un monto para continuar.')
      return
    }
    alert(`Próximamente disponible. ¡Gracias por querer apoyar con $${monto} MXN via ${metodo === 'mercadopago' ? 'MercadoPago' : 'PayPal'}!`)
  }

  function handleUnirse(tierNombre: string) {
    alert(`Próximamente disponible. ¡Gracias por tu interés en el nivel ${tierNombre}!`)
  }

  const montoFinal = montoCustom ? parseInt(montoCustom) || 0 : montoSeleccionado

  return (
    <main className="min-h-screen" style={{ background: 'var(--black)' }}>
      <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col gap-20">

        {/* Header */}
        <SectionHeader
          title="APOYA EL PROYECTO"
          subtitle="Tu apoyo mantiene vivo el horror en español."
        />

        {/* ── Membresías ────────────────────────────────────────────────── */}
        <section className="flex flex-col gap-8">
          <h2 className="font-nidex text-2xl md:text-3xl" style={{ color: 'var(--parchment)' }}>
            MEMBRESÍAS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {TIERS.map(tier => (
              <div
                key={tier.nombre}
                className="relative flex flex-col gap-5 p-6 rounded-2xl"
                style={{
                  background: tier.destacado ? 'var(--dark)' : 'rgba(22,9,30,0.6)',
                  border: tier.destacado
                    ? '2px solid var(--crimson)'
                    : '1px solid rgba(139,0,0,0.25)',
                  transform: tier.destacado ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: tier.destacado ? '0 0 40px rgba(192,20,42,0.2)' : 'none',
                }}
              >
                {/* Más popular badge */}
                {tier.destacado && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap"
                    style={{ background: 'var(--crimson)', color: 'var(--parchment)' }}
                  >
                    MÁS POPULAR
                  </div>
                )}

                {/* Icon + Name */}
                <div className="flex flex-col gap-2">
                  <span className="text-4xl">{tier.icono}</span>
                  <h3 className="font-nidex text-2xl" style={{ color: 'var(--parchment)' }}>
                    {tier.nombre}
                  </h3>
                  <span className="font-bold text-xl" style={{ color: 'var(--gold)' }}>
                    {tier.precio}
                  </span>
                </div>

                {/* Benefits */}
                <ul className="flex flex-col gap-2 flex-1">
                  {tier.beneficios.map(b => (
                    <li key={b} className="flex items-start gap-2 text-sm" style={{ color: 'var(--fog)' }}>
                      <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--crimson)' }} />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleUnirse(tier.nombre)}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all mt-2"
                  style={{
                    background: tier.destacado ? 'var(--blood)' : 'transparent',
                    color: tier.destacado ? 'var(--parchment)' : 'var(--fog)',
                    border: tier.destacado ? '1px solid var(--crimson)' : '1px solid rgba(139,0,0,0.3)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--blood)'
                    e.currentTarget.style.color = 'var(--parchment)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = tier.destacado ? 'var(--blood)' : 'transparent'
                    e.currentTarget.style.color = tier.destacado ? 'var(--parchment)' : 'var(--fog)'
                  }}
                >
                  Unirme
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── Propinas únicas ───────────────────────────────────────────── */}
        <section className="flex flex-col gap-8">
          <h2 className="font-nidex text-2xl md:text-3xl" style={{ color: 'var(--parchment)' }}>
            PROPINA ÚNICA
          </h2>
          <p className="text-sm" style={{ color: 'var(--fog)' }}>
            Sin compromisos. Apoya con lo que puedas cuando quieras.
          </p>

          {/* Montos rápidos */}
          <div className="flex flex-wrap gap-3">
            {MONTOS_RAPIDOS.map(m => (
              <button
                key={m}
                onClick={() => {
                  setMontoSeleccionado(m)
                  setMontoCustom('')
                }}
                className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all"
                style={{
                  background:
                    montoSeleccionado === m && !montoCustom ? 'var(--blood)' : 'var(--dark)',
                  color:
                    montoSeleccionado === m && !montoCustom ? 'var(--parchment)' : 'var(--fog)',
                  border: '1px solid rgba(139,0,0,0.35)',
                }}
              >
                ${m} MXN
              </button>
            ))}

            {/* Custom input */}
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
                style={{ color: 'var(--muted)' }}
              >
                $
              </span>
              <input
                type="number"
                min="1"
                placeholder="Otro monto"
                value={montoCustom}
                onChange={e => {
                  setMontoCustom(e.target.value)
                  setMontoSeleccionado(null)
                }}
                className="pl-7 pr-3 py-2.5 rounded-xl text-sm outline-none w-36"
                style={{
                  background: montoCustom ? 'var(--blood)' : 'var(--dark)',
                  border: '1px solid rgba(139,0,0,0.35)',
                  color: 'var(--parchment)',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--crimson)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(139,0,0,0.35)')}
              />
            </div>
          </div>

          {/* Payment buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleApoyar('mercadopago')}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all"
              style={{ background: '#009ee3', color: 'white', border: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <Heart size={16} fill="white" />
              Apoyar con MercadoPago
              {montoFinal ? ` — $${montoFinal} MXN` : ''}
            </button>

            <button
              onClick={() => handleApoyar('paypal')}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all"
              style={{
                background: 'var(--dark)',
                color: 'var(--fog)',
                border: '1px solid rgba(139,0,0,0.3)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--crimson)'
                e.currentTarget.style.color = 'var(--parchment)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(139,0,0,0.3)'
                e.currentTarget.style.color = 'var(--fog)'
              }}
            >
              PayPal
              {montoFinal ? ` — $${montoFinal} MXN` : ''}
            </button>
          </div>
        </section>

        {/* ── Por qué apoyar ───────────────────────────────────────────── */}
        <section
          className="rounded-2xl p-8 md:p-12 flex flex-col gap-6"
          style={{ background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.15)' }}
        >
          <h2 className="font-nidex text-2xl md:text-3xl" style={{ color: 'var(--gold)' }}>
            ¿POR QUÉ APOYAR?
          </h2>

          <p className="text-base leading-relaxed" style={{ color: 'var(--fog)', lineHeight: '1.8' }}>
            Hablemos de Terror nació de una obsesión genuina por las historias que nos erizan la piel.
            Durante años lo hice solo, con equipo prestado, sin monetización, porque creía que el horror
            en español merecía un espacio serio y bien producido. Gracias a quienes han apoyado, hoy
            tenemos un micrófono decente, tiempo dedicado y un archivo creciente de relatos que de otra
            manera nadie hubiera narrado.
          </p>

          <p className="text-base leading-relaxed" style={{ color: 'var(--fog)', lineHeight: '1.8' }}>
            Cada peso que llega va directo a mejor producción, viajes para documentar historias locales,
            y tiempo que puedo dedicar al proyecto en lugar de a otras cosas. No hay equipo grande aquí.
            Somos tú, yo y las historias que nos unen en la oscuridad. Si el podcast te ha dado algo,
            incluso la más pequeña propina significa que puedo seguir haciéndolo. De verdad, gracias.
            — Efraín
          </p>
        </section>

      </div>
    </main>
  )
}
