import { useState, useRef } from 'react'
import { testimonials } from '../../data/testimonials'
import { TrianglePattern } from '../ui/TrianglePattern'

function getInitials(name: string) {
  const parts = name.replace(/\./g, '').trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function StarFilled() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L9.796 5.879H15L10.854 8.621L12.472 13.5L8 10.677L3.528 13.5L5.146 8.621L1 5.879H6.204L8 1Z" fill="#FBBC04" />
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M11 14L7 9L11 4" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M7 4L11 9L7 14" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const CARD_W = 380
const GAP = 20

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const [current, setCurrent] = useState(0)
  const total = testimonials.length

  function go(dir: 'prev' | 'next') {
    const el = trackRef.current
    if (!el) return
    const newIdx = dir === 'next'
      ? Math.min(current + 1, total - 1)
      : Math.max(current - 1, 0)
    setCurrent(newIdx)
    const start = el.scrollLeft
    const distance = dir === 'next' ? CARD_W + GAP : -(CARD_W + GAP)
    const duration = 500
    const startTime = performance.now()
    const track = el
    function ease(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
    function animate(now: number) {
      const t = Math.min((now - startTime) / duration, 1)
      track.scrollLeft = start + distance * ease(t)
      if (t < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  const prev = () => go('prev')
  const next = () => go('next')

  return (
    <section id="reviews" style={{ background: '#FFFFFF', padding: '96px 0', overflow: 'hidden', position: 'relative' }}>
      <TrianglePattern opacity={0.10} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>

        {/* Title */}
        <div className="text-center mb-6">
          <h5
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(2rem, 5vw + 0.5rem, 4rem)',
              letterSpacing: '0.01em',
              lineHeight: '1.0',
              textTransform: 'uppercase',
            }}
          >
            <span className="text-[#0A0A0A]">What they say About Us</span>
          </h5>
        </div>

        {/* Rating pill */}
        <div className="flex justify-center mb-14">
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
            style={{ border: '1px solid #E0E0E0', background: '#FAFAFA' }}
          >
            <span className="font-bold text-sm text-[#0A0A0A]">Excellent</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <StarFilled key={i} />)}
            </div>
            <span className="text-sm text-[#888888]">5.0 · Google Reviews</span>
          </div>
        </div>

        {/* Scrollable track */}
        <div style={{ position: 'relative', marginBottom: 40 }} onMouseLeave={() => setHovered(null)}>
          <div
            ref={trackRef}
            style={{ display: 'flex', gap: GAP, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}
            className="[&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((t, i) => {
              const isHovered = hovered === i
              const isDimmed = hovered !== null && hovered !== i
              return (
                <div
                  key={t.id}
                  className="flex flex-col justify-between rounded-2xl p-6"
                  style={{
                    flexShrink: 0, width: CARD_W,
                    background: '#FFFFFF',
                    border: isHovered ? '1px solid #D0D0D0' : '1px solid #E8E8E8',
                    boxShadow: isHovered ? '0 8px 40px rgba(0,0,0,0.12)' : '0 1px 4px rgba(0,0,0,0.05)',
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                    opacity: isDimmed ? 0.4 : 1,
                    filter: isDimmed ? 'blur(2px)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.1, 0.64, 1)',
                    minHeight: 220, cursor: 'default',
                  }}
                  onMouseEnter={() => setHovered(i)}
                >
                  <div>
                    <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_, j) => <StarFilled key={j} />)}</div>
                    <p className="text-[#333333]" style={{ fontSize: '0.9375rem', lineHeight: '1.75' }}>"{t.text}"</p>
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-white" style={{ background: t.avatarBg ?? '#4285F4' }}>
                      {getInitials(t.name)}
                    </div>
                    <div>
                      <div className="text-[#0A0A0A] font-semibold text-sm">{t.name}</div>
                      <div className="text-[#AAAAAA] text-xs mt-0.5">{t.timeAgo}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#F0F0F0] cursor-pointer"
            style={{ border: '1px solid #D8D8D8' }}
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = trackRef.current
                  if (!el) return
                  setCurrent(i)
                  const start = el.scrollLeft
                  const target = i * (CARD_W + GAP)
                  const distance = target - start
                  const duration = 500
                  const startTime = performance.now()
                  const tr = el
                  function ease(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
                  function animate(now: number) {
                    const t = Math.min((now - startTime) / duration, 1)
                    tr.scrollLeft = start + distance * ease(t)
                    if (t < 1) requestAnimationFrame(animate)
                  }
                  requestAnimationFrame(animate)
                }}
                className="rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: '10px',
                  height: '10px',
                  background: i === current ? '#0A0A0A' : 'transparent',
                  border: i === current ? 'none' : '1.5px solid #BBBBBB',
                }}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#F0F0F0] cursor-pointer"
            style={{ border: '1px solid #D8D8D8' }}
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        </div>

      </div>
    </section>
  )
}
