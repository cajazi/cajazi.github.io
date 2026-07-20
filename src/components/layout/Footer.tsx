import { siteConfig } from "../../config/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-400">
        <p>© {new Date().getFullYear()} {siteConfig.name}. Built by {siteConfig.founder}.</p>
        <a className="mt-2 inline-block hover:text-white" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </div>
    </footer>
  );
}
