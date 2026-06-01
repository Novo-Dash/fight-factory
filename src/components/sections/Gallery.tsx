import { useRef, useState, useEffect } from 'react'

const items = [
  { src: '/images/galeria/1.webp',  width: 420 },
  { src: '/images/galeria/2.webp',  width: 340 },
  { src: '/images/galeria/3.webp',  width: 460 },
  { src: '/images/galeria/4.webp',  width: 360 },
  { src: '/images/galeria/5.webp',  width: 400 },
  { src: '/images/galeria/6.webp',  width: 320 },
  { src: '/images/galeria/7.webp',  width: 440 },
  { src: '/images/galeria/8.webp',  width: 380 },
  { src: '/images/galeria/9.webp',  width: 420 },
  { src: '/images/galeria/11.webp', width: 460 },
  { src: '/images/galeria/13.webp', width: 400 },
  { src: '/images/galeria/14.webp', width: 440 },
  { src: '/images/galeria/15.webp', width: 360 },
  { src: '/images/galeria/16.webp', width: 420 },
  { src: '/images/galeria/17.webp', width: 380 },
  { src: '/images/galeria/18.webp', width: 460 },
  { src: '/images/galeria/19.webp', width: 340 },
  { src: '/images/galeria/20.webp', width: 420 },
  { src: '/images/galeria/21.webp', width: 360 },
  { src: '/images/galeria/22.webp', width: 440 },
  { src: '/images/galeria/23.webp', width: 380 },
  { src: '/images/galeria/24.webp', width: 400 },
  { src: '/images/galeria/25.webp', width: 350 },
]

const CARD_H = 360
const GAP = 12
const STEP = 420 + GAP

export function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function scroll(dir: 'prev' | 'next') {
    setPaused(true)
    trackRef.current?.scrollBy({ left: dir === 'next' ? STEP : -STEP, behavior: 'smooth' })
  }

  // Auto-scroll when not paused
  useEffect(() => {
    if (paused) return
    autoRef.current = setInterval(() => {
      const el = trackRef.current
      if (!el) return
      const maxScroll = el.scrollWidth - el.clientWidth
      if (el.scrollLeft >= maxScroll - 2) {
        el.scrollLeft = 0
      } else {
        el.scrollBy({ left: STEP, behavior: 'smooth' })
      }
    }, 2500)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [paused])

  return (
    <section style={{ background: '#FFFFFF', padding: '64px 0', overflow: 'hidden', position: 'relative' }}>
      {/* Fade masks */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(90deg, #FFFFFF 0%, transparent 8%, transparent 92%, #FFFFFF 100%)' }} />

      {/* Prev button */}
      <button
        onClick={() => scroll('prev')}
        style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 3, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(0,0,0,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.12)', transition: 'all 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.color = 'inherit' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {/* Next button */}
      <button
        onClick={() => scroll('next')}
        style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 3, width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(0,0,0,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.12)', transition: 'all 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.color = 'inherit' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ display: 'flex', gap: GAP, overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingLeft: 48, paddingRight: 48, scrollBehavior: 'smooth' }}
        className="[&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div key={i} style={{ width: item.width, height: CARD_H, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
            <img src={item.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  )
}
