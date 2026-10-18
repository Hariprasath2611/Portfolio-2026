import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, MapPin, Sparkles, Terminal, Code2, HeartHandshake } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12110F] text-white text-xs font-mono font-bold tracking-wider mb-4 shadow-[2px_2px_0px_#12110F]">
          01 / ABOUT
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[#12110F]">
          Developer by craft, <span className="font-serif-italic font-normal">builder by habit.</span>
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
        {/* Large Summary Card - 7 cols */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-7 neo-card bg-[#D9CCFF] p-5 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#12110F] text-xs font-mono font-bold text-[#12110F] mb-4 shadow-[2px_2px_0px_#12110F]">
              <Terminal className="w-3.5 h-3.5" />
              <span>WHO I AM</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#12110F] mb-4">
              Building scalable web and mobile software with relentless curiosity.
            </h3>
            <p className="text-[#12110F]/85 font-sans leading-relaxed mb-4 text-sm sm:text-base">
              I am a Full Stack Developer and third-year B.E. Computer Science student at Jaya Engineering College, Chennai. I specialize in building complete digital products — from fluid, pixel-accurate React interfaces to reliable Node.js and PostgreSQL backends.
            </p>
            <p className="text-[#12110F]/85 font-sans leading-relaxed text-sm sm:text-base">
              Having completed two full-stack internships (Kotrelex and Code Alfa) and led a Smart India Hackathon Web3 project (BHAROSA), I believe in writing modular, tested code that solves real business and academic problems.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-6 mt-6 border-t-2 border-[#12110F]/20 font-mono text-xs font-bold text-[#12110F]">
            <span className="px-3 py-1 bg-white rounded-lg border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F]">
              ⚡ Fast Learner
            </span>
            <span className="px-3 py-1 bg-white rounded-lg border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F]">
              🎯 Production Focused
            </span>
            <span className="px-3 py-1 bg-white rounded-lg border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F]">
              🤝 Collaborative Leader
            </span>
          </div>
        </motion.div>

        {/* 4 Stats Grid - 5 cols */}
        <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Stat 1: GitHub Contributions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="neo-card bg-[#BDF3D4] p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 w-9 h-9 rounded-xl bg-white border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] flex items-center justify-center text-[#12110F]">
                  <Code2 className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white border border-[#12110F] shadow-[1px_1px_0px_#12110F]">
                  Top 5% Active
                </span>
              </div>
              <p className="font-sans text-xs text-[#12110F]/85 leading-relaxed">
                Daily commits, open-source PRs, and repositories maintained across React & Node ecosystems.
              </p>
            </div>

            <div className="pt-4 border-t border-[#12110F]/20 mt-4">
              <div className="text-3xl font-extrabold font-display text-[#12110F]">2000+</div>
              <div className="font-mono text-xs font-bold uppercase text-[#12110F]/80">GitHub Contribs</div>
            </div>
          </motion.div>

          {/* Stat 2: Hackathons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="neo-card bg-[#FFD0BC] p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 w-9 h-9 rounded-xl bg-white border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] flex items-center justify-center text-[#12110F]">
                  <Award className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white border border-[#12110F] shadow-[1px_1px_0px_#12110F]">
                  SIH 2026 Lead
                </span>
              </div>
              <p className="font-sans text-xs text-[#12110F]/85 leading-relaxed">
                Led multidisciplinary teams in 20+ national hackathons, building Web3 and offline-first apps.
              </p>
            </div>

            <div className="pt-4 border-t border-[#12110F]/20 mt-4">
              <div className="text-3xl font-extrabold font-display text-[#12110F]">20+</div>
              <div className="font-mono text-xs font-bold uppercase text-[#12110F]/80">Hackathons</div>
            </div>
          </motion.div>

          {/* Stat 3: Internships */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="neo-card bg-[#BBDDFF] p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 w-9 h-9 rounded-xl bg-white border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] flex items-center justify-center text-[#12110F]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white border border-[#12110F] shadow-[1px_1px_0px_#12110F]">
                  Production
                </span>
              </div>
              <p className="font-sans text-xs text-[#12110F]/85 leading-relaxed">
                Full-Stack Intern at Kotrelex & Code Alfa shipping real user features and backend integrations.
              </p>
            </div>

            <div className="pt-4 border-t border-[#12110F]/20 mt-4">
              <div className="text-3xl font-extrabold font-display text-[#12110F]">2</div>
              <div className="font-mono text-xs font-bold uppercase text-[#12110F]/80">Internships</div>
            </div>
          </motion.div>

          {/* Stat 4: CGPA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="neo-card bg-[#FFE585] p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 w-9 h-9 rounded-xl bg-white border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] flex items-center justify-center text-[#12110F]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white border border-[#12110F] shadow-[1px_1px_0px_#12110F]">
                  Distinction
                </span>
              </div>
              <p className="font-sans text-xs text-[#12110F]/85 leading-relaxed">
                Maintained top academic standing in Computer Science & Engineering at Jaya Engineering College.
              </p>
            </div>

            <div className="pt-4 border-t border-[#12110F]/20 mt-4">
              <div className="text-3xl font-extrabold font-display text-[#12110F]">8.75</div>
              <div className="font-mono text-xs font-bold uppercase text-[#12110F]/80">CGPA / 10</div>
            </div>
          </motion.div>
        </div>

        {/* Row 2: 4 Detail Cards */}
        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:col-span-3 neo-card bg-white p-6 flex flex-col justify-between"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#12110F]/60 mb-2">
            <GraduationCap className="w-4 h-4 text-[#12110F]" />
            <span>Education</span>
          </div>
          <div>
            <div className="font-display font-bold text-base text-[#12110F]">B.E. Computer Science</div>
            <div className="text-xs text-[#12110F]/80 font-sans mt-1">Jaya Engineering College, Chennai</div>
            <div className="font-mono text-[11px] font-bold text-emerald-700 mt-2">Graduating: 2028</div>
          </div>
        </motion.div>

        {/* Location Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="md:col-span-3 neo-card bg-white p-6 flex flex-col justify-between"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#12110F]/60 mb-2">
            <MapPin className="w-4 h-4 text-[#12110F]" />
            <span>Location</span>
          </div>
          <div>
            <div className="font-display font-bold text-base text-[#12110F]">Chennai, Tamil Nadu</div>
            <div className="text-xs text-[#12110F]/80 font-sans mt-1">India (IST)</div>
            <div className="font-mono text-[11px] font-bold text-emerald-700 mt-2">Remote / Hybrid / On-site</div>
          </div>
        </motion.div>

        {/* Core Focus Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-3 neo-card bg-white p-6 flex flex-col justify-between"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#12110F]/60 mb-2">
            <Sparkles className="w-4 h-4 text-[#12110F]" />
            <span>Core Focus</span>
          </div>
          <div>
            <div className="font-display font-bold text-base text-[#12110F]">Full-Stack Systems</div>
            <div className="text-xs text-[#12110F]/80 font-sans mt-1">React, Node.js, PostgreSQL</div>
            <div className="font-mono text-[11px] font-bold text-indigo-700 mt-2">Mobile & Offline-First</div>
          </div>
        </motion.div>

        {/* Languages & Soft Skills Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="md:col-span-3 neo-card bg-white p-6 flex flex-col justify-between"
        >
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#12110F]/60 mb-2">
            <HeartHandshake className="w-4 h-4 text-[#12110F]" />
            <span>Languages & Strengths</span>
          </div>
          <div>
            <div className="font-display font-bold text-base text-[#12110F]">English & Tamil</div>
            <div className="text-xs text-[#12110F]/80 font-sans mt-1">Technical Leadership & Agile</div>
            <div className="font-mono text-[11px] font-bold text-amber-700 mt-2">SIH Team Lead</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
