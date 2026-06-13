// =============================================================================
// schedule.ts — Configuração da agenda (a parte específica da academia)
// -----------------------------------------------------------------------------
// Fight Factory Jiu Jitsu — Austin, TX (sub-account GHL 7ai3O8KqknYgJu59oYfE)
//
// ⚠️ REGRA-MÃE: o calendário é casado por `calendar_id` (PROGRAM_CALENDAR_ID),
// imune a rename. O `PROGRAM_LABEL` (nome) é o rótulo do radio E o `program`
// enviado ao CRM (Webhook 1) — mantido igual ao nome do calendário no GHL por
// consistência, mas NÃO é o que casa o calendário no n8n.
//
// Os horários NÃO ficam aqui: vêm AO VIVO do GHL (free-slots via n8n, §5.1).
// O SCHEDULE estático abaixo é só FALLBACK de erro da chamada de slots.
// =============================================================================

// Chaves internas: ASCII, estáveis, nunca exibidas. Use para LÓGICA.
export type Program = 'adults' | 'kids-7-12' | 'kids-4-6'
export type Audience = 'adults' | 'kids'

// Ordem de exibição dos radios na Etapa 1 (página principal).
export const PROGRAMS: Program[] = ['adults', 'kids-7-12', 'kids-4-6']

// Subconjunto exibido na landing dedicada de kids (/kids).
export const KIDS_PROGRAMS: Program[] = ['kids-7-12', 'kids-4-6']

// Labels: o texto que o usuário vê no radio E o `program` enviado ao CRM.
// Copiado LITERALMENTE dos calendários da sub-account (GET /calendars/).
export const PROGRAM_LABEL: Record<Program, string> = {
  adults: 'Adults Brazilian Jiu Jitsu All Levels',
  'kids-7-12': 'Kids (7-12 years) Brazilian Jiu Jitsu',
  'kids-4-6': 'Kids (4-6 Years) Brazilian Jiu Jitsu',
}

// Audience por programa: padroniza o Webhook 1 para o workflow único (§3.1).
export const PROGRAM_AUDIENCE: Record<Program, Audience> = {
  adults: 'adults',
  'kids-7-12': 'kids',
  'kids-4-6': 'kids',
}

// ID do calendário no GHL por programa. É a CHAVE que casa o calendário no n8n
// (Webhook 2 + slots). Puxado do GHL no onboarding (GET /calendars/ traz id+nome).
export const PROGRAM_CALENDAR_ID: Record<Program, string> = {
  adults: 'k7wqlTV7HzXgMH7kPyeY',
  'kids-7-12': '8RAr2kpFrtPo7fWq4d3Z',
  'kids-4-6': 'C1QqynI6nU5flirq65W7',
}

// Descrição curta exibida abaixo do label no radio (apenas UI, não vai no payload).
export const PROGRAM_HINT: Record<Program, string> = {
  adults: 'All levels · beginners welcome',
  'kids-7-12': 'Ages 7–12 · fundamentals, focus & fun',
  'kids-4-6': 'Ages 4–6 · playful first steps',
}

// Mapa de disponibilidade: "YYYY-MM-DD" → ["HH:MM", …] (24h). É o que o GHL
// devolve ao vivo (já convertido pelo fetchSlots) e também a forma do fallback.
export type SlotMap = Record<string, string[]>

// Horários por programa por dia da semana (0=Dom … 6=Sáb), 24h "HH:MM".
// FALLBACK ESTÁTICO apenas — derivado dos open hours reais dos calendários GHL.
//   Adults BJJ All Levels:  Seg–Qui 18:15
//   Kids (7-12 years):      Seg–Qui 17:15
//   Kids (4-6 Years):       Seg, Qua, Qui 16:30
const SCHEDULE: Record<Program, Record<number, string[]>> = {
  adults: {
    0: [], 1: ['18:15'], 2: ['18:15'], 3: ['18:15'], 4: ['18:15'], 5: [], 6: [],
  },
  'kids-7-12': {
    0: [], 1: ['17:15'], 2: ['17:15'], 3: ['17:15'], 4: ['17:15'], 5: [], 6: [],
  },
  'kids-4-6': {
    0: [], 1: ['16:30'], 2: [], 3: ['16:30'], 4: ['16:30'], 5: [], 6: [],
  },
}

