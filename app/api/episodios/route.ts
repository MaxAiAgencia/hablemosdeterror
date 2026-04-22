import { NextRequest, NextResponse } from 'next/server';

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface EpisodioInput {
  titulo: string;
  descripcion?: string;
  audio_url: string;
  imagen_url?: string;
  categoria?: string;
  temporada?: number;
  numero?: number;
  duracion_seg?: number;
  transcripcion?: string;
}

// ─── Mock data (fallback sin Supabase) ────────────────────────────────────────

const EPISODIOS_FALLBACK = [
  {
    id: '1',
    titulo: 'La Llorona: Origen y misterio',
    descripcion: 'Exploramos los orígenes de la leyenda más aterradora de México.',
    audio_url: 'https://audio.hablemosdeterror.com/ep001.mp3',
    imagen_url: 'https://img.hablemosdeterror.com/ep001.jpg',
    categoria: 'Leyendas',
    temporada: 1,
    numero: 1,
    duracion_seg: 3240,
    transcripcion: null,
    publicado_at: '2026-01-10T20:00:00Z',
    created_at: '2026-01-09T12:00:00Z',
  },
  {
    id: '2',
    titulo: 'Casas embrujadas: Historias reales',
    descripcion: 'Tres familias comparten sus experiencias en casas con presencias.',
    audio_url: 'https://audio.hablemosdeterror.com/ep002.mp3',
    imagen_url: 'https://img.hablemosdeterror.com/ep002.jpg',
    categoria: 'Paranormal',
    temporada: 1,
    numero: 2,
    duracion_seg: 4100,
    transcripcion: null,
    publicado_at: '2026-01-17T20:00:00Z',
    created_at: '2026-01-16T12:00:00Z',
  },
  {
    id: '3',
    titulo: 'El Chupacabras: ¿mito o realidad?',
    descripcion: 'Investigamos los avistamientos más escalofriantes del Chupacabras.',
    audio_url: 'https://audio.hablemosdeterror.com/ep003.mp3',
    imagen_url: 'https://img.hablemosdeterror.com/ep003.jpg',
    categoria: 'Criaturas',
    temporada: 1,
    numero: 3,
    duracion_seg: 3780,
    transcripcion: null,
    publicado_at: '2026-01-24T20:00:00Z',
    created_at: '2026-01-23T12:00:00Z',
  },
];

// ─── Helper: inicializar Supabase si está disponible ──────────────────────────

async function getSupabaseClient() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) return null;

    const { createClient } = await import('@supabase/supabase-js');
    return createClient(supabaseUrl, supabaseKey);
  } catch {
    return null;
  }
}

// ─── GET /api/episodios ───────────────────────────────────────────────────────

export async function GET() {
  const supabase = await getSupabaseClient();

  if (!supabase) {
    return NextResponse.json({ episodios: EPISODIOS_FALLBACK, source: 'mock' });
  }

  const { data, error } = await supabase
    .from('episodios')
    .select('*')
    .order('temporada', { ascending: true })
    .order('numero', { ascending: true });

  if (error) {
    console.error('[GET /api/episodios] Supabase error:', error.message);
    return NextResponse.json(
      { error: 'Error al obtener episodios', detail: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ episodios: data, source: 'supabase' });
}

// ─── POST /api/episodios ──────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  let body: EpisodioInput;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 });
  }

  if (!body.titulo || !body.audio_url) {
    return NextResponse.json(
      { error: 'Los campos titulo y audio_url son requeridos' },
      { status: 400 }
    );
  }

  const supabase = await getSupabaseClient();

  if (!supabase) {
    // Mock: devolver el episodio con id simulado
    const episodioMock = {
      id: crypto.randomUUID(),
      titulo: body.titulo,
      descripcion: body.descripcion ?? null,
      audio_url: body.audio_url,
      imagen_url: body.imagen_url ?? null,
      categoria: body.categoria ?? null,
      temporada: body.temporada ?? 1,
      numero: body.numero ?? 0,
      duracion_seg: body.duracion_seg ?? 0,
      transcripcion: body.transcripcion ?? null,
      publicado_at: null,
      created_at: new Date().toISOString(),
    };

    return NextResponse.json(
      { episodio: episodioMock, source: 'mock' },
      { status: 201 }
    );
  }

  const { data, error } = await supabase
    .from('episodios')
    .insert({
      titulo: body.titulo,
      descripcion: body.descripcion ?? null,
      audio_url: body.audio_url,
      imagen_url: body.imagen_url ?? null,
      categoria: body.categoria ?? null,
      temporada: body.temporada ?? 1,
      numero: body.numero ?? 0,
      duracion_seg: body.duracion_seg ?? 0,
      transcripcion: body.transcripcion ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error('[POST /api/episodios] Supabase error:', error.message);
    return NextResponse.json(
      { error: 'Error al insertar episodio', detail: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ episodio: data, source: 'supabase' }, { status: 201 });
}
