import { useState } from "react";
import { siteConfig } from "../../config/site";
import { useActiveSection } from "../../hooks/useActiveSection";
import { scrollToSection } from "../../utils/scroll";

export function Header() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  const linkClass = (id: string) =>
    `transition-colors ${
      active === id ? "text-cyan-400" : "text-slate-300 hover:text-white"
    }`;

  const navigate = (id: string) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        <button
          onClick={() => navigate("about")}
          className="text-lg font-bold text-white"
        >
          {siteConfig.name}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <button onClick={() => navigate("about")} className={linkClass("about")}>
            About
          </button>
          <button onClick={() => navigate("skills")} className={linkClass("skills")}>
            Skills
          </button>
          <button onClick={() => navigate("projects")} className={linkClass("projects")}>
            Projects
          </button>
          <button onClick={() => navigate("contact")} className={linkClass("contact")}>
            Contact
          </button>
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60">
          <div className="absolute right-0 top-0 h-full w-64 bg-slate-950 p-6">
            
            <button
              className="mb-8 text-white"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <div className="flex flex-col gap-6 text-sm">
              <button onClick={() => navigate("about")} className={linkClass("about")}>
                About
              </button>
              <button onClick={() => navigate("skills")} className={linkClass("skills")}>
                Skills
              </button>
              <button onClick={() => navigate("projects")} className={linkClass("projects")}>
                Projects
              </button>
              <button onClick={() => navigate("contact")} className={linkClass("contact")}>
                Contact
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
