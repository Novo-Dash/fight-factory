import { useModal } from '../../hooks/useModal'
import { MaskHeading } from '../components/MaskHeading'
import { Reveal, Uncover } from '../components/motion'
import { useParallax } from '../components/scroll'
import { Btn, Carousel, Chapter, Counter, Diamond, Marquee, Rule, Tag } from '../components/ui'
import { Icon } from '../components/Icon'
import {
  ACADEMY,
  GALLERY_COPY,
  PROOF,
  TRIAL_COPY,
  TRIAL_HEADLINE,
  WELCOME_COPY,
} from '../content/site'
import { ATHLETES, TICKER } from '../content/record'
import { ADULTS, KIDS } from '../content/programs'
import { REVIEWS, REVIEWS_COPY } from '../content/testimonials'

/* ── Hero ──────────────────────────────────────────────────────────────────
   Asymmetric: the headline holds the measure on the left, and the photograph
   is a full-height column that runs off the right edge. The record strip along
   the bottom is the same device the whole site is built from, introduced in
   the first screen so the reader learns to read it. */

function Hero() {
  const { openModal } = useModal()

  return (
    <section className="relative overflow-hidden pt-9 md:pt-14">
      <div className="wrap">
        <Reveal>
          <Tag>
            {ACADEMY.city}, {ACADEMY.state} &nbsp;·&nbsp; Est. {ACADEMY.founded}
          </Tag>
        </Reveal>

        {/* Full measure. The academy's own motto, one phrase per line. */}
        <MaskHeading
          as="h1"
          text={'No ego.\nNo drama.\nJust Jiu-Jitsu.'}
          className="t-mega mt-7"
        />

        <div className="mt-10 grid items-end gap-9 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-12">
          <div className="min-w-0 lg:pb-2">
            <Reveal delay={120}>
              <p className="standfirst max-w-lg text-body">
                A Brazilian Jiu-Jitsu academy in north-west Austin where a first-timer and a
                world champion warm up in the same line. Beginners are the point, not an
                afterthought.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn onClick={openModal}>Book a free trial</Btn>
                <Btn href="/schedule" variant="ghost" icon="calendar">
                  See the schedule
                </Btn>
              </div>
            </Reveal>
          </div>

          {/* The photograph as structure: it runs off the right edge of the
              measure and is taller than the text beside it. */}
          <Uncover className="relative -mr-[clamp(1.15rem,4vw,3.25rem)] lg:-mr-[max(0px,calc((100vw-86rem)/2+3.25rem))]">
            <img
              src="/site/home/hero.webp"
              alt="A Fight Factory black belt watching the room from the edge of the mat"
              width={1000}
              height={1500}
              className="h-[64vw] max-h-[420px] w-full object-cover object-[58%_26%] lg:h-[23rem] lg:max-h-none"
              fetchPriority="high"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-3 -top-3 hidden h-16 w-16 border-l border-t border-red lg:block"
            />
          </Uncover>
        </div>

        {/* The record strip */}
        <Rule className="mt-12 md:mt-16" />
        <dl className="grid grid-cols-2 gap-x-8 gap-y-7 py-7 md:grid-cols-4">
          {[
            { v: <Counter to={PROOF.students} suffix="+" />, l: 'Students on the mats' },
            {
              v: (
                <>
                  <Counter to={5} decimals={1} />
                  <span className="text-muted"> / 5</span>
                </>
              ),
              l: `Google · ${PROOF.googleReviews}+ reviews`,
            },
            { v: <Counter to={PROOF.yearsCoaching} suffix=" yr" />, l: 'Coaching, since 1996' },
            { v: 'UFC BJJ', l: 'Champion coached here' },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 70}>
              <dt className="label mb-3 text-muted">{String(i + 1).padStart(2, '0')}</dt>
              <dd>
                <span className="display-line t-sub nums block">{s.v}</span>
                <span className="t-body mt-1.5 block text-body">{s.l}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* ── 01 · The academy ─────────────────────────────────────────────────────
   Client copy verbatim, set as a long measure, with three photographs in
   three different shapes so no two read as the same card. */

function Academy() {
  return (
    <section className="wrap py-20 md:py-28">
      <Chapter n="01" label="The academy" />

      <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <MaskHeading text={'A premier\nAustin BJJ\nacademy'} className="t-display" />
        <div className="copy t-lead max-w-2xl">
          <Reveal>
            <p>{WELCOME_COPY}</p>
          </Reveal>
          <Reveal delay={90}>
            <p className="prose-quote !text-ink">
              &ldquo;{ACADEMY.motto}&rdquo;
            </p>
            <a
              href="/about"
              className="label mt-6 inline-flex items-center gap-2.5 text-ink underline decoration-rule decoration-1 underline-offset-[6px] transition-colors hover:decoration-red"
            >
              Read the academy&rsquo;s story
              <Icon name="arrow" size={16} />
            </a>
          </Reveal>
        </div>
      </div>

      {/* 21:9 across the measure, then two unequal portraits beneath it. */}
      <Uncover className="mt-14">
        <img
          src="/site/home/circle.webp"
          alt="Rodrigo Cabral leading a belt ceremony as the room applauds"
          width={1800}
          height={1125}
          loading="lazy"
          className="aspect-[21/9] w-full object-cover object-[50%_35%]"
        />
      </Uncover>
      <div className="photo-row mt-4 grid h-[54vw] grid-cols-1 gap-4 sm:h-[30vw] sm:max-h-[420px] sm:grid-cols-[1.35fr_1fr]">
        <Uncover delay={80} className="h-full">
          <img
            src="/site/home/drill.webp"
            alt="Two students drilling in a no-gi adults class"
            width={1600}
            height={1280}
            loading="lazy"
          />
        </Uncover>
        <Uncover delay={160} className="h-full">
          <img
            src="/site/home/group.webp"
            alt="Coach Rodrigo Cabral with two of the academy's brown belts"
            width={1000}
            height={1300}
            loading="lazy"
            className="!object-top"
          />
        </Uncover>
      </div>
    </section>
  )
}

/* ── 02 · The record ──────────────────────────────────────────────────────
   The differentiator, and the only section on an ink ground: what this room
   has produced, laid out as a record rather than as testimonials. */

function Record() {
  const photo = useParallax(52)

  return (
    <section className="relative bg-ink text-white">
      <div className="wrap py-20 md:py-28">
        <Chapter n="02" label="The record" invert />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-16">
          <MaskHeading text={'Built on\nthese mats'} className="t-display text-white" />
          <Reveal>
            <p className="standfirst max-w-md text-white/60">
              Fight Factory is best known for who came out of it. A UFC BJJ champion, a world
              champion, an undefeated MMA prospect — all coached here, from coloured belt to
              title.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14">
          {ATHLETES.map((a, i) => (
            <Reveal as="li" key={a.name} delay={i * 60}>
              <div className="record-row record-row-invert grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_11rem] md:items-baseline">
                <div className="flex items-baseline gap-4">
                  <span className="label-sm nums w-6 shrink-0 text-white/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="t-sub text-white">{a.name}</h3>
                </div>
                <div className="md:pl-2">
                  <p className="label mb-2 text-red">{a.title}</p>
                  <p className="t-body text-white/55">{a.detail}</p>
                </div>
                <p className="nums label shrink-0 text-white/75 md:text-right">{a.mark}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Full-bleed, with clamped parallax. */}
      <div className="relative h-[52vw] max-h-[560px] min-h-[300px] overflow-hidden">
        <img
          ref={photo}
          src="/site/home/ufc-bjj.webp"
          alt="Andrew Tackett with the UFC BJJ championship belt beside Rodrigo Cabral and William Tackett"
          width={1536}
          height={1085}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-[50%_32%] will-change-transform"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(11,12,13,0.92) 0%, rgba(11,12,13,0.15) 55%, rgba(11,12,13,0.35) 100%)',
          }}
        />
        <figcaption className="wrap absolute inset-x-0 bottom-0 pb-8">
          <p className="label-sm flex items-center gap-2.5 text-white/70">
            <Diamond className="text-red" />
            Andrew Tackett, UFC BJJ Champion &nbsp;·&nbsp; with Rodrigo Cabral and William Tackett
          </p>
        </figcaption>
      </div>
    </section>
  )
}

/* ── 03 · Programmes ──────────────────────────────────────────────────────
   A tall bento. The two programmes take the full-height tiles; the three
   specialist classes take short ones. Photographs fill the tiles rather than
   sitting inside them, so nothing reads as a card with an icon on top. */

function Programs() {
  const tiles = [
    {
      href: '/programs#adults',
      eyebrow: ADULTS.eyebrow,
      title: 'Adults\nJiu-Jitsu',
      photo: ADULTS.photo,
      alt: 'Adults gi class rolling on the main mat',
      span: 'md:col-span-2 md:row-span-2',
      icon: 'gi' as const,
      count: `${ADULTS.classes.length} class types`,
    },
    {
      href: '/programs#kids',
      eyebrow: KIDS.eyebrow,
      title: 'Kids\nJiu-Jitsu',
      photo: '/site/programs/kids-c.webp',
      alt: 'A coach guiding a young student through a technique',
      span: 'md:col-span-2 md:row-span-2',
      icon: 'kids' as const,
      count: 'Ages 4–6 · 7–12',
    },
    {
      href: '/programs#adults',
      eyebrow: 'Women only',
      title: "Women's\nClass",
      photo: '/site/programs/womens.webp',
      alt: 'Two of the academy\u2019s brown belts with coach Rodrigo Cabral',
      span: 'md:col-span-2',
      icon: 'belt' as const,
      count: 'Tue · Thu · Sat',
    },
    {
      href: '/programs#adults',
      eyebrow: 'Takedowns',
      title: 'Wrestling',
      photo: '/site/programs/adults-nogi.webp',
      alt: 'A no-gi round finishing on top during an adults class',
      span: 'md:col-span-1',
      icon: 'wrestling' as const,
      count: 'Monday',
    },
    {
      href: '/programs#adults',
      eyebrow: 'First month',
      title: 'White\nBelts Only',
      photo: '/site/programs/adults-roll.webp',
      alt: 'Adults rolling in the gi on the main mat',
      span: 'md:col-span-1',
      icon: 'nogi' as const,
      count: 'Friday',
    },
  ]

  return (
    <section className="wrap py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <Chapter n="03" label="Programmes" />
        <Reveal>
          <a
            href="/programs"
            className="label inline-flex items-center gap-2.5 text-ink underline decoration-rule decoration-1 underline-offset-[6px] transition-colors hover:decoration-red"
          >
            All programmes
            <Icon name="arrow" size={16} />
          </a>
        </Reveal>
      </div>

      <MaskHeading text={'Pick the room\nyou belong in'} className="t-display mt-9 max-w-3xl" />

      <div className="mt-12 grid gap-4 md:h-[46rem] md:grid-cols-6 md:grid-rows-[minmax(0,1fr)_minmax(0,0.82fr)]">
        {tiles.map((t, i) => (
          <Reveal key={t.title} delay={i * 60} className={`min-h-0 ${t.span}`}>
            <a
              href={t.href}
              className="group relative block h-full min-h-[62vw] overflow-hidden bg-ink sm:min-h-[38vw] md:min-h-0"
            >
              <img
                src={t.photo}
                alt={t.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(11,12,13,0.9) 0%, rgba(11,12,13,0.25) 52%, rgba(11,12,13,0.08) 100%)',
                }}
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                <span className="block">
                  <span className="label-sm mb-3 block text-white/60">{t.eyebrow}</span>
                  <span className="display-line t-sub block whitespace-pre-line !leading-[0.9] text-white">
                    {t.title}
                  </span>
                  <span className="label-sm nums mt-3 block text-white/45">{t.count}</span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/25 text-white transition-colors duration-300 group-hover:border-red group-hover:bg-red [--icon-accent:#fff]">
                  <Icon name="arrow" size={17} />
                </span>
              </span>
              <span aria-hidden="true" className="absolute left-5 top-5 text-white/70 md:left-6 md:top-6">
                <Icon name={t.icon} size={26} />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── 04 · Reviews ─────────────────────────────────────────────────────────
   The academy's own published Google reviews, in full. Arrows plus the
   segmented rule, because a long review needs a deliberate control. */

function Reviews() {
  return (
    <section className="bg-shell-2">
      <div className="wrap py-20 md:py-28">
        <Chapter n="04" label="What members say" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-16">
          <MaskHeading text={'Five point zero,\nninety-six times'} className="t-display" />
          <Reveal>
            <p className="standfirst max-w-md text-body">{REVIEWS_COPY}</p>
          </Reveal>
        </div>

        <div className="mt-14">
          <Carousel count={REVIEWS.length} label="Member reviews">
            {REVIEWS.map((r) => (
              <figure
                key={r.id}
                className="flex min-w-[86%] snap-start flex-col justify-between border border-rule bg-shell p-7 sm:min-w-[62%] lg:min-w-[42%] md:p-9"
              >
                <div>
                  <div className="mb-6 flex items-center gap-1.5 text-red">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="star" size={15} />
                    ))}
                  </div>
                  <blockquote className="t-body text-body">{r.text}</blockquote>
                </div>
                <figcaption className="mt-8">
                  <Rule />
                  <span className="label mt-5 block text-ink">{r.name}</span>
                  <span className="label-sm mt-2 block text-muted">Google review</span>
                </figcaption>
              </figure>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  )
}

/* ── 05 · The room ────────────────────────────────────────────────────────
   The facility, as a horizontal strip of unequal frames rather than a grid of
   equal thumbnails. */

const ROOM = [
  { src: '/site/facility/mat-a.webp', alt: 'The main competition mat, empty before class', w: 'w-[78vw] sm:w-[46vw] lg:w-[34vw]' },
  { src: '/site/team/staff-line.webp', alt: 'The Fight Factory coaching staff lined up on the mat', w: 'w-[86vw] sm:w-[56vw] lg:w-[42vw]' },
  { src: '/site/facility/pro-shop.webp', alt: 'The pro shop and lounge at the front of the academy', w: 'w-[70vw] sm:w-[40vw] lg:w-[28vw]' },
  { src: '/site/facility/kids-line.webp', alt: 'The kids class lined up along the wall', w: 'w-[86vw] sm:w-[52vw] lg:w-[38vw]' },
  { src: '/site/home/nogi-worlds.webp', alt: 'The team with their medals at the IBJJF No-Gi Worlds', w: 'w-[78vw] sm:w-[46vw] lg:w-[32vw]' },
  { src: '/site/facility/mat-b.webp', alt: 'A second view of the mat space and windows', w: 'w-[70vw] sm:w-[40vw] lg:w-[26vw]' },
]

function Room() {
  return (
    <section className="py-20 md:py-28">
      <div className="wrap">
        <Chapter n="05" label="Inside the Fight Factory" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-16">
          <MaskHeading text={'Where champions\nare made'} className="t-display" />
          <Reveal>
            <p className="standfirst max-w-md text-body">{GALLERY_COPY}</p>
          </Reveal>
        </div>
      </div>

      <div className="wrap mt-12">
        <div className="photo-row -mr-[clamp(1.15rem,4vw,3.25rem)] flex h-[52vw] max-h-[440px] snap-x gap-3 overflow-x-auto pb-2 lg:-mr-[max(0px,calc((100vw-86rem)/2+3.25rem))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ROOM.map((p) => (
            <figure key={p.src} className={`h-full shrink-0 snap-start ${p.w}`}>
              <img src={p.src} alt={p.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── The one loud moment ──────────────────────────────────────────────────
   The single full-bleed use of the accent on the whole page, kept for the last
   thing the reader sees. */

function TrialBand() {
  const { openModal } = useModal()
  return (
    <section className="bg-red text-white">
      <div className="wrap py-14 md:py-20">
        <Reveal>
          <span className="label-sm flex items-center gap-2.5 text-white/70">
            <Diamond className="text-white" />
            Try a class for free
          </span>
        </Reveal>

        {/* TRIAL_HEADLINE verbatim, with the line breaks the measure wants. No
            second copy of the string anywhere: a duplicate would put the
            headline in the DOM twice for a crawler and a screen reader. */}
        <MaskHeading
          text={TRIAL_HEADLINE.replace('Jiu-Jitsu\u2014No', 'Jiu-Jitsu\u2014\nNo')}
          className="t-title mt-7"
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
          <Reveal delay={90}>
            <p className="standfirst max-w-xl text-white/85">{TRIAL_COPY}</p>
          </Reveal>
          <Reveal delay={140}>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <button type="button" onClick={openModal} className="btn btn-ink">
                <span className="btn-roll">
                  <span>Book your free class</span>
                  <span aria-hidden="true">Book your free class</span>
                </span>
                <Icon name="arrow" size={17} />
              </button>
              <a href={ACADEMY.phoneHref} className="btn btn-ghost-invert">
                <Icon name="phone" size={16} />
                <span className="nums">{ACADEMY.phone}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function HomePage() {
  return (
    <>
      <Hero />
      <div className="border-y border-rule bg-ink py-4">
        <Marquee items={TICKER} invert duration={52} />
      </div>
      <Academy />
      <Record />
      <Programs />
      <Reviews />
      <Room />
      <TrialBand />
    </>
  )
}
