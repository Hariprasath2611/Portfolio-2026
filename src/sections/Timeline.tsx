import { motion } from 'framer-motion';
import { Briefcase, Calendar, GraduationCap, Trophy, Sparkles } from 'lucide-react';

interface TimelineEvent {
  date: string;
  role: string;
  organization: string;
  desc: string;
  skills: string[];
  bgColor: string;
  icon: React.ReactNode;
}

const TIMELINE_DATA: TimelineEvent[] = [
  {
    date: 'July 2026 – Present',
    role: 'Full Stack Developer Intern',
    organization: 'Kotrelex',
    desc: 'Develop and maintain production full-stack web features using React, Node.js, and MongoDB. Collaborate on frontend state management and backend endpoint logic with team code reviews.',
    skills: ['React.js', 'Node.js', 'MongoDB', 'Git / GitHub', 'Team Collaboration'],
    bgColor: 'bg-[#BDF3D4]', // Mint
    icon: <Briefcase className="w-4 h-4 text-[#12110F]" />,
  },
  {
    date: 'May 2026 – June 2026',
    role: 'Full Stack Developer Intern',
    organization: 'Code Alfa',
    desc: 'Engineered frontend interfaces and backend integrations for web applications in a startup environment. Contributed clean reusable components and modular API handlers.',
    skills: ['React.js', 'JavaScript', 'REST APIs', 'Tailwind CSS', 'Git'],
    bgColor: 'bg-[#FFD0BC]', // Peach
    icon: <Briefcase className="w-4 h-4 text-[#12110F]" />,
  },
  {
    date: '2026',
    role: 'Team Lead & Core Engineer',
    organization: 'Smart India Hackathon 2026 (Team LuminaryForge)',
    desc: 'Spearheaded development of BHAROSA, a Web3 decentralized identity and asset management platform using W3C DIDs, Verifiable Credentials, 6 Solidity smart contracts, and Groth16 zero-knowledge proofs. Authored 96 automated tests.',
    skills: ['Solidity', 'Groth16 ZK', 'W3C DIDs', 'TypeScript', 'PostgreSQL', 'IPFS'],
    bgColor: 'bg-[#D9CCFF]', // Lavender
    icon: <Trophy className="w-4 h-4 text-[#12110F]" />,
  },
  {
    date: '2024 – 2028 (Expected)',
    role: 'B.E. Computer Science and Engineering',
    organization: 'Jaya Engineering College, Chennai',
    desc: 'Third-year undergraduate student maintaining an 8.75 CGPA out of 10. Deep diving into Operating Systems, Database Management Systems, Distributed Networks, and Software Engineering methodologies.',
    skills: ['CGPA: 8.75', 'Data Structures', 'Database Systems', 'Computer Networks'],
    bgColor: 'bg-[#FFE585]', // Butter
    icon: <GraduationCap className="w-4 h-4 text-[#12110F]" />,
  },
  {
    date: '2023 – Ongoing',
    role: 'Open Source Builder & Hackathon Competitor',
    organization: '20+ National Hackathons & GitHub Community',
    desc: 'Achieved 2000+ GitHub contributions through continuous open-source commits, community pull requests, and competing in 20+ national hackathons.',
    skills: ['2000+ Commits', '20+ Hackathons', 'Rapid Prototyping', 'System Design'],
    bgColor: 'bg-[#BBDDFF]', // Sky
    icon: <Sparkles className="w-4 h-4 text-[#12110F]" />,
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-20 md:py-28 px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12110F] text-white text-xs font-mono font-bold tracking-wider mb-4 shadow-[2px_2px_0px_#12110F]">
          06 / TIMELINE
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[#12110F]">
          The journey <span className="font-serif-italic font-normal">so far.</span>
        </h2>
        <p className="text-[#12110F]/70 font-sans mt-3 text-base max-w-xl">
          Internships, hackathon leadership, education milestones, and open-source contributions mapped across dates.
        </p>
      </div>

      {/* Timeline Layout: Left Date Column + Dashed Line + Right Card */}
      <div className="relative pl-4 sm:pl-0">
        {/* Vertical Dashed Line */}
        <div className="absolute top-4 bottom-4 left-4 sm:left-[180px] w-0.5 border-l-2 border-dashed border-[#12110F]" />

        <div className="flex flex-col gap-10">
          {TIMELINE_DATA.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="flex flex-col sm:flex-row items-start gap-4 sm:gap-10 relative"
            >
              {/* Left Date Column */}
              <div className="hidden sm:flex flex-col items-end w-[160px] pt-4 select-none shrink-0">
                <span className="font-mono text-xs font-extrabold text-[#12110F] bg-white px-2.5 py-1 rounded-md border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] text-right">
                  {event.date}
                </span>
              </div>

              {/* Center Dot Node on the Dashed Line */}
              <div className="absolute left-[15px] sm:left-[171px] top-5 -translate-x-1/2 w-7 h-7 rounded-full bg-white border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] flex items-center justify-center z-10">
                {event.icon}
              </div>

              {/* Right Content Card */}
              <div className="w-full pl-8 sm:pl-6">
                {/* Mobile Date Badge */}
                <div className="sm:hidden mb-2">
                  <span className="font-mono text-[11px] font-extrabold text-[#12110F] bg-white px-2 py-0.5 rounded-md border border-[#12110F]">
                    {event.date}
                  </span>
                </div>

                <div className={`neo-card ${event.bgColor} p-6 sm:p-7 flex flex-col justify-between`}>
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-[#12110F] mb-1">
                      {event.role}
                    </h3>
                    <div className="font-mono text-xs font-bold text-[#12110F]/80 mb-4">
                      {event.organization}
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#12110F]/85 leading-relaxed mb-6">
                      {event.desc}
                    </p>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-[#12110F]/15">
                    {event.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-white rounded-lg border-2 border-[#12110F] font-mono text-[11px] font-bold text-[#12110F] shadow-[1px_1px_0px_#12110F]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
