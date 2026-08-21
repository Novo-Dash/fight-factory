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
export function SiteShell({ current, children }: { current: string; children: ReactNode }) {
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
        <Header current={current} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </BookingProvider>
  )
}
