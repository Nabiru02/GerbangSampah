import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "../../integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

export default function InputSampahPage() {
  const [wilayahList, setWilayahList] = useState<Tables<"wilayah">[]>([]);
  const [wilayahId, setWilayahId] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [organik, setOrganik] = useState("");
  const [plastik, setPlastik] = useState("");
  const [kertas, setKertas] = useState("");
  const [logam, setLogam] = useState("");
  const [residu, setResidu] = useState("");
  const [catatan, setCatatan] = useState("");
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    supabase.from("wilayah").select("*").order("nama_rw").then(({ data }) => {
      if (data) setWilayahList(data);
    });
  }, []);

  const resetForm = () => {
    setWilayahId("");
    setTanggal("");
    setOrganik("");
    setPlastik("");
    setKertas("");
    setLogam("");
    setResidu("");
    setCatatan("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wilayahId || !tanggal) return;
    setSaving(true);

    const { error } = await supabase.from("laporan_sampah").insert({
      wilayah_id: wilayahId,
      tanggal,
      organik: Number(organik) || 0,
      plastik: Number(plastik) || 0,
      kertas: Number(kertas) || 0,
      logam: Number(logam) || 0,
      residu: Number(residu) || 0,
      catatan: catatan || null,
      created_by: user?.id,
    });

    setSaving(false);

    if (error) {
      toast({ title: "Gagal Menyimpan", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Berhasil", description: "Data sampah mingguan berhasil disimpan." });
      resetForm();
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Input Data Sampah</h1>
        <p className="mt-1 text-sm text-muted-foreground">Masukkan data sampah mingguan per wilayah</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-6 rounded-2xl border border-border bg-card p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Wilayah (RW)</Label>
            <Select value={wilayahId} onValueChange={setWilayahId}>
              <SelectTrigger><SelectValue placeholder="Pilih RW" /></SelectTrigger>
              <SelectContent>
                {wilayahList.map((w) => (
                  <SelectItem key={w.id} value={w.id}>{w.nama_rw}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tanggal">Tanggal</Label>
            <Input id="tanggal" type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="organik">Organik (kg)</Label>
            <Input id="organik" type="number" min="0" step="0.1" placeholder="0" value={organik} onChange={(e) => setOrganik(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plastik">Plastik (kg)</Label>
            <Input id="plastik" type="number" min="0" step="0.1" placeholder="0" value={plastik} onChange={(e) => setPlastik(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kertas">Kertas (kg)</Label>
            <Input id="kertas" type="number" min="0" step="0.1" placeholder="0" value={kertas} onChange={(e) => setKertas(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logam">Logam (kg)</Label>
            <Input id="logam" type="number" min="0" step="0.1" placeholder="0" value={logam} onChange={(e) => setLogam(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="residu">Residu (kg)</Label>
            <Input id="residu" type="number" min="0" step="0.1" placeholder="0" value={residu} onChange={(e) => setResidu(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="catatan">Catatan</Label>
          <Textarea id="catatan" placeholder="Catatan tambahan (opsional)" value={catatan} onChange={(e) => setCatatan(e.target.value)} />
        </div>

        <Button type="submit" disabled={saving}>
          <Save className="h-4 w-4" />
          {saving ? "Menyimpan..." : "Simpan Data"}
        </Button>
      </form>
    </AdminLayout>
  );
}
