import { Outlet } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}