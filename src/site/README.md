# Fight Factory Jiu Jitsu — institutional site

The multi-page site that replaces `fightfactoryjiujitsu.com`. It lives in the
**same repo and the same Vercel project** as the landing page, per the one
client / one repo / one project rule.

Three things share this repo and they do not touch each other:

| What | Document | Served at |
|---|---|---|
| Paid-traffic landing page | `index.html` | `lp.fightfactoryjiujitsu.com/` |
| `/kids` and `/back-to-school` | `index.html` (client-routed) | `/kids`, `/back-to-school` |
| **This site** | `home.html`, `about.html`, … | `/home`, `/about`, … |

## Why one HTML document per page

Every page is its own Vite entry (`vite.config.ts` → `build.rollupOptions.input`).
That is the only way each URL gets a real `<title>`, meta description, canonical
and Open Graph markup in the **served** markup — a single client-routed app
cannot, and Meta's scraper runs no JavaScript. Rollup hoists React and the
shared components into one chunk, so the second page a visitor opens is nearly
free.

Cross-page motion is the browser's own **cross-document view transitions**
(`@view-transition { navigation: auto }` in `site.css`). No router, no
JavaScript, and an ordinary navigation where it is unsupported.

## Routing and the domain cutover

`vercel.json` maps clean paths to documents. Two things there matter:

- The **host-conditional rewrite** sends `/` to `home.html` only when the host
  is `fightfactoryjiujitsu.com` or `www.fightfactoryjiujitsu.com`. Until that
  domain is attached, `lp.fightfactoryjiujitsu.com/` keeps serving the landing
  page exactly as before and this site is reviewed at `/home`.
- The SPA catch-all stays **last**, or `/kids` and `/back-to-school` would fall
  through.

**The cutover is therefore only: add `fightfactoryjiujitsu.com` +
`www.fightfactoryjiujitsu.com` to the Vercel project. No code change.** To make
`/home` redirect to `/` afterwards, add a redirect — do not remove the rewrite.

Rehearse it locally:

```bash
npm run build
node serve-dist.mjs 4183                                   # /home, /about, …
node serve-dist.mjs 4184 www.fightfactoryjiujitsu.com      # / serves the site
```

## Stylesheet isolation

`site.css` opens with `@import "tailwindcss" source(none)` plus an explicit
`@source` list (this folder and `../booking`). `src/index.css` carries the
matching `@source not "./site"` **and** `@source not "../*.mjs"`.

Result, verified rather than assumed: the landing page's stylesheet builds
**byte-identical** to what `master` produces — 28,763 bytes, same content hash.

⚠️ Prose in files at the **repo root** is still scanned by the landing page's
Tailwind, so an ordinary English word in a comment there can become a rule in
that bundle. The `@source not "../*.mjs"` line covers `serve-dist.mjs` and
`shot.mjs`; for `vite.config.ts` and the `.html` documents, keep the wording
plain and diff `dist/assets/main-*.css` against a `master` build before pushing.

## Booking and tracking

The form is the shared `src/booking` module, **not forked**. Two small additions
were made to it, both backward compatible:

- `sendLeadWebhook(data, source?)` and `sendBookingWebhook(data, source?)` take
  an optional source label, defaulting to the landing page's. `source` is an
  existing field of the fixed n8n contract — its **value** changes, never the
  field set.
- `BookingForm` accepts `source`. This site passes `SITE_SOURCE`
  (`"Website - Institutional"`), so the CRM can tell a website enquiry from an
  ad lead.

Only the shell belongs to the site (`layout/SiteBookingModal.tsx`), and the form
is skinned by redefining `--radius-*` in this site's `@theme` rather than by
duplicating the module. Any `<a href="#book">` or `#start` anywhere in the
markup opens the modal. `/contact` renders the same form inline and fires the
funnel's opening event on mount, the way the `/book` route does.

Verified end to end with both webhook hosts intercepted by **hostname regex**
(never a path glob — a glob that misses sends the lead to the real CRM), so
nothing was written to the CRM:

- Webhook 1 carries name, e-mail, phone, `program`, `audience`, `child_name`
  for kids only, `source`, and the UTM/gclid attribution captured on arrival.
- Webhook 2 carries exactly `parent_name`, `child_name` (kids only), `email`,
  `phone`, `calendar_id`, `location_id`, `stage`, `appointment_date`,
  `appointment_time`, `source`. Nothing added, nothing removed.
