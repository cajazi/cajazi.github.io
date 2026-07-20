import type { Project } from "./projects";
import type { BlogPost, SeoFields } from "../types/content";

export function validateProjects(data: unknown): Project[] {
  return validateCollection(data, isProject, "Project");
}

export function validateBlogPosts(data: unknown): BlogPost[] {
  return validateCollection(data, isBlogPost, "BlogPost");
}

function validateCollection<T>(
  data: unknown,
  validateItem: (item: unknown) => item is T,
  label: string
): T[] {
  if (!Array.isArray(data)) {
    throw new Error(`${label} response must be an array`);
  }

  if (!data.every(validateItem)) {
    throw new Error(`${label} response contains invalid items`);
  }

  return data;
}

function isProject(item: unknown): item is Project {
  if (!isRecord(item)) {
    return false;
  }

  return (
    isContentBase(item, "project") &&
    typeof item.title === "string" &&
    isProjectCategory(item.category) &&
    isProjectStatus(item.status) &&
    typeof item.role === "string" &&
    typeof item.problem === "string" &&
    typeof item.solution === "string" &&
    typeof item.impact === "string" &&
    Array.isArray(item.tech) &&
    item.tech.every((tech) => typeof tech === "string") &&
    typeof item.featured === "boolean" &&
    isOptionalProjectLinks(item.links) &&
    isOptionalExpandableSections(item.expandableSections) &&
    isOptionalProjectMedia(item.media)
  );
}

function isBlogPost(item: unknown): item is BlogPost {
  if (!isRecord(item)) {
    return false;
  }

  return (
    isContentBase(item, "blogPost") &&
    typeof item.title === "string" &&
    typeof item.excerpt === "string" &&
    typeof item.featured === "boolean" &&
    typeof item.publishedAt === "string" &&
    typeof item.readingTime === "string" &&
    Array.isArray(item.tags) &&
    item.tags.every((tag) => typeof tag === "string") &&
    isRecord(item.cover) &&
    typeof item.cover.eyebrow === "string" &&
    typeof item.cover.gradient === "string" &&
    Array.isArray(item.content) &&
    item.content.every(
      (section) =>
        isRecord(section) &&
        typeof section.heading === "string" &&
        Array.isArray(section.paragraphs) &&
        section.paragraphs.every((paragraph) => typeof paragraph === "string")
    )
  );
}

function isContentBase(
  item: Record<string, unknown>,
  type: "project" | "blogPost"
): boolean {
  return (
    typeof item.id === "string" &&
    typeof item.slug === "string" &&
    item.type === type &&
    isSeoFields(item.seo) &&
    (item.updatedAt === undefined || typeof item.updatedAt === "string")
  );
}

function isSeoFields(value: unknown): value is SeoFields {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    (value.canonical === undefined || typeof value.canonical === "string") &&
    (value.ogImage === undefined || typeof value.ogImage === "string") &&
    (value.ogType === undefined || typeof value.ogType === "string")
  );
}

function isProjectCategory(value: unknown): value is Project["category"] {
  return (
    value === "android" ||
    value === "web" ||
    value === "backend" ||
    value === "ai"
  );
}

function isProjectStatus(value: unknown): value is Project["status"] {
  return value === "live" || value === "in-development";
}

function isOptionalProjectLinks(value: unknown): boolean {
  if (value === undefined) {
    return true;
  }

  if (!isRecord(value)) {
    return false;
  }

  return (
    (value.live === undefined || typeof value.live === "string") &&
    (value.github === undefined || typeof value.github === "string") &&
    (value.store === undefined || typeof value.store === "string")
  );
}

function isOptionalExpandableSections(value: unknown): boolean {
  if (value === undefined) {
    return true;
  }

  return (
    Array.isArray(value) &&
    value.every(
      (section) =>
        isRecord(section) &&
        typeof section.title === "string" &&
        typeof section.content === "string"
    )
  );
}

function isOptionalProjectMedia(value: unknown): boolean {
  if (value === undefined) {
    return true;
  }

  return (
    Array.isArray(value) &&
    value.every(
      (media) =>
        isRecord(media) &&
        typeof media.label === "string" &&
        typeof media.src === "string" &&
        typeof media.alt === "string" &&
        typeof media.width === "number" &&
        typeof media.height === "number"
    )
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
