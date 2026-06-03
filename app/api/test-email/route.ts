import { NextResponse } from 'next/server'

export async function GET() {
  const gmailUser = process.env.GMAIL_USER
  const gmailPass = process.env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailPass) {
    return NextResponse.json({
      ok: false,
      error: 'Variables de entorno no encontradas',
      GMAIL_USER: gmailUser ?? 'FALTA',
      GMAIL_APP_PASSWORD: gmailPass ? 'OK (tiene valor)' : 'FALTA',
    })
  }

  try {
    const nodemailer = await import('nodemailer')
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailPass },
    })

    await transporter.verify()

    await transporter.sendMail({
      from: `Test HdT <${gmailUser}>`,
      to: gmailUser,
      subject: 'Test email - Hablemos de Terror',
      text: 'Si ves este correo, el envío por Gmail funciona correctamente.',
    })

    return NextResponse.json({ ok: true, message: `Email enviado a ${gmailUser}` })
  } catch (err: unknown) {
    return NextResponse.json({
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    })
  }
}
