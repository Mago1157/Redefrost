import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Save, UserCircle, Mail, Phone } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const UserProfileSettings = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "Usuário Exemplo",
    email: "usuario@exemplo.com",
    phone: "(99) 99999-9999",
    avatarUrl: "https://source.unsplash.com/random/150x150/?portrait",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    setIsLoading(false);
    toast({
      title: "Perfil Atualizado!",
      description: "Suas informações de perfil foram salvas.",
    });
    console.log("Perfil salvo:", formData);
  };
  
  const cardClass = theme === 'dark' ? 'glass-card' : 'bg-white shadow-md border';
  const inputBgClass = theme === 'dark' ? 'bg-background/70 border-gray-700 focus:border-purple-500' : 'bg-slate-50 border-slate-300 focus:border-purple-500';
  const buttonPrimaryClass = theme === 'dark' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-purple-600 text-white hover:bg-purple-700';


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className={`text-2xl font-semibold flex items-center gap-2 ${theme === 'dark' ? 'text-gradient' : 'text-slate-800'}`}>
          <UserCircle className={`h-7 w-7 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          Perfil do Usuário
        </h2>
        <p className="text-muted-foreground mt-1">Atualize suas informações pessoais e avatar.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img  src={formData.avatarUrl} alt="Avatar" className="h-24 w-24 rounded-full object-cover border-2 border-purple-500" />
          <div className="flex-grow">
            <Label htmlFor="avatarFile">Alterar Avatar</Label>
            <Input id="avatarFile" type="file" className={`${inputBgClass} mt-1`} onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFormData(prev => ({ ...prev, avatarUrl: URL.createObjectURL(e.target.files[0])}))
              }
            }}/>
            <p className="text-xs text-muted-foreground mt-1">Envie uma imagem JPG, PNG ou GIF (Máx. 2MB).</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className={`${inputBgClass} mt-1`} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className={`${inputBgClass} mt-1`} />
          </div>
        </div>
        <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className={`${inputBgClass} mt-1`} placeholder="(XX) XXXXX-XXXX"/>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" className={`${buttonPrimaryClass} w-full sm:w-auto`} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Salvar Alterações
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default UserProfileSettings;