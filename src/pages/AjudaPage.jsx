import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Search, MessageSquare, BookOpen, Lightbulb, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "Como faço para realizar uma consulta de CPF?",
    answer: "Navegue até a seção 'Consultas', selecione 'Consulta CPF', insira o número do CPF no campo indicado e clique em 'Consultar'. Os resultados serão exibidos na tela.",
  },
  {
    question: "Quais tipos de dados posso visualizar?",
    answer: "Você pode criar visualizações como gráficos de barras, gráficos de pizza, linhas do tempo e tabelas a partir dos dados de suas consultas. Acesse a seção 'Visualizações' para começar.",
  },
  {
    question: "Como entro em contato com o suporte?",
    answer: "Você pode nos enviar uma mensagem através do formulário de contato nesta página ou enviar um email para suporte@datavista.com. Nosso tempo de resposta é geralmente de 24 horas úteis.",
  },
  {
    question: "Esqueci minha senha, como posso recuperá-la?",
    answer: "Na página de login, clique em 'Esqueceu sua senha?'. Você será guiado pelo processo de redefinição de senha através do seu email cadastrado.",
  },
  {
    question: "A plataforma é segura?",
    answer: "Sim, levamos a segurança dos seus dados muito a sério. Utilizamos criptografia de ponta e seguimos as melhores práticas de segurança para proteger suas informações.",
  }
];

const AjudaPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaq = faqData.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <HelpCircle className="h-20 w-20 text-purple-500 mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gradient">Central de Ajuda</h1>
          <p className="text-xl text-muted-foreground">
            Encontre respostas para suas dúvidas e aprenda mais sobre a DataVista.
          </p>
        </div>

        <div className="mb-10 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input 
            type="text"
            placeholder="Busque por palavras-chave (ex: CPF, visualização, senha)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-3 text-lg h-14 bg-background/70 border-gray-700 focus:border-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link to="/docs" className="block"> {/* Supondo que /docs seja uma futura página de documentação */}
            <Card className="glass-card hover:border-purple-400 transition-all h-full">
              <CardHeader className="flex-row items-center gap-4">
                <BookOpen className="h-8 w-8 text-purple-400" />
                <CardTitle>Documentação</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Explore guias detalhados e referências da API.</CardDescription>
              </CardContent>
            </Card>
          </Link>
           <Link to="/tutoriais" className="block"> {/* Supondo que /tutoriais seja uma futura página */}
            <Card className="glass-card hover:border-indigo-400 transition-all h-full">
              <CardHeader className="flex-row items-center gap-4">
                <Lightbulb className="h-8 w-8 text-indigo-400" />
                <CardTitle>Tutoriais</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Aprenda passo a passo como usar nossos recursos.</CardDescription>
              </CardContent>
            </Card>
          </Link>
          <Card className="glass-card hover:border-pink-400 transition-all h-full">
            <CardHeader className="flex-row items-center gap-4">
              <MessageSquare className="h-8 w-8 text-pink-400" />
              <CardTitle>Fale Conosco</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Envie sua dúvida diretamente para nossa equipe de suporte.</CardDescription>
              <Button size="sm" className="mt-3 w-full bg-pink-500 hover:bg-pink-600 text-white">Entrar em Contato</Button>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-center md:text-left">Perguntas Frequentes (FAQ)</h2>
          {filteredFaq.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-3">
              {filteredFaq.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <AccordionItem value={`item-${index}`} className="glass-card rounded-lg border-gray-800 px-2">
                    <AccordionTrigger className="text-lg hover:no-underline p-6 text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="p-6 pt-0 text-muted-foreground text-base">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          ) : (
            <p className="text-center text-muted-foreground py-8">Nenhuma pergunta frequente encontrada para "{searchTerm}". Tente um termo diferente.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AjudaPage;