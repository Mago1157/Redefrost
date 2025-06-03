import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LogIn, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { useTheme } from "@/context/ThemeContext"; // Import useTheme

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get current theme

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    if (email === "teste@datavista.com" && password === "senha123") {
      toast({
        title: "Login bem-sucedido!",
        description: "Redirecionando para o dashboard...",
      });
      localStorage.setItem("userData", JSON.stringify({ email }));
      navigate("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Falha no Login",
        description: "Email ou senha inválidos. Tente novamente.",
      });
    }
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
              <LogIn className="h-8 w-8 text-white" />
            </motion.div>
            <CardTitle className={`text-3xl font-bold ${theme === 'dark' ? 'text-gradient' : 'text-slate-800'}`}>Bem-vindo de Volta!</CardTitle>
            <CardDescription className={theme === 'dark' ? 'text-muted-foreground' : 'text-slate-600'}>Acesse sua conta para continuar explorando.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-700'}`}>
                  Email
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-400'}`} />
                  <Input
                    id="email"
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
                <label htmlFor="password" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-700'}`}>
                  Senha
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-400'}`} />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
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

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <Link to="#" className={`font-medium ${theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'}`}>
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>

              <Button type="submit" className={`w-full h-12 text-lg ${buttonClass}`} disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className={`p-8 text-center ${footerBgClass}`}>
            <p className={`text-sm ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-600'}`}>
              Não tem uma conta?{" "}
              <Link to="/registrar" className={`font-medium ${theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'} flex items-center justify-center`}>
                <UserPlus className="mr-1 h-4 w-4" />
                Crie uma agora
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;