import { useEffect } from 'react'
import { BookingForm } from './BookingForm'
import { trackViewContent } from './analytics'

/**
 * Rota dedicada /book — destino direto de anúncios/links.
 * SEM navegação (header/footer/links de volta), mas COM identidade visual da
 * marca. Renderiza o MESMO <BookingForm /> do modal (zero duplicação).
 */
export function BookPage() {
  // /book não tem botão de abrir modal → ViewContent dispara ao montar a página.
  useEffect(() => {
    trackViewContent()
  }, [])

  return (
    <div className="relative min-h-dvh w-full overflow-hidden flex flex-col items-center justify-center px-4 py-10" style={{ background: '#FFFFFF' }}>
      {/* Background estilizado: glow vermelho sutil + grid hairline com máscara radial */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(204,0,0,0.10) 0%, rgba(204,0,0,0) 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(10,10,10,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(70% 60% at 50% 40%, #000 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(70% 60% at 50% 40%, #000 0%, transparent 80%)',
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Logo — decorativa, NÃO é link */}
        <img
          src="/images/FONTE.webp"
          alt="Fight Factory Jiu-Jitsu"
          className="h-12 w-auto object-contain mb-7"
          style={{ filter: 'brightness(0)' }}
        />

        {/* Card branco com filete vermelho no topo */}
        <div
          className="w-full rounded-2xl border border-[#D8D8D8] overflow-hidden"
          style={{ background: '#FFFFFF', borderTop: '3px solid #CC0000', boxShadow: '0 12px 48px rgba(0,0,0,0.06)' }}
        >
          <BookingForm />
        </div>

        {/* Eyebrow: mono/uppercase + dot pulsante */}
        <div className="mt-5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CC0000] animate-pulse" />
          <span
            className="text-[#999999] text-[0.65rem] uppercase tracking-[0.18em]"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
          >
            Fight Factory · Austin, TX
          </span>
        </div>
      </div>
    </div>
  )
}
