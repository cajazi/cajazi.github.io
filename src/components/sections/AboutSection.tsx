import { profile } from "../../data/profile";

export function AboutSection() {
  return (
    <section id="about" className="border-t border-white/10 bg-slate-950 px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            About
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
            Engineering products with long-term quality.
          </h2>
        </div>

        <div className="space-y-6 text-lg leading-8 text-slate-300">
          <p>{profile.about}</p>
          <p>{profile.philosophy}</p>

          <a
            href="#projects"
            className="inline-flex rounded-full border border-cyan-300/40 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-300/10"
          >
            View featured products
          </a>
        </div>
      </div>
    </section>
  );
}
