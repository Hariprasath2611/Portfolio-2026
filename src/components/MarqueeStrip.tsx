export default function MarqueeStrip() {
  const items = [
    'FULL-STACK DEV',
    'OPEN SOURCE',
    'SIH 2026 HACKATHON LEAD',
    'REACT & REACT NATIVE',
    'WEB3 & DIDS',
    'NODE.JS & POSTGRESQL',
    '2000+ GITHUB COMMITS',
    'CLEAN CODE & ACCESSIBILITY',
    'OFFLINE-FIRST ARCHITECTURE',
  ];

  return (
    <div className="w-full overflow-hidden py-3 bg-[#FFD84D] border-y-2 border-[#12110F] shadow-[0_4px_0px_#12110F] -rotate-1 select-none my-8 md:my-12">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-4 mx-4">
            <span className="font-display font-extrabold text-sm md:text-base text-[#12110F] uppercase tracking-wider">
              {text}
            </span>
            <span className="text-[#12110F] text-xs font-bold">★</span>
          </div>
        ))}
      </div>
    </div>
  );
}
