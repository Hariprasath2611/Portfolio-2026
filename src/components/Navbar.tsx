import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (to: string) => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'GitHub', href: '#github' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
  { label: 'Resume', href: '/resume', isPill: true },
];

export default function Navbar({ currentPath, navigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (currentPath === '/resume') return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'github', 'projects', 'services', 'timeline', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    navigate(href);
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto bg-[#F4F1EA]/95 backdrop-blur-md border-2 border-[#12110F] shadow-[4px_4px_0px_#12110F] rounded-full px-4 md:px-6 py-2.5 flex items-center justify-between gap-4 md:gap-8 max-w-5xl w-full">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center gap-2.5 group cursor-pointer"
          data-cursor="pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#12110F] text-[#FFD84D] font-display font-extrabold flex items-center justify-center text-xs border border-[#12110F] group-hover:rotate-6 transition-transform">
            HP
          </div>
          <span className="font-display font-bold text-base md:text-lg text-[#12110F] tracking-tight">
            Hariprasath
          </span>
        </a>

        {/* Desktop Nav Items */}
        <ul className="hidden lg:flex items-center gap-1.5 md:gap-2">
          {NAV_ITEMS.map((item) => {
            const isResume = item.href === '/resume';
            const isActive = isResume ? currentPath === '/resume' : activeSection === item.href.substring(1);

            if (item.isPill) {
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`px-3.5 py-1 rounded-full font-mono text-xs font-bold border-2 border-[#12110F] transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#FFD84D] text-[#12110F] shadow-[2px_2px_0px_#12110F]'
                        : 'bg-white/80 hover:bg-[#FFD84D] text-[#12110F] shadow-[2px_2px_0px_#12110F]'
                    }`}
                    data-cursor="pointer"
                  >
                    {item.label}
                  </a>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`px-2.5 py-1 rounded-lg font-sans text-xs md:text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#12110F] font-bold underline decoration-2 decoration-[#FFD84D] underline-offset-4'
                      : 'text-[#12110F]/70 hover:text-[#12110F]'
                  }`}
                  data-cursor="pointer"
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Hire Me CTA Button */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="neo-btn inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#12110F] text-white hover:bg-[#FFD84D] hover:text-[#12110F] font-display font-bold text-xs md:text-sm cursor-pointer"
            data-cursor="pointer"
          >
            <span>Hire me</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1.5 rounded-full border-2 border-[#12110F] bg-white text-[#12110F] shadow-[2px_2px_0px_#12110F] cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-16 inset-x-4 bg-[#F4F1EA] border-2 border-[#12110F] shadow-[6px_6px_0px_#12110F] rounded-3xl p-6 lg:hidden flex flex-col gap-4 z-50"
          >
            <div className="flex justify-between items-center pb-3 border-b-2 border-[#12110F]">
              <span className="font-display font-extrabold text-sm uppercase tracking-wider text-[#12110F]">
                Navigation
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full border-2 border-[#12110F] bg-[#FFD84D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ul className="grid grid-cols-2 gap-2 text-center">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`block py-2.5 px-3 rounded-xl border-2 border-[#12110F] font-mono text-xs font-bold shadow-[2px_2px_0px_#12110F] ${
                      item.isPill ? 'bg-[#FFD84D] text-[#12110F]' : 'bg-white hover:bg-[#D9CCFF]'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="neo-btn w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#12110F] text-white font-display font-bold text-sm"
              >
                <span>Hire me directly</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
