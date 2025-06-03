import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Languages, Globe, CheckCircle, Loader2, Save } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext"; // Import useLanguage

const availableLanguages = [
  { code: "pt-BR", name: "Português (Brasil)" },
  { code: "en-US", name: "English (United States)" },
  { code: "es-ES", name: "Español (España)" },
  { code: "fr-FR", name: "Français (France)" },
];

const LanguageSettings = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const { language, changeLanguage, t } = useLanguage(); // use t from context
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLanguageChange = (newLang) => {
    setSelectedLanguage(newLang);
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    // Simulate saving preference
    await new Promise(resolve => setTimeout(resolve, 1000));
    changeLanguage(selectedLanguage); // Apply the language change
    setIsLoading(false);
    toast({
      title: t('languageSettings.toastSuccessTitle'),
      description: t('languageSettings.toastSuccessDescription', { langName: availableLanguages.find(l => l.code === selectedLanguage)?.name }),
    });
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
          <Languages className={`h-7 w-7 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          {t('languageSettings.title')}
        </h2>
        <p className="text-muted-foreground mt-1">{t('languageSettings.description')}</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="language-select" className="text-base block mb-2">{t('languageSettings.selectLabel')}</Label>
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger id="language-select" className={`w-full md:w-1/2 ${inputBgClass}`}>
              <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder={t('languageSettings.selectPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {availableLanguages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-1">{t('languageSettings.selectHint')}</p>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            type="button" 
            onClick={handleSaveChanges} 
            className={`${buttonPrimaryClass} w-full sm:w-auto`} 
            disabled={isLoading || selectedLanguage === language}
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {t('languageSettings.saveButton')}
          </Button>
        </div>

        <div className={`mt-8 p-4 rounded-md border ${theme === 'dark' ? 'border-gray-700 bg-accent/30' : 'border-slate-300 bg-slate-50'}`}>
            <h4 className="font-semibold flex items-center gap-2 mb-2">
                <CheckCircle className={`h-5 w-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}/>
                {t('languageSettings.currentLanguage')}
            </h4>
            <p className="text-muted-foreground text-sm">
                {t('languageSettings.currentLanguageText', { langName: availableLanguages.find(l => l.code === language)?.name || language })}
            </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LanguageSettings;