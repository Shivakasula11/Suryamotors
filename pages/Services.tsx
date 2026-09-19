import React from 'react';
import { SERVICE_CATEGORIES } from '../constants';
import ServiceCard from '../components/ServiceCard';

/* ─── Responsive breakpoint styles ────────────────────────────────────── */
const SERVICES_STYLES = `
  /* ── ⌚ Smartwatch  180px – 240px ───────────────────────────────── */
  @media (max-width: 240px) {
    .s-wrap        { padding-top: 5rem !important; padding-bottom: 1rem !important; }
    .s-container   { padding-left: 0.4rem !important; padding-right: 0.4rem !important; }
    .s-header      { margin-bottom: 1rem !important; }
    .s-title       { font-size: 1rem !important; line-height: 1.2 !important; margin-bottom: 0.4rem !important; word-break: break-word; }
    .s-desc        { font-size: 0.55rem !important; line-height: 1.4 !important; }
    .s-grid        { gap: 0.5rem !important; }
  }

  /* ── 📱 Mobile S  241px – 320px ─────────────────────────────────── */
  @media (min-width: 241px) and (max-width: 320px) {
    .s-wrap        { padding-top: 5.5rem !important; padding-bottom: 1.5rem !important; }
    .s-container   { padding-left: 0.65rem !important; padding-right: 0.65rem !important; }
    .s-header      { margin-bottom: 1.5rem !important; }
    .s-title       { font-size: 1.35rem !important; line-height: 1.2 !important; word-break: break-word; }
    .s-desc        { font-size: 0.7rem !important; line-height: 1.45 !important; }
    .s-grid        { gap: 0.75rem !important; }
  }

  /* ── 📱 Mobile M  321px – 480px ─────────────────────────────────── */
  @media (min-width: 321px) and (max-width: 480px) {
    .s-wrap        { padding-top: 6rem !important; padding-bottom: 2rem !important; }
    .s-title       { font-size: 1.75rem !important; line-height: 1.15 !important; }
    .s-desc        { font-size: 0.85rem !important; line-height: 1.5 !important; }
    .s-header      { margin-bottom: 2rem !important; }
  }

  /* ── 📱 Phablet  481px – 600px ──────────────────────────────────── */
  @media (min-width: 481px) and (max-width: 600px) {
    .s-wrap        { padding-top: 6.25rem !important; padding-bottom: 2.25rem !important; }
    .s-title       { font-size: 2rem !important; line-height: 1.15 !important; }
    .s-desc        { font-size: 0.95rem !important; }
    .s-header      { margin-bottom: 2.25rem !important; }
  }

  /* ── 📟 Tablet Portrait  601px – 768px ──────────────────────────── */
  @media (min-width: 601px) and (max-width: 768px) {
    .s-wrap        { padding-top: 6.75rem !important; padding-bottom: 2.75rem !important; }
    .s-title       { font-size: 2.4rem !important; line-height: 1.1 !important; }
    .s-desc        { font-size: 1.05rem !important; line-height: 1.55 !important; }
    .s-header      { margin-bottom: 2.5rem !important; }
  }

  /* ── 📟 Tablet Landscape  769px – 1024px ────────────────────────── */
  @media (min-width: 769px) and (max-width: 1024px) {
    .s-wrap        { padding-top: 7rem !important; padding-bottom: 3.25rem !important; }
    .s-container   { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
    .s-title       { font-size: 2.75rem !important; line-height: 1.1 !important; }
    .s-desc        { font-size: 1.1rem !important; line-height: 1.6 !important; }
    .s-header      { margin-bottom: 3rem !important; }
    .s-grid        { gap: 1.5rem !important; }
  }

  /* ── 💻 Small Laptop  1025px – 1280px ───────────────────────────── */
  @media (min-width: 1025px) and (max-width: 1280px) {
    .s-wrap        { padding-top: 7.5rem !important; padding-bottom: 4rem !important; }
    .s-container   { padding-left: 2rem !important; padding-right: 2rem !important; }
    .s-title       { font-size: 3.25rem !important; line-height: 1.05 !important; }
    .s-desc        { font-size: 1.15rem !important; line-height: 1.65 !important; }
    .s-header      { margin-bottom: 3.25rem !important; }
    .s-grid        { gap: 1.75rem !important; }
  }

  /* ── 🖥️ Large Laptop / Desktop  1281px – 1919px ─────────────────── */
  @media (min-width: 1281px) and (max-width: 1919px) {
    .s-wrap        { padding-top: 8rem !important; padding-bottom: 4.5rem !important; }
    .s-container   { padding-left: 2.5rem !important; padding-right: 2.5rem !important; }
    .s-title       { font-size: 3.5rem !important; line-height: 1.05 !important; }
    .s-desc        { font-size: 1.25rem !important; line-height: 1.7 !important; }
    .s-header      { margin-bottom: 3.5rem !important; }
    .s-grid        { gap: 2rem !important; }
  }

  /* ── 🖥️ Ultra-wide / 4K  1920px+ ────────────────────────────────── */
  @media (min-width: 1920px) {
    .s-wrap        { padding-top: 9rem !important; padding-bottom: 5.5rem !important; }
    .s-container   { padding-left: 3rem !important; padding-right: 3rem !important; }
    .s-title       { font-size: 4.25rem !important; line-height: 1.05 !important; }
    .s-desc        { font-size: 1.4rem !important; line-height: 1.75 !important; }
    .s-header      { margin-bottom: 4rem !important; }
    .s-grid        { gap: 2.5rem !important; }
  }
`;

const Services: React.FC = () => {
  return (
    <div className="s-wrap bg-gray-50 dark:bg-gray-900 min-h-screen pt-24 pb-8 sm:pt-28 sm:pb-10 md:pt-32 md:pb-12 xl:pt-36 xl:pb-16 2xl:pb-20 transition-colors duration-300 overflow-x-hidden">
      <style>{SERVICES_STYLES}</style>

      <div className="s-container max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 2xl:px-12">
        <div className="s-header text-center mb-8 sm:mb-10 md:mb-12 xl:mb-14">
          <h1 className="s-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-extrabold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4 break-words">
            Our Services
          </h1>
          <p className="s-desc text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed">
            Comprehensive car care solutions tailored to your vehicle's needs.
            Choose from our wide range of services.
          </p>
        </div>

        <div className="s-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 xl:gap-7 2xl:gap-8">
          {SERVICE_CATEGORIES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;