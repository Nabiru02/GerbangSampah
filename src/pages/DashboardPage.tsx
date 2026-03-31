import { Recycle, Scale, BarChart3 } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";

const summaryCards = [
  { label: "Total Minggu Ini", value: "0 kg", icon: Scale },
  { label: "Rata-rata Harian", value: "0 kg", icon: Recycle },
  { label: "RW Aktif", value: "0 / 8", icon: BarChart3 },
];

export default function DashboardPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Dashboard Sampah</h1>
          <p className="mt-1 text-muted-foreground">Ringkasan pengelolaan sampah minggu ini</p>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {summaryCards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-border bg-card p-5">
              <card.icon className="h-5 w-5 text-primary" />
              <div className="mt-3 font-display text-2xl font-bold text-foreground">{card.value}</div>
              <div className="mt-0.5 text-sm text-muted-foreground">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <h3 className="mt-4 font-display text-lg font-semibold text-foreground">Belum Ada Data</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Grafik dan statistik akan muncul setelah pegawai kelurahan melakukan input data mingguan melalui halaman admin.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
