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
  { src: '/images/galeria/13.webp', w: 400 },
  { src: '/images/galeria/14.webp', w: 440 },
  { src: '/images/galeria/15.webp', w: 360 },
  { src: '/images/galeria/16.webp', w: 420 },
  { src: '/images/galeria/17.webp', w: 380 },
  { src: '/images/galeria/18.webp', w: 460 },
  { src: '/images/galeria/19.webp', w: 340 },
  { src: '/images/galeria/20.webp', w: 420 },
  { src: '/images/galeria/21.webp', w: 360 },
  { src: '/images/11.webp',         w: 400 },
]

// duplicate for seamless loop
const track = [...items, ...items]
const H = 360
const GAP = 12
const SPEED = 0.6 // px per frame
const JUMP = 440  // px per arrow click

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const pausedRef = useRef(false)

  // continuous auto-scroll via rAF
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const track = el
    let id: number
    function tick() {
      if (!pausedRef.current) {
        track.scrollLeft += SPEED
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0
        }
      }
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])

  // sync hover state to ref so rAF reads it without closure issues
  useEffect(() => { pausedRef.current = hovered }, [hovered])

  function go(dir: 'prev' | 'next') {
    const el = ref.current
    if (!el) return
    // pause rAF, jump directly, resume after animation settles
    pausedRef.current = true
    el.scrollLeft += dir === 'next' ? JUMP : -JUMP
    // wrap if needed
    if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft -= el.scrollWidth / 2
    if (el.scrollLeft < 0) el.scrollLeft += el.scrollWidth / 2
    setTimeout(() => { pausedRef.current = hovered }, 600)
  }

  return (
    <section style={{ background: '#FFFFFF', padding: '64px 0' }}>
      <div style={{ position: 'relative' }}>

        {/* Fade edges */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(90deg, #fff 0%, transparent 10%, transparent 90%, #fff 100%)',
        }} />

        {/* Prev arrow */}
        <button
          onClick={() => go('prev')}
          style={{
            position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
            zIndex: 5, width: 48, height: 48, borderRadius: '50%',
            background: '#fff', border: '1.5px solid #ddd', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Next arrow */}
        <button
          onClick={() => go('next')}
          style={{
            position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
            zIndex: 5, width: 48, height: 48, borderRadius: '50%',
            background: '#fff', border: '1.5px solid #ddd', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Track */}
        <div
          ref={ref}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: GAP,
            overflowX: 'auto',
            width: '100%',
            scrollbarWidth: 'none',
          }}
          className="[&::-webkit-scrollbar]:hidden"
        >
          {track.map((item, i) => (
            <div
              key={i}
              style={{ flexShrink: 0, width: item.w, height: H, borderRadius: 14, overflow: 'hidden', background: '#eee' }}
            >
              <img
                src={item.src}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
