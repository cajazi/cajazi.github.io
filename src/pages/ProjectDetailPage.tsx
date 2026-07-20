import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projectDataSource } from "../data/projects";
import { useDataSource } from "../hooks/useDataSource";
import { useSeo } from "../hooks/useSeo";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const { data: result, loading, error } = useDataSource(
    () => slug ? projectDataSource.getBySlugWithStatus(slug) : Promise.resolve({ data: undefined, source: "local-fallback" as const, degraded: false }),
    null,
    [slug]
  );
  const project = result?.data;
  const [expanded, setExpanded] = useState<string | null>(null);

  useSeo(project?.seo ?? {
    title: loading ? "Loading project | Cosmas Technologies" : "Project not found | Cosmas Technologies",
    description: loading ? "Loading a Cosmas Technologies engineering case study." : "The requested project case study could not be found.",
    canonical: slug ? `/projects/${slug}` : "/projects",
    noIndex: !loading,
  });

  if (loading) {
    return <section className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-6 py-24"><p role="status" className="text-slate-300">Loading project case study…</p></section>;
  }

  if (error || !project) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-6 py-24 text-center">
        <div><h1 className="text-4xl font-bold text-white">Project not found</h1><p className="mt-4 text-slate-300">The project you’re looking for does not exist.</p><Link to="/#projects" className="mt-8 inline-block text-cyan-300 hover:text-cyan-200">View all projects</Link></div>
      </section>
    );
  }

  const links = [
    project.links?.live && { href: project.links.live, label: "Open live application" },
    project.links?.github && { href: project.links.github, label: "View source on GitHub" },
    project.links?.store && { href: project.links.store, label: "View on Google Play" },
  ].filter((link): link is { href: string; label: string } => Boolean(link));

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      {result.degraded && <p role="status" className="mb-8 rounded-lg border border-amber-300/20 bg-amber-300/5 p-4 text-sm text-amber-100">Live project updates are temporarily unavailable. Showing the verified portfolio copy.</p>}
      <div className="max-w-3xl"><p className="text-sm text-cyan-300">{project.role} <span aria-hidden="true">•</span> {project.category}</p><h1 className="mt-3 text-4xl font-bold text-white">{project.title}</h1><span className="mt-4 inline-block rounded bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300">{project.status}</span></div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[["Problem", project.problem], ["Solution", project.solution], ["Outcome", project.impact]].map(([label, content]) => <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-6"><p className="text-xs text-slate-400">{label}</p><p className="mt-3 text-sm leading-6 text-slate-200">{content}</p></div>)}
      </div>

      {!!project.media?.length && <div className="mt-8 grid gap-6">{project.media.map((item) => <figure key={item.src} className="overflow-hidden rounded-xl border border-white/10 bg-white/5"><img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" className="h-auto w-full"/><figcaption className="border-t border-white/10 px-5 py-3 text-sm text-slate-400">{item.label}</figcaption></figure>)}</div>}

      {!!project.expandableSections?.length && <div className="mt-8 space-y-3">{project.expandableSections.map((section, index) => { const isOpen = expanded === section.title; const panelId = `case-study-${index}`; return <div key={section.title} className="rounded-xl border border-white/10 bg-white/5 p-6"><button className="w-full text-left text-sm font-semibold text-white hover:text-cyan-300" onClick={() => setExpanded(isOpen ? null : section.title)} aria-expanded={isOpen} aria-controls={panelId}>{section.title}</button>{isOpen && <p id={panelId} className="mt-3 text-sm leading-6 text-slate-300">{section.content}</p>}</div>; })}</div>}

      <div className="mt-8 flex flex-wrap gap-2" aria-label="Technology stack">{project.tech.map((item) => <span key={item} className="rounded bg-white/10 px-2 py-1 text-xs">{item}</span>)}</div>
      {!!links.length && <div className="mt-8 flex flex-wrap gap-4">{links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300">{link.label} <span className="sr-only">(opens in a new tab)</span><span aria-hidden="true">↗</span></a>)}</div>}
    </section>
  );
}
