// Screenshots plus the checks that catch what a screenshot hides: sideways
// overflow, elements left at zero opacity by a reveal that never fired, and
// image requests that came back 404.
//
//   node shot.mjs "/home,/about"          W=1440 OUT=/tmp/shots
//   W=390 node shot.mjs "/home"
import { chromium } from '/Users/lucasaraujocabral/Documents/campos-jiu-jitsu-austin-tx/node_modules/playwright/index.mjs'
import { mkdirSync } from 'node:fs'

const OUT = process.env.OUT ?? '/tmp/ff-shots'
const BASE = process.env.BASE ?? 'http://localhost:4173'
const routes = (process.argv[2] ?? '/home').split(',')
const width = Number(process.env.W ?? 1440)
const height = Number(process.env.H ?? 1000)
const full = process.env.FULL !== '0'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 })

// Smooth scrolling turns every programmatic scroll into an animation the
// harness then races, and a sticky masthead lands wherever it was parked when
// a whole-page capture is taken. Neutralise both for the capture only.
await ctx.addInitScript(() => {
  const apply = () => {
    const s = document.createElement('style')
    s.textContent = `html{scroll-behavior:auto !important}
      .vt-masthead{position:relative !important}
      *,*::before,*::after{animation-duration:.001ms !important;transition-duration:.001ms !important}`
    document.head?.appendChild(s)
  }
  if (document.head) apply()
  else document.addEventListener('DOMContentLoaded', apply, { once: true })
})

let bad = 0
for (const route of routes) {
  const page = await ctx.newPage()
  const missing = []
  page.on('response', (r) => {
    if (r.status() >= 400) missing.push(`${r.status()} ${r.url()}`)
  })
  page.on('pageerror', (e) => missing.push(`JS ERROR ${e.message}`))

  await page.goto(BASE + route, { waitUntil: 'load' })
  // Walk the page so every observer fires, then settle at the top.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 45))
    }
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 350))
  })
  await page.waitForTimeout(450)

  const report = await page.evaluate(() => {
    const de = document.documentElement
    const vw = de.clientWidth

    // The page shell clips sideways so that sticky keeps working, which means
    // horizontal overflow never appears as document scrollWidth — it is just
    // silently guillotined. So look for boxes whose right edge is past the
    // viewport.
    //
    // The distinction that matters: is the overflow CONTAINED by something that
    // scrolls or clips it on purpose? A carousel card, a wide schedule grid and
    // an overscanned parallax image all sit inside their own scroller or their
    // own overflow-hidden frame, and are fine. What is NOT fine is a box that
    // nothing contains except the shell's clip — that is text being cut off with
    // no way to reach it, and it is invisible to any check that watches
    // scrollWidth alone.
    const containedByOwnFrame = (el) => {
      for (let n = el.parentElement; n && n.id !== 'root'; n = n.parentElement) {
        const ox = getComputedStyle(n).overflowX
        if (ox === 'auto' || ox === 'scroll' || ox === 'hidden' || ox === 'clip') return true
      }
      return false
    }

    const overflow = []
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) continue
      if (r.right <= vw + 2 && r.left >= -2) continue
      if (containedByOwnFrame(el)) continue
      overflow.push(
        `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 58)} → ${Math.round(r.left)}…${Math.round(r.right)} (vw ${vw})`,
      )
    }

    const invisible = []
    for (const el of document.querySelectorAll('.rv, .clip-in, .mask-head')) {
      const cs = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      if (r.height === 0) continue
      if (Number(cs.opacity) < 0.9 && !el.classList.contains('is-in')) {
        invisible.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 50)}`)
      }
      if (invisible.length > 6) break
    }
    const lines = [...document.querySelectorAll('.mask-line')].filter(
      (l) => Number(getComputedStyle(l).opacity) < 0.9,
    ).length
    return {
      scrollWidth: de.scrollWidth,
      clientWidth: vw,
      overflow: overflow.slice(0, 8),
      overflowCount: overflow.length,
      invisible,
      dimLines: lines,
      title: document.title,
      h1: document.querySelectorAll('h1').length,
    }
  })

  const name = route.replace(/\W+/g, '_') || 'root'
  await page.screenshot({ path: `${OUT}/${width}${name}.png`, fullPage: full })

  const issues = [
    report.overflowCount ? `CLIPPED ${report.overflowCount} box(es) past the viewport` : '',
    report.invisible.length ? `INVISIBLE ${report.invisible.length}` : '',
    report.dimLines ? `DIM LINES ${report.dimLines}` : '',
    report.h1 !== 1 ? `H1 COUNT ${report.h1}` : '',
    missing.length ? `REQ ${missing.length}` : '',
  ].filter(Boolean)
  if (issues.length) bad++

  console.log(
    `${width.toString().padStart(4)} ${route.padEnd(11)} ${issues.length ? '✗ ' + issues.join(' · ') : '✓ clean'}  "${report.title.slice(0, 46)}"`,
  )
  report.overflow.forEach((o) => console.log('        overflow:', o))
  report.invisible.forEach((o) => console.log('        invisible:', o))
  missing.slice(0, 8).forEach((m) => console.log('        req:', m))
  await page.close()
}

await browser.close()
process.exit(bad ? 1 : 0)
