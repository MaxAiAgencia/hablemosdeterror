'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Episode {
  id: string
  titulo: string
  audio_url: string
  imagen_url?: string
  duracion_seg?: number
  numero?: number
}

interface PlayerState {
  episode: Episode | null
  isPlaying: boolean
  currentTime: number
  volume: number
  queue: Episode[]
  play: (episode: Episode) => void
  pause: () => void
  resume: () => void
  toggle: () => void
  setCurrentTime: (time: number) => void
  setVolume: (volume: number) => void
  setQueue: (episodes: Episode[]) => void
  next: () => void
  prev: () => void
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      episode: null,
      isPlaying: false,
      currentTime: 0,
      volume: 0.8,
      queue: [],

      play: (episode) => set({ episode, isPlaying: true, currentTime: 0 }),

      pause: () => set({ isPlaying: false }),

      resume: () => set({ isPlaying: true }),

      toggle: () => set((s) => ({ isPlaying: !s.isPlaying })),

      setCurrentTime: (time) => set({ currentTime: time }),

      setVolume: (volume) => set({ volume }),

      setQueue: (episodes) => set({ queue: episodes }),

      next: () => {
        const { episode, queue } = get()
        if (!episode || queue.length === 0) return
        const idx = queue.findIndex((e) => e.id === episode.id)
        if (idx < queue.length - 1) set({ episode: queue[idx + 1], isPlaying: true, currentTime: 0 })
      },

      prev: () => {
        const { episode, queue } = get()
        if (!episode || queue.length === 0) return
        const idx = queue.findIndex((e) => e.id === episode.id)
        if (idx > 0) set({ episode: queue[idx - 1], isPlaying: true, currentTime: 0 })
      },
    }),
    {
      name: 'hdt-player',
      partialize: (s) => ({ episode: s.episode, currentTime: s.currentTime, volume: s.volume }),
    }
  )
)
