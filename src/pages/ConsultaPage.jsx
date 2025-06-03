import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { User, Building, Phone, Mail, BarChart as ScoreIcon, Car, Search, FileText, AlertTriangle, CheckCircle, Info, Loader2 } from "lucide-react";

const consultaDetails = {
  cpf_nacional: { title: "Consulta CPF Nacional", icon: User, placeholder: "Digite o CPF", fields: ["Nome Completo", "Data de Nascimento", "Situação Cadastral", "Nome da Mãe"] },
  cpf_credilink: { title: "Consulta CPF Credilink", icon: User, placeholder: "Digite o CPF", fields: ["Score Credilink", "Histórico de Consultas", "Pendências Financeiras"] },
  cpf_serasa_completo: { title: "Consulta CPF Serasa Completo", icon: User, placeholder: "Digite o CPF", fields: ["Score Serasa", "Dívidas Ativas", "Consultas Recentes", "Ações Judiciais"] },
  cpf_serasa_simples: { title: "Consulta CPF Serasa Simples", icon: User, placeholder: "Digite o CPF", fields: ["Score Serasa", "Existência de Pendências"] },
  cpf_sipni: { title: "Consulta CPF SIPNI", icon: User, placeholder: "Digite o CPF", fields: ["Registro de Vacinação", "Campanhas Participadas"] },
  cpf_full: { title: "Consulta CPF Full", icon: User, placeholder: "Digite o CPF", fields: ["Todas as Informações Disponíveis", "Endereços", "Telefones", "Participações Societárias"] },
  cpf_full_1: { title: "Consulta CPF Full 1", icon: User, placeholder: "Digite o CPF", fields: ["Variação da Consulta CPF Full", "Informações Adicionais"] },
  nome_completo: { title: "Consulta Nome Completo", icon: FileText, placeholder: "Digite o Nome Completo", fields: ["Possíveis CPFs", "Empresas Associadas", "Endereços Recentes"] },
  nome_completo2: { title: "Consulta Nome Completo 2", icon: FileText, placeholder: "Digite o Nome Completo", fields: ["Variação da Busca por Nome", "Informações Complementares"] },
  nome_abreviado: { title: "Consulta Nome Abreviado", icon: FileText, placeholder: "Digite o Nome Abreviado", fields: ["Possíveis Nomes Completos", "Sugestões de Busca"] },
  nome_abreviado2: { title: "Consulta Nome Abreviado 2", icon: FileText, placeholder: "Digite o Nome Abreviado", fields: ["Variação da Busca por Nome Abreviado"] },
  consulta_mae: { title: "Consulta Nome da Mãe", icon: User, placeholder: "Digite o Nome da Mãe", fields: ["Possíveis Filhos (CPF)", "Informações Cadastrais"] },
  consulta_telefone: { title: "Consulta Telefone", icon: Phone, placeholder: "Digite o Telefone (com DDD)", fields: ["Titularidade (Nome/CPF/CNPJ)", "Endereço de Instalação", "Portabilidade"] },
  consulta_telefone2: { title: "Consulta Telefone 2", icon: Phone, placeholder: "Digite o Telefone (com DDD)", fields: ["Variação da Busca por Telefone", "Operadora"] },
  consulta_cpf_cc: { title: "Consulta CPF por Cartão de Crédito", icon: User, placeholder: "Digite os 6 primeiros e 4 últimos dígitos do cartão", fields: ["CPF do Titular", "Banco Emissor"] },
  consulta_rg: { title: "Consulta RG", icon: FileText, placeholder: "Digite o RG e Estado Emissor", fields: ["Nome Completo", "CPF Associado", "Data de Emissão"] },
  consulta_email: { title: "Consulta Email", icon: Mail, placeholder: "Digite o Email", fields: ["Possível Titular (Nome/CPF)", "Sites Associados", "Data de Criação (estimada)"] },
  consulta_cep_cc: { title: "Consulta CEP por Cartão de Crédito", icon: FileText, placeholder: "Digite os 6 primeiros e 4 últimos dígitos do cartão", fields: ["CEP de Faturamento"] },
  consulta_renda: { title: "Consulta Renda Estimada", icon: ScoreIcon, placeholder: "Digite o CPF", fields: ["Faixa de Renda Estimada", "Fontes de Renda (possíveis)"] },
  consulta_pai: { title: "Consulta Nome do Pai", icon: User, placeholder: "Digite o Nome do Pai", fields: ["Possíveis Filhos (CPF)", "Informações Cadastrais"] },
  veicular_nacional: { title: "Consulta Veicular Nacional", icon: Car, placeholder: "Digite a Placa ou Chassi", fields: ["Dados do Veículo", "Restrições", "Débitos (IPVA, Multas)"] },
  veicular_estadual: { title: "Consulta Veicular Estadual", icon: Car, placeholder: "Digite a Placa e Estado", fields: ["Dados do Veículo (específico do estado)", "Situação no Detran"] },
  veicular_leilao: { title: "Consulta Veicular Leilão", icon: Car, placeholder: "Digite a Placa ou Chassi", fields: ["Histórico de Leilão", "Valor Arremate", "Fotos (se disponível)"] },
  veicular_laudo: { title: "Consulta Veicular Laudo", icon: Car, placeholder: "Digite a Placa ou Chassi", fields: ["Laudos Cautelares", "Histórico de Sinistros", "Observações Técnicas"] },
  cpf_parentes: { title: "Consulta CPF Parentes", icon: User, placeholder: "Digite o CPF", fields: ["Nome do Pai", "Nome da Mãe", "Possíveis Irmãos (com CPF)"] },
  cnpj: { title: "Consulta CNPJ", icon: Building, placeholder: "Digite o CNPJ", fields: ["Razão Social", "Nome Fantasia", "Situação Cadastral", "Quadro Societário", "Endereço"] },
  consulta_score: { title: "Consulta Score de Crédito", icon: ScoreIcon, placeholder: "Digite o CPF", fields: ["Pontuação de Score", "Fatores Impactantes", "Histórico de Pagamentos"] }
};


