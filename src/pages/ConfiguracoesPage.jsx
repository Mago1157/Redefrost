import React from "react";
import { Routes, Route, Link, useLocation, Outlet, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle, Bell, Shield, Palette, Languages, History, CreditCard, KeyRound, FileText, LogOut, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/context/ThemeContext";

import UserProfileSettings from "@/components/settings/UserProfileSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import LanguageSettings from "@/components/settings/LanguageSettings";
import BillingSettings from "@/components/settings/BillingSettings";
import APISettings from "@/components/settings/APISettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import ConsultationHistory from "@/components/settings/ConsultationHistory";


const settingsNavLinks = [
  { path: "perfil", label: "Perfil do Usuário", icon: UserCircle },
  { path: "aparencia", label: "Aparência", icon: Palette },
  { path: "idioma", label: "Idioma e Região", icon: Languages },
  { path: "notificacoes", label: "Notificações", icon: Bell },
  { path: "seguranca", label: "Segurança", icon: Shield },
  { path: "historico-consultas", label: "Histórico de Consultas", icon: History },
  { path: "cobranca", label: "Cobrança e Planos", icon: CreditCard },
  { path: "api", label: "Chaves de API", icon: KeyRound },
  { path: "privacidade", label: "Privacidade de Dados", icon: FileText },
];

const ConfiguracoesPage = () => {
  const location = useLocation();
  const { theme } = useTheme();

  const SidebarLink = ({ to, label, icon: Icon }) => {
    const isActive = location.pathname === `/configuracoes/${to}`;
    return (
      <Link to={to}>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 px-3 ${isActive ? (theme === 'dark' ? 'bg-accent text-accent-foreground' : 'bg-slate-200 text-slate-800') : (theme === 'dark' ? 'hover:bg-accent/50' : 'hover:bg-slate-100') }`}
        >
          <Icon className={`h-5 w-5 ${isActive ? (theme === 'dark' ? 'text-purple-400' : 'text-purple-600') : 'text-muted-foreground'}`} />
          {label}
        </Button>
      </Link>
    );
  };

  return (
    <div className="min-h-screen py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Settings className={`h-10 w-10 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
            <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-gradient' : 'text-slate-800'}`}>Configurações</h1>
          </div>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais, preferências e configurações da conta.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <motion.aside 
            initial={{ opacity:0, x: -20}}
            animate={{opacity:1, x:0}}
            transition={{duration:0.4, delay:0.1}}
            className={`md:w-1/4 lg:w-1/5 space-y-2 p-4 rounded-lg ${theme === 'dark' ? 'glass-card' : 'bg-white shadow-md border'}`}
          >
            {settingsNavLinks.map(link => (
              <SidebarLink key={link.path} to={link.path} label={link.label} icon={link.icon} />
            ))}
            <Separator className="my-4"/>
            <Button variant="ghost" className={`w-full justify-start gap-3 px-3 ${theme === 'dark' ? 'hover:bg-destructive/20 text-destructive' : 'hover:bg-red-100 text-red-600'}`}>
                <LogOut className="h-5 w-5" /> Sair da Conta
            </Button>
          </motion.aside>

          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`p-6 md:p-8 rounded-lg ${theme === 'dark' ? 'glass-card' : 'bg-white shadow-md border'}`}
              >
                 <Routes>
                  <Route index element={<Navigate to="perfil" replace />} />
                  <Route path="perfil" element={<UserProfileSettings />} />
                  <Route path="aparencia" element={<AppearanceSettings />} />
                  <Route path="idioma" element={<LanguageSettings />} />
                  <Route path="notificacoes" element={<NotificationSettings />} />
                  <Route path="seguranca" element={<SecuritySettings />} />
                  <Route path="historico-consultas" element={<ConsultationHistory />} />
                  <Route path="cobranca" element={<BillingSettings />} />
                  <Route path="api" element={<APISettings />} />
                  <Route path="privacidade" element={<PrivacySettings />} />
                </Routes>
                <Outlet /> 
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfiguracoesPage;