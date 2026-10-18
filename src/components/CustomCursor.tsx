import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Spark {
  id: number;
  x: number;
  y: number;
  color: string;
  vx: number;
  vy: number;
}

const SPARK_COLORS = ['#FFD84D', '#FF8A5B', '#D9CCFF', '#BDF3D4', '#12110F'];

export default function CustomCursor() {
  const [isEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return finePointer && !prefersReducedMotion && !isTouch;
  });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'view' | 'hi' | 'text'>('default');
  const [sparks, setSparks] = useState<Spark[]>([]);

  // Raw mouse coordinates for the instant ink dot
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Velocity tracking for stretch
  const prevPos = useRef({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);
  const [stretch, setStretch] = useState(1);

  // Spring physics for trailing soft ring/blob
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  useEffect(() => {
    if (!isEnabled) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      rawX.set(clientX);
      rawY.set(clientY);
      if (!isVisible) setIsVisible(true);

      // Calculate movement delta for velocity stretch & angle
      const dx = clientX - prevPos.current.x;
      const dy = clientY - prevPos.current.y;
      prevPos.current = { x: clientX, y: clientY };

      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 3) {
        const rad = Math.atan2(dy, dx);
        setAngle((rad * 180) / Math.PI);
        setStretch(Math.min(1 + dist * 0.015, 1.45));
      } else {
        setStretch(1);
      }

      // Detect hover target attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr === 'view') {
        setCursorState('view');
        return;
      }
      if (cursorAttr === 'hi') {
        setCursorState('hi');
        return;
      }
      if (cursorAttr === 'text' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setCursorState('text');
        return;
      }

      const isClickable =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer') ||
        cursorAttr === 'pointer';

      if (isClickable) {
        setCursorState('pointer');
      } else {
        setCursorState('default');
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      // Spawn small spark explosion
      const newSparks: Spark[] = Array.from({ length: 7 }).map((_, i) => {
        const theta = (Math.PI * 2 * i) / 7 + Math.random() * 0.4;
        const speed = 25 + Math.random() * 20;
        return {
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          color: SPARK_COLORS[i % SPARK_COLORS.length],
          vx: Math.cos(theta) * speed,
          vy: Math.sin(theta) * speed,
        };
      });

      setSparks((prev) => [...prev, ...newSparks]);
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => !newSparks.some((ns) => ns.id === s.id)));
      }, 500);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [rawX, rawY, isVisible, isEnabled]);

  if (!isEnabled || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* 1. Instant Ink Center Dot */}
      {cursorState !== 'text' && cursorState !== 'view' && cursorState !== 'hi' && (
        <motion.div
          className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#12110F] rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ x: rawX, y: rawY }}
        />
      )}

      {/* 2. Trailing Soft Ring / Pill / Caret */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono font-bold select-none"
        style={{
          x: smoothX,
          y: smoothY,
          rotate: cursorState === 'default' ? angle : 0,
          scaleX: cursorState === 'default' ? stretch : 1,
        }}
      >
        {cursorState === 'default' && (
          <div className="w-8 h-8 rounded-full border-2 border-[#12110F] bg-[#FFD84D]/25 backdrop-blur-[1px] shadow-[2px_2px_0px_#12110F]" />
        )}

        {cursorState === 'pointer' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 rounded-full border-2 border-[#12110F] bg-[#FFD84D]/40 shadow-[3px_3px_0px_#12110F]"
          />
        )}

        {cursorState === 'view' && (
          <motion.div
            initial={{ scale: 0.6, rotate: -6 }}
            animate={{ scale: 1, rotate: 0 }}
            className="px-3.5 py-1.5 rounded-full border-2 border-[#12110F] bg-[#FFD84D] text-[#12110F] text-xs font-mono font-extrabold uppercase tracking-widest shadow-[3px_3px_0px_#12110F]"
          >
            VIEW
          </motion.div>
        )}

        {cursorState === 'hi' && (
          <motion.div
            initial={{ scale: 0.6, rotate: -6 }}
            animate={{ scale: 1, rotate: 0 }}
            className="px-3 py-1.5 rounded-full border-2 border-[#12110F] bg-[#BDF3D4] text-[#12110F] text-xs font-mono font-extrabold uppercase tracking-wide shadow-[3px_3px_0px_#12110F]"
          >
            HI 👋
          </motion.div>
        )}

        {cursorState === 'text' && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 24 }}
            className="w-[2.5px] h-6 bg-[#12110F] rounded-full"
          />
        )}
      </motion.div>

      {/* 3. Click Spark Particles */}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          initial={{ x: spark.x, y: spark.y, scale: 1, opacity: 1 }}
          animate={{
            x: spark.x + spark.vx,
            y: spark.y + spark.vy,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="fixed top-0 left-0 w-2 h-2 rounded-sm border border-[#12110F] -translate-x-1/2 -translate-y-1/2"
          style={{ backgroundColor: spark.color }}
        />
      ))}
    </div>
  );
}
