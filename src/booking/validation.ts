import { PROGRAMS, PROGRAM_AUDIENCE } from './schedule'
import type { BookingData } from './types'

/**
 * Validação da Etapa 1: nome ≥ 2 chars, e-mail válido, telefone ≥ 10 dígitos,
 * programa escolhido. Se o programa for de kids, exige também o nome da criança.
 */
export function isStep1Valid(data: BookingData): boolean {
  const nameOk = data.name.trim().length >= 2
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
  const phoneOk = data.phone.replace(/\D/g, '').length >= 10
  const programOk = PROGRAMS.includes(data.program)
  const childOk =
    PROGRAM_AUDIENCE[data.program] === 'kids'
      ? (data.childName ?? '').trim().length >= 2
      : true
  return nameOk && emailOk && phoneOk && programOk && childOk
}
