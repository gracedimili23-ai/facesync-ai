import React from 'react';
import { 
  ShieldCheck, 
  Scan, 
  Sparkles, 
  Sun, 
  Activity, 
  CheckCircle2 
} from 'lucide-react';
import { FaceAnalysisResult, ScanStatus } from '../../types';

interface OverallReviewPanelProps {
  analysisResult?: FaceAnalysisResult | null;
  scanStatus?: ScanStatus;
}

export const OverallReviewPanel: React.FC<OverallReviewPanelProps> = ({
  analysisResult,
  scanStatus = 'idle',
}) => {
  const isAnalyzed = Boolean(analysisResult && (scanStatus === 'analyzed' || scanStatus === 'idle'));

  // Overall Review score strictly clamped between 75 and 100
  const score = analysisResult?.overallReview
    ? Math.max(75, Math.min(100, Math.round(analysisResult.overallReview)))
    : 92;

  // Derive sub-scores dynamically based on the actual analyzed face or quality breakdown
  const qb = analysisResult?.qualityBreakdown;
  const detectionQuality = qb?.detectionQuality ?? Math.min(99, Math.max(78, score + 2));
  const clarityScore = qb?.imageClarity ?? Math.min(98, Math.max(76, score - 1));
  const lightingScore = qb?.lighting ?? Math.min(97, Math.max(75, score - 3));
  const landmarkScore = qb?.landmarkDetection ?? Math.min(99, Math.max(77, score + 1));
  const featureScore = qb?.featureDetection ?? Math.min(98, Math.max(76, score));
  const confidenceScore = qb?.confidence ?? Math.min(99, Math.max(78, score));

  return (
    <div className="hud-glass rounded-xl p-4 w-64 md:w-72 shadow-2xl relative overflow-hidden group flex flex-col justify-between">
      {/* Corner Bracket Accents matching existing panels */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-400" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-400/50" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400/50" />

      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="font-chakra text-xs font-bold tracking-widest text-emerald-300 uppercase">
            OVERALL REVIEW
          </h3>
        </div>
        <span className="text-[10px] font-mono-tech text-emerald-300/80 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
          {scanStatus === 'scanning' ? (
            <span className="text-cyan-400 animate-pulse">EVAL_SCAN</span>
          ) : scanStatus === 'analyzing' ? (
            <span className="text-purple-400 animate-pulse">COMPUTING</span>
          ) : isAnalyzed ? (
            <>
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
              <span>QUALITY_LOCK</span>
            </>
          ) : (
            'CONF_INDEX'
          )}
        </span>
      </div>

      {/* Primary Box Content: Overall Review & XX / 100 */}
      <div className="my-1.5 p-3 rounded-lg bg-black/40 border border-emerald-500/20 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="text-[11px] font-chakra font-bold tracking-widest text-slate-300 uppercase mb-1">
          Overall Review
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="font-chakra font-black text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-300 drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]">
            {score}
          </span>
          <span className="font-mono-tech text-sm font-semibold text-slate-400">
            / 100
          </span>
        </div>

        {/* High-Tech Progress Bar */}
        <div className="w-full bg-slate-900/90 h-2 rounded-full overflow-hidden border border-emerald-500/30 mt-2 p-[1px]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300 transition-all duration-700 shadow-[0_0_8px_#34d399]"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Breakdown Factors based on quality & confidence */}
      <div className="text-[10px] font-mono-tech space-y-1 text-slate-300 flex-1 my-1">
        <div className="flex justify-between items-center py-0.5 border-b border-white/5">
          <span className="text-slate-400 flex items-center gap-1">
            <Scan className="w-3 h-3 text-cyan-400" />
            Detection Quality:
          </span>
          <span className="text-cyan-300 font-semibold">{detectionQuality}%</span>
        </div>
        <div className="flex justify-between items-center py-0.5 border-b border-white/5">
          <span className="text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-sky-400" />
            Image Clarity:
          </span>
          <span className="text-sky-300 font-semibold">{clarityScore}%</span>
        </div>
        <div className="flex justify-between items-center py-0.5 border-b border-white/5">
          <span className="text-slate-400 flex items-center gap-1">
            <Sun className="w-3 h-3 text-amber-400" />
            Lighting Condition:
          </span>
          <span className="text-amber-300 font-semibold">{lightingScore}%</span>
        </div>
        <div className="flex justify-between items-center py-0.5 border-b border-white/5">
          <span className="text-slate-400 flex items-center gap-1">
            <Activity className="w-3 h-3 text-purple-400" />
            Landmark Precision:
          </span>
          <span className="text-purple-300 font-semibold">{landmarkScore}%</span>
        </div>
        <div className="flex justify-between items-center py-0.5 border-b border-white/5">
          <span className="text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-indigo-400" />
            Feature Detection:
          </span>
          <span className="text-indigo-300 font-semibold">{featureScore}%</span>
        </div>
        <div className="flex justify-between items-center py-0.5">
          <span className="text-slate-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Analysis Confidence:
          </span>
          <span className="text-emerald-300 font-semibold">{confidenceScore}%</span>
        </div>
      </div>

      {/* Quality indicator footer note */}
      <div className="mt-2 text-[9px] font-mono-tech text-slate-500 border-t border-cyan-500/20 pt-1.5 text-center leading-tight">
        Quality & confidence index. Non-attractiveness metric.
      </div>
    </div>
  );
};
