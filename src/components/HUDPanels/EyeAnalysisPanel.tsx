import React, { useEffect, useRef } from 'react';
import { Eye, Disc } from 'lucide-react';

export const EyeAnalysisPanel: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Continuously animate real-time waveform on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let t = 0;
    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const mid = h / 2;

      // Draw baseline glow
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(w, mid);
      ctx.stroke();

      // Draw primary cyan waveform
      ctx.beginPath();
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#00f0ff';

      for (let x = 0; x < w; x++) {
        // Compose multiple sine harmonics to look like genuine biometric neural/saccadic telemetry
        const wave1 = Math.sin(x * 0.08 + t * 0.12) * 9;
        const wave2 = Math.sin(x * 0.16 - t * 0.18) * 4;
        const wave3 = Math.cos(x * 0.04 + t * 0.06) * 3;
        const y = mid + wave1 + wave2 + wave3;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw secondary purple harmonic
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#a855f7';

      for (let x = 0; x < w; x++) {
        const y = mid + Math.sin(x * 0.06 - t * 0.08) * 7;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      t += 0.5;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="hud-glass rounded-xl p-3.5 w-60 md:w-64 shadow-2xl relative overflow-hidden group">
      {/* Corner Bracket Accents */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400/50" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/50" />

      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <h3 className="font-chakra text-xs font-bold tracking-widest text-cyan-300 uppercase">
            EYE ANALYSIS
          </h3>
        </div>
        <span className="text-[9px] font-mono-tech text-cyan-300 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
          TRACKING
        </span>
      </div>

      {/* Eye Visual Reticle Target */}
      <div className="flex items-center gap-3 my-2">
        <div className="relative w-14 h-14 rounded-full bg-slate-950/80 border border-cyan-500/40 flex items-center justify-center overflow-hidden flex-shrink-0">
          {/* Animated Iris Pattern */}
          <div className="absolute inset-1 rounded-full border border-dashed border-cyan-400/60 animate-spin-slow" />
          <div className="w-6 h-6 rounded-full bg-cyan-900/60 border border-cyan-300 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00f0ff] animate-ping" />
          </div>
          {/* Ocular crosshair */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="w-full h-[1px] bg-cyan-400" />
            <div className="absolute h-full w-[1px] bg-cyan-400" />
          </div>
        </div>

        <div className="text-[11px] font-mono-tech space-y-1 text-slate-300 flex-1">
          <div className="flex justify-between">
            <span className="text-slate-400">Pupil Dil:</span>
            <span className="text-cyan-300 font-semibold">3.8mm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Gaze Lock:</span>
            <span className="text-emerald-400 font-semibold">0.04°</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Iris Sync:</span>
            <span className="text-purple-300 font-semibold">99.4%</span>
          </div>
        </div>
      </div>

      {/* Continuous Waveform Display */}
      <div className="relative h-12 bg-black/50 rounded border border-cyan-500/20 overflow-hidden mt-2">
        <canvas
          ref={canvasRef}
          width={220}
          height={48}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-1 right-2 text-[8px] font-mono-tech text-cyan-400/70">
          OCULAR_HZ: 64.2
        </div>
      </div>

      {/* Glowing Analysis Lines */}
      <div className="mt-2 flex items-center justify-between text-[9px] font-mono-tech text-slate-400">
        <span className="flex items-center gap-1">
          <Disc className="w-2.5 h-2.5 text-cyan-400" />
          SACCADE: NORMAL
        </span>
        <span className="text-cyan-300">DELTA_0.18</span>
      </div>
    </div>
  );
};
