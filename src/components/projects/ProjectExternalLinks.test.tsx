import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { projects } from "../../data/projects";
import { ProjectExternalLinks } from "./ProjectExternalLinks";

const musicEcho = projects.find((project) => project.id === "musicecho");
const verifiedPlayStoreUrl = "https://play.google.com/store/apps/details?id=com.dev.musicechoplayer";

describe("ProjectExternalLinks", () => {
  it("renders MusicEcho as a direct external Google Play anchor with the verified package ID", () => {
    render(<ProjectExternalLinks links={musicEcho?.links} projectTitle="MusicEcho Player" />);

    const link = screen.getByRole("link", { name: "Open MusicEcho Player on Google Play" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", verifiedPlayStoreUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(link).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
    expect(new URL(link.getAttribute("href")!).searchParams.get("id")).toBe("com.dev.musicechoplayer");
  });

  it("does not render an invalid store URL as a Play Store button", () => {
    render(<ProjectExternalLinks links={{ store: "https://cosmas.dev/play.google.com/store/apps/details" }} projectTitle="Invalid" />);
    expect(screen.queryByRole("link", { name: /Google Play/ })).not.toBeInTheDocument();
  });

  it("continues to render live, GitHub, and valid Play Store links", () => {
    render(<ProjectExternalLinks projectTitle="Example" links={{ live: "https://example.com", github: "https://github.com/example/project", store: verifiedPlayStoreUrl }} />);
    expect(screen.getByRole("link", { name: /live application/ })).toHaveAttribute("href", "https://example.com");
    expect(screen.getByRole("link", { name: /source on GitHub/ })).toHaveAttribute("href", "https://github.com/example/project");
    expect(screen.getByRole("link", { name: /Google Play/ })).toHaveAttribute("href", verifiedPlayStoreUrl);
  });
});
