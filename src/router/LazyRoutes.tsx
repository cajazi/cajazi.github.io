import { lazy, Suspense } from "react";

const ProjectDetailPage = lazy(() => import("../pages/ProjectDetailPage").then((module) => ({ default: module.ProjectDetailPage })));
const BlogPage = lazy(() => import("../pages/BlogPage").then((module) => ({ default: module.BlogPage })));
const BlogPostPage = lazy(() => import("../pages/BlogPostPage").then((module) => ({ default: module.BlogPostPage })));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })));

function Boundary({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div role="status" className="p-6 text-white">Loading page…</div>}>{children}</Suspense>;
}

export function ProjectRoute() { return <Boundary><ProjectDetailPage /></Boundary>; }
export function BlogRoute() { return <Boundary><BlogPage /></Boundary>; }
export function BlogPostRoute() { return <Boundary><BlogPostPage /></Boundary>; }
export function NotFoundRoute() { return <Boundary><NotFoundPage /></Boundary>; }
