import React from 'react';
import { Terminal, Github, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-cyan-500/10 bg-slate-100/30 dark:bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side logo info */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, 'home')}
            className="flex items-center gap-2 font-mono font-bold text-sm text-slate-800 dark:text-white group"
          >
            <Terminal className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              HARI_PRASATH
            </span>
            <span className="text-cyan-400">.dev</span>
          </a>
          <p className="text-[10px] text-slate-500 dark:text-gray-500 font-mono text-center md:text-left">
            © {new Date().getFullYear()} D Hari Prasath. All rights reserved.
          </p>
        </div>

        {/* Center: Quick navigation links */}
        <ul className="flex flex-wrap justify-center gap-6 text-[10px] font-mono font-bold uppercase tracking-wider">
          <li>
            <a href="#home" onClick={(e) => handleScrollTo(e, 'home')} className="text-slate-500 dark:text-gray-400 hover:text-cyan-400 transition-colors">Home</a>
          </li>
          <li>
            <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="text-slate-500 dark:text-gray-400 hover:text-cyan-400 transition-colors">About</a>
          </li>
          <li>
            <a href="#skills" onClick={(e) => handleScrollTo(e, 'skills')} className="text-slate-500 dark:text-gray-400 hover:text-cyan-400 transition-colors">Skills</a>
          </li>
          <li>
            <a href="#projects" onClick={(e) => handleScrollTo(e, 'projects')} className="text-slate-500 dark:text-gray-400 hover:text-cyan-400 transition-colors">Projects</a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')} className="text-slate-500 dark:text-gray-400 hover:text-cyan-400 transition-colors">Contact</a>
          </li>
        </ul>

        {/* Right: Social & Tech Credit */}
        <div className="flex flex-col items-center md:items-end gap-3">
          {/* Socials */}
          <div className="flex items-center gap-4 text-slate-500 dark:text-gray-400">
            <a
              href="https://github.com/Hariprasath2611"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://linkedin.com/in/hariprasath2611"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://instagram.com/hari_prasath"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>
          </div>

          <div className="text-[9px] font-mono text-slate-400 dark:text-gray-500">
            Built with <span className="text-cyan-400 font-bold">React</span> + <span className="text-cyan-400 font-bold">Tailwind v4</span> + <span className="text-purple-400 font-bold">Framer Motion</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
