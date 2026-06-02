import { useState, useEffect, useRef } from 'react'
import { Button } from '../ui/Button'
import { TrianglePattern } from '../ui/TrianglePattern'
import { useModal } from '../../hooks/useModal'

const steps = [
  {
    number: '01',
    title: 'Step 1',
    text: 'Click the button and fill out the form.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="8" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.85)" />
        <rect x="6" y="16" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.85)" />
        <rect x="6" y="24" width="14" height="3" rx="1.5" fill="rgba(255,255,255,0.85)" />
        <circle cx="27" cy="25.5" r="3.5" fill="#CC0000" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Step 2',
    text: 'Choose your class type and pick a date & time on the calendar.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="5" y="8" width="26" height="22" rx="3" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
        <rect x="5" y="8" width="26" height="8" rx="3" fill="rgba(255,255,255,0.2)" />
        <circle cx="11" cy="22" r="2" fill="rgba(255,255,255,0.6)" />
        <circle cx="18" cy="22" r="2" fill="rgba(255,255,255,0.6)" />
        <circle cx="25" cy="22" r="2" fill="#CC0000" />
        <circle cx="11" cy="28" r="2" fill="rgba(255,255,255,0.6)" />
        <circle cx="18" cy="28" r="2" fill="rgba(255,255,255,0.6)" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Step 3',
    text: "You'll get email and SMS confirmations with all the details.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="10" width="28" height="20" rx="3" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
        <path d="M4 13l14 9 14-9" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="27" cy="11" r="4" fill="#CC0000" />
      </svg>
    ),
  },
]

export function Process() {
  const { openModal } = useModal()
  const [hovered, setHovered] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    let ctx: any = null
    async function initGsap() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      ctx = gsap.context(() => {
        gsap.fromTo(headerRef.current, { opacity: 0, x: -40 }, {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
        })
        rowsRef.current.forEach((row, i) => {
          if (!row) return
          gsap.fromTo(row, { opacity: 0, x: -50 }, {
            opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', delay: i * 0.1,
            scrollTrigger: { trigger: row, start: 'top 88%', once: true },
          })
        })
      }, sectionRef)
    }
    initGsap()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'linear-gradient(160deg, #222222 0%, #1a1a1a 40%, #111111 100%)',
        padding: '112px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Triangle pattern */}
      <TrianglePattern color="#FFFFFF" opacity={0.03} />

      {/* Subtle red glow */}
      <div className="absolute pointer-events-none" style={{
        top: '50%', left: '-150px', transform: 'translateY(-50%)',
        width: '600px', height: '700px',
        background: 'radial-gradient(ellipse, rgba(204,0,0,0.08) 0%, transparent 65%)',
      }} />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>

        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
          style={{ opacity: 0 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 28, height: 2, background: '#CC0000', borderRadius: 9999 }} />
              <span style={{ color: '#CC0000', fontSize: '0.6875rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
                3 Simple Steps
              </span>
            </div>
            <h2 style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(2.25rem, 4vw + 0.5rem, 4rem)',
              letterSpacing: '0.01em', lineHeight: '1.0',
              textTransform: 'uppercase', color: '#FFFFFF',
            }}>
              How to get started?
            </h2>
          </div>
          <Button size="lg" variant="red" openModal className="shrink-0 text-sm whitespace-nowrap">
            Schedule Free Trial Class →
          </Button>
        </div>

        {/* Steps */}
        <div>
          {steps.map((step, i) => {
            const isHovered = hovered === i
            const isLast = i === steps.length - 1
            const red = isLast && isHovered

            return (
              <div
                key={step.number}
                ref={el => { if (el) rowsRef.current[i] = el }}
                onClick={openModal}
                className="flex items-center gap-5 md:gap-10 cursor-pointer"
                style={{
                  padding: '28px 28px',
                  borderRadius: '14px',
                  border: red
                    ? '1px solid rgba(204,0,0,0.6)'
                    : isHovered
                      ? '1px solid rgba(255,255,255,0.22)'
                      : '1px solid rgba(255,255,255,0.1)',
                  background: red
                    ? 'linear-gradient(135deg, #CC0000 0%, #8B0000 100%)'
                    : isHovered
                      ? 'rgba(255,255,255,0.08)'
                      : 'rgba(255,255,255,0.05)',
                  marginBottom: '12px',
                  opacity: 0,
                  transition: 'background 0.35s ease, border-color 0.3s ease, transform 0.3s ease',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Step number */}
                <div className="shrink-0" style={{
                  fontFamily: 'Anton, sans-serif',
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  lineHeight: 1,
                  color: 'transparent',
                  WebkitTextStroke: red ? '1.5px rgba(255,255,255,0.45)' : '1.5px rgba(255,255,255,0.22)',
                  userSelect: 'none',
                  minWidth: 'clamp(52px, 7vw, 88px)',
                  transition: 'all 0.35s ease',
                }}>
                  {step.number}
                </div>

                {/* Icon card */}
                <div className="shrink-0 flex items-center justify-center" style={{
                  width: 72, height: 72,
                  borderRadius: '14px',
                  background: red ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)',
                  border: red ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.1)',
                  transition: 'background 0.35s ease, border-color 0.35s ease',
                }}>
                  {step.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 style={{
                    fontFamily: 'Anton, sans-serif',
                    fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)',
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                    lineHeight: 1.1,
                    marginBottom: '6px',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    color: red ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.55)',
                    fontSize: '0.9375rem',
                    lineHeight: '1.6',
                    maxWidth: '420px',
                    transition: 'color 0.35s ease',
                  }}>
                    {step.text}
                  </p>
                </div>

                {/* Arrow button */}
                <div className="shrink-0 flex items-center justify-center" style={{
                  width: 44, height: 44,
                  borderRadius: '50%',
                  border: red
                    ? '1.5px solid rgba(255,255,255,0.5)'
                    : isHovered
                      ? '1.5px solid rgba(255,255,255,0.35)'
                      : '1.5px solid rgba(255,255,255,0.15)',
                  color: red ? '#FFFFFF' : isHovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
                  transition: 'all 0.3s ease',
                  transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
