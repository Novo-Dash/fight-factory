const animals = ['🦁', '🐯', '🦊', '🐻', '🐼', '🐨', '🦁', '🐯', '🦊', '🐻', '🐼', '🐨']

const positions = [
  { top: '4%',  left: '3%',  size: '1.4rem', rot: -15, delay: 0 },
  { top: '8%',  left: '18%', size: '1.1rem', rot: 10,  delay: 1.2 },
  { top: '3%',  left: '38%', size: '1.5rem', rot: -8,  delay: 0.6 },
  { top: '7%',  left: '58%', size: '1.2rem', rot: 12,  delay: 1.8 },
  { top: '5%',  left: '75%', size: '1.4rem', rot: -10, delay: 0.3 },
  { top: '4%',  left: '90%', size: '1.1rem', rot: 8,   delay: 2.1 },
  { top: '88%', left: '5%',  size: '1.3rem', rot: 15,  delay: 0.9 },
  { top: '92%', left: '22%', size: '1.2rem', rot: -12, delay: 1.5 },
  { top: '89%', left: '42%', size: '1.5rem', rot: 7,   delay: 0.4 },
  { top: '91%', left: '62%', size: '1.1rem', rot: -9,  delay: 2.4 },
  { top: '87%', left: '80%', size: '1.4rem', rot: 11,  delay: 1.1 },
  { top: '93%', left: '95%', size: '1.2rem', rot: -14, delay: 0.7 },
]

export function KidsPatternBg() {
  return (
    <>
      <style>{`
        @keyframes kpFloat {
          0%,100% { transform: translateY(0px) rotate(var(--rot)); }
          50%      { transform: translateY(-8px) rotate(var(--rot)); }
        }
      `}</style>
      {/* Subtle swirl pattern underneath */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden
        style={{
          backgroundImage: 'url(/kids/imagem/pattern.webp)',
          backgroundRepeat: 'repeat',
          backgroundSize: '320px',
          opacity: 0.06,
          filter: 'brightness(0) invert(1)',
          zIndex: 0,
        }}
      />
      {/* Animal emojis */}
      {positions.map((p, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            fontSize: p.size,
            opacity: 0.12,
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
            animation: `kpFloat ${3.5 + (i % 3) * 0.8}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            ['--rot' as string]: `${p.rot}deg`,
          }}
        >
          {animals[i]}
        </div>
      ))}
    </>
  )
}
