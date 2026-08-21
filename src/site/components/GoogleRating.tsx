import { useEffect, useState } from 'react'
import { PROOF, ACADEMY } from '../content/site'
import { REVIEWS } from '../content/testimonials'
import { Icon } from './Icon'
import { Stars } from './ui'

/**
 * The Google rating, as a piece of evidence rather than a badge.
 *
 * The score and the review count come from the client's record; the quotes and
 * the names are the academy's own published reviews. The quote crossfades
 * through them on a timer — `fade-through` from the animate-text catalogue, the
 * one effect in that catalogue meant for replacing content in place — and holds
 * still for anyone who asked for reduced motion.
 *
 * The four-colour G is Google's trademark, which is the one case where a
 * third-party mark is the correct glyph rather than a drawn one.
 */

const HOLD_MS = 4800
const FADE_MS = 320

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.6h12c-.2 2-1.5 5-4.3 7l6.6 5.1c3.9-3.6 6.8-8.9 6.8-15.7Z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.8-1.9 14.3-5.3l-6.6-5.1c-1.8 1.2-4.2 2.1-7.7 2.1-5.8 0-10.7-3.8-12.5-9.1l-7 5.4C8 41.2 15.4 46 24 46Z" />
      <path fill="#FBBC05" d="M11.5 28.6A13.5 13.5 0 0 1 10.8 24c0-1.6.3-3.2.7-4.6l-7-5.4A22 22 0 0 0 2 24c0 3.6.9 6.9 2.5 10l7-5.4Z" />
      <path fill="#EA4335" d="M24 10.2c4.1 0 6.9 1.8 8.5 3.3l6.2-6C34.8 4 29.9 2 24 2 15.4 2 8 6.8 4.5 14l7 5.4C13.3 14.1 18.2 10.2 24 10.2Z" />
    </svg>
  )
}

/** First initials of the real reviewers, as a stack. */
function Faces() {
  return (
    <div className="flex items-center">
      {REVIEWS.map((r, i) => (
        <span
          key={r.id}
          className="label-sm -ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-shell bg-ink text-[0.6rem] text-shell first:ml-0"
          style={{ zIndex: REVIEWS.length - i }}
          aria-hidden="true"
        >
          {r.name.slice(0, 1)}
        </span>
      ))}
    </div>
  )
}

export function GoogleRating({ className = '' }: { className?: string }) {
  const [i, setI] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let out: ReturnType<typeof setTimeout>
    const cycle = setInterval(() => {
      setVisible(false)
      out = setTimeout(() => {
        setI((n) => (n + 1) % REVIEWS.length)
        setVisible(true)
      }, FADE_MS)
    }, HOLD_MS)
    return () => {
      clearInterval(cycle)
      clearTimeout(out)
    }
  }, [])

  const review = REVIEWS[i]
  // First sentence only: the card is evidence, the full reviews are further down.
  const quote = review.text.split(/(?<=[.!?])\s/)[0]

  return (
    <figure
      className={`w-full max-w-sm border border-white/15 bg-ink/72 p-6 backdrop-blur-md md:p-7 ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="label-sm flex items-center gap-2.5 text-white/70">
          <GoogleG />
          Google reviews
        </span>
        <span className="label-sm nums text-white/40">{PROOF.googleReviews}+</span>
      </div>

      <div className="mt-5 flex items-end gap-4">
        <span className="display-line text-white" style={{ fontSize: 'clamp(2.6rem,4vw,3.4rem)' }}>
          {PROOF.googleRating}
        </span>
        <div className="pb-1.5">
          <Stars size={14} className="text-white" />
          <span className="label-sm mt-2 block text-white/45">out of five</span>
        </div>
      </div>

      <blockquote
        className="mt-6 min-h-[4.5rem] text-[0.92rem] leading-[1.55] text-white/80 transition-opacity"
        style={{ opacity: visible ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
      >
        <p>&ldquo;{quote}&rdquo;</p>
        <figcaption className="label-sm mt-3 text-white/45">{review.name}</figcaption>
      </blockquote>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/12 pt-5">
        <Faces />
        <a
          href={ACADEMY.mapsUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="label-sm inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white [--icon-accent:currentColor]"
        >
          Read all
          <Icon name="arrow" size={14} />
        </a>
      </div>
    </figure>
  )
}
