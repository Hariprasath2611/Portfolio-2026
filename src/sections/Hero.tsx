import { motion } from 'framer-motion';
import { ArrowUpRight, FileDown } from 'lucide-react';
import HeroVisual from '../components/HeroVisual';
import MarqueeStrip from '../components/MarqueeStrip';

interface HeroProps {
  navigate?: (to: string) => void;
}

export default function Hero({ navigate }: HeroProps) {
  const handleScrollTo = (id: string) => {
    if (navigate) {
      navigate(`#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  const words = ['Full', 'stack', 'developer', 'who', 'ships'];

  return (
    <section id="home" className="relative pt-28 md:pt-36 pb-8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#12110F] shadow-[3px_3px_0px_#12110F] mb-6 select-none"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs font-bold text-[#12110F]">
              Open to internships, freelance & full-time roles
            </span>
          </motion.div>

          {/* Headline with word rise & highlighter draw */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-[#12110F] leading-[1.1] mb-6">
            <span className="flex flex-wrap gap-x-3 gap-y-1">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="highlight-draw font-serif-italic font-normal text-[#12110F] px-1"
              >
                real products.
              </motion.span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-base sm:text-lg text-[#12110F]/80 max-w-xl font-sans leading-relaxed mb-8"
          >
            Third-year B.E. Computer Science student at Jaya Engineering College with 2 full-stack internships, 2000+ GitHub contributions, and Smart India Hackathon Web3 project leadership. Based in Chennai, India.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <button
              onClick={() => handleScrollTo('contact')}
              className="neo-btn px-6 py-3.5 rounded-full bg-[#12110F] text-white font-display font-extrabold text-sm md:text-base flex items-center gap-2 cursor-pointer hover:bg-[#FFD84D] hover:text-[#12110F] transition-all"
              data-cursor="pointer"
            >
              <span>Hire me</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => (navigate ? navigate('/resume') : (window.location.href = '/resume'))}
              className="neo-btn px-6 py-3.5 rounded-full bg-white text-[#12110F] font-display font-extrabold text-sm md:text-base flex items-center gap-2 cursor-pointer hover:bg-[#D9CCFF] transition-all"
              data-cursor="pointer"
            >
              <span>Download resume</span>
              <FileDown className="w-4 h-4" />
            </button>
          </motion.div>

          {/* 3 Quick Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="grid grid-cols-3 gap-3 md:gap-6 pt-6 border-t-2 border-[#12110F]/20 w-full max-w-lg"
          >
            <div>
              <div className="text-2xl md:text-3xl font-extrabold font-display text-[#12110F]">2000+</div>
              <div className="text-xs md:text-sm font-mono text-[#12110F]/70 uppercase tracking-tight">GitHub Contribs</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold font-display text-[#12110F]">20+</div>
              <div className="text-xs md:text-sm font-mono text-[#12110F]/70 uppercase tracking-tight">Hackathons</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold font-display text-[#12110F]">2</div>
              <div className="text-xs md:text-sm font-mono text-[#12110F]/70 uppercase tracking-tight">Internships</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Visual Composite */}
        <div className="lg:col-span-5 flex justify-center">
          <HeroVisual />
        </div>
      </div>

      {/* Tilted Marquee Strip below Hero */}
      <MarqueeStrip />
    </section>
  );
}
