import { projects } from "../../data/projects";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="border-t border-white/10 bg-slate-950 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Projects
        </p>

        <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
          Production-focused software products.
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.name}
              className="rounded-2xl border border-white/10 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-300/60"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-cyan-300">
                  {project.category}
                </p>

                <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-300">
                  {project.status}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-white">
                {project.name}
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-slate-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
