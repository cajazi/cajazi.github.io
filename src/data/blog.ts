import { APIDataSource, CachedDataLayer, LocalDataSource } from "./sources";
import { ContentRepository } from "./contentRepository";
import { validateBlogPosts } from "./validators";
import type { BlogPost } from "../types/content";

export const blogPosts: BlogPost[] = [];

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
