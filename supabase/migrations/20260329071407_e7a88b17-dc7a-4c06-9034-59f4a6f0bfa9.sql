
-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: users can read their own roles
CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create wilayah table
CREATE TABLE public.wilayah (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_rw TEXT NOT NULL,
  jumlah_rt INTEGER NOT NULL DEFAULT 0,
  jumlah_rumah INTEGER NOT NULL DEFAULT 0,
  jumlah_penduduk INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Belum Aktif',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.wilayah ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read wilayah"
  ON public.wilayah FOR SELECT USING (true);

CREATE POLICY "Admins can insert wilayah"
  ON public.wilayah FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update wilayah"
  ON public.wilayah FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete wilayah"
  ON public.wilayah FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create laporan_sampah table
CREATE TABLE public.laporan_sampah (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tanggal DATE NOT NULL,
  wilayah_id UUID NOT NULL REFERENCES public.wilayah(id) ON DELETE CASCADE,
  organik NUMERIC NOT NULL DEFAULT 0,
  plastik NUMERIC NOT NULL DEFAULT 0,
  kertas NUMERIC NOT NULL DEFAULT 0,
  logam NUMERIC NOT NULL DEFAULT 0,
  residu NUMERIC NOT NULL DEFAULT 0,
  catatan TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.laporan_sampah ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read laporan_sampah"
  ON public.laporan_sampah FOR SELECT USING (true);

CREATE POLICY "Admins can insert laporan_sampah"
  ON public.laporan_sampah FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update laporan_sampah"
  ON public.laporan_sampah FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete laporan_sampah"
  ON public.laporan_sampah FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create materi_edukasi table
CREATE TABLE public.materi_edukasi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul TEXT NOT NULL,
  kategori TEXT NOT NULL,
  konten TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.materi_edukasi ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read materi_edukasi"
  ON public.materi_edukasi FOR SELECT USING (true);

CREATE POLICY "Admins can insert materi_edukasi"
  ON public.materi_edukasi FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update materi_edukasi"
  ON public.materi_edukasi FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete materi_edukasi"
  ON public.materi_edukasi FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_wilayah_updated_at
  BEFORE UPDATE ON public.wilayah
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_laporan_sampah_updated_at
  BEFORE UPDATE ON public.laporan_sampah
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_materi_edukasi_updated_at
  BEFORE UPDATE ON public.materi_edukasi
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial wilayah data
INSERT INTO public.wilayah (nama_rw, jumlah_rt, jumlah_rumah, jumlah_penduduk, status) VALUES
  ('RW 01', 8, 0, 0, 'Belum Aktif'),
  ('RW 02', 11, 0, 0, 'Belum Aktif'),
  ('RW 03', 9, 0, 0, 'Belum Aktif'),
  ('RW 04', 8, 0, 0, 'Belum Aktif'),
  ('RW 05', 7, 0, 0, 'Belum Aktif'),
  ('RW 06', 8, 0, 0, 'Belum Aktif'),
  ('RW 07', 9, 0, 0, 'Belum Aktif'),
  ('RW 08', 7, 0, 0, 'Belum Aktif');
