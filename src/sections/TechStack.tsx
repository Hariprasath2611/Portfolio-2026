import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollFloat from '../components/ScrollFloat';

interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'mobile' | 'tools';
  color: string; // brand neon color
  logo: React.ReactNode;
}

const CATEGORIES = [
  { id: 'all', label: 'ALL_MODULES' },
  { id: 'frontend', label: 'FRONTEND' },
  { id: 'backend', label: 'BACKEND' },
  { id: 'database', label: 'DATABASES' },
  { id: 'mobile', label: 'MOBILE' },
  { id: 'tools', label: 'TOOLS' }
];

const TECHNOLOGIES: Technology[] = [
  // Frontend
  {
    name: 'HTML5',
    category: 'frontend',
    color: 'rgba(240, 101, 41, 0.4)',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L12 24l-8.59-2.437L1.5 0zm16.59 7.632H7.22l.21 2.3h10.42l-.46 5.12L12 16.354l-5.38-1.3-.28-3.085h2.29l.15 1.62 3.22.82 3.22-.82.34-3.69H4.88L4.33 4.29h14.33l-.57 3.342z"/>
      </svg>
    )
  },
  {
    name: 'CSS3',
    category: 'frontend',
    color: 'rgba(33, 76, 229, 0.4)',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L12 24l-8.59-2.437L1.5 0zm16.48 7.375h-9.98l.21 2.3h9.56l-.46 5.12L12 16.12l-5.38-1.3-.28-3.09h2.29l.15 1.62 3.22.82 3.22-.82.35-3.69H4.63L4.08 4.03h14.47l-.57 3.345z"/>
      </svg>
    )
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    color: 'rgba(247, 223, 30, 0.4)',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.268c-.156-.99-.756-1.7-2.078-2.223-.658-.277-1.423-.459-1.902-.74-.282-.17-.415-.419-.39-.756.02-.325.21-.54.67-.614.514-.092.939.136 1.152.53.078.147.124.31.254.393.373.239.886.046.992-.387.154-.627.014-1.248-.456-1.748-.483-.51-1.147-.756-2.049-.756-1.127 0-1.93.365-2.44 1.053-.27.362-.39.81-.335 1.29.123.948.749 1.522 1.749 1.956.732.316 1.61.547 2.012.885.306.258.46.542.385.932-.092.483-.51.78-1.203.73-.623-.046-1.036-.362-1.229-.836-.093-.222-.242-.327-.474-.294-.33.047-.557.251-.607.585-.1.667.162 1.313.656 1.716.599.49 1.428.667 2.404.57 1.203-.122 2.029-.711 2.378-1.758.006-.025.01-.05.016-.075zM8.952 17.227c-.035-.578-.237-.996-.612-1.3-.396-.322-.924-.447-1.603-.437-.599.01-1.025.178-1.32.545-.333.414-.42 1.026-.26 1.566.232.793.856 1.17 1.8 1.148.692-.016 1.152-.274 1.352-.822.062-.17.11-.355.228-.475.29-.297.77-.203.882.203.09.317.027.641-.122.923-.418.8-1.173 1.217-2.158 1.258-1.225.05-2.228-.455-2.656-1.577-.24-.62-.24-1.285.022-1.926.4-.98 1.272-1.54 2.333-1.578 1.191-.043 2.107.412 2.585 1.543.082.193.125.405.239.534.283.321.782.215.892-.192.115-.424.032-.831-.174-1.213z"/>
      </svg>
    )
  },
  {
    name: 'React',
    category: 'frontend',
    color: 'rgba(97, 218, 251, 0.4)',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 8.353c-2.316 0-3.329.832-4.043 2.494 1.072-.083 1.857.167 2.358.75.39.458.536 1.066.67 1.704.256 1.223.55 2.628 2.015 2.628 2.316 0 3.329-.833 4.043-2.494-1.072.083-1.857-.167-2.358-.75-.39-.458-.536-1.066-.67-1.704-.256-1.223-.55-2.628-2.015-2.628zm-6 3.647c-2.316 0-3.329.832-4.043 2.494 1.072-.083 1.857.167 2.358.75.39.458.536 1.066.67 1.704.256 1.223.55 2.628 2.015 2.628 2.316 0 3.329-.833 4.043-2.494-1.072.083-1.857-.167-2.358-.75-.39-.458-.536-1.066-.67-1.704-.256-1.223-.55-2.628-2.015-2.628z"/>
      </svg>
    )
  },
  {
    name: 'Vite',
    category: 'frontend',
    color: 'rgba(189, 52, 254, 0.4)',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.914 1.877L12 .397l-7.914 1.48L0 8.097l12 15.506 12-15.506-4.086-6.22zM12 21.053L3.109 9.557l3.818-4.81L12 8.441l5.073-3.694 3.818 4.81L12 21.053z"/>
      </svg>
    )
  },
  // Backend
  {
    name: 'Node.js',
    category: 'backend',
    color: 'rgba(67, 133, 61, 0.4)',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L2.392 5.548v11.08L12 22.176l9.608-5.548v-11.08L12 0zm7.818 15.57l-7.818 4.514-7.818-4.514v-9.028l7.818-4.514 7.818 4.514v9.028zM10.82 8.41H9.422V13.88h1.398V8.41zm3.758 0h-1.398v3.136l-1.69-3.136H9.988v5.47h1.398V11.23l1.702 3.14h1.536V8.41z"/>
      </svg>
    )
  },
  {
    name: 'Express.js',
    category: 'backend',
    color: 'rgba(128, 128, 128, 0.4)',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm19.984 15.82c-.08-.946-.666-1.576-1.846-2.023-.55-.224-1.127-.375-1.517-.557-.225-.138-.344-.325-.333-.564.015-.226.17-.377.532-.437.42-.08.766.113.945.422.062.115.1.234.197.294.295.188.7-.015.786-.34.12-.5-.015-.99-.377-1.396-.395-.412-.937-.6-1.673-.6-.917 0-1.564.288-1.975.833-.217.288-.314.646-.264 1.028.1.758.599 1.218 1.397 1.564.585.253 1.286.438 1.61.704.246.206.37.433.308.745-.074.386-.408.623-.962.584-.5-.037-.83-.288-.985-.668-.075-.178-.194-.262-.38-.236-.264.037-.446.2-.486.468-.08.533.13 1.05.525 1.372.479.392 1.142.533 1.922.456.963-.098 1.624-.568 1.903-1.406.005-.02.008-.04.013-.06zM8.91 14.8c-.03-.462-.19-.796-.49-.974-.316-.258-.739-.358-1.282-.35-.479.008-.82.142-1.056.436-.266.33-.336.82-.208 1.25.186.634.685.936 1.44.918.554-.012.922-.219 1.082-.657.05-.136.088-.284.182-.38.232-.238.616-.162.706.162.072.254.022.513-.098.739-.334.64-.938.974-1.726 1.006-.98.04-1.782-.364-2.125-1.262-.192-.496-.192-1.028.018-1.54.32-.784 1.018-1.232 1.866-1.262.953-.034 1.686.33 2.068 1.234.066.154.1.324.19.427.226.257.626.172.714-.154.092-.34.026-.665-.14-.97z"/>
      </svg>
    )
  },
  // Databases
  {
    name: 'MongoDB',
    category: 'database',
    color: 'rgba(71, 162, 72, 0.4)',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-.39 0-3.32 5.09-3.32 8.78 0 3.73 2.12 6.74 3.32 8.22 1.2-1.48 3.32-4.49 3.32-8.22C15.32 5.09 12.39 0 12 0zm0 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM7 19h10v2H7v-2z"/>
      </svg>
    )
  },
  {
    name: 'PostgreSQL',
    category: 'database',
    color: 'rgba(51, 103, 145, 0.4)',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
      </svg>
    )
  },
  {
    name: 'Firebase',
    category: 'database',
    color: 'rgba(255, 202, 40, 0.4)',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.89 19.91L5.94 6.76l8.85 13.15H3.89zm13.79-1.3L12.3 3.91l-2.06 4.1 7.44 10.6zM20.11 19.91l-2.05-4.1-1.03-2.05 3.08 6.15h.01z"/>
      </svg>
    )
  },
  // Mobile
  {
    name: 'React Native',
    category: 'mobile',
    color: 'rgba(97, 218, 251, 0.4)',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z"/>
      </svg>
    )
  },
  // Tools
  {
    name: 'Git',
    category: 'tools',
    color: 'rgba(240, 80, 50, 0.4)',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.126 0L8.71 2.68l3.35 3.351a3.072 3.072 0 0 1 3.518 3.518l3.352 3.351a3.072 3.072 0 0 1-3.518 3.518L10.93 13.067a3.072 3.072 0 0 1-3.518-3.518L4.06 6.197 1.066 9.191a1.5 1.5 0 0 0 0 2.126l10.479 10.479a1.5 1.5 0 0 0 2.126 0l10.875-10.875a1.5 1.5 0 0 0 0-2.126h.001z"/>
      </svg>
    )
  },
  {
    name: 'GitHub',
    category: 'tools',
    color: 'rgba(255, 255, 255, 0.4)',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.646.64.699 1.026 1.592 1.026 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.478-10-10-10z"/>
      </svg>
    )
  },
  {
    name: 'Vercel',
    category: 'tools',
    color: 'rgba(255, 255, 255, 0.4)',
    logo: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 22.525H0L12 1.475l12 21.05z"/>
      </svg>
    )
  }
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredTechs = TECHNOLOGIES.filter(
    (tech) => activeTab === 'all' || tech.category === activeTab
  );

  return (
    <section id="skills" className="py-20 bg-cyber-grid relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16 flex flex-col items-center">
          <ScrollFloat
            containerClassName="mb-4"
            textClassName="text-3xl md:text-4xl font-bold font-orbitron text-slate-800 dark:text-white"
          >
            &gt; TECH_STACK
          </ScrollFloat>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider cursor-pointer border transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-white/40 dark:bg-gray-900/40 border-slate-200 dark:border-cyan-500/10 text-slate-600 dark:text-gray-400 hover:border-cyan-500/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid of Tech Cards */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          layout
        >
          {filteredTechs.map((tech) => (
            <motion.div
              key={tech.name}
              className="glass-card p-6 flex flex-col items-center justify-center aspect-square gap-4 cursor-pointer relative group overflow-hidden border border-slate-200/50 dark:border-cyan-500/10"
              layout
              whileHover={{
                y: -6,
                borderColor: tech.color.replace('0.4', '1'),
                boxShadow: `0 0 20px ${tech.color}`,
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Outer decorative line corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-transparent group-hover:border-cyan-400 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-transparent group-hover:border-purple-400 transition-colors" />

              {/* Logo container */}
              <div className="text-slate-600 dark:text-gray-300 group-hover:text-cyan-400 dark:group-hover:text-cyan-300 transition-colors duration-300">
                {tech.logo}
              </div>

              {/* Name */}
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300 group-hover:text-white">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
