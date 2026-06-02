import { useEffect, useRef, useState } from 'react'
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

export function Facility() {
  const [current, setCurrent] = useState(0)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const total = images.length
  const pausedRef = useRef(false)

  function pause() {
    pausedRef.current = true
    setTimeout(() => { pausedRef.current = false }, 4000)
  }

  function prev() { pause(); setCurrent(i => (i - 1 + total) % total) }
  function next() { pause(); setCurrent(i => (i + 1) % total) }

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) setCurrent(i => (i + 1) % total)
    }, 3000)
    return () => clearInterval(id)
  }, [total])

  return (
    <>
      <style>{`@keyframes facilityFade { from { opacity: 0.5; } to { opacity: 1; } }`}</style>
      <section style={{ background: '#FFFFFF', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        <TrianglePattern opacity={0.10} />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-stretch">

            {/* LEFT: text */}
            <div className="md:col-span-5 flex flex-col justify-center">
              <h2 className="text-[#0A0A0A] mb-5" style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(2rem, 4vw + 0.75rem, 3.5rem)', letterSpacing: '0.01em', lineHeight: '1.0', textTransform: 'uppercase' }}>
                To start Jiu-Jitsu the right way, you need the right environment.
              </h2>
              <p className="text-[#555555] mb-7" style={{ fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)', lineHeight: '1.65' }}>
                Fight Factory was designed to make beginners feel comfortable from day one, with:
              </p>
              <ul className="flex flex-col gap-2 mb-8">
                {features.map((feature, i) => (
                  <li key={feature} className="flex items-center gap-4 px-3 py-3 cursor-default"
                    style={{ borderRadius: '12px', background: hoveredIdx === i ? '#CC0000' : 'transparent', transition: 'background 0.2s ease' }}
                    onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <div className="shrink-0 flex items-center justify-center rounded-full"
                      style={{ width: 36, height: 36, minWidth: 36, background: hoveredIdx === i ? '#FFFFFF' : '#CC0000', transition: 'background 0.2s ease' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8.5L6.5 12L13 5" stroke={hoveredIdx === i ? '#CC0000' : '#FFFFFF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }} />
                      </svg>
                    </div>
                    <span style={{ lineHeight: '1.45', fontWeight: 500, color: hoveredIdx === i ? '#FFFFFF' : '#0A0A0A', transition: 'color 0.2s ease', fontSize: '0.9375rem' }}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="md" variant="red" openModal>
                Click for a free trial class →
              </Button>
            </div>

            {/* RIGHT: photo carousel */}
            <div className="md:col-span-7" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', flex: 1, minHeight: 420, boxShadow: '0 16px 56px rgba(0,0,0,0.14)', background: '#1c1c1c' }}>
                <img
                  key={current}
                  src={images[current]}
                  alt={`facility ${current + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: 'facilityFade 0.4s ease' }}
                  loading="lazy"
                />

                {/* Left arrow */}
                <button onClick={prev}
                  style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.15)', transition: 'background 0.2s', zIndex: 2 }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>

                {/* Right arrow */}
                <button onClick={next}
                  style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.15)', transition: 'background 0.2s', zIndex: 2 }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>

                {/* Dots */}
                <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 2 }}>
                  {images.map((_, i) => (
                    <button key={i} onClick={() => { pause(); setCurrent(i) }}
                      style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 999, background: i === current ? '#CC0000' : 'rgba(255,255,255,0.6)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
                  ))}
                </div>

                {/* Counter */}
                <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', borderRadius: 999, zIndex: 2 }}>
                  {current + 1} / {total}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
