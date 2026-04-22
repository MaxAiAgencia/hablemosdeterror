import Link from 'next/link'
import { Mic, ExternalLink } from 'lucide-react'

const socialLinks = [
  { label: 'YouTube', href: 'https://youtube.com/@hablemosdeterror', icon: ExternalLink },
  { label: 'Podcast', href: '/podcast', icon: Mic },
]

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--deep)',
        borderTop: '1px solid rgba(139, 0, 0, 0.25)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left column: logo + copyright */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-icon.png"
                alt="Hablemos de Terror"
                style={{
                  width: 40,
                  height: 40,
                  objectFit: 'contain',
                  borderRadius: '50%',
                }}
              />
              <span
                className="font-nidex text-lg tracking-wide"
                style={{ color: 'var(--parchment)' }}
              >
                Hablemos de Terror
              </span>
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: 'var(--muted)' }}
            >
              © 2026 Hablemos de Terror — Efraín Sosa.
              <br />
              Todos los derechos reservados.
            </p>
          </div>

          {/* Right column: social links */}
          <div className="flex flex-col gap-4">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--fog)' }}
            >
              Síguenos
            </p>
            <div className="flex items-center gap-5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="transition-opacity duration-200 hover:opacity-70"
                  style={{ color: 'var(--fog)', cursor: 'crosshair' }}
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
