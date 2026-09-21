import React, { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Calendar,
  Phone,
  Clock,
  MapPin,
  Star,
  Wrench,
  Shield,
  ArrowRight,
  Users,
  Award,
} from "lucide-react";
import { SERVICE_CATEGORIES } from "../constants";

/* ─── Styles ──────────────────────────────────────────────────────────── */
const SD_STYLES = `
    @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeLeft { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
    @keyframes fadeRight{ from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }
    @keyframes popIn    { from{opacity:0;transform:scale(.85)} to{opacity:1;transform:scale(1)} }
    @keyframes shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes ping     { 75%,100%{transform:scale(2);opacity:0} }

    .sd-up    { animation: fadeUp   .65s cubic-bezier(.22,1,.36,1) both; }
    .sd-left  { animation: fadeLeft .65s cubic-bezier(.22,1,.36,1) both; }
    .sd-right { animation: fadeRight .65s cubic-bezier(.22,1,.36,1) both; }
    .sd-pop   { animation: popIn    .55s cubic-bezier(.34,1.56,.64,1) both; }

    .sd-d1{animation-delay:.08s} .sd-d2{animation-delay:.16s}
    .sd-d3{animation-delay:.24s} .sd-d4{animation-delay:.32s}
    .sd-d5{animation-delay:.40s} .sd-d6{animation-delay:.48s}

    .sd-card {
      transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s ease;
    }
    .sd-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 14px 32px -8px rgba(37,99,235,.16);
    }

    .shimmer-btn { position:relative; overflow:hidden; }
    .shimmer-btn::after {
      content:''; position:absolute; top:0; left:0;
      width:55%; height:100%;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);
      animation: shimmer 2.4s ease-in-out infinite;
    }

    .gallery-img { transition: transform .6s cubic-bezier(.22,1,.36,1); }
    .gallery-card:hover .gallery-img { transform: scale(1.08); }
    .gallery-overlay {
      opacity:0; transition: opacity .3s ease;
      background: linear-gradient(to top, rgba(0,0,0,.8) 0%, transparent 60%);
    }
    .gallery-card:hover .gallery-overlay { opacity:1; }

    .step-connector {
      position:absolute; top:28px; left:calc(50% + 28px);
      right:0; height:2px;
      background: linear-gradient(90deg,#2563eb,#bfdbfe);
      border-radius:99px;
    }

    .ping-dot { animation: ping 1.4s cubic-bezier(0,0,.2,1) infinite; }

    .sub-chip {
      transition: background .2s, border-color .2s, transform .2s;
    }
    .sub-chip:hover {
      background: #eff6ff;
      border-color: #93c5fd;
      transform: translateX(3px);
    }
    .dark .sub-chip:hover { background: rgba(37,99,235,.15); }

    .related-card { transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s ease; }
    .related-card:hover { transform: translateY(-5px); box-shadow: 0 16px 32px -8px rgba(37,99,235,.18); }
    .related-card img { transition: transform .6s cubic-bezier(.22,1,.36,1); }
    .related-card:hover img { transform: scale(1.07); }

    /* Smartwatch / tiny screens */
    @media (max-width: 240px) {
      .hero-content { padding: 6px !important; margin-top: 8px !important; }
      .hero-title   { font-size: 1.1rem !important; line-height: 1.2 !important; }
      .hero-desc    { font-size: 0.65rem !important; }
      .hero-back    { font-size: 0.6rem !important; }
      .stats-strip  { grid-template-columns: 1fr 1fr !important; gap: 0 !important; }
      .stat-item    { padding: 4px 6px !important; gap: 4px !important; }
      .stat-icon    { width: 24px !important; height: 24px !important; }
      .stat-value   { font-size: 0.65rem !important; }
      .stat-label   { font-size: 0.5rem !important; }
      .gallery-card { aspect-ratio: 1/1 !important; }
      .sidebar-sticky { position: static !important; }
    }

    /* Mobile portrait safety */
    @media (max-width: 480px) {
      .hero-title { word-break: break-word; }
      .sd-card:hover { transform: none; }
      .sub-chip:hover { transform: none; }
    }

    /* Tablet portrait: stats go 2x2, sidebar stacks below */
    @media (max-width: 768px) {
      .sidebar-sticky { position: static !important; }
    }
  `;

/* ─── Scroll-trigger hook ─────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── New section data ────────────────────────────────────────────────── */
const QUICK_STATS = [
  { icon: Users, value: "All Brands", label: "Cars Accepted" },
  { icon: Shield, value: "6 Months", label: "Service Warranty" },
  { icon: Award, value: "Free", label: "Pickup & Drop" },
  { icon: Star, value: "5★ Rated", label: "Customer Approval" },
];

