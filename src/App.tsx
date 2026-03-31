import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import StatistikPage from "./pages/StatistikPage";
import PetaPage from "./pages/PetaPage";
import LaporanPage from "./pages/LaporanPage";
import EdukasiPage from "./pages/EdukasiPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/admin/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import InputSampahPage from "./pages/admin/InputSampahPage";
import WilayahPage from "./pages/admin/WilayahPage";
import AdminEdukasiPage from "./pages/admin/AdminEdukasiPage";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/statistik" element={<StatistikPage />} />
            <Route path="/peta" element={<PetaPage />} />
            <Route path="/laporan" element={<LaporanPage />} />
            <Route path="/edukasi" element={<EdukasiPage />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/input-sampah" element={<ProtectedRoute><InputSampahPage /></ProtectedRoute>} />
            <Route path="/admin/wilayah" element={<ProtectedRoute><WilayahPage /></ProtectedRoute>} />
            <Route path="/admin/edukasi" element={<ProtectedRoute><AdminEdukasiPage /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
