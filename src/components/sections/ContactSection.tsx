import { useState } from "react";
import { siteConfig } from "../../config/site";

export function ContactSection() {
  const [feedback, setFeedback] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setFeedback("Email address copied to clipboard.");
    } catch {
      setFeedback(`Copy failed. Please email ${siteConfig.email}.`);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20">
      <h2 className="mb-8 text-3xl font-bold text-white">Contact</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-2 font-semibold text-white">Email</h3>
          <a href={`mailto:${siteConfig.email}`} className="mb-4 block text-slate-300 hover:text-white">{siteConfig.email}</a>
          <button type="button" onClick={copyEmail} className="text-sm text-cyan-400 hover:text-cyan-300">Copy email</button>
          <p className="mt-3 min-h-5 text-sm text-slate-300" role="status" aria-live="polite">{feedback}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-2 font-semibold text-white">GitHub</h3>
          <a href={siteConfig.socials.github} className="text-slate-300 hover:text-white" target="_blank" rel="noreferrer">github.com/cajazi <span className="sr-only">(opens in a new tab)</span></a>
        </div>
      </div>
    </section>
  );
}
