import React, { useState, useRef } from 'react';
import { 
  Scan, 
  Upload, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  Layers, 
  ShieldCheck, 
  Camera, 
  RefreshCw, 
  Sliders, 
  SlidersHorizontal,
  Info,
  Maximize2
} from 'lucide-react';
import { NavTab, ScanMode, FaceAnalysisResult, ScanStatus } from './types';
import { soundManager } from './utils/soundEffects';
import { analyzeFace } from './utils/faceAnalyzer';
import { Navigation } from './components/Navigation';
import { FuturisticBackground } from './components/FuturisticBackground';
import { FaceScannerStage } from './components/FaceScannerStage';
import { LiveStatusDisplay } from './components/LiveStatusDisplay';
import { ResultsPage } from './components/ResultsPage';
import { AnalysisModal } from './components/AnalysisModal';
import { AboutModal } from './components/AboutModal';

// Bundled realistic portrait
import defaultPortraitImg from './assets/images/realistic_face_scan_1790061379818.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [scanMode, setScanMode] = useState<ScanMode>('demo');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [meshVisible, setMeshVisible] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  // Multi-page flow & Analysis State
  const [currentPage, setCurrentPage] = useState<'home' | 'results'>('home');
  const [scannedImageUrl, setScannedImageUrl] = useState<string | null>(null);
  const [scanStatus, setScanStatus] = useState<ScanStatus>('idle');
  const [analysisResult, setAnalysisResult] = useState<FaceAnalysisResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const analysisSectionRef = useRef<HTMLElement | null>(null);

  // Face Scan Execution: SCANNING... -> ANALYZING... -> ANALYZED ✓ -> Results Page
  const handlePerformFaceScan = async (overrideSource?: string) => {
    if (scanStatus === 'scanning' || scanStatus === 'analyzing') return;

    soundManager.playClick();
    setScanStatus('scanning');

    let activeSnapshot = overrideSource || (scanMode === 'upload' && uploadedImageUrl ? uploadedImageUrl : defaultPortraitImg);

    if (!overrideSource && scanMode === 'camera' && videoRef.current) {
      try {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          activeSnapshot = canvas.toDataURL('image/jpeg', 0.9);
        }
      } catch (e) {
        console.warn('Could not snapshot video:', e);
      }
    } else if (scanMode === 'upload' && uploadedImageUrl) {
      activeSnapshot = uploadedImageUrl;
    }

    setScannedImageUrl(activeSnapshot);

    const analysisPromise = analyzeFace(activeSnapshot);

    setTimeout(async () => {
      setScanStatus('analyzing');

      try {
        const minAnalyzingDelay = new Promise((resolve) => setTimeout(resolve, 350));
        const [result] = await Promise.all([analysisPromise, minAnalyzingDelay]);

        if (result && result.faceDetected === false) {
          alert(result.errorMessage || 'Face not detected. Please use a clear face image.');
          setScanStatus('idle');
          return;
        }

        setAnalysisResult(result);
        setScanStatus('analyzed');
        soundManager.playLockSuccess();

        // Automatically navigate to Results page immediately after analysis is completed
        setTimeout(() => {
          setCurrentPage('results');
        }, 800);
      } catch (err) {
        console.error('Scan error:', err);
        setScanStatus('idle');
      }
    }, 650);
  };

  const handleScanAgain = () => {
    soundManager.playClick();
    setCurrentPage('home');
    setScanStatus('idle');
    setAnalysisResult(null);
    setScannedImageUrl(null);
  };

  // Toggle Sound FX
  const handleToggleSound = () => {
    const isNowOn = soundManager.toggle();
    setSoundEnabled(isNowOn);
  };

  // Start Camera Face Scan
  const handleStartCameraScan = async () => {
    soundManager.playClick();
    setCameraError(null);

    // Stop any existing stream
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera device API is not supported in this browser environment.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setCameraStream(stream);
      setScanMode('camera');
      soundManager.playLockSuccess();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Camera access permission denied or device unavailable.';
      setCameraError(errorMsg);
      setScanMode('camera');
    }
  };

  // Close Camera
  const handleCloseCamera = () => {
    soundManager.playClick();
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setCameraError(null);
    setScanMode('demo');
  };

  // Trigger File Upload Picker
  const handleTriggerUpload = () => {
    soundManager.playClick();
    fileInputRef.current?.click();
  };

  // Handle Uploaded File
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPG, JPEG, PNG, or WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageResult = event.target.result as string;
        // Stop camera if active
        if (cameraStream) {
          cameraStream.getTracks().forEach((track) => track.stop());
          setCameraStream(null);
        }
        setUploadedImageUrl(imageResult);
        setScanMode('upload');
        soundManager.playLockSuccess();

        // Immediately trigger face scan flow on newly uploaded image
        setTimeout(() => {
          handlePerformFaceScan(imageResult);
        }, 300);
      }
    };
    reader.readAsDataURL(file);
    // Reset file input so user can re-select same file if desired
    e.target.value = '';
  };

  // Reset to Demo Model
  const handleResetDemo = () => {
    soundManager.playClick();
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setUploadedImageUrl(null);
    setCameraError(null);
    setScanMode('demo');
    setScanStatus('idle');
  };

  // If results page is active
  if (currentPage === 'results') {
    return (
      <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col relative overflow-x-hidden font-chakra">
        <FuturisticBackground />
        <Navigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onOpenAnalysis={() => setIsAnalysisOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
          onStartScan={() => handlePerformFaceScan()}
        />
        <main className="flex-1">
          <ResultsPage
            analysisResult={analysisResult}
            scannedImageUrl={scannedImageUrl}
            onScanAgain={handleScanAgain}
          />
        </main>
        <footer className="w-full border-t border-cyan-500/20 bg-[#030712]/90 backdrop-blur-md py-6 px-4 z-10 text-xs font-mono-tech text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-cyan-400/80">
              <Scan className="w-4 h-4 text-cyan-400" />
              <span className="font-chakra font-bold text-slate-300">FACESYNC AI</span>
              <span>• PROTOCOL 2026</span>
            </div>

            <div className="text-center text-[11px] text-slate-400 max-w-md">
              Visual Analysis Prototype • Feature Mapping & Topological Structure • No Genetic or Medical Diagnosis
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAboutOpen(true)}
                className="hover:text-cyan-400 transition-colors"
              >
                System Docs
              </button>
            </div>
          </div>
        </footer>

        <AnalysisModal
          isOpen={isAnalysisOpen}
          onClose={() => setIsAnalysisOpen(false)}
          analysisResult={analysisResult}
          scanStatus={scanStatus}
        />

        <AboutModal
          isOpen={isAboutOpen}
          onClose={() => setIsAboutOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col relative overflow-x-hidden font-chakra">
      {/* Hidden File Input for Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* 1. Futuristic Background Atmosphere & Floating Particles */}
      <FuturisticBackground />

      {/* 2. Top Futuristic Navigation */}
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenAnalysis={() => setIsAnalysisOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onStartScan={() => handlePerformFaceScan()}
      />

      {/* 3. Main Hero Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 z-10 flex flex-col justify-center">
        
        {/* Desktop 2-Column Hero Layout: Left Side (Hero Copy & Actions) vs Right/Center (Face Visual Scanner) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SIDE: HERO CONTENT */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Small glowing status badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.25)] text-xs font-mono-tech tracking-wider text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-cyan-400 -ml-4" />
              <span className="font-semibold tracking-widest uppercase">
                ● AI SYSTEM • READY
              </span>
            </div>

            {/* Large Title: FACE SYNC AI (AI with blue/purple gradient glow) */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
                FACE SYNC{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 bg-clip-text text-transparent text-glow-purple">
                  AI
                </span>
              </h1>

              {/* Tagline */}
              <div className="text-xl sm:text-2xl font-bold tracking-wide text-cyan-300 font-chakra text-glow-cyan">
                See. Analyze. Understand.
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300/90 text-sm sm:text-base font-normal font-sans leading-relaxed max-w-lg">
              An AI-powered visual analysis platform designed to transform facial visual data into meaningful insights.
            </p>

            {/* Interactive Mode Indicator Pill */}
            {scanMode !== 'demo' && (
              <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-xs font-mono-tech">
                <span className="text-cyan-300">
                  CURRENT SOURCE: <strong className="uppercase">{scanMode}</strong>
                </span>
                <button
                  onClick={handleResetDemo}
                  className="text-slate-400 hover:text-cyan-300 underline text-[11px]"
                >
                  Reset to Default
                </button>
              </div>
            )}

            {/* TWO MAIN FUNCTIONAL BUTTONS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              {/* START FACE SCAN */}
              <button
                id="btn-start-face-scan"
                onClick={() => handlePerformFaceScan()}
                className="relative group overflow-hidden px-6 py-3.5 rounded-xl font-chakra font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 hover:text-white transition-all shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-slate-950 group-hover:text-white transition-colors" />
                <span>START FACE SCAN</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* UPLOAD IMAGE */}
              <button
                id="btn-upload-image"
                onClick={handleTriggerUpload}
                className="px-6 py-3.5 rounded-xl font-chakra font-bold text-sm tracking-wider uppercase bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Upload className="w-4 h-4 text-cyan-400" />
                <span>UPLOAD IMAGE</span>
              </button>
            </div>

            {/* Mesh Controls & Micro Toggles */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono-tech text-slate-400">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setMeshVisible(!meshVisible);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                  meshVisible
                    ? 'bg-cyan-950/50 border-cyan-500/40 text-cyan-300'
                    : 'bg-slate-900/50 border-slate-700 text-slate-500'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>MESH OVERLAY: {meshVisible ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsAnalysisOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-500/30 bg-purple-950/30 text-purple-300 hover:bg-purple-900/40 transition-all"
              >
                <Maximize2 className="w-3.5 h-3.5 text-purple-400" />
                <span>EXPAND METRICS</span>
              </button>
            </div>
          </div>

          {/* RIGHT / CENTER: MAIN FACE VISUAL & SCANNER */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            
            {/* Hologram Stage (Face + Rotating HUD + Scanning Beam + Landmark Mesh + Platform) */}
            <FaceScannerStage
              mode={scanMode}
              defaultFaceUrl={defaultPortraitImg}
              uploadedImageUrl={uploadedImageUrl}
              cameraStream={cameraStream}
              cameraError={cameraError}
              meshVisible={meshVisible}
              videoRef={videoRef}
              onCloseCamera={handleCloseCamera}
              onTriggerUpload={handleTriggerUpload}
              onResetDemo={handleResetDemo}
              onStartCamera={handleStartCameraScan}
              scanStatus={scanStatus}
            />

            {/* LIVE STATUS BAR (Section 11) */}
            <div className="w-full mt-2 sm:mt-4">
              <LiveStatusDisplay
                scanStatus={scanStatus}
                customStatus={
                  scanStatus === 'idle'
                    ? scanMode === 'camera'
                      ? 'LIVE CAMERA STREAM ACTIVE'
                      : scanMode === 'upload'
                      ? 'PROCESSING UPLOADED IMAGE'
                      : undefined
                    : undefined
                }
              />
            </div>
          </div>
        </div>
      </main>

      {/* 5. Minimalistic High-Tech Footer with Safety Disclaimer */}
      <footer className="w-full border-t border-cyan-500/20 bg-[#030712]/90 backdrop-blur-md py-6 px-4 z-10 text-xs font-mono-tech text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-cyan-400/80">
            <Scan className="w-4 h-4 text-cyan-400" />
            <span className="font-chakra font-bold text-slate-300">FACESYNC AI</span>
            <span>• PROTOCOL 2026</span>
          </div>

          <div className="text-center text-[11px] text-slate-400 max-w-md">
            Visual Analysis Prototype • Feature Mapping & Topological Structure • No Genetic or Medical Diagnosis
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-cyan-400 transition-colors"
            >
              System Docs
            </button>
            <span>•</span>
            <button
              onClick={() => setIsAnalysisOpen(true)}
              className="hover:text-cyan-400 transition-colors"
            >
              Telemetry Matrix
            </button>
          </div>
        </div>
      </footer>

      {/* 6. Modals */}
      <AnalysisModal
        isOpen={isAnalysisOpen}
        onClose={() => setIsAnalysisOpen(false)}
        analysisResult={analysisResult}
        scanStatus={scanStatus}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}
