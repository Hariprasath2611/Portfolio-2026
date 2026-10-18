import { motion } from 'framer-motion';
import { Layers, Server, Smartphone, Database, ShieldCheck, Wrench } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  bgColor: string;
  skills: string[];
}

const CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Engineering',
    icon: <Layers className="w-5 h-5 text-[#12110F]" />,
    bgColor: 'bg-[#D9CCFF]', // Lavender
    skills: ['React.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Vite', 'HTML5', 'CSS3', 'Framer Motion', 'Responsive Design'],
  },
  {
    title: 'Backend & APIs',
    icon: <Server className="w-5 h-5 text-[#12110F]" />,
    bgColor: 'bg-[#BDF3D4]', // Mint
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Security', 'Microservices', 'Middleware', 'Prisma ORM'],
  },
  {
    title: 'Mobile Development',
    icon: <Smartphone className="w-5 h-5 text-[#12110F]" />,
    bgColor: 'bg-[#FFD0BC]', // Peach
    skills: ['React Native', 'Expo', 'SQLite', 'Offline-First Sync', 'Mobile Navigation', 'Cross-Platform UI'],
  },
  {
    title: 'Databases & Storage',
    icon: <Database className="w-5 h-5 text-[#12110F]" />,
    bgColor: 'bg-[#BBDDFF]', // Sky
    skills: ['MongoDB', 'PostgreSQL', 'SQLite', 'Firebase', 'Data Modeling', 'Schema Migration'],
  },
  {
    title: 'Web3 & Advanced Tech',
    icon: <ShieldCheck className="w-5 h-5 text-[#12110F]" />,
    bgColor: 'bg-[#FFE585]', // Butter
    skills: ['Solidity', 'W3C DIDs', 'Verifiable Credentials', 'IPFS Storage', 'Groth16 ZK Proofs', 'Smart Contracts'],
  },
  {
    title: 'DevOps & Tooling',
    icon: <Wrench className="w-5 h-5 text-[#12110F]" />,
    bgColor: 'bg-[#D9CCFF]', // Lavender
    skills: ['Git', 'GitHub', 'Docker', 'Postman', 'Vercel', 'Render', 'VS Code', 'Automated Testing'],
  },
];

export default function TechStack() {
  return (
    <section id="skills" className="py-20 md:py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12110F] text-white text-xs font-mono font-bold tracking-wider mb-4 shadow-[2px_2px_0px_#12110F]">
          02 / SKILLS
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[#12110F]">
          The stack <span className="font-serif-italic font-normal">I rely on.</span>
        </h2>
        <p className="text-[#12110F]/70 font-sans mt-3 text-sm sm:text-base max-w-xl">
          Clean, production-tested technologies chosen for performance, stability, and developer velocity.
        </p>
      </div>

      {/* Grouped Pastel Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className={`neo-card ${cat.bgColor} p-5 sm:p-6 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] flex items-center justify-center">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-display font-extrabold text-[#12110F]">
                  {cat.title}
                </h3>
              </div>

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white rounded-lg border-2 border-[#12110F] font-mono text-xs font-bold text-[#12110F] shadow-[2px_2px_0px_#12110F] hover:bg-[#FFD84D] hover:-translate-y-0.5 transition-all select-none cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
