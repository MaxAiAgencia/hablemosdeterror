'use client'

export function SpreakerEmbed() {
  return (
    <section className="w-full rounded-xl overflow-hidden border-blood-subtle">
      <iframe
        src="https://widget.spreaker.com/player?show_id=4269158&theme=dark&playlist=show&playlist-continuous=true&chapters-image=true"
        width="100%"
        height="400px"
        title="Hablemos de Terror"
        frameBorder="0"
        style={{ display: 'block' }}
      />
    </section>
  )
}
