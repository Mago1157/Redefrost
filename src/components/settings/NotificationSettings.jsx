import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Bell, Mail, MessageSquare, Smartphone, Save, Loader2 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const NotificationSettings = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [settings, setSettings] = useState({
    emailConsultas: true,
    emailPromocoes: false,
    pushAlertas: true,
    smsSeguranca: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    setIsLoading(false);
    toast({
      title: t('notificationSettings.toastSuccessTitle'),
      description: t('notificationSettings.toastSuccessDescription'),
    });
    console.log("Preferências de notificação salvas:", settings);
  };

  const cardClass = theme === 'dark' ? 'glass-card' : 'bg-white shadow-md border';
  const itemClass = theme === 'dark' ? 'bg-accent/30 hover:bg-accent/50' : 'bg-slate-50 hover:bg-slate-100 border';
  const buttonPrimaryClass = theme === 'dark' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-purple-600 text-white hover:bg-purple-700';


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className={`text-2xl font-semibold flex items-center gap-2 ${theme === 'dark' ? 'text-gradient' : 'text-slate-800'}`}>
          <Bell className={`h-7 w-7 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          {t('notificationSettings.title')}
        </h2>
        <p className="text-muted-foreground mt-1">{t('notificationSettings.description')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className={`p-6 rounded-lg space-y-6 ${cardClass}`}>
          <h3 className={`text-lg font-medium flex items-center gap-2 ${theme === 'dark' ? 'text-primary' : 'text-slate-700'}`}>
            <Mail className="h-5 w-5" /> {t('notificationSettings.emailNotifications')}
          </h3>
          <div className={`flex items-center justify-between p-4 rounded-md ${itemClass}`}>
            <Label htmlFor="emailConsultas" className="flex-grow pr-4">
              {t('notificationSettings.emailConsultationsLabel')}
              <span className="block text-xs text-muted-foreground">{t('notificationSettings.emailConsultationsHint')}</span>
            </Label>
            <Switch id="emailConsultas" checked={settings.emailConsultas} onCheckedChange={() => handleToggle("emailConsultas")} />
          </div>
          <div className={`flex items-center justify-between p-4 rounded-md ${itemClass}`}>
            <Label htmlFor="emailPromocoes" className="flex-grow pr-4">
              {t('notificationSettings.emailPromotionsLabel')}
              <span className="block text-xs text-muted-foreground">{t('notificationSettings.emailPromotionsHint')}</span>
            </Label>
            <Switch id="emailPromocoes" checked={settings.emailPromocoes} onCheckedChange={() => handleToggle("emailPromocoes")} />
          </div>
        </div>

        <div className={`p-6 rounded-lg space-y-6 ${cardClass}`}>
          <h3 className={`text-lg font-medium flex items-center gap-2 ${theme === 'dark' ? 'text-primary' : 'text-slate-700'}`}>
            <MessageSquare className="h-5 w-5" /> {t('notificationSettings.pushNotifications')}
          </h3>
          <div className={`flex items-center justify-between p-4 rounded-md ${itemClass}`}>
            <Label htmlFor="pushAlertas" className="flex-grow pr-4">
              {t('notificationSettings.pushAlertsLabel')}
              <span className="block text-xs text-muted-foreground">{t('notificationSettings.pushAlertsHint')}</span>
            </Label>
            <Switch id="pushAlertas" checked={settings.pushAlertas} onCheckedChange={() => handleToggle("pushAlertas")} />
          </div>
        </div>
        
        <div className={`p-6 rounded-lg space-y-6 ${cardClass}`}>
          <h3 className={`text-lg font-medium flex items-center gap-2 ${theme === 'dark' ? 'text-primary' : 'text-slate-700'}`}>
            <Smartphone className="h-5 w-5" /> {t('notificationSettings.smsNotifications')}
          </h3>
          <div className={`flex items-center justify-between p-4 rounded-md ${itemClass}`}>
            <Label htmlFor="smsSeguranca" className="flex-grow pr-4">
             {t('notificationSettings.smsSecurityLabel')}
              <span className="block text-xs text-muted-foreground">{t('notificationSettings.smsSecurityHint')}</span>
            </Label>
            <Switch id="smsSeguranca" checked={settings.smsSeguranca} onCheckedChange={() => handleToggle("smsSeguranca")} />
          </div>
        </div>


        <div className="flex justify-end pt-4">
          <Button type="submit" className={`${buttonPrimaryClass} w-full sm:w-auto`} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {t('notificationSettings.saveButton')}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default NotificationSettings;