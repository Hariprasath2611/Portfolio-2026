import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Award, Code, Compass, Zap } from 'lucide-react';
import ScrollFloat from '../components/ScrollFloat';

interface CounterProps {
  target: number;
  duration?: number;
}

function Counter({ target, duration = 1.5 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const totalMiliseconds = duration * 1000;
    const stepTime = Math.max(Math.floor(totalMiliseconds / end), 15);

    const timer = setInterval(() => {
      const increment = Math.ceil(end / (totalMiliseconds / stepTime));
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

const STATS = [
  {
    icon: <Zap className="w-8 h-8 text-cyan-400" />,
    target: 1840,
    label: 'GitHub Contributions',
    suffix: '+',
    desc: 'Commits, pull requests, and review merges in past years.'
  },
  {
    icon: <Code className="w-8 h-8 text-purple-400" />,
    target: 34,
    label: 'Repositories Completed',
    suffix: '',
    desc: 'Public and client projects, microservices, and web applications.'
  },
  {
    icon: <Compass className="w-8 h-8 text-cyan-400" />,
    target: 15,
    label: 'Technologies Mastered',
    suffix: '+',
    desc: 'Languages, UI styling kits, database drivers, and cloud tools.'
  },
  {
    icon: <Award className="w-8 h-8 text-purple-400" />,
    target: 120,
    label: 'Open Source Commits',
    suffix: '+',
    desc: 'Contributions submitted to shared packages and open source ecosystems.'
  }
];

export default function Achievements() {
  return (
    <section className="py-20 bg-cyber-grid relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16 flex flex-col items-center">
          <ScrollFloat
            containerClassName="mb-4"
            textClassName="text-3xl md:text-4xl font-bold font-orbitron text-slate-800 dark:text-white"
          >
            &gt; SYSTEM_ACHIEVEMENTS
          </ScrollFloat>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-white/40 dark:bg-[#0a0f1e]/80 backdrop-blur-md border border-slate-200/80 dark:border-cyan-500/10 shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50 dark:hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/5 group"
            >
              {/* Glow backdrop on hover */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 rounded-2xl transition-all duration-500 blur-xl" />

              {/* Icon */}
              <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-cyan-500/10 text-cyan-400 mb-4 flex items-center justify-center shadow-inner relative group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-cyan-500/10 dark:bg-cyan-500/5 blur-md rounded-full" />
                <div className="relative z-10">{stat.icon}</div>
              </div>

              {/* Stat Counter */}
              <div className="text-3xl md:text-4xl font-mono font-bold text-slate-800 dark:text-white tracking-tight mb-2">
                <Counter target={stat.target} />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{stat.suffix}</span>
              </div>

              {/* Label */}
              <h3 className="font-orbitron font-extrabold text-slate-700 dark:text-slate-200 text-sm md:text-base tracking-wider uppercase mb-2">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400 leading-relaxed font-mono font-light mb-4 flex-grow">
                {stat.desc}
              </p>
              
              {/* Cybernetic details */}
              <div className="mt-auto pt-4 border-t border-slate-200/30 dark:border-cyan-500/5 w-full flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 dark:text-cyan-500/60">
                  system_status: optimal
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
