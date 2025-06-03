import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Building, Phone, Mail, BarChart, Car, FileText, Search } from "lucide-react";

const consultaTypes = [
  { name: "CPF Nacional", id: "cpf_nacional", icon: User, description: "Consulta completa de CPF em âmbito nacional." },
  { name: "CPF Credilink", id: "cpf_credilink", icon: User, description: "Análise de crédito vinculada ao CPF." },
  { name: "CPF Serasa Completo", id: "cpf_serasa_completo", icon: User, description: "Relatório detalhado do Serasa para CPF." },
  { name: "CPF Serasa Simples", id: "cpf_serasa_simples", icon: User, description: "Consulta básica do Serasa para CPF." },
  { name: "CPF SIPNI", id: "cpf_sipni", icon: User, description: "Consulta ao Sistema de Informações do Programa Nacional de Imunizações." },
  { name: "CPF Full", id: "cpf_full", icon: User, description: "Consulta abrangente de informações de CPF." },
  { name: "CPF Full 1", id: "cpf_full_1", icon: User, description: "Variação da consulta CPF Full." },
  { name: "Nome Completo", id: "nome_completo", icon: FileText, description: "Busca por nome completo." },
  { name: "Nome Completo 2", id: "nome_completo2", icon: FileText, description: "Variação da busca por nome completo." },
  { name: "Nome Abreviado", id: "nome_abreviado", icon: FileText, description: "Busca por nome abreviado." },
  { name: "Nome Abreviado 2", id: "nome_abreviado2", icon: FileText, description: "Variação da busca por nome abreviado." },
  { name: "Consulta Mãe", id: "consulta_mae", icon: User, description: "Consulta de informações da mãe." },
  { name: "Consulta Telefone", id: "consulta_telefone", icon: Phone, description: "Busca de informações por número de telefone." },
  { name: "Consulta Telefone 2", id: "consulta_telefone2", icon: Phone, description: "Variação da busca por telefone." },
  { name: "Consulta CPF CC", id: "consulta_cpf_cc", icon: User, description: "Consulta de CPF vinculada a cartões de crédito." },
  { name: "Consulta RG", id: "consulta_rg", icon: FileText, description: "Busca por número de RG." },
  { name: "Consulta Email", id: "consulta_email", icon: Mail, description: "Busca de informações por endereço de e-mail." },
  { name: "Consulta CEP CC", id: "consulta_cep_cc", icon: FileText, description: "Consulta de CEP vinculada a cartões de crédito." },
  { name: "Consulta Renda", id: "consulta_renda", icon: BarChart, description: "Estimativa de renda." },
  { name: "Consulta Pai", id: "consulta_pai", icon: User, description: "Consulta de informações do pai." },
  { name: "Veicular Nacional", id: "veicular_nacional", icon: Car, description: "Consulta de veículos em âmbito nacional." },
  { name: "Veicular Estadual", id: "veicular_estadual", icon: Car, description: "Consulta de veículos em âmbito estadual." },
  { name: "Veicular Leilão", id: "veicular_leilao", icon: Car, description: "Consulta de histórico de leilão de veículos." },
  { name: "Veicular Laudo", id: "veicular_laudo", icon: Car, description: "Consulta de laudos veiculares." },
  { name: "CPF Parentes", id: "cpf_parentes", icon: User, description: "Consulta de CPF de parentes." },
  { name: "CNPJ", id: "cnpj", icon: Building, description: "Consulta completa de CNPJ." },
  { name: "Consulta Score", id: "consulta_score", icon: BarChart, description: "Análise de score de crédito." }
];

const ConsultasListPage = () => {
  return (
    <div className="min-h-screen py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <Search className="h-16 w-16 text-purple-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gradient">Todos os Tipos de Consulta</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Navegue por nossa lista completa de consultas disponíveis. Clique em uma consulta para começar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {consultaTypes.map((consulta) => (
            <motion.div
              key={consulta.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <Link to={`/consultas/${consulta.id}`} className="h-full block">
                <Card className="glass-card hover:border-purple-500 transition-colors h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-purple-500/20 rounded-lg">
                        <consulta.icon className="h-6 w-6 text-purple-400" />
                      </div>
                      <CardTitle className="text-lg text-gradient">{consulta.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-sm">{consulta.description}</CardDescription>
                  </CardContent>
                  <CardContent>
                    <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800 hover:text-purple-300">
                      Acessar Consulta
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ConsultasListPage;