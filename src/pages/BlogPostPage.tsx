import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../data/blog";
import { useSeo } from "../hooks/useSeo";

export function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  useSeo(post?.seo ?? {
    title: "Article not found | Cosmas Technologies",
    description: "The requested engineering article could not be found.",
    canonical: slug ? `/blog/${slug}` : "/blog",
    noIndex: true,
  });

  if (!post) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-6 py-24 text-center">
        <div className="w-full">
          <h1 className="text-4xl font-bold text-white">Article not found</h1>
          <p className="mt-4 text-slate-300">This article may have moved or the address may be incorrect.</p>
          <Link to="/blog" className="mt-8 inline-block text-cyan-300 hover:text-cyan-200">Return to the blog</Link>
        </div>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link to="/blog" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"><span aria-hidden="true">←</span> All articles</Link>
      <header className="mt-10 border-b border-white/10 pb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">{post.cover.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white md:text-6xl">{post.title}</h1>
        <p className="mt-6 text-xl leading-8 text-slate-300">{post.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-400">
          <time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${post.publishedAt}T00:00:00`))}</time>
          <span aria-hidden="true">•</span><span>{post.readingTime}</span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2" aria-label="Article tags">{post.tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">{tag}</span>)}</div>
      </header>
      <div className="space-y-10 py-10">
        {post.content.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-bold text-white md:text-3xl">{section.heading}</h2>
            <div className="mt-4 space-y-4 text-lg leading-8 text-slate-300">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </section>
        ))}
      </div>
    </article>
  );
}
