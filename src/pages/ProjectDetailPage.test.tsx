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
    expect(await screen.findByRole("link", { name: /live application/ })).toHaveAttribute("href", "https://example.com");
    expect(screen.getByRole("link", { name: /source on GitHub/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Google Play/ })).toBeInTheDocument();
  });
});
