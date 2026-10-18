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
    <section id="home" className="relative pt-24 sm:pt-28 md:pt-36 pb-6 sm:pb-8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border-2 border-[#12110F] shadow-[3px_3px_0px_#12110F] mb-5 sm:mb-6 select-none max-w-full">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] sm:text-xs font-bold text-[#12110F] leading-tight">
              Open to internships, freelance & full-time roles
            </span>
          </div>

          {/* Headline with word rise & highlighter draw */}
          <h1 className="text-[clamp(2rem,7vw,2.75rem)] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-[#12110F] leading-[1.1] mb-5 sm:mb-6">
            <span className="flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-1">
              {words.map((word, i) => (
                <span key={i} className="inline-block">
                  {word}
                </span>
              ))}
              <span className="highlight-draw font-serif-italic font-normal text-[#12110F] px-1">
                real products.
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#12110F]/80 max-w-xl font-sans leading-relaxed mb-6 sm:mb-8">
            Third-year B.E. Computer Science student at Jaya Engineering College with 2 full-stack internships, 2000+ GitHub contributions, and Smart India Hackathon Web3 project leadership. Based in Chennai, India.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12 w-full sm:w-auto">
            <button
              onClick={() => handleScrollTo('contact')}
              className="neo-btn min-h-[48px] px-6 py-3.5 rounded-full bg-[#12110F] text-white font-display font-extrabold text-sm md:text-base flex items-center justify-center gap-2 cursor-pointer hover:bg-[#FFD84D] hover:text-[#12110F] transition-all"
              data-cursor="pointer"
            >
              <span>Hire me</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => (navigate ? navigate('/resume') : (window.location.href = '/resume'))}
              className="neo-btn min-h-[48px] px-6 py-3.5 rounded-full bg-white text-[#12110F] font-display font-extrabold text-sm md:text-base flex items-center justify-center gap-2 cursor-pointer hover:bg-[#D9CCFF] transition-all"
              data-cursor="pointer"
            >
              <span>Download resume</span>
              <FileDown className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Quick Stats Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 pt-5 sm:pt-6 border-t-2 border-[#12110F]/20 w-full max-w-lg">
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display text-[#12110F]">2000+</div>
              <div className="text-[10px] sm:text-xs md:text-sm font-mono text-[#12110F]/70 uppercase tracking-tight">GitHub Contribs</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display text-[#12110F]">20+</div>
              <div className="text-[10px] sm:text-xs md:text-sm font-mono text-[#12110F]/70 uppercase tracking-tight">Hackathons</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display text-[#12110F]">2</div>
              <div className="text-[10px] sm:text-xs md:text-sm font-mono text-[#12110F]/70 uppercase tracking-tight">Internships</div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Composite */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <HeroVisual />
        </div>
      </div>

      {/* Tilted Marquee Strip below Hero */}
      <MarqueeStrip />
    </section>
  );
}
