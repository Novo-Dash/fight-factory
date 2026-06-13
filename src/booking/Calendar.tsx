import { useState } from 'react'
import {
  type SlotMap,
  formatMonthYear,
  getBookingWindow,
  isDateBookable,
  isoDate,
} from './schedule'

interface CalendarProps {
  /** Disponibilidade ao vivo do GHL (ou fallback): "YYYY-MM-DD" → ["HH:MM"]. */
  slots: SlotMap
  /** Mês em que o calendário abre (mês da primeira data agendável). */
  initialMonth: Date
  selected: Date | null
  onSelect: (date: Date) => void
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** Grid de mês, navegação, desabilita datas fora da janela / sem horário. */
export function Calendar({ slots, initialMonth, selected, onSelect }: CalendarProps) {
  const { min, max } = getBookingWindow()
  // Mês visível: abre no mês da primeira data agendável (não no mês cru de hoje).
  const [viewMonth, setViewMonth] = useState(
    () => new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1),
  )

  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Limites de navegação: não voltar antes do mês de hoje nem passar do mês de `max`.
  const canPrev = year > min.getFullYear() || month > min.getMonth()
  const canNext =
    year < max.getFullYear() || (year === max.getFullYear() && month < max.getMonth())

  const cells: (Date | null)[] = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))

  return (
    <div>
      {/* Header: navegação de mês */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => canPrev && setViewMonth(new Date(year, month - 1, 1))}
          disabled={!canPrev}
          aria-label="Previous month"
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#0A0A0A] border border-[#D8D8D8] hover:border-[#0A0A0A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span
          className="text-[#0A0A0A] uppercase"
          style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.1rem', letterSpacing: '0.02em' }}
        >
          {formatMonthYear(viewMonth)}
        </span>
        <button
          type="button"
          onClick={() => canNext && setViewMonth(new Date(year, month + 1, 1))}
          disabled={!canNext}
          aria-label="Next month"
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#0A0A0A] border border-[#D8D8D8] hover:border-[#0A0A0A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Cabeçalho dos dias da semana */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS.map((w) => (
          <div key={w} className="text-center text-[#999999] text-[0.65rem] uppercase tracking-wider py-1">
            {w}
          </div>
        ))}
      </div>

      {/* Grid de dias */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />
          const bookable = isDateBookable(slots, date)
          const isSelected = selected != null && isoDate(selected) === isoDate(date)
          return (
            <button
              key={isoDate(date)}
              type="button"
              disabled={!bookable}
              onClick={() => onSelect(date)}
              aria-pressed={isSelected}
              className={[
                'aspect-square rounded-lg text-sm flex items-center justify-center transition-colors',
                bookable ? 'cursor-pointer' : 'cursor-not-allowed',
                isSelected
                  ? 'bg-[#CC0000] text-white font-semibold'
                  : bookable
                    ? 'text-[#0A0A0A] hover:bg-[#F0F0F0] border border-[#E5E5E5]'
                    : 'text-[#CCCCCC]',
              ].join(' ')}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
