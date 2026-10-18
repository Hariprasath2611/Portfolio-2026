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
    <div className="pt-28 md:pt-36 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Top Breadcrumb & Headline */}
      <div className="flex flex-col items-center text-center mb-12">
        <button
          onClick={() => navigate('/')}
          className="neo-btn mb-6 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#12110F] font-mono text-xs font-bold hover:bg-[#FFD84D] cursor-pointer"
          data-cursor="pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#12110F] text-white text-xs font-mono font-bold tracking-wider mb-4 shadow-[2px_2px_0px_#12110F]">
          MY RESUME
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-[#12110F]">
          Take a look, then <span className="font-serif-italic font-normal">download it.</span>
        </h1>
        <p className="text-[#12110F]/70 font-sans mt-3 text-base max-w-xl">
          Clean ATS-optimized resume ready for recruiters and engineering hiring managers.
        </p>
      </div>

      {/* Main Grid: Left Profile Card + Right Resume Paper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sticky Profile Card */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="neo-card bg-[#D9CCFF] p-6 flex flex-col justify-between">
            {/* Arch Photo Frame */}
            <div className="relative w-40 h-48 mx-auto mb-4 flex items-end justify-center">
              <div className="absolute inset-0 bg-[#FFD84D] rounded-t-[90px] rounded-b-2xl border-2 border-[#12110F] -rotate-2" />
              <div className="relative w-full h-full rounded-t-[90px] rounded-b-2xl border-2 border-[#12110F] bg-[#BBDDFF] overflow-hidden shadow-[4px_4px_0px_#12110F]">
                <img
                  src="/Profle.png"
                  alt="D Hariprasath"
                  className="w-full h-full object-cover object-top scale-105"
                />
              </div>
            </div>

            <div className="text-center mb-5">
              <h2 className="text-2xl font-display font-extrabold text-[#12110F]">
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
              <div className="flex justify-between items-center">
                <span className="text-[#12110F]/60 uppercase text-[10px] font-bold">Location</span>
                <span className="text-[#12110F] font-bold">Chennai, Tamil Nadu</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#12110F]/60 uppercase text-[10px] font-bold">Email</span>
                <span className="text-[#12110F] font-bold truncate max-w-[170px]" title="hariprasathd26112006@gmail.com">
                  hariprasathd2611...
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#12110F]/60 uppercase text-[10px] font-bold">Phone</span>
                <span className="text-[#12110F] font-bold">+91 9790851329</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#12110F]/60 uppercase text-[10px] font-bold">Education</span>
                <span className="text-[#12110F] font-bold">B.E. CSE (JEC)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#12110F]/60 uppercase text-[10px] font-bold">Graduation</span>
                <span className="text-emerald-800 font-bold">Expected 2028</span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col gap-2.5 mt-5">
              <a
                href="/D Hariprasath - One Page Resume (ATS).docx"
                download="D Hariprasath - One Page Resume (ATS).docx"
                className="neo-btn w-full py-3 px-4 rounded-xl bg-[#12110F] text-white hover:bg-[#FFD84D] hover:text-[#12110F] font-display font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                data-cursor="pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume (ATS)</span>
              </a>

              <a
                href="/D_Hari_Prasath_Resume.docx"
                download="D_Hari_Prasath_Resume.docx"
                className="neo-btn w-full py-3 px-4 rounded-xl bg-white text-[#12110F] hover:bg-[#FFE585] font-display font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                data-cursor="pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Standard Word</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-[#12110F]/15">
              <a
                href="https://github.com/Hariprasath2611"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] hover:bg-[#FFD84D] transition-colors"
                aria-label="GitHub"
                data-cursor="pointer"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/hariprasath-d-b19068379"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] hover:bg-[#BBDDFF] transition-colors"
                aria-label="LinkedIn"
                data-cursor="pointer"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:hariprasathd26112006@gmail.com"
                className="p-2 rounded-lg bg-white border-2 border-[#12110F] shadow-[2px_2px_0px_#12110F] hover:bg-[#BDF3D4] transition-colors"
                aria-label="Email"
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
          <div className="neo-card bg-white p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="font-mono text-xs font-bold text-[#12110F]">
              D_HARIPRASATH_RESUME.DOCX · 1 PAGE · ATS
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('ats')}
                className={`px-3 py-1 rounded-full font-mono text-xs font-bold border border-[#12110F] transition-all cursor-pointer ${
                  activeTab === 'ats' ? 'bg-[#FFD84D] text-[#12110F] shadow-[1px_1px_0px_#12110F]' : 'bg-[#F4F1EA] text-[#12110F]'
                }`}
              >
                ONE PAGE (ATS)
              </button>
              <button
                onClick={() => setActiveTab('detailed')}
                className={`px-3 py-1 rounded-full font-mono text-xs font-bold border border-[#12110F] transition-all cursor-pointer ${
                  activeTab === 'detailed' ? 'bg-[#FFD84D] text-[#12110F] shadow-[1px_1px_0px_#12110F]' : 'bg-[#F4F1EA] text-[#12110F]'
                }`}
              >
                Full detailed
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="neo-btn px-3 py-1.5 rounded-lg bg-[#F4F1EA] hover:bg-[#FFD84D] font-mono text-xs font-bold flex items-center gap-1.5 text-[#12110F] cursor-pointer"
                data-cursor="pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <a
                href="/D Hariprasath - One Page Resume (ATS).docx"
                download="D Hariprasath - One Page Resume (ATS).docx"
                className="neo-btn px-3.5 py-1.5 rounded-lg bg-[#12110F] text-white hover:bg-[#FFD84D] hover:text-[#12110F] font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                data-cursor="pointer"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>
            </div>
          </div>

          {/* Paper-Style Resume Document */}
          <div className="neo-card bg-white p-8 sm:p-12 text-[#12110F] shadow-[8px_8px_0px_#12110F] leading-relaxed">
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
                <a href="mailto:hariprasathd26112006@gmail.com" className="text-indigo-600 hover:underline">
                  hariprasathd26112006@gmail.com
                </a>
              </div>
              <div className="text-xs font-sans text-slate-700 flex flex-wrap justify-center items-center gap-2">
                <a href="https://linkedin.com/in/hariprasath-d-b19068379" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                  linkedin.com/in/hariprasath-d-b19068379
                </a>
                <span>•</span>
                <a href="https://github.com/Hariprasath2611" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                  github.com/Hariprasath2611
                </a>
                <span>•</span>
                <a href="https://hariprasathportfolio-zeta.vercel.app" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                  hariprasathportfolio-zeta.vercel.app
                </a>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#12110F] border-b border-[#12110F] pb-1 mb-2">
                SUMMARY
              </h3>
              <p className="text-xs sm:text-sm font-sans text-slate-800 leading-normal">
                Full Stack Developer and third-year B.E. Computer Science student skilled in React, Node.js, MongoDB, PostgreSQL and React Native. Completed two full-stack internships, led a Smart India Hackathon 2026 Web3 project, and made 2000+ GitHub contributions across 20+ national-level hackathons.
              </p>
            </div>

            {/* Technical Skills */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#12110F] border-b border-[#12110F] pb-1 mb-2">
                TECHNICAL SKILLS
              </h3>
              <div className="space-y-1 text-xs sm:text-sm font-sans text-slate-800">
                <div><strong>Languages:</strong> JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL</div>
                <div><strong>Frameworks:</strong> React.js, React Native, Node.js, Express.js, Vite, Tailwind CSS</div>
                <div><strong>Databases:</strong> MongoDB, PostgreSQL, Firebase, SQLite</div>
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
                  <li>Collaborate on frontend and backend tasks using Git and GitHub.</li>
                </ul>
              </div>

              {/* Code Alfa */}
              <div>
                <div className="flex flex-col sm:flex-row justify-between font-display font-bold text-xs sm:text-sm text-[#12110F]">
                  <span>Full Stack Developer Intern | Code Alfa</span>
                  <span className="font-mono text-xs text-slate-600">May 2026 – June 2026</span>
                </div>
                <ul className="list-disc list-inside text-xs sm:text-sm font-sans text-slate-800 mt-1 space-y-1">
                  <li>Built frontend and backend components for web applications in a startup environment.</li>
                  <li>Contributed to team projects using Git-based collaboration.</li>
                </ul>
              </div>
            </div>

            {/* Projects */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#12110F] border-b border-[#12110F] pb-1 mb-2">
                PROJECTS
              </h3>

              {/* BHAROSA */}
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row justify-between font-display font-bold text-xs sm:text-sm text-[#12110F]">
                  <span>BHAROSA: Decentralized Identity and Asset Platform</span>
                  <a href="https://github.com/Hariprasath2611/SIH26125-LuminaryForge" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-indigo-600 hover:underline">
                    github.com/Hariprasath2611/SIH26125-LuminaryForge
                  </a>
                </div>
                <div className="font-mono text-[11px] text-slate-600 mb-1">
                  React, TypeScript, Node.js, PostgreSQL, Solidity, IPFS
                </div>
                <ul className="list-disc list-inside text-xs sm:text-sm font-sans text-slate-800 space-y-1">
                  <li>Led development for Smart India Hackathon 2026 (Team LuminaryForge) of a Web3 platform using W3C DIDs, Verifiable Credentials and 6 smart contracts.</li>
                  <li>Implemented AES-256-GCM encryption with IPFS storage and Groth16 zero-knowledge proofs for privacy-preserving verification.</li>
                  <li>Wrote 96 automated tests; deployed on Vercel and Render.</li>
                </ul>
              </div>

              {/* CCR */}
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row justify-between font-display font-bold text-xs sm:text-sm text-[#12110F]">
                  <span>Course Coverage Report (CCR) Management System</span>
                  <a href="https://github.com/Hariprasath2611/CCR-App" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-indigo-600 hover:underline">
                    github.com/Hariprasath2611/CCR-App
                  </a>
                </div>
                <div className="font-mono text-[11px] text-slate-600 mb-1">
                  React Native, Expo, Node.js, Prisma, MongoDB, SQLite
                </div>
                <ul className="list-disc list-inside text-xs sm:text-sm font-sans text-slate-800 space-y-1">
                  <li>Built an offline-first mobile and web app for Jaya Engineering College that replaces manual and Excel-based course progress tracking.</li>
                  <li>Implemented SQLite caching with automatic sync to MongoDB, role-based dashboards, JWT authentication and PDF export.</li>
                </ul>
              </div>

              {/* EliteStore */}
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

            {/* Achievements */}
            <div>
              <h3 className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#12110F] border-b border-[#12110F] pb-1 mb-2">
                ACHIEVEMENTS
              </h3>
              <ul className="list-disc list-inside text-xs sm:text-sm font-sans text-slate-800 space-y-1">
                <li>2000+ GitHub contributions across open-source and team repositories.</li>
                <li>Participated in 20+ national-level hackathons.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
