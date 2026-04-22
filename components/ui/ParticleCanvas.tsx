'use client'

import { useRef, useEffect } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  size: number
  type: 'blood' | 'fog'
}

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height + height * 0.2,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -(Math.random() * 0.4 + 0.1),
    opacity: Math.random() * 0.35 + 0.05,
    size: Math.random() * 3 + 1,
    type: Math.random() < 0.3 ? 'blood' : 'fog',
  }
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const count = isMobile ? 40 : 80

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener('resize', resize)

    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(canvas.width, canvas.height)
    )

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.opacity -= 0.0003

        if (p.y < -20 || p.opacity <= 0) {
          const fresh = createParticle(canvas.width, canvas.height)
          fresh.y = canvas.height + 10
          Object.assign(p, fresh)
        }

        const color =
          p.type === 'blood'
            ? `rgba(139, 0, 0, ${p.opacity})`
            : `rgba(184, 168, 152, ${p.opacity})`

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      })

      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current)
      }
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}
