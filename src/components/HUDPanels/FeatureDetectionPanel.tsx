import React from 'react';
import { CheckCircle2, Shield, Layers } from 'lucide-react';

const FEATURES = [
  { id: 'landmarks', label: 'Facial Landmarks', code: 'LM_68', latency: '4ms' },
  { id: 'texture', label: 'Texture Mapping', code: 'TEX_MAP', latency: '6ms' },
  { id: 'extraction', label: 'Feature Extraction', code: 'VEC_512', latency: '5ms' },
];

export const FeatureDetectionPanel: React.FC = () => {
  return (
    <div className="hud-glass rounded-xl p-3.5 w-60 md:w-64 shadow-2xl relative overflow-hidden group">
      {/* Corner Bracket Accents */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400/50" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/50" />

      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <h3 className="font-chakra text-xs font-bold tracking-widest text-cyan-300 uppercase">
            FEATURE DETECTION
          </h3>
        </div>
        <span className="text-[9px] font-mono-tech text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ACTIVE
        </span>
      </div>

      {/* Checklist items with softly pulsing checkmarks */}
      <div className="space-y-2.5">
        {FEATURES.map((item, idx) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-cyan-500/15 hover:border-cyan-500/35 transition-all group/item"
          >
            <div className="flex items-center gap-2.5">
              {/* Softly pulsing checkmark */}
              <div className="relative flex items-center justify-center">
                <CheckCircle2
                  className="w-4 h-4 text-cyan-400 animate-pulse"
                  style={{ animationDelay: `${idx * 0.35}s` }}
                />
                <div
                  className="absolute inset-0 rounded-full bg-cyan-400/30 blur-sm animate-ping opacity-40"
                  style={{ animationDelay: `${idx * 0.35}s`, animationDuration: '3s' }}
                />
              </div>

              <span className="text-xs font-chakra font-medium tracking-wide text-slate-200">
                {item.label}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[9px] font-mono-tech text-cyan-400/70 block">
                {item.code}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Security & Integrity tag */}
      <div className="mt-3 pt-2 border-t border-cyan-500/10 flex items-center justify-between text-[9px] font-mono-tech text-slate-400">
        <span className="flex items-center gap-1 text-slate-400">
          <Shield className="w-2.5 h-2.5 text-cyan-400" />
          QUANTIZED TENSOR
        </span>
        <span className="text-emerald-400">VERIFIED</span>
      </div>
    </div>
  );
};
