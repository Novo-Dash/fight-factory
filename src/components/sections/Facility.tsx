import { useEffect, useRef, useState } from 'react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { TrianglePattern } from '../ui/TrianglePattern'

const features = [
  '3,800 sqft facility',
  'Locker rooms and showers',
  'Family-friendly atmosphere',
  'Comfortable space for beginners',
  'Clean and organized environment',
]

const images = [
  '/images/galeira%202/1.webp',
  '/images/galeira%202/2.webp',
  '/images/galeira%202/3.webp',
  '/images/galeira%202/4.webp',
  '/images/galeira%202/5.webp',
  '/images/galeira%202/6.webp',
  '/images/galeira%202/7.webp',
  '/images/galeira%202/8.webp',
  '/images/galeira%202/9.webp',
]

const track = [...images, ...images]

const CARD_W = 320
const CARD_H = 420
const GAP = 12
const SPEED = 0.5
const JUMP = 340

function FeatureIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
      <circle cx="10" cy="10" r="10" fill="#0A0A0A" fillOpacity="0.1" />
      <path d="M6 10L8.5 12.5L14 7" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Facility() {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const pausedRef = useRef(false)
  pausedRef.current = hovered

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

  function go(dir: 'prev' | 'next') {
    const el = ref.current
    if (!el) return
    pausedRef.current = true
    el.scrollLeft += dir === 'next' ? JUMP : -JUMP
    if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft -= el.scrollWidth / 2
    if (el.scrollLeft < 0) el.scrollLeft += el.scrollWidth / 2
    setTimeout(() => { pausedRef.current = hovered }, 600)
  }

  return (
    <section style={{ background: '#FFFFFF', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <TrianglePattern opacity={0.10} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">

          {/* Left: text */}
          <div className="md:col-span-5">
            <Badge className="mb-4">THE ACADEMY</Badge>
            <h2
              className="text-[#0A0A0A] mb-5"
              style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 'clamp(2rem, 4vw + 0.75rem, 3.5rem)',
                letterSpacing: '0.01em',
                lineHeight: '1.0',
                textTransform: 'uppercase',
              }}
            >
              To start Jiu-Jitsu the right way, you need the right environment.
            </h2>
            <p className="text-[#555555] mb-7" style={{ fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)', lineHeight: '1.65' }}>
              Fight Factory was designed to make beginners feel comfortable from day one, with:
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <FeatureIcon />
                  <span className="text-[#0A0A0A]" style={{ lineHeight: '1.65' }}>{feature}</span>
                </li>
              ))}
            </ul>
            <Button size="md" variant="red" openModal>
              Click for a free trial class →
            </Button>
          </div>

          {/* Right: continuous scroll carousel */}
          <div className="md:col-span-7">
            <div style={{ position: 'relative' }}>

              {/* Fade edges */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                background: 'linear-gradient(90deg, #fff 0%, transparent 12%, transparent 88%, #fff 100%)',
              }} />

              {/* Prev */}
              <button
                onClick={() => go('prev')}
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 5, width: 44, height: 44, borderRadius: '50%', background: '#fff', border: '1.5px solid #e0e0e0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'inherit' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>

              {/* Next */}
              <button
                onClick={() => go('next')}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 5, width: 44, height: 44, borderRadius: '50%', background: '#fff', border: '1.5px solid #e0e0e0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'inherit' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>

              {/* Scrollable track */}
              <div
                ref={ref}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: GAP,
                  overflowX: 'auto',
                  scrollbarWidth: 'none',
                  width: '100%',
                  height: CARD_H,
                }}
                className="[&::-webkit-scrollbar]:hidden"
              >
                {track.map((src, i) => (
                  <div key={i} style={{ flexShrink: 0, width: CARD_W, height: CARD_H, borderRadius: 14, overflow: 'hidden', background: '#eee' }}>
                    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
