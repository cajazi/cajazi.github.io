import { describe, expect, it } from "vitest";
import { isValidPlayStoreUrl } from "./projectLinks";

describe("isValidPlayStoreUrl", () => {
  it("accepts a complete HTTPS Google Play details URL", () => {
    expect(isValidPlayStoreUrl("https://play.google.com/store/apps/details?id=com.dev.musicechoplayer")).toBe(true);
  });

  it.each([
    "http://play.google.com/store/apps/details?id=com.dev.musicechoplayer",
    "https://example.com/store/apps/details?id=com.dev.musicechoplayer",
    "https://play.google.com/store/apps/details",
    "https://play.google.com/store/search?id=com.dev.musicechoplayer",
    "not a URL",
  ])("rejects invalid Play Store URL %s", (value) => {
    expect(isValidPlayStoreUrl(value)).toBe(false);
  });
});
