import React, { useEffect, useRef } from 'react';

export const FuturisticBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Gentle floating cyan and purple ambient particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.35 - 0.1, // gently drift upwards
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.4 ? '#06b6d4' : '#a855f7',
    }));

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#030712]">
      {/* Canvas for floating light particles */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-60" />

      {/* Atmospheric blurred light blooms (Deep Blue, Cyan, Purple) */}
      <div className="absolute -top-[15%] left-[10%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[140px]" />
      <div className="absolute top-[25%] right-[5%] w-[650px] h-[650px] rounded-full bg-blue-600/10 blur-[160px]" />
      <div className="absolute -bottom-[10%] left-[30%] w-[700px] h-[500px] rounded-full bg-purple-700/12 blur-[170px]" />

      {/* Subtle futuristic perspective floor grid */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00f0ff 1px, transparent 1px),
            linear-gradient(to bottom, #00f0ff 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Soft Vignette Overlay to focus attention toward center */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 60% 45%, transparent 20%, #030712 90%)',
        }}
      />
    </div>
  );
};
