import { shouldFallbackToLocal, type IDataSource } from "./sources";

export class ContentRepository<T extends { slug: string; category?: string }>
  implements IDataSource<T>
{
  private readonly primary: IDataSource<T>;
  private readonly fallback?: IDataSource<T>;

  constructor(primary: IDataSource<T>, fallback?: IDataSource<T>) {
    this.primary = primary;
    this.fallback = fallback;
  }

  async getAll(): Promise<T[]> {
    return this.resolve(
      () => this.primary.getAll(),
      (fallback) => fallback.getAll()
    );
  }

  async getBySlug(slug: string): Promise<T | undefined> {
    return this.resolve(
      () => this.primary.getBySlug(slug),
      (fallback) => fallback.getBySlug(slug)
    );
  }

  async getFeatured(): Promise<T[]> {
    return this.resolve(
      () => this.primary.getFeatured?.() ?? this.primary.getAll(),
      (fallback) => fallback.getFeatured?.() ?? fallback.getAll()
    );
  }

  async getByCategory(category: string): Promise<T[]> {
    const items = await this.getAll();
    return items.filter((item) => item.category === category);
  }

  private async resolve<Value>(
    loadPrimary: () => Promise<Value>,
    loadFallback: (fallback: IDataSource<T>) => Promise<Value>
  ): Promise<Value> {
    try {
      return await loadPrimary();
    } catch (error) {
      if (!this.fallback || !shouldFallbackToLocal(error)) {
        throw error;
      }

      return loadFallback(this.fallback);
    }
  }
}
