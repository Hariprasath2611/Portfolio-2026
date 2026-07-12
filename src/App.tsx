import { useState } from 'react';
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
import LiquidEther from './components/LiquidEther';

const DARK_COLORS = ['#06b6d4', '#6366f1', '#d946ef'];
const LIGHT_COLORS = ['#0284c7', '#4f46e5', '#a855f7'];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-gray-100 transition-colors duration-300">
          {/* Global LiquidEther Background */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <LiquidEther
              colors={theme === 'dark' ? DARK_COLORS : LIGHT_COLORS}
              mouseForce={15}
              cursorSize={80}
              autoDemo={true}
              autoSpeed={0.4}
              autoIntensity={1.8}
            />
          </div>

          {/* Global UI Components */}
          <ScrollProgress />
          <CustomCursor />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          
          {/* Main Sections */}
          <main className="w-full relative z-10">
            <Hero theme={theme} />
            <About />
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
