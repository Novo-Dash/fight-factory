import { ACADEMY } from '../content/site'
import { Diamond } from './ui'
import { Icon } from './Icon'

/**
 * The real map.
 *
 * A drawn one was cleaner and stayed in the site's own language, but it cannot
 * answer the only question a map is asked — how do I get there. This pans,
 * zooms and hands the visitor over to Google Maps for directions. It is lazy,
 * so it costs nothing until it is scrolled to, and the heading above it is a
 * link in its own right for anyone who would rather not use an embed.
 */
export function MapEmbed({
  invert = false,
  className = '',
}: {
  /** On a dark panel. */
  invert?: boolean
  className?: string
}) {
  const border = invert ? 'border-white/12' : 'border-rule'
  const inner = invert ? 'border-white/10 bg-ink' : 'border-rule bg-shell-2'
  const surface = invert ? 'bg-ink-2' : 'bg-shell'
  const label = invert ? 'text-white/45' : 'text-muted'
  const link = invert ? 'text-white/70 hover:text-white' : 'text-body hover:text-ink'
  const addr = invert ? 'text-white/70' : 'text-body'

  return (
    <div className={`border ${border} ${surface} p-5 md:p-6 ${className}`}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <span className={`label-sm flex items-center gap-2.5 ${label}`}>
          <Diamond className="text-red" />
          North-west Austin
        </span>
        <a
          href={ACADEMY.mapsUrl}
          target="_blank"
          rel="noreferrer noopener"
          className={`label-sm inline-flex items-center gap-2 transition-colors [--icon-accent:currentColor] ${link}`}
        >
          Open in Google Maps
          <Icon name="arrow" size={14} />
        </a>
      </div>

      <div className={`relative aspect-[16/11] w-full overflow-hidden border ${inner}`}>
        <iframe
          title={`Map showing ${ACADEMY.name} at ${ACADEMY.street}, ${ACADEMY.cityLine}`}
          src="https://www.google.com/maps?q=Fight+Factory+Jiu-jitsu,+9607+Research+Blvd+%23675,+Austin,+TX+78759&z=15&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      <address
        className={`mt-5 flex items-start gap-3 not-italic [--icon-accent:var(--color-red)] ${addr}`}
      >
        <Icon name="pin" size={18} className="mt-0.5 shrink-0" />
        <span className="text-[0.88rem] leading-[1.5]">
          {ACADEMY.street}
          <br />
          {ACADEMY.cityLine}
        </span>
      </address>
    </div>
  )
}
