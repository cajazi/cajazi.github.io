export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_35%)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* LEFT */}
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Full-Stack Engineer & Technical Founder
          </p>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
            Building production-ready
            <br />
            web apps, Android apps,
            <br />
            APIs, and AI systems.
          </h1>

          <p className="mt-8 text-xl leading-9 text-slate-300">
            I design and build scalable software systems with clean architecture,
            performance-first engineering, and production-grade quality.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              View Case Studies
            </a>

            <a
              href="#contact"
              className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-300"
            >
              Contact Me
            </a>
          </div>

          {/* Trust line */}
          <p className="mt-6 text-sm text-slate-400">
            Available for freelance, consulting, and full-time engineering roles.
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="hidden md:block">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h3 className="text-xl font-bold text-white">
              Engineering Focus
            </h3>

            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <p>✔ Scalable Web Applications</p>
              <p>✔ Android Development</p>
              <p>✔ Backend API Systems</p>
              <p>✔ AI Integration & Automation</p>
              <p>✔ System Architecture Design</p>
            </div>

            <div className="mt-6 rounded-xl bg-cyan-400/10 p-4 text-cyan-300">
              Production-first engineering mindset
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
