import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './AnimatedProfilePhoto.css';

export default function AnimatedProfilePhoto() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse coordinates to control the 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Create spring motion values for smooth interpolation
  const rotateX = useSpring(useMotionValue(0), { damping: 25, stiffness: 120 });
  const rotateY = useSpring(useMotionValue(0), { damping: 25, stiffness: 120 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates so center is (0, 0)
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Set maximum rotation to 12 degrees
    rotateX.set((mouseY / (height / 2)) * -12);
    rotateY.set((mouseX / (width / 2)) * 12);
    
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-[320px] md:h-[450px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background HUD Rotating Ring 1 (Clockwise) */}
      <div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full border border-dashed border-cyan-500/20 hud-ring-clockwise pointer-events-none" />

      {/* Background HUD Rotating Ring 2 (Counter-Clockwise) */}
      <div className="absolute w-[240px] h-[240px] md:w-[320px] md:h-[320px] rounded-full border border-double border-purple-500/10 hud-ring-counter pointer-events-none" />

      {/* Radial Gradient Glow Backing */}
      <div className="absolute w-[200px] h-[200px] rounded-full bg-cyan-500/10 blur-[60px] animate-pulse pointer-events-none" />
      <div className="absolute w-[180px] h-[180px] rounded-full bg-purple-500/10 blur-[80px] animate-pulse pointer-events-none delay-1000" />

      {/* Tilting Portrait Wrapper */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-2xl glass-panel p-2.5 border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.15)] group overflow-hidden cursor-pointer"
      >
        {/* Glowing Border effect */}
        <div className="absolute inset-0 border border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-20 pointer-events-none shadow-[inset_0_0_15px_rgba(6,182,212,0.5)]" />

        {/* Dynamic corner cyber-brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-30" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-30" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-500 z-30" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-500 z-30" />

        {/* Scanline Effect */}
        <div className="absolute left-0 right-0 h-[2px] bg-cyan-400/60 shadow-[0_0_8px_#06b6d4] profile-scanline z-20 pointer-events-none" />

        {/* Futuristic Grid Overlay on image */}
        <div className="absolute inset-0 bg-cyber-grid bg-[size:16px_16px] opacity-15 mix-blend-overlay z-10 pointer-events-none" />

        {/* Profile Image Container */}
        <div className="w-full h-full rounded-xl overflow-hidden relative bg-slate-900">
          <img
            src="/Profle.png"
            alt="D Hari Prasath - Profile"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{
              transform: 'translateZ(20px)',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
