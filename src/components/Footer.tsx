import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto flex flex-col items-center gap-3 px-4 py-8 text-center">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-eco-leaf" />
          <span className="font-display text-lg font-bold text-foreground">
            GERBANG SAMPAH
          </span>
        </div>
        <p className="max-w-md text-sm text-muted-foreground">
          Gerakan Bersih Lingkungan dan Pengelolaan Sampah — Impact Tracker untuk memantau dampak pengelolaan sampah rumah tangga.
        </p>
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Kelurahan. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
