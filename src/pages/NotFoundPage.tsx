export function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-6 py-24 text-center">
      <div>
        <h1 className="text-4xl font-bold text-white">Page not found</h1>
        <p className="mt-4 text-slate-300">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-300"
        >
          Go home
        </a>
      </div>
    </section>
  );
}
