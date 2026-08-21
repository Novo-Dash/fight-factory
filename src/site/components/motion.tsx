import type { ReactNode } from 'react'

/**
 * Reveal wrappers. The start state lives in CSS and the observers in
 * `scroll.ts` clear it, so nothing here has to know how the motion runs.
 */

/** A block that rises into place on scroll. */
export function Reveal({
  children,
  className = '',
  delay,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'section' | 'article' | 'header' | 'figure' | 'p'
}) {
  return (
    <Tag
      className={`rv ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

/** A photograph that uncovers rather than fading. */
export function Uncover({
  children,
  className = '',
  delay,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <div className={`clip-in ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}

/**
 * Parallax on a full-bleed photograph.
 *
 * The progress term is clamped to [-1, 1]: without the clamp an element far
 * off screen yields values like -6, the translate becomes six times what was
 * intended and the photograph slides out of its own frame. The overscan scale
 * is derived from the travel itself rather than being a fixed 1.06, so the
 * two can never disagree.
 */
