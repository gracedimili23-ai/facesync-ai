export type ScanMode = 'demo' | 'camera' | 'upload';

export type ScanStatus = 'idle' | 'scanning' | 'analyzing' | 'analyzed' | 'error';

export type NavTab = 'home' | 'scan' | 'analysis' | 'about';

export interface FaceAnalysisResult {
  faceDetected?: boolean;
  errorMessage?: string;
  gender: string;
  age: string;
  mood: string;
  faceShape: string;
  eyes: string;
  eyebrows: string;
  nose: string;
  lips: string;
  jawline: string;
  facialSymmetry: string;
  hairLength?: string;
  earrings?: string;
  overallReview: number;
  qualityBreakdown?: {
    detectionQuality: number;
    imageClarity: number;
    lighting: number;
    landmarkDetection: number;
    featureDetection: number;
    confidence: number;
  };
}

export interface FacialMetric {
  name: string;
  value: number; // e.g. 98, 96, 94, 92
  icon: string;
  status: string;
}

export interface LandmarkPoint {
  id: number;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  type: 'forehead' | 'eyebrow' | 'eye' | 'nose' | 'mouth' | 'jaw' | 'cheek';
  label?: string;
}

export interface WireframeTriangle {
  p1: number;
  p2: number;
  p3: number;
}

export interface FeatureCheckItem {
  id: string;
  title: string;
  status: 'active' | 'synced' | 'processing';
  confidence: number;
}

export interface SystemTelemetry {
  fps: number;
  latencyMs: number;
  dataRate: string;
  pointsMapped: number;
  trianglesComputed: number;
  accuracy: number;
}
