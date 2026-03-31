import { FileText, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicLayout from "@/components/PublicLayout";

const laporanData: {
  minggu: string; tanggal: string; totalSampah: number;
  organik: number; plastik: number; kertas: number; logam: number; residu: number; catatan: string;
}[] = [];

export default function LaporanPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Laporan Mingguan</h1>
            <p className="mt-1 text-muted-foreground">Rekap data pengelolaan sampah per minggu</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Unduh Laporan
          </Button>
        </div>

        {laporanData.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">Belum Ada Laporan</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Data laporan akan muncul setelah pegawai kelurahan melakukan input data mingguan.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {laporanData.map((lap) => (
              <div key={lap.minggu} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <h3 className="font-display text-lg font-bold text-foreground">{lap.minggu}</h3>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {lap.tanggal}
                    </div>
                  </div>
                  <div className="font-display text-2xl font-bold text-primary">
                    {lap.totalSampah} <span className="text-sm font-normal text-muted-foreground">kg</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-5 gap-2">
                  {[
                    { label: "Organik", value: lap.organik, color: "bg-eco-leaf" },
                    { label: "Plastik", value: lap.plastik, color: "bg-accent" },
                    { label: "Kertas", value: lap.kertas, color: "bg-blue-400" },
                    { label: "Logam", value: lap.logam, color: "bg-eco-earth" },
                    { label: "Residu", value: lap.residu, color: "bg-gray-400" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl bg-muted p-3 text-center">
                      <div className={`mx-auto mb-1 h-1.5 w-8 rounded-full ${item.color}`} />
                      <div className="text-sm font-bold text-foreground">{item.value} kg</div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                    </div>
                  ))}
                </div>

                {lap.catatan && (
                  <p className="mt-4 rounded-xl bg-eco-green-light px-4 py-2.5 text-sm text-foreground/80">
                    📝 {lap.catatan}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
