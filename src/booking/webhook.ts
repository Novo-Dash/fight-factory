// =============================================================================
// webhook.ts — Transporte e montagem dos 2 webhooks
// -----------------------------------------------------------------------------
// Webhook 1 → LeadConnector/GHL (lead). Payload flexível, mapeado na UI do GHL.
// Webhook 2 → workflow n8n compartilhado (agendamento). ⚠️ CONTRATO CRÍTICO:
//   schema EXATO, class_type = nome do calendário, hora 12h AM/PM, data local.
// =============================================================================

import { getAttribution } from './attribution'
import { PROGRAM_LABEL, formatTimeLabel, isoDate } from './schedule'
import type { BookingData } from './types'

// --- location_id: definido UMA vez; a URL do Webhook 1 é derivada dele -------
// (o location_id é o segmento após /hooks/ no Inbound Webhook do LeadConnector,
// e é o MESMO valor que vai no location_id do Webhook 2 → nunca divergem).
const GHL_LOCATION_ID = '7ai3O8KqknYgJu59oYfE'
const LEAD_WEBHOOK_UUID = 'zvG8tH1SZiNIXKU5a0GQ'
const LEAD_WEBHOOK_URL = `https://services.leadconnectorhq.com/hooks/${GHL_LOCATION_ID}/webhook-trigger/${LEAD_WEBHOOK_UUID}`

// --- Webhook 2: FIXO para todas as academias (produção, já validado) ---------
const N8N_ORIGIN = 'https://n8n.novodash.com'
const N8N_PATH = 'webhook' // "webhook-test" só se for mexer no workflow compartilhado
const BOOKING_WEBHOOK_URL = `${N8N_ORIGIN}/${N8N_PATH}/landing-page-calendar`

const SOURCE_LABEL = 'Landing Page Principal - Fight Factory Jiu Jitsu'

// -----------------------------------------------------------------------------
// Helpers de payload
// -----------------------------------------------------------------------------

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean)
  return { first: parts[0] ?? '', last: parts.slice(1).join(' ') }
}

/** "+1" + 10 dígitos (US). Mantém os dígitos crus se não bater no padrão. */
function toE164(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  return digits ? `+${digits}` : ''
}

// -----------------------------------------------------------------------------
// Transporte — fire-and-forget, nunca lança, sempre loga
// -----------------------------------------------------------------------------

async function post(url: string, payload: Record<string, unknown>): Promise<void> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true, // entrega mesmo se o modal/aba fechar
    })
    if (!res.ok) {
      // webhook falho = lead/agendamento perdido → loga em dev E prod
      console.warn(`[webhook] ${url} → HTTP ${res.status}`)
      return
    }
    if (import.meta.env.DEV) console.info(`[webhook] ${url} → ok`)
  } catch (err) {
    // Atenção: erro de CORS no console não prova que não chegou — o servidor
    // pode ter recebido. Fonte da verdade = log de execução do n8n.
    console.warn(`[webhook] ${url} → network/CORS error`, err)
  }
}

// -----------------------------------------------------------------------------
// Webhook 1 — Lead (destino: LeadConnector / GHL)
// -----------------------------------------------------------------------------

export function sendLeadWebhook(data: BookingData): void {
  const { first, last } = splitName(data.name)
  const payload = {
    event: 'lead_captured',
    name: data.name,
    firstName: first,
    lastName: last,
    email: data.email,
    phone: data.phone,
    phoneE164: toE164(data.phone),
    program: data.program,
    submittedAt: new Date().toISOString(),
    source: SOURCE_LABEL,
    // marketing attribution (só aqui) — espalha as chaves que vieram na URL
    ...getAttribution(),
  }
  void post(LEAD_WEBHOOK_URL, payload)
}

// -----------------------------------------------------------------------------
// Webhook 2 — Agendamento (destino: workflow n8n compartilhado) ⚠️ CONTRATO
// -----------------------------------------------------------------------------

export function sendBookingWebhook(data: BookingData): void {
  if (!data.date || !data.time) {
    console.warn('[webhook] booking sem data/hora — ignorado')
    return
  }
  const payload = {
    parent_name: data.parentName ?? data.name,
    child_name: data.childName ?? data.name,
    email: data.email,
    phone: data.phone, // formato exibido "(555) 555-5555" é aceito
    class_type: PROGRAM_LABEL[data.program], // = nome EXATO do calendário no GHL
    location_id: GHL_LOCATION_ID,
    stage: 'appointment_selected', // ignorado pelo workflow; valor fixo
    appointment_date: isoDate(data.date), // YYYY-MM-DD local
    appointment_time: formatTimeLabel(data.time), // h:mm AM/PM
    source: SOURCE_LABEL,
  }
  void post(BOOKING_WEBHOOK_URL, payload)
}
