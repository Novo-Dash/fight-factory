// ═══════════════════════════════════════════════════════════════════════════
// record.ts — the competitive record. The academy's differentiator.
//
// Athletes and titles are the ones the academy publishes about itself; the
// recent results are its own competition-results posts. Nothing is inflated
// and no title is added that the academy does not claim.
// ═══════════════════════════════════════════════════════════════════════════

export interface Athlete {
  name: string
  title: string
  detail: string
  /** The single strongest line, right-aligned in the record row. */
  mark: string
}

/** Athletes built at Fight Factory, as the academy lists them. */
export const ATHLETES: Athlete[] = [
  {
    name: 'Andrew Tackett',
    title: 'UFC BJJ Champion',
    detail: 'Started at six. Coached here from a child to a world title.',
    mark: '3× World Champion',
  },
  {
    name: 'William Tackett',
    title: 'UFC BJJ fighter',
    detail: 'Blue belt in 2017 to black belt in 2021, all under Rodrigo Cabral.',
    mark: 'Black belt 2021',
  },
  {
    name: 'Kody Steele',
    title: 'UFC fighter',
    detail: 'Came in as a wrestler with no BJJ. Left with a professional record.',
    mark: 'MMA 5–0',
  },
  {
    name: 'Tiffany Butler',
    title: 'No-Gi World Champion',
    detail: 'Won the world title at 20, and now coaches the kids programme.',
    mark: '2019',
  },
]

export interface Result {
  event: string
  date: string
  /** VERBATIM opening line from the academy's own results post. */
  line: string
  photo: string
}

/** The academy's most recent published competition results. */
export const RESULTS: Result[] = [
  {
    event: 'IBJJF Summer Open',
    date: 'August 2026',
    line: 'Our team had an outstanding showing at the IBJJF Summer Open, with Coach Sean',
    photo: '/site/results/ibjjf-summer-open.webp',
  },
  {
    event: 'Grappling Industries',
    date: 'August 2026',
    line: 'Congratulations to our athlete Luka on an incredible performance at Grappling Industries, going 4-0',
    photo: '/site/results/grappling-industries.webp',
  },
  {
    event: 'IBJJF American National',
    date: 'August 2026',
    line: 'Coach Grayson Henly Earns Silver in Black Belt Debut',
    photo: '/site/results/american-national.webp',
  },
  {
    event: 'Elevate Superfight',
    date: 'June 2026',
    line: 'Alicia takes the win at the Elevate superfight.',
    photo: '/site/results/elevate-superfight.webp',
  },
]

/** The credentials ticker. Data, never slogans. */
export const TICKER = [
  'UFC BJJ Champion',
  '3× Jiu-Jitsu World Champion',
  'No-Gi World Champion',
  'Black belt under Léo Vieira',
  'Brazilian National Champion',
  'IBJJF No-Gi Worlds',
  'ADCC competitors on the mat',
  'Est. Austin 2013',
]
