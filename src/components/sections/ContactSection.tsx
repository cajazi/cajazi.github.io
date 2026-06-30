export function ContactSection() {
  const email = "social@cosmas.dev";

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8">Contact</h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-2">Email</h3>

          <p className="text-slate-300 mb-4">{email}</p>

          <button
            onClick={copyEmail}
            className="text-sm text-cyan-400 hover:text-cyan-300"
          >
            Copy email
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-2">GitHub</h3>

          <a
            href="https://github.com/cajazi"
            className="text-slate-300 hover:text-white"
            target="_blank"
          >
            github.com/cajazi
          </a>
        </div>

      </div>
    </section>
  );
}
