import { useEffect } from "react";
import { siteConfig } from "../config/site";
import type { SeoFields } from "../types/content";

type CompleteSeoFields = SeoFields & { noIndex?: boolean };

function setMeta(attribute: "name" | "property", key: string, value: string) {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = value;
}

export function useSeo(fields: CompleteSeoFields) {
  useEffect(() => {
    const canonicalUrl = new URL(fields.canonical ?? "/", siteConfig.url).href;
    const imageUrl = new URL(fields.ogImage ?? siteConfig.defaultOgImage, siteConfig.url).href;
    const type = fields.ogType ?? "website";

    document.title = fields.title;
    setMeta("name", "description", fields.description);
    setMeta("name", "robots", fields.noIndex ? "noindex, follow" : "index, follow");
    setMeta("property", "og:title", fields.title);
    setMeta("property", "og:description", fields.description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", imageUrl);
    setMeta("property", "og:type", type);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fields.title);
    setMeta("name", "twitter:description", fields.description);
    setMeta("name", "twitter:image", imageUrl);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [fields.canonical, fields.description, fields.noIndex, fields.ogImage, fields.ogType, fields.title]);
}
