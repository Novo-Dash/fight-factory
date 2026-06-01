import { useModal } from '../../hooks/useModal'
import { TrianglePattern } from '../ui/TrianglePattern'

const benefits = [
  'Learn fundamentals',
  'Train in a welcoming environment',
  'Dedicated instructor during your first classes',
  'No experience or athletic background required',
  'Build confidence before joining advanced groups',
]

export function WhyBeginners() {
  const { openModal } = useModal()

  return (
    <section style={{ background: '#FFFFFF', padding: '96px 0', overflow: 'hidden', position: 'relative' }}>
      <TrianglePattern opacity={0.10} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">

          {/* Left — content */}
          <div>

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div style={{ width: 28, height: 2, background: '#0A0A0A', borderRadius: 9999 }} />
              <span style={{
                fontFamily: 'Inter Variable, Inter, sans-serif',
                fontSize: '0.6875rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: '#888888',
              }}>
                Why Fight Factory
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 'clamp(2rem, 3.5vw + 0.5rem, 3.25rem)',
                letterSpacing: '0.01em',
                lineHeight: '1.05',
                textTransform: 'uppercase',
                color: '#0A0A0A',
              }}
              className="mb-6"
            >
              Why do beginners choose Fight Factory?
            </h2>

            <p style={{ color: '#666666', fontSize: '1rem', lineHeight: '1.8' }} className="mb-8">
              Fight Factory offers a beginner onboarding system unique in Austin: you start with 5 introductory classes in a separate group from the regular classes, designed to build confidence in your first steps:
            </p>

            {/* Benefits list */}
            <ul className="mb-10 flex flex-col" style={{ borderTop: '1px solid #E4E4E4' }}>
              {benefits.map((b, i) => (
                <li
                  key={b}
                  className="flex items-center gap-4 py-3.5"
                  style={{ borderBottom: '1px solid #E4E4E4' }}
                >
                  <span style={{
                    fontFamily: 'Anton, sans-serif',
                    fontSize: '0.7rem',
                    letterSpacing: '0.05em',
                    color: '#CCCCCC',
                    minWidth: '1.75rem',
                  }}>
                    0{i + 1}
                  </span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
                    <circle cx="9" cy="9" r="9" fill="#0A0A0A" />
                    <path d="M5.5 9.25L7.5 11.5L12.5 6.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ color: '#1A1A1A', fontSize: '0.9375rem', fontWeight: 500 }}>{b}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full hover:scale-[1.02] hover:bg-[#B30000] transition-all duration-200 cursor-pointer"
              style={{
                background: '#CC0000',
                fontSize: '0.9375rem',
                boxShadow: '0 4px 20px rgba(204,0,0,0.3)',
              }}
            >
              Book a free trial class
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

          </div>

          {/* Right — image card */}
          <div className="flex justify-center items-center">
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
                border: '1px solid rgba(0,0,0,0.08)',
                width: '100%',
                maxWidth: '480px',
                aspectRatio: '4/5',
              }}
            >
              <img
                src="/images/9.webp"
                alt="Fight Factory Jiu-Jitsu"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
