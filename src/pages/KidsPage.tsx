import { useEffect, useRef, useState } from 'react'
import { BookingProvider } from '../booking/BookingProvider'
import { KidsNavbar } from '../components/layout/KidsNavbar'
import { KidsFooter } from '../components/sections/KidsFooter'
import { useModal } from '../hooks/useModal'
import { KidsMarquee } from '../components/ui/KidsMarquee'

// ─── DATA ──────────────────────────────────────────────────────────────────

const whyBenefits = [
  { text: 'Learn fundamentals step by step' },
  { text: 'Train in a welcoming environment' },
  { text: 'Dedicated instructor during first classes' },
  { text: 'No experience or athletic background required' },
  { text: 'Build confidence before joining advanced groups' },
]
// copy is exact as provided — no modifications


const steps = [
  { num: '01', color: '#CC0000', label: 'Step 1', text: 'Click the button and fill out the form.' },
  { num: '02', color: '#F9B80E', label: 'Step 2', text: 'Choose your class type and pick a date & time on the calendar.' },
  { num: '03', color: '#FFFFFF', label: 'Step 3', text: "You'll get email and SMS confirmations with all the details." },
]

const coachStats = [
  { value: '30+', label: 'Years on the Mats' },
  { value: '5°',  label: 'Black Belt' },
  { value: 'UFC', label: 'Champion Trainer' },
]

const coachBullets = [
  { label: 'NOTABLE STUDENT', text: 'Andrew Tackett — UFC BJJ Champion' },
  { label: 'TEACHING METHOD', text: 'Unique beginner onboarding system' },
  { label: 'LOCATION',        text: 'Austin, TX' },
]

const facilityFeatures = [
  '3,800 sqft facility',
  'Locker rooms and showers',
  'Family-friendly atmosphere',
  'Comfortable beginner environment',
  'Clean and organized facility',
]


const testimonials = [
  { id: '1', name: 'Vipin T.',   rating: 5, text: "The training here is incredibly technical. What impressed me most is how the upper belts pay close attention to every student, correcting technique and making sure you're learning the right way. Great academy.", timeAgo: '2 months ago', avatarBg: '#4285F4' },
  { id: '2', name: 'Laszlo S.', rating: 5, text: 'Both me and my daughter train here. The flexible schedule makes it easy for families to attend. The instructors are patient and encouraging — perfect environment for all ages.', timeAgo: '3 months ago', avatarBg: '#34A853' },
  { id: '3', name: 'K.J.',      rating: 5, text: "I dropped in while visiting Austin and was blown away. Got to train with Kody Steele and the Tackett brothers. World-class instruction in a welcoming environment. Will definitely be back.", timeAgo: '5 months ago', avatarBg: '#EA4335' },
  { id: '4', name: 'Janice R.', rating: 5, text: "The instruction here is truly incredible and the people are so welcoming. From day one I felt at home. If you're thinking about trying Jiu-Jitsu in Austin, this is the place.", timeAgo: '6 months ago', avatarBg: '#FF8C00' },
  { id: '5', name: 'Jesse M.',  rating: 5, text: "I've been training here for months now and the team is completely professional with zero ego. Everyone is focused on improvement and helping each other grow. Highly recommend.", timeAgo: '9 months ago', avatarBg: '#9333EA' },
]

const faqItems = [
  { id: '1', question: 'What is Fight Factory?', answer: 'Fight Factory is a family-friendly Jiu-Jitsu academy in Austin helping children build confidence through structured training.' },
  { id: '2', question: 'What is the community like?', answer: 'Our community includes 250+ students and many families whose children started with zero experience.' },
  { id: '3', question: 'Can my child join without experience?', answer: 'Yes. Many children here started with no experience. Our classes are designed especially for beginners.' },
  { id: '4', question: 'How does the free trial class work?', answer: 'Your child will learn basic techniques in a safe, beginner-friendly class guided by experienced instructors.' },
  { id: '5', question: 'What should my child wear to the trial class?', answer: "Just bring comfortable clothes. We'll provide a clean, brand-new uniform at no cost." },
]

// ─── CALENDAR WIDGET ───────────────────────────────────────────────────────

// June 2024 starts on Saturday → 6 empty slots before day 1
const CAL_OFFSET = 6
const CAL_TOTAL = 30
// col 0=Sun,1=Mon,...,6=Sat
// Available class days mapped to color
const CAL_CLASSES: Record<number, string> = {
  3:'#CC0000', 5:'#CC0000', 8:'#CC0000', 10:'#CC0000',
  12:'#CC0000', 15:'#CC0000', 17:'#CC0000', 19:'#CC0000',
  22:'#CC0000', 24:'#CC0000', 26:'#CC0000', 29:'#CC0000',
}
const CAL_TIMES = ['9:00 AM', '10:30 AM', '12:00 PM', '4:00 PM', '6:00 PM']
const CAL_DAY_LABELS = ['S','M','T','W','T','F','S']

