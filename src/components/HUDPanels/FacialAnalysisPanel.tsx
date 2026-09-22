import React, { useEffect, useState } from 'react';
import { 
  Eye, 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  Sliders, 
  User, 
  Calendar, 
  Smile, 
  Layers, 
  Shield,
  CheckCircle2
} from 'lucide-react';
import { FaceAnalysisResult, ScanStatus } from '../../types';

interface FacialAnalysisPanelProps {
  analysisResult?: FaceAnalysisResult | null;
  scanStatus?: ScanStatus;
}

interface DefaultMetricItem {
  id: string;
  name: string;
  targetVal: number;
  icon: React.ElementType;
  color: string;
}

const DEFAULT_METRICS: DefaultMetricItem[] = [
  { id: 'eyes', name: 'Eyes', targetVal: 98, icon: Eye, color: 'from-cyan-400 to-sky-400' },
  { id: 'nose', name: 'Nose', targetVal: 96, icon: Sliders, color: 'from-sky-400 to-blue-500' },
  { id: 'mouth', name: 'Mouth', targetVal: 94, icon: Activity, color: 'from-blue-400 to-indigo-400' },
  { id: 'jawline', name: 'Jawline', targetVal: 92, icon: ShieldCheck, color: 'from-indigo-400 to-purple-400' },
];

