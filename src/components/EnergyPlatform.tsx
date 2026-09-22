import React from 'react';

export const EnergyPlatform: React.FC = () => {
  return (
    <div className="absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2 w-[120%] sm:w-[130%] md:w-[140%] max-w-[900px] h-[180px] pointer-events-none z-5 flex items-center justify-center">
      {/* 3D Tilted Perspective Stage */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transform: 'perspective(700px) rotateX(72deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Deep ambient glow reflection underneath */}
        <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-r from-cyan-600/30 via-sky-500/20 to-purple-600/30 blur-2xl animate-pulse" />

        {/* Outer Ring - High tech electric neon rim */}
        <div className="absolute w-[92%] h-[92%] rounded-full border border-cyan-400/40 shadow-[0_0_30px_rgba(6,182,212,0.4),inset_0_0_30px_rgba(6,182,212,0.2)] animate-spin-slow" />

        {/* Segmented Counter-Rotating Ring */}
        <div className="absolute w-[82%] h-[82%] rounded-full border-2 border-dashed border-cyan-300/60 shadow-[0_0_20px_rgba(56,189,248,0.35)] animate-spin-reverse-slow" />

        {/* Concentric Neon Purple Ring */}
        <div className="absolute w-[70%] h-[70%] rounded-full border border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.3)] animate-spin-medium" />

        {/* Moving Light Streaks travelling along the circumference */}
        <div className="absolute w-[60%] h-[60%] rounded-full border-[1.5px] border-t-cyan-300 border-r-transparent border-b-purple-400 border-l-transparent shadow-[0_0_20px_#00f0ff] animate-spin" style={{ animationDuration: '6s' }} />

        {/* Inner Pulsing Hologram Core / Nexus */}
        <div className="absolute w-[40%] h-[40%] rounded-full bg-gradient-to-r from-cyan-500/40 via-blue-500/30 to-purple-500/40 blur-md animate-pulse" />
        <div className="absolute w-[22%] h-[22%] rounded-full bg-cyan-300/60 blur-sm shadow-[0_0_25px_#00f0ff] animate-ping opacity-60" />
        <div className="absolute w-[12%] h-[12%] rounded-full bg-white shadow-[0_0_20px_#ffffff]" />

        {/* Radial Energy Rays / Grid lines projecting outward */}
        <div 
          className="absolute inset-0 rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, transparent 40%, rgba(6, 182, 212, 0.25) 70%, transparent 95%), repeating-conic-gradient(from 0deg, transparent 0deg 15deg, rgba(6, 182, 212, 0.3) 15deg 16deg)',
          }}
        />
      </div>

      {/* Ground Projection Light Beam (Vertical ethereal column) */}
      <div 
        className="absolute bottom-10 w-3/4 h-28 pointer-events-none opacity-25 blur-xl"
        style={{
          background: 'linear-gradient(to top, rgba(6, 182, 212, 0.6) 0%, rgba(168, 85, 247, 0.2) 60%, transparent 100%)',
        }}
      />
    </div>
  );
};
