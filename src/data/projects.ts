export type Project = {
  id: string;
  title: string;
  slug: string;

  category: "android" | "web" | "backend" | "ai";

  status: "live" | "in-development";

  role: string;

  problem: string;
  solution: string;
  impact: string;

  tech: string[];

  featured: boolean;

  links?: {
    live?: string;
    github?: string;
    store?: string;
  };

  expandableSections?: {
    title: string;
    content: string;
  }[];

  media?: {
    label: string;
  }[];
};

export interface IDataSource<T extends { slug: string; featured: boolean }> {
  getAll(): T[];
  getBySlug(slug: string): T | undefined;
  getFeatured(): T[];
}

export const projects: Project[] = [
  {
    id: "musicecho",
    title: "MusicEcho Player",
    slug: "musicecho-player",
    category: "android",
    status: "live",
    role: "Android Engineer",

    problem:
      "Many mobile music players are bloated, slow, and lack polished offline-first UX.",

    solution:
      "Built a lightweight Android music player with offline playback, playlists, favorites, equalizer, and clean Jetpack Compose UI.",

    impact:
      "Published on Google Play with production release pipeline and AdMob integration.",

    tech: ["Kotlin", "Jetpack Compose", "Media3", "AdMob"],

    featured: true,

    links: {
      store:
        "https://play.google.com/store/apps/details?id=com.dev.musicechoplayer"
    }
  },

  {
    id: "clipforge",
    title: "ClipForge AI Lite",
    slug: "clipforge-ai-lite",
    category: "ai",
    status: "in-development",
    role: "System Architect (Video Engine)",

    problem:
      "Mobile video editors lack CapCut-level timeline precision and transition parity.",

    solution:
      "Built a CapCut-style video engine using Media3, OpenGL, FFmpeg, and timeline architecture.",

    impact:
      "Established foundation for a production-grade mobile video editing system.",

    tech: ["Kotlin", "Media3", "OpenGL", "FFmpeg"],

    featured: true
  },

  {
    id: "my-video-api",
    title: "My Video API",
    slug: "my-video-api",
    category: "backend",
    status: "in-development",
    role: "Backend Engineer",

    problem:
      "Video applications require backend rendering, storage, and async processing pipelines.",

    solution:
      "Built Fastify backend with FFmpeg rendering, BullMQ queues, Prisma, and storage integration.",

    impact:
      "Enabled scalable async video processing and export pipeline architecture.",

    tech: ["Fastify", "TypeScript", "FFmpeg", "BullMQ", "Prisma", "PostgreSQL"],

    featured: false
  }
];

export const projectDataSource: IDataSource<Project> = {
  getAll() {
    return projects;
  },
  getBySlug(slug) {
    return projects.find((project) => project.slug === slug);
  },
  getFeatured() {
    return projects.filter((project) => project.featured);
  }
};
