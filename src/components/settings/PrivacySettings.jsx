import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { FileText, ShieldCheck, DatabaseZap, UserMinus, Download, Loader2, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const PrivacySettings = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [privacyOptions, setPrivacyOptions] = useState({
    saveHistory: true,
    allowDataProcessing: true,
    personalizedAds: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (key) => {
    setPrivacyOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({
      title: t('privacySettings.toastSuccessTitle'),
      description: t('privacySettings.toastSuccessDescription'),
    });
    console.log("Opções de privacidade salvas:", privacyOptions);
  };

  const handleRequestData = () => {
    toast({ description: t('privacySettings.toastDataRequestInitiated') });
    // Simulate data export
  };

  const handleDeleteAccount = () => {
    // This should open a confirmation modal in a real app
    toast({
      variant: "destructive",
      title: t('privacySettings.toastAccountDeletionTitle'),
      description: t('privacySettings.toastAccountDeletionWarning'),
      duration: 10000, // Longer duration for a warning
    });
  };
  
  const cardClass = theme === 'dark' ? 'glass-card' : 'bg-white shadow-md border';
  const itemClass = theme === 'dark' ? 'bg-accent/30 hover:bg-accent/50' : 'bg-slate-50 hover:bg-slate-100 border';
  const buttonPrimaryClass = theme === 'dark' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-purple-600 text-white hover:bg-purple-700';
  const buttonOutlineClass = theme === 'dark' ? 'border-border hover:bg-accent' : 'border-slate-300 hover:bg-slate-100 text-slate-700';
  const buttonDestructiveClass = theme === 'dark' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : 'bg-red-600 text-white hover:bg-red-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className={`text-2xl font-semibold flex items-center gap-2 ${theme === 'dark' ? 'text-gradient' : 'text-slate-800'}`}>
          <FileText className={`h-7 w-7 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          {t('privacySettings.title')}
        </h2>
        <p className="text-muted-foreground mt-1">{t('privacySettings.description')}</p>
      </div>

      <div className={`p-6 rounded-lg space-y-8 ${cardClass}`}>
        <div>
          <h3 className={`text-lg font-medium flex items-center gap-2 mb-4 ${theme === 'dark' ? 'text-primary' : 'text-slate-700'}`}>
            <ShieldCheck className="h-5 w-5" /> {t('privacySettings.dataManagementTitle')}
          </h3>
          <div className={`flex items-center justify-between p-4 rounded-md ${itemClass} mb-4`}>
            <Label htmlFor="saveHistory" className="flex-grow pr-4">
              {t('privacySettings.saveHistoryLabel')}
              <span className="block text-xs text-muted-foreground">{t('privacySettings.saveHistoryHint')}</span>
            </Label>
            <Switch id="saveHistory" checked={privacyOptions.saveHistory} onCheckedChange={() => handleToggle("saveHistory")} />
          </div>
          <div className={`flex items-center justify-between p-4 rounded-md ${itemClass} mb-4`}>
            <Label htmlFor="allowDataProcessing" className="flex-grow pr-4">
              {t('privacySettings.allowDataProcessingLabel')}
              <span className="block text-xs text-muted-foreground">{t('privacySettings.allowDataProcessingHint')}</span>
            </Label>
            <Switch id="allowDataProcessing" checked={privacyOptions.allowDataProcessing} onCheckedChange={() => handleToggle("allowDataProcessing")} />
          </div>
          <div className={`flex items-center justify-between p-4 rounded-md ${itemClass}`}>
            <Label htmlFor="personalizedAds" className="flex-grow pr-4">
              {t('privacySettings.personalizedAdsLabel')}
              <span className="block text-xs text-muted-foreground">{t('privacySettings.personalizedAdsHint')}</span>
            </Label>
            <Switch id="personalizedAds" checked={privacyOptions.personalizedAds} onCheckedChange={() => handleToggle("personalizedAds")} />
          </div>
           <div className="flex justify-end pt-6">
            <Button type="button" onClick={handleSaveChanges} className={`${buttonPrimaryClass} w-full sm:w-auto`} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {t('privacySettings.saveChangesButton')}
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className={`text-lg font-medium flex items-center gap-2 mb-4 ${theme === 'dark' ? 'text-primary' : 'text-slate-700'}`}>
            <DatabaseZap className="h-5 w-5" /> {t('privacySettings.yourDataTitle')}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
           {t('privacySettings.yourDataDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleRequestData} variant="outline" className={`${buttonOutlineClass} w-full sm:w-auto`}>
              <Download className="mr-2 h-4 w-4" /> {t('privacySettings.requestDataButton')}
            </Button>
            <Link to="/termos-de-servico" className="w-full sm:w-auto">
                 <Button variant="outline" className={`${buttonOutlineClass} w-full`}>
                    <FileText className="mr-2 h-4 w-4" /> {t('privacySettings.termsLink')}
                </Button>
            </Link>
             <Link to="/politica-de-privacidade" className="w-full sm:w-auto">
                <Button variant="outline" className={`${buttonOutlineClass} w-full`}>
                    <ShieldCheck className="mr-2 h-4 w-4" /> {t('privacySettings.privacyPolicyLink')}
                </Button>
            </Link>
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-medium flex items-center gap-2 mb-4 ${theme === 'dark' ? 'text-destructive' : 'text-red-600'}`}>
            <UserMinus className="h-5 w-5" /> {t('privacySettings.deleteAccountTitle')}
          </h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-red-300/80' : 'text-red-700'} mb-4`}>
            {t('privacySettings.deleteAccountWarning')}
          </p>
          <Button onClick={handleDeleteAccount} className={`${buttonDestructiveClass} w-full sm:w-auto`}>
            {t('privacySettings.deleteAccountButton')}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacySettings;