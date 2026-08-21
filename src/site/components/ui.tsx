import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

/* ══ Buttons ═══════════════════════════════════════════════════════════════
   The label travels to a duplicate of itself on hover while a panel wipes up
   from the base, so the two halves of the interaction move together. */

/**
 * Variants map to whole literal class names on purpose. Built as
 * `btn-${variant}`, the string never appears in the source, so Tailwind's
 * extractor cannot see it and the utility is silently never emitted — which is
 * exactly how `btn-ghost` shipped with no border the first time.
 */
const VARIANT = {
  red: 'btn-red',
  ink: 'btn-ink',
  ghost: 'btn-ghost',
  'ghost-invert': 'btn-ghost-invert',
} as const

export function Btn({
  children,
  href,
  onClick,
  variant = 'red',
  className = '',
  icon = 'arrow',
}: {
  children: string
  href?: string
  onClick?: () => void
  variant?: keyof typeof VARIANT
  className?: string
  icon?: IconName | null
}) {
  const inner = (
    <>
      <span className="btn-roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {icon ? <Icon name={icon} size={17} /> : null}
    </>
  )
  const cls = `btn ${VARIANT[variant]} ${className}`
  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  )
}

/* ══ The chapter marker ════════════════════════════════════════════════════
   An outlined numeral hung off the left margin over a machinist rule. It takes
   the place of the tinted pill-with-an-icon that every template opens with,
   and half the chapters deliberately carry no standfirst so the page does not
   fall into a repeating rhythm. */

export function Chapter({
  n,
  label,
  invert = false,
  className = '',
}: {
  n: string
  label: string
  invert?: boolean
  className?: string
}) {
  return (
    <div className={`flex items-end gap-4 md:gap-6 ${className}`}>
      <span className={`chapter-num ${invert ? 'chapter-num-invert' : ''}`}>{n}</span>
      <span
        className={`label pb-1.5 ${invert ? 'text-white/55' : 'text-muted'}`}
      >
        {label}
      </span>
    </div>
  )
}

/** A measured hairline. The site's only divider. */
export function Rule({ invert = false, className = '' }: { invert?: boolean; className?: string }) {
  return <div aria-hidden="true" className={`rule-ticks ${invert ? 'rule-ticks-invert' : ''} ${className}`} />
}

/**
 * A rating, not an ornament. Filled stars, because an outline reads as a
 * decorative glyph rather than as "five out of five".
 */
