import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Palette, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const AppearanceSettings = () => {
  const { theme, toggleTheme } = useTheme();

  const themes = [
    { value: "light", label: "Claro", icon: Sun },
    { value: "dark", label: "Escuro", icon: Moon },
    { value: "system", label: "Sistema", icon: Monitor },
  ];

  const cardClass = theme === 'dark' ? 'glass-card' : 'bg-white shadow-md border';
  const inputBgClass = theme === 'dark' ? 'bg-background/70 border-gray-700 focus:border-purple-500' : 'bg-slate-50 border-slate-300 focus:border-purple-500';


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className={`text-2xl font-semibold flex items-center gap-2 ${theme === 'dark' ? 'text-gradient' : 'text-slate-800'}`}>
          <Palette className={`h-7 w-7 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          Aparência
        </h2>
        <p className="text-muted-foreground mt-1">Personalize a aparência da plataforma.</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="theme-select" className="text-base block mb-2">Tema</Label>
          <p className="text-sm text-muted-foreground mb-3">
            Selecione o tema visual para a plataforma. "Sistema" usará a preferência do seu dispositivo.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {themes.map((item) => {
              const Icon = item.icon;
              const isActive = theme === item.value;
              return (
                <Button
                  key={item.value}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => toggleTheme(item.value)}
                  className={`h-auto py-4 flex flex-col items-center justify-center gap-2 transition-all duration-200
                    ${isActive 
                      ? (theme === 'dark' ? 'bg-primary text-primary-foreground border-purple-500 ring-2 ring-purple-500' : 'bg-purple-600 text-white border-purple-700 ring-2 ring-purple-600')
                      : (theme === 'dark' ? 'border-border hover:bg-accent' : 'border-slate-300 hover:bg-slate-100')
                    }
                  `}
                >
                  <Icon className={`h-8 w-8 mb-1 ${isActive ? (theme === 'dark' ? 'text-white' : 'text-white') : (theme === 'dark' ? 'text-purple-400' : 'text-purple-600') }`} />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Preview Section (Optional) */}
        <div className="mt-8">
            <Label className="text-base block mb-2">Pré-visualização do Tema Atual ({themes.find(t => t.value === theme)?.label})</Label>
            <div className={`p-6 rounded-lg border ${theme === 'dark' ? 'border-gray-700 bg-background' : 'border-slate-300 bg-slate-50'}`}>
                <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-primary' : 'text-slate-800'}`}>Exemplo de Título</h3>
                <p className="text-muted-foreground text-sm mb-4">Este é um exemplo de texto descritivo para mostrar como o tema atual se parece.</p>
                <Button className={`${theme === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-purple-600 text-white'}`}>Botão de Exemplo</Button>
                <Button variant="outline" className={`ml-2 ${theme === 'dark' ? 'border-border text-foreground' : 'border-slate-300 text-slate-700'}`}>Outro Botão</Button>
            </div>
        </div>

      </div>
    </motion.div>
  );
};

export default AppearanceSettings;
