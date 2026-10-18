import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Search, Star, GitFork, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { fetchGitHubStarredRepos } from '../utils/github';
import type { GitHubRepo } from '../utils/github';
import { GithubIcon } from '../components/BrandIcons';

interface FeaturedProject {
  id: string;
  counter: string;
  tag: string;
  title: string;
  bgColor: string;
  problem: string;
  solution: string;
  keyNumbers: { label: string; value: string }[];
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'bharosa',
    counter: '01 / 04',
    tag: 'SMART INDIA HACKATHON 2026 FLAGSHIP',
    title: 'BHAROSA: Decentralized Identity & Asset Platform',
    bgColor: 'bg-[#D9CCFF]', // Lavender
    problem:
      'Centralized identity verification causes single-point data breaches, impersonation fraud, and unauthorized credential tracking.',
    solution:
      'Led Team LuminaryForge to build a privacy-first Web3 platform utilizing W3C DIDs, Verifiable Credentials, 6 Solidity smart contracts, AES-256-GCM encryption with IPFS storage, and Groth16 zero-knowledge proofs for trustless verification.',
    keyNumbers: [
      { label: 'Automated Tests', value: '96' },
      { label: 'Smart Contracts', value: '6' },
      { label: 'Privacy Proofs', value: 'Groth16 ZK' },
      { label: 'Cloud Deployment', value: 'Vercel + Render' },
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Solidity', 'IPFS', 'Groth16 ZK'],
    githubUrl: 'https://github.com/Hariprasath2611/SIH26125-LuminaryForge',
    liveUrl: 'https://github.com/Hariprasath2611/SIH26125-LuminaryForge',
  },
  {
    id: 'ccr',
    counter: '02 / 04',
    tag: 'CAMPUS INFRASTRUCTURE & OFFLINE-FIRST',
    title: 'Course Coverage Report (CCR) Management System',
    bgColor: 'bg-[#FFD0BC]', // Peach
    problem:
      'Jaya Engineering College faculty previously tracked course progress using slow manual spreadsheets and physical registers, causing delayed audit reports.',
    solution:
      'Built an offline-first mobile (React Native / Expo) and web system that caches lesson progress in SQLite and automatically syncs to MongoDB once online. Includes multi-role access (Admin, HOD, Faculty), JWT authentication, and automated PDF progress report export.',
    keyNumbers: [
      { label: 'Offline Caching', value: '100% SQLite' },
      { label: 'Sync Mechanism', value: 'Auto-Sync' },
      { label: 'Export Format', value: 'Instant PDF' },
      { label: 'User Roles', value: 'Admin / HOD / Staff' },
    ],
    tags: ['React Native', 'Expo', 'Node.js', 'Prisma', 'MongoDB', 'SQLite', 'JWT'],
    githubUrl: 'https://github.com/Hariprasath2611/CCR-App',
  },
  {
    id: 'eliteshop',
    counter: '03 / 04',
    tag: 'FULL-STACK COMMERCE',
    title: 'EliteStore: High-Performance Commerce Platform',
    bgColor: 'bg-[#BDF3D4]', // Mint
    problem:
      'Modern online storefronts need instant search, synchronized cart state across refreshes, and resilient order submission pipelines.',
    solution:
      'Engineered an end-to-end full-stack e-commerce web application featuring categorized product catalogs, dynamic cart calculations, token authentication, and order lifecycle management.',
    keyNumbers: [
      { label: 'Architecture', value: 'Full-Stack SPA' },
      { label: 'Database', value: 'MongoDB Atlas' },
      { label: 'State Sync', value: 'Persistent Cart' },
      { label: 'API Security', value: 'JWT Middleware' },
    ],
    tags: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Hariprasath2611',
  },
  {
    id: 'buildspace',
    counter: '04 / 04',
    tag: 'AI DEVELOPER TOOLS',
    title: 'BuildSpace AI & StartupForge',
    bgColor: 'bg-[#BBDDFF]', // Sky
    problem:
      'Engineers and founders waste hundreds of hours configuring boilerplate and structuring initial system blueprints.',
    solution:
      'Designed an intelligent scaffolding assistant that generates modular frontend setups, structured REST models, and production-ready architectural diagrams.',
    keyNumbers: [
      { label: 'Scaffolding', value: 'Multi-Framework' },
      { label: 'Generation Time', value: '< 2.5s' },
      { label: 'Templates', value: 'React + Node' },
      { label: 'UI System', value: 'Neo-Brutalist' },
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'Vite', 'AI APIs', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Hariprasath2611',
  },
];

function StackingCard({ project, index, total }: { project: FeaturedProject; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <div
      ref={cardRef}
      className="sticky w-full mb-8 transition-transform will-change-transform"
      style={{
        top: `calc(90px + ${index * 26}px)`,
        zIndex: index + 10,
      }}
      data-cursor="view"
    >
      <motion.div
        style={{ scale }}
        className={`neo-card ${project.bgColor} p-6 sm:p-8 md:p-10 flex flex-col justify-between`}
      >
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#12110F]/20 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#12110F] text-xs font-mono font-bold text-[#12110F] shadow-[2px_2px_0px_#12110F]">
            <span>{project.tag}</span>
          </div>
          <div className="font-mono text-sm font-extrabold text-[#12110F] px-3 py-1 rounded-full bg-[#12110F] text-white">
            {project.counter}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-[#12110F] mb-6">
          {project.title}
        </h3>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border-2 border-[#12110F] shadow-[3px_3px_0px_#12110F]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-red-700 mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>The Problem</span>
            </div>
            <p className="font-sans text-sm sm:text-base text-[#12110F]/85 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border-2 border-[#12110F] shadow-[3px_3px_0px_#12110F]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-emerald-700 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>What I Built</span>
            </div>
            <p className="font-sans text-sm sm:text-base text-[#12110F]/85 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Key Numbers Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {project.keyNumbers.map((num, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-white/80 border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] text-center"
            >
              <div className="font-display font-extrabold text-lg sm:text-xl text-[#12110F]">
                {num.value}
              </div>
              <div className="font-mono text-[10px] sm:text-xs uppercase text-[#12110F]/70 mt-0.5">
                {num.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Pills & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t-2 border-[#12110F]/20">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-white rounded-lg border-2 border-[#12110F] font-mono text-xs font-bold text-[#12110F] shadow-[2px_2px_0px_#12110F]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#12110F] text-white hover:bg-[#FFD84D] hover:text-[#12110F] font-display font-bold text-xs sm:text-sm cursor-pointer"
              data-cursor="pointer"
            >
              <Github className="w-4 h-4" />
              <span>Source Code</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#12110F] hover:bg-[#FFD84D] font-display font-bold text-xs sm:text-sm cursor-pointer"
                data-cursor="pointer"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    async function loadRepos() {
      try {
        const repoData = await fetchGitHubStarredRepos('Hariprasath2611');
        setRepos(repoData);
      } catch (err) {
        console.error('Failed to load GitHub repos', err);
      }
    }
    loadRepos();
  }, []);

  const filteredRepos = repos.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description?.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeCategory === 'all') return matchesSearch;
    if (activeCategory === 'mobile') {
      return matchesSearch && (r.topics?.includes('mobile') || r.topics?.includes('react-native'));
    }
    if (activeCategory === 'web') {
      return matchesSearch && (r.language === 'TypeScript' || r.language === 'JavaScript');
    }
    return matchesSearch;
  });

  return (
    <section id="projects" className="py-20 md:py-28 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12110F] text-white text-xs font-mono font-bold tracking-wider mb-4 shadow-[2px_2px_0px_#12110F]">
          04 / PROJECTS
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[#12110F]">
          Work that <span className="font-serif-italic font-normal">gets to work.</span>
        </h2>
        <p className="text-[#12110F]/70 font-sans mt-3 text-base max-w-xl">
          Scroll through featured case studies built with full-stack architectures, followed by open-source repositories.
        </p>
      </div>

      {/* MUST-HAVE EFFECT 1: STACK SCROLL CARDS */}
      <div className="relative pb-12">
        {FEATURED_PROJECTS.map((proj, idx) => (
          <StackingCard
            key={proj.id}
            project={proj}
            index={idx}
            total={FEATURED_PROJECTS.length}
          />
        ))}
      </div>

      {/* Additional GitHub Repositories Grid */}
      <div className="mt-20 pt-16 border-t-2 border-[#12110F]/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-display font-extrabold text-[#12110F]">
              More Repositories on GitHub
            </h3>
            <p className="text-sm text-[#12110F]/70 font-sans">
              Explore open source libraries, tools, and experimental builds.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#12110F]/50" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border-2 border-[#12110F] shadow-[3px_3px_0px_#12110F] text-xs font-mono font-bold text-[#12110F] placeholder-[#12110F]/40 focus:outline-none focus:bg-[#FFE585]"
              data-cursor="text"
            />
          </div>
        </div>

        {/* Repos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.slice(0, 6).map((repo) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="neo-card bg-white p-6 flex flex-col justify-between"
              data-cursor="view"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFD84D] border border-[#12110F]" />
                    <span className="font-mono text-xs font-bold text-[#12110F]/60">
                      {repo.language || 'Code'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs font-bold text-[#12110F]">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-indigo-500" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>

                <h4 className="font-display font-extrabold text-lg text-[#12110F] mb-2 truncate">
                  {repo.name}
                </h4>
                <p className="font-sans text-xs text-[#12110F]/75 line-clamp-3 mb-4 leading-relaxed">
                  {repo.description || 'Full-stack application built with clean architecture and modern tooling.'}
                </p>
              </div>

              <div className="pt-4 border-t border-[#12110F]/10 flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#12110F]/60">
                  Updated {new Date(repo.updated_at).toLocaleDateString()}
                </span>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#12110F] hover:text-[#FF8A5B] transition-colors"
                  data-cursor="pointer"
                >
                  <span>Repo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