const ConsultaPage = () => {
  const { tipoConsulta } = useParams();
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const detail = consultaDetails[tipoConsulta];

  if (!detail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-8 px-6 text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold mb-2">Tipo de Consulta Inválido</h1>
        <p className="text-muted-foreground mb-6">O tipo de consulta que você está tentando acessar não existe.</p>
        <Link to="/dashboard">
          <Button>Voltar para o Dashboard</Button>
        </Link>
      </div>
    );
  }

  const IconComponent = detail.icon;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      toast({
        variant: "destructive",
        title: "Campo obrigatório",
        description: "Por favor, preencha o campo de consulta.",
      });
      return;
    }

    setIsLoading(true);
    setResults(null);
    setError(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success/error
    if (Math.random() > 0.2) { // 80% success rate
      const mockResults = detail.fields.reduce((acc, field) => {
        acc[field.toLowerCase().replace(/\s/g, '_')] = `Dado simulado para ${field}`;
        return acc;
      }, {});
      setResults(mockResults);
      toast({
        title: "Consulta realizada com sucesso!",
        description: `Resultados para ${detail.title} carregados.`,
      });
    } else {
      setError("Não foi possível realizar a consulta. Tente novamente mais tarde.");
      toast({
        variant: "destructive",
        title: "Erro na Consulta",
        description: "Ocorreu um problema ao buscar os dados.",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="glass-card overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-purple-600/30 to-indigo-600/30 p-6">
            <div className="flex items-center gap-4">
              <IconComponent className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="text-3xl font-bold text-primary">{detail.title}</CardTitle>
                <CardDescription className="text-indigo-200">Insira os dados abaixo para realizar a consulta.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label htmlFor="consultaInput" className="block text-sm font-medium text-muted-foreground mb-1">
                  {detail.placeholder}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    id="consultaInput"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={detail.placeholder}
                    className="pl-10 h-12 text-lg bg-background/70 border-gray-700 focus:border-purple-500"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 flex items-center justify-center" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Consultando...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Consultar
                  </>
                )}
              </Button>
            </form>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-destructive/20 border border-destructive rounded-md flex items-center gap-3"
              >
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <p className="text-sm text-destructive-foreground">{error}</p>
              </motion.div>
            )}

            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <h3 className="text-xl font-semibold mb-4 text-gradient flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  Resultados da Consulta
                </h3>
                <Card className="glass-card border-green-500/50">
                  <CardContent className="p-0">
                    <ScrollArea className="h-[300px] p-4">
                      <ul className="space-y-3">
                        {Object.entries(results).map(([key, value]) => (
                          <li key={key} className="pb-3 border-b border-gray-800 last:border-b-0">
                            <strong className="block text-sm text-muted-foreground capitalize">
                              {key.replace(/_/g, ' ')}:
                            </strong>
                            <span className="text-base text-primary">{value}</span>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            {!isLoading && !results && !error && (
               <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 p-6 bg-accent/50 border border-dashed border-gray-700 rounded-md text-center"
               >
                <Info className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Os resultados da sua consulta aparecerão aqui.
                </p>
              </motion.div>
            )}
          </CardContent>
          <CardFooter className="p-6 bg-background/30">
            <Link to="/dashboard" className="w-full">
              <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800">
                Voltar para o Dashboard
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default ConsultaPage;