function CalendarWidget() {
  const [selected, setSelected] = useState<number|null>(null)
  const [selTime, setSelTime] = useState<string|null>(null)

  // Build grid: offset empty cells + days 1..30
  const cells: (number|null)[] = [
    ...Array(CAL_OFFSET).fill(null),
    ...Array.from({ length: CAL_TOTAL }, (_, k) => k + 1),
  ]

  function hexToRgba(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1,3),16)
    const g = parseInt(hex.slice(3,5),16)
    const b = parseInt(hex.slice(5,7),16)
    return `rgba(${r},${g},${b},${alpha})`
  }

  return (
    <div style={{ background:'#fff', borderRadius:24, padding:24, boxShadow:'0 4px 32px rgba(0,0,0,0.08)', border:'2px solid #F0F0F0', width:'100%', flex:1, display:'flex', flexDirection:'column', gap:14 }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <p style={{ fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#999', margin:'0 0 2px' }}>Pick a date</p>
          <p style={{ fontFamily:"'Tagbogy',sans-serif", fontSize:'1.5rem', color:'#0A0A0A', margin:0, lineHeight:1 }}>June 2024</p>
        </div>
        <div style={{ display:'flex', gap:6, alignItems:'center' }}>
          {(['#CC0000','#CC0000','#CC0000','#CC0000'] as string[]).map(c => (
            <span key={c} style={{ width:10, height:10, borderRadius:'50%', background:c, display:'inline-block' }} />
          ))}
        </div>
      </div>

      {/* Weekday headers */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:2 }}>
        {CAL_DAY_LABELS.map((d, col) => (
          <div key={col} style={{ textAlign:'center', fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color: col===0||col===6 ? '#D0D0D0' : '#AAAAAA' }}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:4, flex:1 }}>
        {cells.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} />

          const col = i % 7
          const isWknd = col === 0 || col === 6
          const color: string | undefined = CAL_CLASSES[day]
          const isSel = day === selected

          let bg = 'transparent'
          let border = '1.5px solid transparent'
          let textColor = isWknd ? '#CCCCCC' : '#888888'
          let shadow = 'none'
          let scale = 'scale(1)'

          if (color && !isSel) {
            bg = color
            border = `2px solid ${color}`
            textColor = '#FFFFFF'
            shadow = `0 3px 8px ${hexToRgba(color, 0.35)}`
          }
          if (isSel && color) {
            bg = color
            border = `2px solid ${color}`
            textColor = '#FFFFFF'
            shadow = `0 4px 14px ${hexToRgba(color, 0.55)}`
            scale = 'scale(1.1)'
          }

          return (
            <div key={day}
              onClick={() => { if (!color) return; setSelected(day === selected ? null : day); setSelTime(null) }}
              style={{ aspectRatio:'1', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', cursor: color ? 'pointer' : 'default', background:bg, border, transform:scale, transition:'all 0.15s ease', boxShadow:shadow }}
            >
              <span style={{ fontSize:'0.7rem', fontWeight: color ? 700 : 400, color: textColor }}>{day}</span>
            </div>
          )
        })}
      </div>

      {/* Time picker — aparece ao selecionar um dia */}
      {selected !== null && CAL_CLASSES[selected] && (
        <div style={{ borderTop:'1.5px solid #F0F0F0', paddingTop:12 }}>
          <p style={{ fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#999', margin:'0 0 8px' }}>
            Times — June {selected}
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {CAL_TIMES.map(t => {
              const c = CAL_CLASSES[selected]
              const active = t === selTime
              return (
                <button key={t} onClick={() => setSelTime(active ? null : t)}
                  style={{ padding:'5px 11px', borderRadius:50, border:`1.5px solid ${active ? c : '#E0E0E0'}`, background: active ? c : '#FAFAFA', color: active ? '#fff' : '#555', fontSize:'0.72rem', fontWeight:600, cursor:'pointer', transition:'all 0.15s' }}>
                  {t}
                </button>
              )
            })}
          </div>
          {selTime && (
            <div style={{ marginTop:10, background: hexToRgba(CAL_CLASSES[selected], 0.1), borderRadius:12, padding:'10px 14px', display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:'1.1rem' }}>✅</span>
              <div>
                <p style={{ fontSize:'0.65rem', fontWeight:700, color:CAL_CLASSES[selected], margin:0, letterSpacing:'0.05em', textTransform:'uppercase' }}>Selected</p>
                <p style={{ fontSize:'0.85rem', fontWeight:700, color:'#0A0A0A', margin:0 }}>June {selected} · {selTime}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── SECTIONS ──────────────────────────────────────────────────────────────


function Hero() {
  const { openModal } = useModal()

  return (
    <section style={{
      position:'relative', height:'100vh', overflow:'hidden',
      backgroundImage:'url(/kids/imagem/heroimage.webp)',
      backgroundSize:'cover', backgroundPosition:'center center',
    }}>

      {/* Overlay escuro para legibilidade */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.55) 100%)' }} />

      {/* Conteúdo — alinhado ao topo */}
      <div style={{
        position:'absolute', inset:0,
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start',
        textAlign:'center', zIndex:2,
        paddingTop:'calc(80px + 2rem)',
        padding:'calc(80px + 2rem) 2rem 0',
        gap:'1rem',
      }}>

        {/* Eyebrow */}
        <div className="inline-flex items-center" style={{ background:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', border:'1.5px solid rgba(255,255,255,0.35)', borderRadius:8, padding:'4px 14px' }}>
          <span style={{ fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'#FFFFFF' }}>Kids Jiu-Jitsu · Austin, TX</span>
        </div>

        {/* Headline — menor para não sobrepor as crianças */}
        <h1 style={{ fontFamily:"'Tagbogy',sans-serif", fontSize:'clamp(2.2rem, 4.5vw, 5.5rem)', letterSpacing:'0.01em', lineHeight:'0.9', textTransform:'uppercase', margin:0, filter:'drop-shadow(0 2px 10px rgba(0,0,0,0.45))' }}>
          <span style={{ color:'#FFFFFF' }}>Help</span>{' '}
          <span style={{ color:'#FFFFFF' }}>your</span>{' '}
          <span style={{ color:'#FFFFFF' }}>child</span>{' '}
          <span style={{ color:'#CC0000' }}>build</span>{' '}
          <span style={{ color:'#CC0000' }}>confidence</span><br />
          <span style={{ color:'#FFFFFF' }}>from</span>{' '}
          <span style={{ color:'#FFFFFF' }}>their</span>{' '}
          <span style={{ color:'#FFFFFF' }}>very</span>{' '}
          <span style={{ color:'#FFFFFF' }}>first</span>{' '}
          <span style={{ color:'#FFFFFF' }}>Jiu-Jitsu</span>{' '}
          <span style={{ color:'#FFFFFF' }}>class.</span>
        </h1>

        {/* Descrição */}
        <p style={{ color:'rgba(255,255,255,0.9)', fontSize:'clamp(0.9rem, 1.1vw, 1.1rem)', lineHeight:'1.6', maxWidth:'48ch', margin:0, fontWeight:500, textShadow:'0 1px 6px rgba(0,0,0,0.5)' }}>
          Fight Factory helps kids in Austin develop confidence through a beginner-friendly Jiu-Jitsu program — designed to make their first steps feel safe, fun, and motivating.
        </p>

        {/* CTA */}
        <button onClick={openModal} className="inline-flex items-center gap-2 font-bold cursor-pointer transition-all hover:scale-[1.03] active:scale-[0.98]"
          style={{ background:'#CC0000', color:'#fff', padding:'0.875rem 2rem', fontSize:'0.85rem', letterSpacing:'0.08em', textTransform:'uppercase', borderRadius:10, boxShadow:'0 6px 28px rgba(204,0,0,0.5)' }}>
          Book a Free Trial Class →
        </button>

      </div>
    </section>
  )
}

function WhyParents() {
  const { openModal } = useModal()

  return (
    <section style={{ background: '#FFFFFF', padding: '80px 0', overflow: 'hidden' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">

          {/* LEFT: photos */}
          <div style={{ position: 'relative' }}>
            {/* Main large photo */}
            <div style={{ borderRadius: 24, overflow: 'hidden', aspectRatio: '4/5', boxShadow: '0 24px 64px rgba(0,0,0,0.12)' }}
              onMouseEnter={e => { (e.currentTarget.querySelector('img') as HTMLElement).style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { (e.currentTarget.querySelector('img') as HTMLElement).style.transform = 'scale(1)' }}>
              <img src="/kids/imagem/2.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }} />
            </div>

            {/* Small photo — overlapping bottom-right */}
            <div style={{ position: 'absolute', bottom: '-5%', right: '-6%', width: '52%', borderRadius: 18, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 16px 40px rgba(0,0,0,0.15)', border: '4px solid #fff' }}
              onMouseEnter={e => { (e.currentTarget.querySelector('img') as HTMLElement).style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { (e.currentTarget.querySelector('img') as HTMLElement).style.transform = 'scale(1)' }}>
              <img src="/kids/imagem/gallery/2.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }} />
            </div>

            {/* Floating accent */}
            <div style={{ position: 'absolute', top: '12%', right: '-4%', background: '#CC0000', color: '#fff', borderRadius: 14, padding: '14px 18px', boxShadow: '0 8px 24px rgba(204,0,0,0.35)', border: '3px solid #fff' }}>
              <div style={{ fontSize: '1.4rem', lineHeight: 1, fontWeight: 700 }}>5</div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.85, marginTop: 2 }}>Intro<br />Classes</div>
            </div>
          </div>

          {/* RIGHT: content */}
          <div className="flex flex-col gap-7">
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CC0000' }}>Why parents choose us</span>
              <h2 style={{ fontFamily:"'Tagbogy',sans-serif", fontSize: 'clamp(2rem,3.5vw,3.2rem)', lineHeight: '1.05', margin: '10px 0 0' }}>
                <span style={{ color:'#0A0A0A' }}>Why do parents choose</span>{' '}
                <span style={{ color:'#CC0000' }}>Fight Factory?</span>
              </h2>
            </div>

            <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.75', margin: 0 }}>
              Fight Factory offers a kids onboarding system unique in Austin: children begin with 5 introductory classes in a separate group from the regular classes, designed to build confidence in their first steps:
            </p>

            {/* Benefits */}
            <div className="flex flex-col gap-3">
              {whyBenefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3 group cursor-default"
                  style={{ padding: '12px 16px', borderRadius: 12, border: '1.5px solid #F0F0F0', background: '#FFFFFF', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#CC0000'; e.currentTarget.style.borderColor = '#CC0000'; (e.currentTarget.querySelectorAll('*') as NodeListOf<HTMLElement>).forEach(el => { if (el.dataset.txt) el.style.color = '#fff' }) }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#FAFAFA'; e.currentTarget.style.borderColor = '#F0F0F0'; (e.currentTarget.querySelectorAll('*') as NodeListOf<HTMLElement>).forEach(el => { if (el.dataset.txt) el.style.color = '' }) }}
                >
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: ['#CC0000','#CC0000','#CC0000','#CC0000','#CC0000'][i], flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span data-txt="1" style={{ fontSize: '0.9375rem', color: '#333', fontWeight: 500, lineHeight: '1.5', transition: 'color 0.2s' }}>{b.text}</span>
                </div>
              ))}
            </div>

            <button onClick={openModal} className="self-start inline-flex items-center gap-2 font-bold cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: '#CC0000', color: '#fff', padding: '0.875rem 2rem', fontSize: '0.875rem', letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: 8, boxShadow: '0 6px 24px rgba(204,0,0,0.3)' }}>
              Book a Free Trial Class →
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}


function Programs() {
  const { openModal } = useModal()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const cards = [
    {
      id: 'beginner',
      tag: 'BEGINNER',
      title: 'Beginner Kids Program',
      desc: 'Built for children with no experience, using a 5-class onboarding system designed to help kids start confidently.',
      img: '/kids/imagem/4.webp',
      accent: '#CC0000',
    },
    {
      id: 'kids',
      tag: 'KIDS',
      title: 'Kids Program',
      desc: 'Children develop discipline, confidence, focus, and resilience in a safe, structured, family-friendly environment.',
      img: '/kids/imagem/5.webp',
      accent: '#CC0000',
    },
  ]

  return (
    <section id="classes" style={{ background: '#FFFFFF', padding: '80px 0' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">

        {/* Header */}
        <div className="flex flex-row items-end justify-between gap-4" style={{ marginBottom: 20, flexShrink: 0 }}>
          <div>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CC0000', display: 'block', marginBottom: 6 }}>Programs</span>
            <h2 style={{ fontFamily:"'Tagbogy',sans-serif", fontSize: 'clamp(3rem, 6vw, 6.5rem)', lineHeight: '0.95', margin: 0 }}>
              <span style={{ color:'#0A0A0A' }}>Our</span>{' '}
              <span style={{ color:'#0A0A0A' }}>classes</span>
            </h2>
          </div>
          <button onClick={openModal} className="shrink-0 inline-flex items-center gap-2 font-semibold cursor-pointer transition-all hover:scale-[1.02]"
            style={{ background: '#0A0A0A', color: '#fff', padding: '0.875rem 1.75rem', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: 8 }}>
            Book a Free Trial Class →
          </button>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {cards.map((card) => (
            <div key={card.id}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', height: 360, boxShadow: hoveredCard === card.id ? '0 24px 64px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.12)', transform: hoveredCard === card.id ? 'translateY(-4px)' : 'translateY(0)', transition: 'all 0.35s ease' }}
            >
              <img src={card.img} alt={card.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hoveredCard === card.id ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.6s ease' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }} />
              <div style={{ position: 'absolute', top: 14, left: 14, background: card.accent, color: '#fff', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 8 }}>
                {card.tag}
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 22px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h3 style={{ fontFamily:"'Tagbogy',sans-serif", fontSize: 'clamp(2.2rem, 3.5vw, 3.5rem)', color: '#FFFFFF', lineHeight: '1.0', margin: 0, textTransform: 'uppercase' }}>
                  {card.title}
                </h3>
                {/* Descrição + botão em linha */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', lineHeight: '1.5', margin: 0, flex: 1 }}>
                    {card.desc}
                  </p>
                  <button onClick={openModal}
                    style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8, background: card.accent, color: '#fff', border: 'none', borderRadius: 10, padding: '0.7rem 1.25rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    Book a free trial
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

function Process() {
  const { openModal } = useModal()
  const stepColors = ['#CC0000', '#CC0000', '#CC0000']
  const stepBg    = ['#FFF0F5', '#FFFBF0', '#F0FAF5']

  return (
    <section style={{ background: '#f6fafe', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Blobs decorativos */}
      <div style={{ position:'absolute', top:'15%', left:'-80px', width:320, height:320, borderRadius:'50%', background:'rgba(204,0,0,0.06)', filter:'blur(60px)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'15%', right:'-80px', width:280, height:280, borderRadius:'50%', background:'rgba(204,0,0,0.08)', filter:'blur(60px)', pointerEvents:'none' }} />

      <div className="max-w-[1320px] mx-auto px-4 md:px-8 relative" style={{ zIndex:1 }}>

        {/* Header centralizado */}
        <div className="text-center" style={{ marginBottom:48 }}>
          <span style={{ fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'#CC0000' }}>3 Simple Steps</span>
          <h2 style={{ fontFamily:"'Tagbogy',sans-serif", fontSize:'clamp(2.4rem,5vw,4rem)', lineHeight:'1.05', margin:'10px 0 0' }}>
            <span style={{ color:'#CC0000' }}>How</span>{' '}
            <span style={{ color:'#0A0A0A' }}>to</span>{' '}
            <span style={{ color:'#CC0000' }}>get</span>{' '}
            <span style={{ color:'#0A0A0A' }}>started?</span>
          </h2>
          <p style={{ color:'#666', fontSize:'1rem', lineHeight:'1.7', maxWidth:'48ch', margin:'12px auto 0' }}>
            Three simple steps to get your child started with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">

          {/* LEFT — Calendário */}
          <div className="md:col-span-6" style={{ display:'flex', flexDirection:'column' }}>
            <CalendarWidget />
          </div>

          {/* RIGHT — Steps + CTA */}
          <div className="md:col-span-6 flex flex-col gap-4">
            {steps.map((s, idx) => (
              <div key={s.num}
                style={{ background:'#fff', border:'1.5px solid transparent', borderRadius:16, padding:'18px 22px', display:'flex', alignItems:'center', gap:18, boxShadow:'0 2px 12px rgba(0,0,0,0.04)', transition:'all 0.25s ease', cursor:'default' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#CC0000'
                  e.currentTarget.style.boxShadow = '0 12px 20px -5px rgba(204,0,0,0.12)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  const icon = e.currentTarget.querySelector('.step-icon') as HTMLElement
                  if (icon) { icon.style.transform = 'scale(1.1) rotate(5deg)'; icon.style.opacity = '1' }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  const icon = e.currentTarget.querySelector('.step-icon') as HTMLElement
                  if (icon) { icon.style.transform = 'scale(1) rotate(0deg)'; icon.style.opacity = '0.2' }
                }}
              >
                <div style={{ width:48, height:48, borderRadius:'50%', background:stepBg[idx], display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontFamily:"'Tagbogy',sans-serif", fontSize:'1.2rem', fontWeight:700, color:'#CC0000' }}>{s.num}</span>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'#CC0000', margin:'0 0 4px' }}>{s.label}</p>
                  <p style={{ fontSize:'1rem', lineHeight:'1.5', color:'#333', margin:0 }}>{s.text}</p>
                </div>
                <svg className="step-icon" width="22" height="22" viewBox="0 0 20 20" fill="none"
                  style={{ flexShrink:0, opacity:0.2, transition:'transform 0.25s ease, opacity 0.25s ease' }}>
                  <path d="M5 10h10M10 5l5 5-5 5" stroke="#CC0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}

            {/* CTA */}
            <div style={{ marginTop:8, display:'flex', flexDirection:'column', gap:12 }}>
              <button onClick={openModal} className="font-bold cursor-pointer transition-all hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.99]"
                style={{ width:'100%', background:'#CC0000', color:'#fff', padding:'1rem 2rem', borderRadius:50, fontSize:'0.9rem', letterSpacing:'0.08em', textTransform:'uppercase', border:'none', boxShadow:'0 6px 24px rgba(204,0,0,0.35)', display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
                Schedule Free Trial Class
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 10h10M10 5l5 5-5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#CC0000"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z"/></svg>
                <span style={{ fontSize:'0.8rem', color:'#666', fontWeight:500 }}>First class is completely free. No commitment. No pressure.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function KidsTestimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const pausedRef = useRef(false)
  pausedRef.current = hovered
  const CARD_W = 280
  const GAP = 16
  const JUMP = CARD_W + GAP
  const SPEED = 0.5

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const t = el
    let id: number
    function tick() {
      if (!pausedRef.current) {
        t.scrollLeft += SPEED
        if (t.scrollLeft >= t.scrollWidth - t.clientWidth - 2) t.scrollLeft = 0
      }
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])

  function getInitials(name: string) {
    const parts = name.replace(/\./g, '').trim().split(/\s+/)
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  function go(dir: 'prev' | 'next') {
    const el = trackRef.current
    if (!el) return
    pausedRef.current = true
    const start = el.scrollLeft
    const distance = dir === 'next' ? JUMP : -JUMP
    const duration = 700
    const startTime = performance.now()
    const track = el
    function ease(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
    function animate(now: number) {
      const t = Math.min((now - startTime) / duration, 1)
      track.scrollLeft = start + distance * ease(t)
      if (t < 1) requestAnimationFrame(animate)
      else setTimeout(() => { pausedRef.current = hovered }, 300)
    }
    requestAnimationFrame(animate)
  }

  const Stars = () => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L9.796 5.879H15L10.854 8.621L12.472 13.5L8 10.677L3.528 13.5L5.146 8.621L1 5.879H6.204L8 1Z" fill="#FBBC04" />
        </svg>
      ))}
    </div>
  )

  return (
    <section id="reviews" style={{ background: '#FFFFFF', padding: '80px 0', overflow: 'hidden', position: 'relative' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">

          {/* LEFT: title + stats */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <h2 style={{ fontFamily:"'Tagbogy',sans-serif", fontSize: 'clamp(2rem,3.5vw,3rem)', lineHeight: '1.1', margin: 0 }}>
              <span style={{ color:'#0A0A0A' }}>Get to know some of</span>{' '}
              <span style={{ color:'#CC0000' }}>our students</span>
            </h2>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex' }}>
                {[...Array(3)].map((_, i) => (
                  <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: testimonials[i].avatarBg, border: '2px solid #fff', marginLeft: i > 0 ? -10 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>
                    {getInitials(testimonials[i].name)}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0A0A0A' }}>5/5</span>
                  <Stars />
                </div>
                <div style={{ fontSize: '0.72rem', color: '#888', marginTop: 2 }}>Based on Google reviews</div>
              </div>
            </div>

            {/* Arrows */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => go('prev')} style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #0A0A0A', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button onClick={() => go('next')} style={{ width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #0A0A0A', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>

          {/* RIGHT: scrollable cards */}
          <div className="md:col-span-8" style={{ position: 'relative' }}>

            <div
              ref={trackRef}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{ display: 'flex', gap: GAP, overflowX: 'auto', scrollbarWidth: 'none', padding: '12px 8px 16px' }}
              className="[&::-webkit-scrollbar]:hidden"
            >
              {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
                <div key={`${t.id}-${idx}`}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    flexShrink: 0, width: CARD_W, background: '#FFFFFF', borderRadius: 16, padding: 20,
                    border: hoveredCard === idx ? '1.5px solid #CC0000' : '1px solid #E8E8E8',
                    boxShadow: hoveredCard === idx ? '0 8px 32px rgba(204,0,0,0.2)' : '0 2px 12px rgba(0,0,0,0.05)',
                    transform: hoveredCard === null ? 'scale(1)' : hoveredCard === idx ? 'scale(1.03)' : 'scale(0.97)',
                    filter: hoveredCard === null ? 'none' : hoveredCard === idx ? 'none' : 'blur(1.5px) brightness(0.75)',
                    transition: 'all 0.35s ease',
                    zIndex: hoveredCard === idx ? 2 : 1,
                    position: 'relative',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: t.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
                      {getInitials(t.name)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0A0A0A' }}>{t.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#AAA', marginTop: 1 }}>{t.timeAgo}</div>
                    </div>
                  </div>
                  <Stars />
                  <p style={{ fontSize: '0.85rem', lineHeight: '1.65', color: '#444', marginTop: 10 }}>"{t.text}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

const allFacilityPhotos = [
  { src: '/kids/imagem/gallery/1.webp', alt: 'Kids training' },
  { src: '/kids/imagem/gallery/2.webp', alt: 'Kids class' },
  { src: '/kids/imagem/gallery/3.webp', alt: 'Academy' },
  { src: '/kids/imagem/gallery/4.webp', alt: 'Training session' },
  { src: '/kids/imagem/gallery/5.webp', alt: 'Kids program' },
  { src: '/kids/imagem/gallery/6.webp', alt: 'Facility' },
]

function KidsFacility() {
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null)
  const { openModal } = useModal()

  const photos = allFacilityPhotos

  return (
    <section style={{ background: '#FFFFFF', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes kfFloat1 { 0%,100% { transform: translateY(0px) rotate(-2deg); } 50% { transform: translateY(-10px) rotate(-2deg); } }
        @keyframes kfFloat2 { 0%,100% { transform: translateY(0px) rotate(1.5deg); } 50% { transform: translateY(-8px) rotate(1.5deg); } }
        @keyframes kfFloat3 { 0%,100% { transform: translateY(0px) rotate(-1deg); } 50% { transform: translateY(-12px) rotate(-1deg); } }
        @keyframes kfFloat4 { 0%,100% { transform: translateY(0px) rotate(2deg); } 50% { transform: translateY(-6px) rotate(2deg); } }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* LEFT: text */}
          <div className="flex flex-col gap-6">
            <h2 style={{ fontFamily:"'Tagbogy',sans-serif", fontSize: 'clamp(2rem,4vw,3.2rem)', lineHeight: '1.1', margin: 0 }}>
              <span style={{ color:'#CC0000' }}>For kids to learn confidently,</span>{' '}
              <span style={{ color:'#0A0A0A' }}>they need the right environment.</span>
            </h2>
            <p style={{ color: '#555', fontSize: 'clamp(1rem,0.5vw + 0.875rem,1.125rem)', lineHeight: '1.65', margin: 0 }}>
              Fight Factory was designed to help children feel comfortable from day one, with:
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {facilityFeatures.map((f, i) => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: ['#CC0000','#CC0000','#CC0000','#CC0000','#CC0000'][i], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize: '0.9375rem', color: '#333', fontWeight: 500 }}>{f}</span>
                </li>
              ))}
            </ul>
            <button onClick={openModal} className="inline-flex items-center gap-2 font-semibold cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.99] self-start"
              style={{ background: '#CC0000', color: '#fff', padding: '0.875rem 1.75rem', borderRadius: 8, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Click for a free trial class →
            </button>
          </div>

          {/* RIGHT: bento photo cards */}
          <div style={{ position: 'relative', height: 520 }}>
            {/* Card 1 — large top-left */}
            <div
              onMouseEnter={() => setHoveredPhoto(0)}
              onMouseLeave={() => setHoveredPhoto(null)}
              style={{
                position: 'absolute', top: 0, left: 0,
                width: '58%', height: '55%',
                borderRadius: 20, overflow: 'hidden',
                boxShadow: hoveredPhoto === 0 ? '0 20px 50px rgba(0,0,0,0.22)' : '0 8px 24px rgba(0,0,0,0.12)',
                animation: 'kfFloat1 4s ease-in-out infinite',
                transform: hoveredPhoto === 0 ? 'scale(1.04) rotate(-2deg)' : undefined,
                transition: 'box-shadow 0.3s ease',
                zIndex: hoveredPhoto === 0 ? 4 : 1,
                border: '3px solid #fff',
              }}
            >
              <img src={photos[0].src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Card 2 — top-right */}
            <div
              onMouseEnter={() => setHoveredPhoto(1)}
              onMouseLeave={() => setHoveredPhoto(null)}
              style={{
                position: 'absolute', top: '5%', right: 0,
                width: '38%', height: '42%',
                borderRadius: 20, overflow: 'hidden',
                boxShadow: hoveredPhoto === 1 ? '0 20px 50px rgba(0,0,0,0.22)' : '0 8px 24px rgba(0,0,0,0.12)',
                animation: 'kfFloat2 5s ease-in-out infinite',
                transition: 'box-shadow 0.3s ease',
                zIndex: hoveredPhoto === 1 ? 4 : 2,
                border: '3px solid #fff',
              }}
            >
              <img src={photos[1].src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Card 3 — bottom-left */}
            <div
              onMouseEnter={() => setHoveredPhoto(2)}
              onMouseLeave={() => setHoveredPhoto(null)}
              style={{
                position: 'absolute', bottom: 0, left: '5%',
                width: '40%', height: '42%',
                borderRadius: 20, overflow: 'hidden',
                boxShadow: hoveredPhoto === 2 ? '0 20px 50px rgba(0,0,0,0.22)' : '0 8px 24px rgba(0,0,0,0.12)',
                animation: 'kfFloat3 4.5s ease-in-out infinite',
                transition: 'box-shadow 0.3s ease',
                zIndex: hoveredPhoto === 2 ? 4 : 1,
                border: '3px solid #fff',
              }}
            >
              <img src={photos[2].src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Card 4 — bottom-right */}
            <div
              onMouseEnter={() => setHoveredPhoto(3)}
              onMouseLeave={() => setHoveredPhoto(null)}
              style={{
                position: 'absolute', bottom: '3%', right: '2%',
                width: '53%', height: '50%',
                borderRadius: 20, overflow: 'hidden',
                boxShadow: hoveredPhoto === 3 ? '0 20px 50px rgba(0,0,0,0.22)' : '0 8px 24px rgba(0,0,0,0.12)',
                animation: 'kfFloat4 3.8s ease-in-out infinite',
                transition: 'box-shadow 0.3s ease',
                zIndex: hoveredPhoto === 3 ? 4 : 2,
                border: '3px solid #fff',
              }}
            >
              <img src={photos[3].src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Decorative dot */}
            <div style={{ position: 'absolute', top: '46%', left: '45%', width: 16, height: 16, borderRadius: '50%', background: '#CC0000', zIndex: 5, boxShadow: '0 0 0 4px rgba(204,0,0,0.2)' }} />
          </div>

        </div>
      </div>
    </section>
  )
}

function Coach() {
  const { openModal } = useModal()

  return (
    <section id="coach" style={{ background: '#0A0A0A', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes coachFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes coachBadge { 0%,100%{transform:rotate(-3deg) scale(1)} 50%{transform:rotate(-3deg) scale(1.04)} }
      `}</style>

      {/* Decorative blobs */}
      <div style={{ position:'absolute', top:'-80px', right:'-80px', width:320, height:320, borderRadius:'50%', background:'rgba(204,0,0,0.15)', zIndex:0 }} />
      <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:240, height:240, borderRadius:'50%', background:'rgba(204,0,0,0.12)', zIndex:0 }} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex:1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* LEFT: photo with decorative elements */}
          <div style={{ position:'relative', display:'flex', justifyContent:'center' }}>
            {/* Background shape */}
            <div style={{ position:'absolute', top:'8%', left:'5%', width:'80%', height:'84%', borderRadius:32, background:'linear-gradient(135deg, #1a1a1a 0%, #333 100%)', zIndex:0 }} />

            {/* Photo — floating */}
            <div style={{ position:'relative', zIndex:2, animation:'coachFloat 4s ease-in-out infinite', width:'78%' }}>
              <img src="/kids/imagem/10.webp" alt="Coach Rodrigo Cabral"
                style={{ width:'100%', aspectRatio:'3/4', objectFit:'cover', objectPosition:'top', borderRadius:24, boxShadow:'0 24px 60px rgba(0,0,0,0.18)', display:'block', border:'4px solid #fff' }} />
            </div>

            {/* Badge — 5th Degree */}
            <div style={{ position:'absolute', bottom:'14%', right:'6%', zIndex:3, background:'#CC0000', color:'#fff', borderRadius:14, padding:'12px 16px', boxShadow:'0 8px 24px rgba(204,0,0,0.4)', animation:'coachBadge 3.5s ease-in-out infinite', border:'3px solid #fff' }}>
              <div style={{ fontSize:'0.6rem', letterSpacing:'0.15em', textTransform:'uppercase', opacity:0.75, marginBottom:3 }}>Black Belt</div>
              <div style={{ fontSize:'1.1rem', fontWeight:700 }}>5th Degree</div>
            </div>

            {/* Years badge */}
            <div style={{ position:'absolute', top:'12%', right:'4%', zIndex:3, background:'#fff', borderRadius:14, padding:'10px 14px', boxShadow:'0 8px 24px rgba(0,0,0,0.1)', border:'2px solid #E8ECF8' }}>
              <div style={{ fontSize:'1.5rem', color:'#CC0000', lineHeight:1, fontWeight:700 }}>30+</div>
              <div style={{ fontSize:'0.65rem', color:'#888', marginTop:3 }}>Years on the Mats</div>
            </div>
          </div>

          {/* RIGHT: content */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:24, height:3, background:'rgba(255,255,255,0.6)', borderRadius:999 }} />
              <span style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', fontWeight:700 }}>Meet Rodrigo, Head Coach</span>
            </div>

            <h2 style={{ fontFamily:"'Tagbogy',sans-serif", fontSize:'clamp(2.5rem,5vw,4rem)', lineHeight:1.05, margin:0 }}>
              <span style={{ color:'#CC0000' }}>Rodrigo</span>{' '}
              <span style={{ color:'#FFFFFF' }}>Cabral</span>
            </h2>

            {/* Stats cards */}
            <div style={{ display:'flex', gap:12 }}>
              {coachStats.map((s, i) => (
                <div key={s.label} style={{ flex:1, background: i===0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)', borderRadius:14, padding:'14px 16px', border:'1.5px solid rgba(255,255,255,0.25)' }}>
                  <div style={{ fontSize:'clamp(1.5rem,2.5vw,2rem)', color:'#FFFFFF', lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.65)', marginTop:5, letterSpacing:'0.04em' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.9375rem', lineHeight:'1.75', margin:0 }}>
              Rodrigo Cabral has over 30 years on the mats and developed the same method that helped shape current champion Andrew Tackett. Today, he helps children grow with confidence through Jiu-Jitsu.
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {coachBullets.map((b, i) => (
                <div key={b.label} style={{ display:'flex', alignItems:'center', gap:12, background:'#FFFFFF', borderRadius:10, padding:'10px 14px', border:`1px solid ${['rgba(204,0,0,0.2)','rgba(204,0,0,0.2)','rgba(204,0,0,0.2)'][i]}` }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:['#CC0000','#CC0000','#CC0000'][i], flexShrink:0 }} />
                  <span style={{ color:['rgba(204,0,0,0.6)','rgba(204,0,0,0.7)','rgba(204,0,0,0.6)'][i], fontSize:'0.625rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', minWidth:110 }}>{b.label}</span>
                  <span style={{ color:['#CC0000','#CC0000','#CC0000'][i], fontSize:'0.875rem', fontWeight:600 }}>{b.text}</span>
                </div>
              ))}
            </div>

            <button onClick={openModal} className="self-start inline-flex items-center gap-2 font-bold cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.99] min-h-[52px]"
              style={{ background:'#fff', color:'#CC0000', padding:'1rem 2.5rem', borderRadius:10, fontSize:'0.9rem', letterSpacing:'0.04em', fontWeight:700 }}>
              Book your free trial class →
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}

function KidsFAQ() {
  const [open, setOpen] = useState<string | null>(null)
  const { openModal } = useModal()

  return (
    <section id="faq" style={{ background: '#FFFFFF', padding: '80px 0', position: 'relative' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CC0000', display: 'block', marginBottom: 12 }}>COMMON QUESTIONS</span>
            <h2 className="mb-5" style={{ fontFamily:"'Tagbogy',sans-serif", fontSize: 'clamp(2rem,4vw + 0.75rem,3.5rem)', letterSpacing: '0.01em', lineHeight: '1.1', textTransform: 'uppercase' }}>
              <span style={{ color:'#0A0A0A' }}>Common</span>{' '}
              <span style={{ color:'#CC0000' }}>Questions</span>
            </h2>
            <button onClick={openModal} className="inline-flex items-center font-semibold cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] mt-4 whitespace-nowrap" style={{ background: '#CC0000', color: '#FFFFFF', padding: '0.75rem 1.5rem', borderRadius: 6, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Click to book your free trial class →
            </button>
          </div>
          <div className="md:col-span-8" style={{ borderTop: '1px solid #D8D8D8' }}>
            {faqItems.map(item => (
              <div key={item.id} className="border-b transition-colors" style={{ borderColor: '#D8D8D8' }}>
                <button onClick={() => setOpen(open === item.id ? null : item.id)} className="w-full flex items-center justify-between py-5 text-left cursor-pointer group min-h-[44px]" aria-expanded={open === item.id}>
                  <span className="text-[#0A0A0A] font-semibold pr-4 group-hover:text-[#555555] transition-colors" style={{ fontSize: 'clamp(0.9375rem,0.3vw + 0.875rem,1rem)' }}>{item.question}</span>
                  <span className="shrink-0 transition-transform duration-200" style={{ transform: open === item.id ? 'rotate(45deg)' : 'rotate(0deg)', color: open === item.id ? '#CC0000' : '#0A0A0A' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </span>
                </button>
                <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open === item.id ? '200px' : '0px' }}>
                  <p className="text-[#555555] pb-5" style={{ lineHeight: '1.75', fontSize: '0.9375rem' }}>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────────────────

export function KidsPage() {

  return (
    <BookingProvider>
      <KidsNavbar />
      <main>
        <Hero />
        <KidsMarquee />
        <WhyParents />
        <Programs />
        <Process />
        <KidsTestimonials />
        <KidsFacility />
        <Coach />
        <KidsFAQ />
      </main>
      <KidsFooter />
    </BookingProvider>
  )
}
















