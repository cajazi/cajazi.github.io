export const projects = [
  {
    name: 'MusicEcho Player',
    category: 'Production Android App',
    status: 'Live',
    description:
      'A modern offline Android music player with playlists, favorites, equalizer controls, polished UI, and Google Play publishing workflow.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Android', 'Media3', 'AdMob'],
  },
  {
    name: 'Aviora Platform',
    category: 'AI Business Platform',
    status: 'In development',
    description:
      'A scalable business platform built with secure backend APIs, PostgreSQL data architecture, Prisma, and AI-assisted product workflows.',
    technologies: ['Fastify', 'TypeScript', 'Prisma', 'PostgreSQL', 'Supabase'],
  },
  {
    name: 'ClipForge AI Lite',
    category: 'Video Editing Platform',
    status: 'In development',
    description:
      'A professional Android video editing platform targeting CapCut-style workflows, transitions, animations, timeline editing, and export quality.',
    technologies: ['Kotlin', 'Android', 'Media3', 'OpenGL', 'FFmpeg'],
  },
  {
    name: 'My Video API',
    category: 'Video Processing Backend',
    status: 'In development',
    description:
      'A backend API for video rendering workflows with edit specs, background workers, storage integration, and FFmpeg-powered processing.',
    technologies: ['Fastify', 'TypeScript', 'BullMQ', 'Prisma', 'FFmpeg'],
  },
  {
    name: 'DocScanner PDF',
    category: 'Android Document Scanner',
    status: 'In development',
    description:
      'A mobile document scanning product focused on PDF creation, OCR workflows, clean file management, and professional document utilities.',
    technologies: ['Kotlin', 'Jetpack Compose', 'ML Kit', 'Room', 'Android'],
  },
  {
    name: 'Cosmas Technologies Portfolio',
    category: 'Company Website',
    status: 'In development',
    description:
      'The official digital headquarters of Cosmas Technologies, built as a production-grade React application with scalable architecture.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'GitHub Pages'],
  },
] as const;
