import { Outlet } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { useHashScroll } from "../hooks/useHashScroll";

export function RootLayout() {
  useHashScroll();
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
