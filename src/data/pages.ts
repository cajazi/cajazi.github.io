import { APIDataSource, CachedDataLayer, LocalDataSource } from "./sources";
import { ContentRepository } from "./contentRepository";
import { validatePages } from "./validators";
import type { PageContent } from "../types/content";

export const pages: PageContent[] = [];

const localPageDataSource = new LocalDataSource(pages);

const avioraPageDataSource = new CachedDataLayer(
  new APIDataSource<PageContent>("/pages", {
    validate: validatePages,
  })
);

export const pageDataSource = new ContentRepository(
  avioraPageDataSource,
  localPageDataSource
);
