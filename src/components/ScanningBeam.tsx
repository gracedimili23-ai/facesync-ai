import React from 'react';

interface ScanningBeamProps {
  active?: boolean;
}

export const ScanningBeam: React.FC<ScanningBeamProps> = ({ active = true }) => {
  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* Moving Beam Container with custom CSS keyframes */}
      <div 
        className="absolute left-0 right-0 w-full animate-scan-beam"
        style={{
          height: '2px',
          willChange: 'top, opacity',
        }}
      >
        {/* Soft Glowing Light Trail (Gradual upward and downward gradient) */}
        <div 
          className="absolute -top-16 left-0 right-0 h-16 pointer-events-none opacity-40"
          style={{
            background: 'linear-gradient(to top, rgba(6, 182, 212, 0.45) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 100%)',
          }}
        />

        <div 
          className="absolute top-0 left-0 right-0 h-10 pointer-events-none opacity-30"
          style={{
            background: 'linear-gradient(to bottom, rgba(6, 182, 212, 0.35) 0%, transparent 100%)',
          }}
        />

        {/* High-intensity Core Laser Beam */}
        <div className="relative w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-300 via-white to-transparent shadow-[0_0_16px_#00f0ff,0_0_30px_#06b6d4,0_0_45px_rgba(59,130,246,0.8)]" />

        {/* Left and Right Laser Emitters & Coordinate HUD Indicators */}
        <div className="absolute left-1 -top-2 flex items-center gap-1.5 opacity-90">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00f0ff] animate-ping" />
          <div className="w-4 h-[1px] bg-cyan-400" />
          <span className="text-[9px] font-mono-tech text-cyan-300 tracking-tighter bg-cyan-950/80 px-1 rounded border border-cyan-500/40">
            LASER_Y
          </span>
        </div>

        <div className="absolute right-1 -top-2 flex items-center gap-1.5 opacity-90">
          <span className="text-[9px] font-mono-tech text-cyan-300 tracking-tighter bg-cyan-950/80 px-1 rounded border border-cyan-500/40">
            SYNC_OK
          </span>
          <div className="w-4 h-[1px] bg-cyan-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00f0ff]" />
        </div>
      </div>
    </div>
  );
};
