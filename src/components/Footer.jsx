
import React from "react";
import { Database, Github, Twitter, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="w-full py-8 px-6 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col gap-4 md:w-1/3">
            <div className="flex items-center gap-2">
              <Database className="h-6 w-6 text-purple-500" />
              <span className="text-xl font-bold text-gradient">DataVista</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Plataforma moderna para consulta e visualização de dados, oferecendo insights valiosos e análises detalhadas para tomada de decisões.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-muted-foreground hover:text-purple-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-purple-400 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <p className="font-medium mb-3">Plataforma</p>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">Início</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">Conjuntos de Dados</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">Visualizações</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium mb-3">Recursos</p>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">Documentação</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">Tutoriais</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">Exemplos</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium mb-3">Empresa</p>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">Sobre</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">Contato</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">Termos de Uso</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 DataVista. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">Política de Privacidade</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">Termos de Uso</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-purple-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
