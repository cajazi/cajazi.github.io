export type Project = {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
};

export const projects: Project[] = [
  {
    name: "MusicEcho Player",
    description: "Modern Android music player with AdMob, offline playback, and clean architecture.",
    technologies: ["Kotlin", "Jetpack Compose", "AdMob", "Media3"],
    url: "https://github.com/cajazi"
  },
  {
    name: "DocScanner API",
    description: "Backend OCR + document processing engine with Fastify and Prisma.",
    technologies: ["Node.js", "Fastify", "Prisma", "PostgreSQL"],
    url: "https://github.com/cajazi"
  }
];
