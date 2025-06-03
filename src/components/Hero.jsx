
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Database, BarChart2, PieChart } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 gradient-bg opacity-20"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Consulta de Dados <span className="text-gradient">Moderna e Intuitiva</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Acesse, visualize e analise dados de forma rápida e eficiente com nossa plataforma de última geração.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white px-8 py-6 h-auto text-lg">
                Começar Agora <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-gray-700 hover:bg-gray-800 px-8 py-6 h-auto text-lg">
                Ver Demonstração
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-6">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-purple-400" />
                <span className="text-sm">+1000 Conjuntos de Dados</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-purple-400" />
                <span className="text-sm">Visualizações Avançadas</span>
              </div>
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-purple-400" />
                <span className="text-sm">Análises em Tempo Real</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2"
          >
            <div className="relative">
              <div className="glass-card rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
                <img  alt="Dashboard de visualização de dados com gráficos coloridos e estatísticas" className="w-full h-auto rounded-t-xl" src="https://images.unsplash.com/photo-1516383274235-5f42d6c6426d" />
                <div className="p-4 bg-gray-900/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Dashboard Financeiro</h3>
                      <p className="text-xs text-muted-foreground">Atualizado em tempo real</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs h-8">Explorar</Button>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div 
                className="absolute -top-6 -right-6 glass-card p-4 rounded-lg border border-gray-800 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <BarChart2 className="h-8 w-8 text-purple-400" />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 glass-card p-4 rounded-lg border border-gray-800 shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              >
                <PieChart className="h-8 w-8 text-indigo-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
