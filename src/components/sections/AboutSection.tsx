import { Reveal } from "../ui/Reveal";

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-t border-white/10 bg-slate-950 px-6 py-24"
    >
      <Reveal className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          About
        </p>

        <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
          Engineering software with scalability, quality, and long-term
          maintainability.
        </h2>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">
          I build production-ready web applications, Android apps, backend APIs,
          and AI-powered software with a strong focus on clean architecture,
          performance, and user experience.
        </p>
      </Reveal>
    </section>
  );
}
