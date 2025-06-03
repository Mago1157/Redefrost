import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import DataCard from "@/components/DataCard";
// import DataDetail from "@/components/DataDetail"; // DataDetail might not be needed here if navigation is direct
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BarChart2, Database, PieChart, Search, ChevronLeft, ChevronRight, User, FileText, Phone, Building, Mail, BarChart as ScoreIcon, Car } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const consultaTypes = [
  { name: "CPF Nacional", id: "cpf_nacional", icon: User, description: "Consulta completa de CPF em âmbito nacional.", type: "cpf" },
  { name: "CNPJ", id: "cnpj", icon: Building, description: "Consulta completa de CNPJ.", type: "cnpj"},
  { name: "Consulta Telefone", id: "consulta_telefone", icon: Phone, description: "Busca de informações por número de telefone.", type: "telefone"},
  { name: "Consulta Email", id: "consulta_email", icon: Mail, description: "Busca de informações por endereço de e-mail.", type: "email"},
  { name: "Veicular Nacional", id: "veicular_nacional", icon: Car, description: "Consulta de veículos em âmbito nacional.", type: "veicular"},
  { name: "Nome Completo", id: "nome_completo", icon: FileText, description: "Busca por nome completo.", type: "nome" },
  { name: "Consulta Score", id: "consulta_score", icon: ScoreIcon, description: "Análise de score de crédito.", type: "score" },
  { name: "CPF Credilink", id: "cpf_credilink", icon: User, description: "Análise de crédito vinculada ao CPF.", type: "cpf" },
  { name: "CPF Serasa Completo", id: "cpf_serasa_completo", icon: User, description: "Relatório detalhado do Serasa para CPF.", type: "cpf" },
  { name: "RG", id: "consulta_rg", icon: FileText, description: "Consulta de RG.", type: "rg" },
  { name: "CEP", id: "consulta_cep_cc", icon: Mail, description: "Consulta de CEP.", type: "cep" },
];

const mockDataSets = consultaTypes.map(ct => ({
  id: ct.id,
  title: ct.name,
  description: ct.description,
  type: ct.type, 
  records: Math.floor(Math.random() * 5000) + 1000,
  lastUpdate: `01/${Math.floor(Math.random() * 12) + 1}/2025`,
  icon: ct.icon
}));


const HomePage = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [dataSets, setDataSets] = useState([]);
  const [filteredDataSets, setFilteredDataSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDataSets(mockDataSets);
        setFilteredDataSets(mockDataSets);
        setIsLoading(false);
        
        toast({
          title: "Consultas carregadas!",
          description: "Explore nossos tipos de consulta.",
          duration: 3000,
        });
      } catch (error) {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Erro ao carregar!",
          description: "Não foi possível carregar os tipos de consulta.",
          duration: 5000,
        });
      }
    };

    loadData();
  }, [toast]);

  const handleSearch = (searchTerm, dataType) => {
    let results = dataSets;
    
    if (searchTerm) {
      results = results.filter(
        data => 
          data.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          data.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (dataType && dataType !== "all") {
      results = results.filter(data => data.type === dataType);
    }
    
    setFilteredDataSets(results);
    
    toast({
      title: `${results.length} tipos de consulta encontrados`,
      description: searchTerm ? `Resultados para: "${searchTerm}"` : "Mostrando todos os tipos disponíveis",
      duration: 3000,
    });
  };

  const handleFilterChange = (dataType) => {
    if (dataType === "all") {
      setFilteredDataSets(dataSets);
    } else {
      setFilteredDataSets(dataSets.filter(data => data.type === dataType));
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth * 0.75;
      scrollContainerRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };


  return (
    <>
      <Hero />
      
      <section id="consultas" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-gradient' : 'text-purple-600'}`}>Nossos Tipos de Consultas</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Explore uma vasta gama de consultas especializadas para obter as informações que você precisa. Desde verificações de CPF e CNPJ até detalhes veiculares e análises de crédito.
            </p>
          </motion.div>
          
          <div className="mb-12">
            <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <>
              {filteredDataSets.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <Search className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">Nenhum tipo de consulta encontrado</h3>
                  <p className="text-muted-foreground">Tente ajustar seus critérios de busca ou filtro.</p>
                </motion.div>
              ) : (
                <div className="relative group">
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
                    onClick={() => scroll('left')}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <ScrollArea className="w-full whitespace-nowrap rounded-md pb-4">
                    <div className="flex w-max space-x-4 p-4" ref={scrollContainerRef}>
                       {filteredDataSets.map((data) => (
                        <div key={data.id} className="w-[320px] shrink-0">
                           <DataCard data={data} />
                        </div>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                   <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
                    onClick={() => scroll('right')}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      <section className={`py-16 px-6 ${theme === 'dark' ? 'bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-pink-900/20' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-gradient' : 'text-purple-600'}`}>Recursos Avançados</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nossa plataforma oferece ferramentas poderosas para transformar dados brutos em insights valiosos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`p-6 rounded-xl ${theme === 'dark' ? 'glass-card' : 'bg-white shadow-lg border'}`}
            >
              <div className={`${theme === 'dark' ? 'bg-indigo-500/20' : 'bg-indigo-100'} p-3 rounded-full w-fit mb-4`}>
                <BarChart2 className={`h-6 w-6 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
              </div>
              <h3 className="text-xl font-medium mb-2">Visualizações Interativas</h3>
              <p className="text-muted-foreground">
                Transforme seus dados em gráficos e visualizações interativas para melhor compreensão e análise.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className={`p-6 rounded-xl ${theme === 'dark' ? 'glass-card' : 'bg-white shadow-lg border'}`}
            >
              <div className={`${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'} p-3 rounded-full w-fit mb-4`}>
                <Database className={`h-6 w-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <h3 className="text-xl font-medium mb-2">Integração de Dados</h3>
              <p className="text-muted-foreground">
                Conecte-se a diversas fontes de dados e unifique informações para uma visão completa do seu negócio.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className={`p-6 rounded-xl ${theme === 'dark' ? 'glass-card' : 'bg-white shadow-lg border'}`}
            >
              <div className={`${theme === 'dark' ? 'bg-pink-500/20' : 'bg-pink-100'} p-3 rounded-full w-fit mb-4`}>
                <PieChart className={`h-6 w-6 ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`} />
              </div>
              <h3 className="text-xl font-medium mb-2">Relatórios Personalizados</h3>
              <p className="text-muted-foreground">
                Crie relatórios sob medida para suas necessidades específicas e compartilhe com sua equipe.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;