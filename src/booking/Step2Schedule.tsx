import { useEffect, useRef, useState } from 'react'
import { Calendar } from './Calendar'
import {
  PROGRAM_LABEL,
  formatDateLong,
  formatTimeLabel,
  getBookingWindow,
  getFirstBookableDate,
  getTimesForDay,
  staticFallbackSlots,
  type Program,
  type SlotMap,
} from './schedule'
import { fetchSlots } from './webhook'
import type { BookingData } from './types'

interface Step2Props {
  data: BookingData
  onChange: (patch: Partial<BookingData>) => void
  onBack: () => void
  onConfirm: () => void
}

type Status = 'loading' | 'ready' | 'error'

export function Step2Schedule({ data, onChange, onBack, onConfirm }: Step2Props) {
  const program = data.program as Program
  const [status, setStatus] = useState<Status>('loading')
  const [slots, setSlots] = useState<SlotMap>({})
  const preselected = useRef(false)

  // Busca os horários AO VIVO no GHL ao entrar na Etapa 2. O estado inicial já é
  // 'loading' (mount fresco), então a agenda nunca pinta antes dos slots (§8
  // item 15) — sem setState síncrono no effect. As atualizações de slots/status
  // saem dentro dos callbacks async do fetch.
  useEffect(() => {
    let alive = true
    fetchSlots(program)
      .then((map) => {
        if (!alive) return
        setSlots(map)
        setStatus('ready')
      })
      .catch(() => {
        if (!alive) return
        // Fallback: agenda estática mínima (nunca trava o usuário).
        setSlots(staticFallbackSlots(program))
        setStatus('error')
      })
    return () => {
      alive = false
    }
  }, [program])

  // Pré-seleciona a primeira data agendável quando os slots chegam (1x).
  useEffect(() => {
    if (status === 'loading' || preselected.current) return
    preselected.current = true
    if (!data.date) {
      const first = getFirstBookableDate(slots)
      if (first) onChange({ date: first, time: null })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, slots])

  const times = data.date ? getTimesForDay(slots, data.date) : []
  const canConfirm = data.date != null && data.time != null
  const initialMonth = data.date ?? getFirstBookableDate(slots) ?? getBookingWindow().min

  function selectDate(date: Date) {
    onChange({ date, time: null }) // troca de data limpa o horário escolhido
  }

  return (
    <div className="p-8">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <div
            className="text-[#0A0A0A] mb-1"
            style={{ fontFamily: 'Anton, sans-serif', fontSize: '1.5rem', letterSpacing: '0.01em', textTransform: 'uppercase' }}
          >
            Pick a Date &amp; Time
          </div>
          <p className="text-[#666666] text-sm">{PROGRAM_LABEL[program]}</p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-[#666666] hover:text-[#0A0A0A] text-sm underline transition-colors cursor-pointer shrink-0 mt-1"
        >
          Back
        </button>
      </div>

      {status === 'loading' ? (
        // Loading ANTES de desenhar a agenda — não pinta horários de estado antigo.
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <span className="w-6 h-6 rounded-full border-2 border-[#E5E5E5] border-t-[#CC0000] animate-spin" />
          <span className="text-[#999999] text-sm">Loading available times…</span>
        </div>
      ) : (
        <>
          <Calendar slots={slots} initialMonth={initialMonth} selected={data.date} onSelect={selectDate} />

          {/* Lista de horários do dia selecionado */}
          <div className="mt-6">
            {!data.date ? (
              <p className="text-[#999999] text-sm text-center py-2">Select a date to see available times.</p>
            ) : times.length === 0 ? (
              <p className="text-[#999999] text-sm text-center py-2">No times available on this day.</p>
            ) : (
              <>
                <span className="block text-[#666666] text-xs mb-2 uppercase tracking-wider">
                  {formatDateLong(data.date)}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {times.map((t) => {
                    const selected = data.time === t
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => onChange({ time: t })}
                        aria-pressed={selected}
                        className={[
                          'py-2.5 rounded-full text-sm font-medium border transition-colors cursor-pointer',
                          selected
                            ? 'bg-[#CC0000] text-white border-[#CC0000]'
                            : 'text-[#0A0A0A] border-[#D8D8D8] hover:border-[#0A0A0A]',
                        ].join(' ')}
                      >
                        {formatTimeLabel(t)}
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </>
      )}

      <button
        type="button"
        disabled={!canConfirm}
        onClick={onConfirm}
        className="w-full mt-6 bg-[#CC0000] hover:bg-[#B30000] text-white font-semibold py-3.5 rounded-full transition-all duration-200 hover:scale-[1.01] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer min-h-[44px]"
        style={{ fontSize: '16px' }}
      >
        Confirm Booking →
      </button>
    </div>
  )
}
