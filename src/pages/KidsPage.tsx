import { useEffect, useRef, useState } from 'react'
import { BookingProvider } from '../booking/BookingProvider'
import { KidsNavbar } from '../components/layout/KidsNavbar'
import { Footer } from '../components/sections/Footer'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { TrianglePattern } from '../components/ui/TrianglePattern'
import { PatternBg } from '../components/ui/PatternBg'
import { TatamiBg } from '../components/ui/TatamiBg'
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

const programs = [
  {
    id: 'beginner-kids',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Beginner Kids Program',
    description: 'Built for children with no experience, using a 5-class onboarding system designed to help kids start confidently.',
    cta: 'Book a free trial class',
    variant: 'primary' as const,
    imageSrc: '/kids/imagem/4.webp',
  },
  {
    id: 'kids',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Kids Program',
    description: 'Children develop discipline, confidence, focus, and resilience in a safe, structured, family-friendly environment.',
    cta: 'Book a free trial class',
    variant: 'secondary' as const,
    imageSrc: '/kids/imagem/5.webp',
  },
]

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

const colA = [
  { src: '/kids/imagem/gallery/1.webp', alt: 'Kids training' },
  { src: '/kids/imagem/gallery/2.webp', alt: 'Kids class' },
  { src: '/kids/imagem/gallery/3.webp', alt: 'Academy' },
]
const colB = [
  { src: '/kids/imagem/gallery/4.webp', alt: 'Training session' },
  { src: '/kids/imagem/gallery/5.webp', alt: 'Kids program' },
  { src: '/kids/imagem/gallery/6.webp', alt: 'Facility' },
]
const trackA = [...colA, ...colA, ...colA]
const trackB = [...colB, ...colB, ...colB]

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
  const contentRef = useRef<HTMLDivElement>(null)
  const { openModal } = useModal()

  useEffect(() => {
    let ctx: any = null
    async function initGsap() {
      const { gsap } = await import('gsap')
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      ctx = gsap.context(() => {
        gsap.fromTo(contentRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out', delay: 0.15 })
      })
    }
    initGsap()
    return () => ctx?.revert()
  }, [])

  return (
    <section style={{ background: '#FFFFFF', minHeight: '100vh', paddingTop: 'clamp(5rem,4rem + 3vw,7rem)', paddingBottom: 'clamp(2rem,1rem + 3vw,4rem)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'url(/kids/imagem/pattern.jpg)', backgroundRepeat: 'repeat', backgroundSize: '320px', opacity: 0.08, zIndex: 0 }} />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 w-full" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative', zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] items-center" style={{ gap: 'clamp(2rem,1rem + 4vw,4rem)', flexGrow: 1 }}>

          {/* LEFT: content */}
          <div ref={contentRef} className="flex flex-col opacity-0" style={{ gap: 'clamp(1.25rem,0.8rem + 1.5vw,2rem)' }}>
            <p className="inline-flex items-center" style={{ gap: '0.6em', fontFamily: 'Inter Variable,Inter,sans-serif', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.45)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#CC0000', display: 'inline-block', flexShrink: 0, animation: 'hero-pulse 2s ease-in-out infinite' }} />
              Austin, TX · Kids Jiu-Jitsu
            </p>

            <h1 className="text-[#0A0A0A]" style={{ fontFamily: "'SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(1.25rem,1.2rem + 2.2vw,3.2rem)', letterSpacing: '0.01em', lineHeight: '1.05' }}>
              Help your child build<br />
              <span style={{ color: '#CC0000', display: 'inline', position: 'relative' }}>confidence</span>{' '}from their <br />
              very first Jiu-Jitsu class.
            </h1>

            <p style={{ color: '#555555', maxWidth: '55ch', fontSize: 'clamp(0.75rem, 0.5rem + 1.5vw, 0.9375rem)', lineHeight: '1.65' }}>
              Fight Factory helps kids in Austin develop confidence through a beginner-friendly Jiu-Jitsu program designed to make their first steps feel safe, fun, and motivating from day one.
            </p>

            <div className="flex flex-wrap items-center gap-5" style={{ color: 'rgba(10,10,10,0.45)', fontSize: '0.8125rem' }}>
              <span className="flex items-center gap-1.5"><span className="text-[#0A0A0A] font-semibold">250+</span> Students</span>
              <span style={{ color: 'rgba(10,10,10,0.2)' }}>·</span>
              <span className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1L8.545 5.09H13L9.545 7.59L10.91 12L7 9.41L3.09 12L4.455 7.59L1 5.09H5.455L7 1Z" fill="#FBBC04" /></svg>
                <span className="text-[#0A0A0A] font-semibold">5.0</span> Google
              </span>
              <span style={{ color: 'rgba(10,10,10,0.2)' }}>·</span>
              <span className="flex items-center gap-1.5"><span className="text-[#0A0A0A] font-semibold">30+</span> Yrs on the Mats</span>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              <button onClick={openModal} className="inline-flex items-center gap-2.5 text-white font-semibold cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] min-h-[52px]" style={{ background: '#CC0000', padding: '1.05rem 1.75rem', fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: 6 }}>
                Book a free trial class <span style={{ display: 'inline-block', transition: 'transform 0.25s ease' }}>→</span>
              </button>
              <a href="#classes" className="inline-flex items-center gap-2 font-semibold transition-all duration-200 min-h-[52px]" style={{ border: '2px solid rgba(10,10,10,0.25)', color: 'rgba(10,10,10,0.7)', padding: '1.05rem 1.75rem', background: 'transparent', fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 6 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#0A0A0A'; e.currentTarget.style.color = '#0A0A0A' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,10,10,0.25)'; e.currentTarget.style.color = 'rgba(10,10,10,0.7)' }}
              >
                See Programs
              </a>
            </div>
          </div>

          {/* RIGHT: video */}
          <div className="relative" style={{ paddingBottom: '16px', paddingRight: '16px' }}>
            <div className="absolute inset-0" style={{ background: '#0A0A0A', transform: 'translate(16px, 16px)', zIndex: 0 }} />
            <div className="relative overflow-hidden w-full aspect-[9/16] md:aspect-[4/5] md:h-[min(78vh,720px)]" style={{ background: '#0A0A0A', zIndex: 1 }}>
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 1 }}>
                <source src="/kids/video/1.webm" type="video/webm" />
              </video>
              <span className="absolute z-10" style={{ top: '1.25rem', right: '1.25rem', background: '#CC0000', color: '#FFFFFF', padding: '0.55rem 0.85rem', fontFamily: 'Inter Variable,Inter,sans-serif', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                Austin, TX
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function WhyParents() {
  const { openModal } = useModal()
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section style={{ background: '#FFFFFF', padding: '96px 0', overflow: 'hidden', position: 'relative' }}>
      <PatternBg />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* LEFT */}
          <div className="flex flex-col gap-8">
            <h2 style={{ fontFamily: "'SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(2.25rem,3.5vw + 0.5rem,3.75rem)', lineHeight: '1.05', color: '#0A0A0A', margin: 0 }}>
              Why do parents choose{' '}<span style={{ color: '#CC0000' }}>Fight Factory?</span>
            </h2>
            <p style={{ color: '#555555', fontSize: '1rem', lineHeight: '1.8', margin: 0 }}>
              Fight Factory offers a kids onboarding system unique in Austin: children begin with 5 introductory classes in a separate group from the regular classes, designed to build confidence in their first steps:
            </p>
            <div className="overflow-hidden" style={{ borderRadius: '16px' }}>
              <img src="/kids/imagem/2.webp" alt="Fight Factory Kids Jiu-Jitsu class in Austin, TX" className="w-full object-cover" style={{ aspectRatio: '4/3', objectPosition: 'center top', display: 'block' }} />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-between" style={{ gap: '0' }}>
            <div>
              {whyBenefits.map((b, i) => (
                <div key={i}>
                  <div className="flex items-center gap-5 cursor-default" style={{ borderRadius: '14px', padding: '14px 16px', background: hoveredIdx === i ? '#CC0000' : '#FFFFFF', border: hoveredIdx === i ? '1px solid #CC0000' : '1px solid #E8E8E8', boxShadow: hoveredIdx === i ? '0 12px 40px rgba(204,0,0,0.30)' : '0 2px 8px rgba(0,0,0,0.05)', transform: hoveredIdx === i ? 'translateY(-3px) scale(1.01)' : 'translateY(0) scale(1)', transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                    onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 36, height: 36, minWidth: 36, background: hoveredIdx === i ? '#FFFFFF' : '#CC0000', transition: 'background 0.2s ease' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 5" stroke={hoveredIdx === i ? '#CC0000' : '#FFFFFF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }} /></svg>
                    </div>
                    <span style={{ fontSize: 'clamp(1rem,0.4vw + 0.9rem,1.125rem)', fontWeight: 500, lineHeight: '1.45', color: hoveredIdx === i ? '#FFFFFF' : '#0A0A0A', transition: 'color 0.2s ease' }}>{b.text}</span>
                  </div>
                  <div style={{ height: '6px' }} />
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-6">
              <button onClick={openModal} className="inline-flex items-center gap-3 text-white font-bold cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] min-h-[56px]" style={{ background: '#0A0A0A', padding: '1rem 2rem', borderRadius: 6, fontSize: '0.8125rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Book a free trial class
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div className="overflow-hidden" style={{ borderRadius: '16px' }}>
                <img src="/kids/imagem/3.webp" alt="Fight Factory Kids Jiu-Jitsu training in Austin, TX" className="w-full object-cover" style={{ aspectRatio: '16/9', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Programs() {
  const ref = useRef<HTMLDivElement>(null)
  const { openModal } = useModal()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = el.querySelectorAll<HTMLElement>('[data-animate]')
    cards.forEach(card => { card.style.opacity = '0'; card.style.transform = 'translateY(24px)' })
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        cards.forEach((card, i) => {
          setTimeout(() => { card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)'; card.style.opacity = '1'; card.style.transform = 'translateY(0)' }, i * 150)
        })
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="classes" style={{ background: '#FFFFFF', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <PatternBg />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="mb-12">
          <h2 style={{ fontFamily: "'SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(2.25rem,4vw + 0.5rem,4rem)', lineHeight: '1.0', color: '#0A0A0A', margin: 0 }}>
            Our <span style={{ color: '#CC0000' }}>Programs</span>
          </h2>
        </div>
        <div ref={ref} className="flex flex-col gap-6">
          {programs.map((program, i) => {
            const isPrimary = program.variant === 'primary'
            const imageRight = i % 2 === 0
            return (
              <article key={program.id} data-animate className="relative overflow-hidden grid grid-cols-1 lg:grid-cols-2" style={{ borderRadius: '24px', minHeight: '420px', background: isPrimary ? 'linear-gradient(135deg, #1a1a1a 0%, #0A0A0A 100%)' : '#FFFFFF', border: isPrimary ? 'none' : '1px solid #E8E8E8', boxShadow: isPrimary ? '0 24px 64px rgba(0,0,0,0.22)' : '0 8px 32px rgba(0,0,0,0.07)' }}>
                <div className={`flex flex-col justify-center gap-6 p-8 lg:p-12 ${imageRight ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex flex-col gap-5">
                    <div style={{ color: isPrimary ? 'rgba(255,255,255,0.7)' : '#CC0000' }}>{program.icon}</div>
                    <h3 style={{ fontFamily: "'SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(1.75rem,2.5vw + 0.5rem,2.75rem)', lineHeight: '1.05', color: isPrimary ? '#FFFFFF' : '#0A0A0A', margin: 0 }}>{program.title}</h3>
                    <p style={{ color: isPrimary ? 'rgba(255,255,255,0.72)' : '#555555', fontSize: 'clamp(1rem,0.5vw + 0.875rem,1.125rem)', lineHeight: '1.75', margin: 0 }}>{program.description}</p>
                  </div>
                  <button onClick={openModal} className="self-start inline-flex items-center gap-2 font-semibold cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] min-h-[48px]" style={{ background: isPrimary ? '#FFFFFF' : '#CC0000', color: isPrimary ? '#0A0A0A' : '#FFFFFF', padding: '0.75rem 1.75rem', borderRadius: 6, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {program.cta} →
                  </button>
                </div>
                <div className={`relative min-h-[280px] lg:min-h-0 overflow-hidden ${imageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                  <img src={program.imageSrc} alt={`${program.title} class`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Process() {
  const { openModal } = useModal()

  return (
    <section style={{ background: '#0A0A0A', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <TatamiBg />
      <div className="absolute pointer-events-none" style={{ left: '-8rem', top: 0, width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(204,0,0,0.08) 0%, transparent 70%)', zIndex: 0 }} />
      <div className="absolute pointer-events-none" style={{ right: '-10rem', bottom: 0, width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', zIndex: 0 }} />

      <div className="max-w-[1320px] mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5 flex flex-col gap-8">
            <h2 style={{ fontFamily: "'SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(2.4rem,5vw,3.6rem)', lineHeight: '1.05', color: '#FFFFFF', margin: 0 }}>How to get started?</h2>
            <CalendarWidget />
          </div>

          <div className="md:col-span-7 flex flex-col gap-5">
            <ol className="flex flex-col gap-4">
              {steps.map(s => (
                <li key={s.num}>
                  <div className="grid items-center gap-5 rounded-3xl p-5 md:p-7" style={{ gridTemplateColumns: 'auto 1fr', background: 'rgba(255,255,255,0.04)', border: '2px solid rgba(255,255,255,0.07)', boxShadow: '0 5px 0 0 rgba(0,0,0,0.6)' }}>
                    <span style={{ fontFamily: "'SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(2.8rem,7vw,5rem)', lineHeight: 1, color: s.color, textShadow: '0.04em 0.05em 0 rgba(0,0,0,0.55)', userSelect: 'none' }}>{s.num}</span>
                    <div className="min-w-0">
                      <p style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: s.color, marginBottom: 8 }}>{s.label}</p>
                      <p style={{ fontSize: 'clamp(0.9375rem,1.5vw,1.25rem)', lineHeight: '1.5', color: 'rgba(255,255,255,0.85)', margin: 0 }}>{s.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 pt-8 mt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9375rem', lineHeight: '1.6', maxWidth: '36ch', margin: 0 }}>The first class is completely free. No commitment. No pressure.</p>
              <button onClick={openModal} className="shrink-0 font-bold cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] min-h-[52px] whitespace-nowrap" style={{ background: '#CC0000', color: '#FFFFFF', padding: '0.875rem 2rem', borderRadius: 6, fontSize: '0.8125rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
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
  const track = [...testimonials, ...testimonials, ...testimonials, ...testimonials]

  function getInitials(name: string) {
    const parts = name.replace(/\./g, '').trim().split(/\s+/)
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  return (
    <section id="reviews" style={{ background: '#FFFFFF', padding: '96px 0', overflow: 'hidden', position: 'relative' }}>
      <PatternBg />
      <div className="relative" style={{ zIndex: 1 }}>
        <div className="text-center mb-14 px-4">
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888888' }}>Reviews</span>
          <h2 className="mt-3" style={{ fontFamily: "'SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(2rem,4vw + 0.5rem,3.5rem)', lineHeight: '1.0', color: '#0A0A0A', margin: '8px 0 0' }}>
            Meet some of <span style={{ color: '#CC0000' }}>our students</span>
          </h2>
        </div>

        <div style={{ position: 'relative', width: '100%' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(90deg, #FFFFFF 0%, transparent 8%, transparent 92%, #FFFFFF 100%)' }} />
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <div style={{ display: 'flex', gap: '16px', width: 'max-content', animation: 'testimonials-scroll 60s linear infinite' }}>
              {track.map((t, i) => (
                <div key={`${t.id}-${i}`} className="flex flex-col justify-between shrink-0" style={{ width: '300px', background: '#FFFFFF', borderRadius: '16px', padding: '20px', border: '1px solid #E8E8E8', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ width: 42, height: 42, background: t.avatarBg, fontSize: '0.875rem' }}>{getInitials(t.name)}</div>
                        <div>
                          <div className="font-semibold text-[#0A0A0A]" style={{ fontSize: '0.875rem' }}>{t.name}</div>
                          <div style={{ fontSize: '0.72rem', color: '#AAAAAA', marginTop: 1 }}>{t.timeAgo}</div>
                        </div>
                      </div>
                      <svg width="18" height="18" viewBox="0 0 48 48">
                        <path fill="#4285F4" d="M46.145 24.5c0-1.587-.143-3.112-.41-4.58H24v8.66h12.445c-.537 2.895-2.168 5.35-4.618 7.003v5.82h7.475c4.373-4.027 6.843-9.96 6.843-16.903z"/>
                        <path fill="#34A853" d="M24 47c6.27 0 11.531-2.078 15.375-5.627l-7.475-5.82C29.787 37.08 27.07 37.9 24 37.9c-6.05 0-11.175-4.087-13.005-9.575H3.285v6.012C7.11 42.607 15.01 47 24 47z"/>
                        <path fill="#FBBC05" d="M10.995 28.325A13.654 13.654 0 0 1 10.35 24c0-1.498.258-2.953.645-4.325v-6.012H3.285A22.966 22.966 0 0 0 1 24c0 3.71.888 7.222 2.285 10.337l7.71-6.012z"/>
                        <path fill="#EA4335" d="M24 10.1c3.412 0 6.468 1.173 8.876 3.475l6.655-6.655C35.53 3.092 30.268 1 24 1 15.01 1 7.11 5.393 3.285 13.663l7.71 6.012C12.825 14.187 17.95 10.1 24 10.1z"/>
                      </svg>
                    </div>
                    <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, i) => <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1L9.796 5.879H15L10.854 8.621L12.472 13.5L8 10.677L3.528 13.5L5.146 8.621L1 5.879H6.204L8 1Z" fill="#FBBC04" /></svg>)}</div>
                    <p style={{ fontSize: '0.875rem', lineHeight: '1.65', color: '#333333' }}>"{t.text}"</p>
                  </div>
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
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const { openModal } = useModal()
  const total = allFacilityPhotos.length

  function prev() { setPaused(true); setCurrent(i => (i - 1 + total) % total) }
  function next() { setPaused(true); setCurrent(i => (i + 1) % total) }

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setCurrent(i => (i + 1) % total), 3000)
    return () => clearInterval(id)
  }, [paused, total])

  // Visible: current, next, next+1
  const photo = allFacilityPhotos[current]

  return (
    <section style={{ background: '#FFFFFF', padding: '96px 0', position: 'relative' }}>
      <TrianglePattern opacity={0.10} />
      <PatternBg />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-5">
            <h2 className="text-[#0A0A0A] mb-5" style={{ fontFamily: "'SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(2rem,4vw + 0.75rem,3.5rem)', letterSpacing: '0.01em', lineHeight: '1.05' }}>
              <span style={{ color: '#CC0000' }}>For kids to learn confidently,</span>{' '}they need the right environment.
            </h2>
            <p className="text-[#555555] mb-7" style={{ fontSize: 'clamp(1rem,0.5vw + 0.875rem,1.125rem)', lineHeight: '1.65' }}>
              Fight Factory was designed to help children feel comfortable from day one, with:
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {facilityFeatures.map((feature, i) => (
                <li key={feature} className="flex items-center gap-4 px-3 py-3 cursor-default" style={{ borderRadius: '12px', background: hoveredIdx === i ? '#CC0000' : 'transparent', transition: 'background 0.2s ease' }} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                  <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 36, height: 36, minWidth: 36, background: hoveredIdx === i ? '#FFFFFF' : '#CC0000', transition: 'background 0.2s ease' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 5" stroke={hoveredIdx === i ? '#CC0000' : '#FFFFFF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }} /></svg>
                  </div>
                  <span style={{ lineHeight: '1.45', fontWeight: 500, color: hoveredIdx === i ? '#FFFFFF' : '#0A0A0A', transition: 'color 0.2s ease', fontSize: '0.9375rem' }}>{feature}</span>
                </li>
              ))}
            </ul>
            <button onClick={openModal} className="inline-flex items-center gap-2 font-semibold cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] min-h-[44px]" style={{ background: '#CC0000', color: '#FFFFFF', padding: '0.75rem 1.5rem', borderRadius: 6, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Click for a free trial class →
            </button>
          </div>

          <div className="md:col-span-7">
            {/* 1 large photo with side arrows */}
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 16px 56px rgba(0,0,0,0.14)', background: '#1c1c1c' }}>
              <img
                key={current}
                src={photo.src}
                alt={photo.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: 'fadeIn 0.4s ease' }}
                loading="lazy"
              />

              {/* Left arrow */}
              <button
                onClick={prev}
                style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.15)', transition: 'background 0.2s', zIndex: 2 }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>

              {/* Right arrow */}
              <button
                onClick={next}
                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.15)', transition: 'background 0.2s', zIndex: 2 }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>

              {/* Dots overlay bottom */}
              <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 2 }}>
                {allFacilityPhotos.map((_, i) => (
                  <button key={i} onClick={() => { setPaused(true); setCurrent(i) }}
                    style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 999, background: i === current ? '#CC0000' : 'rgba(255,255,255,0.6)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }}
                  />
                ))}
              </div>

              {/* Counter */}
              <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', borderRadius: 999, zIndex: 2 }}>
                {current + 1} / {total}
              </div>
            </div>

            <style>{`@keyframes fadeIn { from { opacity: 0.6; } to { opacity: 1; } }`}</style>
          </div>
        </div>
      </div>
    </section>
  )
}

function Coach() {
  const { openModal } = useModal()

  return (
    <section id="coach" style={{ background: '#0A0A0A', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <TatamiBg />
      <div className="absolute pointer-events-none" style={{ left: '-10rem', top: '50%', transform: 'translateY(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(204,0,0,0.08) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5">
            <div className="relative overflow-hidden" style={{ borderRadius: '20px', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
              <img src="/images/10.png" alt="Coach Rodrigo Cabral" className="w-full object-cover" style={{ aspectRatio: '4/5', display: 'block' }} />
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-4" style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(8px)' }}>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.625rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Head Instructor</div>
                  <div className="text-white font-bold" style={{ fontSize: '0.9375rem' }}>Rodrigo Cabral</div>
                </div>
                <span className="px-3 py-1.5 font-bold" style={{ background: 'transparent', border: '1.5px solid #CC0000', color: '#CC0000', fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', borderRadius: '4px' }}>5th Degree</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col gap-7">
            <div className="flex items-center gap-3">
              <div style={{ width: 28, height: 2, background: '#CC0000', borderRadius: 9999 }} />
              <span style={{ color: '#CC0000', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Meet Rodrigo, Head Coach</span>
            </div>
            <h2 className="text-white" style={{ fontFamily: "'SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(3rem,6vw,5rem)', lineHeight: '1.0', margin: 0, letterSpacing: '-0.01em' }}>Rodrigo Cabral</h2>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.1)' }} />
            <div className="flex items-start gap-10">
              {coachStats.map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'Anton,sans-serif', fontSize: 'clamp(1.75rem,3vw,2.5rem)', color: '#FFFFFF', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: 6, letterSpacing: '0.04em' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.1)' }} />
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(0.9375rem,0.5vw + 0.875rem,1.0625rem)', lineHeight: '1.75', margin: 0 }}>
              Rodrigo Cabral has over 30 years on the mats and developed the same method that helped shape current champion Andrew Tackett. Today, he helps children grow with confidence through Jiu-Jitsu.
            </p>
            <div className="flex flex-col gap-3">
              {coachBullets.map(b => (
                <div key={b.label} className="flex items-center gap-4">
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#CC0000', flexShrink: 0, display: 'inline-block' }} />
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', minWidth: '130px' }}>{b.label}</span>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9375rem', fontWeight: 500 }}>{b.text}</span>
                </div>
              ))}
            </div>
            <button onClick={openModal} className="self-start inline-flex items-center gap-2 text-white font-bold cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] min-h-[52px]" style={{ background: '#CC0000', padding: '1rem 2.5rem', borderRadius: 6, fontSize: '0.9375rem', letterSpacing: '0.04em' }}>
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
            <Badge className="mb-4">COMMON QUESTIONS</Badge>
            <h2 className="text-[#0A0A0A] mb-5" style={{ fontFamily: "'SuperbusyActivity','Anton',sans-serif", fontSize: 'clamp(2rem,4vw + 0.75rem,3.5rem)', letterSpacing: '0.01em', lineHeight: '1.0', textTransform: 'uppercase' }}>
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
      <Footer />
    </BookingProvider>
  )
}
