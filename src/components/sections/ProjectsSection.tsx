import { projects } from "../../data/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-20 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-10">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.name}
            className="p-6 rounded-xl border border-white/10 bg-white/5"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">
                {project.name}
              </h3>

              <span className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-300">
                {project.status}
              </span>
            </div>

            <p className="text-sm text-gray-400 mt-1">
              {project.category}
            </p>

            {/* Problem */}
            <div className="mt-4">
              <p className="text-xs text-gray-500">Problem</p>
              <p className="text-sm text-gray-300">{project.problem}</p>
            </div>

            {/* Solution */}
            <div className="mt-3">
              <p className="text-xs text-gray-500">Solution</p>
              <p className="text-sm text-white">{project.solution}</p>
            </div>

            {/* Impact */}
            <div className="mt-3">
              <p className="text-xs text-gray-500">Impact</p>
              <p className="text-sm text-cyan-300">{project.impact}</p>
            </div>

            {/* Tech stack */}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded bg-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Optional link */}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 text-sm text-cyan-400 hover:underline"
              >
                View Project →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
