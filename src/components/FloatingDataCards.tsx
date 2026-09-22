import React from 'react';
import { Scan, Eye, Activity, Database, GitCommit } from 'lucide-react';

interface FloatingDataCardsProps {
  faceImageSrc: string;
}

export const FloatingDataCards: React.FC<FloatingDataCardsProps> = ({ faceImageSrc }) => {
  return (
    <>
      {/* CARD 1: Face Thumbnail with Biometric Crop - Top Left Floating */}
      <div className="hidden xl:flex absolute -left-12 top-10 z-20 hud-glass rounded-lg p-2.5 w-40 border border-cyan-400/30 shadow-lg animate-float-1 pointer-events-auto">
        <div className="flex items-center gap-2.5">
          <div className="relative w-11 h-12 rounded bg-slate-950 border border-cyan-400/50 overflow-hidden flex-shrink-0">
            <img
              src={faceImageSrc}
              alt="Facial Crop"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border border-cyan-400/30" />
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-cyan-400 animate-pulse" />
          </div>
          <div className="text-[10px] font-mono-tech space-y-0.5">
            <div className="text-cyan-300 font-bold flex items-center gap-1">
              <Scan className="w-2.5 h-2.5" />
              <span>CROP_01</span>
            </div>
            <div className="text-slate-400">RES: 512x512</div>
            <div className="text-emerald-400">NORM_OK</div>
          </div>
        </div>
      </div>

      {/* CARD 2: Eye Analysis Miniature - Top Right Floating */}
      <div className="hidden xl:flex absolute -right-10 top-16 z-20 hud-glass rounded-lg p-2.5 w-44 border border-purple-400/30 shadow-lg animate-float-2 pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-950/60 border border-purple-400/50 flex items-center justify-center text-purple-300 flex-shrink-0">
            <Eye className="w-4 h-4 text-purple-400 animate-pulse" />
          </div>
          <div className="text-[10px] font-mono-tech leading-tight">
            <div className="text-purple-300 font-bold">OCULAR_TRACK</div>
            <div className="text-slate-400">GAZE: [0.02, -0.11]</div>
            <div className="text-cyan-400">CONF: 99.8%</div>
          </div>
        </div>
      </div>

      {/* CARD 3: Facial Landmark Geometry Node - Bottom Left Floating */}
      <div className="hidden xl:flex absolute -left-14 bottom-24 z-20 hud-glass rounded-lg p-2.5 w-44 border border-cyan-400/30 shadow-lg animate-float-3 pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-cyan-950/60 border border-cyan-400/50 flex items-center justify-center text-cyan-300 flex-shrink-0">
            <GitCommit className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-[10px] font-mono-tech leading-tight">
            <div className="text-cyan-300 font-bold">NODE_ARRAY</div>
            <div className="text-slate-400">P_COUNT: 68_PTS</div>
            <div className="text-sky-300">DELTA_T: 0.002s</div>
          </div>
        </div>
      </div>

      {/* CARD 4: Data Visualization / Telemetry Stream - Bottom Right Floating */}
      <div className="hidden xl:flex absolute -right-12 bottom-28 z-20 hud-glass rounded-lg p-2.5 w-48 border border-sky-400/30 shadow-lg animate-float-1 pointer-events-auto">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono-tech">
            <span className="text-sky-300 font-bold flex items-center gap-1">
              <Activity className="w-3 h-3 text-sky-400" />
              SPECTRUM
            </span>
            <span className="text-slate-400">5.8 GHZ</span>
          </div>

          {/* Mini spectral bars */}
          <div className="flex items-end gap-1 h-5 pt-1">
            {[40, 75, 55, 90, 65, 85, 45, 95, 70, 60, 80].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-xs transition-all duration-300"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
