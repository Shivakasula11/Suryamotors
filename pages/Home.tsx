import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Clock, Award, Phone, MapPin, CheckCircle, ChevronLeft, ChevronRight, Car, Star } from 'lucide-react';
import { SERVICE_CATEGORIES, TESTIMONIALS } from '../constants';
import ServiceCard from '../components/ServiceCard';
import { COMPANY_PHONE, COMPANY_ADDRESS } from '../constants';
import  Home1 from '../pages/assests/Home1.png'
import Oil from '../pages/assests/Oilchange1.png'
import Home2 from '../pages/assests/Home2.png'
import Home3 from '../pages/assests/Home3.png'
import RedBmw2 from '../pages/assests/RedBmw2.png'

/* ─── Styles ──────────────────────────────────────────────────────────── */
const HOME_STYLES = `
  @keyframes fadeUp   { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
  @keyframes fadeLeft { from { opacity:0; transform:translateX(-36px)} to { opacity:1; transform:translateX(0) } }
  @keyframes fadeRight{ from { opacity:0; transform:translateX(36px) } to { opacity:1; transform:translateX(0) } }
  @keyframes floatImg { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }

  .h-anim-up    { animation: fadeUp    .65s cubic-bezier(.22,1,.36,1) both; }
  .h-anim-left  { animation: fadeLeft  .7s  cubic-bezier(.22,1,.36,1) both; }
  .h-anim-right { animation: fadeRight .7s  cubic-bezier(.22,1,.36,1) both; }

  .hd-100{animation-delay:.10s} .hd-200{animation-delay:.20s}
  .hd-300{animation-delay:.30s} .hd-400{animation-delay:.40s}

  .h-card {
    transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s ease;
  }
  .h-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 36px -10px rgba(37,99,235,.18);
  }

  .care-img-wrap { animation: floatImg 5s ease-in-out infinite; }

  .quote-card::before {
    content: '"';
    position: absolute; top: -8px; left: 20px;
    font-size: 5rem; line-height: 1;
    color: #2563eb; opacity: .15;
    font-family: Georgia, serif;
    pointer-events: none;
  }

  /* ═════════════════════════════════════════════════════════════════
     TESTIMONIAL COVERFLOW CAROUSEL
     ═════════════════════════════════════════════════════════════════ */
  .cf-stage {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 340px;
    perspective: 1400px;
  }
  .cf-slide {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    max-width: 480px;
    transition: transform 0.55s cubic-bezier(.22,1,.36,1),
                opacity   0.55s cubic-bezier(.22,1,.36,1),
                filter    0.55s cubic-bezier(.22,1,.36,1);
    will-change: transform, opacity;
  }
  .cf-slide-center {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
    z-index: 3;
    filter: none;
  }
  .cf-slide-left {
    transform: translate(calc(-50% - 62%), -50%) scale(0.78);
    opacity: 0.42;
    z-index: 2;
    filter: blur(0.4px);
  }
  .cf-slide-right {
    transform: translate(calc(-50% + 62%), -50%) scale(0.78);
    opacity: 0.42;
    z-index: 2;
    filter: blur(0.4px);
  }
  .cf-slide-hidden {
    transform: translate(-50%, -50%) scale(0.6);
    opacity: 0;
    z-index: 1;
    pointer-events: none;
  }
  @media (max-width: 767px) {
    .cf-slide-left, .cf-slide-right {
      transform: translate(-50%, -50%) scale(0.9);
      opacity: 0;
      pointer-events: none;
    }
    .cf-stage { min-height: 300px; }
  }
  .cf-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: white;
    border: 1px solid rgba(0,0,0,0.06);
    width: 44px; height: 44px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: #1f2937;
    box-shadow: 0 6px 20px -6px rgba(0,0,0,0.15);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }
  .cf-arrow:hover {
    background: #2563eb;
    color: white;
    transform: translateY(-50%) scale(1.08);
    box-shadow: 0 10px 24px -6px rgba(37,99,235,0.4);
  }
  .cf-arrow.dark-mode { background: #1f2937; color: #e5e7eb; border-color: rgba(255,255,255,0.08); }
  .cf-arrow-left  { left: 4px; }
  .cf-arrow-right { right: 4px; }
  @media (min-width: 640px) {
    .cf-arrow-left  { left: 12px; }
    .cf-arrow-right { right: 12px; }
  }
  @media (min-width: 1024px) {
    .cf-arrow-left  { left: -4px; }
    .cf-arrow-right { right: -4px; }
  }
  .cf-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
  .cf-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #cbd5e1;
    opacity: 0.6;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .cf-dot.active {
    width: 26px;
    border-radius: 4px;
    background: #2563eb;
    opacity: 1;
  }
  @media (prefers-color-scheme: dark) {
    .cf-dot { background: #4b5563; }
  }

  @keyframes animate-fade-in-up {
    from { opacity:0; transform:translateY(24px) }
    to   { opacity:1; transform:translateY(0) }
  }
  .animate-fade-in-up { animation: animate-fade-in-up .7s cubic-bezier(.22,1,.36,1) both; }

  /* ════════════════════════════════════════════════════════════════════
     RESPONSIVE BREAKPOINTS — Smartwatch → 4K
     ════════════════════════════════════════════════════════════════════ */
  @media (max-width: 240px) {
    .hero-heading   { font-size: 0.95rem !important; line-height: 1.25 !important; margin-bottom: 0.5rem !important; }
    .hero-sub       { font-size: 0.6rem !important; margin-bottom: 0.5rem !important; line-height: 1.4 !important; }
    .hero-btn       { padding: 5px 8px !important; font-size: 0.55rem !important; min-height: 28px !important; }
    .hero-label     { font-size: 0.45rem !important; letter-spacing: 0.1em !important; }
    .section-pad    { padding-top: 1rem !important; padding-bottom: 1rem !important; }
    .section-px     { padding-left: 0.4rem !important; padding-right: 0.4rem !important; }
    .feat-card      { padding: 0.6rem !important; }
    .feat-icon      { width: 1.75rem !important; height: 1.75rem !important; margin-bottom: 0.4rem !important; }
    .feat-title     { font-size: 0.7rem !important; margin-bottom: 0.2rem !important; }
    .feat-desc      { font-size: 0.55rem !important; line-height: 1.35 !important; }
    .section-h2     { font-size: 0.95rem !important; line-height: 1.25 !important; }
    .section-sub    { font-size: 0.55rem !important; line-height: 1.4 !important; }
    .care-heading   { font-size: 0.95rem !important; line-height: 1.25 !important; }
    .care-para      { font-size: 0.6rem !important; line-height: 1.4 !important; }
    .care-bullet    { font-size: 0.55rem !important; line-height: 1.35 !important; }
    .care-badge     { display: none !important; }
    .testi-card     { padding: 0.6rem !important; }
    .testi-quote    { font-size: 0.55rem !important; line-height: 1.4 !important; }
    .dot-row        { bottom: 0.2rem !important; left: 0.2rem !important; gap: 0.2rem !important; }
  }
  @media (min-width: 241px) and (max-width: 320px) {
    .hero-heading   { font-size: 1.2rem !important; line-height: 1.3 !important; }
    .hero-sub       { font-size: 0.7rem !important; line-height: 1.45 !important; }
    .hero-btn       { padding: 7px 12px !important; font-size: 0.65rem !important; min-height: 34px !important; }
    .hero-label     { font-size: 0.55rem !important; }
    .section-pad    { padding-top: 1.75rem !important; padding-bottom: 1.75rem !important; }
    .section-px     { padding-left: 0.65rem !important; padding-right: 0.65rem !important; }
    .feat-card      { padding: 0.85rem !important; }
    .feat-icon      { width: 2.25rem !important; height: 2.25rem !important; }
    .feat-title     { font-size: 0.8rem !important; }
    .feat-desc      { font-size: 0.65rem !important; line-height: 1.45 !important; }
    .section-h2     { font-size: 1.1rem !important; }
    .section-sub    { font-size: 0.7rem !important; }
    .care-heading   { font-size: 1.15rem !important; line-height: 1.3 !important; }
    .care-para      { font-size: 0.7rem !important; line-height: 1.5 !important; }
    .care-bullet    { font-size: 0.65rem !important; line-height: 1.45 !important; }
    .care-badge     { display: none !important; }
    .testi-card     { padding: 0.85rem !important; }
    .testi-quote    { font-size: 0.7rem !important; line-height: 1.5 !important; }
  }
  @media (min-width: 321px) and (max-width: 480px) {
    .hero-heading   { font-size: 1.55rem !important; line-height: 1.2 !important; }
    .hero-sub       { font-size: 0.85rem !important; }
    .hero-btn       { padding: 10px 18px !important; min-height: 40px !important; }
    .section-pad    { padding-top: 2.25rem !important; padding-bottom: 2.25rem !important; }
    .section-px     { padding-left: 0.85rem !important; padding-right: 0.85rem !important; }
    .feat-title     { font-size: 0.95rem !important; }
    .feat-desc      { font-size: 0.78rem !important; }
    .section-h2     { font-size: 1.35rem !important; }
    .care-heading   { font-size: 1.55rem !important; line-height: 1.2 !important; }
    .care-para      { font-size: 0.82rem !important; }
    .care-badge     { display: none !important; }
    .testi-quote    { font-size: 0.8rem !important; }
  }
  @media (min-width: 481px) and (max-width: 600px) {
    .hero-heading   { font-size: 1.85rem !important; line-height: 1.2 !important; }
    .hero-sub       { font-size: 0.95rem !important; }
    .hero-btn       { min-height: 42px !important; }
    .section-pad    { padding-top: 2.75rem !important; padding-bottom: 2.75rem !important; }
    .care-heading   { font-size: 1.85rem !important; }
    .care-para      { font-size: 0.9rem !important; }
    .care-badge     { display: none !important; }
    .section-h2     { font-size: 1.5rem !important; }
  }
  @media (min-width: 601px) and (max-width: 768px) {
    .hero-heading   { font-size: 2.25rem !important; line-height: 1.15 !important; }
    .hero-sub       { font-size: 1rem !important; }
    .section-pad    { padding-top: 3.25rem !important; padding-bottom: 3.25rem !important; }
    .section-px     { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
    .care-heading   { font-size: 2.2rem !important; }
    .care-para      { font-size: 0.95rem !important; }
    .care-badge-tr  { display: none !important; }
    .section-h2     { font-size: 1.75rem !important; }
    .feat-title     { font-size: 1.05rem !important; }
    .feat-desc      { font-size: 0.85rem !important; }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .hero-heading   { font-size: 2.6rem !important; line-height: 1.15 !important; }
    .hero-sub       { font-size: 1.05rem !important; line-height: 1.55 !important; }
    .hero-btn       { padding: 11px 22px !important; font-size: 0.9rem !important; }
    .section-pad    { padding-top: 3.75rem !important; padding-bottom: 3.75rem !important; }
    .section-px     { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
    .feat-card      { padding: 1.4rem !important; }
    .feat-title     { font-size: 1.1rem !important; }
    .feat-desc      { font-size: 0.9rem !important; }
    .section-h2     { font-size: 2rem !important; }
    .section-sub    { font-size: 1rem !important; }
    .care-heading   { font-size: 2.5rem !important; line-height: 1.15 !important; }
    .care-para      { font-size: 1rem !important; line-height: 1.6 !important; }
    .care-bullet    { font-size: 0.95rem !important; }
    .testi-card     { padding: 1.4rem !important; }
    .testi-quote    { font-size: 0.92rem !important; }
  }
  @media (min-width: 1025px) and (max-width: 1280px) {
    .hero-heading   { font-size: 3rem !important; line-height: 1.1 !important; }
    .hero-sub       { font-size: 1.1rem !important; line-height: 1.6 !important; }
    .hero-btn       { padding: 12px 26px !important; font-size: 0.95rem !important; }
    .section-pad    { padding-top: 4.5rem !important; padding-bottom: 4.5rem !important; }
    .section-px     { padding-left: 2rem !important; padding-right: 2rem !important; }
    .feat-card      { padding: 1.6rem !important; }
    .feat-title     { font-size: 1.2rem !important; }
    .feat-desc      { font-size: 0.95rem !important; }
    .section-h2     { font-size: 2.25rem !important; }
    .section-sub    { font-size: 1.05rem !important; }
    .care-heading   { font-size: 2.85rem !important; line-height: 1.1 !important; }
    .care-para      { font-size: 1.05rem !important; line-height: 1.65 !important; }
    .care-bullet    { font-size: 1rem !important; }
    .testi-quote    { font-size: 0.95rem !important; }
  }
  @media (min-width: 1281px) and (max-width: 1919px) {
    .hero-heading   { font-size: 3.75rem !important; line-height: 1.1 !important; }
    .hero-sub       { font-size: 1.2rem !important; line-height: 1.65 !important; }
    .hero-btn       { padding: 13px 30px !important; font-size: 1rem !important; }
    .section-pad    { padding-top: 5rem !important; padding-bottom: 5rem !important; }
    .section-px     { padding-left: 2.5rem !important; padding-right: 2.5rem !important; }
    .feat-card      { padding: 1.85rem !important; }
    .feat-title     { font-size: 1.3rem !important; }
    .feat-desc      { font-size: 1rem !important; }
    .section-h2     { font-size: 2.5rem !important; }
    .section-sub    { font-size: 1.15rem !important; }
    .care-heading   { font-size: 3.25rem !important; line-height: 1.05 !important; }
    .care-para      { font-size: 1.1rem !important; line-height: 1.7 !important; }
    .care-bullet    { font-size: 1.05rem !important; }
    .testi-card     { padding: 1.85rem !important; }
    .testi-quote    { font-size: 1rem !important; line-height: 1.65 !important; }
  }
  @media (min-width: 1920px) {
    .hero-heading   { font-size: 4.75rem !important; line-height: 1.05 !important; }
    .hero-sub       { font-size: 1.4rem !important; line-height: 1.7 !important; }
    .hero-btn       { padding: 16px 36px !important; font-size: 1.1rem !important; }
    .section-pad    { padding-top: 6rem !important; padding-bottom: 6rem !important; }
    .section-px     { padding-left: 3rem !important; padding-right: 3rem !important; }
    .feat-card      { padding: 2.25rem !important; }
    .feat-title     { font-size: 1.45rem !important; }
    .feat-desc      { font-size: 1.1rem !important; }
    .section-h2     { font-size: 2.85rem !important; }
    .section-sub    { font-size: 1.25rem !important; }
    .care-heading   { font-size: 3.85rem !important; line-height: 1.05 !important; }
    .care-para      { font-size: 1.2rem !important; line-height: 1.75 !important; }
    .care-bullet    { font-size: 1.15rem !important; }
    .testi-quote    { font-size: 1.1rem !important; line-height: 1.7 !important; }
  }
  @media (max-width: 320px) {
    .hero-heading, .care-heading, .section-h2 { word-break: break-word; hyphens: auto; }
  }
    @media (pointer: coarse) {
    .hero-btn { min-height: 44px; }
  }

  /* ── Mobile hero — fill full viewport + better car framing ── */
  @media (max-width: 640px) {
    .hero-section-fit {
      height: 100vh !important;
      height: 100dvh !important;
      min-height: 100dvh !important;
      max-height: none !important;
    }
    .hero-slide-fit {
      background-position: center 35% !important;
      background-size: cover !important;
    }
  }
`;

