export default function MarqueeStrip() {
  const techItems = [
    'TYPESCRIPT',
    'MONGODB',
    'POSTGRESQL',
    'EXPRESS',
    'FIREBASE',
    'SOLIDITY',
    'REACT.JS',
    'NODE.JS',
    'REACT NATIVE',
    'TAILWIND CSS',
    'DOCKER',
    'PRISMA',
    'GIT & GITHUB',
    'VERCEL',
  ];

  return (
    <div className="w-full overflow-hidden py-3.5 md:py-4 bg-[#12110F] border-y-2 border-[#12110F] shadow-[0_4px_0px_#12110F] -rotate-1 select-none my-8 md:my-12">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...techItems, ...techItems, ...techItems, ...techItems].map((text, idx) => (
          <div key={idx} className="flex items-center gap-5 mx-5">
            <span className="font-display font-extrabold text-sm md:text-base text-white tracking-widest uppercase">
              {text}
            </span>
            <span className="text-[#FFD84D] text-base md:text-lg select-none">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
