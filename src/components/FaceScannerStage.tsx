import React, { useRef, useEffect } from 'react';
import { Camera, RefreshCw, X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ScanMode, ScanStatus } from '../types';
import { FacialLandmarkMesh } from './FacialLandmarkMesh';
import { ScanningBeam } from './ScanningBeam';
import { CircularHUD } from './CircularHUD';
import { EnergyPlatform } from './EnergyPlatform';
import { FloatingDataCards } from './FloatingDataCards';

interface FaceScannerStageProps {
  mode: ScanMode;
  defaultFaceUrl: string;
  uploadedImageUrl: string | null;
  cameraStream: MediaStream | null;
  cameraError: string | null;
  meshVisible: boolean;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  onCloseCamera: () => void;
  onTriggerUpload: () => void;
  onResetDemo: () => void;
  onStartCamera?: () => void;
  scanStatus?: ScanStatus;
}

export const FaceScannerStage: React.FC<FaceScannerStageProps> = ({
  mode,
  defaultFaceUrl,
  uploadedImageUrl,
  cameraStream,
  cameraError,
  meshVisible,
  videoRef,
  onCloseCamera,
  onTriggerUpload,
  onResetDemo,
  onStartCamera,
  scanStatus = 'idle',
}) => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const activeVideoRef = videoRef || localVideoRef;

  // Attach stream to video element when in camera mode
  useEffect(() => {
    if (mode === 'camera' && activeVideoRef.current && cameraStream) {
      activeVideoRef.current.srcObject = cameraStream;
      activeVideoRef.current.play().catch((err) => {
        console.warn('Video autoplay play error:', err);
      });
    }
  }, [mode, cameraStream, activeVideoRef]);

  // Determine which image source is active
  const activeImageSrc = mode === 'upload' && uploadedImageUrl ? uploadedImageUrl : defaultFaceUrl;

  return (
    <div className="relative flex items-center justify-center w-full max-w-[500px] lg:max-w-[560px] aspect-[4/5] mx-auto select-none my-4">
      {/* 1. Bottom Futuristic Energy Platform */}
      <EnergyPlatform />

      {/* 2. Rotating Circular HUD Layers */}
      <CircularHUD />

      {/* 3. Floating Biometric Data Cards */}
      <FloatingDataCards faceImageSrc={activeImageSrc} />

      {/* 4. Central Biometric Scanning Viewport Frame */}
      <div className="relative w-[78%] h-[82%] rounded-2xl overflow-hidden border border-cyan-400/40 shadow-[0_0_35px_rgba(6,182,212,0.35),inset_0_0_20px_rgba(6,182,212,0.15)] bg-slate-950 flex items-center justify-center z-10 group">
        
        {/* State Badge Top Center */}
        <div className="absolute top-3 inset-x-0 mx-auto w-max z-30 px-3 py-1 rounded-full bg-[#030712]/80 border border-cyan-400/50 backdrop-blur-md flex items-center gap-2 text-[10px] font-mono-tech tracking-wider text-cyan-300 shadow-md">
          {mode === 'camera' ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-300 font-bold">CAMERA ACTIVE • DETECTING FACE...</span>
            </>
          ) : mode === 'upload' ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-cyan-300 font-bold">IMAGE LOADED • BIOMETRIC MESH ACTIVE</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>AI SCAN CORE • OPTICAL SYNC</span>
            </>
          )}
        </div>

        {/* Mode Controls Top Right Overlay */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
          {mode === 'camera' && (
            <button
              onClick={onCloseCamera}
              className="px-2.5 py-1 rounded bg-rose-950/80 hover:bg-rose-900 border border-rose-500/50 text-rose-200 text-xs font-chakra font-semibold flex items-center gap-1.5 shadow-lg transition-all"
            >
              <X className="w-3.5 h-3.5" />
              <span>CLOSE CAMERA</span>
            </button>
          )}

          {mode === 'upload' && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onTriggerUpload}
                className="px-2.5 py-1 rounded bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-200 text-xs font-chakra font-semibold flex items-center gap-1 shadow-lg transition-all"
              >
                <RefreshCw className="w-3 h-3 text-cyan-400" />
                <span>CHANGE IMAGE</span>
              </button>
              <button
                onClick={onResetDemo}
                title="Reset to default model"
                className="p-1.5 rounded bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {mode === 'demo' && onStartCamera && (
            <button
              onClick={onStartCamera}
              className="px-2.5 py-1 rounded bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-200 text-xs font-chakra font-semibold flex items-center gap-1.5 shadow-lg transition-all"
            >
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              <span>LIVE CAMERA</span>
            </button>
          )}
        </div>

        {/* Camera Permission Denied / Error View */}
        {mode === 'camera' && cameraError && (
          <div className="absolute inset-0 z-25 bg-slate-950/90 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-950/80 border border-rose-500/60 flex items-center justify-center text-rose-400 mb-3 shadow-[0_0_20px_rgba(244,63,94,0.4)]">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="font-chakra font-bold text-slate-100 text-base mb-1">
              CAMERA ACCESS REQUIRED
            </h4>
            <p className="text-xs font-mono-tech text-rose-300/90 max-w-xs mb-4">
              {cameraError}
            </p>
            <div className="flex gap-2">
              <button
                onClick={onCloseCamera}
                className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-chakra font-semibold text-white"
              >
                Return to Simulation
              </button>
            </div>
          </div>
        )}

        {/* Main Visual Display: Live Video vs Realistic Photo */}
        <div className="relative w-full h-full">
          {mode === 'camera' && !cameraError ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover object-center scale-x-[-1]"
            />
          ) : (
            <img
              src={activeImageSrc}
              alt="FaceSync AI Biometric Subject"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          )}

          {/* Holographic Scanline Overlay Pattern */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.25) 2px, rgba(0, 240, 255, 0.25) 4px)',
            }}
          />

          {/* Dark Vignette & Edge Shadowing for Depth */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, transparent 45%, rgba(3, 7, 18, 0.75) 100%)',
            }}
          />

          {/* 5. AI Facial Landmark Mesh Overlay */}
          <FacialLandmarkMesh visible={meshVisible} scanActive={true} />

          {/* 6. Main Moving Electric-Blue Scanning Beam */}
          <ScanningBeam active={true} />

          {/* 7. ANALYZED ✓ Indicator directly ON TOP OF the scanned face image */}
          {scanStatus === 'analyzed' && (
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none animate-fadeIn">
              <div className="px-5 py-2.5 rounded-xl bg-slate-950/85 border border-emerald-400/80 shadow-[0_0_30px_rgba(16,185,129,0.55)] backdrop-blur-md flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span className="font-chakra font-black text-sm md:text-base tracking-widest text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">
                  ANALYZED ✓
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Inner Corner Tech Brackets inside viewport */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

        {/* Real-time Viewport Telemetry readout bottom left */}
        <div className="absolute bottom-3 left-3 z-30 text-[9px] font-mono-tech text-cyan-400/80 bg-slate-950/70 px-2 py-0.5 rounded border border-cyan-500/30 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>ROI: [X:140, Y:80, W:280, H:360]</span>
        </div>
      </div>
    </div>
  );
};