const PROCESS_STEPS = [
  {
    icon: Phone,
    title: "Book Appointment",
    desc: "Call us or walk in anytime — Mon to Sun, 8 AM to 10 PM.",
  },
  {
    icon: CheckCircle,
    title: "Free Inspection",
    desc: "Our experts inspect your vehicle and share a full diagnosis report.",
  },
  {
    icon: Wrench,
    title: "Expert Service",
    desc: "We use genuine parts and certified techniques for your car brand.",
  },
  {
    icon: Award,
    title: "Quality Handover",
    desc: "Drive away with a service record and our satisfaction guarantee.",
  },
];

const WHY_LIST = [
  "Certified mechanics for every car brand",
  "6-month warranty on all services",
  "Free doorstep pickup & drop",
  "Only genuine OEM-grade parts used",
  "Transparent pricing — no hidden fees",
  "Real-time service status updates",
];

/* ─────────────────────────────────────────────────────────────────────
    COMPONENT — original logic untouched
  ───────────────────────────────────────────────────────────────────── */
const ServiceDetails: React.FC = () => {
  /* ── ORIGINAL LOGIC — UNTOUCHED ────────────────────────────────── */
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = SERVICE_CATEGORIES.find((s) => s.id === id);

  useEffect(() => {
    if (!service) {
      navigate("/services");
    }
  }, [service, navigate]);

  if (!service) return null;
  /* ─────────────────────────────────────────────────────────────── */

  const relatedServices = SERVICE_CATEGORIES.filter((s) => s.id !== id).slice(0, 3);

  const overviewRef = useInView(0.1);
  const includedRef = useInView(0.1);
  const processRef  = useInView(0.1);
  const galleryRef  = useInView(0.1);
  const relatedRef  = useInView(0.08);
  const ctaRef      = useInView(0.15);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <style>{SD_STYLES}</style>

      {/* ════════════════════════════════════════════════════════════════
            PARALLAX HERO
        ════════════════════════════════════════════════════════════════ */}
     {/* 🔧 CHANGE — full-viewport hero, no gradient overlays.
            Text uses shadow instead of a wash to stay legible on any image. */}
      
 <div
  className="relative flex items-start justify-center overflow-hidden
             h-[60vh] min-h-[380px] max-h-[560px]
             sm:h-[70vh] sm:min-h-[480px] sm:max-h-[720px]
             lg:h-screen lg:max-h-none"
>
  {/* Background image — proper img element so mobile browsers handle it correctly */}
  <img
  fetchpriority="high" src={service.image}
  alt={service.title}
  aria-hidden="true"
  loading="eager"
  className="absolute inset-0 w-full h-full object-cover object-[75%_center] sm:object-[65%_center] md:object-cover md:object-[center_30%] lg:object-center"
/>

  {/* Dark gradient overlay for text readability */}
  <div
    aria-hidden="true"
    className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 sm:from-black/60 sm:via-black/25 sm:to-black/60 lg:bg-gradient-to-r lg:from-black/60 lg:via-black/20 lg:to-transparent"
  />

        {/* Hero content */}
    <div
  className="hero-content relative z-10 w-full self-start
             px-4 pt-20
             sm:px-6 sm:pt-24 sm:mt-4
             md:px-8 md:pt-10 md:mt-12
             lg:px-12 lg:mt-16
             xl:px-16 xl:mt-20
             2xl:px-20"
>
          {/* Back link */}
        <Link
  to="/services"
  className="hero-back inline-flex items-center mb-3 transition-colors font-semibold sd-up sd-d1
             text-xs gap-1
             sm:text-sm sm:gap-1.5 sm:mb-4"
  style={{
    color: '#ffffff',
    textShadow: '0 1px 3px rgba(0,0,0,0.9)',
  }}
  onMouseEnter={(e) => (e.currentTarget.style.color = '#93c5fd')}
  onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
>
            <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
            Back to Services
          </Link>

          {/* Title */}
          <h1
            className="hero-title sd-up sd-d2 font-extrabold text-white tracking-tight leading-tight mb-2
                       text-2xl
                       xs:text-3xl
                       sm:text-4xl sm:mb-3
                       md:text-5xl
                       lg:text-6xl
                       xl:text-7xl"
          >
            {service.title}
          </h1>

          {/* Description */}
     <p
  className="hero-desc sd-up sd-d3 text-white leading-snug font-medium
             text-sm max-w-full
             sm:text-sm sm:max-w-md
             md:text-base md:max-w-lg
             lg:text-lg lg:max-w-2xl
             xl:text-xl"
  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,1)' }}
