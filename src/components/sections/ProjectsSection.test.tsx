import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProjectsSection } from "./ProjectsSection";

const verifiedPlayStoreUrl = "https://play.google.com/store/apps/details?id=com.dev.musicechoplayer";

afterEach(() => vi.unstubAllGlobals());

describe("ProjectsSection", () => {
  it("renders the MusicEcho Play Store action from local fallback data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 404 })));
    render(<MemoryRouter><ProjectsSection /></MemoryRouter>);

    expect(await screen.findByText(/Showing the verified portfolio copy/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "MusicEcho Player" })).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Open MusicEcho Player on Google Play" });
    expect(link).toHaveAttribute("href", verifiedPlayStoreUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
