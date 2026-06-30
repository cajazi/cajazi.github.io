import { skills } from "../../data/skills";

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="border-t border-white/10 bg-slate-900 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Skills
        </p>

        <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
          Technologies I build with.
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <div
              key={skill}
              className="rounded-xl border border-white/10 bg-slate-950 p-6 text-center text-slate-200 transition hover:border-cyan-300 hover:-translate-y-1"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
