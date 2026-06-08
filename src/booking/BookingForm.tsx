import { useRef, useState } from 'react'
import { pushEvent } from './analytics'
import { Step1Details } from './Step1Details'
import { Step2Schedule } from './Step2Schedule'
import { isStep1Valid } from './validation'
import { Success } from './Success'
import { sendBookingWebhook, sendLeadWebhook } from './webhook'
import type { BookingData } from './types'
import { PROGRAMS } from './schedule'

type Step = 1 | 2 | 'success'

/** Pré-preenchimento via query string (links do GHL com merge fields). */
function readPrefill(): Partial<BookingData> {
  const params = new URLSearchParams(window.location.search)
  const out: Partial<BookingData> = {}
  // Ignora merge tag não resolvida ({{ ou }}) e valores vazios.
  const clean = (v: string | null) => (v && !v.includes('{{') && !v.includes('}}') ? v.trim() : '')

  const name = clean(params.get('full_name'))
  if (name) out.name = name

  const email = clean(params.get('email'))
  if (email) out.email = email

  const rawPhone = clean(params.get('phone'))
  if (rawPhone) {
    let digits = rawPhone.replace(/\D/g, '')
    // GHL manda E.164 (+15555555555) → remove o código de país antes de formatar.
    if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1)
    out.phone =
      digits.length === 10
        ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
        : rawPhone
  }
  return out
}

function makeInitial(): BookingData {
  return {
    name: '',
    email: '',
    phone: '',
    program: PROGRAMS[0],
    date: null,
    time: null,
    ...readPrefill(), // leitura única no mount; edições do usuário sempre vencem
  }
}

interface BookingFormProps {
  /** Chamado após o reset, ao concluir. No modal: fecha. No /book: undefined (fica na Etapa 1). */
  onDone?: () => void
  kidsMode?: boolean
}

export function BookingForm({ onDone, kidsMode }: BookingFormProps) {
  const [step, setStep] = useState<Step>(1)
  const [data, setData] = useState<BookingData>(() => ({
    ...makeInitial(),
    ...(kidsMode ? { program: 'kids' as const } : {}),
  }))
  const leadSent = useRef(false) // dedupe do Webhook 1 (1x por sessão de booking)

  function patch(p: Partial<BookingData>) {
    setData((prev) => ({ ...prev, ...p }))
  }

  function handleNext() {
    if (!isStep1Valid(data, kidsMode)) return
    // Webhook 1: dispara uma vez por sessão, mesmo se voltar e avançar de novo.
    if (!leadSent.current) {
      leadSent.current = true
      sendLeadWebhook(data) // fire-and-forget
    }
    setStep(2)
  }

  function handleConfirm() {
    if (data.date == null || data.time == null) return
    pushEvent('trial_booked')
    sendBookingWebhook(data) // fire-and-forget
    setStep('success')
  }

  function handleDone() {
    setData(makeInitial())
    setStep(1)
    leadSent.current = false
    onDone?.()
  }

  if (step === 'success') return <Success data={data} onDone={handleDone} />
  if (step === 2) {
    return <Step2Schedule data={data} onChange={patch} onBack={() => setStep(1)} onConfirm={handleConfirm} />
  }
  return <Step1Details data={data} onChange={patch} onNext={handleNext} kidsMode={kidsMode} />
}
