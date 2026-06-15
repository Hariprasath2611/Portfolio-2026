import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Terminal } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
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
];

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Track active section based on viewport position
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      let currentSection = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is near the top of the viewport
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'py-4 bg-slate-950/60 dark:bg-gray-950/60 backdrop-blur-md border-b border-cyan-500/10'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2 font-mono font-bold text-lg text-slate-800 dark:text-white group"
        >
          <Terminal className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            HARIPRASATH_D
          </span>
          <span className="text-cyan-400 animate-pulse">.dev</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative py-2 px-1 text-sm font-medium font-mono uppercase tracking-wider transition-colors duration-300 ${
                      isActive
                        ? 'text-cyan-400'
                        : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                        layoutId="activeNavIndicator"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Resume Download Button */}
          <a
            href="/public/Resume.pdf"
            download="Resume.pdf"
            className="px-4 py-2 rounded-lg border border-cyan-500/30 text-cyan-400 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(6,182,212,0.2)] font-mono text-xs font-bold transition-all duration-300"
          >
            RESUME
          </a>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-cyan-500/20 bg-slate-100/50 dark:bg-gray-900/50 text-slate-700 dark:text-cyan-400 hover:border-cyan-400 dark:hover:border-cyan-400 hover:text-cyan-400 dark:hover:text-cyan-400 cursor-pointer shadow-sm transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </nav>

        {/* Mobile Navbar Controls */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-cyan-500/20 bg-slate-100/50 dark:bg-gray-900/50 text-slate-700 dark:text-cyan-400 hover:text-cyan-400 hover:border-cyan-400 cursor-pointer transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-slate-200 dark:border-cyan-500/20 bg-slate-100/50 dark:bg-gray-900/50 text-slate-700 dark:text-cyan-400 hover:text-cyan-400 hover:border-cyan-400 cursor-pointer transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-x-0 top-[73px] bottom-0 z-30 bg-slate-950/95 dark:bg-gray-950/95 backdrop-blur-lg border-b border-cyan-500/10 flex flex-col items-center justify-center lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - 73px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ul className="flex flex-col gap-6 text-center">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`text-lg font-bold font-mono uppercase tracking-widest ${
                        isActive
                          ? 'text-cyan-400 text-shadow-glow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                );
              })}
              {/* Mobile Resume Link */}
              <motion.li
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.05 }}
              >
                <a
                  href="/public/Resume.pdf"
                  download="Resume.pdf"
                  className="inline-block mt-4 px-6 py-2.5 rounded-lg border border-cyan-400 text-cyan-400 font-bold font-mono text-sm tracking-widest uppercase hover:bg-cyan-500/10 transition-all duration-300"
                >
                  Download CV
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
