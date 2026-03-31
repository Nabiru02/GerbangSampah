import { Recycle, TreePine, Droplets, Users, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PublicLayout from "@/components/PublicLayout";

const impactStats = [
  {
    icon: Recycle,
    value: "2.450",
    unit: "kg",
    label: "Sampah Terkelola",
    color: "bg-primary text-primary-foreground",
  },
  {
    icon: TreePine,
    value: "18",
    unit: "pohon",
    label: "Setara Pohon Diselamatkan",
    color: "bg-eco-leaf text-primary-foreground",
  },
  {
    icon: Droplets,
    value: "1.200",
    unit: "liter",
    label: "Air Terlindungi",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: Users,
    value: "340",
    unit: "KK",
    label: "Rumah Tangga Aktif",
    color: "bg-eco-earth text-primary-foreground",
  },
];

const features = [
  {
    title: "Pantau Dampak",
    description: "Lihat langsung berapa banyak sampah yang berhasil dikelola di lingkungan Anda.",
    icon: TrendingUp,
  },
  {
    title: "Data Transparan",
    description: "Data pengelolaan sampah diinput setiap minggu oleh petugas kelurahan.",
    icon: Recycle,
  },
  {
    title: "Wilayah Aktif",
    description: "Ketahui RT/RW mana saja yang aktif berpartisipasi dalam program.",
    icon: Users,
  },
];

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-eco-green-light to-eco-amber-light/30" />
        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-eco-green-light px-4 py-1.5 text-sm font-medium text-primary">
              <Recycle className="h-4 w-4" />
              Impact Tracker Pengelolaan Sampah
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
              Bersama Wujudkan{" "}
              <span className="bg-gradient-to-r from-primary to-eco-leaf bg-clip-text text-transparent">
                Lingkungan Bersih
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground md:text-xl">
              GERBANG SAMPAH memantau dampak nyata pengelolaan sampah rumah tangga di kelurahan Anda. 
              Setiap kilogram yang terkelola adalah langkah menuju lingkungan yang lebih sehat.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" className="gap-2 font-display font-semibold" asChild>
                <Link to="/dashboard">
                  Lihat Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="font-display font-semibold" asChild>
                <Link to="/statistik">Statistik Lengkap</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-border bg-background p-5 text-center transition-shadow hover:shadow-lg"
              >
                <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="font-display text-3xl font-bold text-foreground md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-muted-foreground">{stat.unit}</div>
                <div className="mt-1 text-sm font-medium text-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-foreground">
            Bagaimana Ini Bekerja?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Sistem sederhana untuk dampak yang besar.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-eco-green-light">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="container mx-auto px-4 py-14 text-center">
          <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl">
            Mari Jaga Lingkungan Kita Bersama
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-primary-foreground/80">
            Setiap data yang tercatat adalah bukti nyata kontribusi warga dalam menjaga kebersihan lingkungan.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-6 font-display font-semibold"
            asChild
          >
            <Link to="/dashboard">Lihat Dampak Sekarang</Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
