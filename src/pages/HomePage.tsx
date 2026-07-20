import { lazy, Suspense } from "react";
import { HeroSection } from "../components/sections/HeroSection";
import { profileSeo } from "../data/profileSeo";
import { useSeo } from "../hooks/useSeo";

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
  useSeo(profileSeo);

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
