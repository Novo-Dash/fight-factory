import { useEffect, useRef } from 'react'
import { Button } from '../ui/Button'

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: any = null

    async function initGsap() {
      const { gsap } = await import('gsap')
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      ctx = gsap.context(() => {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 }
        )
      })
    }

    initGsap()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: '72px' }}
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/videos/1.webm" type="video/webm" />
      </video>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.60)', zIndex: 1 }}
      />

      {/* Content — centered */}
      <div
        ref={contentRef}
        className="relative flex flex-col items-center text-center w-full max-w-5xl mx-auto px-4 md:px-8 py-20 opacity-0"
        style={{ zIndex: 2 }}
      >
        <h1
          className="text-white mb-5"
          style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw + 0.5rem, 4.75rem)',
            letterSpacing: '0.01em',
            lineHeight: '1.05',
            textTransform: 'uppercase',
          }}
        >
          Start Jiu-Jitsu<br />feeling confident from<br />your very first class.
        </h1>

        <p
          className="mb-8 max-w-xl"
          style={{
            color: 'rgba(255,255,255,0.78)',
            fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
            lineHeight: '1.65',
          }}
        >
          Fight Factory helps beginners of all ages and fitness levels in Austin train with confidence from day one through a unique onboarding system, designed to make your first steps feel the best.
        </p>

        {/* Micro-stats */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8 text-sm"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          <span className="flex items-center gap-1.5">
            <span className="text-white font-semibold">250+</span> Students
          </span>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L8.545 5.09H13L9.545 7.59L10.91 12L7 9.41L3.09 12L4.455 7.59L1 5.09H5.455L7 1Z" fill="#FBBC04" />
            </svg>
            <span className="text-white font-semibold">5.0</span> Google
          </span>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
          <span className="flex items-center gap-1.5">
            <span className="text-white font-semibold">30+</span> Years on the Mats
          </span>
        </div>

        <Button size="lg" variant="red" openModal className="text-base">
          Book a Free Trial Class →
        </Button>
      </div>
    </section>
  )
}
