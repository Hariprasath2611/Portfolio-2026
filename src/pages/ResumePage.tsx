import { useState } from 'react';
import { FileDown, Printer, ArrowLeft, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons';

interface ResumePageProps {
  navigate: (to: string) => void;
}

export default function ResumePage({ navigate }: ResumePageProps) {
  const [activeTab, setActiveTab] = useState<'ats' | 'detailed'>('ats');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-24 sm:pt-28 md:pt-36 pb-16 sm:pb-20 px-3 sm:px-6 max-w-6xl mx-auto">
      {/* Top Breadcrumb & Headline */}
      <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
        <button
          onClick={() => navigate('/')}
          className="neo-btn mb-6 inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full bg-white text-[#12110F] font-mono text-xs font-bold hover:bg-[#FFD84D] cursor-pointer"
          data-cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12110F] text-white text-xs font-mono font-bold tracking-wider mb-4 shadow-[2px_2px_0px_#12110F]">
          MY RESUME
        </div>
        <h1 className="text-[clamp(2rem,7vw,2.75rem)] sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-[#12110F]">
          Take a look, then <span className="font-serif-italic font-normal">download it.</span>
        </h1>
        <p className="text-[#12110F]/70 font-sans mt-3 text-sm sm:text-base max-w-xl">
          Clean ATS-optimized resume ready for recruiters and engineering hiring managers.
        </p>
      </div>

      {/* Main Grid: Left Profile Card + Right Resume Paper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Sticky Profile Card */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="neo-card bg-[#D9CCFF] p-5 sm:p-6 flex flex-col justify-between">
            {/* Arch Photo Frame */}
            <div className="relative w-36 h-44 sm:w-40 sm:h-48 mx-auto mb-4 flex items-end justify-center">
              <div className="absolute inset-0 bg-[#FFD84D] rounded-t-[90px] rounded-b-2xl border-2 border-[#12110F] -rotate-2" />
              <div className="relative w-full h-full rounded-t-[90px] rounded-b-2xl border-2 border-[#12110F] bg-[#BBDDFF] overflow-hidden shadow-[4px_4px_0px_#12110F]">
                <img
                  src="/HP.png"
                  alt="D Hariprasath"
                  className="w-full h-full object-cover object-[center_10%] scale-105"
                />
              </div>
            </div>

            <div className="text-center mb-5">
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#12110F]">
                D Hariprasath
              </h2>
              <div className="font-mono text-xs font-bold text-[#12110F]/70 mt-0.5">
                Full Stack Developer
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#12110F] font-mono text-[11px] font-bold text-[#12110F] shadow-[1px_1px_0px_#12110F] mt-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open to opportunities</span>
              </div>
            </div>

            {/* Meta Table Rows */}
            <div className="space-y-2 py-4 border-y-2 border-[#12110F]/20 font-mono text-xs">
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#12110F]/60 uppercase text-[10px] font-bold shrink-0">Location</span>
                <span className="text-[#12110F] font-bold text-right truncate">Chennai, Tamil Nadu</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#12110F]/60 uppercase text-[10px] font-bold shrink-0">Email</span>
                <span className="text-[#12110F] font-bold truncate max-w-[170px]" title="hariprasathd26112006@gmail.com">
                  hariprasathd2611...
                </span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#12110F]/60 uppercase text-[10px] font-bold shrink-0">Phone</span>
                <span className="text-[#12110F] font-bold">+91 9790851329</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#12110F]/60 uppercase text-[10px] font-bold shrink-0">Education</span>
                <span className="text-[#12110F] font-bold">B.E. CSE (JEC)</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-[#12110F]/60 uppercase text-[10px] font-bold shrink-0">Graduation</span>
                <span className="text-emerald-800 font-bold">Expected 2028</span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col gap-2.5 mt-5">
              <a
                href="/D%20Hariprasath%20-%20Resume%20(ATS-Friendly).docx"
                download="D Hariprasath - Resume (ATS-Friendly).docx"
                className="neo-btn min-h-[44px] w-full py-3 px-4 rounded-xl bg-[#12110F] text-white hover:bg-[#FFD84D] hover:text-[#12110F] font-display font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                data-cursor="pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume (ATS-Friendly)</span>
              </a>

              <a
                href="/D%20Hariprasath%20-%20One%20Page%20Resume%20(ATS).docx"
                download="D Hariprasath - One Page Resume (ATS).docx"
                className="neo-btn min-h-[44px] w-full py-3 px-4 rounded-xl bg-white text-[#12110F] hover:bg-[#FFE585] font-display font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                data-cursor="pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>Download One-Page ATS</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-[#12110F]/15">
              <a
                href="https://github.com/Hariprasath2611"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg bg-white border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] hover:bg-[#FFD84D] transition-colors flex items-center justify-center"
                aria-label="GitHub profile"
                data-cursor="pointer"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/hariprasath-d-b19068379"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg bg-white border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] hover:bg-[#BBDDFF] transition-colors flex items-center justify-center"
                aria-label="LinkedIn profile"
                data-cursor="pointer"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:hariprasathd26112006@gmail.com"
                className="w-11 h-11 rounded-lg bg-white border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] hover:bg-[#BDF3D4] transition-colors flex items-center justify-center"
                aria-label="Email Hariprasath"
                data-cursor="pointer"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Paper Preview & Toolbar */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Toolbar */}
          <div className="neo-card bg-white p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="font-mono text-[11px] sm:text-xs font-bold text-[#12110F] text-center sm:text-left truncate">
              {activeTab === 'detailed'
                ? 'D_HARIPRASATH_RESUME_(ATS_FRIENDLY).DOCX · FULL'
                : 'D_HARIPRASATH_RESUME.DOCX · 1 PAGE · ATS'}
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
              <div className="inline-flex rounded-xl bg-[#F4F1EA] p-1 border border-[#12110F]">
                <button
                  onClick={() => setActiveTab('ats')}
                  className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer min-h-[36px] ${
                    activeTab === 'ats' ? 'bg-[#FFD84D] text-[#12110F] shadow-[1px_1px_0px_#12110F]' : 'text-[#12110F]'
                  }`}
                >
                  1 PAGE (ATS)
                </button>
                <button
                  onClick={() => setActiveTab('detailed')}
                  className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer min-h-[36px] ${
                    activeTab === 'detailed' ? 'bg-[#FFD84D] text-[#12110F] shadow-[1px_1px_0px_#12110F]' : 'text-[#12110F]'
                  }`}
                >
                  Full detailed
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="neo-btn min-h-[38px] px-3 py-1.5 rounded-lg bg-[#F4F1EA] hover:bg-[#FFD84D] font-mono text-xs font-bold flex items-center gap-1.5 text-[#12110F] cursor-pointer"
                  data-cursor="pointer"
                  aria-label="Print resume"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                <a
                  href={
                    activeTab === 'detailed'
                      ? '/D%20Hariprasath%20-%20Resume%20(ATS-Friendly).docx'
                      : '/D%20Hariprasath%20-%20One%20Page%20Resume%20(ATS).docx'
                  }
                  download={
                    activeTab === 'detailed'
                      ? 'D Hariprasath - Resume (ATS-Friendly).docx'
                      : 'D Hariprasath - One Page Resume (ATS).docx'
                  }
                  className="neo-btn min-h-[38px] px-3.5 py-1.5 rounded-lg bg-[#12110F] text-white hover:bg-[#FFD84D] hover:text-[#12110F] font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  data-cursor="pointer"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>

          {/* Paper-Style Resume Document */}
          <div className="neo-card bg-white p-5 sm:p-8 md:p-12 text-[#12110F] shadow-[6px_6px_0px_#12110F] sm:shadow-[8px_8px_0px_#12110F] leading-relaxed break-words">
            {/* Paper Header */}
            <div className="text-center pb-5 mb-5 border-b-2 border-[#12110F]">
              <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-[#12110F] mb-1.5">
                D HARIPRASATH
              </h1>
              <div className="text-xs font-sans text-slate-700 flex flex-wrap justify-center items-center gap-2 mb-1">
                <span>Chennai, Tamil Nadu, India</span>
                <span>•</span>
                <span>+91 9790851329</span>
                <span>•</span>
                <a href="mailto:hariprasathd26112006@gmail.com" className="text-indigo-600 hover:underline break-all">
                  hariprasathd26112006@gmail.com
                </a>
              </div>
              <div className="text-xs font-sans text-slate-700 flex flex-wrap justify-center items-center gap-2">
                <a href="https://linkedin.com/in/hariprasath-d-b19068379" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline break-all">
                  linkedin.com/in/hariprasath-d-b19068379
                </a>
                <span>•</span>
                <a href="https://github.com/Hariprasath2611" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline break-all">
                  github.com/Hariprasath2611
                </a>
                <span>•</span>
                <a href="https://hariprasathportfolio-zeta.vercel.app" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline break-all">
                  hariprasathportfolio-zeta.vercel.app
                </a>
              </div>
            </div>

            {/* Career Objective (Featured in Full Detailed Resume) */}
            {activeTab === 'detailed' && (
              <div className="mb-6">
                <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#12110F] border-b border-[#12110F] pb-1 mb-2">
                  CAREER OBJECTIVE
                </h3>
                <p className="text-xs sm:text-sm font-sans text-slate-800 leading-normal">
                  To secure challenging opportunities where I can use my full-stack development skills, contribute to impactful projects, and keep growing as a software engineer while delivering innovative technology solutions.
                </p>
              </div>
            )}

            {/* Summary */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#12110F] border-b border-[#12110F] pb-1 mb-2">
                PROFESSIONAL SUMMARY
              </h3>
              <p className="text-xs sm:text-sm font-sans text-slate-800 leading-normal">
                {activeTab === 'detailed'
                  ? 'Full Stack Developer and third-year B.E. Computer Science student with hands-on experience building web and mobile applications using React, Node.js, Express.js, MongoDB, PostgreSQL, Firebase and React Native. Completed internships in full-stack development, built multiple end-to-end projects, and participated in 20+ national-level hackathons. Seeking internship, freelance and full-time software development opportunities.'
                  : 'Full Stack Developer and third-year B.E. Computer Science student skilled in React, Node.js, MongoDB, PostgreSQL and React Native. Completed two full-stack internships, led a Smart India Hackathon 2026 Web3 project, and made 2000+ GitHub contributions across 20+ national-level hackathons.'}
              </p>
            </div>

            {/* Technical Skills */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#12110F] border-b border-[#12110F] pb-1 mb-2">
                TECHNICAL SKILLS
              </h3>
              <div className="space-y-1.5 text-xs sm:text-sm font-sans text-slate-800">
                <div><strong>Languages:</strong> JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL</div>
                <div><strong>Frontend:</strong> React.js, Vite, Tailwind CSS</div>
                <div><strong>Backend:</strong> Node.js, Express.js, REST APIs</div>
                <div><strong>Databases:</strong> MongoDB, PostgreSQL, Firebase, SQLite</div>
                <div><strong>Mobile:</strong> React Native, Expo</div>
                <div><strong>Tools:</strong> Git, GitHub, Vercel, Postman, Docker</div>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#12110F] border-b border-[#12110F] pb-1 mb-2">
                EXPERIENCE
              </h3>
              
              {/* Kotrelex */}
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row justify-between font-display font-bold text-xs sm:text-sm text-[#12110F]">
                  <span>Full Stack Developer Intern | Kotrelex</span>
                  <span className="font-mono text-xs text-slate-600">July 2026 – Present</span>
                </div>
                <ul className="list-disc list-inside text-xs sm:text-sm font-sans text-slate-800 mt-1 space-y-1">
                  <li>Develop and maintain full-stack features using React, Node.js and MongoDB.</li>
                  <li>Collaborate with the team on frontend and backend tasks using Git and GitHub.</li>
                  <li>Follow industry-standard development workflows in real-world projects.</li>
                </ul>
              </div>

              {/* Code Alfa */}
              <div>
                <div className="flex flex-col sm:flex-row justify-between font-display font-bold text-xs sm:text-sm text-[#12110F]">
                  <span>Full Stack Developer Intern | Code Alfa</span>
                  <span className="font-mono text-xs text-slate-600">May 2026 – June 2026</span>
                </div>
                <ul className="list-disc list-inside text-xs sm:text-sm font-sans text-slate-800 mt-1 space-y-1">
                  <li>Built frontend and backend components for web applications in a start-up environment.</li>
                  <li>Contributed to team projects using Git-based collaboration.</li>
                  <li>Gained hands-on experience with the full software development lifecycle.</li>
                </ul>
              </div>
            </div>

            {/* Projects */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#12110F] border-b border-[#12110F] pb-1 mb-2">
                PROJECTS
              </h3>

              {/* BHAROSA */}
              <div className="mb-5">
                <div className="flex flex-col sm:flex-row justify-between font-display font-bold text-xs sm:text-sm text-[#12110F]">
                  <span>BHAROSA: Decentralized Identity and Asset Platform</span>
                  <a href="https://github.com/Hariprasath2611/SIH26125-LuminaryForge" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-indigo-600 hover:underline break-all">
                    github.com/Hariprasath2611/SIH26125-LuminaryForge
                  </a>
                </div>
                <div className="text-[11px] font-mono text-slate-600 mb-1">
                  Smart India Hackathon 2026 (Team LuminaryForge, Lead Developer) | React 18, Vite, TypeScript, Node.js, Express, Prisma, PostgreSQL, Solidity, Hardhat, IPFS, Docker
                </div>
                <ul className="list-disc list-inside text-xs sm:text-sm font-sans text-slate-800 space-y-1">
                  <li>Led development of a Web3 platform for decentralized identity and digital asset management using W3C DIDs, Verifiable Credentials and 6 smart contracts.</li>
                  <li>Implemented client-side AES-256-GCM encryption with IPFS storage, and Groth16 zero-knowledge proofs that verify credential conditions without revealing underlying data.</li>
                  <li>Built issuer, holder and verifier flows with attribute-based access control and social recovery, aligned with the India DPDP Act 2023.</li>
                  <li>Wrote 96 automated tests (43 smart contract, 24 backend, 28 frontend); deployed frontend on Vercel and backend on Render.</li>
                </ul>
              </div>

              {/* CCR */}
              <div className="mb-5">
                <div className="flex flex-col sm:flex-row justify-between font-display font-bold text-xs sm:text-sm text-[#12110F]">
                  <span>Course Coverage Report (CCR) Management System</span>
                  <a href="https://github.com/Hariprasath2611/CCR-App" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-indigo-600 hover:underline break-all">
                    github.com/Hariprasath2611/CCR-App
                  </a>
                </div>
                <div className="text-[11px] font-mono text-slate-600 mb-1">
                  Jaya Engineering College | React Native, Expo, TypeScript, Node.js, Express, Prisma, MongoDB, SQLite, JWT
                </div>
                <ul className="list-disc list-inside text-xs sm:text-sm font-sans text-slate-800 space-y-1">
                  <li>Built an offline-first mobile and web platform that replaces manual progress logging, Excel tracking and paper reports for weekly course coverage.</li>
                  <li>Implemented SQLite local caching that automatically syncs with MongoDB when connectivity returns.</li>
                  <li>Developed role-based dashboards for Subject Teachers, Class Coordinators, HODs and Principal, with JWT authentication, institutional-email access control and PDF export.</li>
                </ul>
              </div>

              {/* Full Detailed: Campus ERP & Ryde */}
              {activeTab === 'detailed' ? (
                <>
                  {/* Campus ERP */}
                  <div className="mb-5">
                    <div className="flex flex-col sm:flex-row justify-between font-display font-bold text-xs sm:text-sm text-[#12110F]">
                      <span>Campus ERP: Faculty Attendance Module</span>
                      <a href="https://github.com/Hariprasath2611" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-indigo-600 hover:underline break-all">
                        github.com/Hariprasath2611
                      </a>
                    </div>
                    <div className="text-[11px] font-mono text-slate-600 mb-1">
                      Jaya Engineering College | React Native, Expo
                    </div>
                    <ul className="list-disc list-inside text-xs sm:text-sm font-sans text-slate-800 space-y-1">
                      <li>Developing a college ERP with a mobile faculty attendance module built with React Native and Expo.</li>
                    </ul>
                  </div>

                  {/* Ryde */}
                  <div>
                    <div className="flex flex-col sm:flex-row justify-between font-display font-bold text-xs sm:text-sm text-[#12110F]">
                      <span>Ryde: On-Demand Driver Booking App (in development)</span>
                      <a href="https://github.com/Hariprasath2611/Ryde" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-indigo-600 hover:underline break-all">
                        github.com/Hariprasath2611/Ryde
                      </a>
                    </div>
                    <div className="text-[11px] font-mono text-slate-600 mb-1">
                      React Native, Node.js
                    </div>
                    <ul className="list-disc list-inside text-xs sm:text-sm font-sans text-slate-800 space-y-1">
                      <li>Building an app where customers book a professional driver for their own vehicle.</li>
                    </ul>
                  </div>
                </>
              ) : (
                /* One Page ATS: EliteStore */
                <div>
                  <div className="flex flex-col sm:flex-row justify-between font-display font-bold text-xs sm:text-sm text-[#12110F]">
                    <span>EliteStore</span>
                    <span className="font-mono text-xs text-slate-600">Full-Stack Application</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-600 mb-1">
                    React, Node.js, MongoDB
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-sm font-sans text-slate-800 space-y-1">
                    <li>Developed a full-stack e-commerce application with product browsing, shopping cart and order management.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Education */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#12110F] border-b border-[#12110F] pb-1 mb-2">
                EDUCATION
              </h3>
              <div className="flex flex-col sm:flex-row justify-between font-display font-bold text-xs sm:text-sm text-[#12110F]">
                <span>Bachelor of Engineering (B.E.), Computer Science and Engineering</span>
                <span className="font-mono text-xs text-slate-600">Expected Graduation: 2028</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between text-xs font-sans text-slate-700">
                <span>Jaya Engineering College, Chennai, Tamil Nadu</span>
                <span className="font-mono font-bold text-emerald-800">CGPA: 8.75</span>
              </div>
            </div>

            {/* Achievements and Certifications */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#12110F] border-b border-[#12110F] pb-1 mb-2">
                {activeTab === 'detailed' ? 'ACHIEVEMENTS AND CERTIFICATIONS' : 'ACHIEVEMENTS'}
              </h3>
              <ul className="list-disc list-inside text-xs sm:text-sm font-sans text-slate-800 space-y-1">
                <li>2000+ GitHub contributions across open-source and team repositories.</li>
                <li>Participated in 20+ national-level hackathons.</li>
                {activeTab === 'detailed' && (
                  <>
                    <li>Full Stack Development Internship Certificate.</li>
                    <li>National-level hackathon participation certificates (20+).</li>
                  </>
                )}
              </ul>
            </div>

            {/* Detailed sections: Soft Skills & Languages */}
            {activeTab === 'detailed' && (
              <>
                <div className="mb-6">
                  <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#12110F] border-b border-[#12110F] pb-1 mb-2">
                    SOFT SKILLS
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-slate-800">
                    Problem Solving, Team Collaboration, Communication, Time Management, Adaptability, Critical Thinking, Continuous Learning
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#12110F] border-b border-[#12110F] pb-1 mb-2">
                    LANGUAGES
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-slate-800">
                    English, Tamil
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
