import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { COMPANY_NAME } from '../constants';
import Logo from '../pages/assests/logo.png';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

/* ─── Responsive breakpoint styles ────────────────────────────────────── */
const NAVBAR_STYLES = `
  /* ── ⌚ Smartwatch  180px – 240px ───────────────────────────────── */
  @media (max-width: 240px) {
    .n-container   { padding-left: 0.4rem !important; padding-right: 0.4rem !important; }
    .n-row         { height: 2.4rem !important; }
    .n-logo-box    { width: 1.5rem !important; height: 1.5rem !important; border-radius: 0.35rem !important; }
    .n-logo-icon   { width: 0.85rem !important; height: 0.85rem !important; }
    .n-logo-text   { font-size: 0.65rem !important; letter-spacing: 0 !important; gap: 0.25rem !important; }
    .n-logo-link   { gap: 0.3rem !important; }
    .n-theme-btn   { padding: 0.25rem !important; border-radius: 0.35rem !important; margin-right: 0.35rem !important; }
    .n-theme-icon  { width: 0.85rem !important; height: 0.85rem !important; }
    .n-menu-btn    { padding: 0.25rem !important; border-radius: 0.35rem !important; }
    .n-menu-icon   { width: 1rem !important; height: 1rem !important; }
    .n-mobile-pad  { padding: 0.35rem !important; }
    .n-mobile-link { padding: 0.4rem 0.5rem !important; font-size: 0.7rem !important; border-radius: 0.35rem !important; }
  }

  /* ── 📱 Mobile S  241px – 320px ─────────────────────────────────── */
  @media (min-width: 241px) and (max-width: 320px) {
    .n-container   { padding-left: 0.65rem !important; padding-right: 0.65rem !important; }
    .n-row         { height: 3rem !important; }
    .n-logo-box    { width: 2rem !important; height: 2rem !important; }
    .n-logo-icon   { width: 1.6rem !important; height: 1.6rem !important; }
    .n-logo-text   { font-size: 0.85rem !important; }
    .n-theme-btn   { padding: 0.35rem !important; margin-right: 0.5rem !important; }
    .n-theme-icon  { width: 1rem !important; height: 1rem !important; }
    .n-menu-btn    { padding: 0.35rem !important; }
    .n-menu-icon   { width: 1.2rem !important; height: 1.2rem !important; }
    .n-mobile-link { padding: 0.5rem 0.65rem !important; font-size: 0.8rem !important; }
  }

  /* ── 📱 Mobile M  321px – 480px ─────────────────────────────────── */
  @media (min-width: 321px) and (max-width: 480px) {
    .n-row         { height: 3.5rem !important; }
    .n-logo-box    { width: 2.25rem !important; height: 2.25rem !important; }
    .n-logo-icon   { width: 1.85rem !important; height: 1.85rem !important; }
    .n-logo-text   { font-size: 1.05rem !important; }
    .n-mobile-link { padding: 0.6rem 0.75rem !important; font-size: 0.9rem !important; }
  }

  /* ── 📱 Phablet  481px – 600px ──────────────────────────────────── */
  @media (min-width: 481px) and (max-width: 600px) {
    .n-row         { height: 3.75rem !important; }
    .n-logo-text   { font-size: 1.15rem !important; }
  }

  /* ── 📟 Tablet Portrait  601px – 768px ──────────────────────────── */
  @media (min-width: 601px) and (max-width: 768px) {
    .n-row         { height: 4rem !important; }
    .n-logo-text   { font-size: 1.2rem !important; }
  }

  /* ── 📟 Tablet Landscape  769px – 1024px ────────────────────────── */
  @media (min-width: 769px) and (max-width: 1024px) {
    .n-row         { height: 4rem !important; }
    .n-container   { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
    .n-logo-text   { font-size: 1.25rem !important; }
    .n-link        { padding: 0.5rem 0.7rem !important; font-size: 0.85rem !important; }
  }

  /* ── 💻 Small Laptop  1025px – 1280px ───────────────────────────── */
  @media (min-width: 1025px) and (max-width: 1280px) {
    .n-row         { height: 4.25rem !important; }
    .n-container   { padding-left: 2rem !important; padding-right: 2rem !important; }
    .n-logo-text   { font-size: 1.3rem !important; }
    .n-link        { padding: 0.55rem 0.85rem !important; font-size: 0.9rem !important; }
  }

  /* ── 🖥️ Large Laptop / Desktop  1281px – 1919px ─────────────────── */
  @media (min-width: 1281px) and (max-width: 1919px) {
    .n-row         { height: 4.5rem !important; }
    .n-container   { padding-left: 2.5rem !important; padding-right: 2.5rem !important; }
    .n-logo-box    { width: 2.75rem !important; height: 2.75rem !important; }
    .n-logo-icon   { width: 2.35rem !important; height: 2.35rem !important; }
    .n-logo-text   { font-size: 1.4rem !important; }
    .n-link        { padding: 0.6rem 1rem !important; font-size: 0.95rem !important; }
    .n-theme-btn   { padding: 0.6rem !important; }
    .n-theme-icon  { width: 1.35rem !important; height: 1.35rem !important; }
  }

  /* ── 🖥️ Ultra-wide / 4K  1920px+ ────────────────────────────────── */
  @media (min-width: 1920px) {
    .n-row         { height: 5rem !important; }
    .n-container   { padding-left: 3rem !important; padding-right: 3rem !important; }
    .n-logo-box    { width: 3rem !important; height: 3rem !important; }
    .n-logo-icon   { width: 2.55rem !important; height: 2.55rem !important; }
    .n-logo-text   { font-size: 1.6rem !important; }
    .n-link        { padding: 0.7rem 1.2rem !important; font-size: 1.05rem !important; }
    .n-theme-btn   { padding: 0.7rem !important; }
    .n-theme-icon  { width: 1.5rem !important; height: 1.5rem !important; }
  }

  /* ── Touch target safety (any pointer-coarse device) ──────────── */
  @media (pointer: coarse) and (min-width: 321px) {
    .n-menu-btn, .n-theme-btn { min-width: 40px; min-height: 40px; }
    .n-mobile-link            { min-height: 40px; display: flex; align-items: center; }
  }

  /* ── Prevent logo text overflow on extreme small widths ───────── */
  @media (max-width: 320px) {
    .n-logo-text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60%; }
  }
`;

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