- Meta PageView / ViewContent / Lead / Schedule; GA4 view_content /
  generate_lead / trial_booked; two Google Ads conversions; Enhanced
  Conversions `user_data` set before the Lead conversion.

Live availability for all four GHL calendars was confirmed read-only via
`action: "get_slots"`, which creates no lead.

**GA4 is still missing.** The documents load Google Ads (`AW-18177687947`) only;
the GA4 Measurement ID has never been supplied. Every helper is guarded, so the
GA4 events above are no-ops until the id arrives — swap the loader id in the
five `.html` documents and add `gtag('config','G-XXXXXXX')`.

## Where the content comes from

Everything quoted from the academy is verbatim and marked as such in the file it
lives in:

| Content | File |
|---|---|
| Welcome, about, approach, trial, contact and schedule copy | `content/site.ts` |
| The five values | `content/site.ts` |
| Programme descriptions and class types | `content/programs.ts` |
| The weekly class grid | `content/schedule.ts` |
| Every instructor biography and credential | `content/staff.ts` |
| The five Google reviews, in full | `content/testimonials.ts` |
| Athletes, titles and this season's results | `content/record.ts` |

The weekly grid merges two authoritative sources: **adult** classes come from
the academy's own live schedule app (the Rollpay feed the old site embedded on
`/schedule`), and **kids** classes come from the academy's printed schedule
poster, whose times match the open hours of the four kids calendars in the GHL
sub-account. One difference between the two is flagged in the file rather than
silently resolved: the printed poster shows Saturday as a single 10:30 AM –
12:30 PM Gi class, while the live app shows 9:30 AM Women's + 11:00 AM Gi. The
live app is newer, so it is what the grid shows.

## Content the academy still owes

Rendered as visible `Pending` markers, never invented:

| What | Where |
|---|---|
| Membership pricing | `content/site.ts` → `PENDING.pricing` (Programs, Contact FAQ) |
| Caleb Tackett's portrait and biography | `content/staff.ts` |
| GA4 Measurement ID | the five `.html` documents |
| A photograph of the women's class itself | `pages/HomePage.tsx` bento tile |

## Design notes

Direction: **"THE RECORD"** — the academy's differentiator is a written
competition record, so the page is built like a record board.

- **One typeface.** Archivo, self-hosted, carried across three widths of its
  variable `wdth` axis: 125% for display, 100% for running text, 87% for
  letterspaced labels. The wordmark is a wide heavy grotesque; this is the same
  idea made typographic. Display text that is not an `h1`–`h4` must carry
  `display-line`, or it renders at 100% width and stops looking like the same
  family.
- **Signature devices:** the machinist rule (`rule-ticks`), the outlined
  chapter numeral (`chapter-num`), the data row (`record-row`), the diamond off
  the wordmark (`diamond`), and one crimson stroke per icon glyph. No card with
  a border, a shadow and a tinted icon chip anywhere on the site.
- **Icons are the site's own** (`components/Icon.tsx`), 24 grid, single 1.6
  stroke, exactly one crimson stroke per glyph. `--icon-accent` flips that
  stroke to white on a crimson ground. A library mark is the right answer in
  exactly one place: the social trademarks in the colophon.
- **Motion:** `mask-reveal-up` from the `animate-text` skill for every headline
  (`components/MaskHeading.tsx`) — per-line, enter only, GSAP with CustomEase,
  at the skill's website runtime numbers. Reveals and the clamped parallax live
  in `components/scroll.ts`.

⚠️ **Variant class names must be whole literals.** A class built as
`` `btn-${variant}` `` never appears in the source, so Tailwind's extractor
cannot see it and the utility is silently never emitted — which is how
`btn-ghost` first shipped with no border. `components/ui.tsx` maps variants to
full literal names for exactly this reason. To check the whole set at once,
compare `@utility` declarations in `site.css` against the built stylesheet.

⚠️ **The wordmark ships in two files and neither takes a CSS filter.**
`brand/wordmark-ink.webp` is for light surfaces, `brand/wordmark-light.webp`
for dark ones. `invert` on the light asset over a dark panel paints it black.

## Local development

```bash
npm run dev                        # http://localhost:5173/home.html
npm run build && node serve-dist.mjs 4183
node shot.mjs "/home,/about,/programs,/schedule,/contact"    # + overflow / reveal / 404 checks
W=390 node shot.mjs "/home"
```

`shot.mjs` fails the run if any page scrolls sideways, leaves a reveal at zero
opacity, has more or fewer than one `h1`, or requests something that 404s.
