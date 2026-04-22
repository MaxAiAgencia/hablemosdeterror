'use client'

import { motion, type Transition } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: Variant
  size?: Size
  children: React.ReactNode
  onClick?: () => void
  href?: string
  disabled?: boolean
  className?: string
}

const variantStyles: Record<Variant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--blood)',
    color: 'var(--parchment)',
    border: '1px solid transparent',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--gold)',
    border: '1px solid var(--gold)',
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'var(--parchment)',
    border: '1px solid var(--blood)',
  },
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  disabled = false,
  className,
}: ButtonProps) {
  const baseClass = cn(
    'inline-flex items-center justify-center gap-2 font-semibold tracking-wide rounded transition-colors duration-200 select-none',
    sizeStyles[size],
    disabled && 'opacity-40 pointer-events-none',
    className
  )

  const transition: Transition = { duration: 0.15 }
  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition,
  }

  const style: React.CSSProperties = {
    ...variantStyles[variant],
    cursor: 'crosshair',
  }

  if (href) {
    return (
      <motion.div {...motionProps} style={{ display: 'inline-block' }}>
        <Link href={href} className={baseClass} style={style}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
      style={style}
    >
      {children}
    </motion.button>
  )
}
