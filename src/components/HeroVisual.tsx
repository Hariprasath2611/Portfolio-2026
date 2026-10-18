import { motion } from 'framer-motion';

export default function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center w-full max-w-md mx-auto py-8">
      {/* 1. Morphing Organic Yellow Blob */}
      <div className="absolute w-[290px] h-[350px] md:w-[370px] md:h-[430px] bg-[#FFD84D] border-2 border-[#12110F] animate-blob shadow-[6px_6px_0px_#12110F] opacity-90 -rotate-3" />

      {/* 2. Smaller accent pastel blob */}
      <div className="absolute -bottom-4 -left-6 w-24 h-24 rounded-full bg-[#D9CCFF] border-2 border-[#12110F] shadow-[3px_3px_0px_#12110F] -z-0" />

      {/* 3. Arch Frame with Photo */}
      <div
        className="relative z-10 w-[270px] h-[360px] md:w-[320px] md:h-[420px] rounded-t-[160px] rounded-b-[28px] border-3 border-[#12110F] bg-[#BBDDFF] overflow-hidden shadow-[8px_8px_0px_#12110F] flex items-end justify-center cursor-pointer group"
        data-cursor="hi"
      >
        <img
          src="/Photo%20one.png"
          alt="D Hariprasath"
          className="w-full h-full object-cover object-[center_12%] scale-105 group-hover:scale-110 transition-transform duration-500"
          loading="eager"
        />

        {/* Subtle bottom gradient shadow inside arch */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#12110F]/30 to-transparent pointer-events-none" />
      </div>

      {/* 4. Rotating Circular "OPEN TO WORK" Badge */}
      <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 z-20 w-24 h-24 md:w-28 md:h-28 select-none pointer-events-none">
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
          <div className="absolute w-8 h-8 rounded-full bg-[#FFD84D] border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] flex items-center justify-center font-bold text-xs text-[#12110F]">
            ⚡
          </div>
        </div>
      </div>

      {/* 5. Floating Tech Stickers */}
      {/* Top Left: React.js */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 -left-6 md:-left-10 z-20 px-3 py-1.5 rounded-xl bg-[#BDF3D4] border-2 border-[#12110F] shadow-[3px_3px_0px_#12110F] font-mono font-bold text-xs text-[#12110F] -rotate-6 select-none"
      >
        React.js
      </motion.div>

      {/* Mid Left: TypeScript */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-36 -left-8 md:-left-12 z-20 px-3 py-1.5 rounded-xl bg-[#D9CCFF] border-2 border-[#12110F] shadow-[3px_3px_0px_#12110F] font-mono font-bold text-xs text-[#12110F] rotate-3 select-none"
      >
        TypeScript
      </motion.div>

      {/* Bottom Right: Solidity */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-16 -right-6 md:-right-8 z-20 px-3 py-1.5 rounded-xl bg-[#FFD0BC] border-2 border-[#12110F] shadow-[3px_3px_0px_#12110F] font-mono font-bold text-xs text-[#12110F] rotate-6 select-none"
      >
        Solidity
      </motion.div>

      {/* Top Right: Node.js */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute top-28 -right-8 md:-right-10 z-20 px-3 py-1.5 rounded-xl bg-[#FFE585] border-2 border-[#12110F] shadow-[3px_3px_0px_#12110F] font-mono font-bold text-xs text-[#12110F] -rotate-6 select-none"
      >
        Node.js
      </motion.div>

      {/* 6. Sticky Note Card: "Now at Kotrelex (Intern)" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute -bottom-6 left-2 md:left-4 z-20 bg-white border-2 border-[#12110F] shadow-[4px_4px_0px_#12110F] rounded-2xl px-4 py-2.5 flex items-center gap-2.5 -rotate-3 select-none"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-[#12110F]" />
        <div>
          <div className="font-mono text-[10px] font-bold uppercase text-[#12110F]/60">Current Status</div>
          <div className="font-display font-extrabold text-xs md:text-sm text-[#12110F]">
            Now at Kotrelex <span className="font-normal text-xs text-slate-500">(Intern)</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
