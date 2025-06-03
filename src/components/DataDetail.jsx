
import React from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X, Download, RefreshCw } from "lucide-react";

const DataDetail = ({ data, onClose }) => {
  if (!data) return null;

  // Simulated data for display
  const tableData = Array(10).fill(null).map((_, index) => ({
    id: `${data.id}-${index + 1}`,
    name: `Item ${index + 1}`,
    value: Math.floor(Math.random() * 1000),
    date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="w-full max-w-4xl glass-card rounded-xl overflow-hidden"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-gradient">{data.title}</h2>
            <p className="text-muted-foreground">{data.description}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Tipo: {data.type}</span>
              <span className="text-sm text-muted-foreground">({data.records} registros)</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4" /> Atualizar
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Download className="h-4 w-4" /> Exportar
              </Button>
            </div>
          </div>
          
          <ScrollArea className="h-[400px] rounded-md border">
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Nome</th>
                    <th className="text-left p-2">Valor</th>
                    <th className="text-left p-2">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                      <td className="p-2 text-sm">{item.id}</td>
                      <td className="p-2 text-sm">{item.name}</td>
                      <td className="p-2 text-sm">{item.value}</td>
                      <td className="p-2 text-sm">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        </div>
        
        <div className="p-6 border-t border-gray-800 flex justify-end">
          <Button onClick={onClose} variant="outline" className="mr-2">Fechar</Button>
          <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Analisar Dados
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DataDetail;
