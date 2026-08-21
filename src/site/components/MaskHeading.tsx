import { useEffect, useRef, type ElementType } from 'react'

/**
 * `mask-reveal-up` from the animate-text skill: a per-line masked reveal, run
 * once on scroll-in.
 *
 * Numbers are the skill's spec at the website runtime preset, already scaled —
 * enter 547ms, stagger 65ms per line, ease cubic-bezier(0.22, 1, 0.36, 1),
 * from { opacity 0, y 30px × y_travel_multiplier 0.58 = 17.4px, blur 6px }.
 * The spec also describes a loop (enter → hold → exit → swap); that belongs to
 * the demo. A page headline uses the enter only, one time.
 *
 * Driver is GSAP, which the repository already ships, with CustomEase for the
 * cubic-bezier. The split is per LINE, so every word stays a whole word in the
 * DOM — no glyph spans, which means no mid-word line breaks and nothing extra
 * for a screen reader or a crawler to read twice.
 */

const ENTER_S = 0.547
const STAGGER_S = 0.065
const Y_FROM = 17.4
const BLUR_FROM = 6
const EASE = 'M0,0 C0.22,1 0.36,1 1,1' // cubic-bezier(0.22, 1, 0.36, 1)

export function MaskHeading({
  text,
  as: Tag = 'h2',
  className = '',
  delay = 0,
}: {
  /** Line breaks are explicit: split on "\n", exactly as the spec requires. */
  text: string
  as?: ElementType
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const lines = text.split('\n')

  useEffect(() => {
    const host = ref.current
    if (!host) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      host.classList.add('is-in')
      return
    }

    let done = false
    const play = async () => {
      if (done) return
      done = true
      const units = Array.from(host.querySelectorAll<HTMLElement>('.mask-line'))
      try {
        const [{ gsap }, { CustomEase }] = await Promise.all([
          import('gsap'),
          import('gsap/CustomEase'),
        ])
        gsap.registerPlugin(CustomEase)
        const ease = CustomEase.create('maskRevealUp', EASE)
        // Inline styles land in the same frame the class does, so removing the
        // CSS start frame cannot flash the finished text.
        gsap.set(units, { opacity: 0, y: Y_FROM, filter: `blur(${BLUR_FROM}px)` })
        host.classList.add('is-in')
        gsap.to(units, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: ENTER_S,
          ease,
          stagger: STAGGER_S,
          delay: delay / 1000,
          overwrite: 'auto',
          onComplete: () => gsap.set(units, { clearProps: 'filter,willChange' }),
        })
      } catch {
        // GSAP unavailable — show the text rather than an empty heading.
        host.classList.add('is-in')
      }
    }

    // Already on the first screen: play immediately rather than waiting for a
    // scroll that may never come.
    if (host.getBoundingClientRect().top < window.innerHeight * 0.97) {
      void play()
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          io.disconnect()
          void play()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.15 },
    )
    io.observe(host)
    return () => io.disconnect()
  }, [delay])

  return (
    <Tag ref={ref} className={`mask-head ${className}`}>
      {lines.map((line, i) => (
        <span className="mask-line" key={i}>
          {line}
        </span>
      ))}
    </Tag>
  )
}
