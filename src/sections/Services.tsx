import { motion } from 'framer-motion';
import { Layout, Server, Database, Smartphone, Cloud, Cpu, CheckCircle } from 'lucide-react';
import TiltedCard from '../components/TiltedCard';

const SERVICES = [
  {
    icon: <Cpu className="w-6 h-6 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />,
    title: 'Full Stack Development',
    desc: 'End-to-end custom web application engineering using modern SPA frontends (React) and robust backend servers.',
    features: ['Custom SPA architectures', 'API integrations', 'Responsive layouts', 'State management'],
    bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
  },
  {
    icon: <Layout className="w-6 h-6 text-purple-400 group-hover:text-cyan-400 transition-colors duration-300" />,
    title: 'Frontend Development',
    desc: 'Creating interactive, highly performant interfaces with smooth transitions, CSS animations, and optimal core web vitals.',
    features: ['HTML5/CSS3/JS/TS templates', 'Tailwind/SCSS styling systems', 'Framer Motion micro-animations', 'Cross-browser responsive testing'],
    bgImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80'
  },
  {
    icon: <Server className="w-6 h-6 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />,
    title: 'Backend Development',
    desc: 'Building scalable server infrastructures, microservices, and rest gateways utilizing secure token systems.',
    features: ['NodeJS/Express gateways', 'RESTful API creation', 'JSON Web Token authentication', 'Caching engines (Redis)'],
    bgImage: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80'
  },
  {
    icon: <Database className="w-6 h-6 text-purple-400 group-hover:text-cyan-400 transition-colors duration-300" />,
    title: 'Database Design',
    desc: 'Designing optimized relational and document schema patterns, minimizing latency on heavy read/write database requests.',
    features: ['PostgreSQL & MongoDB structures', 'Index query speed-ups', 'Data sync architectures', 'Firebase integration'],
    bgImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'
  },
  {
    icon: <Smartphone className="w-6 h-6 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />,
    title: 'Mobile Development',
    desc: 'Programming fluid cross-platform iOS and Android apps with shared code bases for quick deployment times.',
    features: ['React Native framework', 'Native API access modules', 'Offline client data storage', 'App Store publication assistance'],
    bgImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80'
  },
  {
    icon: <Cloud className="w-6 h-6 text-purple-400 group-hover:text-cyan-400 transition-colors duration-300" />,
    title: 'Deployment & Optimization',
    desc: 'Hosting applications on cloud environments, setting up automatic deployments (CI/CD), and optimizing bundle sizes.',
    features: ['Vercel, Netlify, Render setups', 'Vite build speed optimizations', 'SEO meta injections', 'PageSpeed core optimizations'],
    bgImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80'
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
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="w-full h-full flex justify-center"
            >
              <TiltedCard
                imageSrc={srv.bgImage}
                altText={srv.title}
                containerHeight="380px"
                containerWidth="100%"
                imageHeight="380px"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.04}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <div className="w-full h-full p-6 flex flex-col justify-between rounded-[15px] bg-slate-900/80 dark:bg-slate-950/85 backdrop-blur-[1px] border border-white/10 dark:border-cyan-500/10 text-white select-none">
                    <div>
                      {/* Icon Circle */}
                      <div className="p-3.5 rounded-xl bg-slate-800/60 dark:bg-slate-900/60 border border-white/10 dark:border-cyan-500/20 text-cyan-400 inline-flex mb-5 group-hover:text-purple-400 transition-colors duration-300">
                        {srv.icon}
                      </div>

                      <h3 className="font-orbitron font-bold text-white text-lg tracking-wide mb-3">
                        {srv.title}
                      </h3>

                      <p className="text-xs md:text-sm text-slate-300 dark:text-gray-300 leading-relaxed mb-6">
                        {srv.desc}
                      </p>
                    </div>

                    {/* Feature bullet list */}
                    <ul className="flex flex-col gap-2.5 pt-4 border-t border-white/10 dark:border-cyan-500/10">
                      {srv.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-300 dark:text-gray-300">
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

