import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart2, PieChart, LineChart, Map, Settings2, PlusCircle, History, CreditCard, Zap, CalendarDays, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

const mockVisualizations = [
  { id: "vis1", title: "Vendas Mensais", type: "Bar Chart", date: "01/06/2025", description: "Comparativo de vendas por mês no último ano." },
  { id: "vis2", title: "Distribuição de Clientes", type: "Pie Chart", date: "28/05/2025", description: "Segmentação de clientes por região." },
];

const mockConsultationHistory = [
  { id: "hist1", type: "Consulta CPF Nacional", date: "02/06/2025 10:30", cost: 2, status: "Sucesso" },
  { id: "hist2", type: "Consulta CNPJ", date: "01/06/2025 15:45", cost: 5, status: "Sucesso" },
  { id: "hist3", type: "Consulta Veicular", date: "01/06/2025 09:12", cost: 3, status: "Falha" },
  { id: "hist4", type: "Consulta Nome Completo", date: "31/05/2025 11:00", cost: 1, status: "Sucesso" },
];

const getIconForType = (type) => {
  switch (type) {
    case "Bar Chart": return <BarChart2 className="h-8 w-8 text-indigo-400" />;
    case "Pie Chart": return <PieChart className="h-8 w-8 text-purple-400" />;
    case "Line Chart": return <LineChart className="h-8 w-8 text-pink-400" />;
    case "Map": return <Map className="h-8 w-8 text-green-400" />;
    case "Table": return <Table className="h-8 w-8 text-yellow-400" />;
    default: return <Settings2 className="h-8 w-8 text-gray-400" />;
  }
};

const VisualizacoesPage = () => {
  const { theme } = useTheme();
  const visualizations = mockVisualizations; 
  const hasVisualizations = visualizations.length > 0;
  const consultationHistory = mockConsultationHistory;
  
  const userCredits = 1250;
  const planType = "Mensal Pro";
  const planExpiryDate = "30/06/2025";

  const cardClass = theme === 'dark' ? 'glass-card' : 'bg-white shadow-lg border';
  const tabListClass = theme === 'dark' ? 'bg-accent' : 'bg-slate-100';
  const tabTriggerClass = theme === 'dark' ? 'data-[state=active]:bg-background data-[state=active]:text-foreground' : 'data-[state=active]:bg-white data-[state=active]:text-slate-800';
  const textGradientClass = theme === 'dark' ? 'text-gradient' : 'text-purple-600';

  return (
    <div className="min-h-screen py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div>
            <h1 className={`text-4xl font-bold mb-2 ${textGradientClass}`}>Visualizações e Histórico</h1>
            <p className="text-muted-foreground max-w-xl">
              Gerencie suas visualizações, acompanhe seu histórico de consultas e saldo de créditos.
            </p>
          </div>
           <Link to="/visualizacoes/criar">
            <Button className={`mt-4 sm:mt-0 text-white ${theme === 'dark' ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90' : 'bg-purple-600 hover:bg-purple-700'}`}>
              <PlusCircle className="mr-2 h-5 w-5" /> Criar Nova Visualização
            </Button>
          </Link>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-10`}>
          <Card className={cardClass}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Créditos Disponíveis</CardTitle>
              <CreditCard className={`h-5 w-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{userCredits}</div>
              <p className="text-xs text-muted-foreground">Use para realizar novas consultas.</p>
            </CardContent>
          </Card>
          <Card className={cardClass}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Seu Plano Atual</CardTitle>
              <Zap className={`h-5 w-5 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{planType}</div>
              <p className="text-xs text-muted-foreground">Válido até: {planExpiryDate}</p>
            </CardContent>
          </Card>
           <Card className={cardClass}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Consultas no Mês</CardTitle>
              <Activity className={`h-5 w-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{consultationHistory.length}</div>
              <p className="text-xs text-muted-foreground">Total de consultas realizadas este mês.</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="visualizacoes" className="w-full">
          <TabsList className={`grid w-full grid-cols-2 md:w-auto md:inline-flex mb-6 rounded-lg p-1 ${tabListClass}`}>
            <TabsTrigger value="visualizacoes" className={`px-4 py-2 text-sm font-medium rounded-md ${tabTriggerClass}`}>Minhas Visualizações</TabsTrigger>
            <TabsTrigger value="historico" className={`px-4 py-2 text-sm font-medium rounded-md ${tabTriggerClass}`}>Histórico de Consultas</TabsTrigger>
          </TabsList>

          <TabsContent value="visualizacoes">
            {hasVisualizations ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visualizations.map((vis, index) => (
                  <motion.div
                    key={vis.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className={`${cardClass} h-full flex flex-col hover:border-purple-500 transition-colors`}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className={`p-3 ${theme === 'dark' ? 'bg-primary/10' : 'bg-slate-100'} rounded-lg w-fit`}>
                            {getIconForType(vis.type)}
                          </div>
                          <span className={`text-xs ${theme === 'dark' ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'} px-2 py-1 rounded-full`}>{vis.type}</span>
                        </div>
                        <CardTitle className={`text-xl ${textGradientClass}`}>{vis.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <CardDescription>{vis.description}</CardDescription>
                        <p className="text-xs text-muted-foreground mt-3">Criada em: {vis.date}</p>
                      </CardContent>
                      <CardFooter>
                        <Link to={`/visualizacoes/${vis.id}`} className="w-full">
                          <Button variant="outline" className={`w-full ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-slate-300 hover:bg-slate-100'}`}>
                            Abrir Visualização
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-center py-16 ${cardClass} rounded-xl`}
              >
                <LineChart className={`h-20 w-20 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} mx-auto mb-6`} />
                <h2 className="text-2xl font-semibold mb-3">Nenhuma Visualização Encontrada</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Você ainda não criou nenhuma visualização. Comece agora para transformar seus dados!
                </p>
                <Link to="/visualizacoes/criar">
                  <Button size="lg" className={`text-white ${theme === 'dark' ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90' : 'bg-purple-600 hover:bg-purple-700'}`}>
                    <PlusCircle className="mr-2 h-5 w-5" /> Criar Visualização
                  </Button>
                </Link>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="historico">
            <Card className={cardClass}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className={`${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} h-6 w-6`} />
                  Seu Histórico de Consultas Recentes
                </CardTitle>
                <CardDescription>Acompanhe as consultas realizadas e os créditos utilizados.</CardDescription>
              </CardHeader>
              <CardContent>
                {consultationHistory.length > 0 ? (
                   <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo de Consulta</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Custo (Créditos)</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {consultationHistory.map(item => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.type}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{item.cost}</TableCell>
                          <TableCell>
                            <span className={`text-xs px-2 py-0.5 rounded-full w-fit
                              ${item.status === "Sucesso" 
                                ? (theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700')
                                : (theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700')
                              }`}
                            >
                              {item.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                   <div className="text-center py-10">
                     <History className={`h-16 w-16 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} mx-auto mb-4`} />
                    <p className="text-muted-foreground">Nenhuma consulta realizada recentemente.</p>
                   </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default VisualizacoesPage;