import { siteConfig } from "../../config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-white hover:text-cyan-300 transition"
        >
          {siteConfig.name}
        </a>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {[
            ["About", "#about"],
            ["Skills", "#skills"],
            ["Projects", "#projects"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="relative hover:text-white transition group"
            >
              {label}
              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-cyan-300 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

      </div>
    </header>
  );
}
