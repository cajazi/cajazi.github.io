import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage } from "../pages/HomePage";

const ProjectDetailPage = lazy(() =>
  import("../pages/ProjectDetailPage").then((m) => ({
    default: m.ProjectDetailPage,
  }))
);

const BlogPage = lazy(() =>
  import("../pages/BlogPage").then((m) => ({
    default: m.BlogPage,
  }))
);

const BlogPostPage = lazy(() =>
  import("../pages/BlogPostPage").then((m) => ({
    default: m.BlogPostPage,
  }))
);

const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage").then((m) => ({
    default: m.NotFoundPage,
  }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/projects/:slug",
        element: (
          <Suspense fallback={<div className="p-6 text-white">Loading...</div>}>
            <ProjectDetailPage />
          </Suspense>
        ),
      },
      {
        path: "/blog",
        element: (
          <Suspense fallback={<div className="p-6 text-white">Loading...</div>}>
            <BlogPage />
          </Suspense>
        ),
      },
      {
        path: "/blog/:slug",
        element: (
          <Suspense fallback={<div className="p-6 text-white">Loading...</div>}>
            <BlogPostPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<div className="p-6 text-white">Loading...</div>}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);
