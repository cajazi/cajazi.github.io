export type SeoFields = {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
};

export type ContentItemType = "project" | "blogPost" | "page";

export interface ContentItem {
  id: string;
  slug: string;
  type: ContentItemType;
  seo: SeoFields;
  updatedAt?: string;
}

export interface BlogPost extends ContentItem {
  type: "blogPost";
  title: string;
  excerpt: string;
  featured: boolean;
  publishedAt?: string;
}

export interface PageContent extends ContentItem {
  type: "page";
  title: string;
  body?: string;
  featured: boolean;
}
