import { lazy, Suspense, useEffect } from "react";
import { HeroSection } from "../components/sections/HeroSection";

const AboutSection = lazy(() =>
  import("../components/sections/AboutSection").then((m) => ({
    default: m.AboutSection,
  }))
);

const SkillsSection = lazy(() =>
  import("../components/sections/SkillsSection").then((m) => ({
    default: m.SkillsSection,
  }))
);

const ProjectsSection = lazy(() =>
  import("../components/sections/ProjectsSection").then((m) => ({
    default: m.ProjectsSection,
  }))
);

const ContactSection = lazy(() =>
  import("../components/sections/ContactSection").then((m) => ({
    default: m.ContactSection,
  }))
);

export function HomePage() {
  useEffect(() => {
    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = new URL("/", window.location.origin).href;
  }, []);

  return (
    <>
      <HeroSection />
      <Suspense fallback={null}>
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </Suspense>
    </>
  );
}
