import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf, BarChart3, Map, FileText, LayoutDashboard, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Beranda", path: "/", icon: Leaf },
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Statistik", path: "/statistik", icon: BarChart3 },
  { label: "Peta Wilayah", path: "/peta", icon: Map },
  { label: "Laporan", path: "/laporan", icon: FileText },
  { label: "Edukasi", path: "/edukasi", icon: BookOpen },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            GERBANG <span className="text-eco-leaf">SAMPAH</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin">Login Admin</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-card px-4 pb-4 md:hidden">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <Button variant="outline" size="sm" className="mt-2 w-full" asChild>
            <Link to="/admin" onClick={() => setOpen(false)}>Login Admin</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
