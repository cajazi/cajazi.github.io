import { useState } from "react";
import { Link } from "react-router-dom";
import { projectDataSource } from "../../data/projects";
import { useDataSource } from "../../hooks/useDataSource";
import { ProjectExternalLinks } from "../projects/ProjectExternalLinks";

export function ProjectsSection() {
  const [filter, setFilter] = useState<"all" | "android" | "web" | "backend" | "ai">("all");
  const { data: result, loading, error } = useDataSource(
    () => projectDataSource.getAllWithStatus(),
    null
  );
  const projects = result?.data ?? [];

  const filteredProjects = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>

      {loading && (
        <p role="status" className="mb-6 rounded-lg border border-white/10 bg-white/5 p-4 text-slate-300">
          Loading project case studies…
        </p>
      )}
      {result?.degraded && (
        <p role="status" className="mb-6 rounded-lg border border-amber-300/20 bg-amber-300/5 p-4 text-sm text-amber-100">
          Live project updates are temporarily unavailable. Showing the verified portfolio copy.
        </p>
      )}
      {error && !result && (
        <p role="alert" className="mb-6 rounded-lg border border-red-300/20 bg-red-300/5 p-4 text-red-100">
          Project case studies could not be loaded. Please try again later.
        </p>
      )}

      {/* FILTER BAR */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {["all", "android", "web", "backend", "ai"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat as typeof filter)}
            className={`px-3 py-1 rounded text-sm border transition duration-150 ease-out hover:scale-[1.02] active:scale-[0.98] ${
              filter === cat
                ? "bg-cyan-500 text-black"
                : "border-white/20 text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="p-6 rounded-xl border border-white/10 bg-white/5 transition duration-150 ease-out hover:-translate-y-1 hover:border-cyan-400"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{project.title}</h3>

              <span className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-300">
                {project.status}
              </span>
            </div>

            <p className="text-sm text-gray-400 mt-1">
              {project.role} • {project.category}
            </p>

            <div className="mt-4 text-sm text-gray-300">
              <p className="text-gray-500 text-xs">Problem</p>
              <p>{project.problem}</p>
            </div>

            <div className="mt-3 text-sm">
              <p className="text-gray-500 text-xs">Solution</p>
              <p className="text-white">{project.solution}</p>
            </div>

            <div className="mt-3 text-sm">
              <p className="text-gray-500 text-xs">Impact</p>
              <p className="text-cyan-300">{project.impact}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded bg-white/10"
                >
                  {t}
                </span>
              ))}
            </div>

            <Link
              to={`/projects/${project.slug}`}
              className="inline-block mt-4 text-sm text-cyan-400 transition-colors duration-150 hover:underline"
            >
              View Project →
            </Link>
            <ProjectExternalLinks links={project.links} projectTitle={project.title} className="mt-4" />
          </div>
        ))}
      </div>
      {!loading && !error && filteredProjects.length === 0 && (
        <p className="rounded-lg border border-white/10 bg-white/5 p-6 text-slate-300">No projects are available in this category yet.</p>
      )}
    </section>
  );
}
