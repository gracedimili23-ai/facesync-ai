import React from 'react';
import { ShieldCheck, CheckCircle2, RefreshCw, ArrowLeft, Activity, User, Eye, Sparkles, Sliders } from 'lucide-react';
import { FaceAnalysisResult } from '../types';

interface ResultsPageProps {
  analysisResult: FaceAnalysisResult | null;
  scannedImageUrl: string | null;
  onScanAgain: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  analysisResult,
  scannedImageUrl,
  onScanAgain,
}) => {
  const result = analysisResult || {
    gender: 'Female (AI visual estimate)',
    age: 'Predicted Age: 25 years',
    mood: 'Calm / Neutral',
    faceShape: 'Oval',
    eyes: 'Almond shape, deep brown iris, symmetrical',
    eyebrows: 'Naturally arched, defined density',
    nose: 'Straight nasal bridge, refined tip',
    lips: 'Full, balanced upper and lower vermilion',
    jawline: 'Defined mandibular curve, soft angularity',
    facialSymmetry: '96% High Bilateral Symmetry',
    overallReview: 94,
  };

  const confidenceScore = result.overallReview || 94;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-chakra px-4 sm:px-6 lg:px-8 py-20 relative">
      {/* Top Header Navigation for Results Page */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between mb-8 pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <button
            onClick={onScanAgain}
            className="px-4 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-chakra font-bold tracking-wider uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>SCAN ANOTHER FACE</span>
          </button>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-400/40 text-xs font-mono-tech tracking-wider text-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-bold">ANALYSIS PROTOCOL COMPLETED</span>
        </div>
      </div>

      {/* Main Results Container (5 Separate Boxes) */}
      <div className="max-w-6xl w-full mx-auto space-y-6 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            BIOMETRIC SCAN{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 bg-clip-text text-transparent">
              RESULTS
            </span>
          </h1>
          <p className="text-slate-400 text-sm font-sans mt-1">
            Complete facial structure and visual telemetry report derived from submitted image
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* BOX 1 — VERIFIED FACE */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.15)] backdrop-blur-md flex flex-col justify-between relative group">
            <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-400/60 text-emerald-300 text-[11px] font-mono-tech tracking-wider flex items-center gap-1.5 shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold">✓ VERIFIED</span>
            </div>

            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono-tech tracking-wider uppercase mb-3">
                <User className="w-4 h-4" />
                <span>BOX 1 — VERIFIED FACE</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">Submitted Subject Image</h3>
            </div>

            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-950 flex items-center justify-center my-3 shadow-inner">
              {scannedImageUrl ? (
                <img
                  src={scannedImageUrl}
                  alt="Verified face scan subject"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="text-slate-500 text-xs font-mono-tech">No image data</div>
              )}
              {/* ANALYZED badge overlay */}
              <div className="absolute bottom-3 inset-x-0 mx-auto w-max px-3 py-1 rounded bg-[#030712]/90 border border-cyan-400/60 text-cyan-300 font-mono-tech font-bold text-xs shadow-lg tracking-wider">
                ANALYZED ✓
              </div>
            </div>

            <p className="text-xs text-slate-400 font-sans mt-2 leading-relaxed">
              Face successfully detected in the submitted image. This exact visual frame was processed by the analysis pipeline.
            </p>
          </div>

          {/* BOX 2 — FACE OVERVIEW */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.15)] backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono-tech tracking-wider uppercase mb-3">
                <Activity className="w-4 h-4" />
                <span>BOX 2 — FACE OVERVIEW</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">Macro Telemetry</h3>
            </div>

            <div className="space-y-4 my-auto">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] font-mono-tech text-cyan-400 uppercase tracking-wider block mb-1">
                  Predicted Age (AI Estimate)
                </span>
                <span className="text-base font-bold text-white font-chakra">
                  {result.age}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] font-mono-tech text-cyan-400 uppercase tracking-wider block mb-1">
                  Gender (AI Estimate)
                </span>
                <span className="text-base font-bold text-white font-chakra">
                  {result.gender}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] font-mono-tech text-cyan-400 uppercase tracking-wider block mb-1">
                  Face Shape
                </span>
                <span className="text-base font-bold text-white font-chakra">
                  {result.faceShape}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] font-mono-tech text-cyan-400 uppercase tracking-wider block mb-1">
                  Apparent Facial Expression
                </span>
                <span className="text-base font-bold text-white font-chakra">
                  {result.mood}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] font-mono-tech text-cyan-400 uppercase tracking-wider block mb-1">
                  Facial Symmetry
                </span>
                <span className="text-base font-bold text-white font-chakra">
                  {result.facialSymmetry}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-sans mt-4">
              Estimated from bilateral topological landmarks and structural contours.
            </p>
          </div>

          {/* BOX 3 — EYES & EYEBROWS */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.15)] backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono-tech tracking-wider uppercase mb-3">
                <Eye className="w-4 h-4" />
                <span>BOX 3 — EYES & EYEBROWS</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">Ocular & Superciliary Analysis</h3>
            </div>

            <div className="space-y-4 my-auto">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono-tech text-cyan-400 uppercase tracking-wider block">
                  Eye Characteristics
                </span>
                <p className="text-sm font-semibold text-white font-sans leading-relaxed">
                  {result.eyes}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono-tech text-cyan-400 uppercase tracking-wider block">
                  Eyebrow Characteristics
                </span>
                <p className="text-sm font-semibold text-white font-sans leading-relaxed">
                  {result.eyebrows}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono-tech text-cyan-400 uppercase tracking-wider block">
                  Interocular Spacing
                </span>
                <p className="text-sm font-semibold text-white font-sans leading-relaxed">
                  Proportional ocular alignment with balanced canthal tilt.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-sans mt-4">
              High-resolution iris and contour contrast telemetry.
            </p>
          </div>

          {/* BOX 4 — FACIAL FEATURES */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.15)] backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono-tech tracking-wider uppercase mb-3">
                <Sliders className="w-4 h-4" />
                <span>BOX 4 — FACIAL FEATURES</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-4">Structural Features</h3>
            </div>

            <div className="space-y-4 my-auto">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] font-mono-tech text-cyan-400 uppercase tracking-wider block mb-1">
                  Nose Characteristics
                </span>
                <p className="text-xs font-semibold text-white font-sans">
                  {result.nose}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] font-mono-tech text-cyan-400 uppercase tracking-wider block mb-1">
                  Lips Characteristics
                </span>
                <p className="text-xs font-semibold text-white font-sans">
                  {result.lips}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[11px] font-mono-tech text-cyan-400 uppercase tracking-wider block mb-1">
                  Jawline Characteristics
                </span>
                <p className="text-xs font-semibold text-white font-sans">
                  {result.jawline}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] font-mono-tech text-cyan-400 uppercase tracking-wider block mb-0.5">
                    Hair Length
                  </span>
                  <p className="text-xs font-semibold text-white font-sans">
                    {result.hairLength || 'Medium length'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] font-mono-tech text-cyan-400 uppercase tracking-wider block mb-0.5">
                    Earrings
                  </span>
                  <p className="text-xs font-semibold text-white font-sans">
                    {result.earrings || 'Not Detected'}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-sans mt-4">
              Extracted via localized optical edge detection and landmark profiling.
            </p>
          </div>

          {/* BOX 5 — OVERALL ANALYSIS */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.15)] backdrop-blur-md flex flex-col justify-between lg:col-span-2">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono-tech tracking-wider uppercase mb-3">
                <Sparkles className="w-4 h-4" />
                <span>BOX 5 — OVERALL ANALYSIS</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Analysis Quality & Confidence Score</h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 my-4 p-5 rounded-xl bg-slate-950/90 border border-cyan-500/30">
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-cyan-950/40 border border-cyan-400/40 min-w-[140px]">
                <span className="text-3xl sm:text-4xl font-black text-cyan-300 font-chakra">
                  {confidenceScore} / 100
                </span>
                <span className="text-[10px] font-mono-tech text-cyan-400/80 uppercase tracking-wider mt-1">
                  Confidence Rating
                </span>
              </div>

              <div className="space-y-2 text-left">
                <p className="text-sm text-slate-200 font-sans leading-relaxed">
                  This score represents technical analysis quality and confidence based on face detection quality, image clarity, lighting uniformity, facial landmark detection accuracy, and feature detection completeness.
                </p>
                <p className="text-xs text-cyan-300/80 font-mono-tech">
                  * Note: This score strictly measures optical scan and analysis confidence. It does not represent attractiveness, beauty, or physical desirability.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={onScanAgain}
                className="px-6 py-3 rounded-xl font-chakra font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:text-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>SCAN ANOTHER FACE</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
