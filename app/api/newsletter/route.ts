import { NextRequest, NextResponse } from 'next/server'
import { verifyHcaptcha } from '@/lib/hcaptcha'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, nombre, tag, hcaptchaToken } = body as {
      email?: string
      nombre?: string
      tag?: string
      hcaptchaToken?: string
    }

    const captchaOk = await verifyHcaptcha(hcaptchaToken)
    if (!captchaOk) {
      return NextResponse.json(
        { success: false, message: 'Verificación de seguridad fallida. Intenta de nuevo.' },
        { status: 400 }
      )
    }

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'El email es requerido.' },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    // If Supabase env vars are not configured, skip the insert
    // and return success so the UI doesn't break in development.
    if (!supabaseUrl || !supabaseKey) {
      console.log('[newsletter] Supabase not configured — skipping insert:', {
        email,
        nombre,
        tag,
      })
      return NextResponse.json({
        success: true,
        message: 'Suscripción registrada correctamente.',
      })
    }

    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { error } = await supabase.from('newsletter_subs').insert({
      email,
      nombre: nombre ?? null,
      ...(tag ? { tag } : {}),
      created_at: new Date().toISOString(),
    })

    if (error) {
      // Unique constraint violation — already subscribed
      if (error.code === '23505') {
        return NextResponse.json({
          success: true,
          message: 'Ya estás suscrito. ¡Gracias!',
        })
      }
      console.error('[newsletter] Supabase error:', error)
      return NextResponse.json(
        { success: false, message: 'Error al guardar la suscripción.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Suscripción registrada correctamente.',
    })
  } catch (err) {
    console.error('[newsletter] Unexpected error:', err)
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor.' },
      { status: 500 }
    )
  }
}
