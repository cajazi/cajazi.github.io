import { useEffect, useState } from "react";

const sections = ["about", "skills", "projects", "contact"];

export function useActiveSection() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      let current = "about";

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= 120) {
          current = id;
        }
      }

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return active;
}
