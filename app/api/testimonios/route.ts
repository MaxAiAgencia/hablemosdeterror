import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      nombre,
      email,
      ciudad,
      titulo_testimonio,
      categoria,
      es_real,
      contenido,
    } = body as {
      nombre?: string
      email?: string
      ciudad?: string
      titulo_testimonio?: string
      categoria?: string
      es_real?: boolean
      contenido?: string
    }

    if (!nombre || !email || !titulo_testimonio || !contenido) {
      return NextResponse.json(
        { success: false, message: 'Faltan campos requeridos: nombre, email, título y contenido.' },
        { status: 400 }
      )
    }

    if (contenido.length < 500) {
      return NextResponse.json(
        { success: false, message: 'El testimonio debe tener al menos 500 caracteres.' },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    // If Supabase env vars are not configured, log and return success
    // so the form doesn't break in local development.
    if (!supabaseUrl || !supabaseKey) {
      console.log('[testimonios] Supabase not configured — testimonio received (not persisted):', {
        nombre,
        email,
        ciudad,
        titulo_testimonio,
        categoria,
        es_real,
        contenido_length: contenido.length,
      })
    } else {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, supabaseKey)

      const { error } = await supabase.from('testimonios').insert({
        nombre,
        email,
        ciudad: ciudad ?? null,
        titulo_testimonio,
        categoria: categoria ?? null,
        es_real: es_real ?? false,
        contenido,
        status: 'pendiente',
        created_at: new Date().toISOString(),
      })

      if (error) {
        console.error('[testimonios] Supabase error:', error)
        return NextResponse.json(
          { success: false, message: 'Error al guardar el testimonio. Intenta de nuevo.' },
          { status: 500 }
        )
      }
    }

    // Send email notification via Resend (optional)
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      try {
        const preview = contenido.slice(0, 300) + (contenido.length > 300 ? '...' : '')
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Hablemos de Terror <noreply@hablemosdeterror.com>',
            to: 'max.sosadiaz@gmail.com',
            subject: `Nuevo testimonio: ${titulo_testimonio}`,
            html: `
              <h2>Nuevo testimonio recibido</h2>
              <p><strong>Nombre:</strong> ${nombre}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Ciudad:</strong> ${ciudad ?? 'No especificada'}</p>
              <p><strong>Título:</strong> ${titulo_testimonio}</p>
              <p><strong>Categoría:</strong> ${categoria ?? 'No especificada'}</p>
              <p><strong>Tipo:</strong> ${es_real ? 'Experiencia real' : 'Ficción'}</p>
              <hr />
              <p><strong>Preview del contenido:</strong></p>
              <p style="white-space: pre-wrap;">${preview}</p>
            `,
          }),
        })
      } catch (emailErr) {
        // Email failure should not block the success response
        console.error('[testimonios] Resend email error:', emailErr)
      }
    } else {
      console.log('[testimonios] Resend not configured — skipping email notification')
    }

    return NextResponse.json({
      success: true,
      message: 'Tu testimonio ha llegado al archivo. Si lo seleccionamos, te avisaremos por email.',
    })
  } catch (err) {
    console.error('[testimonios] Unexpected error:', err)
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor.' },
      { status: 500 }
    )
  }
}
