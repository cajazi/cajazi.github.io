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
    src: string;
    alt: string;
    width: number;
    height: number;
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
    expandableSections: [
      {
        title: "Core experience",
        content:
          "Offline playback, playlists, favourites, equalizer controls, and a Compose interface designed around local music listening.",
      },
      {
        title: "Technical architecture",
        content:
          "Kotlin and Jetpack Compose provide the application and UI layer, while Media3 owns playback. AdMob is integrated into the production release configuration.",
      },
      {
        title: "Engineering trade-offs",
        content:
          "The product prioritizes a focused offline experience and maintainable playback boundaries instead of adding network-dependent features that are not essential to local listening.",
      },
      {
        title: "Current status",
        content:
          "Published on Google Play. Future work remains guided by verified product needs rather than unsubstantiated usage metrics.",
      },
    ],
    media: [
      {
        label: "Playback architecture",
        src: "/projects/musicecho-architecture.svg",
        alt: "MusicEcho architecture showing Jetpack Compose connected to Kotlin state and the Media3 playback engine",
        width: 1200,
        height: 675,
      },
    ],
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
    expandableSections: [
      {
        title: "Core experience",
        content:
          "A mobile video-editing foundation centred on timeline precision, preview composition, transitions, and an export path.",
      },
      {
        title: "Technical architecture",
        content:
          "Kotlin coordinates the application, Media3 handles media operations, OpenGL supports visual composition, and FFmpeg supports processing and export workflows.",
      },
      {
        title: "Engineering challenge",
        content:
          "Timeline state, preview state, and exported output must remain aligned. The architecture separates those responsibilities so rendering behaviour can evolve without coupling every editor control to the export implementation.",
      },
      {
        title: "Current status",
        content:
          "In development. The current work establishes the video-engine foundation; no public adoption or performance claims are made.",
      },
    ],
    media: [
      {
        label: "Video engine architecture",
        src: "/projects/clipforge-architecture.svg",
        alt: "ClipForge video engine architecture showing timeline state, Media3, OpenGL preview, FFmpeg processing, and export",
        width: 1200,
        height: 675,
      },
    ],
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
    expandableSections: [
      {
        title: "Core capability",
        content:
          "A backend foundation for accepting video work, processing it asynchronously, tracking data, and producing exportable output.",
      },
      {
        title: "Backend and data stack",
        content:
          "Fastify and TypeScript expose the API boundary, BullMQ coordinates queued work, FFmpeg performs media processing, and Prisma connects the service to PostgreSQL.",
      },
      {
        title: "Engineering trade-offs",
        content:
          "Long-running rendering work is kept away from the request-response lifecycle. This adds queue operational complexity but gives the processing pipeline a clearer and more resilient boundary.",
      },
      {
        title: "Current status",
        content:
          "In development as an asynchronous video-processing architecture. Authentication and public deployment details are not presented as complete until they are verifiable.",
      },
    ],
    media: [
      {
        label: "Async rendering pipeline",
        src: "/projects/video-api-architecture.svg",
        alt: "My Video API pipeline showing Fastify, BullMQ, FFmpeg workers, Prisma, PostgreSQL, and storage",
        width: 1200,
        height: 675,
      },
    ],
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
