import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage } from "../pages/HomePage";

const ProjectDetailPage = lazy(() =>
  import("../pages/ProjectDetailPage").then((m) => ({
    default: m.ProjectDetailPage,
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
