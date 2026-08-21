import type { ReactNode } from 'react'
import { BookingProvider } from './BookingProvider'
import { Header } from './Header'
import { Footer } from './Footer'
import { useScrollReveals } from '../components/scroll'

/**
 * Every page is its own HTML document — real URLs, real meta tags, real Open
 * Graph — and every one of them mounts this shell. The browser cross-fades
 * between them through the view-transition rules in site.css.
 */
export function SiteShell({
  current,
  children,
  overDark = false,
}: {
  current: string
  children: ReactNode
  /** The page opens on a photograph, so the masthead starts in its light artwork. */
  overDark?: boolean
}) {
  useScrollReveals()

  return (
    <BookingProvider>
      <div className="mill flex min-h-dvh flex-col bg-shell">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-2 focus:text-shell"
        >
          Skip to content
        </a>
        <Header current={current} overDark={overDark} />
        {/* A sticky masthead still occupies its space in the flow. When the page
            opens on a photograph, pull the content up by exactly that height so
            the image runs behind the masthead instead of starting under it. */}
        <main id="main" className={`flex-1 ${overDark ? '-mt-16 md:-mt-[74px]' : ''}`}>
          {children}
        </main>
        <Footer />
      </div>
    </BookingProvider>
  )
}
