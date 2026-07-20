import type { IDataSource } from "./sources";

export type SourceResult<T> = {
  data: T;
  source: "remote" | "local-fallback";
  degraded: boolean;
  error?: string;
};

export class ContentRepository<T extends { slug: string; category?: string }>
  implements IDataSource<T>
{
  private readonly primary: IDataSource<T>;
  private readonly fallback?: IDataSource<T>;

  constructor(
    primary: IDataSource<T>,
    fallback?: IDataSource<T>
  ) {
    this.primary = primary;
    this.fallback = fallback;
  }

  async getAll(): Promise<T[]> {
    return (await this.getAllWithStatus()).data;
  }

  async getAllWithStatus(): Promise<SourceResult<T[]>> {
    return this.resolveWithStatus(
      () => this.primary.getAll(),
      (fallback) => fallback.getAll()
    );
  }

  async getBySlug(slug: string): Promise<T | undefined> {
    return (await this.getBySlugWithStatus(slug)).data;
  }

  async getBySlugWithStatus(slug: string): Promise<SourceResult<T | undefined>> {
    return this.resolveWithStatus(
      () => this.primary.getBySlug(slug),
      (fallback) => fallback.getBySlug(slug)
    );
  }

  async getFeatured(): Promise<T[]> {
    return (
      await this.resolveWithStatus(
        () => this.primary.getFeatured?.() ?? this.primary.getAll(),
        (fallback) => fallback.getFeatured?.() ?? fallback.getAll()
      )
    ).data;
  }

  async getByCategory(category: string): Promise<T[]> {
    const items = await this.getAll();
    return items.filter((item) => item.category === category);
  }

  private async resolveWithStatus<Value>(
    loadPrimary: () => Promise<Value>,
    loadFallback: (fallback: IDataSource<T>) => Promise<Value>
  ): Promise<SourceResult<Value>> {
    try {
      return { data: await loadPrimary(), source: "remote", degraded: false };
    } catch (error) {
      if (!this.fallback) throw error;

      return {
        data: await loadFallback(this.fallback),
        source: "local-fallback",
        degraded: true,
        error: error instanceof Error ? error.message : "Remote content unavailable",
      };
    }
  }
}
