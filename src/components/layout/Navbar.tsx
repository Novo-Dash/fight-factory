import { useEffect, useState } from 'react'
import { useModal } from '../../hooks/useModal'

export function Navbar() {
  const { openModal } = useModal()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleCTA() {
    // ViewContent é disparado pelo modal ao abrir. Sem InitiateCheckout (§7.5).
    openModal()
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14 md:h-[72px]"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
        transition: 'background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">

        {/* Logo */}
        <a href="/" aria-label="Fight Factory Jiu-Jitsu" className="flex items-center shrink-0">
          <img
            src="/images/FONTE.webp"
            alt="Fight Factory Jiu-Jitsu"
            className="h-10 md:h-11 w-auto object-contain"
            style={{
              filter: scrolled ? 'brightness(0)' : 'brightness(0) invert(1)',
              transition: 'filter 0.35s ease',
            }}
          />
        </a>

        {/* Nav links — desktop only */}
        <nav className="hidden md:flex items-center gap-7">
          {[
            { label: 'Classes', href: '#classes' },
            { label: 'Reviews', href: '#reviews' },
            { label: 'Coach', href: '#coach' },
            { label: 'FAQ', href: '#faq' },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: scrolled ? '#0A0A0A' : 'rgba(255,255,255,0.85)' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={handleCTA}
          className="text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:scale-[1.02] transition-all duration-200 min-h-[40px] min-w-[44px] cursor-pointer shrink-0"
          style={{
            background: '#CC0000',
            border: 'none',
            transition: 'background 0.2s ease',
          }}
        >
          Book Free Trial
        </button>

      </div>
    </header>
  )
}
