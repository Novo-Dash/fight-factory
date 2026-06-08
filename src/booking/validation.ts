import { PROGRAMS } from './schedule'
import type { BookingData } from './types'

/** Validação da Etapa 1: nome ≥ 2 chars, e-mail válido, telefone ≥ 10 dígitos, programa escolhido. */
export function isStep1Valid(data: BookingData, kidsMode = false): boolean {
  const nameOk = kidsMode
    ? (data.childName ?? '').trim().length >= 2 && (data.parentName ?? '').trim().length >= 2
    : data.name.trim().length >= 2
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
  const phoneOk = data.phone.replace(/\D/g, '').length >= 10
  const programOk = PROGRAMS.includes(data.program)
  return nameOk && emailOk && phoneOk && programOk
}
