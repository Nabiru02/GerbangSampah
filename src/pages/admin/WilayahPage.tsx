import { useEffect, useState } from "react";
import { Save, MapPin } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

export default function WilayahPage() {
  const [wilayahList, setWilayahList] = useState<Tables<"wilayah">[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ nama_rw: "", jumlah_rt: 0, jumlah_rumah: 0, jumlah_penduduk: 0, status: "Belum Aktif" });
  const { toast } = useToast();

  const fetchWilayah = async () => {
    const { data } = await supabase.from("wilayah").select("*").order("nama_rw");
    if (data) setWilayahList(data);
  };

  useEffect(() => { fetchWilayah(); }, []);

  const startEdit = (w: Tables<"wilayah">) => {
    setEditingId(w.id);
    setEditData({ nama_rw: w.nama_rw, jumlah_rt: w.jumlah_rt, jumlah_rumah: w.jumlah_rumah, jumlah_penduduk: w.jumlah_penduduk, status: w.status });
  };

  const saveEdit = async (id: string) => {
    const { error } = await supabase.from("wilayah").update(editData).eq("id", id);
    if (error) {
      toast({ title: "Gagal", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Berhasil", description: "Data wilayah diperbarui." });
      setEditingId(null);
      fetchWilayah();
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Data Wilayah</h1>
        <p className="mt-1 text-sm text-muted-foreground">Kelola data RT/RW Kelurahan Kebonwaru</p>
      </div>

      <div className="mt-6 space-y-3">
        {wilayahList.map((w) => (
          <div key={w.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-display text-lg font-bold text-foreground">{w.nama_rw}</div>
                  <div className="text-sm text-muted-foreground">{w.jumlah_rt} RT</div>
                </div>
              </div>
              {editingId === w.id ? (
                <Button size="sm" onClick={() => saveEdit(w.id)}>
                  <Save className="h-3.5 w-3.5" /> Simpan
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => startEdit(w)}>
                  Edit
                </Button>
              )}
            </div>

            {editingId === w.id ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Nama RW</label>
                  <Input
                    value={editData.nama_rw}
                    onChange={(e) => setEditData({ ...editData, nama_rw: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Jumlah RT</label>
                  <Input
                    type="number"
                    min="0"
                    value={editData.jumlah_rt}
                    onChange={(e) => setEditData({ ...editData, jumlah_rt: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Jumlah Rumah</label>
                  <Input
                    type="number"
                    min="0"
                    value={editData.jumlah_rumah}
                    onChange={(e) => setEditData({ ...editData, jumlah_rumah: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Jumlah Penduduk</label>
                  <Input
                    type="number"
                    min="0"
                    value={editData.jumlah_penduduk}
                    onChange={(e) => setEditData({ ...editData, jumlah_penduduk: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Status</label>
                  <Select value={editData.status} onValueChange={(v) => setEditData({ ...editData, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Belum Aktif">Belum Aktif</SelectItem>
                      <SelectItem value="Aktif">Aktif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                <span>{w.jumlah_rumah} rumah</span>
                <span>{w.jumlah_penduduk} penduduk</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  w.status === "Aktif" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {w.status}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
