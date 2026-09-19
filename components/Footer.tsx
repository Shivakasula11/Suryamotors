import React from 'react';
import { NavLink } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { COMPANY_NAME, COMPANY_PHONE, COMPANY_EMAIL, COMPANY_ADDRESS } from '../constants';

/* ─── Responsive breakpoint styles ────────────────────────────────────── */
const FOOTER_STYLES = `
  @media (max-width: 240px) {
    .f-wrap        { padding-top: 1rem !important; padding-bottom: 0.75rem !important; }
    .f-container   { padding-left: 0.4rem !important; padding-right: 0.4rem !important; }
    .f-grid        { gap: 0.85rem !important; margin-bottom: 0.85rem !important; }
    .f-col-title   { font-size: 0.75rem !important; margin-bottom: 0.5rem !important; }
    .f-text        { font-size: 0.55rem !important; line-height: 1.4 !important; margin-bottom: 0.6rem !important; }
    .f-list        { gap: 0.3rem !important; }
    .f-link        { font-size: 0.55rem !important; line-height: 1.35 !important; }
    .f-social-row  { gap: 0.6rem !important; }
    .f-social-icon { width: 0.85rem !important; height: 0.85rem !important; }
    .f-contact-row { gap: 0.35rem !important; }
    .f-contact-icon{ width: 0.7rem !important; height: 0.7rem !important; margin-right: 0.3rem !important; }
    .f-contact-txt { font-size: 0.55rem !important; line-height: 1.35 !important; word-break: break-word; }
    .f-divider     { padding-top: 0.75rem !important; margin-top: 0.75rem !important; }
    .f-copy        { font-size: 0.5rem !important; line-height: 1.35 !important; }
  }
  @media (min-width: 241px) and (max-width: 320px) {
    .f-wrap        { padding-top: 1.5rem !important; padding-bottom: 1rem !important; }
    .f-container   { padding-left: 0.65rem !important; padding-right: 0.65rem !important; }
    .f-grid        { gap: 1.25rem !important; margin-bottom: 1.25rem !important; }
    .f-col-title   { font-size: 0.9rem !important; margin-bottom: 0.65rem !important; }
    .f-text        { font-size: 0.7rem !important; line-height: 1.5 !important; }
    .f-link        { font-size: 0.7rem !important; }
    .f-social-icon { width: 1rem !important; height: 1rem !important; }
    .f-contact-icon{ width: 0.9rem !important; height: 0.9rem !important; }
    .f-contact-txt { font-size: 0.7rem !important; word-break: break-word; }
    .f-copy        { font-size: 0.6rem !important; }
  }
  @media (min-width: 321px) and (max-width: 480px) {
    .f-wrap        { padding-top: 2rem !important; padding-bottom: 1.25rem !important; }
    .f-col-title   { font-size: 1rem !important; }
    .f-text        { font-size: 0.8rem !important; line-height: 1.55 !important; }
    .f-link        { font-size: 0.8rem !important; }
    .f-contact-txt { font-size: 0.8rem !important; word-break: break-word; }
    .f-copy        { font-size: 0.7rem !important; }
  }
  @media (min-width: 481px) and (max-width: 600px) {
    .f-wrap        { padding-top: 2.25rem !important; padding-bottom: 1.5rem !important; }
    .f-col-title   { font-size: 1.05rem !important; }
    .f-text        { font-size: 0.85rem !important; }
    .f-link        { font-size: 0.85rem !important; }
    .f-contact-txt { font-size: 0.85rem !important; }
  }
  @media (min-width: 601px) and (max-width: 768px) {
    .f-wrap        { padding-top: 2.75rem !important; padding-bottom: 1.75rem !important; }
    .f-grid        { gap: 1.75rem !important; margin-bottom: 1.75rem !important; }
    .f-col-title   { font-size: 1.1rem !important; }
    .f-text        { font-size: 0.9rem !important; line-height: 1.6 !important; }
    .f-link        { font-size: 0.9rem !important; }
    .f-contact-txt { font-size: 0.9rem !important; }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .f-wrap        { padding-top: 3rem !important; padding-bottom: 2rem !important; }
    .f-container   { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
    .f-grid        { gap: 2rem !important; margin-bottom: 2rem !important; }
    .f-col-title   { font-size: 1.1rem !important; margin-bottom: 1rem !important; }
    .f-text        { font-size: 0.9rem !important; }
    .f-link        { font-size: 0.9rem !important; }
    .f-social-icon { width: 1.25rem !important; height: 1.25rem !important; }
    .f-contact-icon{ width: 1.1rem !important; height: 1.1rem !important; }
    .f-contact-txt { font-size: 0.9rem !important; }
  }
  @media (min-width: 1025px) and (max-width: 1280px) {
    .f-wrap        { padding-top: 3.5rem !important; padding-bottom: 2rem !important; }
    .f-container   { padding-left: 2rem !important; padding-right: 2rem !important; }
    .f-grid        { gap: 2.25rem !important; }
    .f-col-title   { font-size: 1.15rem !important; }
    .f-text        { font-size: 0.92rem !important; }
    .f-link        { font-size: 0.92rem !important; }
    .f-contact-txt { font-size: 0.92rem !important; }
  }
  @media (min-width: 1281px) and (max-width: 1919px) {
    .f-wrap        { padding-top: 4rem !important; padding-bottom: 2.25rem !important; }
    .f-container   { padding-left: 2.5rem !important; padding-right: 2.5rem !important; }
    .f-grid        { gap: 2.5rem !important; margin-bottom: 2.5rem !important; }
    .f-col-title   { font-size: 1.25rem !important; margin-bottom: 1.15rem !important; }
    .f-text        { font-size: 0.95rem !important; line-height: 1.65 !important; }
    .f-link        { font-size: 0.95rem !important; }
    .f-social-icon { width: 1.4rem !important; height: 1.4rem !important; }
    .f-contact-icon{ width: 1.2rem !important; height: 1.2rem !important; }
    .f-contact-txt { font-size: 0.95rem !important; }
    .f-copy        { font-size: 0.9rem !important; }
  }
  @media (min-width: 1920px) {
    .f-wrap        { padding-top: 4.5rem !important; padding-bottom: 2.5rem !important; }
    .f-container   { padding-left: 3rem !important; padding-right: 3rem !important; }
    .f-grid        { gap: 3rem !important; margin-bottom: 3rem !important; }
    .f-col-title   { font-size: 1.4rem !important; margin-bottom: 1.3rem !important; }
    .f-text        { font-size: 1.05rem !important; line-height: 1.7 !important; }
    .f-link        { font-size: 1.05rem !important; }
    .f-social-icon { width: 1.55rem !important; height: 1.55rem !important; }
    .f-social-row  { gap: 1.25rem !important; }
    .f-contact-icon{ width: 1.35rem !important; height: 1.35rem !important; }
    .f-contact-txt { font-size: 1.05rem !important; }
    .f-copy        { font-size: 1rem !important; }
  }
  @media (pointer: coarse) and (min-width: 321px) {
    .f-link, .f-social-anchor { min-height: 32px; display: inline-flex; align-items: center; }
  }
  .f-contact-txt { overflow-wrap: anywhere; }
  .f-contact-row a { display: inline-block; }
`;

