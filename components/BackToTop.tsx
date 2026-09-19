import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/* ─── Responsive positioning — stacks ABOVE the FloatingWhatsApp button ──
   FloatingWhatsApp sits at `bottom-4 right-4` → `bottom-8 right-8` across
   breakpoints. This button offsets vertically to sit above it without
   overlap, at every screen size. Icon/padding scale to match. */
const BTT_STYLES = `
  @keyframes bttFadeInUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes bttPulseRing {
    0%   { transform: scale(0.9); opacity: 0.55; }
    100% { transform: scale(2.0); opacity: 0;    }
  }
  .btt-appear     { animation: bttFadeInUp   0.32s cubic-bezier(.22,1,.36,1) both; }
  .btt-ring       { animation: bttPulseRing  2.2s ease-out infinite;
                    position: absolute; inset: 0; border-radius: 9999px;
                    background: rgba(30, 58, 95, 0.35); z-index: -1; }

  /* ── ⌚ Smartwatch  180px – 240px ─────────────────────────────── */
  @media (max-width: 240px) {
    .btt-root { bottom: 3rem   !important; right: 0.4rem  !important; }
    .btt-fab  { padding: 0.3rem !important; }
    .btt-ico  { width: 0.7rem !important; height: 0.7rem !important; }
  }
  /* ── 📱 Mobile S  241px – 320px ───────────────────────────────── */
  @media (min-width: 241px) and (max-width: 320px) {
    .btt-root { bottom: 4rem   !important; right: 0.75rem !important; }
    .btt-fab  { padding: 0.4rem !important; }
    .btt-ico  { width: 0.8rem !important; height: 0.8rem !important; }
  }
  /* ── 📱 Mobile M  321px – 480px ───────────────────────────────── */
  @media (min-width: 321px) and (max-width: 480px) {
    .btt-root { bottom: 4.75rem !important; right: 1rem !important; }
    .btt-fab  { padding: 0.5rem !important; }
    .btt-ico  { width: 0.95rem !important; height: 0.95rem !important; }
  }
  /* ── 📱 Phablet  481px – 600px ────────────────────────────────── */
  @media (min-width: 481px) and (max-width: 600px) {
    .btt-root { bottom: 5rem !important; right: 1.25rem !important; }
    .btt-fab  { padding: 0.55rem !important; }
    .btt-ico  { width: 1rem !important; height: 1rem !important; }
  }
  /* ── 📟 Tablet Portrait  601px – 768px ────────────────────────── */
  @media (min-width: 601px) and (max-width: 768px) {
    .btt-root { bottom: 5.5rem !important; right: 1.5rem !important; }
  }
  /* ── 📟 Tablet Landscape  769px – 1024px ──────────────────────── */
  @media (min-width: 769px) and (max-width: 1024px) {
    .btt-root { bottom: 5.75rem !important; right: 1.5rem !important; }
    .btt-fab  { padding: 0.6rem !important; }
    .btt-ico  { width: 1.05rem !important; height: 1.05rem !important; }
  }
  /* ── 💻 Small Laptop  1025px – 1280px ─────────────────────────── */
  @media (min-width: 1025px) and (max-width: 1280px) {
    .btt-root { bottom: 6rem !important; right: 1.75rem !important; }
    .btt-fab  { padding: 0.65rem !important; }
    .btt-ico  { width: 1.1rem !important; height: 1.1rem !important; }
  }
  /* ── 🖥️ Large Laptop / Desktop  1281px – 1919px ───────────────── */
  @media (min-width: 1281px) and (max-width: 1919px) {
    .btt-root { bottom: 6.5rem !important; right: 2rem !important; }
    .btt-fab  { padding: 0.7rem !important; }
    .btt-ico  { width: 1.15rem !important; height: 1.15rem !important; }
  }
  /* ── 🖥️ Ultra-wide / 4K  1920px+ ──────────────────────────────── */
  @media (min-width: 1920px) {
    .btt-root { bottom: 7.5rem !important; right: 2.5rem !important; }
    .btt-fab  { padding: 0.85rem !important; }
    .btt-ico  { width: 1.3rem !important; height: 1.3rem !important; }
  }

  /* Touch target safety — trimmed to 40px (was 44) to honor "small" request */
  @media (pointer: coarse) and (min-width: 321px) {
    .btt-fab { min-height: 40px; min-width: 40px; }
  }
`;

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // fire once for mid-scroll SPA route entries
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  // Don't render at all when hidden — cleaner DOM
  if (!visible) {
    return <style>{BTT_STYLES}</style>;
  }

  return (
    <>
      <style>{BTT_STYLES}</style>
      <button
        type="button"
        onClick={handleClick}
        aria-label="Back to top"
        title="Back to top"
        className="btt-root btt-appear fixed bottom-20 right-4 sm:bottom-24 sm:right-6 xl:bottom-28 xl:right-8 z-40 group"
      >
        {/* Pulse halo — subtle attention hint */}
        <span className="btt-ring" aria-hidden="true" />

        {/* Button surface */}
        <span className="btt-fab relative flex items-center justify-center p-2 sm:p-2.5 xl:p-3 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#0f1e33] text-white shadow-lg shadow-blue-900/40 border border-white/10 group-hover:scale-110 group-hover:shadow-xl group-active:scale-95 focus:outline-none group-focus:ring-4 group-focus:ring-blue-400/40 transition-all duration-300">
          <ArrowUp
            className="btt-ico group-hover:-translate-y-0.5 transition-transform"
            size={16}
            strokeWidth={2.75}
          />
        </span>
      </button>
    </>
  );
};

export default BackToTop;