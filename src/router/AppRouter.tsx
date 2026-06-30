import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";

const HomePage = lazy(() =>
  import("../pages/HomePage").then((module) => ({
    default: module.HomePage,
  }))
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div className="p-6 text-white">Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
    ],
  },
]);
