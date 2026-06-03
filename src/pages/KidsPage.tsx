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

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const CELLS = [null,null,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,null,null,null]
const HIGHLIGHT_CYCLE = [8, 14, 21, 9, 15, 22, 16, 28]

function CalendarWidget() {
  const [idx, setIdx] = useState(0)
  const highlight = HIGHLIGHT_CYCLE[idx]
  useEffect(() => {
    const id = window.setInterval(() => setIdx(i => (i + 1) % HIGHLIGHT_CYCLE.length), 1600)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="rounded-3xl p-5" style={{ background: '#FFFFFF', border: '2px solid rgba(255,255,255,0.12)', boxShadow: '0 8px 0 0 rgba(0,0,0,0.55)' }}>
      <div className="flex items-center justify-between rounded-2xl px-4 py-3 mb-4" style={{ background: '#CC0000', boxShadow: '0 4px 0 0 rgba(0,0,0,0.25)' }}>
        <span style={{ fontFamily: "'SuperbusyActivity','Anton',sans-serif", fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FFFFFF' }}>June</span>
        <div className="flex gap-1.5">{[0,1,2].map(i => <span key={i} className="rounded-full" style={{ width: 10, height: 10, background: 'rgba(255,255,255,0.8)', display: 'inline-block' }} />)}</div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((d, i) => <div key={i} className="text-center" style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.4)' }}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {CELLS.map((n, i) => {
          if (n === null) return <div key={i} aria-hidden style={{ aspectRatio: '1' }} />
          const isHL = n === highlight
          return (
            <div key={i} className="relative flex items-center justify-center rounded-lg" style={{ aspectRatio: '1', background: isHL ? '#CC0000' : 'rgba(10,10,10,0.05)', boxShadow: isHL ? '0 3px 0 0 rgba(0,0,0,0.4)' : 'none', transition: 'background 0.3s ease, box-shadow 0.3s ease' }}>
              {isHL && <span className="absolute rounded-full" style={{ width: 8, height: 8, background: '#F9B80E', top: -3, right: -3, zIndex: 2 }} />}
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isHL ? '#FFFFFF' : '#0A0A0A', position: 'relative', zIndex: 1 }}>{n}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── SECTIONS ──────────────────────────────────────────────────────────────


function Hero() {
  const { openModal } = useModal()

  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#FFFFFF', minHeight: '100vh', paddingTop: 80 }}>

      <div className="relative max-w-[1440px] mx-auto w-full px-4 md:px-10" style={{ zIndex:1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center py-10 md:py-16">

          {/* LEFT: text */}
          <div className="flex flex-col gap-6">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 self-start" style={{ background:'#FFF0F0', border:'1.5px solid rgba(204,0,0,0.2)', borderRadius: 8, padding:'6px 16px' }}>
              <span style={{ fontSize:'1rem' }}></span>
              <span style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#CC0000' }}>Kids Jiu-Jitsu · Austin, TX</span>
            </div>

            {/* Headline */}
            <div>
              <h1 style={{ fontFamily:"'Tagbogy','HipsterHatch','Anton',sans-serif", fontSize:'clamp(2.5rem, 5vw, 5rem)', letterSpacing:'0.01em', lineHeight:'0.92', textTransform:'uppercase', color:'#0A0A0A', margin:0 }}>
                <span style={{ color:'#CC0000' }}>Help your child<br />build confidence</span><br />
                <span style={{ color:'#0A0A0A' }}>from their very<br />first Jiu-Jitsu class.</span>
              </h1>
            </div>

            {/* Body */}
            <p style={{ color:'#666', fontSize:'clamp(0.9rem, 0.5vw + 0.8rem, 1.05rem)', lineHeight:'1.7', maxWidth:'44ch', margin:0 }}>
              Fight Factory helps kids in Austin develop confidence through a beginner-friendly Jiu-Jitsu program designed to make their first steps feel safe, fun, and motivating from day&nbsp;one.
            </p>


            {/* CTA */}
            <div className="flex flex-wrap gap-3 items-center">
              <button onClick={openModal} className="inline-flex items-center gap-2 font-bold cursor-pointer transition-all hover:scale-[1.03] active:scale-[0.98]"
                style={{ background:'#CC0000', color:'#fff', padding:'1rem 2rem', fontSize:'0.875rem', letterSpacing:'0.08em', textTransform:'uppercase', borderRadius: 8, boxShadow:'0 6px 24px rgba(204,0,0,0.35)', minHeight:52 }}>
                Book a Free Trial Class →
              </button>
            </div>


          </div>

          {/* RIGHT: video */}
          <div style={{ position:'relative' }}>

            {/* Decorative star */}
            
            

            {/* Video container with fun border */}
            <div style={{ borderRadius:28, overflow:'hidden', boxShadow:'0 24px 64px rgba(0,0,0,0.14)', border:'4px solid #0A0A0A', position:'relative', background:'#000' }}>
              <video autoPlay muted loop playsInline style={{ width:'100%', display:'block', maxHeight:'70vh', objectFit:'cover' }}>
                <source src="/kids/video/hero.webm" type="video/webm" />
              </video>

            </div>


          </div>

        </div>
      </div>
    </section>
  )
}

function WhyParents() {
  const { openModal } = useModal()

  return (
    <section style={{ background: '#FFFFFF', padding: '96px 0', overflow: 'hidden' }}>
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
              <div style={{ fontFamily: "'Tagbogy','Anton',sans-serif", fontSize: '1.4rem', lineHeight: 1, fontWeight: 700 }}>5</div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.85, marginTop: 2 }}>Intro<br />Classes</div>
            </div>
          </div>

          {/* RIGHT: content */}
          <div className="flex flex-col gap-7">
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CC0000' }}>Why parents choose us</span>
              <h2 style={{ fontFamily: "'Tagbogy','HipsterHatch','Anton',sans-serif", fontSize: 'clamp(2rem,3.5vw,3.2rem)', lineHeight: '1.05', color: '#0A0A0A', margin: '10px 0 0' }}>
                Why do parents choose <span style={{ color: '#CC0000' }}>Fight Factory?</span>
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
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#CC0000', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
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
      accent: '#0A0A0A',
    },
  ]

  return (
    <section id="classes" style={{ background: '#FFFFFF', padding: '96px 0', overflow: 'hidden' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CC0000', display: 'block', marginBottom: 8 }}>Programs</span>
            <h2 style={{ fontFamily: "'Tagbogy','HipsterHatch','Anton',sans-serif", fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: '1.0', color: '#0A0A0A', margin: 0 }}>
              Our <span style={{ color: '#CC0000' }}>classes</span>
            </h2>
          </div>
          <button onClick={openModal} className="self-start md:self-auto inline-flex items-center gap-2 font-semibold cursor-pointer transition-all hover:scale-[1.02]"
            style={{ background: '#0A0A0A', color: '#fff', padding: '0.875rem 1.75rem', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: 8 }}>
            Book a Free Trial Class →
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div key={card.id}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ borderRadius: 24, overflow: 'hidden', background: '#fff', boxShadow: hoveredCard === card.id ? '0 24px 64px rgba(0,0,0,0.14)' : '0 4px 20px rgba(0,0,0,0.06)', transform: hoveredCard === card.id ? 'translateY(-4px)' : 'translateY(0)', transition: 'all 0.35s ease', border: '1.5px solid #EBEBEB' }}
            >
              {/* Photo placeholder */}
              <div style={{ position: 'relative', aspectRatio: '16/9', background: '#E8E8E8', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {card.img ? (
                  <img src={card.img} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hoveredCard === card.id ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#BBBBBB" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    <span style={{ color: '#BBBBBB', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em' }}>1280 × 720 px</span>
                  </div>
                )}

                {/* Tag */}
                <div style={{ position: 'absolute', top: 14, left: 14, background: card.accent, color: '#fff', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 8 }}>
                  {card.tag}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <h3 style={{ fontFamily: "'Tagbogy','HipsterHatch','Anton',sans-serif", fontSize: 'clamp(1.3rem,2vw,1.7rem)', color: '#0A0A0A', lineHeight: '1.05', margin: 0, textTransform: 'uppercase' }}>
                  {card.title}
                </h3>
                <p style={{ color: '#666', fontSize: '0.9375rem', lineHeight: '1.65', margin: 0 }}>
                  {card.desc}
                </p>
                <button onClick={openModal}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: hoveredCard === card.id ? card.accent : '#F5F5F5', color: hoveredCard === card.id ? '#fff' : '#0A0A0A', border: 'none', borderRadius: 12, padding: '0.875rem 1.25rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s ease', marginTop: 4 }}
                >
                  Book a free trial class
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
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

  return (
    <section style={{ background: '#CC0000', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 32px),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 32px)
        `,
        zIndex: 0,
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.08) 0%, transparent 70%)',
        zIndex: 0,
      }} />
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">

          {/* LEFT */}
          <div className="md:col-span-5 flex flex-col gap-8">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 2, background: 'rgba(255,255,255,0.4)', borderRadius: 9999 }} />
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>3 Simple Steps</span>
            </div>
            <h2 style={{ fontFamily: "'HipsterHatch','Tagbogy','HipsterHatch','Anton',sans-serif", fontSize: 'clamp(2.4rem,5vw,3.6rem)', lineHeight: '1.05', color: '#FFFFFF', margin: 0 }}>
              How to get started?
            </h2>
            <CalendarWidget />
          </div>

          {/* RIGHT */}
          <div className="md:col-span-7 flex flex-col gap-5" style={{ paddingTop: '6rem' }}>
            <ol className="flex flex-col gap-4">
              {steps.map((s, idx) => (
                <li key={s.num}>
                  <div className="grid items-center gap-5 p-5 md:p-6" style={{ gridTemplateColumns: 'auto 1fr', background: '#FFFFFF', border: '1.5px solid #E8ECF8', borderRadius: 16, boxShadow: '0 4px 16px rgba(204,0,0,0.07)', transition: 'box-shadow 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(204,0,0,0.14)'; e.currentTarget.style.borderColor = '#CC0000' }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(204,0,0,0.07)'; e.currentTarget.style.borderColor = '#E8ECF8' }}
                  >
                    <span style={{ fontFamily: "'Tagbogy','HipsterHatch','Anton',sans-serif", fontSize: 'clamp(2.5rem,6vw,4.5rem)', lineHeight: 1, color: idx === 0 ? '#CC0000' : idx === 1 ? '#F9B80E' : '#0A0A0A', userSelect: 'none', minWidth: 72 }}>{s.num}</span>
                    <div className="min-w-0">
                      <p style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CC0000', marginBottom: 6 }}>{s.label}</p>
                      <p style={{ fontSize: 'clamp(0.9375rem,1.5vw,1.125rem)', lineHeight: '1.5', color: '#333', margin: 0 }}>{s.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 pt-6 mt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9375rem', lineHeight: '1.6', maxWidth: '36ch', margin: 0 }}>The first class is completely free. No commitment. No pressure.</p>
              <button onClick={openModal} className="shrink-0 font-bold cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] min-h-[52px] whitespace-nowrap" style={{ background: '#FFFFFF', color: '#CC0000', padding: '0.875rem 2rem', borderRadius: 6, fontSize: '0.8125rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Schedule Free Trial Class →
              </button>
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
    <section id="reviews" style={{ background: '#FFFFFF', padding: '96px 0', overflow: 'hidden', position: 'relative' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">

          {/* LEFT: title + stats */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <h2 style={{ fontFamily: "'HipsterHatch','Tagbogy','HipsterHatch','Anton',sans-serif", fontSize: 'clamp(2rem,3.5vw,3rem)', lineHeight: '1.1', color: '#0A0A0A', margin: 0 }}>
              Get to know some of{' '}
              <span style={{ color: '#CC0000' }}>our students</span>
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
                    boxShadow: hoveredCard === idx ? '0 8px 32px rgba(204,0,0,0.15)' : '0 2px 12px rgba(0,0,0,0.05)',
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
    <section style={{ background: '#FFFFFF', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
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
            <h2 style={{ fontFamily: "'HipsterHatch','Tagbogy','HipsterHatch','Anton',sans-serif", fontSize: 'clamp(2rem,4vw,3.2rem)', lineHeight: '1.1', color: '#0A0A0A', margin: 0 }}>
              <span style={{ color: '#CC0000' }}>For kids to learn confidently,</span>{' '}they need the right environment.
            </h2>
            <p style={{ color: '#555', fontSize: 'clamp(1rem,0.5vw + 0.875rem,1.125rem)', lineHeight: '1.65', margin: 0 }}>
              Fight Factory was designed to help children feel comfortable from day one, with:
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {facilityFeatures.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#CC0000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
    <section id="coach" style={{ background: '#CC0000', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes coachFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes coachBadge { 0%,100%{transform:rotate(-3deg) scale(1)} 50%{transform:rotate(-3deg) scale(1.04)} }
      `}</style>

      {/* Decorative blobs */}
      <div style={{ position:'absolute', top:'-80px', right:'-80px', width:320, height:320, borderRadius:'50%', background:'rgba(204,0,0,0.06)', zIndex:0 }} />
      <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:240, height:240, borderRadius:'50%', background:'rgba(204,0,0,0.05)', zIndex:0 }} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex:1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* LEFT: photo with decorative elements */}
          <div style={{ position:'relative', display:'flex', justifyContent:'center' }}>
            {/* Background shape */}
            <div style={{ position:'absolute', top:'8%', left:'5%', width:'80%', height:'84%', borderRadius:32, background:'linear-gradient(135deg, #CC0000 0%, #8B0000 100%)', zIndex:0 }} />

            {/* Photo — floating */}
            <div style={{ position:'relative', zIndex:2, animation:'coachFloat 4s ease-in-out infinite', width:'78%' }}>
              <img src="/kids/imagem/10.webp" alt="Coach Rodrigo Cabral"
                style={{ width:'100%', aspectRatio:'3/4', objectFit:'cover', objectPosition:'top', borderRadius:24, boxShadow:'0 24px 60px rgba(0,0,0,0.18)', display:'block', border:'4px solid #fff' }} />
            </div>

            {/* Badge — 5th Degree */}
            <div style={{ position:'absolute', bottom:'14%', right:'6%', zIndex:3, background:'#CC0000', color:'#fff', borderRadius:14, padding:'12px 16px', boxShadow:'0 8px 24px rgba(204,0,0,0.35)', animation:'coachBadge 3.5s ease-in-out infinite', border:'3px solid #fff' }}>
              <div style={{ fontSize:'0.6rem', letterSpacing:'0.15em', textTransform:'uppercase', opacity:0.75, marginBottom:3 }}>Black Belt</div>
              <div style={{ fontFamily:"'Tagbogy','HipsterHatch','Anton',sans-serif", fontSize:'1.1rem', fontWeight:700 }}>5th Degree</div>
            </div>

            {/* Years badge */}
            <div style={{ position:'absolute', top:'12%', right:'4%', zIndex:3, background:'#fff', borderRadius:14, padding:'10px 14px', boxShadow:'0 8px 24px rgba(0,0,0,0.1)', border:'2px solid #E8ECF8' }}>
              <div style={{ fontFamily:"'Tagbogy','HipsterHatch','Anton',sans-serif", fontSize:'1.5rem', color:'#CC0000', lineHeight:1, fontWeight:700 }}>30+</div>
              <div style={{ fontSize:'0.65rem', color:'#888', marginTop:3 }}>Years on the Mats</div>
            </div>
          </div>

          {/* RIGHT: content */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:24, height:3, background:'rgba(255,255,255,0.6)', borderRadius:999 }} />
              <span style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', fontWeight:700 }}>Meet Rodrigo, Head Coach</span>
            </div>

            <h2 style={{ fontFamily:"'HipsterHatch','Tagbogy','HipsterHatch','Anton',sans-serif", fontSize:'clamp(2.5rem,5vw,4rem)', lineHeight:1.05, color:'#FFFFFF', margin:0 }}>
              Rodrigo Cabral
            </h2>

            {/* Stats cards */}
            <div style={{ display:'flex', gap:12 }}>
              {coachStats.map((s, i) => (
                <div key={s.label} style={{ flex:1, background: i===0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)', borderRadius:14, padding:'14px 16px', border:'1.5px solid rgba(255,255,255,0.25)' }}>
                  <div style={{ fontFamily:"'Tagbogy','HipsterHatch','Anton',sans-serif", fontSize:'clamp(1.5rem,2.5vw,2rem)', color:'#FFFFFF', lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.65)', marginTop:5, letterSpacing:'0.04em' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.9375rem', lineHeight:'1.75', margin:0 }}>
              Rodrigo Cabral has over 30 years on the mats and developed the same method that helped shape current champion Andrew Tackett. Today, he helps children grow with confidence through Jiu-Jitsu.
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {coachBullets.map(b => (
                <div key={b.label} style={{ display:'flex', alignItems:'center', gap:12, background:'#FFFFFF', borderRadius:10, padding:'10px 14px', border:'1px solid rgba(204,0,0,0.15)' }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:'#CC0000', flexShrink:0 }} />
                  <span style={{ color:'rgba(204,0,0,0.55)', fontSize:'0.625rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', minWidth:110 }}>{b.label}</span>
                  <span style={{ color:'#CC0000', fontSize:'0.875rem', fontWeight:600 }}>{b.text}</span>
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
    <section id="faq" style={{ background: '#FFFFFF', padding: '96px 0', position: 'relative' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CC0000', display: 'block', marginBottom: 12 }}>COMMON QUESTIONS</span>
            <h2 className="text-[#0A0A0A] mb-5" style={{ fontFamily: "'HipsterHatch','Tagbogy','HipsterHatch','Anton',sans-serif", fontSize: 'clamp(2rem,4vw + 0.75rem,3.5rem)', letterSpacing: '0.01em', lineHeight: '1.1', textTransform: 'uppercase' }}>
              Common <span style={{ color: '#CC0000' }}>Questions</span>
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
  useEffect(() => {
    document.body.style.fontFamily = "'Montserrat', sans-serif"
    // Inject global style for kids page
    const style = document.createElement('style')
    style.id = 'kids-font-override'
    style.textContent = `
      p, span, a, li, button, input, label, div:not([style*="Tagbogy"]):not([style*="HipsterHatch"]) {
        font-family: 'Montserrat', sans-serif !important;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.body.style.fontFamily = ''
      document.getElementById('kids-font-override')?.remove()
    }
  }, [])

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
















