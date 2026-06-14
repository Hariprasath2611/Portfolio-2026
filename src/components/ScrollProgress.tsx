import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight === 0) {
        setScrollProgress(0);
        return;
      }
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-900/10 dark:bg-slate-500/10 z-50">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
