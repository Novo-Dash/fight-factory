// =============================================================================
// analytics.ts — Tracking de conversão (Meta Pixel + GA4 + Google Ads)
// -----------------------------------------------------------------------------
// Cada evento sai por UM caminho, pela tag da própria plataforma no código:
//   • fbq  → Meta Pixel   (§7)
//   • gtag → GA4 e Google Ads (§7-bis)
// SEM GTM no stack — nenhum container disparando os mesmos eventos (evita contar
// dobrado). Todos os helpers têm guarda: se a tag não carregou, viram no-op e
// NUNCA quebram o fluxo de lead/booking (fire-and-forget).
// =============================================================================

// --- Alvos de conversão do Google Ads (vazio = no-op) ------------------------
const GOOGLE_ADS_ID = 'AW-18177687947'
export const GADS_LEAD = GOOGLE_ADS_ID ? `${GOOGLE_ADS_ID}/nG6XCNHClr4cEIuD5ttD` : ''
export const GADS_BOOKING = GOOGLE_ADS_ID ? `${GOOGLE_ADS_ID}/bWvTCJnblr4cEIuD5ttD` : ''

// --- Meta Pixel --------------------------------------------------------------
/** Evento padrão do Meta via fbq. No-op se o Pixel não carregou. */
export function fbqTrack(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('track', event, params ?? {})
}

// --- GA4 ---------------------------------------------------------------------
/** Evento GA4 via gtag. No-op se o gtag não carregou. */
export function ga4Event(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', event, params ?? {})
}

// --- Google Ads --------------------------------------------------------------
/** Conversão do Google Ads via gtag. No-op se não carregou ou sem rótulo. */
export function gtagConversion(sendTo: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  if (!sendTo) return // academia sem Google Ads
  window.gtag('event', 'conversion', { send_to: sendTo })
}

/**
 * Enhanced Conversions: dados do usuário (o gtag faz o hash sozinho). Setar uma
 * vez antes da conversão de Lead cobre as duas conversões da sessão. Inofensivo
 * se Enhanced Conversions não estiver ligado na ação do Google Ads.
 */
export function setUserData(email: string, phoneE164: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('set', 'user_data', { email, phone_number: phoneE164 })
}

// --- Funil: abertura do fluxo ------------------------------------------------
/** Dispara ViewContent (Meta) + view_content (GA4) ao abrir o modal / montar /book. */
export function trackViewContent(): void {
  fbqTrack('ViewContent', { content_name: 'Trial Booking' })
  ga4Event('view_content', { content_name: 'Trial Booking' })
}
