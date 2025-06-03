import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Search, Filter, CalendarDays, FileText, AlertCircle, CheckCircle, Download, DollarSign } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const mockHistory = [
  { id: "ch001", date: "2025-06-01 10:30", type: "CPF Nacional", query: "123.456.789-00", cost: 2, status: "Sucesso" },
  { id: "ch002", date: "2025-05-30 14:15", type: "CNPJ", query: "12.345.678/0001-99", cost: 5, status: "Sucesso" },
  { id: "ch003", date: "2025-05-28 09:00", type: "Veicular Nacional", query: "ABC1D23", cost: 3, status: "Falha" },
  { id: "ch004", date: "2025-05-25 17:45", type: "Nome Completo", query: "Fulano de Tal", cost: 1, status: "Sucesso" },
  { id: "ch005", date: "2025-05-20 11:20", type: "Consulta Score", query: "987.654.321-00", cost: 10, status: "Sucesso" },
];

const ConsultationHistory = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [historyData, setHistoryData] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  useEffect(() => {
    setHistoryData(mockHistory);
    setFilteredHistory(mockHistory);
  }, []);

  useEffect(() => {
    let result = historyData;
    if (searchTerm) {
      result = result.filter(item =>
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.query.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      result = result.filter(item => item.status.toLowerCase() === statusFilter.toLowerCase());
    }
    setFilteredHistory(result);
  }, [searchTerm, statusFilter, dateRange, historyData]);

  const cardClass = theme === 'dark' ? 'glass-card' : 'bg-white shadow-md border';
  const inputBgClass = theme === 'dark' ? 'bg-background/70 border-gray-700 focus:border-purple-500' : 'bg-slate-50 border-slate-300 focus:border-purple-500';
  const buttonOutlineClass = theme === 'dark' ? 'border-border hover:bg-accent' : 'border-slate-300 hover:bg-slate-100 text-slate-700';


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className={`text-2xl font-semibold flex items-center gap-2 ${theme === 'dark' ? 'text-gradient' : 'text-slate-800'}`}>
          <History className={`h-7 w-7 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          {t('consultationHistory.title')}
        </h2>
        <p className="text-muted-foreground mt-1">{t('consultationHistory.description')}</p>
      </div>

      <div className={`p-6 rounded-lg ${cardClass}`}>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder={t('consultationHistory.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 ${inputBgClass}`}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className={`w-full md:w-[180px] ${inputBgClass}`}>
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder={t('consultationHistory.statusFilterPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('consultationHistory.statusAll')}</SelectItem>
              <SelectItem value="sucesso">{t('consultationHistory.statusSuccess')}</SelectItem>
              <SelectItem value="falha">{t('consultationHistory.statusFailure')}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className={`${buttonOutlineClass}`}>
            <Download className="mr-2 h-4 w-4" /> {t('consultationHistory.exportButton')}
          </Button>
        </div>

        <ScrollArea className="h-[400px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><CalendarDays className="inline mr-1 h-4 w-4" />{t('consultationHistory.tableHeaderDate')}</TableHead>
                <TableHead><FileText className="inline mr-1 h-4 w-4" />{t('consultationHistory.tableHeaderType')}</TableHead>
                <TableHead>{t('consultationHistory.tableHeaderQuery')}</TableHead>
                <TableHead><DollarSign className="inline mr-1 h-4 w-4" />{t('consultationHistory.tableHeaderCost')}</TableHead>
                <TableHead>{t('consultationHistory.tableHeaderStatus')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.length > 0 ? filteredHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-xs">{item.date}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell className="font-mono text-xs">{item.query}</TableCell>
                  <TableCell>{item.cost} {t('consultationHistory.credits')}</TableCell>
                  <TableCell>
                    <span className={`flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full w-fit
                      ${item.status === "Sucesso" 
                        ? (theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700')
                        : (theme === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700')
                      }`}
                    >
                      {item.status === "Sucesso" ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                      {item.status}
                    </span>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    {t('consultationHistory.noResults')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </motion.div>
  );
};

export default ConsultationHistory;