const WHATSAPP_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.199-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.99-1.312A9.958 9.958 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z";

const Footer: React.FC = () => {
  return (
    <footer className="f-wrap bg-gray-900 text-gray-300 pt-8 sm:pt-10 md:pt-12 xl:pt-16 2xl:pt-20 pb-6 sm:pb-7 md:pb-8 xl:pb-10 overflow-x-hidden">
      <style>{FOOTER_STYLES}</style>

      <div className="f-container max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 2xl:px-12">
        <div className="f-grid grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8 xl:gap-10 mb-6 sm:mb-7 md:mb-8 xl:mb-10">

          {/* Company Info */}
          <div className="min-w-0">
            <h3 className="f-col-title text-white text-base sm:text-lg xl:text-xl font-bold mb-3 sm:mb-4">{COMPANY_NAME}</h3>
            <p className="f-text text-xs sm:text-sm xl:text-base text-gray-400 mb-3 sm:mb-4 leading-relaxed">
              Your trusted partner for all car maintenance and repair needs. Quality service, transparent pricing, and expert mechanics.
            </p>
            <div className="f-social-row flex space-x-3 sm:space-x-4">
              <a href="#" className="f-social-anchor text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="f-social-icon" size={20} />
              </a>
              <a href="https://www.instagram.com/vidyasagar.kasula.3?igsh=bTBjajZ6bTV1NHBl" target="_blank" rel="noreferrer" className="f-social-anchor text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="f-social-icon" size={20} />
              </a>
              <a href="https://wa.me/919948153518" target="_blank" rel="noreferrer" className="f-social-anchor text-gray-400 hover:text-white transition-colors" aria-label="Chat on WhatsApp">
                <svg className="f-social-icon" width="20" height="20" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                  <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.048 9.376L1.052 31.328l6.156-1.968A15.923 15.923 0 0 0 16.004 32C24.832 32 32 24.822 32 16S24.832 0 16.004 0Zm9.312 22.594c-.386 1.09-1.918 1.994-3.14 2.258-.836.178-1.928.32-5.604-1.204-4.702-1.948-7.73-6.726-7.966-7.036-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.166-3.416 1.636-3.896.386-.396.842-.576 1.284-.576.142 0 .27.008.386.014.47.02.706.048 1.016.79.386.93 1.328 3.226 1.44 3.46.114.234.228.552.07.862-.148.32-.28.462-.514.732-.234.27-.456.478-.69.768-.214.252-.456.522-.186.988.27.456 1.202 1.98 2.58 3.208 1.776 1.582 3.216 2.088 3.73 2.302.384.16.842.122 1.122-.176.356-.386.796-1.024 1.244-1.652.32-.452.724-.508 1.148-.348.432.15 2.72 1.284 3.19 1.518.47.234.78.346.896.542.114.196.114 1.126-.272 2.216Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="min-w-0">
            <h3 className="f-col-title text-white text-base sm:text-lg xl:text-xl font-bold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="f-list space-y-1.5 sm:space-y-2 text-xs sm:text-sm xl:text-base">
              <li><NavLink to="/" className="f-link hover:text-blue-400 transition-colors">Home</NavLink></li>
              <li><NavLink to="/about" className="f-link hover:text-blue-400 transition-colors">About Us</NavLink></li>
              <li><NavLink to="/services" className="f-link hover:text-blue-400 transition-colors">Services</NavLink></li>
              <li><NavLink to="/contact" className="f-link hover:text-blue-400 transition-colors">Contact Us</NavLink></li>
            </ul>
          </div>

          {/* Services */}
          <div className="min-w-0">
            <h3 className="f-col-title text-white text-base sm:text-lg xl:text-xl font-bold mb-3 sm:mb-4">Top Services</h3>
            <ul className="f-list space-y-1.5 sm:space-y-2 text-xs sm:text-sm xl:text-base">
              <li><span className="f-link text-gray-400">Periodic Maintenance</span></li>
              <li><span className="f-link text-gray-400">Denting & Painting</span></li>
              <li><span className="f-link text-gray-400">Wheel Alignment</span></li>
              <li><span className="f-link text-gray-400">Car Spa & Cleaning</span></li>
              <li><span className="f-link text-gray-400">AC Repair</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="min-w-0">
            <h3 className="f-col-title text-white text-base sm:text-lg xl:text-xl font-bold mb-3 sm:mb-4">Contact Info</h3>
            <ul className="f-list space-y-3 sm:space-y-4 text-xs sm:text-sm xl:text-base">
              <li className="f-contact-row flex items-start">
                <MapPin size={18} className="f-contact-icon mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="f-contact-txt">{COMPANY_ADDRESS}</span>
              </li>
              <li className="f-contact-row flex items-start">
                <Phone size={18} className="f-contact-icon mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                <span className="f-contact-txt flex flex-col gap-0.5">
                  {COMPANY_PHONE.split(',').map((num, i) => (
                    <a key={i} href={`tel:${num.trim().replace(/\s/g, '')}`} className="hover:text-white transition-colors">
                      {num.trim()}
                    </a>
                  ))}
                </span>
              </li>
              <li className="f-contact-row flex items-center">
                <Mail size={18} className="f-contact-icon mr-2 text-blue-500 flex-shrink-0" />
                <a href={`mailto:${COMPANY_EMAIL}`} className="f-contact-txt hover:text-white transition-colors">
                  {COMPANY_EMAIL}
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="f-divider border-t border-gray-800 pt-6 sm:pt-7 md:pt-8 xl:pt-10 mt-6 sm:mt-7 md:mt-8 xl:mt-10 text-center text-xs sm:text-sm xl:text-base text-gray-500">
          <p className="f-copy">&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;