/* ─── Scroll-trigger hook ─────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const BorderGlow = ({ duration = 4000 }: { duration?: number }) => {
  const measureRef = useRef<SVGRectElement | null>(null);
  const glowRef    = useRef<SVGRectElement | null>(null);

  useEffect(() => {
    const mEl = measureRef.current as any;
    const gEl = glowRef.current;
    if (!mEl || !gEl) return;

    
    const totalLen: number = mEl.getTotalLength();
    if (!totalLen) return;

    const GLOW_LEN = 260; // px of the bright segment

    gEl.setAttribute('stroke-dasharray', `${GLOW_LEN} ${totalLen}`);

    let startTime: number | null = null;
    let rafId: number;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
     
      const pct = ((now - startTime) % duration) / duration;
      
      gEl.setAttribute('stroke-dashoffset', String(-(pct * totalLen)));
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [duration]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
    >
      <defs>
        
        <filter id="cbg-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        ref={measureRef}
        fill="none"
        stroke="none"
        width="100%"
        height="100%"
        rx={16}
        ry={16}
      />

      <rect
        fill="none"
        stroke="#1e40af"
        strokeWidth={2}
        strokeOpacity={0.45}
        width="100%"
        height="100%"
        rx={16}
        ry={16}
      />

      <rect
        ref={glowRef}
        fill="none"
        stroke="#93c5fd"
        strokeWidth={7}
        strokeLinecap="round"
        strokeDasharray="260 9999"
        strokeDashoffset={0}
        filter="url(#cbg-glow)"
        width="100%"
        height="100%"
        rx={16}
        ry={16}
      />
    </svg>
  );
};


const MovingBorderCard = ({
  children,
  active = false,
  borderRadius = '1rem',
  className = '',
  style: externalStyle = {},
}: {
  children: React.ReactNode;
  active?: boolean;
  borderRadius?: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={className}
    style={{
      position: 'relative',
      padding: '2px',
      overflow: 'hidden',
      borderRadius,
     
      boxShadow: active
        ? '0 0 0 0px transparent, 0 8px 28px rgba(96,165,250,0.28)'
        : undefined,
      transition: 'box-shadow 0.5s ease',
      ...externalStyle,
    }}
  >
    {/* BorderGlow only mounted for the active card — zero cost on others */}
    {active && <BorderGlow duration={4000} />}
    <div style={{ position: 'relative', borderRadius: `calc(${borderRadius} * 0.96)` }}>
      {children}
    </div>
  </div>
);

