export async function verifyHcaptcha(token: string | undefined): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET_KEY
  if (!secret) return true // dev sin clave configurada
  if (!token) return false

  const res = await fetch('https://api.hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `response=${encodeURIComponent(token)}&secret=${encodeURIComponent(secret)}`,
  })
  const data = await res.json()
  return data.success === true
}
