import { ACADEMY, HOURS, NAV, PROOF } from '../content/site'
import { Icon } from '../components/Icon'
import { MiniMap } from '../components/MiniMap'
import { Diamond, Rule } from '../components/ui'

/**
 * The colophon. Straight to the point: where the academy is, when it is open,
 * how to reach it, and the map. The only place on the site where third-party
 * brand marks are the right icon, because they are trademarks.
 */
export function Footer() {
  return (
    <footer className="vt-colophon bg-ink text-white">
      <div className="wrap py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Left: identity and the record line */}
          <div>
            <img
              src="/site/brand/wordmark-light.webp"
              alt={ACADEMY.name}
              width={400}
              height={56}
              className="h-8 w-auto md:h-9"
            />
            <p className="standfirst mt-6 max-w-md text-white/60">
              Brazilian Jiu-Jitsu in north-west Austin since {ACADEMY.founded}. Beginners,
              hobbyists and world champions on the same mat.
            </p>

            <div className="mt-9 grid max-w-md grid-cols-3 gap-4">
              {[
                { v: PROOF.studentsLabel, l: 'Students' },
                { v: PROOF.googleRating, l: `${PROOF.googleReviews}+ reviews` },
                { v: `${PROOF.yearsCoaching}yr`, l: 'On the mats' },
              ].map((s) => (
                <div key={s.l} className="record-row record-row-invert !pb-0">
                  <span className="display-line t-sub nums block text-white">{s.v}</span>
                  <span className="label-sm mt-2 block text-white/40">{s.l}</span>
                </div>
              ))}
            </div>

            <a href="#book" className="btn btn-red mt-10">
              <span className="btn-roll">
                <span>Book a free trial</span>
                <span aria-hidden="true">Book a free trial</span>
              </span>
              <Icon name="arrow" size={17} />
            </a>
          </div>

          {/* Right: the drawn map */}
          <div className="border border-white/12 bg-ink-2 p-5 md:p-7">
            <div className="label-sm mb-5 flex items-center gap-2 text-white/45">
              <Diamond className="text-red" />
              North-west Austin
            </div>
            <MiniMap className="[--color-rule:rgba(255,255,255,0.22)] [--color-shell-2:rgba(255,255,255,0.045)] [--color-muted:rgba(255,255,255,0.4)] [--color-ink:#fff] [--color-body:rgba(255,255,255,0.55)]" />
            <a
              href={ACADEMY.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="label-sm mt-5 inline-flex items-center gap-2 text-white/70 underline decoration-white/25 transition-colors hover:text-white"
            >
              <Icon name="pin" size={15} />
              Open in Google Maps
            </a>
          </div>
        </div>

        <Rule invert className="mt-14" />

        <div className="grid gap-10 pt-10 md:grid-cols-4">
          <div>
            <h3 className="label mb-5 text-white/40">Visit</h3>
            <address className="t-body not-italic text-white/75">
              {ACADEMY.street}
              <br />
              {ACADEMY.cityLine}
            </address>
          </div>

          <div>
            <h3 className="label mb-5 text-white/40">Contact</h3>
            <ul className="t-body space-y-2 text-white/75">
              <li>
                <a href={ACADEMY.phoneHref} className="nums transition-colors hover:text-white">
                  {ACADEMY.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${ACADEMY.email}`} className="break-all transition-colors hover:text-white">
                  {ACADEMY.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              <a
                href={ACADEMY.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Fight Factory on Instagram"
                className="flex h-11 w-11 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.23 1 .5 1.4.95.45.44.72.84.95 1.4.17.4.37 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2a3.9 3.9 0 0 1-.95 1.4c-.44.45-.84.72-1.4.95-.4.17-1 .37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42a3.9 3.9 0 0 1-1.4-.95 3.9 3.9 0 0 1-.95-1.4c-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.23-.6.5-1 .95-1.4.44-.45.84-.72 1.4-.95.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.8.07-1 .04-1.5.2-1.9.35-.4.16-.7.35-1 .65-.3.3-.5.6-.65 1-.15.4-.3.9-.35 1.9C3.2 9.3 3.2 9.7 3.2 12s0 2.7.07 4c.04 1 .2 1.5.35 1.9.16.4.35.7.65 1 .3.3.6.5 1 .65.4.15.9.3 1.9.35 1.3.06 1.7.07 4.8.07s3.5 0 4.8-.07c1-.04 1.5-.2 1.9-.35.4-.16.7-.35 1-.65.3-.3.5-.6.65-1 .15-.4.3-.9.35-1.9.06-1.3.07-1.7.07-4s0-2.7-.07-4c-.04-1-.2-1.5-.35-1.9a2.7 2.7 0 0 0-.65-1 2.7 2.7 0 0 0-1-.65c-.4-.15-.9-.3-1.9-.35-1.3-.06-1.7-.07-4.8-.07Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm6.28-2.02a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
                </svg>
              </a>
              <a
                href={ACADEMY.facebook}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Fight Factory on Facebook"
                className="flex h-11 w-11 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.8-.1-1.7-.15-2.5-.15-2.5 0-4.15 1.5-4.15 4.3v2.15H7.4V13h2.65v8Z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="label mb-5 text-white/40">Hours</h3>
            <ul className="t-body space-y-1.5 text-white/75">
              {HOURS.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span className="nums shrink-0 text-white/50">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label mb-5 text-white/40">Pages</h3>
            <ul className="t-body space-y-1.5 text-white/75">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-sm text-white/35">
            © {ACADEMY.founded}–2026 {ACADEMY.name}. All rights reserved.
          </p>
          <p className="label-sm text-white/35">{ACADEMY.motto}</p>
        </div>
      </div>
    </footer>
  )
}
