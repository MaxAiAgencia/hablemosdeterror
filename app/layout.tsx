import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { MiniPlayer } from '@/components/layout/MiniPlayer'
import NewsletterPopup from '@/components/ui/NewsletterPopup'

export const metadata: Metadata = {
  title: {
    default: 'Hablemos de Terror',
    template: '%s | Hablemos de Terror',
  },
  description: 'El podcast y canal de YouTube de terror en español con Efraín Sosa. 191K+ suscriptores. Historias reales, relatos y mucho más.',
  icons: {
    icon: '/images/calavera.png',
    shortcut: '/images/calavera.png',
    apple: '/images/calavera.png',
  },
  openGraph: {
    title: 'Hablemos de Terror',
    description: 'El podcast de terror en español',
    siteName: 'Hablemos de Terror',
    locale: 'es_MX',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Nav />
        {children}
        <Footer />
        <MiniPlayer />
        <NewsletterPopup />
      </body>
    </html>
  )
}
