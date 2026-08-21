/**
 * The site's own icon set.
 *
 * Drawn on a 24 grid with a single 1.6 stroke weight, round joins, and exactly
 * ONE crimson stroke per glyph, which gives the set a consistent two-tone read
 * without tinting anything. They sit directly in the page at the weight of the
 * type around them — never inside a circle, chip or tinted plate, which is the
 * pattern that makes a page look machine-assembled.
 *
 * A library icon is the right answer in exactly one place on this site: the
 * social network marks in the colophon, which are third-party trademarks.
 */

const S = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}
/* The accent reads from the cascade so a glyph on a crimson ground can flip it
   to white; `--icon-accent` defaults to crimson at :root. */
const RED = { ...S, stroke: 'var(--icon-accent, var(--color-red))' }

export type IconName =
  | 'pin'
  | 'phone'
  | 'mail'
  | 'clock'
  | 'calendar'
  | 'belt'
  | 'gi'
  | 'nogi'
  | 'kids'
  | 'medal'
  | 'mat'
  | 'star'
  | 'arrow'
  | 'wrestling'

const PATHS: Record<IconName, React.ReactNode> = {
  // A location pin, with the mark itself as the accent centre.
  pin: (
    <>
      <path {...S} d="M12 21.2c3.6-4.3 6-7.4 6-10.4A6 6 0 0 0 6 10.8c0 3 2.4 6.1 6 10.4Z" />
      <path {...RED} d="M12 8.9v3.6" />
    </>
  ),
  // Handset, with one red signal arc.
  phone: (
    <>
      <path
        {...S}
        d="M8.2 3.8H5.4A1.6 1.6 0 0 0 3.8 5.5C4.1 12.9 11.1 19.9 18.5 20.2a1.6 1.6 0 0 0 1.7-1.6v-2.8l-4-1.4-2 2a15.4 15.4 0 0 1-5.2-5.2l2-2Z"
      />
      <path {...RED} d="M15.4 4.6a5.6 5.6 0 0 1 4 4" />
    </>
  ),
  // Envelope, with the flap in red.
  mail: (
    <>
      <rect {...S} x="3" y="5.6" width="18" height="12.8" rx="1" />
      <path {...RED} d="m3.6 6.4 8.4 6.2 8.4-6.2" />
    </>
  ),
  // Clock; the minute hand is the red one.
  clock: (
    <>
      <circle {...S} cx="12" cy="12" r="8.6" />
      <path {...S} d="M12 7.4V12h3.4" />
      <path {...RED} d="M12 12l-2.9 2.9" />
    </>
  ),
  // Calendar with one day marked.
  calendar: (
    <>
      <rect {...S} x="3.4" y="5.4" width="17.2" height="15.2" rx="1" />
      <path {...S} d="M3.4 10h17.2M8 3.6v3.4M16 3.6v3.4" />
      <path {...RED} d="M11 14.6h2.6" />
    </>
  ),
  // A folded belt with the rank bar in red — the one glyph only this sport has.
  belt: (
    <>
      <path {...S} d="M2.6 9.4h18.8v5.2H2.6z" />
      <path {...S} d="M9.4 14.6v6l2.6-1.9 2.6 1.9v-6" />
      <path {...RED} d="M18.4 9.9v4.2" />
    </>
  ),
  // Kimono lapels, sash in red.
  gi: (
    <>
      <path {...S} d="M8 3.6 12 8l4-4.4 3.6 2.2-2.2 4.6v14H6.6v-14L4.4 5.8Z" />
      <path {...RED} d="M6.6 14.4h10.8" />
    </>
  ),
  // Rash guard: the sleeve seam is the red one.
  nogi: (
    <>
      <path {...S} d="M9 3.8h6l4.4 2.6-1.8 4-1.6-.8v10.6H8v-10.6l-1.6.8-1.8-4Z" />
      <path {...RED} d="M6.4 10.4 8 9.6" />
    </>
  ),
  // Two figures, one tall one small; the child is the red one.
  kids: (
    <>
      <circle {...S} cx="8.4" cy="6.2" r="2.4" />
      <path {...S} d="M4.6 20.4v-5a3.8 3.8 0 0 1 7.6 0v5" />
      <circle {...RED} cx="17.2" cy="11" r="1.9" />
      <path {...S} d="M14.2 20.4v-3.4a3 3 0 0 1 6 0v3.4" />
    </>
  ),
  // Medal, ribbon in red.
  medal: (
    <>
      <circle {...S} cx="12" cy="15" r="5.4" />
      <path {...RED} d="M8.6 10.2 6.2 3.6h11.6l-2.4 6.6" />
      <path {...S} d="M12 12.6v4.8" />
    </>
  ),
  // The tatame seen in perspective, with the centre circle in red.
  mat: (
    <>
      <path {...S} d="M2.4 17.6 7.6 7h8.8l5.2 10.6z" />
      <ellipse {...RED} cx="12" cy="13.4" rx="3.4" ry="2" />
    </>
  ),
  star: (
    <>
      <path {...S} d="m12 3.8 2.6 5.5 5.8.8-4.3 4.1 1.1 5.9-5.2-3-5.2 3 1.1-5.9-4.3-4.1 5.8-.8z" />
      <path {...RED} d="M12 8.6v3.2" />
    </>
  ),
  arrow: (
    <>
      <path {...S} d="M3.4 12h15.2" />
      <path {...RED} d="m14.2 7.4 4.6 4.6-4.6 4.6" />
    </>
  ),
  // Takedown: two grips meeting, the lead hand in red.
  wrestling: (
    <>
      <path {...S} d="M3.6 15.4l4.2-4.2 3.4 3.4" />
      <path {...S} d="M20.4 8.6l-4.2 4.2-3.4-3.4" />
      <path {...RED} d="M10.6 18.4h2.8" />
    </>
  ),
}

export function Icon({
  name,
  size = 22,
  className = '',
}: {
  name: IconName
  size?: number
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name]}
    </svg>
  )
}
