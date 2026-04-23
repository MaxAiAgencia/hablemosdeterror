'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeaderProps) {
  const isCenter = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={cn('flex flex-col gap-3', isCenter && 'items-center text-center', className)}
    >
      <h2
        className="font-nidex text-4xl md:text-5xl lg:text-6xl leading-tight"
        style={{ color: 'var(--parchment)' }}
      >
        {title}
      </h2>

      {/* Decorative line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 40 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
        style={{
          height: '3px',
          backgroundColor: 'var(--blood)',
          borderRadius: '2px',
          flexShrink: 0,
        }}
      />

      {subtitle && (
        <p
          className="text-base md:text-lg max-w-2xl leading-relaxed"
          style={{ color: 'var(--fog)' }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
