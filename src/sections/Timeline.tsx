import React from 'react';
import { motion } from 'framer-motion';
import { Code, Atom, Server, Layers, Smartphone, Target } from 'lucide-react';

interface Milestone {
  icon: React.ReactNode;
  title: string;
  period: string;
  description: string;
  skills: string[];
}

const MILESTONES: Milestone[] = [
  {
    icon: <Code className="w-5 h-5" />,
    title: 'Learning Web Development',
    period: 'Phase 1: Foundations',
    description: 'Mastered the core building blocks of the web. Focused on semantic markup, responsive stylesheets, raw ES6 script logic, and building modular static websites.',
    skills: ['HTML5', 'CSS3', 'ES6 JavaScript', 'Responsive Layouts', 'Git Version Control']
  },
  {
    icon: <Atom className="w-5 h-5" />,
    title: 'React Development Integration',
    period: 'Phase 2: Frontend SPA',
    description: 'Transitioned to single-page applications. Explored React ecosystem components, state flows, client routing, hooks architecture, and Tailwind layout utilities.',
    skills: ['React JS', 'Tailwind CSS', 'Vite', 'Hooks API', 'State Management']
  },
  {
    icon: <Server className="w-5 h-5" />,
    title: 'Backend Engineering Systems',
    period: 'Phase 3: Server Side Logic',
    description: 'Engineered server services and web gateways. Learned Express endpoint mappings, token-based user authentication, password encryption, and caching mechanics.',
    skills: ['Node.js', 'Express.js', 'REST API Design', 'JWT Security', 'Redis Caching']
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: 'Full Stack Orchestrations',
    period: 'Phase 4: Database & Integration',
    description: 'Linked high-speed frontends with structured relational and non-relational database states. Handled migrations, complex joins, and deployment pipelines.',
    skills: ['PostgreSQL', 'MongoDB', 'Firebase', 'Vercel / Render', 'Data Normalization']
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: 'Mobile Application Engineering',
    period: 'Phase 5: Cross-Platform Apps',
    description: 'Utilized shared JavaScript logic structures to build interactive mobile products on iOS and Android with native responsive interfaces.',
    skills: ['React Native', 'Mobile UI Design', 'SQLite Storage', 'Push Notifications', 'Native Bridges']
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: 'Future R&D Goals',
    period: 'Ongoing: Advanced Mainframe',
    description: 'Focusing on distributed serverless edge runtime setups, vector databases for LLM integrations, and WebAssembly implementations for heavy calculation speeds.',
    skills: ['GraphQL', 'Next.js', 'Vector DBs', 'System Architectures', 'WebAssembly']
  }
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-20 bg-cyber-grid relative overflow-hidden">
      
      {/* Decorative vertical background line */}
      <div className="absolute top-0 bottom-0 left-[50%] -translate-x-[50%] w-[2px] bg-slate-200/50 dark:bg-cyan-500/10 hidden md:block" />

      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-slate-800 dark:text-white mb-4">
            &gt; DEVELOPMENT_JOURNEY
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Timeline Stack */}
        <div className="flex flex-col gap-12 relative">
          {MILESTONES.map((mil, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`flex flex-col md:flex-row items-center justify-between relative md:gap-8 ${
                  isLeft ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Node Dot */}
                <div className="absolute left-[50%] -translate-x-[50%] z-20 hidden md:flex items-center justify-center w-10 h-10 rounded-full border-2 border-cyan-400 bg-slate-900 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                  {mil.icon}
                </div>

                {/* Milestone Content Card */}
                <motion.div
                  className="w-full md:w-[45%] text-left"
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="glass-panel p-6 rounded-2xl border border-slate-200/50 dark:border-cyan-500/5 hover:border-cyan-500/15 relative">
                    
                    {/* Period Label */}
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1">
                      {mil.period}
                    </div>

                    {/* Title */}
                    <h3 className="font-orbitron font-bold text-slate-800 dark:text-white text-base md:text-lg mb-3">
                      {mil.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400 leading-relaxed mb-4">
                      {mil.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200/30 dark:border-cyan-500/5">
                      {mil.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200/30 dark:border-cyan-500/10 text-slate-600 dark:text-gray-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Empty Spacer column for grid layout alignment */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
