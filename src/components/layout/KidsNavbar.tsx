import { useEffect, useState } from 'react'
import { useModal } from '../../hooks/useModal'

const NAV_LINKS = [
  { label: 'Programs', href: '#classes' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Coach',   href: '#coach' },
  { label: 'FAQ',     href: '#faq' },
]

export function KidsNavbar() {
  const { openModal } = useModal()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleCTA() {
    openModal()
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'InitiateCheckout')
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        padding: '1rem 0',
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(24px) saturate(200%)',
        WebkitBackdropFilter: 'blur(24px) saturate(200%)',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        transition: 'all 0.35s ease',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between" style={{ gap: '2rem' }}>

        {/* Logo — branca no hero, escura ao scrollar */}
        <a href="/" aria-label="Fight Factory Jiu-Jitsu Kids" className="flex items-center shrink-0" style={{ lineHeight: 0 }}>
          <img
            src="/images/FONTE.webp"
            alt="Fight Factory Jiu-Jitsu"
            style={{
              height: '44px', width: 'auto', display: 'block',
              filter: scrolled ? 'brightness(0)' : 'brightness(0) invert(1)',
              transition: 'filter 0.35s ease',
            }}
          />
        </a>

        {/* Nav links — brancas no hero */}
        <nav className="hidden md:flex items-center" style={{ gap: '2rem' }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                color: scrolled ? '#0A0A0A' : '#FFFFFF',
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.35s ease',
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={handleCTA}
          className="shrink-0 inline-flex items-center gap-2 font-semibold cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] min-h-[40px]"
          style={{
            background: '#CC0000',
            color: '#FFFFFF',
            padding: '0.65rem 1.25rem',
            fontSize: '0.8rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            borderRadius: 6,
          }}
        >
          <span className="hidden sm:inline">Book a Free Trial Class</span>
          <span className="sm:hidden">Free Trial</span>
        </button>

      </div>
    </header>
  )
}


