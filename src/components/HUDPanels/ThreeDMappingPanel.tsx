import React, { useEffect, useRef } from 'react';
import { Box, Activity } from 'lucide-react';

export const ThreeDMappingPanel: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Rotate a 3D wireframe head model on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Generate 3D head vertices (layers of latitude/longitude mimicking a human skull/head)
    interface Point3D {
      x: number;
      y: number;
      z: number;
    }

    const points: Point3D[] = [];
    const lines: [number, number][] = [];

    // Head profile ellipsoid with facial projection
    const rings = 7;
    const ptsPerRing = 12;
    for (let r = 0; r < rings; r++) {
      const v = (r / (rings - 1) - 0.5) * 2; // -1 to 1
      const radius = Math.cos(v * (Math.PI / 2.3)) * 32;
      const y = -v * 36;

      for (let p = 0; p < ptsPerRing; p++) {
        const u = (p / ptsPerRing) * Math.PI * 2;
        let zFactor = 1;
        // Project nose/face forward around front
        if (Math.abs(u - Math.PI / 2) < 0.6 && r === 3) {
          zFactor = 1.35;
        }
        const x = Math.cos(u) * radius * 0.85;
        const z = Math.sin(u) * radius * zFactor;
        points.push({ x, y, z });
      }
    }

    // Connect lines between ring neighbors and adjacent rings
    for (let r = 0; r < rings; r++) {
      for (let p = 0; p < ptsPerRing; p++) {
        const curr = r * ptsPerRing + p;
        const next = r * ptsPerRing + ((p + 1) % ptsPerRing);
        lines.push([curr, next]);
        if (r < rings - 1) {
          const below = (r + 1) * ptsPerRing + p;
          lines.push([curr, below]);
        }
      }
    }

    let angle = 0;
    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      angle += 0.015; // smooth subtle rotation
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const pitch = 0.12; // slight tilt down
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);

      // Project points
      const projected = points.map((pt) => {
        // Rotate around Y axis
        const x1 = pt.x * cosA + pt.z * sinA;
        const z1 = -pt.x * sinA + pt.z * cosA;
        // Pitch tilt
        const y1 = pt.y * cosP - z1 * sinP;
        const z2 = pt.y * sinP + z1 * cosP;

        const fov = 160;
        const scale = fov / (fov + z2 + 50);
        return {
          x: cx + x1 * scale,
          y: cy + y1 * scale,
          z: z2,
        };
      });

      // Draw wireframe lines
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 0.8;
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#00f0ff';

      lines.forEach(([i1, i2]) => {
        const p1 = projected[i1];
        const p2 = projected[i2];
        // Dim back-facing lines for 3D depth
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.15, Math.min(0.85, (avgZ + 40) / 70));
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw small glowing vertex dots
      ctx.fillStyle = '#38bdf8';
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#38bdf8';
      projected.forEach((p) => {
        if (p.z > -10) {
          ctx.globalAlpha = 0.9;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="hud-glass rounded-xl p-4 w-64 md:w-72 shadow-2xl relative overflow-hidden group">
      {/* Corner Bracket Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-400" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-400" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-400/50" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-400/50" />

      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-purple-400" />
          <h3 className="font-chakra text-xs font-bold tracking-widest text-purple-300 uppercase">
            3D MAPPING
          </h3>
        </div>
        <span className="text-[10px] font-mono-tech text-purple-300/80 bg-purple-950/70 px-1.5 py-0.5 rounded border border-purple-500/30">
          MESH_ACTIVE
        </span>
      </div>

      {/* 3D Rotating Canvas & Waveform */}
      <div className="relative flex items-center justify-center h-28 my-1 bg-black/40 rounded-lg border border-purple-500/20 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={180}
          height={110}
          className="w-full h-full object-contain"
        />

        {/* Small Data Waveform overlay on top */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span className="text-[9px] font-mono-tech text-cyan-400">VERT_DENSITY</span>
        </div>

        {/* Grid Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.4) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />
      </div>

      {/* Glowing Data Lines & Information */}
      <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-cyan-500/10 font-mono-tech text-center">
        <div className="p-1.5 rounded bg-slate-900/80 border border-cyan-500/20">
          <div className="text-[9px] text-slate-400">Points</div>
          <div className="text-xs font-bold text-cyan-300">1,248</div>
        </div>
        <div className="p-1.5 rounded bg-slate-900/80 border border-purple-500/20">
          <div className="text-[9px] text-slate-400">Triangles</div>
          <div className="text-xs font-bold text-purple-300">2,486</div>
        </div>
        <div className="p-1.5 rounded bg-slate-900/80 border border-sky-500/20">
          <div className="text-[9px] text-slate-400">Accuracy</div>
          <div className="text-xs font-bold text-sky-300">99.2%</div>
        </div>
      </div>
    </div>
  );
};
