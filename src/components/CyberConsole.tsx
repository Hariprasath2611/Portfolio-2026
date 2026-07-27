import { useState, useEffect, useRef } from 'react';
import { Shield, Zap, RefreshCw, KeyRound } from 'lucide-react';
import './CyberConsole.css';

const DEFAULT_LOGS = [
  'SYS_BOOT: Kernel v4.2.0 initialized...',
  'SECURE_REST_CHANNEL: Connected to @GitHubAPI',
  'CACHE_MANAGER: 34 repository nodes loaded',
  'GRAPHICS_PIPELINE: WebGL2 fluid engine online',
  'PORTFOLIO_STATUS: Operational - Ready for input'
];

const SCAN_OUTPUTS = [
  'SCANNING_MEMORY_BLOCKS: OK',
  'DIAGNOSTICS: LCP 0.8s | FID 12ms | CLS 0.01',
  'CORE_METRICS: SEO optimized, responsive',
  'INTEGRITY: zero compilation warnings',
  'INTEGRATIONS: SplashCursor, LiquidEther active',
  'SYSTEM_DIAGNOSTIC: SUCCESS (Optimal Status)'
];

const DECRYPT_TARGET = 'ACCESS_GRANTED: HARIPRASATH_DEV_CORES_ACTIVE';