export function Stars({
  size = 13,
  className = 'text-red',
}: {
  size?: number
  className?: string
}) {
  return (
    <span className={`flex items-center gap-1 ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="m12 2.6 2.85 5.98 6.35.88-4.68 4.5 1.16 6.44L12 17.2l-5.68 3.2 1.16-6.44-4.68-4.5 6.35-.88z" />
        </svg>
      ))}
    </span>
  )
}

/** The diamond off the wordmark — bullet, separator and datum mark. */
export function Diamond({ className = 'text-red' }: { className?: string }) {
  return <span aria-hidden="true" className={`diamond ${className}`} />
}

/** A squared, letterspaced tag. Sits above a headline. */
export function Tag({
  children,
  invert = false,
  className = '',
}: {
  children: ReactNode
  invert?: boolean
  className?: string
}) {
  return (
    <span
      className={`label-sm inline-flex items-center gap-2 border px-2.5 py-2 ${
        invert ? 'border-white/22 text-white/70' : 'border-rule text-body'
      } ${className}`}
    >
      <Diamond />
      {children}
    </span>
  )
}

/** Content the academy still owes, shown rather than invented. */
export function Pending({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`label-sm inline-flex items-center gap-2 border border-dashed border-red/45 bg-red-wash px-2.5 py-2 text-red-dark ${className}`}
    >
      <Diamond className="text-red" />
      {children}
    </span>
  )
}

/* ══ Counting statistic ════════════════════════════════════════════════════ */

export function Counter({
  to,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1500,
}: {
  to: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  // Lazy initialiser, not an effect: starts at zero only when motion is
  // allowed, so reduced-motion and the first paint both show a real figure.
  const [value, setValue] = useState(() =>
    typeof window !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 0
      : to,
  )
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || started.current) continue
          started.current = true
          io.disconnect()
          const t0 = performance.now()
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / duration)
            // ease-out-quint, matching the site's entrance curve
            const eased = 1 - Math.pow(1 - p, 5)
            setValue(to * eased)
            if (p < 1) requestAnimationFrame(tick)
            else setValue(to)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  return (
    <span ref={ref} className="nums">
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

/* ══ Carousel ══════════════════════════════════════════════════════════════
   Arrows plus a segmented rule that doubles as position, progress and a
   shortcut. Scroll snapping does the moving, so a trackpad, a touch swipe and
   the arrows all drive the same thing. */

export function Carousel({
  count,
  children,
  label,
  invert = false,
  fade = false,
}: {
  count: number
  children: ReactNode
  label: string
  invert?: boolean
  /** Feather the ends, so a card leaves the measure instead of being cut. */
  fade?: boolean
}) {
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  function go(next: number) {
    const el = track.current
    if (!el) return
    const clamped = Math.max(0, Math.min(count - 1, next))
    const child = el.children[clamped] as HTMLElement | undefined
    if (!child) return
    el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: 'smooth' })
    setIndex(clamped)
  }

  useEffect(() => {
    const el = track.current
    if (!el) return
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const mid = el.scrollLeft + el.clientWidth / 2
        let best = 0
        let bestDist = Infinity
        Array.from(el.children).forEach((c, i) => {
          const node = c as HTMLElement
          const centre = node.offsetLeft - el.offsetLeft + node.clientWidth / 2
          const d = Math.abs(centre - mid)
          if (d < bestDist) {
            bestDist = d
            best = i
          }
        })
        setIndex(best)
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const arrowCls = invert
    ? 'border-white/25 text-white hover:bg-white hover:text-ink'
    : 'border-rule text-ink hover:bg-ink hover:text-shell'

  return (
    <div>
      <div className={fade ? 'fade-x-end' : undefined}>
        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 md:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label={label}
        >
          {children}
        </div>
      </div>

      <div className="mt-7 flex items-center gap-5">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous"
            className={`flex h-11 w-11 items-center justify-center border transition-colors duration-200 disabled:opacity-30 ${arrowCls}`}
          >
            <Icon name="arrow" size={18} className="rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={index >= count - 1}
            aria-label="Next"
            className={`flex h-11 w-11 items-center justify-center border transition-colors duration-200 disabled:opacity-30 ${arrowCls}`}
          >
            <Icon name="arrow" size={18} />
          </button>
        </div>

        {/* Segmented rule: position, progress and a shortcut in one control. */}
        <div className="flex flex-1 gap-1.5">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to item ${i + 1}`}
              aria-current={i === index}
              className="group h-11 flex-1 cursor-pointer"
            >
              <span
                className={`block h-[3px] w-full transition-colors duration-300 ${
                  i === index
                    ? 'bg-red'
                    : invert
                      ? 'bg-white/20 group-hover:bg-white/45'
                      : 'bg-rule group-hover:bg-muted'
                }`}
              />
            </button>
          ))}
        </div>

        <span className={`label-sm nums shrink-0 ${invert ? 'text-white/45' : 'text-muted'}`}>
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

/* ══ Marquee ═══════════════════════════════════════════════════════════════
   Credentials, not slogans. The track is duplicated once and translated by
   exactly -50%, so the seam is invisible. */

export function Marquee({
  items,
  invert = false,
  duration = 46,
  reverse = false,
}: {
  items: readonly string[]
  invert?: boolean
  duration?: number
  reverse?: boolean
}) {
  const run = (
    <div className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`label whitespace-nowrap px-6 md:px-8 ${
              invert ? 'text-white/75' : 'text-ink'
            }`}
          >
            {t}
          </span>
          <Diamond className="text-red" />
        </span>
      ))}
    </div>
  )
  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div
        className="band-track"
        style={
          {
            '--band-duration': `${duration}s`,
            '--band-direction': reverse ? 'reverse' : 'normal',
          } as React.CSSProperties
        }
      >
        {run}
        {run}
      </div>
    </div>
  )
}