export const BOOKING_RANGE_DAYS = 14 // janela de agendamento (allowBookingFor no GHL)
export const BUFFER_HOURS = 5 // antecedência mínima — só p/ o fallback estático (ao vivo é do GHL)
export const ACADEMY_TIMEZONE = 'America/Chicago'

export const ACADEMY_ADDRESS = {
  name: 'Fight Factory Jiu Jitsu',
  street: '9607 Research Blvd, Suite 675',
  city: 'Austin, TX 78759',
  phone: '(512) 905-0644',
  mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJeU0gUonMRIYR-Sw3F407_zo',
}

// -----------------------------------------------------------------------------
// Helpers de data/hora (lógica idêntica entre academias)
// -----------------------------------------------------------------------------

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function addDays(d: Date, days: number): Date {
  const r = new Date(d)
  r.setDate(r.getDate() + days)
  return r
}

/** "2026-06-15" → Date local (NÃO usar new Date(str), que parseia como UTC). */
export function parseLocalDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** Janela agendável: de hoje até hoje + BOOKING_RANGE_DAYS (datas locais). */
export function getBookingWindow(): { min: Date; max: Date } {
  const min = startOfDay(new Date())
  return { min, max: addDays(min, BOOKING_RANGE_DAYS) }
}

/** Horários do dia para a data, lendo o mapa retornado pelo GHL (ou fallback). */
export function getTimesForDay(slots: SlotMap, date: Date): string[] {
  return slots[isoDate(date)] ?? []
}

/** Data agendável: dentro da janela E com pelo menos um horário no mapa. */
export function isDateBookable(slots: SlotMap, date: Date): boolean {
  const { min, max } = getBookingWindow()
  const d = startOfDay(date)
  if (d.getTime() < min.getTime() || d.getTime() > max.getTime()) return false
  return (slots[isoDate(date)]?.length ?? 0) > 0
}

/** Primeira data agendável do mapa (ou null). O calendário abre no mês dela. */
export function getFirstBookableDate(slots: SlotMap): Date | null {
  const keys = Object.keys(slots)
    .filter((k) => (slots[k]?.length ?? 0) > 0)
    .sort()
  for (const k of keys) {
    const d = parseLocalDate(k)
    if (isDateBookable(slots, d)) return d
  }
  return null
}

/**
 * Fallback estático (só quando a chamada de slots falha): monta um SlotMap a
 * partir do SCHEDULE para a janela atual, aplicando o BUFFER_HOURS.
 */
export function staticFallbackSlots(program: Program): SlotMap {
  const { min } = getBookingWindow()
  const now = new Date()
  const bufferMs = BUFFER_HOURS * 60 * 60 * 1000
  const out: SlotMap = {}
  for (let i = 0; i <= BOOKING_RANGE_DAYS; i++) {
    const date = addDays(min, i)
    const slots = (SCHEDULE[program]?.[date.getDay()] ?? []).filter((slot) => {
      const [h, m] = slot.split(':').map(Number)
      const slotDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m, 0, 0)
      return slotDate.getTime() - now.getTime() >= bufferMs
    })
    if (slots.length) out[isoDate(date)] = slots
  }
  return out
}

/**
 * "18:15" → "6:15 PM". É ESTA função que produz o `appointment_time`
 * (12h + AM/PM) — o formato que o Luxon do workflow n8n consegue parsear.
 * NUNCA enviar 24h ("18:15") para o webhook.
 */
export function formatTimeLabel(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  let hour = h % 12
  if (hour === 0) hour = 12
  return `${hour}:${String(m).padStart(2, '0')} ${period}`
}

/**
 * Data local → "YYYY-MM-DD". NÃO usar toISOString() (UTC desloca o dia).
 * É o que vai no `appointment_date` do Webhook 2.
 */
export function isoDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** "Monday, June 2" — exibição. */
export function formatDateLong(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

/** "June 2026" — exibição do cabeçalho do calendário. */
export function formatMonthYear(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}
