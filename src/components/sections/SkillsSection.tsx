import { Reveal } from "../ui/Reveal";

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="border-t border-white/10 bg-slate-900 px-6 py-24"
    >
      <Reveal className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Skills
        </p>

        <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
          Technologies I use to build modern software.
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "React",
            "TypeScript",
            "Node.js",
            "Fastify",
            "Kotlin",
            "Android",
            "PostgreSQL",
            "Supabase",
            "Git & GitHub",
          ].map((skill) => (
            <div
              key={skill}
              className="rounded-xl border border-white/10 bg-slate-950 p-5 text-white transition duration-150 ease-out hover:-translate-y-1 hover:border-cyan-400"
            >
              {skill}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
