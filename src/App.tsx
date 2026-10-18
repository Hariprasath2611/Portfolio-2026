import { useRouter } from './hooks/useRouter';
import CustomCursor from './components/CustomCursor';
import TopScrollProgress from './components/TopScrollProgress';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import TechStack from './sections/TechStack';
import GitHubDashboard from './sections/GitHubDashboard';
import Projects from './sections/Projects';
import Services from './sections/Services';
import Timeline from './sections/Timeline';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import ResumePage from './pages/ResumePage';

export default function App() {
  const { currentPath, navigate } = useRouter();

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#12110F] font-sans selection:bg-[#FFD84D] selection:text-[#12110F] relative">
      {/* 1. Top Reading / Scroll Progress Bar */}
      <TopScrollProgress />

      {/* 2. Global Custom Neo-Brutalist Cursor */}
      <CustomCursor />

      {/* 3. Floating Pill Navbar */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* 3. Main Views (Landing Page vs Dedicated Resume Page) */}
      <main className="w-full">
        {currentPath === '/resume' ? (
          <ResumePage navigate={navigate} />
        ) : (
          <>
            <Hero navigate={navigate} />
            <About />
            <TechStack />
            <GitHubDashboard />
            <Projects />
            <Services />
            <Timeline />
            <Contact />
          </>
        )}
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
