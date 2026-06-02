import { useEffect, useRef, useState } from 'react'
import { BookingProvider } from '../booking/BookingProvider'
import { KidsNavbar } from '../components/layout/KidsNavbar'
import { KidsFooter } from '../components/sections/KidsFooter'
import { TrianglePattern } from '../components/ui/TrianglePattern'
import { PatternBg } from '../components/ui/PatternBg'
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
      <div className="flex items-center justify-between rounded-2xl px-4 py-3 mb-4" style={{ background: '#1E5EBF', boxShadow: '0 4px 0 0 rgba(0,0,0,0.25)' }}>
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
            <div key={i} className="relative flex items-center justify-center rounded-lg" style={{ aspectRatio: '1', background: isHL ? '#1E5EBF' : 'rgba(10,10,10,0.05)', boxShadow: isHL ? '0 3px 0 0 rgba(0,0,0,0.4)' : 'none', transition: 'background 0.3s ease, box-shadow 0.3s ease' }}>
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
    <section className="relative w-full flex items-center overflow-hidden" style={{ background: '#FFFFFF', minHeight: '100vh', paddingTop: 72 }}>
      <div className="relative max-w-[1440px] mx-auto w-full px-4 md:px-8" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-12">

          {/* LEFT: text */}
          <div className="flex flex-col gap-6">
            <p className="inline-flex items-center gap-2" style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.5)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1E5EBF', display: 'inline-block', animation: 'hero-pulse 2s ease-in-out infinite' }} />
              Austin, TX · Kids Jiu-Jitsu
            </p>

            <h1 style={{ fontFamily: "'ChildGorlex','SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(1.6rem, 5vw, 4rem)', letterSpacing: '0.01em', lineHeight: '1.1', textTransform: 'uppercase', color: '#0A0A0A', margin: 0 }}>
              <span style={{ color: '#1E5EBF' }}>Help your child<br />build confidence</span><br />
              from their very<br />first Jiu-Jitsu class.
            </h1>

            <p style={{ color: '#555555', fontSize: 'clamp(0.875rem, 0.5vw + 0.8rem, 1rem)', lineHeight: '1.65', maxWidth: '48ch', margin: 0 }}>
              Fight Factory helps kids in Austin develop confidence through a beginner-friendly Jiu-Jitsu program designed to make their first steps feel safe, fun, and motivating from day&nbsp;one.
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={openModal} className="inline-flex items-center gap-2 font-semibold cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.99] min-h-[52px]" style={{ background: '#1E5EBF', color: '#fff', padding: '1rem 2rem', fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: 6 }}>
                Book a Free Trial Class →
              </button>
              <a href="#classes" className="inline-flex items-center gap-2 font-semibold transition-all min-h-[52px]" style={{ border: '2px solid #0A0A0A', color: '#0A0A0A', padding: '1rem 2rem', fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 6 }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0A0A0A'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0A0A0A' }}
              >
                See Programs
              </a>
            </div>

          </div>

          {/* RIGHT: hero image */}
          <div className="md:absolute md:top-1/2 md:-translate-y-1/2 md:right-[3%] md:w-[46%] md:h-[85%] w-full mt-6 md:mt-0" style={{ borderRadius: 12, overflow: 'hidden', border: '2.5px solid #0A0A0A', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', aspectRatio: '4/3' }}>
            <img
              src="/kids/imagem/hero/hero-new.webp"
              alt="Kids Jiu-Jitsu"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}

function WhyParents() {
  const { openModal } = useModal()

  return (
    <section style={{ background: '#F5F7FF', padding: '96px 0', overflow: 'hidden' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-10">
          <h2 style={{ fontFamily: "'ChildGorlex','SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(2rem,3.5vw + 0.5rem,3.5rem)', lineHeight: '1.1', color: '#0A0A0A', margin: 0 }}>
            Why do parents choose <span style={{ color: '#1E5EBF', whiteSpace: 'nowrap' }}>Fight Factory?</span>
          </h2>
        </div>

        {/* Mobile: stack | Desktop: bento */}
        <div className="flex flex-col gap-4 md:hidden">
          {/* Title card */}
          <div style={{ borderRadius: 20, background: '#1E5EBF', padding: '24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', lineHeight: '1.7', margin: 0 }}>
              Fight Factory offers a kids onboarding system unique in Austin: children begin with 5 introductory classes in a separate group, designed to build confidence in their first steps.
            </p>
            <button onClick={openModal} style={{ alignSelf: 'flex-start', background: '#fff', color: '#1E5EBF', border: 'none', borderRadius: 6, padding: '0.75rem 1.5rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Book Free Trial →
            </button>
          </div>
          {/* Photos row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4/5' }}>
              <img src="/kids/imagem/2.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4/5' }}>
              <img src="/kids/imagem/gallery/2.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>

          {/* Benefits */}
          <div style={{ borderRadius: 20, background: '#fff', padding: '16px', border: '1.5px solid #E8ECF8', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {whyBenefits.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, background: '#F8F9FF', border: '1px solid #E8ECF8' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#1E5EBF', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{ fontSize: '0.85rem', color: '#333', fontWeight: 500 }}>{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop bento grid */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: 16 }}>
          <div style={{ gridColumn: '1', gridRow: '1 / 3', borderRadius: 20, overflow: 'hidden', minHeight: 480 }}
            onMouseEnter={e => { (e.currentTarget.querySelector('img') as HTMLElement).style.transform = 'scale(1.06)' }}
            onMouseLeave={e => { (e.currentTarget.querySelector('img') as HTMLElement).style.transform = 'scale(1)' }}>
            <img src="/kids/imagem/2.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} />
          </div>
          <div style={{ gridColumn: '2 / 4', gridRow: '1', borderRadius: 20, background: '#1E5EBF', padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 16, minHeight: 200 }}>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: '1.7', margin: 0 }}>
              Fight Factory offers a kids onboarding system unique in Austin: children begin with 5 introductory classes in a separate group from the regular classes, designed to build confidence in their first steps.
            </p>
            <button onClick={openModal} style={{ alignSelf: 'flex-start', background: '#fff', color: '#1E5EBF', border: 'none', borderRadius: 6, padding: '0.75rem 1.5rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Book Free Trial →
            </button>
          </div>
          <div style={{ gridColumn: '2', gridRow: '2', borderRadius: 20, background: '#fff', padding: '24px', border: '1.5px solid #E8ECF8', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {whyBenefits.map((b, i) => (
              <div key={i} className="benefit-hover-card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, border: '1.5px solid #E8ECF8', background: '#F8F9FF', cursor: 'default', transition: 'all 0.2s ease' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = '#1E5EBF'; el.style.borderColor = '#1E5EBF'; (el.querySelector('.b-icon') as HTMLElement).style.background = 'rgba(255,255,255,0.2)'; (el.querySelector('.b-text') as HTMLElement).style.color = '#fff' }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = '#F8F9FF'; el.style.borderColor = '#E8ECF8'; (el.querySelector('.b-icon') as HTMLElement).style.background = '#1E5EBF'; (el.querySelector('.b-text') as HTMLElement).style.color = '#333' }}>
                <div className="b-icon" style={{ width: 28, height: 28, borderRadius: '50%', background: '#1E5EBF', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="b-text" style={{ fontSize: '0.85rem', color: '#333', lineHeight: '1.4', fontWeight: 500, transition: 'color 0.2s' }}>{b.text}</span>
              </div>
            ))}
          </div>
          <div style={{ gridColumn: '3', gridRow: '2', borderRadius: 20, overflow: 'hidden', minHeight: 280 }}
            onMouseEnter={e => { (e.currentTarget.querySelector('img') as HTMLElement).style.transform = 'scale(1.06)' }}
            onMouseLeave={e => { (e.currentTarget.querySelector('img') as HTMLElement).style.transform = 'scale(1)' }}>
            <img src="/kids/imagem/gallery/2.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

const kidsPrograms = [
  {
    id: 'beginner',
    title: 'Beginner Kids Program',
    desc: 'Built for children with no experience, using a 5-class onboarding system designed to help kids start confidently.',
    img: '/kids/imagem/4.webp',
  },
  {
    id: 'kids',
    title: 'Kids Program',
    desc: 'Children develop discipline, confidence, focus, and resilience in a safe, structured, family-friendly environment.',
    img: '/kids/imagem/5.webp',
  },
]

function Programs() {
  const { openModal } = useModal()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="classes" style={{ background: '#F5F7FF', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 style={{ fontFamily: "'ChildGorlex','SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: '1.05', color: '#0A0A0A', margin: 0 }}>
            Our <span style={{ color: '#1E5EBF' }}>classes</span>
          </h2>
        </div>

        {/* Two cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {kidsPrograms.map((p) => (
            <div key={p.id}
              onMouseEnter={() => setHoveredCard(p.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                borderRadius: 20, overflow: 'hidden', background: '#0A0A0A', display: 'flex', flexDirection: 'column',
                border: hoveredCard === p.id ? '2px solid #1E5EBF' : '2px solid #0A0A0A',
                boxShadow: hoveredCard === p.id ? '0 20px 60px rgba(0,0,0,0.35)' : '0 8px 32px rgba(0,0,0,0.18)',
                transform: hoveredCard === null ? 'scale(1)' : hoveredCard === p.id ? 'scale(1.02)' : 'scale(0.97)',
                filter: hoveredCard === null ? 'none' : hoveredCard === p.id ? 'none' : 'blur(2px) brightness(0.6)',
                transition: 'transform 0.4s ease, filter 0.4s ease, box-shadow 0.4s ease',
                zIndex: hoveredCard === p.id ? 2 : 1,
                position: 'relative',
              }}>
              {/* Photo — top 60% */}
              <div style={{ height: 360, overflow: 'hidden', flexShrink: 0 }}>
                <img
                  src={p.img}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
              </div>

              {/* Text section — below photo */}
              <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 14, flexGrow: 1, background: hoveredCard === p.id ? '#1E5EBF' : '#0A0A0A', transition: 'background 0.4s ease' }}>
                <h3 style={{ fontFamily: "'ChildGorlex','SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(1.4rem,2vw,1.85rem)', color: '#FFFFFF', lineHeight: '1.05', margin: 0, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                  {p.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: '1.65', margin: 0 }}>
                  {p.desc}
                </p>
                <button onClick={openModal}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: hoveredCard === p.id ? '#FFFFFF' : 'rgba(255,255,255,0.08)', color: hoveredCard === p.id ? '#1E5EBF' : '#fff', border: hoveredCard === p.id ? '1.5px solid #fff' : '1.5px solid rgba(255,255,255,0.18)', borderRadius: 8, padding: '0.875rem 1.5rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.4s ease', marginTop: 'auto' }}
                >
                  Book a free trial class
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke={hoveredCard === p.id ? '#1E5EBF' : 'white'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
    <section style={{ background: '#1E5EBF', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
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
            <h2 style={{ fontFamily: "'ChildGorlex','SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(2.4rem,5vw,3.6rem)', lineHeight: '1.05', color: '#FFFFFF', margin: 0 }}>
              How to get started?
            </h2>
            <CalendarWidget />
          </div>

          {/* RIGHT */}
          <div className="md:col-span-7 flex flex-col gap-5" style={{ paddingTop: '6rem' }}>
            <ol className="flex flex-col gap-4">
              {steps.map((s, idx) => (
                <li key={s.num}>
                  <div className="grid items-center gap-5 p-5 md:p-6" style={{ gridTemplateColumns: 'auto 1fr', background: '#FFFFFF', border: '1.5px solid #E8ECF8', borderRadius: 16, boxShadow: '0 4px 16px rgba(30,94,191,0.07)', transition: 'box-shadow 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(30,94,191,0.14)'; e.currentTarget.style.borderColor = '#1E5EBF' }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(30,94,191,0.07)'; e.currentTarget.style.borderColor = '#E8ECF8' }}
                  >
                    <span style={{ fontFamily: "'ChildGorlex','Anton',sans-serif", fontSize: 'clamp(2.5rem,6vw,4.5rem)', lineHeight: 1, color: idx === 0 ? '#1E5EBF' : idx === 1 ? '#F9B80E' : '#0A0A0A', userSelect: 'none', minWidth: 72 }}>{s.num}</span>
                    <div className="min-w-0">
                      <p style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1E5EBF', marginBottom: 6 }}>{s.label}</p>
                      <p style={{ fontSize: 'clamp(0.9375rem,1.5vw,1.125rem)', lineHeight: '1.5', color: '#333', margin: 0 }}>{s.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 pt-6 mt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9375rem', lineHeight: '1.6', maxWidth: '36ch', margin: 0 }}>The first class is completely free. No commitment. No pressure.</p>
              <button onClick={openModal} className="shrink-0 font-bold cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] min-h-[52px] whitespace-nowrap" style={{ background: '#FFFFFF', color: '#1E5EBF', padding: '0.875rem 2rem', borderRadius: 6, fontSize: '0.8125rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
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
      <PatternBg />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">

          {/* LEFT: title + stats */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <h2 style={{ fontFamily: "'ChildGorlex','SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(2rem,3.5vw,3rem)', lineHeight: '1.1', color: '#0A0A0A', margin: 0 }}>
              Get to know some of{' '}
              <span style={{ color: '#1E5EBF' }}>our students</span>
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
                    flexShrink: 0, width: CARD_W, background: '#FAFAFA', borderRadius: 16, padding: 20,
                    border: hoveredCard === idx ? '1.5px solid #1E5EBF' : '1px solid #E8E8E8',
                    boxShadow: hoveredCard === idx ? '0 8px 32px rgba(30,94,191,0.15)' : '0 2px 12px rgba(0,0,0,0.05)',
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
    <section style={{ background: '#F5F7FF', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <PatternBg />
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
            <h2 style={{ fontFamily: "'ChildGorlex','SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(2rem,4vw,3.2rem)', lineHeight: '1.1', color: '#0A0A0A', margin: 0 }}>
              <span style={{ color: '#1E5EBF' }}>For kids to learn confidently,</span>{' '}they need the right environment.
            </h2>
            <p style={{ color: '#555', fontSize: 'clamp(1rem,0.5vw + 0.875rem,1.125rem)', lineHeight: '1.65', margin: 0 }}>
              Fight Factory was designed to help children feel comfortable from day one, with:
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {facilityFeatures.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#1E5EBF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize: '0.9375rem', color: '#333', fontWeight: 500 }}>{f}</span>
                </li>
              ))}
            </ul>
            <button onClick={openModal} className="inline-flex items-center gap-2 font-semibold cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.99] self-start"
              style={{ background: '#1E5EBF', color: '#fff', padding: '0.875rem 1.75rem', borderRadius: 8, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
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
            <div style={{ position: 'absolute', top: '46%', left: '45%', width: 16, height: 16, borderRadius: '50%', background: '#1E5EBF', zIndex: 5, boxShadow: '0 0 0 4px rgba(30,94,191,0.2)' }} />
          </div>

        </div>
      </div>
    </section>
  )
}

function Coach() {
  const { openModal } = useModal()

  return (
    <section id="coach" style={{ background: '#1E5EBF', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <PatternBg />
      <style>{`
        @keyframes coachFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes coachBadge { 0%,100%{transform:rotate(-3deg) scale(1)} 50%{transform:rotate(-3deg) scale(1.04)} }
      `}</style>

      {/* Decorative blobs */}
      <div style={{ position:'absolute', top:'-80px', right:'-80px', width:320, height:320, borderRadius:'50%', background:'rgba(30,94,191,0.06)', zIndex:0 }} />
      <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:240, height:240, borderRadius:'50%', background:'rgba(30,94,191,0.05)', zIndex:0 }} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex:1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* LEFT: photo with decorative elements */}
          <div style={{ position:'relative', display:'flex', justifyContent:'center' }}>
            {/* Background shape */}
            <div style={{ position:'absolute', top:'8%', left:'5%', width:'80%', height:'84%', borderRadius:32, background:'linear-gradient(135deg, #1E5EBF 0%, #0d3a8a 100%)', zIndex:0 }} />

            {/* Photo — floating */}
            <div style={{ position:'relative', zIndex:2, animation:'coachFloat 4s ease-in-out infinite', width:'78%' }}>
              <img src="/kids/imagem/10.webp" alt="Coach Rodrigo Cabral"
                style={{ width:'100%', aspectRatio:'3/4', objectFit:'cover', objectPosition:'top', borderRadius:24, boxShadow:'0 24px 60px rgba(0,0,0,0.18)', display:'block', border:'4px solid #fff' }} />
            </div>

            {/* Badge — 5th Degree */}
            <div style={{ position:'absolute', bottom:'14%', right:'6%', zIndex:3, background:'#1E5EBF', color:'#fff', borderRadius:14, padding:'12px 16px', boxShadow:'0 8px 24px rgba(30,94,191,0.35)', animation:'coachBadge 3.5s ease-in-out infinite', border:'3px solid #fff' }}>
              <div style={{ fontSize:'0.6rem', letterSpacing:'0.15em', textTransform:'uppercase', opacity:0.75, marginBottom:3 }}>Black Belt</div>
              <div style={{ fontFamily:"'ChildGorlex','Anton',sans-serif", fontSize:'1.1rem', fontWeight:700 }}>5th Degree</div>
            </div>

            {/* Years badge */}
            <div style={{ position:'absolute', top:'12%', right:'4%', zIndex:3, background:'#fff', borderRadius:14, padding:'10px 14px', boxShadow:'0 8px 24px rgba(0,0,0,0.1)', border:'2px solid #E8ECF8' }}>
              <div style={{ fontFamily:"'ChildGorlex','Anton',sans-serif", fontSize:'1.5rem', color:'#1E5EBF', lineHeight:1, fontWeight:700 }}>30+</div>
              <div style={{ fontSize:'0.65rem', color:'#888', marginTop:3 }}>Years on the Mats</div>
            </div>
          </div>

          {/* RIGHT: content */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:24, height:3, background:'rgba(255,255,255,0.6)', borderRadius:999 }} />
              <span style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', fontWeight:700 }}>Meet Rodrigo, Head Coach</span>
            </div>

            <h2 style={{ fontFamily:"'ChildGorlex','SuperbusyActivity','Anton',sans-serif", fontSize:'clamp(2.5rem,5vw,4rem)', lineHeight:1.05, color:'#FFFFFF', margin:0 }}>
              Rodrigo Cabral
            </h2>

            {/* Stats cards */}
            <div style={{ display:'flex', gap:12 }}>
              {coachStats.map((s, i) => (
                <div key={s.label} style={{ flex:1, background: i===0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)', borderRadius:14, padding:'14px 16px', border:'1.5px solid rgba(255,255,255,0.25)' }}>
                  <div style={{ fontFamily:"'ChildGorlex','Anton',sans-serif", fontSize:'clamp(1.5rem,2.5vw,2rem)', color:'#FFFFFF', lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.65)', marginTop:5, letterSpacing:'0.04em' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.9375rem', lineHeight:'1.75', margin:0 }}>
              Rodrigo Cabral has over 30 years on the mats and developed the same method that helped shape current champion Andrew Tackett. Today, he helps children grow with confidence through Jiu-Jitsu.
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {coachBullets.map(b => (
                <div key={b.label} style={{ display:'flex', alignItems:'center', gap:12, background:'#FFFFFF', borderRadius:10, padding:'10px 14px', border:'1px solid rgba(30,94,191,0.15)' }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:'#1E5EBF', flexShrink:0 }} />
                  <span style={{ color:'rgba(30,94,191,0.55)', fontSize:'0.625rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', minWidth:110 }}>{b.label}</span>
                  <span style={{ color:'#1E5EBF', fontSize:'0.875rem', fontWeight:600 }}>{b.text}</span>
                </div>
              ))}
            </div>

            <button onClick={openModal} className="self-start inline-flex items-center gap-2 font-bold cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.99] min-h-[52px]"
              style={{ background:'#fff', color:'#1E5EBF', padding:'1rem 2.5rem', borderRadius:10, fontSize:'0.9rem', letterSpacing:'0.04em', fontWeight:700 }}>
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
      <TrianglePattern opacity={0.10} />
      <PatternBg />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1E5EBF', display: 'block', marginBottom: 12 }}>COMMON QUESTIONS</span>
            <h2 className="text-[#0A0A0A] mb-5" style={{ fontFamily: "'ChildGorlex','SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(2rem,4vw + 0.75rem,3.5rem)', letterSpacing: '0.01em', lineHeight: '1.1', textTransform: 'uppercase' }}>
              Common <span style={{ color: '#1E5EBF' }}>Questions</span>
            </h2>
            <button onClick={openModal} className="inline-flex items-center font-semibold cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] mt-4 whitespace-nowrap" style={{ background: '#1E5EBF', color: '#FFFFFF', padding: '0.75rem 1.5rem', borderRadius: 6, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Click to book your free trial class →
            </button>
          </div>
          <div className="md:col-span-8" style={{ borderTop: '1px solid #D8D8D8' }}>
            {faqItems.map(item => (
              <div key={item.id} className="border-b transition-colors" style={{ borderColor: '#D8D8D8' }}>
                <button onClick={() => setOpen(open === item.id ? null : item.id)} className="w-full flex items-center justify-between py-5 text-left cursor-pointer group min-h-[44px]" aria-expanded={open === item.id}>
                  <span className="text-[#0A0A0A] font-semibold pr-4 group-hover:text-[#555555] transition-colors" style={{ fontSize: 'clamp(0.9375rem,0.3vw + 0.875rem,1rem)' }}>{item.question}</span>
                  <span className="shrink-0 transition-transform duration-200" style={{ transform: open === item.id ? 'rotate(45deg)' : 'rotate(0deg)', color: open === item.id ? '#1E5EBF' : '#0A0A0A' }}>
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