const HERO_SLIDES = [
  {
    image: RedBmw2,
     bgPosition: '65% center',
    label: 'Complete Car Care',
    heading: 'Complete Car Care',
    highlight: 'Under One Roof',
    subtext: 'Professional, reliable, and affordable car services for all brands. We treat your car like our own.',
  },
  {
    image: Home2,
     bgPosition: '70% center',
    label: 'Expert Mechanics',
    heading: 'Certified Experts,',
    highlight: 'Every Repair Done Right',
    subtext: 'Our trained technicians handle everything from engine overhauls to quick fixes — for every brand.',
  },
  {
    image: Oil,
    bgPosition: 'right 38%',
    label: 'All Brands Serviced',
    heading: 'Any Brand.',
    highlight: 'Any Problem. One Stop.',
    subtext: "Whether it's a hatchback or an SUV, petrol or diesel — we've got the tools and skills for it.",
  },
  {
    image: Home1,
    bgPosition: 'right 40%',
    label: 'Quality Guaranteed',
    heading: 'Genuine Parts,',
    highlight: 'Guaranteed Quality',
    subtext: 'We use only OEM-certified parts and provide full transparency on every job we do.',
  },
];

/* Static trust stats shown in the hero (mobile only, doesn't change per slide) */
const HERO_STATS = [
  { icon: Car,         value: 'All Brands',    label: 'Service Support'  },
  { icon: ShieldCheck, value: 'Genuine Parts', label: 'Quality Assured'  },
  { icon: Star,        value: '4.6 Rating',    label: 'Happy Customers'  },
];

