import { profile } from "../../data/profile";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
        {profile.role}
      </p>

      <h1 className="max-w-5xl text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
        {profile.headline}
      </h1>

      <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-300">
        {profile.summary}
      </p>
    </section>
  );
}
