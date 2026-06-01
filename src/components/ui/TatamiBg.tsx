export function TatamiBg() {
  return (
    <>
      {/* Tatami grid */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden
        style={{
          zIndex: 0,
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px,
              transparent 1px, transparent 20px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px,
              transparent 1px, transparent 20px
            ),
            repeating-linear-gradient(
              45deg,
              rgba(255,255,255,0.008) 0px, rgba(255,255,255,0.008) 1px,
              transparent 1px, transparent 14px
            )
          `,
        }}
      />
      {/* Subtle top-center glow */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden
        style={{
          zIndex: 0,
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)',
        }}
      />
    </>
  )
}
