import { afterEach, describe, expect, it, vi } from "vitest";
import { projectDataSource } from "./projects";

const verifiedPlayStoreUrl = "https://play.google.com/store/apps/details?id=com.player.echosound";

afterEach(() => vi.unstubAllGlobals());

describe("MusicEcho fallback data", () => {
  it("retains the verified Play Store URL when Aviora fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 404 })));

    const result = await projectDataSource.getBySlugWithStatus("musicecho-player");

    expect(result.degraded).toBe(true);
    expect(result.source).toBe("local-fallback");
    expect(result.data?.links?.store).toBe(verifiedPlayStoreUrl);
  });
});
