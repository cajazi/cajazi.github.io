import { Reveal } from "../ui/Reveal";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="border-t border-white/10 bg-slate-950 px-6 py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Contact
          </p>

          <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
            Let’s build something together.
          </h2>

          <p className="mt-6 text-slate-300">
            I’m open to full-time roles, freelance projects, and technical collaborations.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <a
            href="mailto:hello@cosmas.dev"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400"
          >
            Send Email
          </a>
        </Reveal>

        <Reveal className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-400">
          <a href="https://github.com/" target="_blank" className="hover:text-white">
            GitHub
          </a>

          <a href="https://linkedin.com/" target="_blank" className="hover:text-white">
            LinkedIn
          </a>
        </Reveal>

      </div>
    </section>
  );
}
