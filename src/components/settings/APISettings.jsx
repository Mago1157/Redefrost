import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KeyRound, PlusCircle, Trash2, Copy, Eye, EyeOff, Loader2, Info } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const mockApiKeys = [
  { id: "dk_prod_abcdef123456", label: "Chave Principal (Produção)", created: "01/01/2025", lastUsed: "01/06/2025", scopes: ["consultas:ler", "creditos:ler"] },
  { id: "dk_test_uvwxyz789012", label: "Chave de Testes (Desenvolvimento)", created: "15/03/2025", lastUsed: "25/05/2025", scopes: ["consultas:ler"] },
];

const APISettings = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [apiKeys, setApiKeys] = useState(mockApiKeys);
  const [newKeyLabel, setNewKeyLabel] = useState("");
  const [showKey, setShowKey] = useState({}); // { [keyId]: boolean }
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateKey = async (e) => {
    e.preventDefault();
    if (!newKeyLabel.trim()) {
      toast({ variant: "destructive", title: t('apiSettings.toastErrorTitle'), description: t('apiSettings.toastLabelRequired') });
      return;
    }
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newKey = `dk_live_${Math.random().toString(36).substring(2, 15)}`;
    setApiKeys(prev => [...prev, { id: newKey, label: newKeyLabel, created: new Date().toLocaleDateString(), lastUsed: "Nunca", scopes: ["consultas:ler"] }]);
    setNewKeyLabel("");
    setIsGenerating(false);
    toast({ title: t('apiSettings.toastKeyGeneratedTitle'), description: t('apiSettings.toastKeyGeneratedDescription', { label: newKeyLabel }) });
  };

  const handleDeleteKey = (keyId) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId));
    toast({ title: t('apiSettings.toastKeyDeletedTitle'), description: t('apiSettings.toastKeyDeletedDescription') });
  };

  const toggleShowKey = (keyId) => {
    setShowKey(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({ description: t('apiSettings.toastKeyCopied') });
  };

  const cardClass = theme === 'dark' ? 'glass-card' : 'bg-white shadow-md border';
  const inputBgClass = theme === 'dark' ? 'bg-background/70 border-gray-700 focus:border-purple-500' : 'bg-slate-50 border-slate-300 focus:border-purple-500';
  const buttonPrimaryClass = theme === 'dark' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-purple-600 text-white hover:bg-purple-700';


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className={`text-2xl font-semibold flex items-center gap-2 ${theme === 'dark' ? 'text-gradient' : 'text-slate-800'}`}>
          <KeyRound className={`h-7 w-7 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          {t('apiSettings.title')}
        </h2>
        <p className="text-muted-foreground mt-1">{t('apiSettings.description')}</p>
      </div>

      <div className={`p-6 rounded-lg mb-8 ${cardClass}`}>
        <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-primary' : 'text-slate-700'}`}>{t('apiSettings.generateKeyTitle')}</h3>
        <form onSubmit={handleGenerateKey} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-grow w-full sm:w-auto">
            <Label htmlFor="newKeyLabel">{t('apiSettings.keyLabelLabel')}</Label>
            <Input
              id="newKeyLabel"
              value={newKeyLabel}
              onChange={(e) => setNewKeyLabel(e.target.value)}
              placeholder={t('apiSettings.keyLabelPlaceholder')}
              className={`mt-1 ${inputBgClass}`}
            />
          </div>
          <Button type="submit" className={`${buttonPrimaryClass} w-full sm:w-auto`} disabled={isGenerating}>
            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
            {t('apiSettings.generateButton')}
          </Button>
        </form>
         <div className={`mt-4 p-3 rounded-md flex items-start gap-2 ${theme === 'dark' ? 'bg-indigo-500/10 border border-indigo-500/30' : 'bg-indigo-50 border border-indigo-200'}`}>
            <Info className={`h-5 w-5 mt-0.5 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600' }`} />
            <p className={`text-xs ${theme === 'dark' ? 'text-indigo-200/80' : 'text-indigo-700'}`}>
                {t('apiSettings.keyStorageWarning')}
            </p>
        </div>
      </div>

      <div className={`p-6 rounded-lg ${cardClass}`}>
        <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-primary' : 'text-slate-700'}`}>{t('apiSettings.manageKeysTitle')}</h3>
        {apiKeys.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('apiSettings.keyLabelHeader')}</TableHead>
                <TableHead>{t('apiSettings.keyValueHeader')}</TableHead>
                <TableHead>{t('apiSettings.createdHeader')}</TableHead>
                <TableHead>{t('apiSettings.lastUsedHeader')}</TableHead>
                <TableHead className="text-right">{t('apiSettings.actionsHeader')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.label}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {showKey[key.id] ? key.id : `${key.id.substring(0, 7)}...${key.id.substring(key.id.length - 6)}`}
                  </TableCell>
                  <TableCell>{key.created}</TableCell>
                  <TableCell>{key.lastUsed}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleShowKey(key.id)}>
                      {showKey[key.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(key.id)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className={`h-8 w-8 ${theme === 'dark' ? 'hover:bg-destructive/20 text-destructive' : 'hover:bg-red-100 text-red-600'}`} onClick={() => handleDeleteKey(key.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground text-center py-4">{t('apiSettings.noKeysFound')}</p>
        )}
      </div>
    </motion.div>
  );
};

export default APISettings;