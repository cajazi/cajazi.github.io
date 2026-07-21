import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { ProjectDetailPage } from "./ProjectDetailPage";

const { getBySlugWithStatus } = vi.hoisted(() => ({ getBySlugWithStatus: vi.fn() }));
vi.mock("../data/projects", () => ({ projectDataSource: { getBySlugWithStatus } }));

function renderPage() {
  return render(<MemoryRouter initialEntries={["/projects/example"]}><Routes><Route path="/projects/:slug" element={<ProjectDetailPage />} /></Routes></MemoryRouter>);
}

describe("ProjectDetailPage", () => {
  it("shows loading without a premature not-found state", () => {
    getBySlugWithStatus.mockReset();
    getBySlugWithStatus.mockReturnValue(new Promise(() => undefined));
    renderPage();
    expect(screen.getByRole("status")).toHaveTextContent("Loading project case study");
    expect(screen.queryByText("Project not found")).not.toBeInTheDocument();
  });

  it("shows a valid not-found state after loading", async () => {
    getBySlugWithStatus.mockReset();
    getBySlugWithStatus.mockResolvedValue({ data: undefined, source: "remote", degraded: false });
    renderPage();
    expect(await screen.findByRole("heading", { name: "Project not found" })).toBeInTheDocument();
  });

  it("renders every supported project link", async () => {
    getBySlugWithStatus.mockReset();
    getBySlugWithStatus.mockResolvedValue({ source: "remote", degraded: false, data: {
      id: "example", slug: "example", type: "project", title: "Example", category: "web", status: "live", role: "Engineer", problem: "Problem", solution: "Solution", impact: "Outcome", tech: ["TypeScript"], featured: true,
      seo: { title: "Example", description: "Example project" }, media: [], links: { live: "https://example.com", github: "https://github.com/example/project", store: "https://play.google.com/store/apps/details?id=example" },
    }});
    renderPage();
    expect((await screen.findAllByRole("link", { name: /live application/ }))[0]).toHaveAttribute("href", "https://example.com");
    expect(screen.getAllByRole("link", { name: /source on GitHub/ })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: /Google Play/ })).toHaveLength(2);
  });

  it("renders the live badge and a primary Play Store action above the case study", async () => {
    getBySlugWithStatus.mockReset();
    getBySlugWithStatus.mockResolvedValue({ source: "local-fallback", degraded: true, data: {
      id: "musicecho", slug: "musicecho-player", type: "project", title: "MusicEcho Player", category: "android", status: "live", role: "Android Engineer", problem: "Problem", solution: "Solution", impact: "Outcome", tech: ["Kotlin"], featured: true,
      seo: { title: "MusicEcho", description: "MusicEcho project" }, media: [], links: { store: "https://play.google.com/store/apps/details?id=com.dev.musicechoplayer" },
    }});
    renderPage();

    expect(await screen.findByText("live")).toBeInTheDocument();
    expect(screen.queryByText(/Showing the verified portfolio copy/)).not.toBeInTheDocument();
    const heroActions = screen.getByTestId("project-hero-actions");
    const primaryLink = heroActions.querySelector<HTMLAnchorElement>('a[aria-label="Open MusicEcho Player on Google Play"]');
    expect(primaryLink).toHaveTextContent("View on Google Play");
    expect(primaryLink).toHaveAttribute("href", "https://play.google.com/store/apps/details?id=com.dev.musicechoplayer");
    expect(primaryLink).toHaveAttribute("target", "_blank");
    expect(primaryLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getAllByRole("link", { name: "Open MusicEcho Player on Google Play" })).toHaveLength(2);
  });
});
