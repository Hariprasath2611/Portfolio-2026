import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layout, Server, Database, Smartphone, Award, Coffee, Zap } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: <Layout className="w-5 h-5 text-cyan-400" />,
    title: 'Frontend Engineering',
    desc: 'Creating highly interactive, fluid, responsive and pixel-perfect UIs with React, Tailwind CSS, and Framer Motion.'
  },
  {
    icon: <Server className="w-5 h-5 text-purple-400" />,
    title: 'Backend Development',
    desc: 'Designing robust, fast, and scalable backend infrastructures, microservices, and REST APIs using Node.js and Express.'
  },
  {
    icon: <Database className="w-5 h-5 text-cyan-400" />,
    title: 'Database Design',
    desc: 'Structuring efficient data schemas and index models using SQL (PostgreSQL) and NoSQL (MongoDB, Firebase).'
  },
  {
    icon: <Smartphone className="w-5 h-5 text-purple-400" />,
    title: 'Mobile Application Development',
    desc: 'Building performant, native-feeling cross-platform mobile apps for iOS and Android using React Native.'
  }
];

const TELEMETRY = [
  { label: 'Coffee Converted to Code', val: '1,450+ Litres', icon: <Coffee className="w-4 h-4 text-amber-500" /> },
  { label: 'Bugs Terminated', val: '2,800+', icon: <Zap className="w-4 h-4 text-cyan-400" /> },
  { label: 'Production Deployments', val: '45+', icon: <Cpu className="w-4 h-4 text-purple-400" /> },
  { label: 'Commit Success Rate', val: '99.2%', icon: <Award className="w-4 h-4 text-green-400" /> }
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-100/30 dark:bg-slate-950/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-slate-800 dark:text-white mb-4">
            &gt; ABOUT_ME
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Bio & Telemetry */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <motion.div
              className="glass-panel p-6 rounded-2xl text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold font-mono text-cyan-400 mb-4">
                [SYSTEM PROFILE: ACTIVE]
              </h3>
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-4">
                I am a dedicated and passionate Full Stack Developer focused on building clean, high-performance web and mobile solutions. With a firm grasp of both frontend interactive design and robust backend databases, I build complete systems from scratch.
              </p>
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                My approach focuses on solid engineering, writing testable modular code, and applying a continuous learning mindset. I am always exploring next-generation technologies to improve speed, performance, and responsive interfaces.
              </p>
            </motion.div>

            {/* Interactive Telemetry Dashboard */}
            <motion.div
              className="glass-panel p-6 rounded-2xl text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-sm font-bold font-mono uppercase tracking-widest text-slate-500 dark:text-gray-400 mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Developer Telemetry Stats
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TELEMETRY.map((stat, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-slate-200/50 dark:border-cyan-500/10 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-3"
                  >
                    <div className="p-2 rounded-lg bg-slate-200/55 dark:bg-gray-800 flex items-center justify-center">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-gray-500">
                        {stat.label}
                      </div>
                      <div className="text-base font-bold font-mono text-slate-800 dark:text-white">
                        {stat.val}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Pillars of Expertise */}
          <div className="lg:col-span-6 grid grid-cols-1 gap-6">
            {HIGHLIGHTS.map((item, idx) => (
              <motion.div
                key={idx}
                className="glass-card p-5 flex gap-4 text-left items-start group"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ x: 6 }}
              >
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-gray-900 border border-slate-200/30 dark:border-cyan-500/10 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-base font-bold font-orbitron tracking-wide text-slate-800 dark:text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
