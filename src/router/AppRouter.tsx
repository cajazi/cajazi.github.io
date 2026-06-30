import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from '../layouts/RootLayout'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}