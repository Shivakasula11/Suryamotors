import React, { useState, useEffect, useCallback, useRef } from 'react'; // 🔧 CHANGE 1/5 — added useEffect, useCallback, useRef for car showcase carousel
import { CheckCircle, ArrowRight, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'; // 🔧 CHANGE 2/5 — added ArrowLeft for showcase nav
import { COMPANY_NAME, TEAM } from '../constants';
import { Link } from 'react-router-dom';
import Skoda from './assests/Skoda.png';
import Swift from './assests/Swift.png';
import Hycross from './assests/Hycross.png';
import Harrier from './assests/Harrier.png';

import MarutiSuzukiLogo from './assests/Brands/Suziki.png';
import Tata from './assests/Brands/Tata.png';
import Mahindra from './assests/Brands/Mahi.png';
import Honda from './assests/Brands/Honda.png';
import Toyota from './assests/Brands/Toyota.png';
import Kia from './assests/Brands/Kia.png';
import SkodaLogo from './assests/Brands/Skodalogo.png';
import Volkswagen from './assests/Brands/Volkswagen.png';
import Nissan from './assests/Brands/Nissan.png';
import Hyundai from './assests/Brands/Hyundai.png';
import Ford from './assests/Brands/Ford.png';
import MG from './assests/Brands/Mg.png';
import Renault from './assests/Brands/Renault.png';
import Jeep from './assests/Brands/Jeep.png';


const BRANDS = [
  { name: 'Maruti Suzuki', color: '#dc2626', bg: '#fef2f2', logo: MarutiSuzukiLogo },
  { name: 'Hyundai',       color: '#1d4ed8', bg: '#eff6ff', logo: Hyundai },
  { name: 'Tata',          color: '#4338ca', bg: '#eef2ff', logo: Tata },
  { name: 'Mahindra',      color: '#b91c1c', bg: '#fef2f2', logo: Mahindra },
  { name: 'Honda',         color: '#dc2626', bg: '#fee2e2', logo: Honda },
  { name: 'Toyota',        color: '#be123c', bg: '#fff1f2', logo: Toyota },
  { name: 'Kia',           color: '#1f2937', bg: '#f3f4f6', logo: Kia },
  { name: 'MG Motor',      color: '#e11d48', bg: '#fef2f2', logo: MG },
  { name: 'Ford',          color: '#1e40af', bg: '#dbeafe', logo: Ford },
  { name: 'Skoda',         color: '#047857', bg: '#d1fae5', logo: SkodaLogo },
  { name: 'Volkswagen',    color: '#1e3a8a', bg: '#dbeafe', logo: Volkswagen },
  { name: 'Renault',       color: '#ca8a04', bg: '#fef3c7', logo: Renault },
  { name: 'Nissan',        color: '#0f172a', bg: '#f1f5f9', logo: Nissan },
  { name: 'Jeep',          color: '#365314', bg: '#ecfccb', logo: Jeep },
];

// 🔧 CHANGE 3/5 — Car showcase carousel data.
const CAR_SHOWCASE = [
  { src: Skoda,   bg: '#1E3358', ghost: 'SEDAN',     tagline: 'Premium Sedan Care',    label: 'Skoda Sedan Service' },
  { src: Swift,   bg: '#0F172A', ghost: 'HATCHBACK', tagline: 'Hatchback Specialists', label: 'Swift Hatchback Service' },
  { src: Harrier, bg: '#0C4A6E', ghost: 'SUV',       tagline: 'SUV Expertise',         label: 'Harrier SUV Service' },
  { src: Hycross, bg: '#334155', ghost: 'MPV',       tagline: 'Family Vehicle Care',   label: 'Hycross MPV Service' },
];

const SHOWCASE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
  .cs-root { font-family: 'Inter', sans-serif; transition: background-color 650ms cubic-bezier(0.4,0,0.2,1); }
  .cs-shell { height: 100vh; min-height: 520px; overflow: hidden; }

/* Mobile: shorter shell so content isn't spaced apart */
@media (max-width: 640px) {
  .cs-shell { height: auto; min-height: 440px; max-height: 520px; padding-top: 16px; padding-bottom: 16px; }
}
  .cs-ghost { font-family: 'Anton', sans-serif; font-weight: 900; color: #fff; line-height: 1; text-transform: uppercase; letter-spacing: -0.02em; white-space: nowrap; font-size: clamp(60px, 15vw, 200px); opacity: 0.9; }
  .cs-brand-label { font-size: 12px; letter-spacing: 0.18em; }
  .cs-body-text { max-width: 340px; }
  .cs-body-desc { font-size: 13px; line-height: 1.6; opacity: 0.85; }
  .cs-tagline { font-size: 22px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; opacity: 0.95; }
  .cs-discover { font-family: 'Anton', sans-serif; font-weight: 400; color: #fff; letter-spacing: -0.02em; line-height: 1; text-transform: uppercase; text-decoration: none; font-size: clamp(18px, 3.5vw, 48px); opacity: 0.95; transition: opacity 200ms; }
  .cs-discover:hover { opacity: 1; }
  .cs-item { position: absolute; aspect-ratio: 16 / 10; transition: transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1), width 650ms cubic-bezier(0.4,0,0.2,1); will-change: transform, filter, opacity; }
  
    // //.cs-item img { width: 100%; height: 100%; object-fit: contain; object-position: center; user-select: none; -webkit-user-drag: none; display: block; filter: drop-shadow(0 30px 25px rgba(0,0,0,0.45)) drop-shadow(0 12px 12px rgba(0,0,0,0.3)); }

    .cs-item img { width: 100%; height: 100%; object-fit: contain; object-position: center bottom; user-select: none; -webkit-user-drag: none; display: block; background: transparent; filter: drop-shadow(0 25px 20px rgba(0,0,0,0.4)); }
  .cs-nav-btn { transition: transform 150ms, background-color 150ms; }
  .cs-nav-btn:hover { transform: scale(1.08); background-color: rgba(255,255,255,0.12); }
  .cs-grain { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E"); background-size: 200px 200px; opacity: 0.4; }

  @media (max-width: 300px) {
    .cs-shell { min-height: 420px; }
    .cs-ghost { font-size: 42px; }
    .cs-brand-label { font-size: 9px; letter-spacing: 0.1em; }
    .cs-tagline { font-size: 12px; }
    .cs-body-desc { display: none; }
    .cs-discover { font-size: 14px; }
    .cs-nav-btn-inner { width: 36px !important; height: 36px !important; }
  }
  @media (min-width: 301px) and (max-width: 480px) {
    .cs-ghost { font-size: clamp(56px, 15vw, 90px); }
    .cs-tagline { font-size: 15px; }
    .cs-discover { font-size: 18px; }
  }
  @media (min-width: 481px) and (max-width: 768px) {
      .cs-ghost { font-size: clamp(80px, 12vw, 130px); }
  }
  @media (min-width: 1536px) {
    .cs-ghost { font-size: clamp(160px, 12vw, 220px); }
  }
`;

// 🔧 Team coverflow styles — uses Inter (already loaded in index.html), no external font import.
const TEAM_STYLES = `
  .tc-title { font-family: 'Inter', sans-serif; font-weight: 800; letter-spacing: -0.03em; line-height: 1.05; }
  .tc-name  { font-family: 'Inter', sans-serif; font-weight: 700; letter-spacing: -0.02em; }
  .tc-stage { position: relative; height: 400px; }
  @media (min-width: 640px) { .tc-stage { height: 420px; } }
  @media (min-width: 1024px) { .tc-stage { height: 420px; } }
  .tc-card {
    position: absolute; top: 50%; left: 50%;
    border-radius: 24px; overflow: hidden;
    box-shadow: 0 20px 50px -12px rgba(0,0,0,0.25);
    transition: transform 650ms cubic-bezier(0.4,0,0.2,1),
                opacity   650ms cubic-bezier(0.4,0,0.2,1),
                filter    650ms cubic-bezier(0.4,0,0.2,1);
    will-change: transform, opacity, filter;
  }
  .tc-card img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; user-select: none; -webkit-user-drag: none; }
  .tc-nav {
    width: 48px; height: 48px; border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    background: #ffffff; color: #111827;
    box-shadow: 0 6px 20px -4px rgba(0,0,0,0.2);
    transition: transform 200ms, box-shadow 200ms;
  }
  .tc-nav:hover:not(:disabled) { transform: scale(1.08); box-shadow: 0 10px 24px -4px rgba(0,0,0,0.25); }
  .tc-nav:disabled { opacity: 0.3; cursor: not-allowed; }
    .tc-nav-side { position: absolute; top: 50%; transform: translateY(-50%); z-index: 50; }
  .tc-nav-side:hover:not(:disabled) { transform: translateY(-50%) scale(1.08); }
  .tc-nav-left  { left: 8px; }
  .tc-nav-right { right: 8px; }
  @media (min-width: 640px) { .tc-nav-left { left: 24px; } .tc-nav-right { right: 24px; } }
  @media (min-width: 1024px) { .tc-nav-left { left: 48px; } .tc-nav-right { right: 48px; } }
  .dark .tc-nav { background: #1f2937; color: #f9fafb; }
`;

const About: React.FC = () => {
  const [teamIndex, setTeamIndex] = useState(0);
  const VISIBLE = 3;
  const maxIndex = Math.max(0, TEAM.length - VISIBLE);

  // Loop forever — wrap around at both ends so the arrows never disable.
  const prevTeam = () => setTeamIndex(i => (i - 1 + TEAM.length) % TEAM.length);
  const nextTeam = () => setTeamIndex(i => (i + 1) % TEAM.length);

  // 🔧 CHANGE 4/5 — Car showcase carousel state (independent of team carousel).
  const [carIndex, setCarIndex] = useState(0);
  const [isCarAnimating, setIsCarAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 640 : false);
  const animLockRef = useRef<number | null>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    CAR_SHOWCASE.forEach(c => { const img = new Image(); img.src = c.src; });
  }, []);

  const navigateCar = useCallback((dir: 'next' | 'prev') => {
    if (isCarAnimating) return;
    setIsCarAnimating(true);
    setCarIndex(prev => dir === 'next' ? (prev + 1) % CAR_SHOWCASE.length : (prev + CAR_SHOWCASE.length - 1) % CAR_SHOWCASE.length);
    if (animLockRef.current) window.clearTimeout(animLockRef.current);
    animLockRef.current = window.setTimeout(() => setIsCarAnimating(false), 650);
  }, [isCarAnimating]);

  useEffect(() => () => { if (animLockRef.current) window.clearTimeout(animLockRef.current); }, []);

  const carCenter = carIndex;
  const carLeft   = (carIndex + CAR_SHOWCASE.length - 1) % CAR_SHOWCASE.length;
  const carRight  = (carIndex + 1) % CAR_SHOWCASE.length;

  const getCarItemStyle = (i: number): React.CSSProperties => {
    if (i === carCenter) {
        return { left: '50%', bottom: isMobile ? '30%' : '14%', width: isMobile ? '70%' : '52%', transform: 'translateX(-50%)', filter: 'blur(0px)', opacity: 1, zIndex: 20 };

    }
   if (i === carLeft) {
  return { left: isMobile ? '18%' : '15%', bottom: isMobile ? '40%' : '26%', width: isMobile ? '20%' : '20%', transform: 'translateX(-50%)', filter: 'blur(3px)', opacity: 0.7, zIndex: 10 };
}
if (i === carRight) {
  return { left: isMobile ? '82%' : '85%', bottom: isMobile ? '40%' : '26%', width: isMobile ? '20%' : '20%', transform: 'translateX(-50%)', filter: 'blur(3px)', opacity: 0.7, zIndex: 10 };
}
    // back
        return { left: '50%', bottom: isMobile ? '45%' : '34%', width: isMobile ? '14%' : '14%', transform: 'translateX(-50%)', filter: 'blur(5px)', opacity: 0.5, zIndex: 5 };

  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">

      <style>{SHOWCASE_STYLES}</style>
      <section
        className="cs-root relative w-full overflow-hidden"
        style={{ backgroundColor: CAR_SHOWCASE[carIndex].bg }}
      >
        <div className="cs-shell relative w-full">

          {/* Grain overlay */}
          <div className="cs-grain absolute inset-0 pointer-events-none" style={{ zIndex: 50 }} />

          {/* Giant ghost text */}
          <div
  className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
  style={{ zIndex: 2, top: isMobile ? '8%' : '18%' }}
>
  <div className="cs-ghost px-4">{CAR_SHOWCASE[carIndex].ghost}</div>
</div>

          {/* Carousel */}
          <div className="absolute inset-0" style={{ zIndex: 3 }}>
            {CAR_SHOWCASE.map((car, i) => (
              <div key={i} className="cs-item" style={getCarItemStyle(i)}>
                <img loading="eager" fetchpriority="high" src={car.src} alt={car.label} draggable={false} />
              </div>
            ))}
          </div>

          {/* Bottom-left text + nav buttons */}
          <div
            className="cs-body-text absolute bottom-6 left-4 sm:bottom-10 sm:left-10 lg:bottom-20 lg:left-24 text-white"

            style={{ zIndex: 60 }}
          >
            <p className="cs-tagline mb-2 sm:mb-3">
              {CAR_SHOWCASE[carIndex].tagline}
            </p>
            <p className="cs-body-desc hidden sm:block mb-4 sm:mb-5">
              Professional service across every major brand — certified technicians, genuine parts,
              guaranteed workmanship. Every car deserves expert care, and we deliver it.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => navigateCar('prev')}
                aria-label="Previous car"
                className="cs-nav-btn cs-nav-btn-inner w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 flex items-center justify-center rounded-full"
                style={{ background: 'transparent', border: '2px solid #fff', color: '#fff' }}
              >
                <ArrowLeft size={22} strokeWidth={2.25} />
              </button>
              <button
                type="button"
                onClick={() => navigateCar('next')}
                aria-label="Next car"
                className="cs-nav-btn cs-nav-btn-inner w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 flex items-center justify-center rounded-full"
                style={{ background: 'transparent', border: '2px solid #fff', color: '#fff' }}
              >
                <ArrowRight size={22} strokeWidth={2.25} />
              </button>
            </div>
          </div>

          {/* Bottom-right link */}
          <Link
            to="/services"
            className="cs-discover absolute bottom-3 right-3 sm:bottom-10 sm:right-8 lg:bottom-20 lg:right-10 flex items-center gap-1 sm:gap-2"
            style={{ zIndex: 60 }}
          >
            BOOK SERVICE
            <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" strokeWidth={2.25} />
          </Link>

        </div>
      </section>

      {/* ── Main Content ──────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">

        {/* ── Who We Are ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center mb-14 sm:mb-20 lg:mb-24">
          <div className="order-2 md:order-1">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-blue-500 mb-3">Who We Are</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-snug">
              A Workshop Built on <br />
              <span className="text-blue-500">Trust & Expertise</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 leading-relaxed">
              {COMPANY_NAME} was founded with a single mission: to provide high-quality, transparent, and reliable
              car services to our community. We understand that your car is more than just a vehicle — it's an
              essential part of your daily life.
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              With years of experience in the automotive industry, our certified mechanics and service advisors
              are dedicated to ensuring your vehicle runs smoothly and safely. We use the latest diagnostic tools
              and only genuine parts.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {['Professional Team', 'Transparent Pricing', 'Genuine Parts', 'Timely Service'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                  <CheckCircle className="text-blue-500 shrink-0" size={18} />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative order-1 md:order-2">
            <div className="relative h-[240px] sm:h-[320px] md:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl">
              <img loading="lazy"
                src="https://miro.medium.com/max/1400/1*JktzC9GrA_l4yz0cCy8a5Q.jpeg"
                alt="Mechanic working"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-5 bg-blue-600 text-white rounded-xl px-4 py-3 sm:px-6 sm:py-4 shadow-xl">
              <p className="text-2xl sm:text-3xl font-extrabold">15+</p>
              <p className="text-[10px] sm:text-xs font-medium text-blue-200 uppercase tracking-wide mt-0.5">Years of Experience</p>
            </div>
          </div>
        </div>

        {/* ── Why Choose Us ── */}
        <div className="mb-14 sm:mb-20 lg:mb-24">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-blue-500 mb-3">Our Edge</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Why Choose Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="relative h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-lg">
              <img loading="lazy"
                src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?q=80&w=800&auto=format&fit=crop"
                alt="Workshop"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4 sm:space-y-6">
              {[
                { title: 'Multi-Brand Expertise', desc: 'From Maruti to Mercedes, our technicians are factory-trained across all major brands.' },
                { title: 'State-of-the-Art Equipment', desc: 'We invest in the latest diagnostic and repair technology so your car always gets the best.' },
                { title: 'Doorstep Pickup & Drop', desc: 'Skip the hassle — we pick up and deliver your vehicle at your convenience.' },
                { title: 'Real-Time Service Updates', desc: "Stay informed with live updates so you always know what's happening with your car." },
              ].map((point, i) => (
                <div key={i} className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  <div className="mt-0.5 w-8 h-8 shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <CheckCircle className="text-blue-600 dark:text-blue-400" size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{point.title}</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Core Values ── */}
        <div className="mb-14 sm:mb-20 lg:mb-24">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-blue-500 mb-3">What We Stand For</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: 'Transparency', desc: 'No hidden costs. We explain every repair and cost upfront before we start working on your vehicle.', number: '01' },
              { title: 'Quality', desc: "We never compromise on quality. From the parts we use to our technicians' skills, excellence is our standard.", number: '02' },
              { title: 'Customer First', desc: 'Your satisfaction is our priority. We listen to your concerns and provide solutions that fit your needs and budget.', number: '03' },
            ].map((val) => (
              <div key={val.number} className="relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden sm:col-span-2 md:col-span-1 [&:last-child]:sm:col-span-2 [&:last-child]:md:col-span-1">
                <p className="absolute top-3 right-4 sm:top-4 sm:right-6 text-5xl sm:text-6xl font-extrabold text-gray-300 dark:text-gray-700 select-none">{val.number}</p>
                <div className="w-10 h-1 bg-blue-500 rounded mb-4 sm:mb-5" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">{val.title}</h3>
                <p className="text-sm text-gray-900 dark:text-gray-300 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Team Carousel — Coverflow (jiro-style) ─────────────── */}
        <style>{TEAM_STYLES}</style>
        <div className="mb-4">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 px-4">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-blue-500 mb-3">The People Behind It</p>
            <h2 className="tc-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white">
             Meet Our Expert Team  <br className="hidden sm:block" />
            
            </h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-4 sm:mt-5 max-w-md mx-auto leading-relaxed">
              Every car that comes through our doors is handled by certified professionals who take pride in their craft.
            </p>
          </div>

          {/* Coverflow stage */}
          <div className="tc-stage">
            {TEAM.map((member, i) => {
              const total = TEAM.length;
              let offset = i - teamIndex;
              const half = Math.floor(total / 2);
              if (offset >  half) offset -= total;
              if (offset < -half) offset += total;

              const abs = Math.abs(offset);
              if (abs > 2) return null;

              // Position/scale/opacity per slot. One GAP variable controls spacing.
              const GAP = 310; // ← widen/tighten card spacing here
              const config = {
                0: { x:          0, scale: 1.00, opacity: 1.00, blur: 0, w: 340, h: 380, z: 40 },
                1: { x:        GAP, scale: 0.78, opacity: 0.85, blur: 0, w: 340, h: 380, z: 30 },
                2: { x: GAP * 1.75, scale: 0.55, opacity: 0.55, blur: 1, w: 340, h: 380, z: 20 },
              }[abs]!;

              const sign = offset < 0 ? -1 : 1;
              const translateX = `calc(-50% + ${sign * config.x}px)`;

              return (
                <div
                  key={member.id}
                  className="tc-card"
                  style={{
                    width:  `${config.w}px`,
                    height: `${config.h}px`,
                    transform: `translate(${translateX}, -50%) scale(${config.scale})`,
                    opacity: config.opacity,
                    filter: config.blur ? `blur(${config.blur}px)` : 'none',
                    zIndex: config.z,
                    cursor: offset === 0 ? 'default' : 'pointer',
                  }}
                  onClick={() => {
                    if (offset === 0) return;
                    // No bounds clamping — the wrap logic above the map handles all indices.
                    setTeamIndex(i);
                  }}
                >
                  <img loading="lazy" src={member.image} alt={member.name} draggable={false} />
                </div>
              );
            })}
          </div>

          {/* Center person's name */}
          <div className="text-center mt-3 sm:mt-4 min-h-[60px]">
            <h3 className="tc-name text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
              {TEAM[teamIndex]?.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 tracking-wide">
              {TEAM[teamIndex]?.role} · {TEAM[teamIndex]?.experience}
            </p>
          </div>

         
        </div>

      </div>
      {/* ── /Main Content ─────────────────────────────── */}

      {/* ── CTA Banner ── */}
      <div className="bg-gray-900 dark:bg-black text-white py-12 sm:py-16 lg:py-20 mt-6 sm:mt-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-blue-400 mb-3 sm:mb-4">Get Started</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-5 leading-snug">
            Ready to Give Your Car <br /> the Care It Deserves?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-400 mb-8 sm:mb-10 leading-relaxed">
            Book a service today and experience the {COMPANY_NAME} difference — quality, speed, and trust guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-bold rounded-lg transition-colors">
              Book a Service <ArrowRight size={18} />
            </Link>
            <Link to="/services" className="px-6 sm:px-8 py-3 border-2 border-gray-600 hover:border-white hover:bg-white hover:text-gray-900 text-white text-sm sm:text-base font-bold rounded-lg transition-colors text-center">
              Explore Services
            </Link>
          </div>
        </div>
      </div>

      {/* ── Brands We Service — Marquee ── */}
      <div className="bg-gray-50 dark:bg-gray-900 py-12 sm:py-16 lg:py-20 border-t border-gray-200 dark:border-gray-800 overflow-hidden">
        <style>{`
          @keyframes scrollLTR { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes scrollRTL { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
          .marquee-ltr { animation: scrollLTR 38s linear infinite; }
          .marquee-rtl { animation: scrollRTL 42s linear infinite; }
          .marquee-ltr:hover, .marquee-rtl:hover { animation-play-state: paused; }
          .brand-pill {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            height: 56px;
            padding: 0 22px 0 8px;
            border-radius: 999px;
            background: #ffffff;
            cursor: default;
            user-select: none;
            white-space: nowrap;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
            border: 1px solid rgba(0, 0, 0, 0.08);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          @media (min-width: 640px) {
            .brand-pill { height: 64px; padding: 0 26px 0 10px; gap: 12px; }
          }
          .dark .brand-pill {
            background: #1f2937;
            border-color: rgba(255, 255, 255, 0.08);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          }
          .brand-pill:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
          }
          .brand-logo-wrap {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #ffffff;
            flex-shrink: 0;
            overflow: hidden;
            padding: 4px;
            border: 1px solid rgba(0, 0, 0, 0.06);
          }
          @media (min-width: 640px) {
            .brand-logo-wrap { width: 52px; height: 52px; padding: 5px; }
          }
          .dark .brand-logo-wrap {
            background: #ffffff;
            border-color: rgba(0, 0, 0, 0.06);
          }
          .brand-logo {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            object-fit: contain;
            display: block;
          }
          .brand-label {
            font-size: 14px;
            font-weight: 600;
            color: #111827;
            line-height: 1;
            letter-spacing: -0.01em;
          }
          @media (min-width: 640px) {
            .brand-label { font-size: 15px; }
          }
          .dark .brand-label { color: #f9fafb; }
        `}</style>

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 px-4">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="block w-5 sm:w-7 h-[1px] bg-gray-400 dark:bg-gray-600" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] sm:tracking-[0.2em] uppercase text-gray-500 dark:text-gray-500">
              Trusted Partners
            </span>
            <span className="block w-5 sm:w-7 h-[1px] bg-gray-400 dark:bg-gray-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Every Major Brand. One Expert Team.
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Certified to service{' '}
            <span className="font-semibold text-gray-800 dark:text-gray-200">14+ manufacturers</span>{' '}
            across all segments
          </p>
        </div>

        {/* Marquee Rows */}
        {(
          [
            { items: BRANDS.slice(0, 7),  dir: 'ltr' as const },
            { items: BRANDS.slice(7),     dir: 'rtl' as const },
          ] as { items: typeof BRANDS; dir: 'ltr' | 'rtl' }[]
        ).map(({ items, dir }) => (
          <div key={dir} className="relative mb-3 sm:mb-4 last:mb-0">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 dark:hidden"
              style={{ background: 'linear-gradient(to right, #f9fafb, transparent)' }} />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 dark:hidden"
              style={{ background: 'linear-gradient(to left, #f9fafb, transparent)' }} />
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 hidden dark:block"
              style={{ background: 'linear-gradient(to right, #111827, transparent)' }} />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 hidden dark:block"
              style={{ background: 'linear-gradient(to left, #111827, transparent)' }} />

            <div className={`flex w-max ${dir === 'ltr' ? 'marquee-ltr' : 'marquee-rtl'}`}>
              {[...items, ...items, ...items, ...items].map((brand: any, i) => (
                <div
                  key={i}
                  className="brand-pill mx-1.5 sm:mx-2"
                  title={brand.name}
                >
                  <span className="brand-logo-wrap">
                    <img
                      src={brand.logo}
                      alt=""
                      loading="lazy"
                      className="brand-logo"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </span>
                  <span className="brand-label">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Stats Footer */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mt-10 sm:mt-14 px-4 flex-wrap">
          {[
            { num: '14+',       label: 'Brands' },
            { num: 'All',       label: 'Segments' },
            { num: 'OEM',       label: 'Parts only' },
            { num: 'Certified', label: 'Technicians' },
          ].map((s, i, arr) => (
            <React.Fragment key={s.label}>
              <div className="text-center">
                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">{s.num}</p>
                <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-0.5">
                  {s.label}
                </p>
              </div>
              {i < arr.length - 1 && (
                <div className="w-px h-6 sm:h-8 bg-gray-300 dark:bg-gray-700" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── How It Works ── */}
      <div className="bg-white dark:bg-gray-800 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-blue-500 mb-3">Simple Process</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">How It Works</h2>
          </div>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-[2px] bg-blue-100 dark:bg-blue-900/40 z-0" />
            {[
              { step: '01', title: 'Book Appointment', desc: 'Call us or fill the contact form to schedule your service at a time that suits you.' },
              { step: '02', title: 'Drop or Pickup', desc: 'Drive in or opt for our doorstep pickup — we handle the logistics for you.' },
              { step: '03', title: 'Service & Update', desc: 'Our technicians work on your car and keep you informed at every stage.' },
              { step: '04', title: 'Delivery & Review', desc: 'We deliver your car back to you spotless, with a full service report.' },
            ].map((item) => (
              <div key={item.step} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-gray-900 border-2 border-blue-500 flex items-center justify-center mb-4 sm:mb-5 shadow-md">
                  <span className="text-lg sm:text-xl font-extrabold text-blue-600 dark:text-blue-400">{item.step}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-[200px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;