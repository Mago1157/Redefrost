import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Shield, Lock, Eye, EyeOff, Smartphone, KeyRound, Loader2, Save, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const SecuritySettings = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [is2faLoading, setIs2faLoading] = useState(false);
  const [is2faEnabled, setIs2faEnabled] = useState(false); // Mock state

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast({ variant: "destructive", title: t('securitySettings.toastErrorTitle'), description: t('securitySettings.toastPasswordMismatch') });
      return;
    }
    if (newPassword.length < 8) {
      toast({ variant: "destructive", title: t('securitySettings.toastErrorTitle'), description: t('securitySettings.toastPasswordLength') });
      return;
    }
    setIsPasswordLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsPasswordLoading(false);
    toast({ title: t('securitySettings.toastPasswordSuccessTitle'), description: t('securitySettings.toastPasswordSuccessDescription') });
    setCurrentPassword(""); setNewPassword(""); setConfirmNewPassword("");
  };

  const handleToggle2FA = async () => {
    setIs2faLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIs2faEnabled(prev => !prev);
    setIs2faLoading(false);
    toast({ title: t('securitySettings.toast2FATitle'), description: is2faEnabled ? t('securitySettings.toast2FADisabled') : t('securitySettings.toast2FAEnabled') });
  };
  
  const cardClass = theme === 'dark' ? 'glass-card' : 'bg-white shadow-md border';
  const inputBgClass = theme === 'dark' ? 'bg-background/70 border-gray-700 focus:border-purple-500' : 'bg-slate-50 border-slate-300 focus:border-purple-500';
  const buttonPrimaryClass = theme === 'dark' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-purple-600 text-white hover:bg-purple-700';
  const buttonOutlineClass = theme === 'dark' ? 'border-border hover:bg-accent' : 'border-slate-300 hover:bg-slate-100 text-slate-700';


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className={`text-2xl font-semibold flex items-center gap-2 ${theme === 'dark' ? 'text-gradient' : 'text-slate-800'}`}>
          <Shield className={`h-7 w-7 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          {t('securitySettings.title')}
        </h2>
        <p className="text-muted-foreground mt-1">{t('securitySettings.description')}</p>
      </div>

      <div className={`p-6 rounded-lg space-y-8 ${cardClass}`}>
        <div>
          <h3 className={`text-lg font-medium flex items-center gap-2 mb-4 ${theme === 'dark' ? 'text-primary' : 'text-slate-700'}`}>
            <Lock className="h-5 w-5" /> {t('securitySettings.changePasswordTitle')}
          </h3>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">{t('securitySettings.currentPasswordLabel')}</Label>
              <div className="relative mt-1">
                <Input id="currentPassword" type={showCurrentPassword ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className={`${inputBgClass} pr-10`} required />
                <Button type="button" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => setShowCurrentPassword(p => !p)}>
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="newPassword">{t('securitySettings.newPasswordLabel')}</Label>
              <div className="relative mt-1">
                <Input id="newPassword" type={showNewPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={`${inputBgClass} pr-10`} required />
                 <Button type="button" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => setShowNewPassword(p => !p)}>
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmNewPassword">{t('securitySettings.confirmNewPasswordLabel')}</Label>
              <div className="relative mt-1">
                <Input id="confirmNewPassword" type={showConfirmNewPassword ? "text" : "password"} value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className={`${inputBgClass} pr-10`} required />
                <Button type="button" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => setShowConfirmNewPassword(p => !p)}>
                  {showConfirmNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className={`${buttonPrimaryClass} w-full sm:w-auto`} disabled={isPasswordLoading}>
              {isPasswordLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {t('securitySettings.savePasswordButton')}
            </Button>
          </form>
        </div>

        <Separator className="my-8" />

        <div>
          <h3 className={`text-lg font-medium flex items-center gap-2 mb-4 ${theme === 'dark' ? 'text-primary' : 'text-slate-700'}`}>
            <Smartphone className="h-5 w-5" /> {t('securitySettings.twoFactorAuthTitle')}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {is2faEnabled ? t('securitySettings.twoFactorAuthEnabledText') : t('securitySettings.twoFactorAuthDisabledText')}
          </p>
          <Button onClick={handleToggle2FA} className={`${is2faEnabled ? (theme === 'dark' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : 'bg-red-600 text-white hover:bg-red-700') : buttonPrimaryClass} w-full sm:w-auto`} disabled={is2faLoading}>
            {is2faLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {is2faEnabled ? t('securitySettings.disable2FAButton') : t('securitySettings.enable2FAButton')}
          </Button>
          {!is2faEnabled && (
            <div className={`mt-4 p-3 rounded-md flex items-start gap-2 ${theme === 'dark' ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-yellow-50 border border-yellow-200'}`}>
                <AlertTriangle className={`h-5 w-5 mt-0.5 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600' }`} />
                <p className={`text-xs ${theme === 'dark' ? 'text-yellow-200/80' : 'text-yellow-700'}`}>
                    {t('securitySettings.twoFactorAuthWarning')}
                </p>
            </div>
          )}
        </div>
        
        <Separator className="my-8" />

        <div>
          <h3 className={`text-lg font-medium flex items-center gap-2 mb-4 ${theme === 'dark' ? 'text-primary' : 'text-slate-700'}`}>
            <KeyRound className="h-5 w-5" /> {t('securitySettings.activeSessionsTitle')}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{t('securitySettings.activeSessionsDescription')}</p>
          {/* Placeholder for active sessions list */}
          <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-accent/30' : 'bg-slate-50 border'}`}>
            <p className="text-sm text-muted-foreground">{t('securitySettings.noActiveSessions')}</p>
          </div>
          <Button variant="outline" className={`${buttonOutlineClass} mt-4 w-full sm:w-auto`}>{t('securitySettings.revokeAllSessionsButton')}</Button>
        </div>

      </div>
    </motion.div>
  );
};

export default SecuritySettings;