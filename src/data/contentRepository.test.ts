import { afterEach, describe, expect, it, vi } from "vitest";
import { ContentRepository } from "./contentRepository";
import { APIDataSource, LocalDataSource } from "./sources";

type Item = { slug: string; title: string };
const localItems: Item[] = [{ slug: "local", title: "Verified local project" }];
const repository = (validate?: (value: unknown) => Item[]) => new ContentRepository(
  new APIDataSource<Item>("/projects", { maxRetries: 0, validate }),
  new LocalDataSource(localItems)
);

afterEach(() => vi.restoreAllMocks());

describe("remote content fallback", () => {
  it("uses a successful valid remote response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ data: [{ slug: "remote", title: "Remote project" }] }), { status: 200 })));
    expect(await repository().getAllWithStatus()).toMatchObject({ source: "remote", degraded: false, data: [{ slug: "remote", title: "Remote project" }] });
  });

  it.each([401, 403, 404, 429, 500])("falls back on HTTP %s", async (status) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status })));
    expect(await repository().getAllWithStatus()).toMatchObject({ source: "local-fallback", degraded: true, data: localItems });
  });

  it("falls back on a network rejection", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));
    expect(await repository().getAllWithStatus()).toMatchObject({ source: "local-fallback", data: localItems });
  });

  it("falls back on invalid JSON", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("not-json", { status: 200 })));
    expect(await repository().getAllWithStatus()).toMatchObject({ source: "local-fallback", data: localItems });
  });

  it("falls back on an invalid payload", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ data: [{ wrong: true }] }), { status: 200 })));
    const validate = (value: unknown) => {
      if (!Array.isArray(value) || value.some((item) => typeof item !== "object" || item === null || !("slug" in item))) throw new Error("invalid payload");
      return value as Item[];
    };
    expect(await repository(validate).getAllWithStatus()).toMatchObject({ source: "local-fallback", data: localItems });
  });

  it("preserves a legitimately empty valid remote collection", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ data: [] }), { status: 200 })));
    expect(await repository().getAllWithStatus()).toMatchObject({ source: "remote", degraded: false, data: [] });
  });
});
