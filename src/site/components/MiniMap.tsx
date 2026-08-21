import { useEffect, useRef } from 'react'

/**
 * A drawn map instead of an embedded one.
 *
 * A Google Maps iframe drops another product's whole interface — its own type,
 * its own buttons, its own colours — into the middle of the page. This is the
 * same information in the site's own language: real roads around 9607 Research
 * Blvd (US-183 at Capital of Texas Highway, with MoPac to the east), the
 * academy marked with the diamond off the wordmark.
 *
 * The roads draw themselves in via stroke-dashoffset when the block scrolls
 * into view, and hold still for anyone who asked for reduced motion.
 */
export function MiniMap({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = ref.current
    if (!svg) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      svg.classList.add('is-drawn')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          io.disconnect()
          svg.classList.add('is-drawn')
        }
      },
      { threshold: 0.3 },
    )
    io.observe(svg)
    return () => io.disconnect()
  }, [])

  return (
    <svg
      ref={ref}
      viewBox="0 0 420 300"
      className={`w-full ${className}`}
      role="img"
      aria-label="Map: Fight Factory Jiu Jitsu at 9607 Research Boulevard, at the junction of US-183 and Capital of Texas Highway in north-west Austin."
    >
      <style>{`
        .rd { fill: none; stroke: var(--color-rule); stroke-width: 1.15; }
        .rd-major { stroke-width: 2.6; stroke: var(--color-rule); }
        .rd-label { font-family: var(--font-sans); font-stretch: 87%; font-size: 8px;
                    font-weight: 600; letter-spacing: 0.13em; fill: var(--color-muted);
                    text-transform: uppercase; }
        .draw { stroke-dasharray: var(--len); stroke-dashoffset: var(--len);
                transition: stroke-dashoffset 1.5s var(--ease-out-quint); }
        .is-drawn .draw { stroke-dashoffset: 0; }
        .fade { opacity: 0; transition: opacity .5s var(--ease-out-quint) .75s; }
        .is-drawn .fade { opacity: 1; }
      `}</style>

      {/* Blocks, so the empty ground does not read as an error */}
      <g fill="var(--color-shell-2)">
        <rect x="24" y="30" width="96" height="58" />
        <rect x="24" y="102" width="96" height="46" />
        <rect x="250" y="34" width="82" height="62" />
        <rect x="252" y="196" width="96" height="70" />
        <rect x="40" y="204" width="88" height="62" />
      </g>

      {/* US-183 / Research Blvd — the frontage the academy sits on */}
      <path className="rd rd-major draw" style={{ ['--len' as string]: 520 }} d="M-10 196 L180 168 L300 122 L432 58" />
      <path className="rd draw" style={{ ['--len' as string]: 520 }} d="M-10 208 L180 180 L300 134 L432 70" />

      {/* Capital of Texas Highway (Loop 360) */}
      <path className="rd rd-major draw" style={{ ['--len' as string]: 380 }} d="M232 -10 L214 120 L236 300" />

      {/* MoPac, to the east */}
      <path className="rd rd-major draw" style={{ ['--len' as string]: 330 }} d="M392 -10 L378 300" />

      {/* Neighbourhood streets */}
      <path className="rd draw" style={{ ['--len' as string]: 250 }} d="M18 96 L206 96" />
      <path className="rd draw" style={{ ['--len' as string]: 250 }} d="M22 250 L340 250" />
      <path className="rd draw" style={{ ['--len' as string]: 180 }} d="M126 20 L126 250" />
      <path className="rd draw" style={{ ['--len' as string]: 180 }} d="M304 118 L316 300" />

      {/* Road labels, each set along the road it names. */}
      <g className="rd-label fade">
        <text x="16" y="216" transform="rotate(-9 16 216)">US-183 · Research Blvd</text>
        <text x="228" y="292" transform="rotate(-90 228 292)">Capital of Texas Hwy</text>
        <text x="374" y="196" transform="rotate(-90 374 196)">MoPac</text>
        <text x="24" y="90">Jollyville Rd</text>
        <text x="150" y="244">Stonelake Blvd</text>
      </g>

      {/* The academy */}
      <g className="fade">
        <line x1="176" y1="174" x2="176" y2="138" stroke="var(--color-red)" strokeWidth="1.15" />
        <rect
          x="169.5"
          y="167.5"
          width="13"
          height="13"
          fill="var(--color-red)"
          transform="rotate(45 176 174)"
        />
        <text
          x="186"
          y="132"
          style={{
            fontFamily: 'var(--font-display)',
            fontStretch: '125%',
            fontWeight: 800,
            fontSize: '13px',
            fill: 'var(--color-ink)',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
          }}
          textAnchor="end"
        >
          Fight Factory
        </text>
        <text x="186" y="145" className="rd-label" textAnchor="end" style={{ fill: 'var(--color-body)' }}>
          9607 Research Blvd #675
        </text>
      </g>
    </svg>
  )
}
