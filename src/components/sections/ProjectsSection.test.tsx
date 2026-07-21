import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProjectsSection } from "./ProjectsSection";

const verifiedPlayStoreUrl = "https://play.google.com/store/apps/details?id=com.dev.musicechoplayer";

afterEach(() => vi.unstubAllGlobals());

describe("ProjectsSection", () => {
  it("renders local fallback data without exposing degraded source status", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 404 })));
    render(<MemoryRouter><ProjectsSection /></MemoryRouter>);

    expect(await screen.findByRole("heading", { name: "MusicEcho Player" })).toBeInTheDocument();
    expect(screen.queryByText(/Showing the verified portfolio copy/)).not.toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Open MusicEcho Player on Google Play" });
    expect(link).toHaveAttribute("href", verifiedPlayStoreUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
