'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Inicio', href: '/' },
  { label: 'Videos', href: '/videos' },
  { label: 'Podcast', href: '/podcast' },
  { label: 'Testimonios', href: '/testimonios' },
  { label: 'Merch', href: '/merch' },
]

const noctisLink = { label: 'Noctis', href: '/noctis' }

interface NavLinkProps {
  href: string
  children: React.ReactNode
  style?: React.CSSProperties
  onClick?: () => void
  className?: string
}

function NavLink({ href, children, style, onClick, className }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'relative text-sm font-semibold tracking-widest uppercase transition-colors duration-200 hover:opacity-80',
        className
      )}
      style={style}
    >
      {children}
    </Link>
  )
}

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  const closeDrawer = () => setIsOpen(false)

  return (
    <>
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 h-16"
        style={{
          backgroundColor: 'rgba(5, 2, 8, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(139, 0, 0, 0.2)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <img
            src="/images/logo-horizontal.png"
            alt="Hablemos de Terror"
            height={48}
            style={{ height: 48, width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              style={{ color: 'var(--fog)' }}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            href={noctisLink.href}
            style={{ color: '#9333ea' }}
          >
            {noctisLink.label}
          </NavLink>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded"
          style={{ color: 'var(--parchment)', cursor: 'crosshair' }}
          onClick={() => setIsOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu size={22} />
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40"
              style={{ backgroundColor: 'rgba(5, 2, 8, 0.7)' }}
              onClick={closeDrawer}
            />

            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 h-full w-72 z-50 flex flex-col pt-20 pb-10 px-8 gap-8"
              style={{
                backgroundColor: 'var(--deep)',
                borderLeft: '1px solid rgba(139, 0, 0, 0.25)',
              }}
            >
              {/* Close button */}
              <button
                className="absolute top-5 right-5 flex items-center justify-center w-9 h-9"
                style={{ color: 'var(--fog)', cursor: 'crosshair' }}
                onClick={closeDrawer}
                aria-label="Cerrar menú"
              >
                <X size={20} />
              </button>

              {/* Mobile nav links */}
              <nav className="flex flex-col gap-6">
                {links.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    onClick={closeDrawer}
                    className="text-base"
                    style={{ color: 'var(--parchment)' }}
                  >
                    {link.label}
                  </NavLink>
                ))}
                <NavLink
                  href={noctisLink.href}
                  onClick={closeDrawer}
                  className="text-base"
                  style={{ color: '#9333ea' }}
                >
                  {noctisLink.label}
                </NavLink>
              </nav>

              {/* Logo in drawer */}
              <div className="mt-auto">
                <img
                  src="/images/logo-icon.png"
                  alt="HDT"
                  style={{ width: 40, height: 40, objectFit: 'contain', opacity: 0.5 }}
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
