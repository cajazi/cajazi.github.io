import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectDataSource } from "../data/projects";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = slug ? projectDataSource.getBySlug(slug) : undefined;
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!project) {
      return;
    }

    document.title = `${project.title} | Case Study`;

    let description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );

    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }

    description.content = project.problem;

    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = new URL(`/projects/${project.slug}`, window.location.origin)
      .href;
  }, [project]);

  if (!project) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-6 py-24 text-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Project not found</h1>
          <p className="mt-4 text-slate-300">
            The project you're looking for doesn't exist.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-3xl">
        <p className="text-sm text-cyan-300">
          {project.role} &bull; {project.category}
        </p>
        <h1 className="mt-3 text-4xl font-bold text-white">{project.title}</h1>
        <span className="mt-4 inline-block rounded bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300">
          {project.status}
        </span>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition duration-150 ease-out hover:border-cyan-400">
          <p className="text-xs text-gray-500">Problem</p>
          <p className="mt-3 text-sm text-gray-300">{project.problem}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition duration-150 ease-out hover:border-cyan-400">
          <p className="text-xs text-gray-500">Solution</p>
          <p className="mt-3 text-sm text-white">{project.solution}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition duration-150 ease-out hover:border-cyan-400">
          <p className="text-xs text-gray-500">Impact</p>
          <p className="mt-3 text-sm text-cyan-300">{project.impact}</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6 transition duration-150 ease-out hover:border-cyan-400">
        <p className="text-xs text-gray-500">Media</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(project.media ?? [{ label: "Media placeholder" }]).map((item) => (
            <div
              key={item.label}
              className="flex min-h-32 items-center justify-center rounded-lg border border-dashed border-white/20 text-sm text-slate-400"
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {!!project.expandableSections?.length && (
        <div className="mt-8 space-y-3">
          {project.expandableSections.map((section) => (
            <div
              key={section.title}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <button
                className="w-full text-left text-sm font-semibold text-white transition-colors duration-150 hover:text-cyan-300"
                onClick={() =>
                  setExpanded(expanded === section.title ? null : section.title)
                }
              >
                {section.title}
              </button>
              {expanded === section.title && (
                <p className="mt-3 text-sm text-slate-300">{section.content}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <span key={item} className="rounded bg-white/10 px-2 py-1 text-xs">
            {item}
          </span>
        ))}
      </div>

      {project.links?.store && (
        <a
          href={project.links.store}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block text-sm text-cyan-400 transition-colors duration-150 hover:underline"
        >
          View Project &rarr;
        </a>
      )}
    </section>
  );
}
