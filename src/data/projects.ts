export type Project = {
  name: string;
  category: string;
  status: string;
  problem: string;
  solution: string;
  impact: string;
  technologies: string[];
  url?: string;
};

export const projects: Project[] = [
  {
    name: "MusicEcho Player",
    category: "Production Android App",
    status: "Live on Google Play",
    problem: "Many local music players feel outdated, cluttered, or lack polished offline playback features.",
    solution: "Built a modern Android music player with offline playback, playlists, favorites, equalizer support, and a polished Jetpack Compose UI.",
    impact: "Published to Google Play with a production release workflow, AdMob integration, and ongoing update pipeline.",
    technologies: ["Kotlin", "Jetpack Compose", "Android", "Media3", "AdMob"],
    url: "https://play.google.com/store/apps/details?id=com.dev.musicechoplayer"
  },
  {
    name: "Aviora Platform",
    category: "AI Business Platform",
    status: "In development",
    problem: "Businesses need a scalable platform that connects organizations, projects, and AI-assisted workflows securely.",
    solution: "Designed a backend-first architecture using Fastify, Prisma, PostgreSQL, and modular service boundaries.",
    impact: "Foundation established for a scalable SaaS ecosystem with secure APIs and future multi-product expansion.",
    technologies: ["Fastify", "TypeScript", "Prisma", "PostgreSQL", "Supabase"]
  },
  {
    name: "ClipForge AI Lite",
    category: "Video Editing Platform",
    status: "In development",
    problem: "Mobile creators need professional editing features like timeline edits, transitions, animations, and reliable export quality.",
    solution: "Built Android video editing architecture targeting CapCut-style workflows with Media3, OpenGL, FFmpeg, and timeline systems.",
    impact: "Established an advanced mobile editing engine foundation with transition parity, animation scope, and export pipeline work.",
    technologies: ["Kotlin", "Android", "Media3", "OpenGL", "FFmpeg"]
  },
  {
    name: "DocScanner PDF",
    category: "Android Document Scanner",
    status: "In development",
    problem: "Users need a clean mobile scanner for document capture, PDF creation, OCR, and file organization.",
    solution: "Designed a Jetpack Compose Android scanner with ML Kit workflows, PDF utilities, OCR support, and Room persistence.",
    impact: "Creates the foundation for a professional document productivity tool with Play Store-ready architecture.",
    technologies: ["Kotlin", "Jetpack Compose", "ML Kit", "Room", "Android"]
  },
  {
    name: "My Video API",
    category: "Video Processing Backend",
    status: "In development",
    problem: "Video applications need backend rendering, storage, edit specifications, and asynchronous processing.",
    solution: "Built a Fastify backend with edit spec contracts, BullMQ workers, Prisma persistence, storage integration, and FFmpeg rendering.",
    impact: "Provides the backend foundation for scalable video processing workflows and future creative applications.",
    technologies: ["Fastify", "TypeScript", "BullMQ", "Prisma", "FFmpeg"]
  }
];
