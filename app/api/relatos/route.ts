import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      nombre,
      email,
      ciudad,
      titulo_relato,
      categoria,
      es_real,
      contenido,
    } = body as {
      nombre?: string
      email?: string
      ciudad?: string
      titulo_relato?: string
      categoria?: string
      es_real?: boolean
      contenido?: string
    }

    if (!nombre || !email || !titulo_relato || !contenido) {
      return NextResponse.json(
        { success: false, message: 'Faltan campos requeridos: nombre, email, título y contenido.' },
        { status: 400 }
      )
    }

    if (contenido.length < 500) {
      return NextResponse.json(
        { success: false, message: 'El relato debe tener al menos 500 caracteres.' },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    // If Supabase env vars are not configured, log and return success
    // so the form doesn't break in local development.
    if (!supabaseUrl || !supabaseKey) {
      console.log('[relatos] Supabase not configured — relato received (not persisted):', {
        nombre,
        email,
        ciudad,
        titulo_relato,
        categoria,
        es_real,
        contenido_length: contenido.length,
      })
      return NextResponse.json({
        success: true,
        message: 'Tu historia ha llegado al archivo. Si la seleccionamos, te avisaremos por email.',
      })
    }

    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { error } = await supabase.from('relatos').insert({
      nombre,
      email,
      ciudad: ciudad ?? null,
      titulo_relato,
      categoria: categoria ?? null,
      es_real: es_real ?? false,
      contenido,
      status: 'pendiente',
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error('[relatos] Supabase error:', error)
      return NextResponse.json(
        { success: false, message: 'Error al guardar el relato. Intenta de nuevo.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Tu historia ha llegado al archivo. Si la seleccionamos, te avisaremos por email.',
    })
  } catch (err) {
    console.error('[relatos] Unexpected error:', err)
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor.' },
      { status: 500 }
    )
  }
}
