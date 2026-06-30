import { AboutSection } from "../components/sections/AboutSection";
import { ContactSection } from "../components/sections/ContactSection";
import { HeroSection } from "../components/sections/HeroSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { SkillsSection } from "../components/sections/SkillsSection";

export function HomePage() {
  return (
    <main id="top">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