>
            {service.description}
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
            QUICK STATS STRIP
        ════════════════════════════════════════════════════════════════ */}
      <div className="bg-blue-600 shadow-lg shadow-blue-700/30">
        <div
          className="stats-strip max-w-7xl mx-auto
                     px-2 py-2 grid grid-cols-2 divide-x divide-blue-500
                     sm:px-4 sm:py-3 sm:grid-cols-4
                     md:px-6 md:py-4
                     lg:px-8"
        >
          {QUICK_STATS.map(({ icon: Icon, value, label }, i) => (
            <div
              key={label}
              className={`stat-item flex items-center justify-center
                          gap-1.5 px-2 py-1.5
                          sm:gap-2 sm:px-3 sm:py-2
                          md:gap-3 md:px-4 md:py-2
                          sd-pop sd-d${i + 1}`}
            >
              <div
                className="stat-icon bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0
                            w-7 h-7
                            sm:w-8 sm:h-8 sm:rounded-xl
                            md:w-9 md:h-9"
              >
                <Icon size={14} className="text-white sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
              </div>
              <div className="min-w-0">
                <p
                  className="stat-value font-extrabold text-white leading-none truncate
                             text-xs
                             sm:text-sm
                             md:text-base"
                >
                  {value}
                </p>
                <p
                  className="stat-label text-blue-100 font-medium uppercase tracking-wide mt-0.5 truncate
                             text-[0.5rem]
                             sm:text-[0.6rem]
                             md:text-[0.65rem]"
                >
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
            MAIN CONTENT GRID
        ════════════════════════════════════════════════════════════════ */}
      <div
        className="max-w-7xl mx-auto
                   px-3 py-6
                   sm:px-4 sm:py-8
                   md:px-6 md:py-10
                   lg:px-8 lg:py-14"
      >
        <div
          className="grid grid-cols-1 gap-8
                     lg:grid-cols-3 lg:gap-10
                     xl:gap-14"
        >
          {/* ── MAIN COLUMN ───────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-10 sm:space-y-12 lg:space-y-14">

            {/* Service Overview */}
            <div ref={overviewRef.ref}>
              <div className={`${overviewRef.visible ? "sd-up" : "opacity-0"}`}>
                <p className="text-[0.6rem] sm:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1.5 sm:mb-2">
                  About This Service
                </p>
                <h2
                  className="font-extrabold text-gray-900 dark:text-white mb-3 sm:mb-4
                             text-xl sm:text-2xl md:text-3xl"
                >
                  Service Overview
                </h2>
                <div className="w-8 sm:w-10 h-1 bg-blue-600 rounded-full mb-4 sm:mb-6" />
              </div>

              <div
                className={`grid grid-cols-1 gap-4
                            md:grid-cols-5 md:gap-6 md:items-start
                            ${overviewRef.visible ? "sd-up sd-d1" : "opacity-0"}`}
              >
                {/* Text block */}
                <div className="md:col-span-3">
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-3 sm:mb-4">
                    Our {service.title} service is designed to keep your vehicle
                    running at its best. We use state-of-the-art diagnostic
                    equipment and genuine parts to ensure high-quality repairs
                    and maintenance. Whether you drive a hatchback, sedan, or
                    SUV, our expert technicians treat every car with the utmost
                    care.
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    Every service includes a thorough pre and post inspection,
                    ensuring complete transparency. Our technicians document
                    every step so you always know exactly what was done to your
                    vehicle.
                  </p>
                </div>

                {/* Side info card */}
                <div className="md:col-span-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-4 sm:p-5 space-y-2.5 sm:space-y-3">
                  {[
                    { icon: Clock,  label: "Typical Duration", value: "2–4 Hours"    },
                    { icon: Shield, label: "Warranty",         value: "6 Months"     },
                    { icon: Star,   label: "Customer Rating",  value: "4.9 / 5.0"   },
                    { icon: MapPin, label: "Service At",       value: "Our Workshop" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={13} className="text-blue-600 dark:text-blue-400 sm:w-[15px] sm:h-[15px]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[0.55rem] sm:text-[0.6rem] font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-wider">
                          {label}
                        </p>
                        <p className="text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-100 truncate">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div ref={includedRef.ref}>
              <div className={`${includedRef.visible ? "sd-up" : "opacity-0"}`}>
                <p className="text-[0.6rem] sm:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1.5 sm:mb-2">
                  Everything Covered
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  What's Included
                </h3>
                <div className="w-8 sm:w-10 h-1 bg-blue-600 rounded-full mb-4 sm:mb-6" />
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                {service.subServices.map((sub, idx) => (
                  <div
                    key={idx}
                    className={`sub-chip flex items-center gap-2 sm:gap-3
                                p-3 sm:p-4
                                bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 cursor-default
                                ${includedRef.visible ? `sd-up sd-d${Math.min(idx + 1, 6)}` : "opacity-0"}`}
                  >
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                      <CheckCircle size={14} className="text-blue-600 dark:text-blue-400 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                      {sub.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* How We Do It */}
            <div ref={processRef.ref}>
              <div className={`${processRef.visible ? "sd-up" : "opacity-0"}`}>
                <p className="text-[0.6rem] sm:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1.5 sm:mb-2">
                  Simple & Transparent
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  How We Do It
                </h3>
                <div className="w-8 sm:w-10 h-1 bg-blue-600 rounded-full mb-6 sm:mb-8" />
              </div>

              <div
                className="grid gap-3 sm:gap-4 relative
                           grid-cols-2
                           sm:grid-cols-2
                           lg:grid-cols-4"
              >
                {PROCESS_STEPS.map(({ icon: Icon, title, desc }, i) => (
                  <div
                    key={title}
                    className={`relative ${processRef.visible ? `sd-up sd-d${i + 1}` : "opacity-0"}`}
                  >
                    {i < PROCESS_STEPS.length - 1 && (
                      <div className="step-connector hidden lg:block" />
                    )}
                    <div className="sd-card bg-white dark:bg-gray-800 rounded-2xl p-3 sm:p-5 border border-gray-100 dark:border-gray-700 text-center relative z-10 h-full">
                      <div className="relative inline-flex mb-2 sm:mb-3">
                        <div className="w-9 h-9 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/25">
                          <Icon size={16} className="text-white sm:w-[22px] sm:h-[22px]" />
                        </div>
                        <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[9px] sm:text-[10px] font-extrabold rounded-full flex items-center justify-center">
                          {i + 1}
                        </span>
                      </div>
                      <h4 className="text-[0.65rem] sm:text-sm font-bold text-gray-900 dark:text-white mb-1 sm:mb-1.5 leading-tight">
                        {title}
                      </h4>
                      <p className="text-[0.6rem] sm:text-xs text-gray-500 dark:text-gray-400 leading-relaxed hidden xs:block">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Gallery */}
            <div ref={galleryRef.ref}>
              <div className={`${galleryRef.visible ? "sd-up" : "opacity-0"}`}>
                <p className="text-[0.6rem] sm:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1.5 sm:mb-2">
                  See Our Work
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Work Gallery
                </h3>
                <div className="w-8 sm:w-10 h-1 bg-blue-600 rounded-full mb-4 sm:mb-6" />
              </div>

              <div
                className="grid gap-3
                           grid-cols-1
                           xs:grid-cols-2
                           sm:gap-4
                           md:gap-5"
              >
                {service.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className={`gallery-card group relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer bg-gray-100 dark:bg-gray-800 ${galleryRef.visible ? `sd-up sd-d${Math.min(idx + 1, 6)}` : "opacity-0"}`}
                    // style={{ aspectRatio: "4/3" }}
                  >
                    <img loading="lazy"
                      src={img.url}
                      alt={img.title}
                      className="gallery-img w-full h-full object-cover object-center"
                    />
                    <div className="gallery-overlay absolute inset-0 flex items-end p-3 sm:p-5">
                      <div>
                        <span className="text-white font-bold text-sm sm:text-base block leading-tight">
                          {img.title}
                        </span>
                        <span className="text-blue-300 text-[0.6rem] sm:text-xs font-medium">
                          {service.title}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-blue-600 text-white text-[0.55rem] sm:text-[0.6rem] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 uppercase tracking-wider">
                      Surya Motors
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ───────────────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="sidebar-sticky sticky top-20 space-y-4 sm:space-y-5">

              {/* Book Service card */}
              <div className="sd-card bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div
                  className="h-16 sm:h-20 md:h-24 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-gray-900/50" />
                  <div className="absolute inset-0 flex flex-col justify-center px-3 sm:px-5">
                    <p className="text-white font-extrabold text-base sm:text-lg leading-tight">
                      Book This Service
                    </p>
                    <p className="text-blue-200 text-[0.6rem] sm:text-xs">
                      Fast · Reliable · Guaranteed
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4 sm:mb-5 leading-relaxed">
                    Ready to give your car the care it deserves? Schedule an
                    appointment today.
                  </p>

                  <Link
                    to="/contact"
                    className="shimmer-btn w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors mb-3
                               py-3 px-4 text-xs
                               sm:py-3.5 sm:px-6 sm:text-sm"
                  >
                    <Calendar className="inline-block mr-1.5 sm:mr-2 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Book Appointment
                  </Link>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-2.5 sm:p-3 text-center">
                    <p className="text-[0.6rem] sm:text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Or call us directly
                    </p>
                    <a
                      href="tel:+919948153518"
                      className="text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm hover:underline block"
                    >
                      +91 9948153518
                    </a>
                    <a
                      href="tel:+919291470852"
                      className="text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm hover:underline block mt-0.5"
                    >
                      +91 9291470852
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="sd-card bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                    <Clock size={14} className="text-blue-600 dark:text-blue-400 sm:w-4 sm:h-4" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">
                    Working Hours
                  </h4>
                </div>
                <ul className="space-y-2">
                  {[{ day: "Monday – Sunday", hours: "8:00 AM – 10:00 PM" }].map(
                    ({ day, hours }) => (
                      <li
                        key={day}
                        className="flex items-center justify-between py-1.5 border-b border-gray-100 dark:border-gray-700 last:border-0 gap-2"
                      >
                        <span className="text-[0.6rem] sm:text-xs text-gray-600 dark:text-gray-400 font-medium">
                          {day}
                        </span>
                        <span className="text-[0.6rem] sm:text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap">
                          {hours}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
                <div className="mt-2.5 sm:mt-3 flex items-center gap-2">
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="ping-dot absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                  </span>
                  <span className="text-[0.6rem] sm:text-xs text-green-600 dark:text-green-400 font-semibold">
                    Open Now — Walk-ins Welcome
                  </span>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="sd-card bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30 p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                    <Shield size={14} className="text-blue-600 dark:text-blue-400 sm:w-4 sm:h-4" />
                  </div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-200 text-xs sm:text-sm">
                    Why Choose Us?
                  </h4>
                </div>
                <ul className="space-y-2 sm:space-y-2.5">
                  {WHY_LIST.map((item) => (
                    <li key={item} className="flex items-start gap-2 sm:gap-2.5">
                      <CheckCircle size={12} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5 sm:w-[14px] sm:h-[14px]" />
                      <span className="text-[0.6rem] sm:text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location card */}
              <a
                href="https://maps.app.goo.gl/NSFCanSrBzAHhEvAA"
                target="_blank"
                rel="noreferrer"
                className="sd-card flex items-center gap-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-3 sm:p-4 hover:border-blue-300 dark:hover:border-blue-600 group transition-colors duration-200 w-full text-left"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors duration-200">
                  <MapPin size={16} className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors sm:w-[18px] sm:h-[18px]" />
                </div>
                <div>
                  <p className="text-[0.6rem] sm:text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                    Our Workshop
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Get Directions →
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
            RELATED SERVICES
        ════════════════════════════════════════════════════════════════ */}
      {relatedServices.length > 0 && (
        <section className="bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300
                            py-10 sm:py-12 md:py-16">
          <div
            ref={relatedRef.ref}
            className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8"
          >
            <div
              className={`flex items-end justify-between mb-6 sm:mb-8 md:mb-10 ${relatedRef.visible ? "sd-up" : "opacity-0"}`}
            >
              <div>
                <p className="text-[0.6rem] sm:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
                  Explore More
                </p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                  Related Services
                </h2>
              </div>
              <Link
                to="/services"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                View All <ArrowRight size={14} className="sm:w-[15px] sm:h-[15px]" />
              </Link>
            </div>

            <div
              className="grid gap-3 sm:gap-4 md:gap-5
                         grid-cols-1
                         xs:grid-cols-2
                         sm:grid-cols-2
                         lg:grid-cols-3"
            >
              {relatedServices.map((s, i) => (
                <Link
                  key={s.id}
                  to={`/services/${s.id}`}
                  className={`related-card group block bg-gray-50 dark:bg-gray-700/50 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 ${relatedRef.visible ? `sd-up sd-d${i + 1}` : "opacity-0"}`}
                >
                  <div className="relative overflow-hidden h-32 sm:h-36 md:h-44">
                    <img loading="lazy" src={s.image} alt={s.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                    <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                      <span className="text-white font-bold text-xs sm:text-sm">{s.title}</span>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 flex items-center justify-between">
                    <p className="text-[0.6rem] sm:text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 flex-1 pr-2 sm:pr-3">
                      {s.description}
                    </p>
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-200">
                      <ArrowRight size={12} className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors sm:w-[14px] sm:h-[14px]" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div
              className={`text-center mt-6 sm:hidden ${relatedRef.visible ? "sd-up sd-d4" : "opacity-0"}`}
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400"
              >
                View All Services <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ServiceDetails;