// Facts below come from each source repository's README/manifests (inspected locally).
export type Integration = 'live' | 'showcase';

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  repo: string;
  integration: Integration;
  stack: string[];
  highlights: string[];
  approach: string; // how it relates to Triwizathon
  blocker?: string;
  license: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'aerosense',
    name: 'AeroSense',
    tagline: 'Acoustic anomaly detection for UAV propellers.',
    repo: 'https://github.com/gee-46/AeroSense',
    integration: 'showcase',
    stack: ['PyTorch', 'FastAPI', 'React', 'TypeScript', 'Grad-CAM', 'SQLAlchemy'],
    highlights: [
      'CNN classifier: 96.0% test accuracy, 0.961 macro F1',
      'Convolutional autoencoder: 0.928 F1, 0.909 ROC-AUC',
      'Decision engine returns NORMAL, ANOMALY or UNKNOWN_ANOMALY',
      'Grad-CAM explains which time/frequency regions drove the verdict'
    ],
    approach:
      'Inference needs the trained PyTorch models and a FastAPI backend, so it stays a separate service. Run it from its own repo; Triwizathon documents and links it.',
    license: 'No license file in repository'
  },
  {
    slug: 'gesture-volume',
    name: 'Gesture Volume Control',
    tagline: 'Control volume with hand gestures through a webcam.',
    repo: 'https://github.com/gee-46/gesture-volume-control',
    integration: 'live',
    stack: ['MediaPipe', 'OpenCV', 'Python', 'Tkinter', 'Windows Core Audio'],
    highlights: [
      'Scale-invariant pinch ratio (thumb tip to index tip over palm size)',
      'Finger counting maps 0-5 raised fingers to 0-100%',
      'Adaptive smoothing of the volume signal',
      'Original is a Windows desktop app that sets system volume'
    ],
    approach:
      'The gesture math and the same MediaPipe hand-landmarker model run in your browser here. A web page cannot change system volume, so the demo drives an on-page meter and an optional tone.',
    license: 'MIT'
  },
  {
    slug: 'harborpulse',
    name: 'HarborPulse',
    tagline: 'AI dock scheduling for congested fishing harbors.',
    repo: 'https://github.com/gee-46/NEURAL-CAPITALS-HarborPulse',
    integration: 'live',
    stack: ['React', 'Firebase', 'Flask', 'Tailwind', 'Telegram gateway'],
    highlights: [
      'Dynamic Weighted Queueing: S = 0.5*wait + 10*perishability - 2*distance',
      'Emergency vessels jump to the front; harbor master can manually bump',
      'Top 8 of 140+ teams, BIT Techverse 26',
      'Firebase config in the repo holds placeholders, not secrets'
    ],
    approach:
      "The priority engine is ported to TypeScript and runs live here. The original's Firebase and Telegram live data needs your own credentials, so it isn't wired in.",
    blocker: 'Live vessel feed requires a Firebase project and Telegram bot token.',
    license: 'No license file in repository'
  },
  {
    slug: 'nutripalm',
    name: 'NutriPalm AI',
    tagline: 'Precision agriculture: farm plots, soil reports, advice.',
    repo: 'https://github.com/gee-46/NutriPalm-AI',
    integration: 'showcase',
    stack: ['React 19', 'Supabase', 'FastAPI', 'Leaflet', 'Google Maps', 'Tailwind 4'],
    highlights: [
      'Plot boundary mapping and area calculation',
      'Soil report analytics and crop suitability',
      'Disease detection and recommendations',
      'README marks it a prototype; real-Supabase verification is outstanding'
    ],
    approach:
      'It is a large app on React 19 with its own auth and database, so merging it here would break this React 18 app. It stays a standalone deployment.',
    blocker: 'Needs Supabase and Google Maps credentials. License is All Rights Reserved, so no code was copied.',
    license: 'All Rights Reserved'
  },
  {
    slug: 'slumsafe',
    name: 'SlumSafe AI',
    tagline: 'Predictive, participatory crime intelligence for data-dark areas.',
    repo: 'https://github.com/gee-46/SlumSafe-AI',
    integration: 'showcase',
    stack: ['Streamlit', 'scikit-learn', 'Random Forest', 'Folium'],
    highlights: [
      'Random Forest crime-risk prediction',
      'Heatmap hotspots and anonymous reporting',
      'Emergency action support',
      '4th of 100+ teams, InnovateX 4.0'
    ],
    approach: 'A Streamlit app cannot run inside a Vite SPA. It stays a separate service and is linked from here.',
    license: 'MIT'
  },
  {
    slug: 'safenet',
    name: 'SafeNet AI',
    tagline: "India's unified public-safety intelligence platform.",
    repo: 'https://github.com/gee-46/safenet-AI',
    integration: 'showcase',
    stack: ['FastAPI', 'PyTorch', 'Neo4j', 'PostgreSQL', 'Redis', 'React 19'],
    highlights: [
      'Scam call classifier (digital arrest, KYC, loan fraud and more)',
      'Counterfeit currency detection by computer vision',
      'Fraud-network graph analysis',
      'Its own WORK_REMAINING.md says training data and model weights are missing'
    ],
    approach: 'Requires Postgres, Neo4j and Redis plus trained weights. It stays a separate deployment.',
    blocker: 'Training data and weights are not in the repository, so it cannot run end to end.',
    license: 'MIT'
  }
];

export const findProject = (slug?: string) => PROJECTS.find((p) => p.slug === slug);
