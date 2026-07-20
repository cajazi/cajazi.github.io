export type SeoFields = {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
};

export type ContentItemType = "project" | "blogPost";

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
  publishedAt: string;
  readingTime: string;
  tags: string[];
  cover: {
    eyebrow: string;
    gradient: string;
  };
  content: {
    heading: string;
    paragraphs: string[];
  }[];
}
