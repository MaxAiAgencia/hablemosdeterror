import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black:     '#050208',
        deep:      '#0d0510',
        dark:      '#16091e',
        blood:     '#8b0000',
        crimson:   '#c0142a',
        gold:      '#c9a84c',
        amber:     '#e8a020',
        parchment: '#e8dcc8',
        fog:       '#b8a898',
        muted:     '#5a4a5a',
      },
      fontFamily: {
        nidex:   ['Nidex', 'Impact', 'Arial Black', 'sans-serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'noise': "url('/images/noise.svg')",
      },
      animation: {
        'glitch':    'glitch 4s infinite',
        'float':     'float 6s ease-in-out infinite',
        'pulse-red': 'pulse-red 2s ease-in-out infinite',
        'count-up':  'count-up 1.5s ease-out forwards',
      },
      keyframes: {
        glitch: {
          '0%, 90%, 100%': { transform: 'translate(0)', filter: 'none' },
          '91%': { transform: 'translate(-2px, 1px)', filter: 'brightness(1.2) saturate(2)' },
          '93%': { transform: 'translate(2px, -1px)', filter: 'hue-rotate(90deg)' },
          '95%': { transform: 'translate(-1px, 2px)', filter: 'none' },
          '97%': { transform: 'translate(1px, -1px)', filter: 'brightness(0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-red': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(139, 0, 0, 0.4)' },
          '50%': { boxShadow: '0 0 20px 8px rgba(139, 0, 0, 0.15)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
