import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Zap, CalendarDays, Download, PlusCircle, Edit } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

const mockPlan = {
  name: "Plano Mensal Pro",
  price: "R$ 99,90/mês",
  credits: "5000 créditos/mês",
  nextBillingDate: "30/06/2025",
  paymentMethod: "**** **** **** 1234 (Visa)",
};

const mockInvoices = [
  { id: "INV001", date: "01/06/2025", amount: "R$ 99,90", status: "Pago" },
  { id: "INV002", date: "01/05/2025", amount: "R$ 99,90", status: "Pago" },
  { id: "INV003", date: "01/04/2025", amount: "R$ 99,90", status: "Pago" },
];

const BillingSettings = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const cardClass = theme === 'dark' ? 'glass-card' : 'bg-white shadow-md border';
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
          <CreditCard className={`h-7 w-7 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
          {t('billingSettings.title')}
        </h2>
        <p className="text-muted-foreground mt-1">{t('billingSettings.description')}</p>
      </div>

      <div className={`p-6 rounded-lg mb-8 ${cardClass}`}>
        <h3 className={`text-lg font-medium flex items-center gap-2 mb-4 ${theme === 'dark' ? 'text-primary' : 'text-slate-700'}`}>
          <Zap className="h-5 w-5" /> {t('billingSettings.currentPlanTitle')}
        </h3>
        <div className="space-y-3 text-sm">
          <p><strong>{t('billingSettings.planNameLabel')}:</strong> {mockPlan.name}</p>
          <p><strong>{t('billingSettings.planPriceLabel')}:</strong> {mockPlan.price}</p>
          <p><strong>{t('billingSettings.planCreditsLabel')}:</strong> {mockPlan.credits}</p>
          <p><strong>{t('billingSettings.nextBillingDateLabel')}:</strong> {mockPlan.nextBillingDate}</p>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button className={`${buttonPrimaryClass} w-full sm:w-auto`}>{t('billingSettings.changePlanButton')}</Button>
          <Button variant="outline" className={`${buttonOutlineClass} w-full sm:w-auto`}>{t('billingSettings.cancelSubscriptionButton')}</Button>
        </div>
      </div>

      <div className={`p-6 rounded-lg mb-8 ${cardClass}`}>
        <h3 className={`text-lg font-medium flex items-center gap-2 mb-4 ${theme === 'dark' ? 'text-primary' : 'text-slate-700'}`}>
          <CreditCard className="h-5 w-5" /> {t('billingSettings.paymentMethodTitle')}
        </h3>
        <p className="text-sm mb-1"><strong>{t('billingSettings.currentMethodLabel')}:</strong> {mockPlan.paymentMethod}</p>
        <p className="text-xs text-muted-foreground mb-4">{t('billingSettings.paymentMethodHint')}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className={`${buttonOutlineClass} w-full sm:w-auto`}><Edit className="mr-2 h-4 w-4"/>{t('billingSettings.editPaymentButton')}</Button>
          <Button variant="outline" className={`${buttonOutlineClass} w-full sm:w-auto`}><PlusCircle className="mr-2 h-4 w-4"/>{t('billingSettings.addPaymentButton')}</Button>
        </div>
      </div>
      
      <div className={`p-6 rounded-lg ${cardClass}`}>
        <h3 className={`text-lg font-medium flex items-center gap-2 mb-4 ${theme === 'dark' ? 'text-primary' : 'text-slate-700'}`}>
          <CalendarDays className="h-5 w-5" /> {t('billingSettings.billingHistoryTitle')}
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('billingSettings.invoiceIdLabel')}</TableHead>
              <TableHead>{t('billingSettings.invoiceDateLabel')}</TableHead>
              <TableHead>{t('billingSettings.invoiceAmountLabel')}</TableHead>
              <TableHead>{t('billingSettings.invoiceStatusLabel')}</TableHead>
              <TableHead className="text-right">{t('billingSettings.invoiceActionsLabel')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInvoices.map(invoice => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>
                  <span className={`text-xs px-2 py-0.5 rounded-full w-fit
                    ${invoice.status === "Pago" 
                      ? (theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700')
                      : (theme === 'dark' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700')
                    }`}
                  >
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default BillingSettings;