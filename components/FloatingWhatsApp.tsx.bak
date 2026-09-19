import React, { useState } from 'react';
import { X } from 'lucide-react';

/* ─── 🔧 CHANGE 1/3 — Real WhatsApp brand icon (inline SVG) ─────────────
   lucide-react doesn't ship the WhatsApp logo (they avoid brand marks).
   This is the standard WhatsApp glyph path — inherits color from the
   parent via `fill="currentColor"`, sizes via width/height. */
const WhatsAppIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

/* ─── 🔧 CHANGE 2/3 — Shrunk fab-ico + option-ico sizes across all breakpoints ─── */
const FWA_STYLES = `
  /* ── ⌚ Smartwatch  180px – 240px ───────────────────────────────── */
  @media (max-width: 240px) {
    .fwa-root      { bottom: 0.4rem !important; right: 0.4rem !important; }
    .fwa-stack     { margin-bottom: 0.4rem !important; gap: 0.25rem !important; }
    .fwa-option    { width: 6.5rem !important; padding: 0.35rem 0.5rem !important; border-radius: 0.4rem !important; }
    .fwa-option-lbl{ font-size: 0.55rem !important; }
    .fwa-option-ico{ width: 0.55rem !important; height: 0.55rem !important; }
    .fwa-fab       { padding: 0.4rem !important; }
    .fwa-fab-ico   { width: 0.75rem !important; height: 0.75rem !important; }
  }

  /* ── 📱 Mobile S  241px – 320px ─────────────────────────────────── */
  @media (min-width: 241px) and (max-width: 320px) {
    .fwa-root      { bottom: 0.75rem !important; right: 0.75rem !important; }
    .fwa-stack     { gap: 0.4rem !important; }
    .fwa-option    { width: 8.5rem !important; padding: 0.55rem 0.75rem !important; }
    .fwa-option-lbl{ font-size: 0.75rem !important; }
    .fwa-option-ico{ width: 0.7rem !important; height: 0.7rem !important; }
    .fwa-fab       { padding: 0.55rem !important; }
    .fwa-fab-ico   { width: 0.95rem !important; height: 0.95rem !important; }
  }

  /* ── 📱 Mobile M  321px – 480px ─────────────────────────────────── */
  @media (min-width: 321px) and (max-width: 480px) {
    .fwa-root      { bottom: 1rem !important; right: 1rem !important; }
    .fwa-option    { width: 10.5rem !important; padding: 0.7rem 0.9rem !important; }
    .fwa-option-lbl{ font-size: 0.85rem !important; }
    .fwa-option-ico{ width: 0.8rem !important; height: 0.8rem !important; }
    .fwa-fab       { padding: 0.65rem !important; }
    .fwa-fab-ico   { width: 1.1rem !important; height: 1.1rem !important; }
  }

  /* ── 📱 Phablet  481px – 600px ──────────────────────────────────── */
  @media (min-width: 481px) and (max-width: 600px) {
    .fwa-root      { bottom: 1.25rem !important; right: 1.25rem !important; }
    .fwa-fab       { padding: 0.7rem !important; }
    .fwa-fab-ico   { width: 1.2rem !important; height: 1.2rem !important; }
  }

  /* ── 📟 Tablet Portrait  601px – 768px ──────────────────────────── */
  @media (min-width: 601px) and (max-width: 768px) {
    .fwa-root      { bottom: 1.5rem !important; right: 1.5rem !important; }
    .fwa-fab-ico   { width: 1.25rem !important; height: 1.25rem !important; }
  }

  /* ── 📟 Tablet Landscape  769px – 1024px ────────────────────────── */
  @media (min-width: 769px) and (max-width: 1024px) {
    .fwa-root      { bottom: 1.5rem !important; right: 1.5rem !important; }
    .fwa-fab       { padding: 0.75rem !important; }
    .fwa-fab-ico   { width: 1.3rem !important; height: 1.3rem !important; }
  }

  /* ── 💻 Small Laptop  1025px – 1280px ───────────────────────────── */
  @media (min-width: 1025px) and (max-width: 1280px) {
    .fwa-root      { bottom: 1.75rem !important; right: 1.75rem !important; }
    .fwa-fab       { padding: 0.8rem !important; }
    .fwa-fab-ico   { width: 1.4rem !important; height: 1.4rem !important; }
  }

  /* ── 🖥️ Large Laptop / Desktop  1281px – 1919px ─────────────────── */
  @media (min-width: 1281px) and (max-width: 1919px) {
    .fwa-root      { bottom: 2rem !important; right: 2rem !important; }
    .fwa-stack     { gap: 0.6rem !important; margin-bottom: 1.1rem !important; }
    .fwa-option    { width: 13rem !important; padding: 0.85rem 1.1rem !important; }
    .fwa-option-lbl{ font-size: 1rem !important; }
    .fwa-option-ico{ width: 1rem !important; height: 1rem !important; }
    .fwa-fab       { padding: 0.85rem !important; }
    .fwa-fab-ico   { width: 1.5rem !important; height: 1.5rem !important; }
  }

  /* ── 🖥️ Ultra-wide / 4K  1920px+ ────────────────────────────────── */
  @media (min-width: 1920px) {
    .fwa-root      { bottom: 2.5rem !important; right: 2.5rem !important; }
    .fwa-stack     { gap: 0.75rem !important; margin-bottom: 1.25rem !important; }
    .fwa-option    { width: 15rem !important; padding: 1rem 1.25rem !important; border-radius: 0.65rem !important; }
    .fwa-option-lbl{ font-size: 1.1rem !important; }
    .fwa-option-ico{ width: 1.15rem !important; height: 1.15rem !important; }
    .fwa-fab       { padding: 1rem !important; }
    .fwa-fab-ico   { width: 1.75rem !important; height: 1.75rem !important; }
  }

  /* ── Touch target safety (any pointer-coarse device) ──────────── */
  @media (pointer: coarse) and (min-width: 321px) {
    .fwa-fab, .fwa-option { min-height: 44px; }
  }
`;

