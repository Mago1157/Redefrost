import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Building, Phone, Mail, BarChart, Car, Search, Activity, Clock, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";

const consultaTypes = [
  { name: "CPF Nacional", id: "cpf_nacional", icon: User, description: "Consulta completa de CPF em âmbito nacional.", path: "/consultas/cpf_nacional"},
  { name: "CNPJ", id: "cnpj", icon: Building, description: "Consulta completa de CNPJ.", path: "/consultas/cnpj"},
  { name: "Consulta Telefone", id: "consulta_telefone", icon: Phone, description: "Busca de informações por número de telefone.", path: "/consultas/consulta_telefone"},
  { name: "Consulta Email", id: "consulta_email", icon: Mail, description: "Busca de informações por endereço de e-mail.", path: "/consultas/consulta_email"},
  { name: "Consulta Score", id: "consulta_score", icon: BarChart, description: "Análise de score de crédito.", path: "/consultas/consulta_score" },
  { name: "Veicular Nacional", id: "veicular_nacional", icon: Car, description: "Consulta de veículos em âmbito nacional.", path: "/consultas/veicular_nacional"},
];

const StatCard = ({ title, value, icon: Icon, trend, description, color }) => (
  <Card className="glass-card">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className={`h-5 w-5 ${color || "text-purple-400"}`} />
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
      {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  return (
    <div className="min-h-screen py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-gradient">Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard title="Consultas Realizadas (Mês)" value="1,287" icon={Search} trend="+15.2% desde o mês passado" color="text-blue-400" />
          <StatCard title="Usuários Ativos" value="356" icon={Users} trend="+5.8% esta semana" color="text-green-400" />
          <StatCard title="Tempo Médio de Consulta" value="2.3s" icon={Clock} trend="-0.5s comparado à média" color="text-yellow-400" />
          <StatCard title="Receita Estimada (Mês)" value="R$ 12.580" icon={DollarSign} trend="+8.1% desde o mês passado" color="text-pink-400" />
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Acesso Rápido às Consultas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultaTypes.map((consulta) => (
              <motion.div
                key={consulta.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Link to={consulta.path}>
                  <Card className="glass-card hover:border-purple-500 transition-colors h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-500/20 rounded-lg">
                          <consulta.icon className="h-6 w-6 text-purple-400" />
                        </div>
                        <CardTitle className="text-xl text-gradient">{consulta.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription>{consulta.description}</CardDescription>
                    </CardContent>
                    <CardContent>
                       <Button className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90">
                        Realizar Consulta
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Atividade Recente</h2>
          <Card className="glass-card">
            <CardContent className="pt-6">
              {Array(5).fill(0).map((_, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="font-medium">Consulta {consultaTypes[index % consultaTypes.length].name}</p>
                      <p className="text-xs text-muted-foreground">Usuário_XYZ - {new Date(Date.now() - index * 3600000).toLocaleString()}</p>
                    </div>
                  </div>
                  <span className="text-sm text-green-400">Sucesso</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;