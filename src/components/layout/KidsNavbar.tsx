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
    const onScroll = () => setScrolled(window.scrollY > 24)
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
        background: scrolled ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(255,255,255,0.35)',
        boxShadow: '0 1px 24px rgba(0,0,0,0.06)',
        transition: 'background 0.3s ease',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between" style={{ gap: '2rem' }}>

        {/* Logo */}
        <a href="/" aria-label="Fight Factory Jiu-Jitsu Kids" className="flex items-center shrink-0" style={{ lineHeight: 0 }}>
          <img
            src="/images/FONTE.webp"
            alt="Fight Factory Jiu-Jitsu"
            style={{ height: '44px', width: 'auto', display: 'block', filter: 'brightness(0)' }}
          />
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center" style={{ gap: '2rem' }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="nav-link"
              style={{ color: '#0A0A0A', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA — square, uppercase, matches page buttons */}
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
          Book a Free Trial Class
        </button>

      </div>
    </header>
  )
}
