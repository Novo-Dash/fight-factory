import type { Program } from './schedule'

/** Estado do formulário de booking (compartilhado entre modal e /book). */
export interface BookingData {
  /** Nome completo (campo único — LP adultos). Vira parent_name e child_name no Webhook 2. */
  name: string
  /** Nome da criança (kidsMode). */
  childName?: string
  /** Nome do responsável (kidsMode). */
  parentName?: string
  email: string
  phone: string
  program: Program
  /** Data escolhida na Etapa 2 (local). */
  date: Date | null
  /** Horário escolhido na Etapa 2, em 24h "HH:MM". */
  time: string | null
}
