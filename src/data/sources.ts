export interface IDataSource<T extends { slug: string }> {
  getAll(): Promise<T[]>;
  getBySlug(slug: string): Promise<T | undefined>;
  getFeatured?(): Promise<T[]>;
}

const AVIORA_BASE_URL = "https://api.aviora.dev/api/v1";
const DEFAULT_TIMEOUT_MS = 6_000;
const DEFAULT_RETRIES = 2;
const RETRY_DELAYS_MS = [300, 900] as const;

export class LocalDataSource<T extends { slug: string }>
  implements IDataSource<T>
{
  private readonly items: T[];

  constructor(items: T[]) {
    this.items = items;
  }

  async getAll(): Promise<T[]> {
    return this.items;
  }

  async getBySlug(slug: string): Promise<T | undefined> {
    return this.items.find((item) => item.slug === slug);
  }

  async getFeatured(): Promise<T[]> {
    return this.items.filter(
      (item) => Boolean((item as { featured?: unknown }).featured)
    );
  }
}

export class APIDataSource<T extends { slug: string }>
  implements IDataSource<T>
{
  private readonly resourcePath: string;
  private readonly init: RequestInit;
  private readonly timeoutMs: number;
  private readonly maxRetries: number;
  private readonly validate?: (data: unknown) => T[];

  constructor(
    resourcePath: AvioraResourcePath,
    config: APIDataSourceConfig<T> = {}
  ) {
    this.resourcePath = resourcePath;
    this.timeoutMs = config.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    this.maxRetries = config.maxRetries ?? DEFAULT_RETRIES;
    this.validate = config.validate;
    this.init = {
      ...config.init,
      headers: {
        ...config.init?.headers,
        ...config.headers,
      },
    };
  }

  async getAll(): Promise<T[]> {
    return this.fetchCollection(this.resourcePath);
  }

  async getBySlug(slug: string): Promise<T | undefined> {
    const items = await this.fetchCollection(`${this.resourcePath}/${slug}`);
    return items[0];
  }

  async getFeatured(): Promise<T[]> {
    const items = await this.getAll();

    return items.filter(
      (item) => Boolean((item as { featured?: unknown }).featured)
    );
  }

  private async fetchCollection(path: string): Promise<T[]> {
    const response = await this.fetchWithRetry(this.toAvioraUrl(path));
    const payload: unknown = await response.json().catch(() => {
      throw new RetryableApiError("Aviora returned invalid JSON");
    });

    return normalizeApiResponse(payload, this.validate);
  }

  private async fetchWithRetry(url: string): Promise<Response> {
    let attempt = 0;

    while (true) {
      try {
        const response = await this.fetchWithTimeout(url);

        if (response.ok) {
          return response;
        }

        if (!this.shouldRetryStatus(response.status)) {
          throw new ApiRequestError(
            `Aviora request failed with status ${response.status}`,
            false
          );
        }

        if (attempt >= this.maxRetries) {
          throw new ApiRequestError(
            `Aviora request failed with status ${response.status}`,
            true
          );
        }
      } catch (error) {
        if (!isRetryableError(error) || attempt >= this.maxRetries) {
          throw error;
        }
      }

      await delay(RETRY_DELAYS_MS[attempt] ?? RETRY_DELAYS_MS.at(-1) ?? 300);
      attempt += 1;
    }
  }

  private async fetchWithTimeout(url: string): Promise<Response> {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      return await fetch(url, {
        ...this.init,
        signal: controller.signal,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new RetryableApiError("Aviora request timed out");
      }

      throw new RetryableApiError(
        error instanceof Error ? error.message : "Aviora network request failed"
      );
    } finally {
      window.clearTimeout(timeout);
    }
  }

  private shouldRetryStatus(status: number): boolean {
    return status >= 500 || status === 408 || status === 429;
  }

  private toAvioraUrl(path: string): string {
    return `${AVIORA_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  }
}

export class CachedDataLayer<T extends { slug: string }>
  implements IDataSource<T>
{
  private allCache?: CacheEntry<T[]>;
  private featuredCache?: CacheEntry<T[]>;
  private readonly slugCache = new Map<string, CacheEntry<T | undefined>>();
  private readonly source: IDataSource<T>;
  private readonly maxAgeMs: number;

  constructor(source: IDataSource<T>, config: CacheConfig = {}) {
    this.source = source;
    this.maxAgeMs = config.maxAgeMs ?? DEFAULT_CACHE_MAX_AGE_MS;
  }

  async getAll(): Promise<T[]> {
    if (this.allCache && !this.isExpired(this.allCache)) {
      return this.allCache.value;
    }

    if (this.allCache) {
      this.refreshInBackground(() => this.refreshAll());
      return this.allCache.value;
    }

    return this.refreshAll();
  }

  async getBySlug(slug: string): Promise<T | undefined> {
    const cached = this.slugCache.get(slug);

    if (cached && !this.isExpired(cached)) {
      return cached.value;
    }

    if (cached) {
      this.refreshInBackground(() => this.refreshSlug(slug));
      return cached.value;
    }

    return this.refreshSlug(slug);
  }

  async getFeatured(): Promise<T[]> {
    if (this.featuredCache && !this.isExpired(this.featuredCache)) {
      return this.featuredCache.value;
    }

    if (this.featuredCache) {
      this.refreshInBackground(() => this.refreshFeatured());
      return this.featuredCache.value;
    }

    return this.refreshFeatured();
  }

  private async refreshAll(): Promise<T[]> {
    const items = await this.source.getAll();
    this.allCache = this.toCacheEntry(items);
    return items;
  }

  private async refreshSlug(slug: string): Promise<T | undefined> {
    const item = await this.source.getBySlug(slug);
    this.slugCache.set(slug, this.toCacheEntry(item));
    return item;
  }

  private async refreshFeatured(): Promise<T[]> {
    const items = await (this.source.getFeatured?.() ?? this.getAll());
    this.featuredCache = this.toCacheEntry(items);
    return items;
  }

  private isExpired(entry: CacheEntry<unknown>): boolean {
    return Date.now() - entry.createdAt > this.maxAgeMs;
  }

  private toCacheEntry<Value>(value: Value): CacheEntry<Value> {
    return {
      value,
      createdAt: Date.now(),
    };
  }

  private refreshInBackground(refresh: () => Promise<unknown>): void {
    refresh().catch(() => {
      // Keep stale cache available when revalidation fails.
    });
  }
}

interface CacheConfig {
  maxAgeMs?: number;
}

interface CacheEntry<T> {
  value: T;
  createdAt: number;
}

const DEFAULT_CACHE_MAX_AGE_MS = 5 * 60 * 1000;

export type AvioraResourcePath =
  | "/projects"
  | "/blog"
  | "/pages"
  | "/profile";

interface APIDataSourceConfig<T extends { slug: string }> {
  init?: RequestInit;
  headers?: {
    Authorization?: `Bearer ${string}`;
  };
  timeoutMs?: number;
  maxRetries?: number;
  validate?: (data: unknown) => T[];
}

interface AvioraEnvelope {
  data: unknown;
}

class RetryableApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RetryableApiError";
  }
}

class ApiRequestError extends Error {
  readonly fallbackAllowed: boolean;

  constructor(message: string, fallbackAllowed: boolean) {
    super(message);
    this.name = "ApiRequestError";
    this.fallbackAllowed = fallbackAllowed;
  }
}

export function shouldFallbackToLocal(error: unknown): boolean {
  return !(error instanceof ApiRequestError) || error.fallbackAllowed;
}

export function normalizeApiResponse<T>(
  response: unknown,
  validate?: (data: unknown) => T[]
): T[] {
  if (!isAvioraEnvelope(response)) {
    throw new RetryableApiError("Aviora response envelope is invalid");
  }

  const collection = Array.isArray(response.data)
    ? response.data
    : [response.data];

  if (validate) {
    return validate(collection);
  }

  return collection as T[];
}

function isAvioraEnvelope(response: unknown): response is AvioraEnvelope {
  return (
    typeof response === "object" &&
    response !== null &&
    Object.prototype.hasOwnProperty.call(response, "data")
  );
}

function isRetryableError(error: unknown): boolean {
  return error instanceof RetryableApiError;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}
