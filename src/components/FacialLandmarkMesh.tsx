import React, { useEffect, useState } from 'react';
import { FACIAL_LANDMARKS, MESH_TRIANGLES } from '../data/facialLandmarks';
import { LandmarkPoint } from '../types';

interface FacialLandmarkMeshProps {
  visible?: boolean;
  scanActive?: boolean;
}

export const FacialLandmarkMesh: React.FC<FacialLandmarkMeshProps> = ({
  visible = true,
  scanActive = true,
}) => {
  const [currentScanY, setCurrentScanY] = useState(50);

  // Sync with the 3.6s verticalScan CSS animation cycle to illuminate passing landmarks
  useEffect(() => {
    if (!scanActive) return;
    let animId: number;
    const period = 3600; // 3.6 seconds to match CSS animation
    const startTime = performance.now();

    const updateScan = (time: number) => {
      const elapsed = (time - startTime) % period;
      const progress = elapsed / period;
      // Sine wave or ping-pong 0 -> 100 -> 0
      let yVal = 0;
      if (progress < 0.5) {
        yVal = (progress / 0.5) * 100;
      } else {
        yVal = 100 - ((progress - 0.5) / 0.5) * 100;
      }
      setCurrentScanY(yVal);
      animId = requestAnimationFrame(updateScan);
    };

    animId = requestAnimationFrame(updateScan);
    return () => cancelAnimationFrame(animId);
  }, [scanActive]);

  if (!visible) return null;

  const getPoint = (id: number): LandmarkPoint | undefined => {
    return FACIAL_LANDMARKS.find((p) => p.id === id);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-15 select-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradients & Filters */}
          <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.35" />
          </linearGradient>

          <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="highGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Triangle Wireframe Mesh Lines */}
        <g opacity="0.75">
          {MESH_TRIANGLES.map((t, idx) => {
            const p1 = getPoint(t.p1);
            const p2 = getPoint(t.p2);
            const p3 = getPoint(t.p3);
            if (!p1 || !p2 || !p3) return null;

            // Check average Y distance from scanning beam
            const avgY = (p1.y + p2.y + p3.y) / 3;
            const dist = Math.abs(avgY - currentScanY);
            const isNearScan = dist < 7;

            return (
              <polygon
                key={`tri-${idx}`}
                points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
                fill={isNearScan ? 'rgba(6, 182, 212, 0.08)' : 'rgba(56, 189, 248, 0.015)'}
                stroke={isNearScan ? '#22d3ee' : '#0284c7'}
                strokeWidth={isNearScan ? '0.35' : '0.2'}
                strokeOpacity={isNearScan ? '0.85' : '0.4'}
                className="transition-colors duration-150"
              />
            );
          })}
        </g>

        {/* Major Contour Lines (Eye sockets, Nose, Mouth, Jawline) */}
        {/* Jawline contour */}
        <polyline
          points="25,35 27,52 31,64 38,74 45,81 50,83 55,81 62,74 69,64 73,52 75,35"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.45"
          strokeDasharray="1.2,0.8"
          opacity="0.8"
          filter="url(#cyanGlow)"
        />

        {/* Left eye contour */}
        <polygon
          points="33,34 37,32 42,34 37,36"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="0.4"
          filter="url(#cyanGlow)"
        />

        {/* Right eye contour */}
        <polygon
          points="58,34 63,32 67,34 63,36"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="0.4"
          filter="url(#cyanGlow)"
        />

        {/* Mouth contour */}
        <polygon
          points="40,60 46,58 50,59 54,58 60,60 56,65 50,67 44,65"
          fill="none"
          stroke="#a855f7"
          strokeWidth="0.38"
          opacity="0.85"
        />

        {/* Landmark Point Dots */}
        {FACIAL_LANDMARKS.map((p) => {
          const distFromScan = Math.abs(p.y - currentScanY);
          const isIlluminated = distFromScan < 6.5;
          const isPupil = p.id === 16 || p.id === 21;
          const isKeyAnchor = p.label !== undefined;

          const radius = isIlluminated ? (isKeyAnchor ? 1.4 : 1.0) : (isKeyAnchor ? 0.8 : 0.55);
          const fillColor = isIlluminated ? '#ffffff' : (isPupil ? '#00f0ff' : (isKeyAnchor ? '#38bdf8' : '#06b6d4'));
          const glowFilter = isIlluminated ? 'url(#highGlow)' : (isKeyAnchor ? 'url(#cyanGlow)' : undefined);

          return (
            <g key={`pt-${p.id}`} className="transition-all duration-100">
              {/* Outer pulsing ring when laser touches point */}
              {isIlluminated && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={radius * 2.2}
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="0.25"
                  opacity="0.9"
                />
              )}

              {/* Central Point */}
              <circle
                cx={p.x}
                cy={p.y}
                r={radius}
                fill={fillColor}
                filter={glowFilter}
                opacity={isIlluminated ? 1 : 0.75}
              />

              {/* Subtle Tech Marker for key cranial anchors */}
              {isKeyAnchor && !isIlluminated && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={radius + 0.6}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="0.15"
                  strokeOpacity="0.6"
                />
              )}
            </g>
          );
        })}

        {/* Center alignment axis & crosshairs */}
        <line
          x1="50"
          y1="12"
          x2="50"
          y2="88"
          stroke="#06b6d4"
          strokeWidth="0.15"
          strokeDasharray="2,2"
          opacity="0.4"
        />
        <line
          x1="22"
          y1="34"
          x2="78"
          y2="34"
          stroke="#06b6d4"
          strokeWidth="0.15"
          strokeDasharray="1.5,1.5"
          opacity="0.35"
        />
      </svg>
    </div>
  );
};