const Home: React.FC = () => {
  /* ── ORIGINAL — UNTOUCHED ─────────────────────────────────────────── */
  const featuredServices = SERVICE_CATEGORIES.slice(0, 3);
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const careRef  = useInView(0.1);
  const testiRef = useInView(0.1);

  const [testiActive, setTestiActive] = useState(0);
  const [testiPaused, setTestiPaused] = useState(false);
  const testiCount = TESTIMONIALS.length;

  const testiNext = useCallback(() => {
    setTestiActive((prev) => (prev + 1) % testiCount);
  }, [testiCount]);

  const testiPrev = useCallback(() => {
    setTestiActive((prev) => (prev - 1 + testiCount) % testiCount);
  }, [testiCount]);

  const testiGoTo = useCallback((idx: number) => {
    setTestiActive(idx);
  }, []);

  useEffect(() => {
    if (testiPaused) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const timer = setInterval(testiNext, 5000);
    return () => clearInterval(timer);
  }, [testiNext, testiPaused]);

  const getSlideClass = (idx: number): string => {
    if (idx === testiActive) return 'cf-slide-center';
    const leftIdx  = (testiActive - 1 + testiCount) % testiCount;
    const rightIdx = (testiActive + 1) % testiCount;
    if (idx === leftIdx)  return 'cf-slide-left';
    if (idx === rightIdx) return 'cf-slide-right';
    return 'cf-slide-hidden';
  };

  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) testiNext();
      else testiPrev();
    }
    touchStartX.current = null;
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden pb-4 md:pb-0">
      <style>{HOME_STYLES}</style>

      {/* ════════════════════════════════════════════════════════════════
          HERO CAROUSEL — UNTOUCHED
      ════════════════════════════════════════════════════════════════ */}
      <section className="hero-section-fit relative h-[75vh] min-h-[480px] max-h-[640px] sm:h-[85vh] sm:min-h-[520px] sm:max-h-[800px] lg:h-[100vh] lg:max-h-[1000px] flex items-center overflow-hidden text-white">
        {HERO_SLIDES.map((slide, i) => (
         <div
  key={i}
  className="hero-slide-fit absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-1000"
  style={{
    backgroundImage: `url("${slide.image}")`,
    backgroundPosition: slide.bgPosition || 'center',
    opacity: i === current ? 1 : 0,
    zIndex: 0,
  }}
/>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10 md:from-black/80 md:via-black/50 md:to-transparent z-10" />

        <div className="relative z-20 w-full max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 2xl:px-12 section-px">
          <div key={current} className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 2xl:w-2/5 animate-fade-in-up">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
              <span className="block w-5 sm:w-8 h-[2px] bg-blue-500" />
              <span className="hero-label text-[0.55rem] sm:text-xs font-semibold tracking-widest uppercase text-blue-400">
                {HERO_SLIDES[current].label}
              </span>
            </div>
            <h1 className="hero-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold tracking-tight mb-3 sm:mb-5 md:mb-6 leading-tight break-words">
              {HERO_SLIDES[current].heading} <br />
              <span className="text-blue-500">{HERO_SLIDES[current].highlight}</span>
            </h1>
            <p className="hero-sub text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 mb-4 sm:mb-6 md:mb-8 max-w-xl leading-relaxed">
              {HERO_SLIDES[current].subtext}
            </p>
            <div className="flex flex-col xs:flex-row sm:flex-row gap-2 sm:gap-3 md:gap-4">
              <Link
                to="/services"
                className="hero-btn w-full sm:w-auto px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm md:text-base rounded-lg transition-colors flex items-center justify-center"
              >
                Explore Services <ArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </Link>
              <Link
                to="/contact"
                className="hero-btn w-full sm:w-auto px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold text-xs sm:text-sm md:text-base rounded-lg transition-colors flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              🔧 MOBILE-ONLY hero stats row — matches the reference mockup.
              Sits outside the animated key={current} wrapper so it stays
              static across slides. Hidden on sm+ so desktop stays untouched.
          ═══════════════════════════════════════════════════════════ */}
          <div className="sm:hidden mt-6 grid grid-cols-3">
            {HERO_STATS.map(({ icon: Icon, value, label }, i, arr) => (
              <div
                key={value}
                className={`flex items-center gap-2.5 px-2 ${
                  i < arr.length - 1 ? 'border-r border-white/20' : ''
                }`}
              >
                <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-600/30">
                  <Icon size={17} className="text-white" strokeWidth={2.2} />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-bold text-[0.72rem] leading-tight">
                    {value}
                  </p>
                  <p className="text-gray-300 text-[0.58rem] leading-tight mt-0.5">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dot-row absolute bottom-3 sm:bottom-6 left-3 sm:left-6 z-30 flex items-center gap-1.5 sm:gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-500 rounded-full"
              style={{
                width: i === current ? '1.5rem' : '0.45rem',
                height: '0.45rem',
                backgroundColor: i === current ? '#3b82f6' : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FEATURES SECTION — UNTOUCHED
      ════════════════════════════════════════════════════════════════ */}
      <section className="section-pad py-8 sm:py-12 md:py-16 xl:py-20 2xl:py-24 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="section-px max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 2xl:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 xl:gap-10 text-center">
            <div className="feat-card h-card p-4 sm:p-5 md:p-6 xl:p-8 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <div className="feat-icon w-10 h-10 sm:w-12 sm:h-12 xl:w-14 xl:h-14 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <ShieldCheck size={22} className="sm:hidden" />
                <ShieldCheck size={28} className="hidden sm:block" />
              </div>
              <h3 className="feat-title text-base sm:text-lg md:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2">Quality Guarantee</h3>
              <p className="feat-desc text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">We use only genuine parts and certified mechanics for your peace of mind.</p>
            </div>
            <div className="feat-card h-card p-4 sm:p-5 md:p-6 xl:p-8 rounded-xl bg-gray-50 dark:bg-gray-700/50">
              <div className="feat-icon w-10 h-10 sm:w-12 sm:h-12 xl:w-14 xl:h-14 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Clock size={22} className="sm:hidden" />
                <Clock size={28} className="hidden sm:block" />
              </div>
              <h3 className="feat-title text-base sm:text-lg md:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2">Timely Delivery</h3>
              <p className="feat-desc text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">We value your time. Accurate estimates and on-time vehicle delivery.</p>
            </div>
            <div className="feat-card h-card p-4 sm:p-5 md:p-6 xl:p-8 rounded-xl bg-gray-50 dark:bg-gray-700/50 sm:col-span-2 md:col-span-1">
              <div className="feat-icon w-10 h-10 sm:w-12 sm:h-12 xl:w-14 xl:h-14 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Award size={22} className="sm:hidden" />
                <Award size={28} className="hidden sm:block" />
              </div>
              <h3 className="feat-title text-base sm:text-lg md:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2">Expert Staff</h3>
              <p className="feat-desc text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">Our technicians are highly trained to handle complex repairs for all brands.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FEATURED SERVICES — UNTOUCHED
      ════════════════════════════════════════════════════════════════ */}
      <section className="section-pad py-8 sm:py-12 md:py-16 xl:py-20 2xl:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="section-px max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-6 sm:mb-8 md:mb-12 xl:mb-14">
            <h2 className="section-h2 text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">
              Our Popular Services
            </h2>
            <p className="section-sub text-sm sm:text-base md:text-lg xl:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              From routine maintenance to major repairs, we cover it all.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 xl:gap-10">
            {featuredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-10 md:mt-12 xl:mt-14">
            <Link
              to="/services"
              className="inline-flex items-center text-sm sm:text-base xl:text-lg text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              View All Services <ArrowRight className="ml-1.5 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CAR CARE SPLIT SECTION — UNTOUCHED
      ════════════════════════════════════════════════════════════════ */}
      <section className="section-pad py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 2xl:py-28 bg-white dark:bg-gray-800 transition-colors duration-300 overflow-hidden">
        <div ref={careRef.ref} className="section-px max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 2xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-center">
            <div className={`flex items-center justify-center ${careRef.visible ? 'h-anim-left' : 'opacity-0'}`}>
              <div className="relative care-img-wrap w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                <div
                  className="absolute inset-0 rounded-full scale-90 blur-3xl opacity-20 dark:opacity-10"
                  style={{ background: 'radial-gradient(circle, #2563eb 0%, #93c5fd 60%, transparent 100%)' }}
                />
                <img loading="eager" fetchpriority="high"
                  src={Home3}
                  alt="Expert car service at Surya Motors"
                  className="relative z-10 w-full mx-auto object-contain drop-shadow-2xl"
                  style={{ aspectRatio: '1/1' }}
                />
                <div className="care-badge absolute -top-3 -left-3 sm:-top-4 sm:-left-4 xl:-top-6 xl:-left-6 z-20 bg-blue-600 text-white px-3 sm:px-4 xl:px-5 py-1.5 sm:py-2 xl:py-3 rounded-xl sm:rounded-2xl shadow-lg shadow-blue-500/30">
                  <p className="text-[0.5rem] sm:text-xs xl:text-sm font-bold uppercase tracking-widest">15+ Years</p>
                  <p className="text-sm sm:text-lg xl:text-xl font-extrabold leading-none">Trusted</p>
                </div>
                <div className="care-badge care-badge-tr absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 xl:-bottom-6 xl:-right-6 z-20 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 px-3 sm:px-4 xl:px-5 py-2 sm:py-3 xl:py-4 rounded-xl sm:rounded-2xl shadow-xl">
                  <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 xl:w-10 xl:h-10 bg-blue-100 dark:bg-blue-900/50 rounded-md sm:rounded-lg flex items-center justify-center">
                      <ShieldCheck size={13} className="sm:hidden text-blue-600 dark:text-blue-400" />
                      <ShieldCheck size={16} className="hidden sm:block xl:hidden text-blue-600 dark:text-blue-400" />
                      <ShieldCheck size={20} className="hidden xl:block text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[0.5rem] sm:text-xs xl:text-sm text-gray-500 dark:text-gray-400 font-medium">Satisfaction</p>
                      <p className="text-xs sm:text-sm xl:text-base font-extrabold text-gray-900 dark:text-white whitespace-nowrap">100% Guaranteed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${careRef.visible ? 'h-anim-right' : 'opacity-0'}`}>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="block w-6 sm:w-8 h-[2px] bg-blue-600" />
                <span className="text-[0.6rem] sm:text-xs xl:text-sm font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400">
                  Why Surya Motors
                </span>
              </div>
              <h2 className="care-heading text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-3 sm:mb-4 md:mb-5 break-words">
                Your Car Deserves{' '}
                <span className="text-blue-600 dark:text-blue-400">Expert Care</span>
              </h2>
              <p className="care-para text-xs sm:text-sm md:text-base xl:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-5 sm:mb-6 md:mb-8">
                At Surya Motors, we combine years of hands-on experience with genuine parts and
                certified techniques. Whether it's a routine check-up or a major repair, we treat
                every vehicle with the same precision and care — because your safety matters most.
              </p>
              <ul className="space-y-3 sm:space-y-4 xl:space-y-5 mb-6 sm:mb-8 md:mb-10">
                {[
                  'Certified mechanics trained for all major car brands — petrol, diesel & EV.',
                  'Only OEM-grade genuine parts used — no shortcuts, full transparency.',
                  'Accurate time estimates and on-time delivery, every single visit.',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0 mt-0.5 w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                      <CheckCircle size={11} className="sm:hidden text-blue-600 dark:text-blue-400" />
                      <CheckCircle size={13} className="hidden sm:block xl:hidden text-blue-600 dark:text-blue-400" />
                      <CheckCircle size={16} className="hidden xl:block text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="care-bullet text-xs sm:text-sm md:text-base xl:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 xl:gap-4">
                <a
                  href={`tel:${COMPANY_PHONE}`}
                  className="h-card flex items-center gap-2 sm:gap-3 p-3 sm:p-4 xl:p-5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl sm:rounded-2xl hover:border-blue-400 dark:hover:border-blue-500 group transition-colors duration-200"
                >
                  <div className="flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 xl:w-11 xl:h-11 bg-blue-100 dark:bg-blue-900/50 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-200">
                    <Phone size={13} className="sm:hidden text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                    <Phone size={15} className="hidden sm:block xl:hidden text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                    <Phone size={18} className="hidden xl:block text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.5rem] sm:text-[0.625rem] xl:text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Call Us</p>
                    <p className="text-[0.6rem] sm:text-xs xl:text-sm font-bold text-gray-900 dark:text-white truncate">{COMPANY_PHONE}</p>
                  </div>
                </a>
                <div className="h-card flex items-center gap-2 sm:gap-3 p-3 sm:p-4 xl:p-5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl sm:rounded-2xl">
                  <div className="flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 xl:w-11 xl:h-11 bg-blue-100 dark:bg-blue-900/50 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Clock size={13} className="sm:hidden text-blue-600 dark:text-blue-400" />
                    <Clock size={15} className="hidden sm:block xl:hidden text-blue-600 dark:text-blue-400" />
                    <Clock size={18} className="hidden xl:block text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[0.5rem] sm:text-[0.625rem] xl:text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Open</p>
                    <p className="text-[0.6rem] sm:text-xs xl:text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">Mon–Sun 8AM–10PM</p>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/NSFCanSrBzAHhEvAA"
                  target="_blank"
                  rel="noreferrer"
                  className="h-card flex items-center gap-2 sm:gap-3 p-3 sm:p-4 xl:p-5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl sm:rounded-2xl hover:border-blue-400 dark:hover:border-blue-500 group transition-colors duration-200 xs:col-span-2 sm:col-span-1"
                >
                  <div className="flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 xl:w-11 xl:h-11 bg-blue-100 dark:bg-blue-900/50 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-200">
                    <MapPin size={13} className="sm:hidden text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                    <MapPin size={15} className="hidden sm:block xl:hidden text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                    <MapPin size={18} className="hidden xl:block text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.5rem] sm:text-[0.625rem] xl:text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Location</p>
                    <p className="text-[0.6rem] sm:text-xs xl:text-sm font-bold text-gray-900 dark:text-white truncate">{COMPANY_ADDRESS}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════════════════════ */}
      <section className="section-pad py-8 sm:py-12 md:py-16 lg:py-20 2xl:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div ref={testiRef.ref} className="section-px max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 2xl:px-12">

          <div className={`text-center mb-8 sm:mb-10 md:mb-14 ${testiRef.visible ? 'h-anim-up' : 'opacity-0'}`}>
            <p className="text-[0.6rem] sm:text-xs xl:text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1.5 sm:mb-2">
              Customer Stories
            </p>
            <h2 className="section-h2 text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
              What Our Clients Say
            </h2>
            <div className="mx-auto w-10 sm:w-12 xl:w-16 h-1 bg-blue-600 rounded-full" />
          </div>

          <div
            className={`relative ${testiRef.visible ? 'h-anim-up hd-200' : 'opacity-0'}`}
            onMouseEnter={() => setTestiPaused(true)}
            onMouseLeave={() => setTestiPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Prev arrow — UNTOUCHED */}
            <button
              type="button"
              onClick={testiPrev}
              aria-label="Previous testimonial"
              className="cf-arrow cf-arrow-left dark:!bg-gray-800 dark:!text-gray-200 dark:!border-gray-700"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>

            <div className="cf-stage">
              {TESTIMONIALS.map((testimonial, i) => {
                const isActive = i === testiActive;
                return (
                  
                  <div
                    key={testimonial.id}
                    className={`cf-slide ${getSlideClass(i)}`}
                    onClick={() => !isActive && testiGoTo(i)}
                    style={{ cursor: isActive ? 'default' : 'pointer' }}
                  >
                    
                    <MovingBorderCard
                      active={isActive}
                      borderRadius="1rem"
                      className="h-card shadow-lg"
                    >
                      <div
                        className="testi-card quote-card relative bg-white dark:bg-gray-700 p-5 sm:p-6 md:p-7 xl:p-8 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-600"
                        aria-hidden={!isActive}
                      >
                        {/* Stars */}
                        <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-4">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <svg
                              key={s}
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-3 h-3 sm:w-4 sm:h-4 xl:w-5 xl:h-5 text-yellow-400"
                            >
                              <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
                            </svg>
                          ))}
                        </div>

                        {/* Comment */}
                        <p className="testi-quote text-xs sm:text-sm xl:text-base text-gray-600 dark:text-gray-300 italic leading-relaxed mb-3 sm:mb-6">
                          "{testimonial.comment}"
                        </p>

                        {/* Avatar + name + role */}
                        <div className="flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-600">
                          <img loading="lazy"
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-8 h-8 sm:w-11 sm:h-11 xl:w-12 xl:h-12 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900 flex-shrink-0"
                          />
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm xl:text-base">
                              {testimonial.name}
                            </h4>
                            <p className="text-[0.6rem] sm:text-xs xl:text-sm text-gray-500 dark:text-gray-400">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </MovingBorderCard>
                  </div>
                );
              })}
            </div>

            {/* Next arrow — UNTOUCHED */}
            <button
              type="button"
              onClick={testiNext}
              aria-label="Next testimonial"
              className="cf-arrow cf-arrow-right dark:!bg-gray-800 dark:!text-gray-200 dark:!border-gray-700"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>

            {/* Dot indicators — UNTOUCHED */}
            <div className="cf-dots" role="tablist" aria-label="Testimonial navigation">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === testiActive}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => testiGoTo(i)}
                  className={`cf-dot ${i === testiActive ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;