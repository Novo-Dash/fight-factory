export function PatternBg() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none"
      aria-hidden
      style={{
        backgroundImage: 'url(/kids/imagem/pattern.webp)',
        backgroundRepeat: 'repeat',
        backgroundSize: '320px',
        opacity: 0.03,
        zIndex: 0,
      }}
    />
  )
}
