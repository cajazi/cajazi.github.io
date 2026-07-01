import { CachedDataLayer, LocalDataSource } from "./sources";
import type { BlogPost } from "../types/content";

export const blogPosts: BlogPost[] = [];

export const blogDataSource = new CachedDataLayer(
  new LocalDataSource(blogPosts)
);
