'use client'

import { cn } from '@/lib/utils'

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <>
      <style>{`
        .glitch-text {
          position: relative;
          display: inline-block;
          animation: glitch 4s infinite;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .glitch-text::before {
          color: var(--crimson);
          animation: glitch-before 4s infinite;
          clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
        }

        .glitch-text::after {
          color: var(--gold);
          animation: glitch-after 4s infinite;
          clip-path: polygon(0 65%, 100% 65%, 100% 80%, 0 80%);
        }

        @keyframes glitch-before {
          0%, 88%, 100% { transform: translate(0); opacity: 0; }
          90% { transform: translate(-3px, 1px); opacity: 0.8; }
          93% { transform: translate(3px, -1px); opacity: 0.6; }
          96% { transform: translate(-1px, 2px); opacity: 0; }
        }

        @keyframes glitch-after {
          0%, 88%, 100% { transform: translate(0); opacity: 0; }
          91% { transform: translate(3px, -2px); opacity: 0.7; }
          94% { transform: translate(-3px, 1px); opacity: 0.5; }
          97% { transform: translate(1px, -1px); opacity: 0; }
        }
      `}</style>
      <span
        className={cn('font-nidex glitch-text', className)}
        data-text={text}
      >
        {text}
      </span>
    </>
  )
}
