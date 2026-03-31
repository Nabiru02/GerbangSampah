import { MapPin } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";

const generateRT = (count: number) => Array.from({ length: count }, (_, i) => `RT ${String(i + 1).padStart(2, "0")}`);

const wilayahData = [
  { rw: "RW 01", rt: generateRT(8), status: "Belum Aktif", rumah: 0, partisipasi: 0 },
  { rw: "RW 02", rt: generateRT(11), status: "Belum Aktif", rumah: 0, partisipasi: 0 },
  { rw: "RW 03", rt: generateRT(9), status: "Belum Aktif", rumah: 0, partisipasi: 0 },
  { rw: "RW 04", rt: generateRT(8), status: "Belum Aktif", rumah: 0, partisipasi: 0 },
  { rw: "RW 05", rt: generateRT(7), status: "Belum Aktif", rumah: 0, partisipasi: 0 },
  { rw: "RW 06", rt: generateRT(8), status: "Belum Aktif", rumah: 0, partisipasi: 0 },
  { rw: "RW 07", rt: generateRT(9), status: "Belum Aktif", rumah: 0, partisipasi: 0 },
  { rw: "RW 08", rt: generateRT(7), status: "Belum Aktif", rumah: 0, partisipasi: 0 },
];

export default function PetaPage() {
  const aktif = wilayahData.filter((w) => w.status === "Aktif").length;

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Peta Wilayah</h1>
          <p className="mt-1 text-muted-foreground">
            Sebaran RT/RW aktif dalam program GERBANG SAMPAH
          </p>
        </div>

        {/* Summary */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-5 text-center">
            <div className="font-display text-3xl font-bold text-primary">{aktif}</div>
            <div className="text-sm text-muted-foreground">RW Aktif</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 text-center">
            <div className="font-display text-3xl font-bold text-foreground">{wilayahData.length}</div>
            <div className="text-sm text-muted-foreground">Total RW</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 text-center">
            <div className="font-display text-3xl font-bold text-eco-leaf">
              {wilayahData.reduce((s, w) => s + w.rt.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total RT</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 text-center">
            <div className="font-display text-3xl font-bold text-accent">
              {wilayahData.reduce((s, w) => s + w.rumah, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Rumah</div>
          </div>
        </div>

        {/* Grid map visualization */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {wilayahData.map((w) => {
            const isActive = w.status === "Aktif";
            return (
              <div
                key={w.rw}
                className={`rounded-2xl border p-5 transition-all hover:shadow-md ${
                  isActive ? "border-primary/30 bg-eco-green-light" : "border-border bg-card opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="font-display text-lg font-bold text-foreground">{w.rw}</span>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {w.status}
                  </span>
                </div>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <div>{w.rt.length} RT · {w.rumah} rumah</div>
                  {isActive && (
                    <div className="flex items-center gap-2">
                      <span>Partisipasi:</span>
                      <div className="flex-1 h-2 rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${w.partisipasi}%` }}
                        />
                      </div>
                      <span className="font-medium text-foreground">{w.partisipasi}%</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PublicLayout>
  );
}
