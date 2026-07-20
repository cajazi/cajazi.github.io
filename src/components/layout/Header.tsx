import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../config/site";
import { useActiveSection } from "../../hooks/useActiveSection";

const navigation = [
  { id: "about", label: "About", to: "/#about" },
  { id: "skills", label: "Skills", to: "/#skills" },
  { id: "projects", label: "Projects", to: "/#projects" },
  { id: "contact", label: "Contact", to: "/#contact" },
] as const;

export function Header() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (event.key === "Tab" && menuRef.current) {
        const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>('button, a[href]'));
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };
  const linkClass = (id: string) => `transition-colors ${active === id ? "text-cyan-400" : "text-slate-300 hover:text-white"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/#home" className="text-lg font-bold text-white">{siteConfig.name}</Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-sm md:flex">
          {navigation.map((item) => <Link key={item.id} to={item.to} className={linkClass(item.id)}>{item.label}</Link>)}
          <Link to="/blog" className="text-slate-300 transition-colors hover:text-white">Blog</Link>
        </nav>
        <button ref={triggerRef} type="button" className="text-2xl text-white md:hidden" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-navigation" aria-label="Open navigation menu">☰</button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
          <nav ref={menuRef} id="mobile-navigation" aria-label="Mobile navigation" role="dialog" aria-modal="true" className="absolute right-0 top-0 h-dvh w-72 bg-slate-950 p-6 shadow-2xl">
            <button ref={closeRef} type="button" className="mb-8 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-300" onClick={close} aria-label="Close navigation menu">✕</button>
            <div className="flex flex-col items-start gap-6 text-base">
              {navigation.map((item) => <Link key={item.id} to={item.to} onClick={close} className={linkClass(item.id)}>{item.label}</Link>)}
              <Link to="/blog" onClick={close} className="text-slate-300 hover:text-white">Blog</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
