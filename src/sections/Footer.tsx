import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 bg-[#12110F] text-[#F4F1EA] border-t-2 border-[#12110F]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FFD84D] text-[#12110F] font-display font-extrabold flex items-center justify-center text-[10px] border border-[#12110F]">
            HP
          </div>
          <span className="font-display font-bold text-sm text-white tracking-tight">
            D Hariprasath
          </span>
        </div>

        {/* Center info */}
        <div className="text-slate-400 text-center">
          Full Stack Developer · Chennai, India · 2026
        </div>

        {/* Right: Back to top */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-white hover:text-[#FFD84D] transition-colors cursor-pointer font-bold"
          data-cursor="pointer"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
