import { APIDataSource, CachedDataLayer, LocalDataSource } from "./sources";
import { ContentRepository } from "./contentRepository";
import { validateProjects } from "./validators";
import type { ContentItem } from "../types/content";

export interface Project extends ContentItem {
  type: "project";
  title: string;

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
}

export const projects: Project[] = [
  {
    id: "musicecho",
    type: "project",
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

    seo: {
      title: "MusicEcho Player | Case Study",
      description:
        "Many mobile music players are bloated, slow, and lack polished offline-first UX.",
      canonical: "/projects/musicecho-player",
      ogType: "article",
    },

    tech: ["Kotlin", "Jetpack Compose", "Media3", "AdMob"],

    featured: true,

    links: {
      store:
        "https://play.google.com/store/apps/details?id=com.dev.musicechoplayer",
    },
  },

  {
    id: "clipforge",
    type: "project",
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

    seo: {
      title: "ClipForge AI Lite | Case Study",
      description:
        "Mobile video editors lack CapCut-level timeline precision and transition parity.",
      canonical: "/projects/clipforge-ai-lite",
      ogType: "article",
    },

    tech: ["Kotlin", "Media3", "OpenGL", "FFmpeg"],

    featured: true,
  },

  {
    id: "my-video-api",
    type: "project",
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

    seo: {
      title: "My Video API | Case Study",
      description:
        "Video applications require backend rendering, storage, and async processing pipelines.",
      canonical: "/projects/my-video-api",
      ogType: "article",
    },

    tech: ["Fastify", "TypeScript", "FFmpeg", "BullMQ", "Prisma", "PostgreSQL"],

    featured: false,
  },
];

const localProjectDataSource = new LocalDataSource(projects);

const avioraProjectDataSource = new CachedDataLayer(
  new APIDataSource<Project>("/projects", {
    validate: validateProjects,
  })
);

export const projectRepository = new ContentRepository(
  avioraProjectDataSource,
  localProjectDataSource
);

export const projectDataSource = projectRepository;