export const FacialAnalysisPanel: React.FC<FacialAnalysisPanelProps> = ({
  analysisResult,
  scanStatus = 'idle',
}) => {
  // Add subtle micro-jitter (+/- 0.5%) to simulate real-time live computer vision tracking when in default view
  const [jitter, setJitter] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setJitter(DEFAULT_METRICS.map(() => (Math.random() - 0.5) * 0.8));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const isAnalyzed = Boolean(analysisResult && (scanStatus === 'analyzed' || scanStatus === 'idle'));

  return (
    <div className="hud-glass rounded-xl p-4 w-72 md:w-80 shadow-2xl relative overflow-hidden group">
      {/* Corner Bracket Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400/50" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/50" />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <h3 className="font-chakra text-xs font-bold tracking-widest text-cyan-300 uppercase">
            FACIAL ANALYSIS
          </h3>
        </div>
        <span className="text-[10px] font-mono-tech text-cyan-400/80 bg-cyan-950/70 px-1.5 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1">
          {scanStatus === 'scanning' ? (
            <span className="text-cyan-400 animate-pulse">SCANNING...</span>
          ) : scanStatus === 'analyzing' ? (
            <span className="text-purple-400 animate-pulse">ANALYZING...</span>
          ) : isAnalyzed ? (
            <>
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
              <span className="text-emerald-300 font-bold">ANALYZED ✓</span>
            </>
          ) : (
            'CONF_HIGH'
          )}
        </span>
      </div>

      {/* When Analyzed: Display 11 results in the EXACT requested order */}
      {isAnalyzed && analysisResult ? (
        <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
          {/* 1. Gender */}
          <div className="p-1.5 rounded-lg bg-slate-950/50 border border-cyan-500/15">
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <div className="flex items-center gap-1.5 text-slate-300">
                <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-medium text-slate-300">1. Gender</span>
              </div>
              <span className="text-cyan-300 font-bold text-right text-[11px]">
                {analysisResult.gender}
              </span>
            </div>
          </div>

          {/* 2. Age */}
          <div className="p-1.5 rounded-lg bg-slate-950/50 border border-cyan-500/15">
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-medium text-slate-300">2. Age</span>
              </div>
              <span className="text-cyan-300 font-bold text-right text-[11px]">
                {analysisResult.age}
              </span>
            </div>
          </div>

          {/* 3. Mood */}
          <div className="p-1.5 rounded-lg bg-slate-950/50 border border-cyan-500/15">
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Smile className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-medium text-slate-300">3. Mood</span>
              </div>
              <span className="text-cyan-300 font-bold text-right text-[11px]">
                {analysisResult.mood}
              </span>
            </div>
          </div>

          {/* 4. Face Shape */}
          <div className="p-1.5 rounded-lg bg-slate-950/50 border border-cyan-500/15">
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-medium text-slate-300">4. Face Shape</span>
              </div>
              <span className="text-cyan-300 font-bold text-right text-[11px]">
                {analysisResult.faceShape}
              </span>
            </div>
          </div>

          {/* 5. Eyes */}
          <div className="p-1.5 rounded-lg bg-slate-950/50 border border-cyan-500/15">
            <div className="flex items-start justify-between text-xs font-mono-tech gap-2">
              <div className="flex items-center gap-1.5 text-slate-300 shrink-0">
                <Eye className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-medium text-slate-300">5. Eyes</span>
              </div>
              <span className="text-cyan-300 font-bold text-right text-[11px] leading-tight">
                {analysisResult.eyes}
              </span>
            </div>
          </div>

          {/* 6. Eyebrows */}
          <div className="p-1.5 rounded-lg bg-slate-950/50 border border-cyan-500/15">
            <div className="flex items-start justify-between text-xs font-mono-tech gap-2">
              <div className="flex items-center gap-1.5 text-slate-300 shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-medium text-slate-300">6. Eyebrows</span>
              </div>
              <span className="text-cyan-300 font-bold text-right text-[11px] leading-tight">
                {analysisResult.eyebrows}
              </span>
            </div>
          </div>

          {/* 7. Nose */}
          <div className="p-1.5 rounded-lg bg-slate-950/50 border border-cyan-500/15">
            <div className="flex items-start justify-between text-xs font-mono-tech gap-2">
              <div className="flex items-center gap-1.5 text-slate-300 shrink-0">
                <Sliders className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-medium text-slate-300">7. Nose</span>
              </div>
              <span className="text-cyan-300 font-bold text-right text-[11px] leading-tight">
                {analysisResult.nose}
              </span>
            </div>
          </div>

          {/* 8. Lips */}
          <div className="p-1.5 rounded-lg bg-slate-950/50 border border-cyan-500/15">
            <div className="flex items-start justify-between text-xs font-mono-tech gap-2">
              <div className="flex items-center gap-1.5 text-slate-300 shrink-0">
                <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-medium text-slate-300">8. Lips</span>
              </div>
              <span className="text-cyan-300 font-bold text-right text-[11px] leading-tight">
                {analysisResult.lips}
              </span>
            </div>
          </div>

          {/* 9. Jawline */}
          <div className="p-1.5 rounded-lg bg-slate-950/50 border border-cyan-500/15">
            <div className="flex items-start justify-between text-xs font-mono-tech gap-2">
              <div className="flex items-center gap-1.5 text-slate-300 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-medium text-slate-300">9. Jawline</span>
              </div>
              <span className="text-cyan-300 font-bold text-right text-[11px] leading-tight">
                {analysisResult.jawline}
              </span>
            </div>
          </div>

          {/* 10. Facial Symmetry */}
          <div className="p-1.5 rounded-lg bg-slate-950/50 border border-cyan-500/15">
            <div className="flex items-start justify-between text-xs font-mono-tech gap-2">
              <div className="flex items-center gap-1.5 text-slate-300 shrink-0">
                <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-medium text-slate-300">10. Facial Symmetry</span>
              </div>
              <span className="text-cyan-300 font-bold text-right text-[11px] leading-tight">
                {analysisResult.facialSymmetry}
              </span>
            </div>
          </div>

          {/* 11. Overall Review / 100 */}
          <div className="mt-3 pt-2.5 border-t border-cyan-500/25 bg-cyan-950/30 rounded-lg p-2.5 border border-cyan-500/20">
            <div className="flex items-center justify-between text-xs font-chakra font-bold mb-1">
              <span className="text-white uppercase tracking-wider">Overall Review</span>
              <span className="font-mono-tech font-black text-sm text-cyan-300">
                <span className="text-base text-cyan-400 font-bold">{analysisResult.overallReview}</span> / 100
              </span>
            </div>

            {/* Glowing Score Progress Bar */}
            <div className="h-2 w-full bg-slate-900/90 rounded-full overflow-hidden p-[1px] border border-cyan-500/30">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400 shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-all duration-700 ease-out"
                style={{ width: `${analysisResult.overallReview}%` }}
              />
            </div>
            <div className="text-[9px] font-mono-tech text-slate-400 mt-1 flex justify-between">
              <span>DETECTION CONFIDENCE</span>
              <span className="text-cyan-400/80">SCORE: {analysisResult.overallReview}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Default view prior to scan (preserves original metrics display) */
        <div className="space-y-3">
          {DEFAULT_METRICS.map((m, idx) => {
            const Icon = m.icon;
            const displayVal = Math.min(100, Math.max(85, Math.round((m.targetVal + jitter[idx]) * 10) / 10));

            return (
              <div key={m.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono-tech">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Icon className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-medium tracking-wide">{m.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-cyan-300 font-bold">{Math.round(displayVal)}%</span>
                    <span className="text-[9px] text-slate-500">SYNC</span>
                  </div>
                </div>

                {/* Glowing Animated Progress Bar */}
                <div className="h-1.5 w-full bg-slate-900/90 rounded-full overflow-hidden p-[1px] border border-cyan-500/20">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${m.color} shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-700 ease-out`}
                    style={{ width: `${displayVal}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Tag */}
      <div className="mt-3.5 pt-2 border-t border-cyan-500/10 flex items-center justify-between text-[9px] font-mono-tech text-cyan-400/60">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          LANDMARK MATCH
        </span>
        <span>SIGMA_0.024</span>
      </div>
    </div>
  );
};
