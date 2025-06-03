import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext"; // Import LanguageProvider

const HomePage = lazy(() => import("@/pages/HomePage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const ConsultaPage = lazy(() => import("@/pages/ConsultaPage"));
const ConsultasListPage = lazy(() => import("@/pages/ConsultasListPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const VisualizacoesPage = lazy(() => import("@/pages/VisualizacoesPage"));
const AjudaPage = lazy(() => import("@/pages/AjudaPage"));
const ConfiguracoesPage = lazy(() => import("@/pages/ConfiguracoesPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));


const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="h-16 w-16 text-purple-500 animate-spin" />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider> {/* Wrap with LanguageProvider */}
        <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/consultas" element={<ConsultasListPage />} />
                <Route path="/consultas/:tipoConsulta" element={<ConsultaPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registrar" element={<RegisterPage />} />
                <Route path="/visualizacoes" element={<VisualizacoesPage />} />
                <Route path="/ajuda" element={<AjudaPage />} />
                <Route path="/configuracoes/*" element={<ConfiguracoesPage />} /> {/* Nested routes for settings */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <Toaster />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;