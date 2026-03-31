import { useEffect, useState } from "react";
import { Plus, Save, Trash2, Edit } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

const kategoriOptions = ["Organik", "Anorganik", "B3", "Residu", "Umum"];

export default function AdminEdukasiPage() {
  const [materiList, setMateriList] = useState<Tables<"materi_edukasi">[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [konten, setKonten] = useState("");
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchMateri = async () => {
    const { data } = await supabase.from("materi_edukasi").select("*").order("created_at", { ascending: false });
    if (data) setMateriList(data);
  };

  useEffect(() => { fetchMateri(); }, []);

  const resetForm = () => {
    setJudul("");
    setKategori("");
    setKonten("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !kategori || !konten) return;
    setSaving(true);

    if (editingId) {
      const { error } = await supabase.from("materi_edukasi").update({ judul, kategori, konten }).eq("id", editingId);
      if (error) {
        toast({ title: "Gagal", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Berhasil", description: "Materi diperbarui." });
        resetForm();
        fetchMateri();
      }
    } else {
      const { error } = await supabase.from("materi_edukasi").insert({ judul, kategori, konten, created_by: user?.id });
      if (error) {
        toast({ title: "Gagal", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Berhasil", description: "Materi baru ditambahkan." });
        resetForm();
        fetchMateri();
      }
    }
    setSaving(false);
  };

  const startEdit = (m: Tables<"materi_edukasi">) => {
    setEditingId(m.id);
    setJudul(m.judul);
    setKategori(m.kategori);
    setKonten(m.konten);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("materi_edukasi").delete().eq("id", id);
    if (error) {
      toast({ title: "Gagal", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Dihapus", description: "Materi berhasil dihapus." });
      fetchMateri();
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Materi Edukasi</h1>
          <p className="mt-1 text-sm text-muted-foreground">Kelola materi edukasi pengelolaan sampah</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4" /> Tambah Materi
          </Button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-4 rounded-2xl border border-border bg-card p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Judul</Label>
              <Input value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Judul materi" required />
            </div>
            <div className="space-y-2">
              <Label>Kategori</Label>
              <Select value={kategori} onValueChange={setKategori}>
                <SelectTrigger><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
                <SelectContent>
                  {kategoriOptions.map((k) => (
                    <SelectItem key={k} value={k}>{k}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Konten</Label>
            <Textarea rows={6} value={konten} onChange={(e) => setKonten(e.target.value)} placeholder="Isi materi edukasi..." required />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={saving}>
              <Save className="h-4 w-4" /> {saving ? "Menyimpan..." : editingId ? "Update" : "Simpan"}
            </Button>
            <Button type="button" variant="outline" onClick={resetForm}>Batal</Button>
          </div>
        </form>
      )}

      <div className="mt-6 space-y-3">
        {materiList.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
            Belum ada materi edukasi. Klik "Tambah Materi" untuk memulai.
          </div>
        )}
        {materiList.map((m) => (
          <div key={m.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="mr-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {m.kategori}
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-foreground">{m.judul}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{m.konten}</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => startEdit(m)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(m.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
