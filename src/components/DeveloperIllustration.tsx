import { useEffect, useRef } from 'react';

interface DeveloperIllustrationProps {
  theme: 'light' | 'dark';
}

export default function DeveloperIllustration({ theme }: DeveloperIllustrationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = 500;
    let height = canvas.height = 500;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = canvas.width = Math.min(parent.clientWidth, 500);
        height = canvas.height = Math.min(parent.clientWidth, 500);
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles/Nodes definition
    interface Particle {
      x: number;
      y: number;
      radius: number;
      angle: number;
      speed: number;
      orbit: number;
      color: string;
      label: string;
    }

    const techLabels = ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind', 'Native', 'Git', 'Vite'];
    const particles: Particle[] = Array.from({ length: 8 }, (_, i) => {
      const angle = (i * Math.PI * 2) / 8;
      const orbit = 120 + Math.random() * 40;
      return {
        x: width / 2 + Math.cos(angle) * orbit,
        y: height / 2 + Math.sin(angle) * orbit,
        radius: 4,
        angle,
        speed: 0.005 + Math.random() * 0.005,
        orbit,
        color: i % 2 === 0 ? 'rgba(6, 182, 212, 1)' : 'rgba(168, 85, 247, 1)', // cyan or purple
        label: techLabels[i],
      };
    });

    let mouse = { x: width / 2, y: height / 2, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let rotationAngle = 0;
    const isDark = theme === 'dark';

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const scaleFactor = width / 500;
      const centerX = width / 2;
      const centerY = height / 2;
      const accentCyan = isDark ? 'rgba(6, 182, 212, 0.4)' : 'rgba(6, 182, 212, 0.6)';
      const accentPurple = isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.5)';
      const textCol = isDark ? 'rgba(6, 182, 212, 0.8)' : 'rgba(15, 23, 42, 0.8)';
      const gridCol = isDark ? 'rgba(6, 182, 212, 0.05)' : 'rgba(6, 182, 212, 0.08)';

      // 1. Draw Grid Lines
      ctx.strokeStyle = gridCol;
      ctx.lineWidth = 1;
      const gridSize = Math.max(20, Math.floor(40 * scaleFactor));
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw HUD Circles (Outer & Inner Orbits)
      ctx.strokeStyle = accentCyan;
      ctx.lineWidth = 1.5 * scaleFactor;
      ctx.setLineDash([15 * scaleFactor, 10 * scaleFactor]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 180 * scaleFactor, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = accentPurple;
      ctx.setLineDash([5 * scaleFactor, 15 * scaleFactor]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 150 * scaleFactor, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = accentCyan;
      ctx.setLineDash([40 * scaleFactor, 2 * scaleFactor]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 100 * scaleFactor, rotationAngle, rotationAngle + Math.PI * 2);
      ctx.stroke();

      ctx.setLineDash([]); // Reset dashed lines

      // Inner Core Radar Ring
      ctx.strokeStyle = accentPurple;
      ctx.lineWidth = 1 * scaleFactor;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40 * scaleFactor, 0, Math.PI * 2);
      ctx.stroke();

      // Core details
      ctx.fillStyle = accentCyan;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 6 * scaleFactor, 0, Math.PI * 2);
      ctx.fill();

      // Rotating Radar Sweeper
      ctx.strokeStyle = isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(6, 182, 212, 0.25)';
      ctx.lineWidth = 2 * scaleFactor;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(rotationAngle) * 180 * scaleFactor, centerY + Math.sin(rotationAngle) * 180 * scaleFactor);
      ctx.stroke();

      // Increment rotation
      rotationAngle += 0.005;

      // 3. Draw & Animate Tech Nodes
      particles.forEach((p) => {
        // Increment particle angle for orbital motion
        p.angle += p.speed;
        let targetX = centerX + Math.cos(p.angle) * p.orbit * scaleFactor;
        let targetY = centerY + Math.sin(p.angle) * p.orbit * scaleFactor;

        // Interaction with mouse
        if (mouse.active) {
          const dx = mouse.x - targetX;
          const dy = mouse.y - targetY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80 * scaleFactor) {
            // Pull nodes towards mouse slightly
            const force = (80 * scaleFactor - dist) / (80 * scaleFactor);
            targetX += (dx / dist) * force * 15 * scaleFactor;
            targetY += (dy / dist) * force * 15 * scaleFactor;
          }
        }

        // Smoothly interpolate position
        p.x += (targetX - p.x) * 0.1;
        p.y += (targetY - p.y) * 0.1;

        // Connect node to center core with faint line
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
        ctx.lineWidth = 1 * scaleFactor;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        // Draw node dot
        ctx.shadowBlur = 10 * scaleFactor;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * scaleFactor, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw tech label text
        ctx.fillStyle = textCol;
        ctx.font = `bold ${Math.max(7, Math.floor(10 * scaleFactor))}px monospace`;
        ctx.fillText(p.label, p.x + 10 * scaleFactor, p.y + 4 * scaleFactor);
      });

      // 4. Floating Hex code stream details (aesthetic details)
      ctx.fillStyle = isDark ? 'rgba(6, 182, 212, 0.15)' : 'rgba(6, 182, 212, 0.25)';
      ctx.font = `${Math.max(6, Math.floor(9 * scaleFactor))}px monospace`;
      const hexStream = ['0x4E 0x65 0x6F 0x6E', 'REACT_V19', 'NODE_SYS_ON', 'PING_SUCCESS', 'PORT_8080'];
      hexStream.forEach((txt, idx) => {
        const xOffset = Math.sin(rotationAngle + idx * 4) * 10 * scaleFactor;
        ctx.fillText(txt, 25 * scaleFactor + xOffset, 45 * scaleFactor + idx * 95 * scaleFactor);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="relative flex items-center justify-center w-full h-[320px] md:h-[450px]">
      {/* Visual background shadows */}
      <div className="absolute w-[200px] h-[200px] rounded-full bg-cyan-500/10 blur-[60px] animate-pulse pointer-events-none" />
      <div className="absolute w-[180px] h-[180px] rounded-full bg-purple-500/10 blur-[80px] animate-pulse pointer-events-none delay-1000" />
      <canvas
        ref={canvasRef}
        className="w-full max-w-[500px] aspect-square pointer-events-auto"
        aria-label="Futuristic interactive hologram HUD illustrating technical capabilities"
      />
    </div>
  );
}
