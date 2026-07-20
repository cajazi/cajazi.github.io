import type { Project } from "../../data/projects";
import { isValidPlayStoreUrl } from "../../lib/projectLinks";

type ProjectExternalLinksProps = {
  links?: Project["links"];
  projectTitle: string;
  className?: string;
};

export function ProjectExternalLinks({ links, projectTitle, className = "" }: ProjectExternalLinksProps) {
  const externalLinks = [
    links?.live && { href: links.live, label: "Open live application", ariaLabel: `Open ${projectTitle} live application` },
    links?.github && { href: links.github, label: "View source on GitHub", ariaLabel: `Open ${projectTitle} source on GitHub` },
    links?.store && isValidPlayStoreUrl(links.store) && {
      href: links.store,
      label: "View on Google Play",
      ariaLabel: `Open ${projectTitle} on Google Play`,
    },
  ].filter((link): link is { href: string; label: string; ariaLabel: string } => Boolean(link));

  if (!externalLinks.length) return null;

  return (
    <div className={`flex flex-wrap gap-4 ${className}`.trim()}>
      {externalLinks.map((link) => (
        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel} className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
          {link.label} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}
