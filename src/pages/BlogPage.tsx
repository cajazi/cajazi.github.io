import { Link } from "react-router-dom";
import { blogPosts } from "../data/blog";
import { useSeo } from "../hooks/useSeo";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function BlogPage() {
  useSeo({
    title: "Engineering Blog | Cosmas Technologies",
    description: "Practical notes on production software, Android engineering, architecture, and reliable delivery.",
    canonical: "/blog",
    ogType: "website",
  });

  return (
    <section className="mx-auto min-h-[60vh] max-w-6xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Engineering notes</p>
      <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">Blog</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
        Practical lessons from building web, Android, backend, and media systems with production constraints in mind.
      </p>

      {blogPosts.length ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className={`flex min-h-44 items-end bg-gradient-to-br ${post.cover.gradient} p-6`}>
                <p className="text-xs font-semibold tracking-[0.22em] text-cyan-200">{post.cover.eyebrow}</p>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-400">
                  <time dateTime={post.publishedAt}>{dateFormatter.format(new Date(`${post.publishedAt}T00:00:00`))}</time>
                  <span aria-hidden="true">•</span><span>{post.readingTime}</span>
                </div>
                <h2 className="mt-3 text-2xl font-bold text-white">{post.title}</h2>
                <p className="mt-3 leading-7 text-slate-300">{post.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-2" aria-label="Article tags">
                  {post.tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">{tag}</span>)}
                </div>
                <Link to={`/blog/${post.slug}`} className="mt-6 inline-block font-semibold text-cyan-300 hover:text-cyan-200" aria-label={`Read ${post.title}`}>
                  Read article <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-12 rounded-xl border border-white/10 bg-white/5 p-6 text-slate-300">No articles are published yet.</p>
      )}
    </section>
  );
}
