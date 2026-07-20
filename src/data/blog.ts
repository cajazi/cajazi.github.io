import { APIDataSource, CachedDataLayer, LocalDataSource } from "./sources";
import { ContentRepository } from "./contentRepository";
import { validateBlogPosts } from "./validators";
import type { BlogPost } from "../types/content";

export const blogPosts: BlogPost[] = [
  {
    id: "production-beyond-prototype",
    type: "blogPost",
    slug: "production-ready-beyond-the-prototype",
    title: "Production-ready software starts beyond the prototype",
    excerpt:
      "A practical engineering checklist for taking a promising application from a working demo to a system people can rely on.",
    publishedAt: "2026-06-30",
    readingTime: "5 min read",
    tags: ["Architecture", "Quality", "Delivery"],
    featured: true,
    cover: {
      eyebrow: "ENGINEERING PRACTICE",
      gradient: "from-cyan-500/30 via-blue-500/15 to-slate-950",
    },
    seo: {
      title: "Production-ready software beyond the prototype | Cosmas Technologies",
      description:
        "A practical checklist for turning a working application prototype into reliable, maintainable production software.",
      canonical: "/blog/production-ready-beyond-the-prototype",
      ogType: "article",
    },
    content: [
      {
        heading: "A working feature is the beginning",
        paragraphs: [
          "A prototype proves that an idea can work. Production engineering asks a wider set of questions: what happens when a dependency is unavailable, an input is malformed, a user opens a deep link, or a deployment has to be repeated by someone else?",
          "The difference is not a single framework or tool. It is the discipline of treating reliability, accessibility, security, observability, and maintainability as part of the feature rather than work deferred until later.",
        ],
      },
      {
        heading: "Design the failure path",
        paragraphs: [
          "Networked applications should make degraded states explicit. Timeouts need boundaries, remote payloads need validation, and a safe local source can keep essential content available when a content API is unfinished or temporarily unavailable.",
          "The interface should also explain what is happening. A loading state prevents a false not-found message, while a quiet fallback notice can preserve trust without blocking the user.",
        ],
      },
      {
        heading: "Make quality repeatable",
        paragraphs: [
          "A production build passing on one machine is useful, but a repeatable pipeline is stronger. A committed lockfile, lint checks, focused behaviour tests, and a clean build should all run before deployment.",
          "Documentation completes that loop. It should explain configuration, content ownership, deployment assumptions, and external steps such as DNS so that repository readiness is never confused with infrastructure readiness.",
        ],
      },
    ],
  },
  {
    id: "offline-first-android",
    type: "blogPost",
    slug: "designing-an-offline-first-android-experience",
    title: "Designing an offline-first Android experience",
    excerpt:
      "What a music player teaches about local-first interaction, predictable state, and designing for unreliable connectivity.",
    publishedAt: "2026-06-24",
    readingTime: "4 min read",
    tags: ["Android", "Kotlin", "Offline-first"],
    featured: true,
    cover: {
      eyebrow: "ANDROID ENGINEERING",
      gradient: "from-blue-500/30 via-cyan-500/10 to-slate-950",
    },
    seo: {
      title: "Designing an offline-first Android experience | Cosmas Technologies",
      description:
        "Engineering lessons from building an offline-focused Android music player with Kotlin, Jetpack Compose, and Media3.",
      canonical: "/blog/designing-an-offline-first-android-experience",
      ogType: "article",
    },
    content: [
      {
        heading: "Offline is a product behaviour",
        paragraphs: [
          "For a local music player, loss of connectivity is normal rather than exceptional. Playback, playlists, favourites, and navigation need to remain coherent without waiting for a server.",
          "That shifts the design centre toward durable local state and immediate feedback. The interface should reflect the state the playback engine actually owns instead of presenting optimistic controls that drift away from reality.",
        ],
      },
      {
        heading: "Keep boundaries clear",
        paragraphs: [
          "Jetpack Compose is responsible for presenting state, while Media3 owns playback behaviour. Keeping those responsibilities explicit makes lifecycle changes and background playback easier to reason about.",
          "The same boundary helps testing: state transformations can be checked independently, and playback integration can be validated around a narrower surface.",
        ],
      },
      {
        heading: "Polish comes from predictable details",
        paragraphs: [
          "A lightweight application still needs careful empty states, permission handling, responsive controls, and recovery when a media item becomes unavailable. These details determine whether offline capability feels intentional.",
          "Production readiness also includes the release path. Store metadata, signing, advertising configuration, and the public app-ads file are operational parts of the product, not separate from engineering quality.",
        ],
      },
    ],
  },
];

const localBlogDataSource = new LocalDataSource(blogPosts);

const avioraBlogDataSource = new CachedDataLayer(
  new APIDataSource<BlogPost>("/blog", {
    validate: validateBlogPosts,
  })
);

export const blogDataSource = new ContentRepository(
  avioraBlogDataSource,
  localBlogDataSource
);
