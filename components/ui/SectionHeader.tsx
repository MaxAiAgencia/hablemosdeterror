'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const isCenter = align === 'center'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
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
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: 40, opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
        style={{
          height: '3px',
          backgroundColor: 'var(--blood)',
          borderRadius: '2px',
          flexShrink: 0,
        }}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-base md:text-lg max-w-2xl leading-relaxed"
          style={{ color: 'var(--fog)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
