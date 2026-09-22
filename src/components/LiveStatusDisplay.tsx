import React, { useEffect, useState } from 'react';
import { Radio, CheckCircle2 } from 'lucide-react';
import { ScanStatus } from '../types';

const STATUS_TEXTS = [
  'DETECTING FACE...',
  'MAPPING FEATURES...',
  'ANALYZING STRUCTURE...',
  'PROCESSING VISUAL DATA...',
  'SCANNING...',
];

interface LiveStatusDisplayProps {
  customStatus?: string;
  isPaused?: boolean;
  scanStatus?: ScanStatus;
}

export const LiveStatusDisplay: React.FC<LiveStatusDisplayProps> = ({
  customStatus,
  isPaused = false,
  scanStatus = 'idle',
}) => {
  const [percentage, setPercentage] = useState(68);
  const [statusIdx, setStatusIdx] = useState(0);

  // During active scan flow
  useEffect(() => {
    if (scanStatus === 'scanning') {
      setPercentage(72);
      const interval = setInterval(() => {
        setPercentage((prev) => {
          if (prev >= 98) {
            clearInterval(interval);
            return 99;
          }
          return prev + 3;
        });
      }, 70);
      return () => clearInterval(interval);
    } else if (scanStatus === 'analyzing') {
      setPercentage(100);
    } else if (scanStatus === 'analyzed') {
      setPercentage(100);
    }
  }, [scanStatus]);

  // Idle percentage animation: 68 -> 69 -> 70 -> ... -> 100, then resets to approximately 65 and continues
  useEffect(() => {
    if (isPaused || scanStatus !== 'idle') return;

    const percentInterval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          // Reset to approximately 65
          return 65;
        }
        return prev + 1;
      });
    }, 180);

    return () => clearInterval(percentInterval);
  }, [isPaused, scanStatus]);

  // Idle cycle status text
  useEffect(() => {
    if (isPaused || scanStatus !== 'idle') return;

    const statusInterval = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % STATUS_TEXTS.length);
    }, 2800);

    return () => clearInterval(statusInterval);
  }, [isPaused, scanStatus]);

  // Determine display status text
  let currentStatusText = customStatus || STATUS_TEXTS[statusIdx];
  if (scanStatus === 'scanning') {
    currentStatusText = 'SCANNING...';
  } else if (scanStatus === 'analyzing') {
    currentStatusText = 'ANALYZING...';
  } else if (scanStatus === 'analyzed') {
    currentStatusText = 'ANALYZED ✓';
  }

  const isAnalyzedSuccess = scanStatus === 'analyzed';

  return (
    <div className="hud-glass rounded-xl px-5 py-3 border border-cyan-400/40 shadow-[0_0_25px_rgba(6,182,212,0.3)] backdrop-blur-xl flex items-center justify-between gap-6 min-w-[280px] max-w-[360px] mx-auto z-25 relative">
      {/* Corner Bracket Accents */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400" />

      {/* Status Signal & Text */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center">
          {isAnalyzedSuccess ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse" />
          ) : (
            <>
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <div className="absolute inset-0 w-4 h-4 rounded-full bg-cyan-400/40 animate-ping opacity-60" />
            </>
          )}
        </div>

        <div>
          <div 
            className={`font-chakra font-bold text-xs tracking-widest text-glow-cyan ${
              isAnalyzedSuccess 
                ? 'text-emerald-300' 
                : scanStatus === 'analyzing'
                ? 'text-purple-300 animate-pulse'
                : 'text-cyan-300 animate-pulse'
            }`}
          >
            {currentStatusText}
          </div>
          <div className="text-[9px] font-mono-tech text-slate-400 tracking-wider">
            FRAME_LATENCY: 14MS • 60FPS
          </div>
        </div>
      </div>

      {/* Percentage Readout */}
      <div className="text-right">
        <div className="font-chakra font-black text-2xl tracking-tighter text-white text-glow-white flex items-baseline justify-end gap-0.5">
          <span>{percentage}</span>
          <span className="text-xs text-cyan-400 font-bold">%</span>
        </div>

        {/* Mini progress track */}
        <div className="w-16 h-1 bg-slate-900 rounded-full overflow-hidden border border-cyan-500/30 mt-1">
          <div
            className={`h-full transition-all duration-150 ${
              isAnalyzedSuccess
                ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]'
                : 'bg-gradient-to-r from-cyan-400 to-purple-400 shadow-[0_0_8px_#00f0ff]'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
