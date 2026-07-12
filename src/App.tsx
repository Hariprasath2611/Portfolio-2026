import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import Hero from './sections/Hero';
import About from './sections/About';
import TechStack from './sections/TechStack';
import GitHubDashboard from './sections/GitHubDashboard';
import Projects from './sections/Projects';
import Services from './sections/Services';
import Achievements from './sections/Achievements';
import Timeline from './sections/Timeline';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { useTheme } from './hooks/useTheme';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
        console.log("App: ScrollTrigger.refresh() executed after layout load.");
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-gray-100 transition-colors duration-300">
          {/* Global UI Components */}
          <ScrollProgress />
          <CustomCursor />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          
          {/* Main Sections */}
          <main className="w-full">
            <Hero theme={theme} />
            <About theme={theme} />
            <TechStack />
            <GitHubDashboard />
            <Projects />
            <Services />
            <Achievements />
            <Timeline />
            <Contact />
          </main>

          {/* Footer & Back to top button */}
          <Footer />
          <BackToTop />
        </div>
      )}
    </>
  );
}
