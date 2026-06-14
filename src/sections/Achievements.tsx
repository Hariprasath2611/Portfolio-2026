import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Code, Compass, Zap } from 'lucide-react';

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
    icon: <Zap className="w-6 h-6 text-cyan-400" />,
    target: 1840,
    label: 'GitHub Contributions',
    suffix: '+',
    desc: 'Commits, pull requests, and review merges in past years.'
  },
  {
    icon: <Code className="w-6 h-6 text-purple-400" />,
    target: 34,
    label: 'Repositories Completed',
    suffix: '',
    desc: 'Public and client projects, microservices, and applications.'
  },
  {
    icon: <Compass className="w-6 h-6 text-cyan-400" />,
    target: 15,
    label: 'Technologies Mastered',
    suffix: '+',
    desc: 'Languages, UI styling kits, database drivers, and cloud tools.'
  },
  {
    icon: <Award className="w-6 h-6 text-purple-400" />,
    target: 120,
    label: 'Open Source Commits',
    suffix: '+',
    desc: 'Contributions submitted to shared packages and open systems.'
  }
];

export default function Achievements() {
  return (
    <section className="py-20 bg-cyber-grid relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-slate-800 dark:text-white mb-4">
            &gt; SYSTEM_ACHIEVEMENTS
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between items-center text-center border border-slate-200/50 dark:border-cyan-500/5 hover:border-cyan-500/15"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Icon Circle */}
              <div className="p-3.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/30 dark:border-cyan-500/10 text-cyan-400 mb-4 flex items-center justify-center">
                {stat.icon}
              </div>

              {/* Number with Counter */}
              <div className="text-3xl md:text-4xl font-mono font-bold text-slate-800 dark:text-white mb-2">
                <Counter target={stat.target} />
                <span className="text-cyan-400">{stat.suffix}</span>
              </div>

              {/* Label */}
              <h3 className="font-orbitron font-bold text-slate-700 dark:text-gray-300 text-xs tracking-wider uppercase mb-3">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-[11px] text-slate-500 dark:text-gray-400 leading-relaxed font-mono">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
