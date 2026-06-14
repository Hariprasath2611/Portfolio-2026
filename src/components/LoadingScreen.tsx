import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOG_MESSAGES = [
  'Initializing portfolio kernel v3.8.0...',
  'Connecting to neural mainframe...',
  'Compiling React + Tailwind engine...',
  'Establishing secure REST channel with GitHub API...',
  'Caching repositories and contribution nodes...',
  'Rendering dynamic WebGL particles...',
  'Optimizing performance metrics (LCP, FID)...',
  'Ready. Redirecting to viewport...'
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Log messages sequence
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < LOG_MESSAGES.length) {
        setLogs((prev) => [...prev, LOG_MESSAGES[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 450);

    // Progress bar speed
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsDone(true);
          setTimeout(onComplete, 500); // Small pause before exit
          return 100;
        }
        // Random incremental steps for realistic boot feeling
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950 font-mono text-xs md:text-sm text-cyan-400 select-none px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          {/* Main Frame */}
          <div className="w-full max-w-2xl border border-cyan-500/20 bg-gray-900/60 backdrop-blur-md rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/10">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-950/80 border-b border-cyan-500/10">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-cyan-500/40 text-[10px] tracking-widest uppercase font-bold">
                SYSTEM CORE BOOT
              </div>
              <div className="w-10" />
            </div>

            {/* Terminal Logs */}
            <div className="p-6 h-64 overflow-y-auto flex flex-col gap-2 scrollbar-none text-left">
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-purple-400">root@hariprasath:~$</span>
                  <span className="text-gray-300">{log}</span>
                </motion.div>
              ))}
              <div className="flex items-center gap-2">
                <span className="text-purple-400 animate-pulse">root@hariprasath:~$</span>
                <span className="w-2 h-4 bg-cyan-400 animate-pulse" />
              </div>
            </div>

            {/* Loading Progress Slider */}
            <div className="px-6 py-4 bg-gray-950/40 border-t border-cyan-500/10">
              <div className="flex justify-between mb-2 text-cyan-400/80 font-bold">
                <span>COMPILING SYSTEM INDEX</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden p-[1px] border border-cyan-500/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 text-cyan-500/30 text-[10px] tracking-wider uppercase">
            Designed and engineered by D Hari Prasath
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