export default function CyberConsole() {
  const [logs, setLogs] = useState<string[]>(DEFAULT_LOGS);
  const [isScanning, setIsScanning] = useState(false);
  const [isOverloaded, setIsOverloaded] = useState(false);
  const [isWarpActive, setIsWarpActive] = useState(false);
  const [decryptProgress, setDecryptProgress] = useState('');
  const [scanProgress, setScanProgress] = useState(0);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);

  // Auto-scroll logs to bottom
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Periodic diagnostic log generators
  useEffect(() => {
    if (isOverloaded) return;

    const interval = setInterval(() => {
      const randomLogs = [
        `PING: Request reply from 127.0.0.1 - time=1.2ms`,
        `CORE_TEMP: 42°C - Status: Nominal`,
        `MEMORY_HEAP: Allocated ${(Math.random() * 5 + 10).toFixed(2)}MB / 128MB`,
        `MAIN_CORE: Port 8080 active and listening`,
        `SECURE_DEVICES: Listening for user gesture events`
      ];
      const newLog = randomLogs[Math.floor(Math.random() * randomLogs.length)];
      setLogs((prev) => [...prev.slice(-20), newLog]);
    }, 4000);

    return () => clearInterval(interval);
  }, [isOverloaded]);

  // 3D Canvas visualizer loop (Vector grid / Matrix rain switcher)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 250);
    let height = (canvas.height = 140);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 140;
      }
    };
    window.addEventListener('resize', handleResize);

    // Node particle array
    const particles = Array.from({ length: 15 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1
    }));

    // Matrix falling columns
    const columns = Math.floor(width / 12);
    const drops = Array(columns).fill(0);

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.fillStyle = 'rgba(10, 15, 30, 0.25)';
      ctx.fillRect(0, 0, width, height);

      if (isWarpActive) {
        // Render falling Matrix rain
        ctx.fillStyle = isOverloaded ? '#ef4444' : '#22d3ee';
        ctx.font = '9px monospace';

        for (let i = 0; i < drops.length; i++) {
          const char = String.fromCharCode(33 + Math.floor(Math.random() * 93));
          ctx.fillText(char, i * 12, drops[i] * 12);

          if (drops[i] * 12 > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i] += 0.5; // fall speed
        }
      } else {
        // Render standard Vector Node Grid
        particles.forEach((p, idx) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Pull towards mouse
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 50) {
            p.x += (dx / dist) * 0.3;
            p.y += (dy / dist) * 0.3;
          }

          ctx.fillStyle = isOverloaded ? 'rgba(239, 68, 68, 0.7)' : 'rgba(6, 182, 212, 0.6)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          // Connect nearby particles
          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
            if (d < 60) {
              ctx.strokeStyle = isOverloaded 
                ? `rgba(239, 68, 68, ${0.15 - d / 400})` 
                : `rgba(6, 182, 212, ${0.25 - d / 240})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
      }

      requestRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) canvas.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isWarpActive, isOverloaded]);

  // Actions
  const handleScan = () => {
    if (isScanning || isOverloaded) return;
    setIsScanning(true);
    setScanProgress(0);
    setLogs((prev) => [...prev, 'INITIALIZING DIAGNOSTIC RADAR SCAN...']);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        setLogs((prev) => [...prev, ...SCAN_OUTPUTS]);
      }
    }, 200);
  };

  const handleDecrypt = () => {
    if (isOverloaded) return;
    setLogs((prev) => [...prev, 'ESTABLISHING QUANTUM DECRYPTION KEY...']);
    setDecryptProgress('');

    let currentString = '';
    let idx = 0;
    const chars = '0123456789ABCDEF!@#$%^&*()_+';

    const interval = setInterval(() => {
      if (idx < DECRYPT_TARGET.length) {
        // Scrambler effect
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        const peekString = currentString + randomChar;
        setDecryptProgress(peekString);

        if (Math.random() > 0.4) {
          currentString += DECRYPT_TARGET[idx];
          idx++;
        }
      } else {
        clearInterval(interval);
        setDecryptProgress(DECRYPT_TARGET);
        setLogs((prev) => [...prev, 'DECRYPT_SUCCESS: Payload unlocked.', DECRYPT_TARGET]);
      }
    }, 40);
  };

  const handleOverload = () => {
    if (isOverloaded) return;
    setIsOverloaded(true);
    setLogs((prev) => [...prev, '!!! EMERGENCY OVERLOAD: CRITICAL ERROR !!!', 'ALERT: CORE TEMP CRITICAL. DUMPING IN MEMORY HEAP...']);

    setTimeout(() => {
      setIsOverloaded(false);
      setLogs((prev) => [...prev, 'SYSTEM RESET: Cores stabilized. Default configurations loaded.']);
    }, 3000);
  };

  const handleWarp = () => {
    setIsWarpActive((prev) => !prev);
    setLogs((prev) => [
      ...prev,
      isWarpActive 
        ? 'WARP_SPEED: Off. Restoring telemetry vector grid.' 
        : 'WARP_SPEED: On. Initiating falling matrix diagnostics rain!'
    ]);
  };

  return (
    <div className={`relative w-full max-w-[480px] rounded-2xl glass-panel p-4 flex flex-col justify-between select-none text-left border ${
      isOverloaded 
        ? 'border-red-500/35 shadow-[0_0_25px_rgba(239,68,68,0.2)] console-overload-active' 
        : 'border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
    }`}>
      
      {/* Laser scanner indicator */}
      {isScanning && <div className="console-scanline-active" />}
      {isOverloaded && <div className="console-scanline-overload" />}

      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-200/50 dark:border-cyan-500/10">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isOverloaded ? 'bg-red-500 animate-pulse' : 'bg-cyan-400 animate-pulse'}`} />
          <span className={`font-mono text-[10px] font-bold uppercase tracking-widest ${isOverloaded ? 'text-red-400' : 'text-cyan-400'}`}>
            {isOverloaded ? 'ALERT: SYSTEM_MUTATION' : 'SYS_DIAGNOSTICS_PORT v5.0'}
          </span>
        </div>
        <span className="font-mono text-[9px] text-slate-400 dark:text-gray-500">
          SECURE_SESSION
        </span>
      </div>

      {/* Visualizer Area (Canvas grid) */}
      <div className="relative w-full h-[140px] bg-slate-950/70 border border-slate-200/40 dark:border-cyan-500/5 rounded-xl overflow-hidden mb-3">
        <canvas ref={canvasRef} className="w-full h-full block" />
        {isScanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-[1px] text-cyan-400 font-mono text-xs font-bold">
            <span className="mb-2 uppercase animate-pulse">Running Radar Sweep...</span>
            <div className="w-[120px] h-1.5 bg-gray-800 rounded-full overflow-hidden p-[1px] border border-cyan-500/10">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${scanProgress}%` }} />
            </div>
            <span className="mt-1 text-[10px]">{scanProgress}%</span>
          </div>
        )}
        {decryptProgress && (
          <div className="absolute bottom-2 left-2 right-2 bg-slate-950/90 border border-purple-500/20 px-3 py-1.5 rounded font-mono text-[10px] text-purple-400 truncate shadow-inner">
            <span className="text-cyan-400 font-bold">&gt; DECRYPT_KEY: </span>
            {decryptProgress}
          </div>
        )}
      </div>

      {/* Logging Terminal Area */}
      <div className="console-logs-scroll h-28 overflow-y-auto font-mono text-[10px] leading-relaxed flex flex-col gap-1.5 p-3.5 bg-slate-950/90 border border-slate-200/40 dark:border-cyan-500/5 rounded-xl mb-4 text-left shadow-inner">
        {logs.map((log, index) => {
          let styleClass = 'text-cyan-400/90';
          if (log.startsWith('!')) styleClass = 'text-red-500 font-bold';
          else if (log.startsWith('DECRYPT_') || log.includes('ACCESS_GRANTED')) styleClass = 'text-purple-400';
          else if (log.startsWith('SYSTEM_') || log.startsWith('DIAG')) styleClass = 'text-green-400';
          else if (log.includes('WARP')) styleClass = 'text-amber-400';

          return (
            <div key={index} className="flex gap-1.5 items-start">
              <span className="text-slate-600 dark:text-cyan-500/40 select-none">&gt;</span>
              <span className={styleClass}>{log}</span>
            </div>
          );
        })}
        <div className="flex gap-1.5 items-center">
          <span className="text-slate-600 dark:text-cyan-500/40 select-none">&gt;</span>
          <span className="w-1.5 h-3 bg-cyan-400 console-cursor" />
        </div>
        <div ref={logsEndRef} />
      </div>

      {/* Button Controls Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold">
        <button
          onClick={handleScan}
          disabled={isScanning || isOverloaded}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-cyan-500/20 hover:border-cyan-400/50 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
        >
          <Shield className="w-3.5 h-3.5" />
          <span>DIAG_SCAN</span>
        </button>

        <button
          onClick={handleDecrypt}
          disabled={isScanning || isOverloaded}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-purple-500/20 hover:border-purple-400/50 bg-purple-500/5 hover:bg-purple-500/10 text-purple-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>DECRYPT</span>
        </button>

        <button
          onClick={handleWarp}
          disabled={isScanning || isOverloaded}
          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg border cursor-pointer transition-all duration-200 ${
            isWarpActive 
              ? 'border-amber-400/50 bg-amber-400/10 text-amber-400' 
              : 'border-slate-500/15 hover:border-amber-400/30 bg-slate-800/10 hover:bg-amber-400/5 text-slate-400 hover:text-amber-400'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isWarpActive ? 'animate-spin' : ''}`} />
          <span>WARP_DRIVE</span>
        </button>

        <button
          onClick={handleOverload}
          disabled={isScanning || isOverloaded}
          className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-red-500/25 hover:border-red-400/50 bg-red-500/5 hover:bg-red-500/10 text-red-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>OVERLOAD</span>
        </button>
      </div>
    </div>
  );
}
