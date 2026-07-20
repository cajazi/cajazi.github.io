import { describe, expect, it } from "vitest";
import { isValidPlayStoreUrl } from "./projectLinks";

describe("isValidPlayStoreUrl", () => {
  it("accepts a complete HTTPS Google Play details URL", () => {
    expect(isValidPlayStoreUrl("https://play.google.com/store/apps/details?id=com.player.echosound")).toBe(true);
  });

  it.each([
    "http://play.google.com/store/apps/details?id=com.player.echosound",
    "https://example.com/store/apps/details?id=com.player.echosound",
    "https://play.google.com/store/apps/details",
    "https://play.google.com/store/search?id=com.player.echosound",
    "not a URL",
  ])("rejects invalid Play Store URL %s", (value) => {
    expect(isValidPlayStoreUrl(value)).toBe(false);
  });
});
