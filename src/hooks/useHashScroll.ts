import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useHashScroll() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) return;

    const id = decodeURIComponent(location.hash.slice(1));
    let frame = 0;
    let attempts = 0;

    const scroll = () => {
      const target = document.getElementById(id);
      if (target) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        return;
      }
      if (attempts++ < 60) frame = window.requestAnimationFrame(scroll);
    };

    frame = window.requestAnimationFrame(scroll);
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);
}
