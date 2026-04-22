'use client';

import { useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

type RelatoStatus = 'pendiente' | 'aprobado' | 'rechazado' | 'publicado';

interface Relato {
  id: number;
  titulo: string;
  autor: string;
  fecha: string;
  categoria: string;
  status: RelatoStatus;
  contenido: string;
}

interface Episodio {
  id: number;
  titulo: string;
  descripcion: string;
  audio_url: string;
  imagen_url: string;
  categoria: string;
  temporada: number;
  numero: number;
  duracion_seg: number;
}

interface Suscriptor {
  email: string;
  nombre: string;
  tag: string;
  fecha: string;
}

interface Miembro {
  nombre: string;
  email: string;
  tier: string;
  precio: string;
  inicio: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const RELATOS_MOCK: Relato[] = [
  {
    id: 1,
    titulo: 'La casa del cerro rojo',
    autor: 'María Gómez',
    fecha: '2026-04-18',
    categoria: 'Casas Encantadas',
    status: 'pendiente',
    contenido:
      'Era una noche de octubre cuando decidimos entrar a la casa abandonada del cerro. Nadie del pueblo quería hablar de ese lugar, pero nosotros éramos jóvenes e imprudentes...',
  },
  {
    id: 2,
    titulo: 'El tren de las 3 AM',
    autor: 'Carlos Reyes',
    fecha: '2026-04-17',
    categoria: 'Paranormal',
    status: 'pendiente',
    contenido:
      'Trabajo como vigilante nocturno en la estación de trenes. Llevan años sin circular trenes después de medianoche, pero eso no impide que cada noche, exactamente a las 3:00 AM, escuche el silbato...',
  },
  {
    id: 3,
    titulo: 'Mi vecino no duerme',
    autor: 'Ana Flores',
    fecha: '2026-04-16',
    categoria: 'Creepypasta',
    status: 'pendiente',
    contenido:
      'Me mudé al apartamento 4B hace tres meses. Desde el primer día noté que las luces del apartamento de enfrente nunca se apagan. Nunca. En 90 días no he visto un solo momento de oscuridad detrás de esas ventanas...',
  },
  {
    id: 4,
    titulo: 'La niña del espejo',
    autor: 'Roberto Salinas',
    fecha: '2026-04-15',
    categoria: 'Fantasmas',
    status: 'pendiente',
    contenido:
      'Heredé el espejo de mi abuela cuando falleció. Era un espejo antiguo, con el marco de madera oscura tallada. Al principio no noté nada raro, pero después de una semana empecé a ver una silueta...',
  },
  {
    id: 5,
    titulo: 'Voces en el sótano',
    autor: 'Lucía Mendoza',
    fecha: '2026-04-14',
    categoria: 'Casas Encantadas',
    status: 'pendiente',
    contenido:
      'La casa que compramos tenía un sótano que el agente de bienes raíces mencionó de pasada. "Solo almacenamiento", dijo. Pero la primera noche escuchamos voces que venían de ahí abajo...',
  },
  {
    id: 6,
    titulo: 'El ritual del pueblo',
    autor: 'Diego Torres',
    fecha: '2026-04-10',
    categoria: 'Folclore',
    status: 'publicado',
    contenido:
      'En mi pueblo hay una tradición que ningún foráneo conoce. Cada año, en la noche de muertos, los ancianos salen al bosque con velas negras. Nadie habla de ello. Yo fui la primera joven en seguirlos...',
  },
];

const EPISODIOS_MOCK: Episodio[] = [
  {
    id: 1,
    titulo: 'La Llorona: Origen y misterio',
    descripcion: 'Exploramos los orígenes de la leyenda más aterradora de México.',
    audio_url: 'https://audio.hablemosdeterror.com/ep001.mp3',
    imagen_url: 'https://img.hablemosdeterror.com/ep001.jpg',
    categoria: 'Leyendas',
    temporada: 1,
    numero: 1,
    duracion_seg: 3240,
  },
  {
    id: 2,
    titulo: 'Casas embrujadas: Historias reales',
    descripcion: 'Tres familias comparten sus experiencias en casas con presencias.',
    audio_url: 'https://audio.hablemosdeterror.com/ep002.mp3',
    imagen_url: 'https://img.hablemosdeterror.com/ep002.jpg',
    categoria: 'Paranormal',
    temporada: 1,
    numero: 2,
    duracion_seg: 4100,
  },
  {
    id: 3,
    titulo: 'El Chupacabras: ¿mito o realidad?',
    descripcion: 'Investigamos los avistamientos más escalofriantes del Chupacabras.',
    audio_url: 'https://audio.hablemosdeterror.com/ep003.mp3',
    imagen_url: 'https://img.hablemosdeterror.com/ep003.jpg',
    categoria: 'Criaturas',
    temporada: 1,
    numero: 3,
    duracion_seg: 3780,
  },
];

const SUSCRIPTORES_MOCK: Suscriptor[] = [
  { email: 'terror.fan@gmail.com', nombre: 'Sofía López', tag: 'newsletter-general', fecha: '2026-03-01' },
  { email: 'horror.mx@hotmail.com', nombre: 'Andrés Ruiz', tag: 'miembro-primigenio', fecha: '2026-03-05' },
  { email: 'noche.eterna@yahoo.com', nombre: 'Valeria Cruz', tag: 'newsletter-general', fecha: '2026-03-10' },
  { email: 'sustos.reales@gmail.com', nombre: 'Miguel Herrera', tag: 'podcast-fan', fecha: '2026-03-15' },
  { email: 'miedo.total@proton.me', nombre: 'Isabella Moreno', tag: 'newsletter-general', fecha: '2026-03-20' },
];

const MIEMBROS_MOCK: Miembro[] = [
  { nombre: 'Carlos Vega', email: 'carlos.vega@gmail.com', tier: 'Primigenio', precio: '$99 MXN', inicio: '2026-01-15' },
  { nombre: 'Ana Martínez', email: 'ana.m@hotmail.com', tier: 'Cazador', precio: '$199 MXN', inicio: '2026-02-01' },
  { nombre: 'Luis Pérez', email: 'luis.p@gmail.com', tier: 'Ancestral', precio: '$399 MXN', inicio: '2026-01-01' },
  { nombre: 'Fernanda Gil', email: 'fer.gil@yahoo.com', tier: 'Primigenio', precio: '$99 MXN', inicio: '2026-03-10' },
  { nombre: 'Jorge Soto', email: 'jorge.s@proton.me', tier: 'Cazador', precio: '$199 MXN', inicio: '2026-02-20' },
];

// ─── Password Gate ────────────────────────────────────────────────────────────

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value === 'hdt2026') {
      onSuccess();
    } else {
      setError(true);
      setValue('');
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'var(--deep)' }}
    >
      <div
        className="w-full max-w-sm rounded-xl p-8 shadow-2xl"
        style={{ background: 'var(--dark)', border: '1px solid var(--blood)' }}
      >
        <h1
          className="font-nidex text-center text-2xl mb-2 tracking-widest"
          style={{ color: 'var(--gold)' }}
        >
          PANEL ADMIN
        </h1>
        <p className="text-center text-sm mb-8" style={{ color: 'var(--fog)' }}>
          Hablemos de Terror — Acceso restringido
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Clave de acceso"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded px-4 py-3 text-sm outline-none focus:ring-2"
            style={{
              background: 'var(--deep)',
              color: 'var(--parchment)',
              border: `1px solid ${error ? 'var(--crimson)' : 'var(--blood)'}`,
              // @ts-expect-error css variable
              '--tw-ring-color': 'var(--blood)',
            }}
            autoFocus
          />
          {error && (
            <p className="text-sm text-center" style={{ color: 'var(--crimson)' }}>
              Clave incorrecta.
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded py-3 font-bold tracking-wider text-sm transition-opacity hover:opacity-80"
            style={{ background: 'var(--blood)', color: 'var(--parchment)' }}
          >
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Tab: Relatos ─────────────────────────────────────────────────────────────

function TabRelatos() {
  const [relatos, setRelatos] = useState<Relato[]>(RELATOS_MOCK);
  const [dialogRelato, setDialogRelato] = useState<Relato | null>(null);

  const pendientes = relatos.filter((r) => r.status === 'pendiente').length;

  function cambiarStatus(id: number, status: RelatoStatus) {
    setRelatos((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  const statusColor: Record<RelatoStatus, string> = {
    pendiente: 'var(--gold)',
    aprobado: '#4ade80',
    rechazado: 'var(--crimson)',
    publicado: '#60a5fa',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-nidex text-xl tracking-wider" style={{ color: 'var(--gold)' }}>
          Relatos enviados
        </h2>
        <span
          className="text-xs px-3 py-1 rounded-full font-bold"
          style={{ background: 'var(--blood)', color: 'var(--parchment)' }}
        >
          {pendientes} nuevos
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid var(--blood)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--black)', color: 'var(--fog)' }}>
              {['Título', 'Autor', 'Fecha', 'Categoría', 'Status', 'Acciones'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-semibold tracking-wider text-xs uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {relatos.map((r, i) => (
              <tr
                key={r.id}
                style={{
                  background: i % 2 === 0 ? 'var(--dark)' : 'var(--deep)',
                  borderTop: '1px solid rgba(139,0,0,0.2)',
                }}
              >
                <td className="px-4 py-3 font-medium" style={{ color: 'var(--parchment)', maxWidth: '180px' }}>
                  <span className="truncate block">{r.titulo}</span>
                </td>
                <td className="px-4 py-3" style={{ color: 'var(--fog)' }}>
                  {r.autor}
                </td>
                <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--fog)' }}>
                  {r.fecha}
                </td>
                <td className="px-4 py-3" style={{ color: 'var(--fog)' }}>
                  {r.categoria}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="text-xs px-2 py-1 rounded-full font-bold capitalize"
                    style={{
                      color: statusColor[r.status],
                      background: 'rgba(0,0,0,0.4)',
                      border: `1px solid ${statusColor[r.status]}`,
                    }}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 flex-wrap">
                    {r.status === 'pendiente' && (
                      <>
                        <button
                          onClick={() => cambiarStatus(r.id, 'aprobado')}
                          className="text-xs px-2 py-1 rounded font-bold transition-opacity hover:opacity-80"
                          style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', border: '1px solid #4ade80' }}
                        >
                          ✓ Aprobar
                        </button>
                        <button
                          onClick={() => cambiarStatus(r.id, 'rechazado')}
                          className="text-xs px-2 py-1 rounded font-bold transition-opacity hover:opacity-80"
                          style={{ background: 'rgba(192,20,42,0.15)', color: 'var(--crimson)', border: '1px solid var(--crimson)' }}
                        >
                          ✗ Rechazar
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setDialogRelato(r)}
                      className="text-xs px-2 py-1 rounded font-bold transition-opacity hover:opacity-80"
                      style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', border: '1px solid var(--gold)' }}
                    >
                      Ver
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog relato */}
      {dialogRelato && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-4"
          style={{ background: 'rgba(5,2,8,0.85)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => e.target === e.currentTarget && setDialogRelato(null)}
        >
          <div
            className="w-full max-w-2xl rounded-xl p-8 relative max-h-[80vh] overflow-y-auto"
            style={{ background: 'var(--dark)', border: '1px solid var(--blood)' }}
          >
            <button
              onClick={() => setDialogRelato(null)}
              className="absolute top-4 right-4 text-xl leading-none transition-opacity hover:opacity-60"
              style={{ color: 'var(--fog)' }}
            >
              ✕
            </button>
            <h3 className="font-nidex text-xl mb-1" style={{ color: 'var(--gold)' }}>
              {dialogRelato.titulo}
            </h3>
            <p className="text-xs mb-4" style={{ color: 'var(--fog)' }}>
              Por {dialogRelato.autor} · {dialogRelato.categoria} · {dialogRelato.fecha}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--parchment)' }}>
              {dialogRelato.contenido}
            </p>
            <div className="mt-6 flex gap-3">
              {dialogRelato.status === 'pendiente' && (
                <>
                  <button
                    onClick={() => { cambiarStatus(dialogRelato.id, 'aprobado'); setDialogRelato(null); }}
                    className="text-sm px-4 py-2 rounded font-bold transition-opacity hover:opacity-80"
                    style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', border: '1px solid #4ade80' }}
                  >
                    ✓ Aprobar
                  </button>
                  <button
                    onClick={() => { cambiarStatus(dialogRelato.id, 'rechazado'); setDialogRelato(null); }}
                    className="text-sm px-4 py-2 rounded font-bold transition-opacity hover:opacity-80"
                    style={{ background: 'rgba(192,20,42,0.15)', color: 'var(--crimson)', border: '1px solid var(--crimson)' }}
                  >
                    ✗ Rechazar
                  </button>
                </>
              )}
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

// ─── Tab: Episodios ───────────────────────────────────────────────────────────

function TabEpisodios() {
  const [episodios, setEpisodios] = useState<Episodio[]>(EPISODIOS_MOCK);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    audio_url: '',
    imagen_url: '',
    categoria: '',
    temporada: '1',
    numero: '',
    duracion_seg: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/episodios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          temporada: parseInt(form.temporada) || 1,
          numero: parseInt(form.numero) || 0,
          duracion_seg: parseInt(form.duracion_seg) || 0,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setEpisodios((prev) => [
          ...prev,
          { id: Date.now(), ...data.episodio },
        ]);
        setForm({ titulo: '', descripcion: '', audio_url: '', imagen_url: '', categoria: '', temporada: '1', numero: '', duracion_seg: '' });
      }
    } catch {
      // silenciar error
    } finally {
      setLoading(false);
    }
  }

  function eliminar(id: number) {
    setEpisodios((prev) => prev.filter((ep) => ep.id !== id));
  }

  function formatDur(seg: number) {
    const m = Math.floor(seg / 60);
    const s = seg % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  const inputStyle = {
    background: 'var(--deep)',
    color: 'var(--parchment)',
    border: '1px solid var(--blood)',
  };

  return (
    <div>
      <h2 className="font-nidex text-xl tracking-wider mb-6" style={{ color: 'var(--gold)' }}>
        Episodios del podcast
      </h2>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
        style={{ background: 'var(--dark)', border: '1px solid var(--blood)' }}
      >
        <h3 className="col-span-full text-sm font-bold tracking-wider mb-1" style={{ color: 'var(--fog)' }}>
          AGREGAR EPISODIO
        </h3>
        {[
          { name: 'titulo', placeholder: 'Título del episodio', required: true },
          { name: 'audio_url', placeholder: 'URL del audio (mp3)', required: true },
          { name: 'imagen_url', placeholder: 'URL de imagen' },
          { name: 'categoria', placeholder: 'Categoría' },
          { name: 'temporada', placeholder: 'Temporada', type: 'number' },
          { name: 'numero', placeholder: 'Número de episodio', type: 'number' },
          { name: 'duracion_seg', placeholder: 'Duración (segundos)', type: 'number' },
        ].map((f) => (
          <input
            key={f.name}
            name={f.name}
            type={f.type || 'text'}
            placeholder={f.placeholder}
            required={f.required}
            value={(form as Record<string, string>)[f.name]}
            onChange={handleChange}
            className="rounded px-3 py-2 text-sm outline-none"
            style={inputStyle}
          />
        ))}
        <textarea
          name="descripcion"
          placeholder="Descripción del episodio"
          value={form.descripcion}
          onChange={handleChange}
          rows={3}
          className="col-span-full rounded px-3 py-2 text-sm outline-none resize-none"
          style={inputStyle}
        />
        <button
          type="submit"
          disabled={loading}
          className="col-span-full rounded py-3 font-bold tracking-wider text-sm transition-opacity hover:opacity-80 disabled:opacity-50"
          style={{ background: 'var(--blood)', color: 'var(--parchment)' }}
        >
          {loading ? 'Guardando...' : '+ Agregar Episodio'}
        </button>
      </form>

      {/* Lista */}
      <div className="flex flex-col gap-3">
        {episodios.map((ep) => (
          <div
            key={ep.id}
            className="flex items-center justify-between gap-4 rounded-lg px-5 py-4"
            style={{ background: 'var(--dark)', border: '1px solid rgba(139,0,0,0.3)' }}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate" style={{ color: 'var(--parchment)' }}>
                T{ep.temporada}E{ep.numero} — {ep.titulo}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--fog)' }}>
                {ep.categoria} · {formatDur(ep.duracion_seg)}
              </p>
            </div>
            <button
              onClick={() => eliminar(ep.id)}
              className="text-xs px-3 py-1 rounded font-bold flex-shrink-0 transition-opacity hover:opacity-80"
              style={{ background: 'rgba(192,20,42,0.15)', color: 'var(--crimson)', border: '1px solid var(--crimson)' }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Newsletter ──────────────────────────────────────────────────────────

function TabNewsletter() {
  const [subs] = useState<Suscriptor[]>(SUSCRIPTORES_MOCK);

  function exportarCSV() {
    const header = ['Email', 'Nombre', 'Tag', 'Fecha'].join(',');
    const rows = subs.map((s) => [s.email, s.nombre, s.tag, s.fecha].join(','));
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'suscriptores_hdt.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-nidex text-xl tracking-wider" style={{ color: 'var(--gold)' }}>
            Newsletter
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--fog)' }}>
            234 suscriptores totales
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportarCSV}
            className="text-sm px-4 py-2 rounded font-bold transition-opacity hover:opacity-80"
            style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', border: '1px solid var(--gold)' }}
          >
            Exportar CSV
          </button>
          <button
            onClick={() => alert('Función de broadcast próximamente')}
            className="text-sm px-4 py-2 rounded font-bold transition-opacity hover:opacity-80"
            style={{ background: 'var(--blood)', color: 'var(--parchment)' }}
          >
            Enviar Broadcast
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid var(--blood)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--black)', color: 'var(--fog)' }}>
              {['Email', 'Nombre', 'Tag', 'Fecha'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-semibold tracking-wider text-xs uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subs.map((s, i) => (
              <tr
                key={s.email}
                style={{
                  background: i % 2 === 0 ? 'var(--dark)' : 'var(--deep)',
                  borderTop: '1px solid rgba(139,0,0,0.2)',
                }}
              >
                <td className="px-4 py-3" style={{ color: 'var(--parchment)' }}>{s.email}</td>
                <td className="px-4 py-3" style={{ color: 'var(--fog)' }}>{s.nombre}</td>
                <td className="px-4 py-3">
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ background: 'rgba(139,0,0,0.2)', color: 'var(--gold)' }}
                  >
                    {s.tag}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ color: 'var(--fog)' }}>{s.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Tab: Membresías ──────────────────────────────────────────────────────────

function TabMembresias() {
  const [miembros] = useState<Miembro[]>(MIEMBROS_MOCK);

  const tiers = ['Primigenio', 'Cazador', 'Ancestral'];
  const tierColors: Record<string, string> = {
    Primigenio: 'var(--fog)',
    Cazador: 'var(--gold)',
    Ancestral: 'var(--crimson)',
  };

  const conteo = tiers.reduce<Record<string, number>>((acc, t) => {
    acc[t] = miembros.filter((m) => m.tier === t).length;
    return acc;
  }, {});

  return (
    <div>
      <h2 className="font-nidex text-xl tracking-wider mb-6" style={{ color: 'var(--gold)' }}>
        Membresías activas
      </h2>

      {/* Resumen por tier */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {tiers.map((t) => (
          <div
            key={t}
            className="rounded-lg p-4 text-center"
            style={{ background: 'var(--dark)', border: `1px solid ${tierColors[t]}` }}
          >
            <p className="text-2xl font-bold" style={{ color: tierColors[t] }}>
              {conteo[t] || 0}
            </p>
            <p className="text-xs mt-1 font-semibold tracking-wider" style={{ color: 'var(--fog)' }}>
              {t.toUpperCase()}
            </p>
          </div>
        ))}
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid var(--blood)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--black)', color: 'var(--fog)' }}>
              {['Nombre', 'Email', 'Tier', 'Precio', 'Inicio'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-semibold tracking-wider text-xs uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {miembros.map((m, i) => (
              <tr
                key={m.email}
                style={{
                  background: i % 2 === 0 ? 'var(--dark)' : 'var(--deep)',
                  borderTop: '1px solid rgba(139,0,0,0.2)',
                }}
              >
                <td className="px-4 py-3 font-medium" style={{ color: 'var(--parchment)' }}>{m.nombre}</td>
                <td className="px-4 py-3" style={{ color: 'var(--fog)' }}>{m.email}</td>
                <td className="px-4 py-3">
                  <span
                    className="text-xs font-bold"
                    style={{ color: tierColors[m.tier] }}
                  >
                    {m.tier}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ color: 'var(--fog)' }}>{m.precio}</td>
                <td className="px-4 py-3" style={{ color: 'var(--fog)' }}>{m.inicio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────

type Tab = 'relatos' | 'episodios' | 'newsletter' | 'membresias';

const TAB_LABELS: { id: Tab; label: string; badge?: string }[] = [
  { id: 'relatos', label: 'Relatos', badge: '5 nuevos' },
  { id: 'episodios', label: 'Episodios' },
  { id: 'newsletter', label: 'Newsletter' },
  { id: 'membresias', label: 'Membresías' },
];

function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('relatos');

  return (
    <div className="min-h-screen" style={{ background: 'var(--deep)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 px-6 py-4 flex items-center gap-4"
        style={{
          background: 'var(--black)',
          borderBottom: '1px solid var(--blood)',
        }}
      >
        <div
          className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{ background: 'var(--blood)', color: 'var(--parchment)' }}
        >
          HDT
        </div>
        <h1 className="font-nidex tracking-widest text-base sm:text-lg" style={{ color: 'var(--gold)' }}>
          PANEL DE ADMINISTRACIÓN
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-65px)]">
        {/* Sidebar (desktop) / Tabs scroll (mobile) */}
        <nav
          className="lg:w-56 lg:sticky lg:top-[65px] lg:self-start lg:h-[calc(100vh-65px)]
                     flex lg:flex-col overflow-x-auto lg:overflow-x-visible
                     px-4 py-3 lg:px-0 lg:py-6 gap-1 flex-shrink-0"
          style={{
            background: 'var(--dark)',
            borderRight: undefined,
            borderBottom: '1px solid var(--blood)',
          }}
        >
          {/* border-right solo en desktop via inline */}
          <div
            className="hidden lg:flex flex-col gap-1 w-full h-full"
            style={{ borderRight: '1px solid var(--blood)' }}
          >
            {TAB_LABELS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className="w-full text-left px-5 py-3 text-sm font-medium rounded-none transition-colors flex items-center justify-between gap-2"
                style={{
                  background: activeTab === t.id ? 'rgba(139,0,0,0.25)' : 'transparent',
                  color: activeTab === t.id ? 'var(--gold)' : 'var(--fog)',
                  borderLeft: activeTab === t.id ? '3px solid var(--blood)' : '3px solid transparent',
                }}
              >
                <span>{t.label}</span>
                {t.badge && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{ background: 'var(--blood)', color: 'var(--parchment)' }}
                  >
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile tabs */}
          <div className="flex lg:hidden gap-1">
            {TAB_LABELS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className="whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 flex-shrink-0"
                style={{
                  background: activeTab === t.id ? 'var(--blood)' : 'rgba(139,0,0,0.15)',
                  color: activeTab === t.id ? 'var(--parchment)' : 'var(--fog)',
                }}
              >
                {t.label}
                {t.badge && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                    style={{ background: 'rgba(255,255,255,0.2)', color: 'var(--parchment)' }}
                  >
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          {activeTab === 'relatos' && <TabRelatos />}
          {activeTab === 'episodios' && <TabEpisodios />}
          {activeTab === 'newsletter' && <TabNewsletter />}
          {activeTab === 'membresias' && <TabMembresias />}
        </main>
      </div>
    </div>
  );
}

// ─── Page export ──────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [autenticado, setAutenticado] = useState(false);

  if (!autenticado) {
    return <PasswordGate onSuccess={() => setAutenticado(true)} />;
  }

  return <AdminPanel />;
}
