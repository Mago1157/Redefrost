import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const DataCard = ({ data }) => {
  const IconComponent = data.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link to={`/consultas/${data.id}`} className="h-full block focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg">
        <Card className="glass-card h-full flex flex-col cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              {IconComponent && (
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <IconComponent className="h-6 w-6 text-purple-400" />
                </div>
              )}
              <CardTitle className="text-gradient text-xl">{data.title}</CardTitle>
            </div>
            <CardDescription className="text-sm">{data.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Tipo: <span className="font-medium text-purple-300">{data.type}</span></p>
              <p>Registros Estimados: {data.records}</p>
              <p>Última Atualização (Exemplo): {data.lastUpdate}</p>
            </div>
          </CardContent>
          <CardFooter>
            {/* O botão foi removido para que o card inteiro seja clicável via Link */}
            {/* Mantendo a estrutura do footer caso queira adicionar outros elementos */}
            <div className="w-full text-center text-purple-400 text-sm font-medium flex items-center justify-center">
              <Eye className="mr-2 h-4 w-4" /> Acessar Consulta
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default DataCard;
