import type { ReactNode } from 'react'
import { MaskHeading } from './MaskHeading'
import { Reveal } from './motion'
import { Rule, Tag } from './ui'

/**
 * The opening block of an inner page. Every inner page shares it so the set
 * reads as one document — but it is deliberately the ONLY repeated opener on
 * the site: the sections inside each page vary their entry instead of all
 * starting with a tag, a title and a standfirst.
 */
export function PageHead({
  tag,
  title,
  standfirst,
  aside,
}: {
  tag: string
  title: string
  standfirst?: string
  aside?: ReactNode
}) {
  return (
    <header className="wrap pt-12 md:pt-16">
      <Reveal>
        <Tag>{tag}</Tag>
      </Reveal>
      <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-14">
        <MaskHeading as="h1" text={title} className="t-mega min-w-0" />
        {standfirst ? (
          <Reveal delay={110}>
            <p className="standfirst max-w-lg text-body lg:pb-3">{standfirst}</p>
          </Reveal>
        ) : null}
      </div>
      {aside ? <div className="mt-12">{aside}</div> : null}
      <Rule className="mt-12 md:mt-14" />
    </header>
  )
}