const [isScrolled, setIsScrolled] = useState<boolean>(false);
const DARK_HERO_ROUTES = ['/', '/contact', '/about','/works'];

const hasDarkHero = DARK_HERO_ROUTES.includes(location.pathname);

useEffect(() => {
  const onScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  return () => window.removeEventListener('scroll', onScroll);
}, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
// Show solid nav if: scrolled, mobile menu open, OR current page has no dark hero
const showSolid = isScrolled || isOpen || !hasDarkHero;

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Our Works', path: '/works' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (

    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        showSolid
          ? 'bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-md'
          : 'bg-transparent border-b border-transparent'
      }`
    }
    >
      <style>{NAVBAR_STYLES}</style>
      <div className="n-container max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 2xl:px-12">
        <div className="n-row flex justify-between items-center h-14 sm:h-16 xl:h-18">
          {/* Logo Section */}
          <div className="flex items-center min-w-0 flex-shrink">
            <NavLink to="/" className="n-logo-link flex-shrink-0 flex items-center gap-1.5 sm:gap-2 group min-w-0">
              <div className="n-logo-box flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 xl:w-11 xl:h-11 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-500 group-hover:shadow-md transition-all duration-200">
                <img
                  src={Logo}
                  alt="Surya Motors logo"
                  className="n-logo-icon w-6 h-6 sm:w-8 sm:h-8 xl:w-9 xl:h-9 object-contain"
                  loading="eager"
                />
              </div>
              {/* Logo text swaps color between transparent/solid states */}
              <span
                className={`n-logo-text font-bold text-base sm:text-xl xl:text-2xl tracking-tight hidden sm:block transition-colors duration-300 ${
                  showSolid ? 'text-gray-900 dark:text-white' : 'text-white'
                }`}
              >
                SURYA{' '}
                <span className={showSolid ? 'text-blue-600' : 'text-blue-300'}>
                  MOTORS
                </span>
              </span>
              <span
                className={`n-logo-text font-bold text-base tracking-tight sm:hidden transition-colors duration-300 ${
                  showSolid ? 'text-gray-900 dark:text-white' : 'text-white'
                }`}
              >
                SURYA
              </span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `n-link px-3 py-2 rounded-md text-sm xl:text-base font-medium transition-colors duration-200 whitespace-nowrap ${
                    isActive
                    ? showSolid
  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
  : 'text-white border-b-2 border-blue-400'
                      : showSolid
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`n-theme-btn p-2 rounded-lg focus:outline-none transition-colors ${
                showSolid
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="n-theme-icon" size={20} /> : <Moon className="n-theme-icon" size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center flex-shrink-0">
            <button
              onClick={toggleTheme}
              className={`n-theme-btn mr-2 sm:mr-4 p-1.5 sm:p-2 rounded-lg focus:outline-none transition-colors ${
                showSolid
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="n-theme-icon" size={20} /> : <Moon className="n-theme-icon" size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className={`n-menu-btn inline-flex items-center justify-center p-1.5 sm:p-2 rounded-md focus:outline-none transition-colors ${
                showSolid
                  ? 'text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="n-menu-icon" size={24} /> : <Menu className="n-menu-icon" size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown — always solid so items are readable */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="n-mobile-pad px-2 sm:px-3 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `n-mobile-link block px-3 py-2 rounded-md text-sm sm:text-base font-medium ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;