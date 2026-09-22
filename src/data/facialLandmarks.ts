import { LandmarkPoint, WireframeTriangle } from '../types';

// Normalized 0-100% coordinates tuned for front-facing portrait composition
export const FACIAL_LANDMARKS: LandmarkPoint[] = [
  // Forehead & Temples
  { id: 0, x: 30, y: 22, type: 'forehead', label: 'T_LEFT' },
  { id: 1, x: 38, y: 19, type: 'forehead' },
  { id: 2, x: 50, y: 18, type: 'forehead', label: 'CRANIAL_APEX' },
  { id: 3, x: 62, y: 19, type: 'forehead' },
  { id: 4, x: 70, y: 22, type: 'forehead', label: 'T_RIGHT' },

  // Left Eyebrow
  { id: 5, x: 32, y: 29, type: 'eyebrow' },
  { id: 6, x: 38, y: 27, type: 'eyebrow' },
  { id: 7, x: 44, y: 28, type: 'eyebrow' },

  // Right Eyebrow
  { id: 8, x: 56, y: 28, type: 'eyebrow' },
  { id: 9, x: 62, y: 27, type: 'eyebrow' },
  { id: 10, x: 68, y: 29, type: 'eyebrow' },

  // Glabella (Between brows)
  { id: 11, x: 50, y: 29, type: 'nose', label: 'GLABELLA' },

  // Left Eye
  { id: 12, x: 33, y: 34, type: 'eye', label: 'E_L_OUTER' },
  { id: 13, x: 37, y: 32, type: 'eye' },
  { id: 14, x: 42, y: 34, type: 'eye', label: 'E_L_INNER' },
  { id: 15, x: 37, y: 36, type: 'eye' },
  { id: 16, x: 37, y: 34, type: 'eye', label: 'PUPIL_L' }, // Pupil

  // Right Eye
  { id: 17, x: 58, y: 34, type: 'eye', label: 'E_R_INNER' },
  { id: 18, x: 63, y: 32, type: 'eye' },
  { id: 19, x: 67, y: 34, type: 'eye', label: 'E_R_OUTER' },
  { id: 20, x: 63, y: 36, type: 'eye' },
  { id: 21, x: 63, y: 34, type: 'eye', label: 'PUPIL_R' }, // Pupil

  // Left Cheek / Zygomatic
  { id: 22, x: 26, y: 44, type: 'cheek', label: 'ZYGO_L' },
  { id: 23, x: 34, y: 43, type: 'cheek' },

  // Right Cheek / Zygomatic
  { id: 24, x: 66, y: 43, type: 'cheek' },
  { id: 25, x: 74, y: 44, type: 'cheek', label: 'ZYGO_R' },

  // Nose Bridge & Tip
  { id: 26, x: 50, y: 35, type: 'nose' },
  { id: 27, x: 50, y: 43, type: 'nose', label: 'RHINION' },
  { id: 28, x: 50, y: 49, type: 'nose', label: 'PRONASALE' },
  { id: 29, x: 44, y: 50, type: 'nose', label: 'ALA_L' },
  { id: 30, x: 56, y: 50, type: 'nose', label: 'ALA_R' },
  { id: 31, x: 50, y: 53, type: 'nose', label: 'SUBNASALE' },

  // Philtrum
  { id: 32, x: 50, y: 56, type: 'mouth' },

  // Mouth - Upper Lip
  { id: 33, x: 40, y: 60, type: 'mouth', label: 'COMM_L' },
  { id: 34, x: 46, y: 58, type: 'mouth' },
  { id: 35, x: 50, y: 59, type: 'mouth', label: 'LABRALE_SUP' },
  { id: 36, x: 54, y: 58, type: 'mouth' },
  { id: 37, x: 60, y: 60, type: 'mouth', label: 'COMM_R' },

  // Mouth - Lower Lip
  { id: 38, x: 50, y: 67, type: 'mouth', label: 'LABRALE_INF' },
  { id: 39, x: 44, y: 65, type: 'mouth' },
  { id: 40, x: 56, y: 65, type: 'mouth' },

  // Jawline & Chin
  { id: 41, x: 25, y: 35, type: 'jaw' },
  { id: 42, x: 27, y: 52, type: 'jaw' },
  { id: 43, x: 31, y: 64, type: 'jaw' },
  { id: 44, x: 38, y: 74, type: 'jaw', label: 'GONION_L' },
  { id: 45, x: 45, y: 81, type: 'jaw' },
  { id: 46, x: 50, y: 83, type: 'jaw', label: 'GNATHION' },
  { id: 47, x: 55, y: 81, type: 'jaw' },
  { id: 48, x: 62, y: 74, type: 'jaw', label: 'GONION_R' },
  { id: 49, x: 69, y: 64, type: 'jaw' },
  { id: 50, x: 73, y: 52, type: 'jaw' },
  { id: 51, x: 75, y: 35, type: 'jaw' },
];

