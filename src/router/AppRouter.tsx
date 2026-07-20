import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage } from "../pages/HomePage";
import { BlogPostRoute, BlogRoute, NotFoundRoute, ProjectRoute } from "./LazyRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/projects/:slug", element: <ProjectRoute /> },
      { path: "/blog", element: <BlogRoute /> },
      { path: "/blog/:slug", element: <BlogPostRoute /> },
      { path: "*", element: <NotFoundRoute /> },
    ],
  },
]);
