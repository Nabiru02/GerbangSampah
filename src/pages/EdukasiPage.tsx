import { BookOpen, Leaf, Package, AlertTriangle, Trash2 } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";

const kategoriSampah = [
  {
    title: "Sampah Organik",
    icon: Leaf,
    color: "bg-primary/10 text-primary border-primary/20",
    iconColor: "text-primary",
    description:
      "Sampah yang berasal dari makhluk hidup dan dapat terurai secara alami oleh mikroorganisme.",
    contoh: [
      "Sisa makanan (nasi, sayur, buah)",
      "Daun kering dan rumput",
      "Kulit buah dan sayur",
      "Ampas kopi dan teh",
      "Cangkang telur",
      "Serbuk kayu",
    ],
    caraPengolahan: [
      {
        judul: "Komposting",
        detail:
          "Kumpulkan sampah organik dalam wadah tertutup, campurkan dengan tanah dan bahan kering (daun kering), aduk secara berkala, dan tunggu 2-3 bulan hingga menjadi kompos.",
      },
      {
        judul: "Biogas",
        detail:
          "Sampah organik difermentasikan dalam digester anaerobik untuk menghasilkan gas metana yang bisa digunakan sebagai bahan bakar.",
      },
      {
        judul: "Pakan Ternak",
        detail:
          "Sisa makanan tertentu seperti sayuran dan buah bisa diolah menjadi pakan ternak setelah diseleksi dan diolah.",
      },
    ],
  },
  {
    title: "Sampah Anorganik",
    icon: Package,
    color: "bg-accent/10 text-accent border-accent/20",
    iconColor: "text-accent",
    description:
      "Sampah yang tidak berasal dari makhluk hidup dan sulit terurai secara alami, namun banyak yang bisa didaur ulang.",
    contoh: [
      "Botol dan gelas plastik",
      "Kaleng aluminium dan besi",
      "Kertas, kardus, dan koran",
      "Kaca dan botol kaca",
      "Styrofoam",
      "Kemasan plastik dan sachet",
    ],
    caraPengolahan: [
      {
        judul: "Recycle (Daur Ulang)",
        detail:
          "Pisahkan berdasarkan jenis (plastik, kertas, logam, kaca), bersihkan dari sisa makanan, lalu setor ke bank sampah atau pengepul.",
      },
      {
        judul: "Reuse (Gunakan Kembali)",
        detail:
          "Botol plastik bisa dijadikan pot tanaman, kaleng bisa menjadi wadah penyimpanan, dan kain bekas bisa dijadikan lap.",
      },
      {
        judul: "Reduce (Kurangi)",
        detail:
          "Kurangi penggunaan plastik sekali pakai, bawa tas belanja sendiri, dan pilih produk dengan kemasan minimal.",
      },
    ],
  },
  {
    title: "Sampah B3 (Bahan Berbahaya & Beracun)",
    icon: AlertTriangle,
    color: "bg-destructive/10 text-destructive border-destructive/20",
    iconColor: "text-destructive",
    description:
      "Sampah yang mengandung bahan berbahaya dan beracun yang dapat mencemari lingkungan serta membahayakan kesehatan manusia.",
    contoh: [
      "Baterai bekas dan aki",
      "Lampu neon dan LED bekas",
      "Obat-obatan kedaluwarsa",
      "Pestisida dan bahan kimia rumah tangga",
      "Cat dan pelarut bekas",
      "Elektronik rusak (e-waste)",
    ],
    caraPengolahan: [
      {
        judul: "Pengumpulan Khusus",
        detail:
          "Jangan buang bersama sampah biasa. Kumpulkan terpisah dalam wadah tertutup dan serahkan ke tempat pengumpulan B3 atau Dinas Lingkungan Hidup.",
      },
      {
        judul: "Drop Box B3",
        detail:
          "Beberapa kelurahan dan kecamatan menyediakan drop box khusus untuk sampah B3 seperti baterai dan obat kedaluwarsa.",
      },
      {
        judul: "Jangan Dibakar atau Ditimbun",
        detail:
          "Sampah B3 tidak boleh dibakar karena menghasilkan gas beracun, dan tidak boleh ditimbun karena dapat mencemari tanah dan air.",
      },
    ],
  },
  {
    title: "Sampah Residu",
    icon: Trash2,
    color: "bg-muted text-muted-foreground border-border",
    iconColor: "text-muted-foreground",
    description:
      "Sampah yang tidak bisa didaur ulang, tidak termasuk organik, dan bukan B3. Merupakan sampah sisa yang harus diminimalkan.",
    contoh: [
      "Popok sekali pakai",
      "Pembalut wanita",
      "Puntung rokok",
      "Tisu bekas",
      "Kemasan berlapis (plastik + aluminium)",
      "Spons bekas",
    ],
    caraPengolahan: [
      {
        judul: "Minimalisasi",
        detail:
          "Pilih produk yang bisa dicuci ulang (cloth diaper, menstrual cup) untuk mengurangi volume residu.",
      },
      {
        judul: "Pembuangan Aman",
        detail:
          "Bungkus dengan rapi dan buang di tempat sampah residu. Sampah ini akan diangkut ke TPA (Tempat Pembuangan Akhir).",
      },
    ],
  },
];

export default function EdukasiPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Edukasi Pengelolaan Sampah
          </h1>
          <p className="mt-1 text-muted-foreground">
            Pelajari cara memilah dan mengolah sampah dengan benar untuk
            lingkungan yang lebih bersih
          </p>
        </div>

        {/* Quick tips */}
        <div className="mb-8 rounded-2xl border border-primary/20 bg-eco-green-light p-6">
          <div className="flex items-start gap-3">
            <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">
                Prinsip 3R: Reduce, Reuse, Recycle
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                <strong>Reduce</strong> — Kurangi penggunaan barang sekali pakai.{" "}
                <strong>Reuse</strong> — Gunakan kembali barang yang masih bisa
                dipakai. <strong>Recycle</strong> — Daur ulang sampah yang bisa
                diolah menjadi produk baru.
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {kategoriSampah.map((kategori) => (
            <div
              key={kategori.title}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              {/* Header */}
              <div className={`flex items-center gap-3 border-b p-5 ${kategori.color}`}>
                <kategori.icon className={`h-6 w-6 ${kategori.iconColor}`} />
                <div>
                  <h2 className="font-display text-xl font-bold">
                    {kategori.title}
                  </h2>
                  <p className="mt-0.5 text-sm opacity-80">
                    {kategori.description}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 p-5 md:grid-cols-2">
                {/* Contoh */}
                <div>
                  <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Contoh Sampah
                  </h4>
                  <ul className="space-y-2">
                    {kategori.contoh.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cara Pengolahan */}
                <div>
                  <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Cara Pengolahan
                  </h4>
                  <div className="space-y-3">
                    {kategori.caraPengolahan.map((cara) => (
                      <div
                        key={cara.judul}
                        className="rounded-xl bg-muted p-3"
                      >
                        <div className="text-sm font-semibold text-foreground">
                          {cara.judul}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {cara.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            📚 Materi ini akan diperbarui secara berkala oleh admin kelurahan.
            Punya pertanyaan atau saran? Hubungi kantor Kelurahan Kebonwaru.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
