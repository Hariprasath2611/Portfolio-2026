import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Terminal, Cpu, Database, Globe, Smartphone, FileDown } from 'lucide-react';
import DeveloperIllustration from '../components/DeveloperIllustration';
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons';
import LiquidEther from '../components/LiquidEther';

interface HeroProps {
  theme: 'light' | 'dark';
}

const ROLES = [
  'React Developer',
  'Node.js Developer',
  'Full Stack Engineer',
  'Mobile App Developer',
  'Open Source Enthusiast'
];

const DARK_COLORS = ['#06b6d4', '#6366f1', '#d946ef'];
const LIGHT_COLORS = ['#0284c7', '#4f46e5', '#a855f7'];

export default function Hero({ theme }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: number;
    const currentFullText = ROLES[roleIndex];

    const type = () => {
      if (isDeleting) {
        setDisplayedText((prev) => prev.substring(0, prev.length - 1));
      } else {
        setDisplayedText((prev) => currentFullText.substring(0, prev.length + 1));
      }

      let speed = isDeleting ? 40 : 100;

      if (!isDeleting && displayedText === currentFullText) {
        speed = 2000; // Pause at full text
        setIsDeleting(true);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        speed = 500; // Small pause before typing next
      }

      timer = window.setTimeout(type, speed);
    };

    timer = window.setTimeout(type, 100);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  const handleScrollTo = (id: string) => {
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
    <section
      id="home"
      className="relative min-h-[90vh] flex flex-col justify-center items-center pt-24 pb-12 overflow-hidden bg-cyber-grid bg-futuristic-mesh"
    >
      {/* Interactive Liquid Ether Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <LiquidEther
          colors={theme === 'dark' ? DARK_COLORS : LIGHT_COLORS}
          mouseForce={15}
          cursorSize={80}
          autoDemo={true}
          autoSpeed={0.4}
          autoIntensity={1.8}
        />
      </div>
      {/* Moving Matrix-like background lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-0 left-10 w-[1px] h-full bg-gradient-to-b from-cyan-400/50 via-cyan-400/5 to-transparent animate-matrix-rain duration-1000" />
        <div className="absolute top-0 left-[35%] w-[1px] h-full bg-gradient-to-b from-purple-400/50 via-purple-400/5 to-transparent animate-matrix-rain [animation-duration:15s] [animation-delay:2s]" />
        <div className="absolute top-0 left-[75%] w-[1px] h-full bg-gradient-to-b from-cyan-400/50 via-cyan-400/5 to-transparent animate-matrix-rain [animation-duration:12s] [animation-delay:4s]" />
        <div className="absolute top-0 right-20 w-[1px] h-full bg-gradient-to-b from-purple-400/50 via-purple-400/5 to-transparent animate-matrix-rain [animation-duration:18s] [animation-delay:1s]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">
        {/* Left Side Content */}
        <motion.div
          className="lg:col-span-7 flex flex-col text-center lg:text-left items-center lg:items-start"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Welcome Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-mono tracking-wider mb-6">
            <Terminal className="w-3.5 h-3.5" />
            <span>HELLO WORLD, PORTFOLIO INITIALIZED</span>
          </div>

          {/* Name & Title */}
          <h1 className="text-5xl md:text-7xl font-bold font-orbitron tracking-tight mb-2">
            <span className="text-slate-800 dark:text-white">D </span>
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent text-glow-cyan">
              Hariprasath
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl font-mono text-slate-600 dark:text-gray-400 mb-4 h-8 flex items-center gap-2">
            <span>&gt;</span>
            <span className="text-slate-700 dark:text-cyan-300 font-bold">{displayedText}</span>
            <span className="w-2 h-5 bg-cyan-400 animate-pulse" />
          </h2>

          <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 max-w-xl mb-8 leading-relaxed">
            Building modern web and mobile applications with scalable architecture and exceptional user experiences. Focused on clean code and interactive frontends.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
            <button
              onClick={() => handleScrollTo('projects')}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleScrollTo('contact')}
              className="px-6 py-3 rounded-lg border border-slate-300 dark:border-cyan-500/30 hover:border-cyan-400 bg-slate-100/50 dark:bg-gray-900/40 hover:bg-slate-200/50 dark:hover:bg-cyan-500/10 text-slate-800 dark:text-cyan-300 font-medium flex items-center gap-2 cursor-pointer transition-all duration-300"
            >
              <span>Contact Me</span>
              <MessageSquare className="w-4 h-4" />
            </button>

            <a
              href="/D_Hari_Prasath_Resume.pdf"
              download="D_Hari_Prasath_Resume.pdf"
              className="px-6 py-3 rounded-lg border border-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 dark:text-cyan-300 font-medium flex items-center gap-2 cursor-pointer transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.15)] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <span>Download CV</span>
              <FileDown className="w-4.5 h-4.5" />
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Hariprasath2611"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-slate-200 dark:border-cyan-500/20 bg-slate-100/50 dark:bg-slate-950/40 hover:border-cyan-400 dark:hover:border-cyan-400 text-slate-600 dark:text-gray-400 hover:text-cyan-400 dark:hover:text-cyan-400 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            <a
              href="https://linkedin.com/in/hariprasath2611"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-slate-200 dark:border-cyan-500/20 bg-slate-100/50 dark:bg-slate-950/40 hover:border-cyan-400 dark:hover:border-cyan-400 text-slate-600 dark:text-gray-400 hover:text-cyan-400 dark:hover:text-cyan-400 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Right Side Futuristic HUD illustration */}
        <motion.div
          className="lg:col-span-5 flex justify-center items-center w-full"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full max-w-[450px]">
            {/* Tech badges floating */}
            <motion.div
              className="absolute -top-4 -left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg glass-panel text-slate-700 dark:text-cyan-400 text-xs font-semibold"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full Stack</span>
            </motion.div>

            <motion.div
              className="absolute top-[40%] -right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg glass-panel text-slate-700 dark:text-purple-400 text-xs font-semibold"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            >
              <Database className="w-3.5 h-3.5 text-purple-400" />
              <span>Databases</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-2 left-[10%] z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg glass-panel text-slate-700 dark:text-cyan-400 text-xs font-semibold"
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Web Apps</span>
            </motion.div>

            <motion.div
              className="absolute top-[15%] right-0 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg glass-panel text-slate-700 dark:text-cyan-400 text-xs font-semibold"
              animate={{ x: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>React Native</span>
            </motion.div>

            <DeveloperIllustration theme={theme} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
