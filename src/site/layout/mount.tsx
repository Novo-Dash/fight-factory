import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import type { ReactNode } from 'react'
import '../site.css'
import { SiteShell } from './SiteShell'
import { captureAttribution } from '../../booking/attribution'

/**
 * The one boot path every page entry calls. Attribution is captured before
 * anything can rewrite the query string, exactly as the landing page does it,
 * so a visitor who arrives from an ad and books from the site still carries
 * their click ids into the CRM.
 */
export function mountPage(current: string, page: ReactNode): void {
  captureAttribution()

  const root = document.getElementById('root')
  if (!root) throw new Error('Root element not found')

  createRoot(root).render(
    <StrictMode>
      <SiteShell current={current}>{page}</SiteShell>
    </StrictMode>,
  )
}
