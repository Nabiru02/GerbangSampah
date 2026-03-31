import { useEffect, useState } from "react";
import { BarChart3, FileText, MapPin, BookOpen } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalWilayah: 0,
    totalLaporan: 0,
    totalMateri: 0,
    rwAktif: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [wilayah, laporan, materi] = await Promise.all([
        supabase.from("wilayah").select("status"),
        supabase.from("laporan_sampah").select("id", { count: "exact", head: true }),
        supabase.from("materi_edukasi").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        totalWilayah: wilayah.data?.length ?? 0,
        rwAktif: wilayah.data?.filter((w) => w.status === "Aktif").length ?? 0,
        totalLaporan: laporan.count ?? 0,
        totalMateri: materi.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total RW", value: stats.totalWilayah, icon: MapPin, color: "text-primary" },
    { label: "RW Aktif", value: stats.rwAktif, icon: BarChart3, color: "text-eco-leaf" },
    { label: "Total Laporan", value: stats.totalLaporan, icon: FileText, color: "text-accent" },
    { label: "Materi Edukasi", value: stats.totalMateri, icon: BookOpen, color: "text-primary" },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard Admin</h1>
        <p className="mt-1 text-sm text-muted-foreground">Ringkasan data GERBANG SAMPAH Kelurahan Kebonwaru</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-border bg-card p-5">
            <c.icon className={`h-5 w-5 ${c.color}`} />
            <div className="mt-3 font-display text-3xl font-bold text-foreground">{c.value}</div>
            <div className="mt-0.5 text-sm text-muted-foreground">{c.label}</div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
