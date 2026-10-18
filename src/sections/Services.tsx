import { motion } from 'framer-motion';
import { Check, Cpu, Layout, Server, Database, Smartphone, ShieldCheck, Zap } from 'lucide-react';

const SERVICES = [
  {
    num: '01',
    title: 'Full Stack Web Applications',
    icon: <Cpu className="w-5 h-5 text-[#12110F]" />,
    bgColor: 'bg-[#D9CCFF]', // Lavender
    desc: 'End-to-end custom web engineering using React, TypeScript, and Node.js with responsive architectures and smooth interactions.',
    features: [
      'Custom React SPA architectures',
      'Pixel-perfect neo-brutalist & modern UIs',
      'Global state management (Zustand/Context)',
      'Cross-browser optimization & SEO readiness',
    ],
  },
  {
    num: '02',
    title: 'Mobile App Development',
    icon: <Smartphone className="w-5 h-5 text-[#12110F]" />,
    bgColor: 'bg-[#BDF3D4]', // Mint
    desc: 'Cross-platform iOS and Android mobile applications engineered with React Native and Expo for fast performance.',
    features: [
      'React Native & Expo ecosystem',
      'Offline-first SQLite local caching',
      'Real-time background sync pipelines',
      'Native device hardware integration',
    ],
  },
  {
    num: '03',
    title: 'REST APIs & Backend Gateways',
    icon: <Server className="w-5 h-5 text-[#12110F]" />,
    bgColor: 'bg-[#FFD0BC]', // Peach
    desc: 'Robust server-side infrastructures and microservices powered by Node.js, Express, and secure authentication.',
    features: [
      'RESTful API specification & versioning',
      'JWT token authentication & RBAC security',
      'Input validation & error boundary handlers',
      'Redis caching & rate limiting middleware',
    ],
  },
  {
    num: '04',
    title: 'Database Architecture & Modeling',
    icon: <Database className="w-5 h-5 text-[#12110F]" />,
    bgColor: 'bg-[#BBDDFF]', // Sky
    desc: 'Optimized schema design and index structuring across relational (PostgreSQL) and document (MongoDB) databases.',
    features: [
      'PostgreSQL relational normalization',
      'MongoDB document schemas & pipelines',
      'Prisma ORM migrations & type safety',
      'High-throughput read/write query tuning',
    ],
  },
  {
    num: '05',
    title: 'Web3 & Smart Contract Solutions',
    icon: <ShieldCheck className="w-5 h-5 text-[#12110F]" />,
    bgColor: 'bg-[#FFE585]', // Butter
    desc: 'Decentralized identity systems and verifiable credentials with Solidity smart contracts and zero-knowledge proofs.',
    features: [
      'W3C Decentralized Identifiers (DIDs)',
      'Verifiable Credential issuance & verify',
      'Solidity smart contract development',
      'IPFS decentralized file storage integration',
    ],
  },
  {
    num: '06',
    title: 'Code Audits & Performance',
    icon: <Zap className="w-5 h-5 text-[#12110F]" />,
    bgColor: 'bg-[#D9CCFF]', // Lavender
    desc: 'Deep inspection of frontend and backend codebases to eliminate latency, reduce bundle size, and elevate Lighthouse scores.',
    features: [
      'Lighthouse 95+ Core Web Vitals audit',
      'Bundle chunk splitting & lazy-loading',
      'WCAG 2.1 accessibility compliance',
      'Automated testing pipeline setup',
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12110F] text-white text-xs font-mono font-bold tracking-wider mb-4 shadow-[2px_2px_0px_#12110F]">
          05 / SERVICES
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[#12110F]">
          How I can <span className="font-serif-italic font-normal">help your team.</span>
        </h2>
        <p className="text-[#12110F]/70 font-sans mt-3 text-base max-w-xl">
          Six focused capabilities delivered with production rigour, clear documentation, and transparent communication.
        </p>
      </div>

      {/* 6 Numbered Pastel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((srv, idx) => (
          <motion.div
            key={srv.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className={`neo-card ${srv.bgColor} p-6 sm:p-7 flex flex-col justify-between`}
          >
            <div>
              {/* Card Top: Number pill + Icon */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono font-extrabold text-sm px-3 py-1 rounded-full bg-[#12110F] text-white shadow-[2px_2px_0px_#12110F]">
                  {srv.num}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] flex items-center justify-center">
                  {srv.icon}
                </div>
              </div>

              {/* Title & Desc */}
              <h3 className="text-xl font-display font-extrabold text-[#12110F] mb-3 leading-snug">
                {srv.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#12110F]/80 leading-relaxed mb-6">
                {srv.desc}
              </p>

              {/* Bullet Features */}
              <ul className="space-y-2 pt-4 border-t-2 border-[#12110F]/15">
                {srv.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 text-xs font-sans text-[#12110F]/90">
                    <span className="p-0.5 mt-0.5 rounded-full bg-[#12110F] text-white">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
