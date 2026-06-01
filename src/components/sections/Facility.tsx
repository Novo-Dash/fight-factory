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

function FeatureIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
      <circle cx="10" cy="10" r="10" fill="#0A0A0A" fillOpacity="0.1" />
      <path d="M6 10L8.5 12.5L14 7" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

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

const CARD_W = 420
const CARD_H = 280
const GAP = 16

export function Facility() {
  const doubled = [...images, ...images]
  const totalW = images.length * (CARD_W + GAP)
  const dur = totalW / 55

  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        .marquee-track {
          animation: marquee ${dur}s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

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
              <p
                className="text-[#555555] mb-7"
                style={{ fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)', lineHeight: '1.65' }}
              >
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

            {/* Right: vertical infinite marquee */}
            <div className="md:col-span-7">
              <div
                style={{
                  position: 'relative',
                  height: 520,
                  overflow: 'hidden',
                  borderRadius: 20,
                }}
              >
                {/* Gradient fade top */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: 36,
                  background: 'linear-gradient(to bottom, #ffffff, transparent)',
                  zIndex: 2,
                  pointerEvents: 'none',
                }} />

                {/* Gradient fade bottom */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: 36,
                  background: 'linear-gradient(to top, #ffffff, transparent)',
                  zIndex: 2,
                  pointerEvents: 'none',
                }} />

                {/* Track */}
                <div
                  className="marquee-track"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: GAP,
                  }}
                >
                  {doubled.map((src, i) => (
                    <div
                      key={i}
                      style={{
                        width: '100%',
                        height: CARD_H,
                        borderRadius: 14,
                        overflow: 'hidden',
                        background: '#1c1c1c',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={src}
                        alt={`facility ${(i % images.length) + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
