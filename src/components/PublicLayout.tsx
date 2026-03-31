import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
