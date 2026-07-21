import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Award, Code, Compass, Zap } from 'lucide-react';
import ScrollFloat from '../components/ScrollFloat';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';

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

        {/* Scroll Stack for Achievements */}
        <ScrollStack
          useWindowScroll={true}
          itemDistance={80}
          itemScale={0.04}
          itemStackDistance={25}
          stackPosition="15%"
          scaleEndPosition="10%"
          baseScale={0.88}
          rotationAmount={0}
          blurAmount={2}
        >
          {STATS.map((stat, idx) => (
            <ScrollStackItem key={idx}>
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full h-full gap-6 md:gap-12">
                
                {/* Left side: Icon & Stat Counter */}
                <div className="flex flex-col items-center justify-center text-center md:w-1/3">
                  <div className="p-5 rounded-2xl bg-slate-100/50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-cyan-500/10 text-cyan-400 mb-4 flex items-center justify-center shadow-inner relative group transition-transform duration-300">
                    <div className="absolute inset-0 bg-cyan-500/10 dark:bg-cyan-500/5 blur-lg rounded-full" />
                    <div className="relative z-10">{stat.icon}</div>
                  </div>

                  <div className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-slate-800 dark:text-white tracking-tight">
                    <Counter target={stat.target} />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{stat.suffix}</span>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-slate-200 dark:via-cyan-500/10 to-transparent" />

                {/* Right side: Label & Details */}
                <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left md:w-2/3">
                  <h3 className="font-orbitron font-extrabold text-slate-700 dark:text-slate-200 text-lg md:text-xl tracking-wider uppercase mb-3">
                    {stat.label}
                  </h3>
                  <p className="text-sm md:text-base text-slate-500 dark:text-gray-400 leading-relaxed font-mono font-light">
                    {stat.desc}
                  </p>
                  
                  {/* Cybernetic details */}
                  <div className="mt-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 dark:text-cyan-500/60">
                      system_status: optimal
                    </span>
                  </div>
                </div>
                
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>

      </div>
    </section>
  );
}
