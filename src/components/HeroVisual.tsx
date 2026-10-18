export default function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center w-full max-w-sm sm:max-w-md mx-auto py-6 sm:py-8">
      {/* 1. Morphing Organic Yellow Blob */}
      <div className="absolute w-[220px] h-[280px] xs:w-[260px] xs:h-[320px] sm:w-[290px] sm:h-[350px] md:w-[370px] md:h-[430px] bg-[#FFD84D] border-2 border-[#12110F] animate-blob shadow-[4px_4px_0px_#12110F] sm:shadow-[6px_6px_0px_#12110F] opacity-90 -rotate-3" />

      {/* 2. Smaller accent pastel blob */}
      <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#D9CCFF] border-2 border-[#12110F] shadow-[3px_3px_0px_#12110F] -z-0" />

      {/* 3. Arch Frame with Photo */}
      <div
        className="relative z-10 w-[210px] h-[280px] xs:w-[250px] xs:h-[330px] sm:w-[270px] sm:h-[360px] md:w-[320px] md:h-[420px] rounded-t-[120px] xs:rounded-t-[140px] sm:rounded-t-[160px] rounded-b-[24px] sm:rounded-b-[28px] border-3 border-[#12110F] bg-[#BBDDFF] overflow-hidden shadow-[6px_6px_0px_#12110F] sm:shadow-[8px_8px_0px_#12110F] flex items-end justify-center cursor-pointer group"
        data-cursor="hi"
      >
        <picture className="w-full h-full">
          <source type="image/webp" media="(max-width: 640px)" srcSet="/Photo%20one-sm.webp" />
          <source type="image/webp" srcSet="/Photo%20one.webp" />
          <img
            src="/Photo%20one.png"
            alt="D Hariprasath"
            width={320}
            height={420}
            className="w-full h-full object-cover object-[center_12%] scale-105 group-hover:scale-110 transition-transform duration-500"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Subtle bottom gradient shadow inside arch */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#12110F]/30 to-transparent pointer-events-none" />
      </div>

      {/* 4. Rotating Circular "OPEN TO WORK" Badge */}
      <div className="absolute -top-3 -right-2 xs:-top-4 xs:-right-4 md:-top-6 md:-right-6 z-20 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 select-none pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center animate-spin-slow">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="text-[9.5px] font-mono font-extrabold uppercase fill-[#12110F] tracking-widest">
              <textPath href="#circlePath">
                ★ OPEN TO WORK ★ SOFTWARE ENGINEER 
              </textPath>
            </text>
          </svg>
          <div className="absolute w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFD84D] border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] flex items-center justify-center font-bold text-xs text-[#12110F]">
            ⚡
          </div>
        </div>
      </div>

      {/* 5. Floating Tech Stickers */}
      {/* Top Left: React.js */}
      <div
        className="absolute top-8 -left-2 sm:top-10 sm:-left-6 md:-left-10 z-20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#BDF3D4] border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] sm:shadow-[3px_3px_0px_#12110F] font-mono font-bold text-[11px] sm:text-xs text-[#12110F] -rotate-6 select-none animate-float-1"
      >
        React.js
      </div>

      {/* Mid Left: TypeScript */}
      <div
        className="absolute top-28 -left-2 sm:top-36 sm:-left-8 md:-left-12 z-20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#D9CCFF] border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] sm:shadow-[3px_3px_0px_#12110F] font-mono font-bold text-[11px] sm:text-xs text-[#12110F] rotate-3 select-none animate-float-2"
      >
        TypeScript
      </div>

      {/* Bottom Right: Solidity */}
      <div
        className="absolute bottom-12 -right-2 sm:bottom-16 sm:-right-6 md:-right-8 z-20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#FFD0BC] border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] sm:shadow-[3px_3px_0px_#12110F] font-mono font-bold text-[11px] sm:text-xs text-[#12110F] rotate-6 select-none animate-float-1"
      >
        Solidity
      </div>

      {/* Top Right: Node.js */}
      <div
        className="absolute top-20 -right-2 sm:top-28 sm:-right-8 md:-right-10 z-20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#FFE585] border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] sm:shadow-[3px_3px_0px_#12110F] font-mono font-bold text-[11px] sm:text-xs text-[#12110F] -rotate-6 select-none animate-float-2"
      >
        Node.js
      </div>

      {/* 6. Sticky Note Card: "Now at Kotrelex (Intern)" */}
      <div
        className="absolute -bottom-5 left-1 sm:-bottom-6 sm:left-4 z-20 bg-white border-2 border-[#12110F] shadow-[3px_3px_0px_#12110F] sm:shadow-[4px_4px_0px_#12110F] rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-2.5 -rotate-2 sm:-rotate-3 select-none max-w-[90%]"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-[#12110F] shrink-0" />
        <div>
          <div className="font-mono text-[9px] sm:text-[10px] font-bold uppercase text-[#12110F]/60">Current Status</div>
          <div className="font-display font-extrabold text-xs sm:text-sm text-[#12110F]">
            Now at Kotrelex <span className="font-normal text-[11px] sm:text-xs text-slate-500">(Intern)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
