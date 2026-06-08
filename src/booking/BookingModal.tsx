import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { BookingForm } from './BookingForm'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  kidsMode?: boolean
}

export function BookingModal({ isOpen, onClose, kidsMode }: BookingModalProps) {
  // Esc fecha + trava o scroll do body enquanto aberto.
  useEffect(() => {
    if (!isOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book your free trial class"
        className="relative w-full max-w-md my-auto rounded-2xl border border-[#D8D8D8] overflow-hidden"
        style={{ background: '#FFFFFF', borderTop: '3px solid #CC0000' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#999999] hover:text-[#0A0A0A] transition-colors z-10 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <BookingForm onDone={onClose} kidsMode={kidsMode} />
      </div>
    </div>,
    document.body,
  )
}
