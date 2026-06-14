import { motion } from 'framer-motion';
import { Layout, Server, Database, Smartphone, Cloud, Cpu, CheckCircle } from 'lucide-react';

const SERVICES = [
  {
    icon: <Cpu className="w-6 h-6 text-cyan-400" />,
    title: 'Full Stack Development',
    desc: 'End-to-end custom web application engineering using modern SPA frontends (React) and robust backend servers.',
    features: ['Custom SPA architectures', 'API integrations', 'Responsive layouts', 'State management']
  },
  {
    icon: <Layout className="w-6 h-6 text-purple-400" />,
    title: 'Frontend Development',
    desc: 'Creating interactive, highly performant interfaces with smooth transitions, CSS animations, and optimal core web vitals.',
    features: ['HTML5/CSS3/JS/TS templates', 'Tailwind/SCSS styling systems', 'Framer Motion micro-animations', 'Cross-browser responsive testing']
  },
  {
    icon: <Server className="w-6 h-6 text-cyan-400" />,
    title: 'Backend Development',
    desc: 'Building scalable server infrastructures, microservices, and rest gateways utilizing secure token systems.',
    features: ['NodeJS/Express gateways', 'RESTful API creation', 'JSON Web Token authentication', 'Caching engines (Redis)']
  },
  {
    icon: <Database className="w-6 h-6 text-purple-400" />,
    title: 'Database Design',
    desc: 'Designing optimized relational and document schema patterns, minimizing latency on heavy read/write database requests.',
    features: ['PostgreSQL & MongoDB structures', 'Index query speed-ups', 'Data sync architectures', 'Firebase integration']
  },
  {
    icon: <Smartphone className="w-6 h-6 text-cyan-400" />,
    title: 'Mobile Development',
    desc: 'Programming fluid cross-platform iOS and Android apps with shared code bases for quick deployment times.',
    features: ['React Native framework', 'Native API access modules', 'Offline client data storage', 'App Store publication assistance']
  },
  {
    icon: <Cloud className="w-6 h-6 text-purple-400" />,
    title: 'Deployment & Optimization',
    desc: 'Hosting applications on cloud environments, setting up automatic deployments (CI/CD), and optimizing bundle sizes.',
    features: ['Vercel, Netlify, Render setups', 'Vite build speed optimizations', 'SEO meta injections', 'PageSpeed core optimizations']
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-slate-100/30 dark:bg-slate-950/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-slate-800 dark:text-white mb-4">
            &gt; MY_SERVICES
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {SERVICES.map((srv, idx) => (
            <motion.div
              key={idx}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-slate-200/50 dark:border-cyan-500/5 hover:border-cyan-500/20 group"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div>
                {/* Icon Circle */}
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/30 dark:border-cyan-500/10 text-cyan-400 inline-flex mb-5 group-hover:text-purple-400 transition-colors duration-300">
                  {srv.icon}
                </div>

                <h3 className="font-orbitron font-bold text-slate-800 dark:text-white text-lg tracking-wide mb-3">
                  {srv.title}
                </h3>

                <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400 leading-relaxed mb-6">
                  {srv.desc}
                </p>
              </div>

              {/* Feature bullet list */}
              <ul className="flex flex-col gap-2.5 pt-4 border-t border-slate-200/30 dark:border-cyan-500/5">
                {srv.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-gray-400">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
