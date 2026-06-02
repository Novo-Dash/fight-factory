import { useRef, useEffect, useState } from 'react'
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

const facilityItems = [
  { src: '/images/galeira%202/1.webp', w: 420 },
  { src: '/images/galeira%202/2.webp', w: 360 },
  { src: '/images/galeira%202/3.webp', w: 460 },
  { src: '/images/galeira%202/4.webp', w: 380 },
  { src: '/images/galeira%202/5.webp', w: 420 },
  { src: '/images/galeira%202/6.webp', w: 340 },
  { src: '/images/galeira%202/7.webp', w: 440 },
  { src: '/images/galeira%202/8.webp', w: 400 },
  { src: '/images/galeira%202/9.webp', w: 460 },
]

const facilityTrack = [...facilityItems, ...facilityItems]
const H = 360
const GAP = 12
const SPEED = 0.6
const JUMP = 440

function FeatureCard({ text }: { text: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      className="flex items-center gap-2 cursor-default"
      style={{
        background: hov ? '#CC0000' : '#F5F5F5',
        borderRadius: 10,
        padding: '10px 14px',
        border: `1px solid ${hov ? '#CC0000' : '#EBEBEB'}`,
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="shrink-0">
        <circle cx="10" cy="10" r="10" fill={hov ? 'rgba(255,255,255,0.2)' : 'rgba(10,10,10,0.08)'} />
        <path d="M6 10L8.5 12.5L14 7" stroke={hov ? '#fff' : '#0A0A0A'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontSize: '0.8125rem', fontWeight: 500, lineHeight: '1.4', color: hov ? '#fff' : '#0A0A0A', transition: 'color 0.2s ease' }}>
        {text}
      </span>
    </div>
  )
}

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
    const start = el.scrollLeft
    const distance = dir === 'next' ? JUMP : -JUMP
    const duration = 600
    const startTime = performance.now()
    function ease(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
    function animate(now: number) {
      const t = Math.min((now - startTime) / duration, 1)
      el.scrollLeft = start + distance * ease(t)
      if (t < 1) requestAnimationFrame(animate)
      else setTimeout(() => { pausedRef.current = hovered }, 200)
    }
    requestAnimationFrame(animate)
  }

  return (
    <section style={{ background: '#FFFFFF', padding: '24px 0 64px', position: 'relative' }}>
      <TrianglePattern opacity={0.10} />

      {/* Text content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative mb-12" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div>
            <h2 className="text-[#0A0A0A] mb-4" style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2rem, 4vw + 0.75rem, 3.5rem)', letterSpacing: '0.01em', lineHeight: '1.0', textTransform: 'uppercase' }}>
              To start Jiu-Jitsu the right way, you need the right environment.
            </h2>
            <p className="text-[#555555]" style={{ fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)', lineHeight: '1.65' }}>
              Fight Factory was designed to make beginners feel comfortable from day one, with:
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              {features.map((feature) => (
                <FeatureCard key={feature} text={feature} />
              ))}
              <Button size="md" variant="red" openModal className="w-full justify-center">
                Click for a free trial class →
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel — idêntico ao Gallery */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(90deg, #fff 0%, transparent 10%, transparent 90%, #fff 100%)' }} />
        <div
          ref={ref}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ display: 'flex', alignItems: 'center', gap: GAP, overflowX: 'auto', width: '100%', scrollbarWidth: 'none' }}
          className="[&::-webkit-scrollbar]:hidden"
        >
          {facilityTrack.map((item, i) => (
            <div key={i} style={{ flexShrink: 0, width: item.w, height: H, borderRadius: 14, overflow: 'hidden', background: '#eee' }}>
              <img src={item.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Nav buttons — idênticos ao Gallery */}
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
