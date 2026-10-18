import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function TopScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [hoverPercent, setHoverPercent] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.round(Math.min(100, Math.max(0, (x / rect.width) * 100)));
    setHoverPercent(pct);
    setHoverX(x);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: percentage * maxScroll,
      behavior: 'smooth',
    });
  };

  return (
    <div
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverPercent(null)}
      className="fixed top-0 left-0 right-0 z-[100] h-[3.5px] bg-[#12110F]/10 cursor-pointer group select-none"
      role="progressbar"
      aria-label="Website scroll progress"
    >
      {/* Sleek Neo-Brutalist Progress Fill */}
      <motion.div
        className="h-full bg-[#FFD84D] origin-left border-r border-[#12110F] shadow-[0_1px_6px_rgba(255,216,77,0.8)] group-hover:bg-[#FFE585] transition-colors"
        style={{ scaleX }}
      />

      {/* Floating percentage tooltip on seek/hover */}
      {hoverPercent !== null && (
        <div
          className="absolute top-2.5 pointer-events-none -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#12110F] text-[#FFD84D] font-mono text-[10px] font-bold border border-[#FFD84D] shadow-[2px_2px_0px_#12110F] whitespace-nowrap z-[110]"
          style={{ left: `${hoverX}px` }}
        >
          {hoverPercent}%
        </div>
      )}
    </div>
  );
}
