import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-8 pb-[calc(env(safe-area-inset-bottom,0px)+2rem)] bg-[#12110F] text-[#F4F1EA] border-t-2 border-[#12110F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        {/* Left: Brand */}
        <div className="flex items-center gap-2.5 min-h-[44px]">
          <div className="w-7 h-7 rounded-full bg-[#FFD84D] text-[#12110F] font-display font-extrabold flex items-center justify-center text-xs border border-[#12110F]">
            HP
          </div>
          <span className="font-display font-bold text-sm text-white tracking-tight">
            D Hariprasath
          </span>
        </div>

        {/* Center info */}
        <div className="text-slate-400 text-center py-1">
          Full Stack Developer · Chennai, India · 2026
        </div>

        {/* Right: Back to top */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 text-white hover:text-[#FFD84D] transition-colors cursor-pointer font-bold min-h-[44px] px-3 py-2 rounded-lg"
          data-cursor="pointer"
          aria-label="Scroll back to top"
        >
          <span>Back to top</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
