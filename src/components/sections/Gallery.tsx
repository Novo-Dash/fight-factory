import { useRef, useEffect, useState } from 'react'

const items = [
  { src: '/images/galeria/1.webp',  w: 420 },
  { src: '/images/galeria/3.webp',  w: 460 },
  { src: '/images/galeria/4.webp',  w: 360 },
  { src: '/images/galeria/5.webp',  w: 400 },
  { src: '/images/galeria/6.webp',  w: 320 },
  { src: '/images/galeria/7.webp',  w: 440 },
  { src: '/images/galeria/8.webp',  w: 380 },
  { src: '/images/galeria/9.webp',  w: 420 },
  { src: '/images/galeria/11.webp', w: 460 },
  { src: '/images/11.webp',         w: 400 },
  { src: '/images/galeria/13.webp', w: 400 },
  { src: '/images/galeria/14.webp', w: 440 },
  { src: '/images/galeria/15.webp', w: 360 },
  { src: '/images/galeria/16.webp', w: 420 },
  { src: '/images/galeria/17.webp', w: 380 },
  { src: '/images/galeria/18.webp', w: 460 },
  { src: '/images/galeria/19.webp', w: 340 },
  { src: '/images/galeria/20.webp', w: 420 },
  { src: '/images/galeria/21.webp', w: 360 },
]

const track = [...items, ...items]
const H = 360
const GAP = 12
const SPEED = 0.6
const JUMP = 440

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const pausedRef = useRef(false)
  pausedRef.current = hovered

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const t = el
    let id: number
    function tick() {
      if (!pausedRef.current) {
        t.scrollLeft += SPEED
        if (t.scrollLeft >= t.scrollWidth / 2) t.scrollLeft = 0
      }
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])

  function go(dir: 'prev' | 'next') {
    const el = ref.current
    if (!el) return
    pausedRef.current = true
    const track = el
    const start = track.scrollLeft
    const distance = dir === 'next' ? JUMP : -JUMP
    const duration = 600
    const startTime = performance.now()
    function ease(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
    function animate(now: number) {
      const t = Math.min((now - startTime) / duration, 1)
      track.scrollLeft = start + distance * ease(t)
      if (t < 1) requestAnimationFrame(animate)
      else setTimeout(() => { pausedRef.current = hovered }, 200)
    }
    requestAnimationFrame(animate)
  }

  return (
    <section style={{ background: '#FFFFFF', padding: '64px 0' }}>

      {/* Scrollable track with fade */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(90deg, #fff 0%, transparent 10%, transparent 90%, #fff 100%)',
        }} />
        <div
          ref={ref}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ display: 'flex', alignItems: 'center', gap: GAP, overflowX: 'auto', width: '100%', scrollbarWidth: 'none' }}
          className="[&::-webkit-scrollbar]:hidden"
        >
          {track.map((item, i) => (
            <div key={i} style={{ flexShrink: 0, width: item.w, height: H, borderRadius: 14, overflow: 'hidden', background: '#eee' }}>
              <img src={item.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Nav buttons — igual ao Testimonials */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => go('prev')}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#F0F0F0] cursor-pointer"
          style={{ border: '1px solid #D8D8D8' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="#0A0A0A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          onClick={() => go('next')}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#F0F0F0] cursor-pointer"
          style={{ border: '1px solid #D8D8D8' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="#0A0A0A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

    </section>
  )
}
