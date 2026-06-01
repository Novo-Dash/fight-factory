import { useEffect, useState } from 'react'
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

function FeatureIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
      <circle cx="10" cy="10" r="10" fill="#0A0A0A" fillOpacity="0.1" />
      <path d="M6 10L8.5 12.5L14 7" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Facility() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = images.length

  function prev() { setPaused(true); setCurrent(i => (i - 1 + total) % total) }
  function next() { setPaused(true); setCurrent(i => (i + 1) % total) }

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setCurrent(i => (i + 1) % total), 3000)
    return () => clearInterval(id)
  }, [paused, total])

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

          {/* Right: 2-photo carousel */}
          <div className="md:col-span-7 flex flex-col gap-4">

            {/* 2 photos */}
            <div className="grid grid-cols-2 gap-3">
              {[0, 1].map(offset => {
                const src = images[(current + offset) % total]
                const tall = offset === 0
                return (
                  <div
                    key={`${current}-${offset}`}
                    style={{
                      borderRadius: 16,
                      overflow: 'hidden',
                      aspectRatio: tall ? '3/4' : '4/5',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      background: '#1c1c1c',
                      alignSelf: offset === 1 ? 'flex-end' : 'flex-start',
                      transition: 'opacity 0.35s ease',
                    }}
                  >
                    <img
                      src={src}
                      alt={`facility ${(current + offset) % total + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                  </div>
                )
              })}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              {/* Dots */}
              <div className="flex gap-2 items-center">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setPaused(true); setCurrent(i) }}
                    style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 999, background: i === current ? '#0A0A0A' : '#D8D8D8', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #0A0A0A', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'inherit' }}
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  onClick={next}
                  style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #0A0A0A', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'inherit' }}
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
