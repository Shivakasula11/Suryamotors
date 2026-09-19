import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceCategory } from '../types';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceCategory;
}

/* ─── Responsive breakpoint styles ────────────────────────────────────── */
const SC_STYLES = `
  /* ── ⌚ Smartwatch  180px – 240px ───────────────────────────────── */
  @media (max-width: 240px) {
    .sc-card        { border-radius: 0.45rem !important; }
    .sc-img-wrap    { height: 4.5rem !important; }
    .sc-icon-badge  { padding: 0.25rem !important; border-bottom-left-radius: 0.45rem !important; }
    .sc-icon        { width: 0.85rem !important; height: 0.85rem !important; }
    .sc-hover-pad   { padding-bottom: 0.3rem !important; }
    .sc-hover-txt   { font-size: 0.55rem !important; }
    .sc-hover-arrow { width: 0.65rem !important; height: 0.65rem !important; margin-left: 0.25rem !important; }
    .sc-body        { padding: 0.55rem !important; }
    .sc-title       { font-size: 0.75rem !important; line-height: 1.2 !important; margin-bottom: 0.25rem !important; word-break: break-word; }
    .sc-desc        { font-size: 0.55rem !important; line-height: 1.35 !important; margin-bottom: 0.4rem !important; }
    .sc-incl-label  { font-size: 0.5rem !important; margin-bottom: 0.25rem !important; letter-spacing: 0.05em !important; }
    .sc-incl-list   { gap: 0.2rem !important; }
    .sc-incl-item   { font-size: 0.55rem !important; line-height: 1.3 !important; }
    .sc-incl-dot    { width: 0.25rem !important; height: 0.25rem !important; margin-right: 0.3rem !important; }
  }

  /* ── 📱 Mobile S  241px – 320px ─────────────────────────────────── */
  @media (min-width: 241px) and (max-width: 320px) {
    .sc-img-wrap    { height: 7rem !important; }
    .sc-icon-badge  { padding: 0.4rem !important; }
    .sc-icon        { width: 1.1rem !important; height: 1.1rem !important; }
    .sc-hover-txt   { font-size: 0.7rem !important; }
    .sc-body        { padding: 0.85rem !important; }
    .sc-title       { font-size: 0.95rem !important; }
    .sc-desc        { font-size: 0.7rem !important; line-height: 1.45 !important; }
    .sc-incl-label  { font-size: 0.55rem !important; }
    .sc-incl-item   { font-size: 0.7rem !important; }
  }

  /* ── 📱 Mobile M  321px – 480px ─────────────────────────────────── */
  @media (min-width: 321px) and (max-width: 480px) {
    .sc-img-wrap    { height: 9rem !important; }
    .sc-icon        { width: 1.25rem !important; height: 1.25rem !important; }
    .sc-body        { padding: 1rem !important; }
    .sc-title       { font-size: 1.05rem !important; }
    .sc-desc        { font-size: 0.78rem !important; }
    .sc-incl-item   { font-size: 0.78rem !important; }
  }

  /* ── 📱 Phablet  481px – 600px ──────────────────────────────────── */
  @media (min-width: 481px) and (max-width: 600px) {
    .sc-img-wrap    { height: 10rem !important; }
    .sc-title       { font-size: 1.15rem !important; }
    .sc-desc        { font-size: 0.85rem !important; }
    .sc-incl-item   { font-size: 0.85rem !important; }
  }

  /* ── 📟 Tablet Portrait  601px – 768px ──────────────────────────── */
  @media (min-width: 601px) and (max-width: 768px) {
    .sc-img-wrap    { height: 11rem !important; }
    .sc-body        { padding: 1.25rem !important; }
    .sc-title       { font-size: 1.2rem !important; }
    .sc-desc        { font-size: 0.88rem !important; line-height: 1.55 !important; }
    .sc-incl-item   { font-size: 0.88rem !important; }
  }

  /* ── 📟 Tablet Landscape  769px – 1024px ────────────────────────── */
  @media (min-width: 769px) and (max-width: 1024px) {
    .sc-img-wrap    { height: 11.5rem !important; }
    .sc-body        { padding: 1.4rem !important; }
    .sc-title       { font-size: 1.25rem !important; }
    .sc-desc        { font-size: 0.9rem !important; line-height: 1.6 !important; }
    .sc-incl-item   { font-size: 0.9rem !important; }
    .sc-icon        { width: 1.4rem !important; height: 1.4rem !important; }
  }

  /* ── 💻 Small Laptop  1025px – 1280px ───────────────────────────── */
  @media (min-width: 1025px) and (max-width: 1280px) {
    .sc-img-wrap    { height: 12rem !important; }
    .sc-body        { padding: 1.5rem !important; }
    .sc-title       { font-size: 1.3rem !important; }
    .sc-desc        { font-size: 0.92rem !important; }
    .sc-incl-item   { font-size: 0.92rem !important; }
  }

  /* ── 🖥️ Large Laptop / Desktop  1281px – 1919px ─────────────────── */
  @media (min-width: 1281px) and (max-width: 1919px) {
    .sc-img-wrap    { height: 13rem !important; }
    .sc-icon-badge  { padding: 0.65rem !important; }
    .sc-icon        { width: 1.65rem !important; height: 1.65rem !important; }
    .sc-hover-txt   { font-size: 1rem !important; }
    .sc-body        { padding: 1.75rem !important; }
    .sc-title       { font-size: 1.4rem !important; line-height: 1.3 !important; margin-bottom: 0.6rem !important; }
    .sc-desc        { font-size: 0.95rem !important; line-height: 1.65 !important; margin-bottom: 1.1rem !important; }
    .sc-incl-label  { font-size: 0.78rem !important; margin-bottom: 0.6rem !important; }
    .sc-incl-item   { font-size: 0.95rem !important; }
    .sc-incl-dot    { width: 0.4rem !important; height: 0.4rem !important; }
  }

  /* ── 🖥️ Ultra-wide / 4K  1920px+ ────────────────────────────────── */
  @media (min-width: 1920px) {
    .sc-img-wrap    { height: 15rem !important; }
    .sc-icon-badge  { padding: 0.8rem !important; }
    .sc-icon        { width: 1.85rem !important; height: 1.85rem !important; }
    .sc-hover-txt   { font-size: 1.1rem !important; }
    .sc-hover-arrow { width: 1.15rem !important; height: 1.15rem !important; }
    .sc-body        { padding: 2rem !important; }
    .sc-title       { font-size: 1.55rem !important; line-height: 1.3 !important; margin-bottom: 0.75rem !important; }
    .sc-desc        { font-size: 1.05rem !important; line-height: 1.7 !important; margin-bottom: 1.25rem !important; }
    .sc-incl-label  { font-size: 0.85rem !important; }
    .sc-incl-item   { font-size: 1.05rem !important; line-height: 1.55 !important; }
    .sc-incl-dot    { width: 0.45rem !important; height: 0.45rem !important; }
    .sc-incl-list   { gap: 0.5rem !important; }
  }
`;

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Icon = service.icon;

  return (
    <Link 
      to={`/services/${service.id}`}
      className="sc-card group bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 flex flex-col h-full"
    >
      <style>{SC_STYLES}</style>

      <div className="sc-img-wrap relative h-36 sm:h-44 md:h-48 xl:h-52 2xl:h-60 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="sc-icon-badge absolute top-0 right-0 bg-blue-600 text-white p-1.5 sm:p-2 xl:p-2.5 rounded-bl-lg sm:rounded-bl-xl z-10">
          <Icon className="sc-icon" size={24} />
        </div>
       <div className="sc-hover-pad hidden md:flex absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end justify-center pb-3 sm:pb-4 xl:pb-5">
   <span className="sc-hover-txt text-white font-medium flex items-center text-xs sm:text-sm xl:text-base">
     View Details <ArrowRight className="sc-hover-arrow ml-1.5 sm:ml-2" size={16} />
   </span>
</div>
      </div>
      
      <div className="sc-body p-4 sm:p-5 md:p-6 xl:p-7 flex-grow flex flex-col">
        <h3 className="sc-title text-base sm:text-lg md:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-words">
          {service.title}
        </h3>
        <p className="sc-desc text-gray-600 dark:text-gray-300 text-xs sm:text-sm xl:text-base mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
          {service.description}
        </p>
        
        <div className="mt-auto">
          <h4 className="sc-incl-label text-[0.625rem] sm:text-xs xl:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
            Includes:
          </h4>
          <ul className="sc-incl-list space-y-1 xl:space-y-1.5">
            {service.subServices.slice(0, 3).map((sub, index) => (
              <li key={index} className="sc-incl-item flex items-center text-xs sm:text-sm xl:text-base text-gray-700 dark:text-gray-300">
                <span className="sc-incl-dot w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></span>
                {sub.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;