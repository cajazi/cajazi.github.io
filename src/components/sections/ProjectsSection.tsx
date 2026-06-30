import { projects, type Project } from "../../data/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-white/10 bg-slate-950 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Projects
        </p>

        <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
          Things I’ve built.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project: Project) => (
            <div
              key={project.name}
              className="rounded-xl border border-white/10 bg-slate-900 p-6 transition hover:border-cyan-400"
            >
              <h3 className="text-xl font-semibold text-white">
                {project.name}
              </h3>

              <p className="mt-2 text-slate-300">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((technology: string) => (
                  <span
                    key={technology}
                    className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-200"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  className="mt-4 inline-block text-sm text-cyan-400 hover:text-cyan-300"
                >
                  View Project →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
