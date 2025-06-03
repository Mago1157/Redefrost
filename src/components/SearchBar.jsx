import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

const consultaTiposPrincipais = {
  cpf: "CPF",
  nome: "Nome",
  cnpj: "CNPJ",
  telefone: "Telefone",
  veicular: "Veicular",
  email: "Email",
  rg: "RG",
  cep: "CEP",
  renda: "Renda",
  score: "Score",
  // Adicione mais categorias principais se necessário
};

const SearchBar = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dataType, setDataType] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, dataType);
  };

  const handleDataTypeChange = (value) => {
    setDataType(value);
    onFilterChange(value); // Chama o onFilterChange original que pode lidar com "all" ou tipos específicos
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar tipos de consulta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50 backdrop-blur-sm border-gray-700 focus:border-purple-500"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={dataType} onValueChange={handleDataTypeChange}>
            <SelectTrigger className="w-full md:w-[200px] bg-background/50 backdrop-blur-sm border-gray-700">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectGroup>
                <SelectLabel>Categorias Principais</SelectLabel>
                {Object.entries(consultaTiposPrincipais).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Button type="submit" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90">
            <Search className="mr-2 h-4 w-4" /> Buscar
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBar;