import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus, Mail, Lock, User, Eye, EyeOff, LogIn } from "lucide-react";
import { useTheme } from "@/context/ThemeContext"; // Import useTheme

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get current theme

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro de Validação",
        description: "As senhas não coincidem.",
      });
      setIsLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Registro bem-sucedido!",
      description: "Sua conta foi criada. Faça login para continuar.",
    });
    navigate("/login");
    setIsLoading(false);
  };
  
  const cardClass = theme === 'dark' ? 'glass-card' : 'bg-white shadow-xl border';
  const inputBgClass = theme === 'dark' ? 'bg-background/70 border-gray-700 focus:border-purple-500' : 'bg-slate-50 border-slate-300 focus:border-purple-500';
  const headerBgClass = theme === 'dark' ? 'bg-background/30' : 'bg-slate-50';
  const footerBgClass = theme === 'dark' ? 'bg-background/30' : 'bg-slate-50';
  const buttonClass = theme === 'dark' 
    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
    : 'bg-slate-800 text-white hover:bg-slate-700';

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'gradient-bg-dark-auth' : 'bg-slate-100'}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className={`${cardClass} overflow-hidden`}>
          <CardHeader className={`text-center p-8 ${headerBgClass}`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className={`mx-auto h-16 w-16 flex items-center justify-center rounded-full mb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' : 'bg-slate-800'}`}
            >
              <UserPlus className="h-8 w-8 text-white" />
            </motion.div>
            <CardTitle className={`text-3xl font-bold ${theme === 'dark' ? 'text-gradient' : 'text-slate-800'}`}>Crie Sua Conta</CardTitle>
            <CardDescription className={theme === 'dark' ? 'text-muted-foreground' : 'text-slate-600'}>Junte-se à DataVista e explore o poder dos dados.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-700'}`}>
                  Nome Completo
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-400'}`} />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className={`pl-10 h-12 text-lg ${inputBgClass}`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email-register" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-700'}`}>
                  Email
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-400'}`} />
                  <Input
                    id="email-register"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className={`pl-10 h-12 text-lg ${inputBgClass}`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password-register" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-700'}`}>
                  Senha
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-400'}`} />
                  <Input
                    id="password-register"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Crie uma senha forte"
                    className={`pl-10 pr-10 h-12 text-lg ${inputBgClass}`}
                  />
                   <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-muted-foreground hover:text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-700'}`}>
                  Confirmar Senha
                </label>
                 <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-400'}`} />
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme sua senha"
                    className={`pl-10 pr-10 h-12 text-lg ${inputBgClass}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-muted-foreground hover:text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className={`w-full h-12 text-lg ${buttonClass}`} disabled={isLoading}>
                {isLoading ? "Registrando..." : "Criar Conta"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className={`p-8 text-center ${footerBgClass}`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-600'}`}>
              Já tem uma conta?{" "}
              <Link to="/login" className={`font-medium ${theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'} flex items-center justify-center`}>
                <LogIn className="mr-1 h-4 w-4" />
                Faça Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;