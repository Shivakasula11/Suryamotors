import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Car,
  Wrench,
  Cog,
  ShieldCheck,
  Star,
  Headphones,
  Award,
  ChevronRight,
  ArrowRight,
  Navigation,
  CheckCircle2,
  X,
  ArrowLeft,
  Compass,
  Maximize2,
  Share2,
  Copy, // 🔧 CHANGE 11/13 — Map redesign icons
} from "lucide-react";
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE } from "../constants";
import Baleno1 from "../pages/assests/Baleno1.png";

/* ═══════════════════════════════════════════════════════════════════════
   🔧 CHANGE 2/10 — Extended STYLES
   Added modal fadeIn+scale, toast slide-in, backdrop fade animations.
   ═══════════════════════════════════════════════════════════════════════ */
const STYLES = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 1; transform: translateX(0);     }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(24px); }
    to   { opacity: 1; transform: translateX(0);    }
  }
  @keyframes pulseDot {
    0%, 100% { transform: scale(1);   opacity: 0.9; }
    50%      { transform: scale(1.4); opacity: 0.4; }
  }
  @keyframes backdropFade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes modalPop {
    from { opacity: 0; transform: translateY(16px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  @keyframes toastSlideDown {
    from { opacity: 0; transform: translate(-50%, -20px); }
    to   { opacity: 1; transform: translate(-50%,   0);    }
  }
  @keyframes toastSlideUp {
    from { opacity: 1; transform: translate(-50%, 0); }
    to   { opacity: 0; transform: translate(-50%, -20px); }
  }
  .anim-fade-up    { animation: fadeInUp    0.55s cubic-bezier(.22,1,.36,1) both; }
  .anim-fade-left  { animation: fadeInLeft  0.55s cubic-bezier(.22,1,.36,1) both; }
  .anim-fade-right { animation: fadeInRight 0.55s cubic-bezier(.22,1,.36,1) both; }
  .anim-backdrop   { animation: backdropFade 0.22s ease-out both; }
  .anim-modal-pop  { animation: modalPop     0.32s cubic-bezier(.22,1,.36,1) both; }
  .anim-toast-in   { animation: toastSlideDown 0.35s cubic-bezier(.22,1,.36,1) both; }
  .anim-toast-out  { animation: toastSlideUp   0.30s ease-in both; }

  .d-100 { animation-delay: 0.10s; }
  .d-200 { animation-delay: 0.20s; }
  .d-300 { animation-delay: 0.30s; }
  .d-400 { animation-delay: 0.40s; }
  .d-500 { animation-delay: 0.50s; }
  .d-600 { animation-delay: 0.60s; }

  .card-lift {
    transition: transform 0.22s cubic-bezier(.22,1,.36,1),
                box-shadow 0.22s ease,
                border-color 0.22s ease;
  }
  .card-lift:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px -10px rgba(30, 58, 95, 0.18);
  }

  .live-dot {
    animation: pulseDot 2s ease-in-out infinite;
  }

  /* Touch target safety */
  @media (pointer: coarse) {
    .touch-safe { min-height: 44px; }
    input, textarea, select { font-size: max(16px, 0.875rem); }
  }

  /* Prevent body scroll when modal open */
  body.modal-open { overflow: hidden; }

  /* ─── 🔧 CHANGE 12/13 — Professional map animations ─── */
  @keyframes mapReveal {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes cardFloatIn {
    from { opacity: 0; transform: translateY(-10px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0)     scale(1);    }
  }
  @keyframes mapShimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }
  @keyframes pinFloat {
    0%, 100% { transform: translateY(0)    scale(1);    }
    50%      { transform: translateY(-4px) scale(1.08); }
  }
  @keyframes coordFade {
    from { opacity: 0; }
    to   { opacity: 0.7; }
  }
  @keyframes ring1 {
    0%   { transform: scale(0.9); opacity: 0.6; }
    100% { transform: scale(2.2); opacity: 0;   }
  }
  .anim-map-reveal { animation: mapReveal    0.6s ease-out both; }
  .anim-card-float { animation: cardFloatIn  0.55s cubic-bezier(.22,1,.36,1) 0.5s both; }
  .anim-pin-float  { animation: pinFloat     3s ease-in-out infinite; }
  .anim-coord-fade { animation: coordFade    0.8s ease-out 0.4s both; }
  .anim-ring-out   { animation: ring1        2s ease-out infinite; }

  .map-skeleton {
    background: linear-gradient(
      100deg,
      rgba(200, 210, 220, 0.15) 20%,
      rgba(200, 210, 220, 0.35) 50%,
      rgba(200, 210, 220, 0.15) 80%
    );
    background-size: 220% 100%;
    animation: mapShimmer 2.2s ease-in-out infinite;
  }
  .map-fade-in {
    animation: mapReveal 0.7s cubic-bezier(.22,1,.36,1) both;
  }
`;

/* ─── Scroll-triggered animation hook (unchanged) ──────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

/* ─── Open-now helper — small utility, computes live status ────────── */
function useOpenStatus() {
  const [status, setStatus] = useState<{ isOpen: boolean; label: string }>({
    isOpen: false,
    label: "",
  });
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hr = now.getHours();
      const isOpen = hr >= 8 && hr < 22;
      setStatus({
        isOpen,
        label: isOpen ? "Open now — closes 10:00 PM" : "Closed — opens 8:00 AM",
      });
    };
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, []);
  return status;
}

/* ─── 🔧 CHANGE 3/10 — Timestamp helper for the WhatsApp message ───── */
function formatTimestamp(): string {
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleString("en-US", { month: "short" });
  const hh = now.getHours();
  const mm = now.getMinutes().toString().padStart(2, "0");
  const ampm = hh >= 12 ? "PM" : "AM";
  const hr12 = ((hh + 11) % 12) + 1;
  return `${day} ${month}, ${hr12}:${mm} ${ampm}`;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  /* ─── 🔧 CHANGE 4/10 — New state for modal + toast ──────────────── */
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [toastState, setToastState] = useState<"hidden" | "in" | "out">(
    "hidden",
  );
  const toastTimerRef = useRef<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ─── 🔧 CHANGE 1/5 — Clean form-style WhatsApp message.
     No emojis (some WhatsApp Desktop builds render them as — boxes).
     Bold labels + line breaks stay, so the message reads like a form. */
  const buildWhatsAppMessage = (): string => {
    const timestamp = formatTimestamp();
    const lines = [
      `*SURYA MOTORS - New Enquiry*`,
      ``,
      `*Name:* ${formData.name}`,
      `*Phone:* ${formData.phone}`,
    ];
    // Skip empty optional fields
    if (formData.email.trim()) {
      lines.push(`*Email:* ${formData.email}`);
    }
    lines.push(`*Message:* ${formData.message}`);
    lines.push(``);
    lines.push(`Sent: ${timestamp}`);
    lines.push(`Website: suryamotors.in`);
    return lines.join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleEditForm = () => {
    setShowConfirmModal(false);
    // formData stays intact so customer can tweak
  };

  const handleConfirmSend = () => {
    /* ── original WhatsApp redirect logic — untouched semantics ── */
    const whatsappMessage = buildWhatsAppMessage();
    const phoneNumber = "916301993194";
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
    /* ──────────────────────────────────────────────────────────── */

    // Close modal, reset form, fire toast
    setShowConfirmModal(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
    triggerToast();
  };

  /* ─── 🔧 CHANGE 7/10 — Toast trigger with auto-dismiss ──────────── */
  const triggerToast = () => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setToastState("in");
    toastTimerRef.current = window.setTimeout(() => {
      setToastState("out");
      toastTimerRef.current = window.setTimeout(() => {
        setToastState("hidden");
      }, 300);
    }, 5000);
  };

  // Lock body scroll while modal is open + Escape-to-close
  useEffect(() => {
    if (showConfirmModal) {
      document.body.classList.add("modal-open");
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setShowConfirmModal(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.classList.remove("modal-open");
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [showConfirmModal]);

  // Cleanup any pending toast timers on unmount
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const status = useOpenStatus();

  /* ─── 🔧 CHANGE 13/13 — Map interactive state + share helpers ─── */
  const [mapLoaded, setMapLoaded] = useState(false);
  /* 🔧 CHANGE 2/5 — added "error" so the button can show "Copy failed" */
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(COMPANY_ADDRESS);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      /* silent — clipboard blocked */
    }
  };

  /* 🔧 CHANGE 3/5 — robust share with visible feedback and legacy clipboard fallback.
     Tries: (1) Web Share API on mobile, (2) modern clipboard API on HTTPS,
     (3) legacy execCommand("copy") on HTTP so it still works in dev/preview. */
  const legacyCopy = (text: string): boolean => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.top = "0";
      ta.style.left = "0";
      ta.style.opacity = "0";
      ta.setAttribute("readonly", "");
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  };

  const showCopyStatus = (status: "copied" | "error") => {
    setCopyStatus(status);
    window.setTimeout(() => setCopyStatus("idle"), 2200);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Surya Motors — Location",
      text: `Visit Surya Motors: ${COMPANY_ADDRESS}`,
      url: "https://maps.app.goo.gl/NSFCanSrBzAHhEvAA",
    };

    // 1) Mobile Web Share API (Android/iOS)
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share(shareData);
        return; // success — native sheet handles feedback
      } catch (err: any) {
        // AbortError = user cancelled the share sheet, not a real failure
        if (err?.name === "AbortError") return;
        // fall through to clipboard fallback
      }
    }

    // 2) Modern clipboard API (HTTPS + localhost)
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      window.isSecureContext
    ) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        showCopyStatus("copied");
        return;
      } catch {
        /* fall through to legacy fallback */
      }
    }

    // 3) Legacy execCommand fallback (works on HTTP too)
    if (legacyCopy(shareData.url)) {
      showCopyStatus("copied");
    } else {
      showCopyStatus("error");
    }
  };

  /* Departments data */
  const departments = [
    {
      icon: Car,
      label: "Sales",
      title: "New & Pre-owned",
      desc: "Explore inventory, book test drives, get on-road quotes.",
      phone: COMPANY_PHONE,
      tone: {
        bg: "bg-blue-50 dark:bg-blue-900/30",
        text: "text-blue-700 dark:text-blue-300",
        ring: "ring-blue-100 dark:ring-blue-800/50",
      },
    },
    {
      icon: Wrench,
      label: "Service",
      title: "Book a Slot",
      desc: "Routine servicing, repairs, and pickup-drop scheduling.",
      phone: COMPANY_PHONE,
      tone: {
        bg: "bg-emerald-50 dark:bg-emerald-900/30",
        text: "text-emerald-700 dark:text-emerald-300",
        ring: "ring-emerald-100 dark:ring-emerald-800/50",
      },
    },
    {
      icon: Cog,
      label: "Parts",
      title: "Genuine Spares",
      desc: "OEM parts, accessories, and warranty replacements.",
      phone: COMPANY_PHONE,
      tone: {
        bg: "bg-amber-50 dark:bg-amber-900/30",
        text: "text-amber-700 dark:text-amber-300",
        ring: "ring-amber-100 dark:ring-amber-800/50",
      },
    },
  ];

  /* Why-Us simplified */
  const whyUs = [
    {
      icon: ShieldCheck,
      title: "Transparent Pricing",
      desc: "Honest, upfront quotes with zero hidden charges.",
    },
    {
      icon: Award,
      title: "15+ Years Trusted",
      desc: "Serving Bhainsa and nearby districts since 2009.",
    },
    {
      icon: Star,
      title: "Certified Experts",
      desc: "Factory-trained technicians on every service.",
    },
    {
      icon: Headphones,
      title: "After-Sales Support",
      desc: "We stay with you long after keys change hands.",
    },
  ];

  const heroIn = useInView(0.05);
  const deptIn = useInView(0.1);
  const mainIn = useInView(0.05);
  const infoIn = useInView(0.1);
  const whyIn = useInView(0.1);
  const revIn = useInView(0.1);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300 overflow-x-hidden">
      <style>{STYLES}</style>

      {/* ════════════════════════════════════════════════════════════════
          HERO — two-column layout with showroom image on right
      ════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroIn.ref}
        className="relative w-full min-h-screen overflow-hidden bg-[#0f1e33]"
      >
        {/* Background image — full bleed */}
        <img
          fetchpriority="high"
          src={Baleno1}
          alt="Surya Motors showroom"
          aria-hidden="true"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-[70%_center] sm:object-[65%_center] md:object-center"
        />

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1e33]/95 via-[#0f1e33]/70 to-[#0f1e33]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1e33]/80 via-transparent to-transparent" />

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Content — text overlaid on image */}
        <div className="relative z-10 max-w-[1440px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-24 lg:py-28 min-h-screen flex flex-col justify-center">
          <div className="max-w-2xl">
            <nav
              className={`flex items-center gap-1.5 text-[0.65rem] sm:text-xs text-blue-200/80 font-medium uppercase tracking-[0.15em] mb-4 sm:mb-5 ${
                heroIn.visible ? "anim-fade-up" : "opacity-0"
              }`}
            >
              <span>Home</span>
              <ChevronRight size={12} />
              <span className="text-blue-300">Contact</span>
            </nav>
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-4 sm:mb-5 ${
                heroIn.visible ? "anim-fade-up d-100" : "opacity-0"
              }`}
            >
              We're here to help —<br />
              <span className="text-blue-300">
                reach the right team, faster.
              </span>
            </h1>
            <p
              className={`text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-xl mb-6 sm:mb-7 ${
                heroIn.visible ? "anim-fade-up d-200" : "opacity-0"
              }`}
            >
              Direct lines by department. Live map. WhatsApp-fast replies. No
              hold music, no runaround.
            </p>
            <div
              className={`flex flex-wrap items-center gap-3 sm:gap-4 ${heroIn.visible ? "anim-fade-up d-300" : "opacity-0"}`}
            >
              <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3 sm:px-4 py-2 sm:py-2.5">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full opacity-75 live-dot ${
                      status.isOpen ? "bg-emerald-400" : "bg-gray-400"
                    }`}
                  />
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${
                      status.isOpen ? "bg-emerald-400" : "bg-gray-400"
                    }`}
                  />
                </span>
                <span className="text-xs sm:text-sm text-white font-medium whitespace-nowrap">
                  {status.label || "Loading..."}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Overlaid badges — top-right: Serving since, bottom-right: Avg reply */}
        <div
          className={`absolute sm:top-24 sm:right-6 lg:top-28 lg:right-8 z-20 hidden sm:block bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-lg ${
            heroIn.visible ? "anim-fade-right d-200" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <Award size={14} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-[0.6rem] sm:text-[0.65rem] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider leading-none">
                Serving since
              </p>
              <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight mt-0.5">
                2009
              </p>
            </div>
          </div>
        </div>
        <div
          className={`absolute sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-20 hidden sm:block bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-lg ${
            heroIn.visible ? "anim-fade-right d-300" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
              <MessageCircle size={14} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-[0.6rem] sm:text-[0.65rem] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider leading-none">
                Avg. reply
              </p>
              <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight mt-0.5">
                Under 15 min
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        ref={mainIn.ref}
        className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {/* ════════════════════════════════════════════════════════════
              🔧 CHANGE 13/13 — Professional map redesign
              — Rich header with gradient pin, coordinates, live open pill
              — Loading skeleton with shimmer until iframe reports load
              — Floating branded info card (top-left overlay)
              — Expand-in-maps button (top-right overlay)
              — 3-action bar (Directions / Call / Share)
              — Coordinate strip footer
          ════════════════════════════════════════════════════════════ */}
          <div
            className={`lg:col-span-3 ${mainIn.visible ? "anim-fade-left" : "opacity-0"}`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden card-lift h-full flex flex-col">
              {/* ── Rich header ─────────────────────────────────── */}
              <div className="px-4 sm:px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    {/* Gradient pin badge */}
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30 anim-pin-float">
                        <MapPin
                          size={18}
                          className="text-white"
                          fill="white"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-tight">
                        Visit our showroom
                      </h3>
                      <p className="text-[0.7rem] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                        {COMPANY_ADDRESS}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 text-[0.6rem] sm:text-[0.65rem] text-gray-400 dark:text-gray-500 font-mono flex-wrap">
                        <Compass
                          size={10}
                          className="text-gray-400 flex-shrink-0"
                        />
                        <span className="whitespace-nowrap">
                          18.6768° N, 77.9091° E
                        </span>
                        <span className="text-gray-300 dark:text-gray-600">
                          ·
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyAddress}
                          className="inline-flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                          aria-label="Copy address"
                        >
                          <Copy
                            size={9}
                            className="opacity-70 group-hover:opacity-100"
                          />
                          <span className="uppercase tracking-wider">
                            {copyStatus === "copied" ? "Copied!" : "Copy"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Live open pill */}
                  <div
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 border ${
                      status.isOpen
                        ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800/50"
                        : "bg-gray-100 border-gray-200 dark:bg-gray-700/50 dark:border-gray-600"
                    }`}
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span
                        className={`absolute inline-flex h-full w-full rounded-full opacity-75 live-dot ${
                          status.isOpen ? "bg-emerald-500" : "bg-gray-400"
                        }`}
                      />
                      <span
                        className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                          status.isOpen ? "bg-emerald-500" : "bg-gray-400"
                        }`}
                      />
                    </span>
                    <span
                      className={`text-[0.65rem] sm:text-xs font-semibold ${
                        status.isOpen
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {status.isOpen ? "Open now" : "Closed"}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Map container with overlays ───────────────── */}
              <div className="relative flex-1 min-h-[260px] sm:min-h-[380px] lg:min-h-[480px] bg-gray-100 dark:bg-gray-900 overflow-hidden">
                {/* Loading skeleton — visible until iframe fires onLoad */}
                {!mapLoaded && (
                  <div className="absolute inset-0 map-skeleton flex items-center justify-center z-10 pointer-events-none">
                    <div className="text-center">
                      <div className="relative inline-flex mb-2">
                        <span className="absolute inline-flex w-full h-full rounded-full bg-blue-400/30 anim-ring-out" />
                        <div className="relative w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md">
                          <MapPin
                            size={18}
                            className="text-blue-600 dark:text-blue-400"
                          />
                        </div>
                      </div>
                      <p className="text-[0.65rem] sm:text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                        Locating showroom…
                      </p>
                    </div>
                  </div>
                )}

                {/* Iframe — fades in once loaded */}
                <iframe
                  title="Surya Motors location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.7136351436093!2d77.90917137519544!3d18.67684208244727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce77d2ae752145%3A0xa15c2fc3a93e4f02!2sSurya%20Motors!5e0!3m2!1sen!2sin!4v1764528855476!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  className={`absolute inset-0 z-0 ${mapLoaded ? "map-fade-in" : "opacity-0"}`}
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  onLoad={() => setMapLoaded(true)}
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Expand button — top-right overlay */}
                {mapLoaded && (
                  <a
                    href="https://maps.app.goo.gl/NSFCanSrBzAHhEvAA"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-3 right-3 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md hover:bg-white dark:hover:bg-gray-800 rounded-xl w-9 h-9 flex items-center justify-center shadow-xl border border-white/40 dark:border-gray-700/60 anim-card-float transition-colors"
                    aria-label="Open in Google Maps"
                    title="Open in Google Maps"
                  >
                    <Maximize2
                      size={14}
                      className="text-gray-700 dark:text-gray-300"
                    />
                  </a>
                )}
              </div>

              {/* ── 3-action bottom bar ───────────────────────── */}
              <div className="border-t border-gray-100 dark:border-gray-700 grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-700">
                <a
                  href="https://maps.app.goo.gl/NSFCanSrBzAHhEvAA"
                  target="_blank"
                  rel="noreferrer"
                  className="touch-safe group flex items-center justify-center gap-1.5 py-3 sm:py-3.5 text-[0.7rem] sm:text-xs md:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <Navigation
                    size={13}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                  Directions
                </a>
                <a
                  href={`tel:${COMPANY_PHONE}`}
                  className="touch-safe group flex items-center justify-center gap-1.5 py-3 sm:py-3.5 text-[0.7rem] sm:text-xs md:text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                >
                  <Phone
                    size={13}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  Call
                </a>
                <button
                  type="button"
                  onClick={handleShare}
                  className="touch-safe group flex items-center justify-center gap-1.5 py-3 sm:py-3.5 text-[0.7rem] sm:text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
                >
                  <Share2
                    size={13}
                    className="group-hover:scale-110 transition-transform"
                  />
                  {/* 🔧 CHANGE 4/5 — three-state label */}
                  {copyStatus === "copied"
                    ? "Link copied"
                    : copyStatus === "error"
                      ? "Copy failed"
                      : "Share"}
                </button>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div
            id="contact-form"
            className={`lg:col-span-2 ${mainIn.visible ? "anim-fade-right" : "opacity-0"}`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden card-lift h-full">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                    <MessageCircle
                      size={16}
                      className="text-emerald-600 dark:text-emerald-400"
                    />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    Send a message
                  </h3>
                </div>
                <p className="text-[0.7rem] sm:text-xs text-gray-500 dark:text-gray-400 pl-10">
                  We'll reply on WhatsApp within 15 minutes.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="px-4 sm:px-6 py-5 sm:py-6 space-y-4"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Kumar"
                    className="touch-safe w-full px-3 sm:px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98XXXXXX10"
                      className="touch-safe w-full px-3 sm:px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm outline-none transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                    >
                      Email{" "}
                      <span className="text-gray-400 font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="touch-safe w-full px-3 sm:px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    How can we help? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your inquiry — vehicle model, service need, etc."
                    className="w-full px-3 sm:px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="touch-safe w-full inline-flex items-center justify-center gap-2 bg-[#1e3a5f] hover:bg-[#0f1e33] active:scale-[0.98] text-white font-bold py-3 px-4 rounded-lg transition-all text-sm shadow-sm hover:shadow-md"
                >
                  <Send size={15} />
                  Preview & Send
                </button>

                {/* 🔧 CHANGE 8/10 — Updated footer copy to reflect new preview flow */}
                <div className="flex items-center justify-center gap-1.5 text-[0.65rem] sm:text-xs text-gray-400 dark:text-gray-500">
                  <CheckCircle2 size={12} className="text-emerald-500" />
                  <span>Review your message before it opens WhatsApp</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CONTACT INFO ROW
      ════════════════════════════════════════════════════════════════ */}
      <section
        ref={infoIn.ref}
        className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              icon: MapPin,
              label: "Address",
              value: COMPANY_ADDRESS,
              href: "https://maps.app.goo.gl/NSFCanSrBzAHhEvAA",
            },
            {
              icon: Phone,
              label: "Phone",
              value: COMPANY_PHONE,
              href: `tel:${COMPANY_PHONE}`,
            },
            {
              icon: Mail,
              label: "Email",
              value: COMPANY_EMAIL,
              href: `mailto:${COMPANY_EMAIL}`,
            },
            {
              icon: Clock,
              label: "Hours",
              value: "Mon–Sun · 8AM–10PM",
              href: undefined,
            },
          ].map(({ icon: Icon, label, value, href }, i) => {
            const inner = (
              <div
                className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 sm:p-4 card-lift ${infoIn.visible ? `anim-fade-up d-${(i + 1) * 100}` : "opacity-0"} h-full`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon
                    size={14}
                    className="text-blue-600 dark:text-blue-400 flex-shrink-0"
                  />
                  <p className="text-[0.6rem] sm:text-[0.65rem] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {label}
                  </p>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white leading-snug break-words">
                  {value}
                </p>
              </div>
            );
            return href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                {inner}
              </a>
            ) : (
              <div key={label}>{inner}</div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          DEPARTMENTS STRIP
      ════════════════════════════════════════════════════════════════ */}
      <section
        ref={deptIn.ref}
        className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 lg:pb-16"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white">
                Talk to the right team
              </h2>
              <p className="text-[0.7rem] sm:text-xs lg:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Direct lines by department — no IVR, no hold.
              </p>
            </div>
            <span className="text-[0.65rem] sm:text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">
              Avg. reply · under 15 min
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700">
            {departments.map((d, i) => (
              <div
                key={d.label}
                className={`p-4 sm:p-5 lg:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${
                  deptIn.visible
                    ? `anim-fade-up d-${(i + 1) * 100}`
                    : "opacity-0"
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl ${d.tone.bg} ring-4 ${d.tone.ring} flex items-center justify-center`}
                  >
                    <d.icon size={20} className={d.tone.text} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider ${d.tone.text}`}
                    >
                      {d.label}
                    </p>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                      {d.title}
                    </h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3 sm:mb-4">
                  {d.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href={`tel:${d.phone}`}
                    className="touch-safe flex-1 inline-flex items-center justify-center gap-1.5 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 text-xs sm:text-sm font-semibold px-3 py-2.5 rounded-lg transition-colors"
                  >
                    <Phone size={13} /> Call
                  </a>
                  <a
                    href={`https://wa.me/916301993194?text=${encodeURIComponent(`Hi, I have a question about ${d.label}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="touch-safe flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold px-3 py-2.5 rounded-lg transition-colors border border-emerald-100 dark:border-emerald-800/50"
                  >
                    <MessageCircle size={13} /> WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          WHY-US BAND
      ════════════════════════════════════════════════════════════════ */}
      <section
        ref={whyIn.ref}
        className="bg-white dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div
            className={`text-center mb-8 sm:mb-10 ${whyIn.visible ? "anim-fade-up" : "opacity-0"}`}
          >
            <p className="text-[0.65rem] sm:text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.15em] mb-2">
              Why Surya Motors
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Built on trust, backed by service
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              15+ years of transparent pricing, certified expertise, and
              after-sales support that stays with you.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {whyUs.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className={`bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-5 card-lift ${whyIn.visible ? `anim-fade-up d-${(i + 1) * 100}` : "opacity-0"}`}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-600 flex items-center justify-center mb-3 sm:mb-4">
                  <Icon size={18} className="text-white" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-1.5">
                  {title}
                </h3>
                <p className="text-[0.7rem] sm:text-xs lg:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          GOOGLE REVIEW FOOTER BAND
      ════════════════════════════════════════════════════════════════ */}
      <section
        ref={revIn.ref}
        className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14"
      >
        <div
          className={`bg-gradient-to-br from-[#1e3a5f] to-[#0f1e33] rounded-2xl px-6 sm:px-8 lg:px-12 py-8 sm:py-10 text-center relative overflow-hidden ${revIn.visible ? "anim-fade-up" : "opacity-0"}`}
        >
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative">
            <p className="text-[0.65rem] sm:text-xs font-bold text-blue-300 uppercase tracking-[0.15em] mb-2">
              Loved our service?
            </p>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
              Leave us a Google review
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/70 max-w-md mx-auto mb-5">
              Your feedback helps other customers find us — and helps us keep
              improving.
            </p>
            <div className="flex justify-center items-center gap-1 sm:gap-1.5 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    window.open(
                      "https://maps.app.goo.gl/NSFCanSrBzAHhEvAA",
                      "_blank",
                    )
                  }
                  className="touch-safe text-yellow-400 hover:text-yellow-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#1e3a5f] rounded transition-all"
                  aria-label={`Rate ${star} stars on Google`}
                >
                  <Star size={26} fill="currentColor" strokeWidth={0} />
                </button>
              ))}
            </div>
            <a
              href="https://maps.app.goo.gl/NSFCanSrBzAHhEvAA"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-blue-200 hover:text-white font-semibold transition-colors"
            >
              Open Google Reviews <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          🔧 CHANGE 9/10 — CONFIRMATION PREVIEW MODAL (NEW)
          Shown when the customer submits the form. Displays a branded
          header (SM logo lockup), a preview of the WhatsApp message
          exactly as it will appear on the dealership's phone, and two
          actions: Edit (go back) or Continue on WhatsApp.

          ── LOGO NOTE ──
          The "SM" square below is a placeholder monogram. When Akhil
          has the real Surya Motors logo:
             1. Drop it in public/ as `logo-surya-motors.png` (or .svg)
             2. Replace the <div className="w-11 h-11 ..."> block with:
                <img loading="lazy" src="/logo-surya-motors.png"
                     alt="Surya Motors"
                     className="w-11 h-11 rounded-lg bg-white p-1
                                object-contain shadow-lg" />
      ════════════════════════════════════════════════════════════════ */}
      {showConfirmModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 anim-backdrop"
          onClick={handleEditForm}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-modal-title"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal card */}
          <div
            className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden anim-modal-pop max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={handleEditForm}
              className="touch-safe absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
              aria-label="Close preview"
            >
              <X size={16} />
            </button>

            {/* Branded header */}
            <div className="relative bg-gradient-to-br from-[#0f1e33] to-[#1e3a5f] px-5 sm:px-6 pt-6 pb-5 text-center overflow-hidden">
              {/* Grid backdrop */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative inline-flex items-center gap-3">
                {/* Logo mark — replace with <img loading="lazy"> when real logo is available */}
                <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center font-extrabold text-[#0f1e33] text-sm tracking-wider shadow-lg">
                  SM
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm tracking-wide leading-tight">
                    SURYA MOTORS
                  </p>
                  <p className="text-[0.65rem] text-blue-200/70 uppercase tracking-[0.12em] mt-0.5">
                    Multi Brand · Bhainsa
                  </p>
                </div>
              </div>

              {/* Ready-to-send pill */}
              <div className="relative mt-4 inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-400/30 rounded-full px-3 py-1">
                <ShieldCheck size={12} className="text-emerald-300" />
                <span className="text-[0.7rem] sm:text-xs text-emerald-200 font-semibold">
                  Ready to send
                </span>
              </div>
            </div>

            {/* Body — scrollable if content is long */}
            <div className="px-5 sm:px-6 py-4 sm:py-5 overflow-y-auto flex-1">
              <h3
                id="confirm-modal-title"
                className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1"
              >
                Review your message
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                Confirm the details below. Continuing will open WhatsApp with
                your message ready to send.
              </p>

              {/* Preview label */}
              <div className="flex items-center gap-1.5 mb-2">
                <MessageCircle
                  size={12}
                  className="text-emerald-600 dark:text-emerald-400"
                />
                <p className="text-[0.6rem] sm:text-[0.65rem] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.1em]">
                  Message Preview
                </p>
              </div>

              {/* Message preview card (mimics WhatsApp bubble tone) */}
              {/* 🔧 CHANGE 5/5 — preview mirrors the emoji-free WhatsApp message */}
              <div className="bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 border-l-[3px] border-l-[#25D366] rounded-xl px-3.5 py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-1.5 break-words">
                <div className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm">
                  SURYA MOTORS - New Enquiry
                </div>
                <div className="pt-0.5"></div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Name:
                  </span>{" "}
                  {formData.name || (
                    <em className="text-gray-400">(not provided)</em>
                  )}
                </div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Phone:
                  </span>{" "}
                  <span className="text-blue-600 dark:text-blue-400 underline">
                    {formData.phone || (
                      <em className="text-gray-400 no-underline">
                        (not provided)
                      </em>
                    )}
                  </span>
                </div>
                {formData.email.trim() && (
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Email:
                    </span>{" "}
                    <span className="text-blue-600 dark:text-blue-400 underline">
                      {formData.email}
                    </span>
                  </div>
                )}
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Message:
                  </span>{" "}
                  {formData.message || (
                    <em className="text-gray-400">(not provided)</em>
                  )}
                </div>
                <div className="pt-1.5 mt-1.5 border-t border-gray-200 dark:border-gray-700 text-[0.65rem] sm:text-xs text-gray-400 dark:text-gray-500">
                  Sent: {formatTimestamp()} · suryamotors.in
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3 sm:px-4 py-2 sm:py-2.5 max-w-full">
              <button
                type="button"
                onClick={handleEditForm}
                className="touch-safe inline-flex items-center justify-center gap-1.5 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                <ArrowLeft size={14} /> Edit
              </button>
              <button
                type="button"
                onClick={handleConfirmSend}
                className="touch-safe flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5A] active:scale-[0.98] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition-all shadow-md shadow-emerald-500/30"
              >
                <MessageCircle size={14} /> Continue on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          🔧 CHANGE 10/10 — SUCCESS TOAST (NEW)
          Slides down from the top, sits for 5 seconds, then slides back
          up. Fires after "Continue on WhatsApp" is tapped in the modal.
      ════════════════════════════════════════════════════════════════ */}
      {toastState !== "hidden" && (
        <div
          className={`fixed top-4 sm:top-6 left-1/2 z-[110] ${toastState === "in" ? "anim-toast-in" : "anim-toast-out"}`}
          style={{ transform: "translateX(-50%)" }}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3 bg-emerald-600 text-white rounded-xl shadow-2xl shadow-emerald-900/40 px-4 py-3 sm:px-5 sm:py-3.5 max-w-[92vw] sm:max-w-md">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={18} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm sm:text-base font-bold leading-tight">
                Message opened in WhatsApp
              </p>
              <p className="text-[0.7rem] sm:text-xs text-emerald-100/90 mt-0.5">
                Tap send in WhatsApp to complete. We'll reply within 15 minutes.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setToastState("out")}
              className="touch-safe ml-1 w-7 h-7 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
