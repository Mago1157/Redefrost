import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center py-12 px-6 gradient-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className="glass-card p-8 md:p-12 rounded-xl shadow-2xl max-w-md w-full"
      >
        <AlertTriangle className="h-20 w-20 text-yellow-400 mx-auto mb-6 animate-pulse" />
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gradient mb-6">Página Não Encontrada</h2>
        <p className="text-muted-foreground mb-8">
          Oops! Parece que a página que você está procurando se perdeu no universo dos dados.
        </p>
        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-lg py-3">
              Voltar para a Página Inicial
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800 text-lg py-3">
              Ir para o Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>
       <motion.div 
        className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-30 animate-float"
        style={{ animationDelay: '0s'}}
      >
      </motion.div>
      <motion.div 
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-30 animate-float"
        style={{ animationDelay: '2s'}}
      >
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
