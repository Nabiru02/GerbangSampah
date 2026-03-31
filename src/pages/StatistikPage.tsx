import PublicLayout from "@/components/PublicLayout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, Cell,
} from "recharts";

const jenisData = [
  { jenis: "Organik", total: 0 },
  { jenis: "Plastik", total: 0 },
  { jenis: "Kertas", total: 0 },
  { jenis: "Logam", total: 0 },
  { jenis: "Residu", total: 0 },
];

const monthlyTrend: { bulan: string; organik: number; plastik: number; kertas: number; logam: number; residu: number }[] = [];

const barColors: Record<string, string> = {
  Organik: "hsl(142, 50%, 40%)",
  Plastik: "hsl(38, 80%, 55%)",
  Kertas: "hsl(200, 50%, 50%)",
  Logam: "hsl(25, 30%, 40%)",
  Residu: "hsl(0, 0%, 55%)",
};

export default function StatistikPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Statistik Sampah</h1>
          <p className="mt-1 text-muted-foreground">Analisis detail per jenis sampah dan tren waktu</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Per Jenis */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 font-display text-lg font-bold text-foreground">
              Total per Jenis Sampah (kg)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jenisData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 88%)" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="jenis" tick={{ fontSize: 12 }} width={60} />
                <Tooltip />
                <Bar dataKey="total" radius={[0, 6, 6, 0]}>
                  {jenisData.map((entry) => (
                    <Cell key={entry.jenis} fill={barColors[entry.jenis]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Table */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 font-display text-lg font-bold text-foreground">
              Ringkasan Jenis Sampah
            </h3>
            <div className="space-y-3">
              {jenisData.map((item) => {
                const total = jenisData.reduce((s, i) => s + i.total, 0);
                const pct = ((item.total / total) * 100).toFixed(1);
                return (
                  <div key={item.jenis} className="flex items-center gap-3">
                    <div
                      className="h-3 w-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: barColors[item.jenis] }}
                    />
                    <span className="flex-1 text-sm font-medium text-foreground">{item.jenis}</span>
                    <span className="text-sm text-muted-foreground">{item.total} kg</span>
                    <div className="w-20">
                      <div className="h-2 rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: barColors[item.jenis],
                          }}
                        />
                      </div>
                    </div>
                    <span className="w-12 text-right text-xs font-medium text-muted-foreground">
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Trend Line */}
          <div className="rounded-2xl border border-border bg-card p-6 md:col-span-2">
            <h3 className="mb-4 font-display text-lg font-bold text-foreground">
              Tren Bulanan per Jenis
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 88%)" />
                <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="organik" stroke="hsl(142, 50%, 40%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="plastik" stroke="hsl(38, 80%, 55%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="kertas" stroke="hsl(200, 50%, 50%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="logam" stroke="hsl(25, 30%, 40%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="residu" stroke="hsl(0, 0%, 55%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

