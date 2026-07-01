import { CachedDataLayer, LocalDataSource } from "./sources";
import type { PageContent } from "../types/content";

export const pages: PageContent[] = [];

export const pageDataSource = new CachedDataLayer(new LocalDataSource(pages));