// Connecting triangles to form the high-tech biometric wireframe mesh
export const MESH_TRIANGLES: WireframeTriangle[] = [
  // Forehead
  { p1: 0, p2: 1, p3: 5 },
  { p1: 1, p2: 2, p3: 6 },
  { p1: 2, p2: 3, p3: 9 },
  { p1: 3, p2: 4, p3: 10 },
  { p1: 1, p2: 6, p3: 7 },
  { p1: 2, p2: 6, p3: 11 },
  { p1: 2, p2: 9, p3: 11 },
  { p1: 3, p2: 8, p3: 9 },

  // Brows to Glabella
  { p1: 5, p2: 6, p3: 13 },
  { p1: 6, p2: 7, p3: 13 },
  { p1: 7, p2: 11, p3: 14 },
  { p1: 8, p2: 11, p3: 17 },
  { p1: 8, p2: 9, p3: 18 },
  { p1: 9, p2: 10, p3: 18 },

  // Left Eye
  { p1: 12, p2: 13, p3: 15 },
  { p1: 13, p2: 14, p3: 15 },
  { p1: 5, p2: 12, p3: 41 },
  { p1: 12, p2: 22, p3: 41 },

  // Right Eye
  { p1: 17, p2: 18, p3: 20 },
  { p1: 18, p2: 19, p3: 20 },
  { p1: 10, p2: 19, p3: 51 },
  { p1: 19, p2: 25, p3: 51 },

  // Nose Bridge & Cheeks
  { p1: 11, p2: 14, p3: 26 },
  { p1: 11, p2: 17, p3: 26 },
  { p1: 14, p2: 26, p3: 23 },
  { p1: 17, p2: 26, p3: 24 },
  { p1: 12, p2: 15, p3: 23 },
  { p1: 19, p2: 20, p3: 24 },
  { p1: 22, p2: 23, p3: 42 },
  { p1: 24, p2: 25, p3: 50 },

  // Nose Structure
  { p1: 26, p2: 27, p3: 23 },
  { p1: 26, p2: 27, p3: 24 },
  { p1: 27, p2: 28, p3: 29 },
  { p1: 27, p2: 28, p3: 30 },
  { p1: 23, p2: 27, p3: 29 },
  { p1: 24, p2: 27, p3: 30 },
  { p1: 28, p2: 29, p3: 31 },
  { p1: 28, p2: 30, p3: 31 },

  // Cheeks to Mouth
  { p1: 23, p2: 29, p3: 33 },
  { p1: 24, p2: 30, p3: 37 },
  { p1: 29, p2: 31, p3: 34 },
  { p1: 30, p2: 31, p3: 36 },
  { p1: 31, p2: 32, p3: 35 },
  { p1: 31, p2: 34, p3: 35 },
  { p1: 31, p2: 36, p3: 35 },

  // Mouth
  { p1: 33, p2: 34, p3: 39 },
  { p1: 34, p2: 35, p3: 38 },
  { p1: 35, p2: 36, p3: 38 },
  { p1: 36, p2: 37, p3: 40 },
  { p1: 34, p2: 38, p3: 39 },
  { p1: 36, p2: 38, p3: 40 },

  // Jaw & Chin
  { p1: 22, p2: 42, p3: 43 },
  { p1: 23, p2: 33, p3: 43 },
  { p1: 33, p2: 39, p3: 44 },
  { p1: 39, p2: 38, p3: 45 },
  { p1: 38, p2: 45, p3: 46 },
  { p1: 38, p2: 47, p3: 46 },
  { p1: 38, p2: 40, p3: 47 },
  { p1: 37, p2: 40, p3: 48 },
  { p1: 24, p2: 37, p3: 49 },
  { p1: 25, p2: 49, p3: 50 },
  { p1: 43, p2: 44, p3: 45 },
  { p1: 48, p2: 49, p3: 47 },
];
