import React from 'react';

export const CircularHUD: React.FC = () => {
  return (
    <div className="absolute inset-[-12%] sm:inset-[-15%] md:inset-[-18%] pointer-events-none z-10 flex items-center justify-center">
      {/* Container SVG scaling smoothly with viewport */}
      <svg
        className="w-full h-full max-w-[850px] max-h-[850px] select-none"
        viewBox="0 0 600 600"
        fill="none"
      >
        <defs>
          <linearGradient id="hudCyanPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="hudCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
          </linearGradient>

          <filter id="hudGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Halo behind circular scanner */}
        <circle
          cx="300"
          cy="300"
          r="260"
          stroke="url(#hudCyanPurple)"
          strokeWidth="1.5"
          opacity="0.35"
          filter="url(#hudGlow)"
        />

        {/* LAYER 1: OUTER RING - Clockwise Rotation */}
        <g className="origin-center animate-spin-slow">
          {/* Segmented outer track */}
          <circle
            cx="300"
            cy="300"
            r="275"
            stroke="#0284c7"
            strokeWidth="1"
            strokeDasharray="4 8"
            opacity="0.5"
          />

          {/* Solid accent arcs */}
          <circle
            cx="300"
            cy="300"
            r="275"
            stroke="#00f0ff"
            strokeWidth="2.5"
            strokeDasharray="90 80 40 120"
            filter="url(#hudGlow)"
            opacity="0.75"
          />

          {/* Glowing node dots on outer circumference */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x = 300 + 275 * Math.cos(rad);
            const y = 300 + 275 * Math.sin(rad);
            return (
              <g key={`outer-dot-${deg}`}>
                <circle cx={x} cy={y} r="2.5" fill="#38bdf8" />
                <circle cx={x} cy={y} r="4.5" stroke="#00f0ff" strokeWidth="0.8" opacity="0.6" />
              </g>
            );
          })}
        </g>

        {/* LAYER 2: MIDDLE SEGMENTED RING - Counter-Clockwise Rotation */}
        <g className="origin-center animate-spin-reverse-slow">
          <circle
            cx="300"
            cy="300"
            r="240"
            stroke="#a855f7"
            strokeWidth="2"
            strokeDasharray="60 40 120 60"
            opacity="0.7"
            filter="url(#hudGlow)"
          />

          <circle
            cx="300"
            cy="300"
            r="232"
            stroke="#06b6d4"
            strokeWidth="1"
            strokeDasharray="2 6"
            opacity="0.6"
          />

          {/* Micro tick marks around middle circle */}
          {Array.from({ length: 36 }).map((_, i) => {
            const deg = i * 10;
            const rad = (deg * Math.PI) / 180;
            const x1 = 300 + 242 * Math.cos(rad);
            const y1 = 300 + 242 * Math.sin(rad);
            const x2 = 300 + 248 * Math.cos(rad);
            const y2 = 300 + 248 * Math.sin(rad);
            return (
              <line
                key={`tick-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={i % 3 === 0 ? '#38bdf8' : '#1e3a8a'}
                strokeWidth={i % 3 === 0 ? 1.5 : 0.75}
                opacity={i % 3 === 0 ? 0.9 : 0.4}
              />
            );
          })}
        </g>

        {/* LAYER 3: INNER RETICLE & TARGET LOCK BRACKETS */}
        <g className="origin-center">
          {/* Inner fine ring */}
          <circle
            cx="300"
            cy="300"
            r="205"
            stroke="#0284c7"
            strokeWidth="1"
            strokeDasharray="16 16"
            opacity="0.45"
          />

          {/* 4 Major Compass Crosshairs */}
          {/* Top */}
          <line x1="300" y1="85" x2="300" y2="105" stroke="#00f0ff" strokeWidth="2" />
          {/* Bottom */}
          <line x1="300" y1="495" x2="300" y2="515" stroke="#00f0ff" strokeWidth="2" />
          {/* Left */}
          <line x1="85" y1="300" x2="105" y2="300" stroke="#00f0ff" strokeWidth="2" />
          {/* Right */}
          <line x1="495" y1="300" x2="515" y2="300" stroke="#00f0ff" strokeWidth="2" />

          {/* Futuristic Biometric Target Frame Brackets around face perimeter */}
          {/* Top Left */}
          <path
            d="M 170 180 L 140 180 L 140 210"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2.5"
            opacity="0.85"
            filter="url(#hudGlow)"
          />
          {/* Top Right */}
          <path
            d="M 430 180 L 460 180 L 460 210"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2.5"
            opacity="0.85"
            filter="url(#hudGlow)"
          />
          {/* Bottom Left */}
          <path
            d="M 170 420 L 140 420 L 140 390"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2.5"
            opacity="0.85"
            filter="url(#hudGlow)"
          />
          {/* Bottom Right */}
          <path
            d="M 430 420 L 460 420 L 460 390"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2.5"
            opacity="0.85"
            filter="url(#hudGlow)"
          />

          {/* Degree and Caliber Text labels in HUD style */}
          <text x="306" y="98" fill="#38bdf8" fontSize="8" fontFamily="'Space Mono', monospace" letterSpacing="1">
            000°_SYS_N
          </text>
          <text x="498" y="295" fill="#38bdf8" fontSize="8" fontFamily="'Space Mono', monospace" letterSpacing="1">
            090°_E
          </text>
          <text x="306" y="510" fill="#38bdf8" fontSize="8" fontFamily="'Space Mono', monospace" letterSpacing="1">
            180°_S
          </text>
          <text x="48" y="295" fill="#38bdf8" fontSize="8" fontFamily="'Space Mono', monospace" letterSpacing="1">
            270°_W
          </text>
        </g>
      </svg>
    </div>
  );
};
