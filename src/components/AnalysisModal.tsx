import React from 'react';
import { X, Activity, ShieldCheck } from 'lucide-react';
import { FacialAnalysisPanel } from './HUDPanels/FacialAnalysisPanel';
import { ThreeDMappingPanel } from './HUDPanels/ThreeDMappingPanel';
import { EyeAnalysisPanel } from './HUDPanels/EyeAnalysisPanel';
import { FeatureDetectionPanel } from './HUDPanels/FeatureDetectionPanel';
import { FaceAnalysisResult, ScanStatus } from '../types';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisResult?: FaceAnalysisResult | null;
  scanStatus?: ScanStatus;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ 
  isOpen, 
  onClose,
  analysisResult,
  scanStatus = 'idle',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="hud-glass w-full max-w-4xl max-h-[90vh] rounded-2xl border border-cyan-400/50 shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-chakra font-bold text-lg text-white tracking-wider flex items-center gap-2">
                <span>FACIAL VISUAL ANALYSIS</span>
                <span className="text-xs font-mono-tech px-2 py-0.5 rounded bg-cyan-950 border border-cyan-400/40 text-cyan-300">
                  DEEP HUD METRICS
                </span>
              </h2>
              <p className="text-xs font-mono-tech text-slate-400">
                Geometric telemetry, surface topology, and ocular vector computation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with 4 panels & deep analysis stats */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Quick Status Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono-tech">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-cyan-500/20">
              <div className="text-[10px] text-slate-400">FACIAL SYMMETRY</div>
              <div className="text-base sm:text-lg font-bold text-cyan-300 truncate">
                {analysisResult?.facialSymmetry || '97.8% Bilateral'}
              </div>
              <div className="text-[9px] text-emerald-400 mt-0.5">BILATERAL ALIGN</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-purple-500/20">
              <div className="text-[10px] text-slate-400">FACE SHAPE</div>
              <div className="text-base sm:text-lg font-bold text-purple-300 truncate">
                {analysisResult?.faceShape || 'Oval'}
              </div>
              <div className="text-[9px] text-purple-400 mt-0.5">HARMONIC RATIO</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-sky-500/20">
              <div className="text-[10px] text-slate-400">MOOD / EXPRESSION</div>
              <div className="text-base sm:text-lg font-bold text-sky-300 truncate">
                {analysisResult?.mood || 'Calm / Neutral'}
              </div>
              <div className="text-[9px] text-sky-400 mt-0.5">APPARENT STATE</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-emerald-500/20">
              <div className="text-[10px] text-slate-400">OVERALL REVIEW</div>
              <div className="text-xl font-bold text-emerald-300">
                {analysisResult?.overallReview ? `${analysisResult.overallReview} / 100` : '94 / 100'}
              </div>
              <div className="text-[9px] text-emerald-400 mt-0.5">CONFIDENCE INDEX</div>
            </div>
          </div>

          {/* 4 Core HUD Panels rendered in balanced 2x2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start justify-items-center">
            <FacialAnalysisPanel analysisResult={analysisResult} scanStatus={scanStatus} />
            <ThreeDMappingPanel />
            <EyeAnalysisPanel />
            <FeatureDetectionPanel />
          </div>

          {/* Ethics & Safety Notice Box */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-bold text-cyan-300 block font-chakra tracking-wide">
                VISUAL ANALYSIS SAFETY & ACCURACY NOTICE
              </span>
              <p className="font-mono-tech text-[11px] text-slate-400 leading-relaxed">
                FaceSync AI operates purely on geometric surface landmarks, visual feature mapping, and 3D wireframe topology. In compliance with ethical AI standards, this visual analysis platform does not infer genetics, DNA, ancestry, or medical diagnoses.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-cyan-500/20 bg-slate-950/60 flex items-center justify-between">
          <span className="text-[10px] font-mono-tech text-cyan-400/70">
            SECURE CLIENT-SIDE PIPELINE • ZERO EXTERNAL DATA EXFILTRATION
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-chakra font-bold text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
