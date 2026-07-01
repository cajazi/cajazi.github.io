export type DataResult<T> = T | Promise<T>;

export interface IDataSource<T extends { slug: string }> {
  getAll(): DataResult<T[]>;
  getBySlug(slug: string): DataResult<T | undefined>;
  getFeatured?(): DataResult<T[]>;
}

export class LocalDataSource<T extends { slug: string }>
  implements IDataSource<T>
{
  private readonly items: T[];

  constructor(items: T[]) {
    this.items = items;
  }

  getAll() {
    return this.items;
  }

  getBySlug(slug: string) {
    return this.items.find((item) => item.slug === slug);
  }

  getFeatured() {
    return this.items.filter(
      (item) => Boolean((item as { featured?: unknown }).featured)
    );
  }
}

export class APIDataSource<T extends { slug: string }>
  implements IDataSource<T>
{
  private readonly endpoint: string;
  private readonly init?: RequestInit;

  constructor(endpoint: string, init?: RequestInit) {
    this.endpoint = endpoint;
    this.init = init;
  }

  async getAll() {
    const response = await fetch(this.endpoint, this.init);

    if (!response.ok) {
      throw new Error(`Failed to load data from ${this.endpoint}`);
    }

    return (await response.json()) as T[];
  }

  async getBySlug(slug: string) {
    const items = await this.getAll();
    return items.find((item) => item.slug === slug);
  }

  async getFeatured() {
    const items = await this.getAll();

    return items.filter(
      (item) => Boolean((item as { featured?: unknown }).featured)
    );
  }
}

export class CachedDataLayer<T extends { slug: string }>
  implements IDataSource<T>
{
  private allCache?: T[];
  private readonly slugCache = new Map<string, T | undefined>();
  private readonly source: IDataSource<T>;

  constructor(source: IDataSource<T>) {
    this.source = source;
  }

  getAll() {
    if (this.allCache) {
      return this.allCache;
    }

    const result = this.source.getAll();

    if (result instanceof Promise) {
      return result.then((items) => {
        this.allCache = items;
        return items;
      });
    }

    this.allCache = result;
    return result;
  }

  getBySlug(slug: string) {
    if (this.slugCache.has(slug)) {
      return this.slugCache.get(slug);
    }

    const result = this.source.getBySlug(slug);

    if (result instanceof Promise) {
      return result.then((item) => {
        this.slugCache.set(slug, item);
        return item;
      });
    }

    this.slugCache.set(slug, result);
    return result;
  }

  getFeatured() {
    const result = this.source.getFeatured?.() ?? this.getAll();

    if (result instanceof Promise) {
      return result;
    }

    return result;
  }
}
