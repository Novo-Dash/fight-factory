import { useEffect, useRef } from 'react'

/**
 * Scroll mechanics. Hooks live apart from components so each file exports one
 * kind of thing — the condition fast refresh needs to swap a module without
 * remounting the tree.
 */

/**
 * One scroll observer for the whole page.
 *
 * GSAP's ScrollTrigger drives the reveals when it is available, and a plain
 * IntersectionObserver is registered first as a fallback so a failed dynamic
 * import can never leave the page blank — the start state lives in CSS, so
 * something has to be guaranteed to clear it.
 */
export function useScrollReveals(): void {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = () => Array.from(document.querySelectorAll<HTMLElement>('.rv, .clip-in'))

    if (reduce) {
      nodes().forEach((el) => el.classList.add('is-in'))
      return
    }

    // Fallback first: whatever happens to GSAP below, these fire.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.06 },
    )
    nodes().forEach((el) => io.observe(el))

    let killed = false
    let cleanupGsap: (() => void) | undefined

    void (async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ])
        if (killed) return
        gsap.registerPlugin(ScrollTrigger)
        // GSAP takes over: same class, but batched and with proper refresh
        // handling for images that resize the document as they decode.
        ScrollTrigger.batch(nodes(), {
          start: 'top 88%',
          once: true,
          batchMax: 6,
          onEnter: (batch) =>
            batch.forEach((el, i) =>
              gsap.delayedCall(i * 0.06, () => el.classList.add('is-in')),
            ),
        })
        ScrollTrigger.refresh()
        cleanupGsap = () => ScrollTrigger.getAll().forEach((t) => t.kill())
      } catch {
        /* the observer above already covers this */
      }
    })()

    return () => {
      killed = true
      io.disconnect()
      cleanupGsap?.()
    }
  }, [])
}

export function useParallax(travel = 46) {
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const run = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const raw = (rect.top + rect.height / 2 - vh / 2) / vh
      const p = Math.max(-1, Math.min(1, raw))
      const shift = -p * travel
      const scale = 1 + (travel * 2.2) / Math.max(rect.height, 1)
      el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(run)
    }

    run()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [travel])

  return ref
}