const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const message = 'Hello 👋 Welcome to Surya Motors! How can we help you today?';
  const encodedMessage = encodeURIComponent(message);

  const contacts = [
    { name: 'Sales', number: '919948153518' },
    { name: 'Support', number: '919291470852' },
  ];

  const handleContact = (number: string) => {
    window.open(`https://wa.me/${number}?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fwa-root fixed bottom-4 right-4 sm:bottom-6 sm:right-6 xl:bottom-8 xl:right-8 z-40">
      <style>{FWA_STYLES}</style>

      {/* Contact options */}
      {isOpen && (
        <div className="fwa-stack mb-3 sm:mb-4 space-y-2 xl:space-y-2.5">
          {contacts.map((contact, index) => (
            <button
              key={index}
              onClick={() => handleContact(contact.number)}
              className="fwa-option flex items-center justify-between bg-white text-gray-700 px-3 sm:px-4 xl:px-5 py-2.5 sm:py-3 xl:py-3.5 rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-300 w-44 sm:w-48 xl:w-52"
            >
              <span className="fwa-option-lbl font-medium text-sm sm:text-base xl:text-lg">{contact.name}</span>
              {/* 🔧 CHANGE 3/3 — Real WhatsApp icon (green) in each option row */}
              <WhatsAppIcon size={14} className="fwa-option-ico text-green-500 flex-shrink-0" />
            </button>
          ))}
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fwa-fab bg-green-500 hover:bg-green-600 text-white p-2 sm:p-2.5 xl:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
        {isOpen ? (
          <X className="fwa-fab-ico" size={20} strokeWidth={2.5} />
        ) : (
          <WhatsAppIcon className="fwa-fab-ico" size={20} />
        )}
      </button>
    </div>
  );
};

export default FloatingWhatsApp;