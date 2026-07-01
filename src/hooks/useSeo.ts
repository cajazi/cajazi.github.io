import { useEffect } from "react";
import type { SeoFields } from "../types/content";

function ensureMeta(selector: string, create: () => HTMLMetaElement) {
  let element = document.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = create();
    document.head.appendChild(element);
  }

  return element;
}

function ensureCanonical() {
  let canonical = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }

  return canonical;
}

export function useSeo(fields?: SeoFields) {
  useEffect(() => {
    if (!fields) {
      return;
    }

    document.title = fields.title;

    ensureMeta('meta[name="description"]', () => {
      const meta = document.createElement("meta");
      meta.name = "description";
      return meta;
    }).content = fields.description;

    if (fields.ogImage) {
      ensureMeta('meta[property="og:image"]', () => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:image");
        return meta;
      }).content = fields.ogImage;
    }

    if (fields.ogType) {
      ensureMeta('meta[property="og:type"]', () => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:type");
        return meta;
      }).content = fields.ogType;
    }

    if (fields.canonical) {
      ensureCanonical().href = new URL(fields.canonical, window.location.origin)
        .href;
    }
  }, [fields]);
}
