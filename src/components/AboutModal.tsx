import React from 'react';
import { X, Sparkles, Cpu, Shield, Zap, CheckCircle2 } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="hud-glass w-full max-w-2xl rounded-2xl border border-cyan-400/50 shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="font-chakra font-bold text-lg text-white tracking-wider">
              ABOUT FACESYNC AI
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm text-slate-300">
          <div>
            <div className="text-xl font-chakra font-bold text-white mb-1">
              "See. Analyze. Understand."
            </div>
            <p className="text-slate-400 font-mono-tech text-xs leading-relaxed">
              FaceSync AI is a futuristic visual analysis platform engineered to convert complex facial surface data into precise geometric and anatomical insights in real-time.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono-tech text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20 space-y-1.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <div className="font-bold text-cyan-300 font-chakra text-sm">68-Point Mesh</div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Sub-millimeter topological tracking across cranial, ocular, nasal, and mandibular anchors.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/20 space-y-1.5">
              <Zap className="w-4 h-4 text-purple-400" />
              <div className="font-bold text-purple-300 font-chakra text-sm">Real-time Beam</div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Continuous laser sweeping with instantaneous landmark illumination and depth feedback.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-sky-500/20 space-y-1.5">
              <Shield className="w-4 h-4 text-sky-400" />
              <div className="font-bold text-sky-300 font-chakra text-sm">Client Privacy</div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Local in-browser processing ensures your webcam and uploaded imagery never leave your device.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1 text-xs">
            <div className="font-chakra font-bold text-cyan-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              Supported Formats & Hardware
            </div>
            <p className="font-mono-tech text-[11px] text-slate-400">
              Compatible with standard webcams, integrated laptop sensors, and JPG, PNG, WEBP high-resolution imagery.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-cyan-500/20 bg-slate-950/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-chakra font-bold text-xs shadow-md"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
