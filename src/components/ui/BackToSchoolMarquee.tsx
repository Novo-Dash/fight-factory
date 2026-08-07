const ITEM = 'FIGHT FACTORY BACK TO SCHOOL · AUSTIN, TX · '
const items = Array(16).fill(ITEM)

export function BackToSchoolMarquee() {
  return (
    <div
      className="overflow-hidden py-4"
      style={{ background: '#CC0000' }}
      aria-hidden="true"
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee 22s linear infinite' }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="text-white shrink-0"
            style={{
              fontFamily: "'Tagbogy', 'HipsterHatch', 'Anton', sans-serif",
              fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
              letterSpacing: '0.12em',
              paddingRight: '0.5rem',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

