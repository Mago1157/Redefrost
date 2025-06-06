import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

// Basic translations (expand as needed)
const translations = {
  "pt-BR": {
    greeting: "Olá Mundo!",
    // Configurações -> Idioma
    "languageSettings.title": "Idioma e Região",
    "languageSettings.description": "Escolha o idioma de exibição da plataforma e suas preferências regionais.",
    "languageSettings.selectLabel": "Idioma da Interface",
    "languageSettings.selectPlaceholder": "Selecione um idioma",
    "languageSettings.selectHint": "Esta configuração afetará o idioma de toda a interface.",
    "languageSettings.saveButton": "Salvar Idioma",
    "languageSettings.toastSuccessTitle": "Idioma Atualizado!",
    "languageSettings.toastSuccessDescription": "A interface agora será exibida em {langName}.",
    "languageSettings.currentLanguage": "Idioma Atual",
    "languageSettings.currentLanguageText": "A plataforma está configurada para {langName}.",
    // Configurações -> Notificações
    "notificationSettings.title": "Notificações",
    "notificationSettings.description": "Escolha como você deseja receber notificações.",
    "notificationSettings.emailNotifications": "Notificações por Email",
    "notificationSettings.emailConsultationsLabel": "Resultados de Consultas e Relatórios",
    "notificationSettings.emailConsultationsHint": "Receba um email quando suas consultas forem concluídas ou relatórios estiverem prontos.",
    "notificationSettings.emailPromotionsLabel": "Novidades e Promoções",
    "notificationSettings.emailPromotionsHint": "Receba emails sobre novos recursos, dicas e ofertas especiais.",
    "notificationSettings.pushNotifications": "Notificações Push (Web/Mobile)",
    "notificationSettings.pushAlertsLabel": "Alertas Importantes da Conta",
    "notificationSettings.pushAlertsHint": "Receba notificações push sobre atividades críticas ou atualizações de segurança.",
    "notificationSettings.smsNotifications": "Notificações por SMS",
    "notificationSettings.smsSecurityLabel": "Alertas de Segurança por SMS",
    "notificationSettings.smsSecurityHint": "Receba SMS para verificações de segurança e atividades suspeitas.",
    "notificationSettings.saveButton": "Salvar Preferências",
    "notificationSettings.toastSuccessTitle": "Preferências Salvas!",
    "notificationSettings.toastSuccessDescription": "Suas configurações de notificação foram atualizadas.",
    // Configurações -> Segurança
    "securitySettings.title": "Segurança",
    "securitySettings.description": "Gerencie suas configurações de segurança, senha e autenticação.",
    "securitySettings.changePasswordTitle": "Alterar Senha",
    "securitySettings.currentPasswordLabel": "Senha Atual",
    "securitySettings.newPasswordLabel": "Nova Senha",
    "securitySettings.confirmNewPasswordLabel": "Confirmar Nova Senha",
    "securitySettings.savePasswordButton": "Salvar Nova Senha",
    "securitySettings.twoFactorAuthTitle": "Autenticação de Dois Fatores (2FA)",
    "securitySettings.twoFactorAuthEnabledText": "A autenticação de dois fatores está ATIVADA para sua conta.",
    "securitySettings.twoFactorAuthDisabledText": "A autenticação de dois fatores está DESATIVADA. Ative para maior segurança.",
    "securitySettings.enable2FAButton": "Ativar 2FA",
    "securitySettings.disable2FAButton": "Desativar 2FA",
    "securitySettings.twoFactorAuthWarning": "Ativar a 2FA adiciona uma camada extra de segurança à sua conta.",
    "securitySettings.activeSessionsTitle": "Sessões Ativas",
    "securitySettings.activeSessionsDescription": "Veja e gerencie os dispositivos atualmente conectados à sua conta.",
    "securitySettings.noActiveSessions": "Nenhuma sessão ativa encontrada além desta.",
    "securitySettings.revokeAllSessionsButton": "Desconectar Todas as Outras Sessões",
    "securitySettings.toastErrorTitle": "Erro",
    "securitySettings.toastPasswordMismatch": "As novas senhas não coincidem.",
    "securitySettings.toastPasswordLength": "A nova senha deve ter pelo menos 8 caracteres.",
    "securitySettings.toastPasswordSuccessTitle": "Senha Alterada!",
    "securitySettings.toastPasswordSuccessDescription": "Sua senha foi atualizada com sucesso.",
    "securitySettings.toast2FATitle": "Autenticação 2FA",
    "securitySettings.toast2FAEnabled": "2FA ativada com sucesso.",
    "securitySettings.toast2FADisabled": "2FA desativada.",
    // Configurações -> Histórico de Consultas
    "consultationHistory.title": "Histórico de Consultas",
    "consultationHistory.description": "Visualize todas as consultas realizadas e os créditos utilizados.",
    "consultationHistory.searchPlaceholder": "Buscar por tipo ou detalhe da consulta...",
    "consultationHistory.statusFilterPlaceholder": "Filtrar por status",
    "consultationHistory.statusAll": "Todos Status",
    "consultationHistory.statusSuccess": "Sucesso",
    "consultationHistory.statusFailure": "Falha",
    "consultationHistory.exportButton": "Exportar Histórico",
    "consultationHistory.tableHeaderDate": "Data",
    "consultationHistory.tableHeaderType": "Tipo de Consulta",
    "consultationHistory.tableHeaderQuery": "Consulta Realizada",
    "consultationHistory.tableHeaderCost": "Custo",
    "consultationHistory.tableHeaderStatus": "Status",
    "consultationHistory.credits": "créditos",
    "consultationHistory.noResults": "Nenhum histórico encontrado para os filtros aplicados.",
    // Configurações -> Cobrança e Planos
    "billingSettings.title": "Cobrança e Planos",
    "billingSettings.description": "Gerencie seu plano, métodos de pagamento e histórico de faturamento.",
    "billingSettings.currentPlanTitle": "Seu Plano Atual",
    "billingSettings.planNameLabel": "Nome do Plano",
    "billingSettings.planPriceLabel": "Preço",
    "billingSettings.planCreditsLabel": "Créditos",
    "billingSettings.nextBillingDateLabel": "Próxima Cobrança",
    "billingSettings.changePlanButton": "Mudar de Plano",
    "billingSettings.cancelSubscriptionButton": "Cancelar Assinatura",
    "billingSettings.paymentMethodTitle": "Método de Pagamento",
    "billingSettings.currentMethodLabel": "Cartão Principal",
    "billingSettings.paymentMethodHint": "Seu método de pagamento principal será usado para cobranças futuras.",
    "billingSettings.editPaymentButton": "Editar Método",
    "billingSettings.addPaymentButton": "Adicionar Novo Método",
    "billingSettings.billingHistoryTitle": "Histórico de Faturamento",
    "billingSettings.invoiceIdLabel": "ID da Fatura",
    "billingSettings.invoiceDateLabel": "Data",
    "billingSettings.invoiceAmountLabel": "Valor",
    "billingSettings.invoiceStatusLabel": "Status",
    "billingSettings.invoiceActionsLabel": "Ações",
    // Configurações -> Chaves de API
    "apiSettings.title": "Chaves de API",
    "apiSettings.description": "Gerencie suas chaves de API para integrar com outros serviços.",
    "apiSettings.generateKeyTitle": "Gerar Nova Chave de API",
    "apiSettings.keyLabelLabel": "Rótulo da Chave (Ex: 'Meu App de Integração')",
    "apiSettings.keyLabelPlaceholder": "Digite um rótulo para sua chave",
    "apiSettings.generateButton": "Gerar Chave",
    "apiSettings.keyStorageWarning": "Guarde sua chave de API em local seguro. Ela não será exibida novamente.",
    "apiSettings.manageKeysTitle": "Gerenciar Chaves Existentes",
    "apiSettings.keyLabelHeader": "Rótulo",
    "apiSettings.keyValueHeader": "Chave",
    "apiSettings.createdHeader": "Criada em",
    "apiSettings.lastUsedHeader": "Último Uso",
    "apiSettings.actionsHeader": "Ações",
    "apiSettings.noKeysFound": "Nenhuma chave de API encontrada. Gere uma nova acima.",
    "apiSettings.toastErrorTitle": "Erro ao Gerar Chave",
    "apiSettings.toastLabelRequired": "O rótulo da chave é obrigatório.",
    "apiSettings.toastKeyGeneratedTitle": "Chave de API Gerada!",
    "apiSettings.toastKeyGeneratedDescription": "Sua nova chave '{label}' foi gerada. Copie e guarde em local seguro.",
    "apiSettings.toastKeyDeletedTitle": "Chave Removida",
    "apiSettings.toastKeyDeletedDescription": "A chave de API foi removida com sucesso.",
    "apiSettings.toastKeyCopied": "Chave copiada para a área de transferência!",
     // Configurações -> Privacidade de Dados
    "privacySettings.title": "Privacidade de Dados",
    "privacySettings.description": "Gerencie suas preferências de privacidade e dados pessoais.",
    "privacySettings.dataManagementTitle": "Gerenciamento de Dados",
    "privacySettings.saveHistoryLabel": "Salvar Histórico de Consultas",
    "privacySettings.saveHistoryHint": "Permite que a plataforma armazene seu histórico de consultas para referência futura.",
    "privacySettings.allowDataProcessingLabel": "Permitir Processamento de Dados para Melhorias",
    "privacySettings.allowDataProcessingHint": "Ajude-nos a melhorar nossos serviços permitindo o processamento anônimo de dados de uso.",
    "privacySettings.personalizedAdsLabel": "Anúncios Personalizados",
    "privacySettings.personalizedAdsHint": "Permita que utilizemos seus dados para mostrar anúncios mais relevantes (não vendemos seus dados a terceiros).",
    "privacySettings.saveChangesButton": "Salvar Alterações de Privacidade",
    "privacySettings.yourDataTitle": "Seus Dados",
    "privacySettings.yourDataDescription": "Você tem o direito de acessar e gerenciar seus dados.",
    "privacySettings.requestDataButton": "Solicitar Meus Dados",
    "privacySettings.termsLink": "Termos de Serviço",
    "privacySettings.privacyPolicyLink": "Política de Privacidade",
    "privacySettings.deleteAccountTitle": "Excluir Conta",
    "privacySettings.deleteAccountWarning": "Esta ação é irreversível. Todos os seus dados, incluindo histórico e configurações, serão permanentemente excluídos.",
    "privacySettings.deleteAccountButton": "Excluir Minha Conta Permanentemente",
    "privacySettings.toastSuccessTitle": "Preferências de Privacidade Salvas!",
    "privacySettings.toastSuccessDescription": "Suas configurações de privacidade foram atualizadas.",
    "privacySettings.toastDataRequestInitiated": "Solicitação de dados iniciada. Você receberá um email com instruções.",
    "privacySettings.toastAccountDeletionTitle": "Atenção: Exclusão de Conta",
    "privacySettings.toastAccountDeletionWarning": "A exclusão da conta é permanente e não pode ser desfeita. Confirme esta ação se tiver certeza.",
  },
  "en-US": {
    greeting: "Hello World!",
    // Settings -> Language
    "languageSettings.title": "Language & Region",
    "languageSettings.description": "Choose the display language for the platform and your regional preferences.",
    "languageSettings.selectLabel": "Interface Language",
    "languageSettings.selectPlaceholder": "Select a language",
    "languageSettings.selectHint": "This setting will affect the language of the entire interface.",
    "languageSettings.saveButton": "Save Language",
    "languageSettings.toastSuccessTitle": "Language Updated!",
    "languageSettings.toastSuccessDescription": "The interface will now be displayed in {langName}.",
    "languageSettings.currentLanguage": "Current Language",
    "languageSettings.currentLanguageText": "The platform is currently set to {langName}.",
    // Settings -> Notifications
    "notificationSettings.title": "Notifications",
    "notificationSettings.description": "Choose how you want to receive notifications.",
    "notificationSettings.emailNotifications": "Email Notifications",
    "notificationSettings.emailConsultationsLabel": "Consultation Results & Reports",
    "notificationSettings.emailConsultationsHint": "Receive an email when your consultations are completed or reports are ready.",
    "notificationSettings.emailPromotionsLabel": "News & Promotions",
    "notificationSettings.emailPromotionsHint": "Receive emails about new features, tips, and special offers.",
    "notificationSettings.pushNotifications": "Push Notifications (Web/Mobile)",
    "notificationSettings.pushAlertsLabel": "Important Account Alerts",
    "notificationSettings.pushAlertsHint": "Receive push notifications for critical activities or security updates.",
    "notificationSettings.smsNotifications": "SMS Notifications",
    "notificationSettings.smsSecurityLabel": "SMS Security Alerts",
    "notificationSettings.smsSecurityHint": "Receive SMS for security verifications and suspicious activities.",
    "notificationSettings.saveButton": "Save Preferences",
    "notificationSettings.toastSuccessTitle": "Preferences Saved!",
    "notificationSettings.toastSuccessDescription": "Your notification settings have been updated.",
    // Settings -> Security
    "securitySettings.title": "Security",
    "securitySettings.description": "Manage your security settings, password, and authentication.",
    "securitySettings.changePasswordTitle": "Change Password",
    "securitySettings.currentPasswordLabel": "Current Password",
    "securitySettings.newPasswordLabel": "New Password",
    "securitySettings.confirmNewPasswordLabel": "Confirm New Password",
    "securitySettings.savePasswordButton": "Save New Password",
    "securitySettings.twoFactorAuthTitle": "Two-Factor Authentication (2FA)",
    "securitySettings.twoFactorAuthEnabledText": "Two-factor authentication is ENABLED for your account.",
    "securitySettings.twoFactorAuthDisabledText": "Two-factor authentication is DISABLED. Enable for enhanced security.",
    "securitySettings.enable2FAButton": "Enable 2FA",
    "securitySettings.disable2FAButton": "Disable 2FA",
    "securitySettings.twoFactorAuthWarning": "Enabling 2FA adds an extra layer of security to your account.",
    "securitySettings.activeSessionsTitle": "Active Sessions",
    "securitySettings.activeSessionsDescription": "View and manage devices currently logged into your account.",
    "securitySettings.noActiveSessions": "No active sessions found other than this one.",
    "securitySettings.revokeAllSessionsButton": "Log Out All Other Sessions",
    "securitySettings.toastErrorTitle": "Error",
    "securitySettings.toastPasswordMismatch": "The new passwords do not match.",
    "securitySettings.toastPasswordLength": "The new password must be at least 8 characters long.",
    "securitySettings.toastPasswordSuccessTitle": "Password Changed!",
    "securitySettings.toastPasswordSuccessDescription": "Your password has been updated successfully.",
    "securitySettings.toast2FATitle": "2FA Authentication",
    "securitySettings.toast2FAEnabled": "2FA enabled successfully.",
    "securitySettings.toast2FADisabled": "2FA disabled.",
    // Settings -> Consultation History
    "consultationHistory.title": "Consultation History",
    "consultationHistory.description": "View all consultations performed and credits used.",
    "consultationHistory.searchPlaceholder": "Search by type or consultation detail...",
    "consultationHistory.statusFilterPlaceholder": "Filter by status",
    "consultationHistory.statusAll": "All Statuses",
    "consultationHistory.statusSuccess": "Success",
    "consultationHistory.statusFailure": "Failure",
    "consultationHistory.exportButton": "Export History",
    "consultationHistory.tableHeaderDate": "Date",
    "consultationHistory.tableHeaderType": "Consultation Type",
    "consultationHistory.tableHeaderQuery": "Query Performed",
    "consultationHistory.tableHeaderCost": "Cost",
    "consultationHistory.tableHeaderStatus": "Status",
    "consultationHistory.credits": "credits",
    "consultationHistory.noResults": "No history found for the applied filters.",
    // Settings -> Billing & Plans
    "billingSettings.title": "Billing & Plans",
    "billingSettings.description": "Manage your plan, payment methods, and billing history.",
    "billingSettings.currentPlanTitle": "Your Current Plan",
    "billingSettings.planNameLabel": "Plan Name",
    "billingSettings.planPriceLabel": "Price",
    "billingSettings.planCreditsLabel": "Credits",
    "billingSettings.nextBillingDateLabel": "Next Billing Date",
    "billingSettings.changePlanButton": "Change Plan",
    "billingSettings.cancelSubscriptionButton": "Cancel Subscription",
    "billingSettings.paymentMethodTitle": "Payment Method",
    "billingSettings.currentMethodLabel": "Primary Card",
    "billingSettings.paymentMethodHint": "Your primary payment method will be used for future charges.",
    "billingSettings.editPaymentButton": "Edit Method",
    "billingSettings.addPaymentButton": "Add New Method",
    "billingSettings.billingHistoryTitle": "Billing History",
    "billingSettings.invoiceIdLabel": "Invoice ID",
    "billingSettings.invoiceDateLabel": "Date",
    "billingSettings.invoiceAmountLabel": "Amount",
    "billingSettings.invoiceStatusLabel": "Status",
    "billingSettings.invoiceActionsLabel": "Actions",
    // Settings -> API Keys
    "apiSettings.title": "API Keys",
    "apiSettings.description": "Manage your API keys to integrate with other services.",
    "apiSettings.generateKeyTitle": "Generate New API Key",
    "apiSettings.keyLabelLabel": "Key Label (E.g., 'My Integration App')",
    "apiSettings.keyLabelPlaceholder": "Enter a label for your key",
    "apiSettings.generateButton": "Generate Key",
    "apiSettings.keyStorageWarning": "Store your API key securely. It will not be shown again.",
    "apiSettings.manageKeysTitle": "Manage Existing Keys",
    "apiSettings.keyLabelHeader": "Label",
    "apiSettings.keyValueHeader": "Key",
    "apiSettings.createdHeader": "Created",
    "apiSettings.lastUsedHeader": "Last Used",
    "apiSettings.actionsHeader": "Actions",
    "apiSettings.noKeysFound": "No API keys found. Generate a new one above.",
    "apiSettings.toastErrorTitle": "Error Generating Key",
    "apiSettings.toastLabelRequired": "Key label is required.",
    "apiSettings.toastKeyGeneratedTitle": "API Key Generated!",
    "apiSettings.toastKeyGeneratedDescription": "Your new key '{label}' has been generated. Copy and store it securely.",
    "apiSettings.toastKeyDeletedTitle": "Key Removed",
    "apiSettings.toastKeyDeletedDescription": "The API key has been successfully removed.",
    "apiSettings.toastKeyCopied": "Key copied to clipboard!",
    // Settings -> Privacy Settings
    "privacySettings.title": "Data Privacy",
    "privacySettings.description": "Manage your privacy preferences and personal data.",
    "privacySettings.dataManagementTitle": "Data Management",
    "privacySettings.saveHistoryLabel": "Save Consultation History",
    "privacySettings.saveHistoryHint": "Allows the platform to store your consultation history for future reference.",
    "privacySettings.allowDataProcessingLabel": "Allow Data Processing for Improvements",
    "privacySettings.allowDataProcessingHint": "Help us improve our services by allowing anonymous processing of usage data.",
    "privacySettings.personalizedAdsLabel": "Personalized Ads",
    "privacySettings.personalizedAdsHint": "Allow us to use your data to show you more relevant ads (we do not sell your data to third parties).",
    "privacySettings.saveChangesButton": "Save Privacy Changes",
    "privacySettings.yourDataTitle": "Your Data",
    "privacySettings.yourDataDescription": "You have the right to access and manage your data.",
    "privacySettings.requestDataButton": "Request My Data",
    "privacySettings.termsLink": "Terms of Service",
    "privacySettings.privacyPolicyLink": "Privacy Policy",
    "privacySettings.deleteAccountTitle": "Delete Account",
    "privacySettings.deleteAccountWarning": "This action is irreversible. All your data, including history and settings, will be permanently deleted.",
    "privacySettings.deleteAccountButton": "Delete My Account Permanently",
    "privacySettings.toastSuccessTitle": "Privacy Preferences Saved!",
    "privacySettings.toastSuccessDescription": "Your privacy settings have been updated.",
    "privacySettings.toastDataRequestInitiated": "Data request initiated. You will receive an email with instructions.",
    "privacySettings.toastAccountDeletionTitle": "Attention: Account Deletion",
    "privacySettings.toastAccountDeletionWarning": "Account deletion is permanent and cannot be undone. Confirm this action if you are sure.",
  },
  "es-ES": {
    greeting: "¡Hola Mundo!",
    // Configuración -> Idioma
    "languageSettings.title": "Idioma y Región",
    "languageSettings.description": "Elija el idioma de visualización de la plataforma y sus preferencias regionales.",
    "languageSettings.selectLabel": "Idioma de la Interfaz",
    "languageSettings.selectPlaceholder": "Seleccione un idioma",
    "languageSettings.selectHint": "Esta configuración afectará el idioma de toda la interfaz.",
    "languageSettings.saveButton": "Guardar Idioma",
    "languageSettings.toastSuccessTitle": "¡Idioma Actualizado!",
    "languageSettings.toastSuccessDescription": "La interfaz ahora se mostrará en {langName}.",
    "languageSettings.currentLanguage": "Idioma Actual",
    "languageSettings.currentLanguageText": "La plataforma está configurada actualmente en {langName}.",
    // Configuración -> Notificaciones
    "notificationSettings.title": "Notificaciones",
    "notificationSettings.description": "Elija cómo desea recibir notificaciones.",
    "notificationSettings.emailNotifications": "Notificaciones por Correo Electrónico",
    "notificationSettings.emailConsultationsLabel": "Resultados de Consultas e Informes",
    "notificationSettings.emailConsultationsHint": "Reciba un correo electrónico cuando se completen sus consultas o los informes estén listos.",
    "notificationSettings.emailPromotionsLabel": "Novedades y Promociones",
    "notificationSettings.emailPromotionsHint": "Reciba correos electrónicos sobre nuevas funciones, consejos y ofertas especiales.",
    "notificationSettings.pushNotifications": "Notificaciones Push (Web/Móvil)",
    "notificationSettings.pushAlertsLabel": "Alertas Importantes de la Cuenta",
    "notificationSettings.pushAlertsHint": "Reciba notificaciones push sobre actividades críticas o actualizaciones de seguridad.",
    "notificationSettings.smsNotifications": "Notificaciones por SMS",
    "notificationSettings.smsSecurityLabel": "Alertas de Seguridad por SMS",
    "notificationSettings.smsSecurityHint": "Reciba SMS para verificaciones de seguridad y actividades sospechosas.",
    "notificationSettings.saveButton": "Guardar Preferencias",
    "notificationSettings.toastSuccessTitle": "¡Preferencias Guardadas!",
    "notificationSettings.toastSuccessDescription": "Su configuración de notificaciones ha sido actualizada.",
     // Configuración -> Seguridad
    "securitySettings.title": "Seguridad",
    "securitySettings.description": "Gestione su configuración de seguridad, contraseña y autenticación.",
    "securitySettings.changePasswordTitle": "Cambiar Contraseña",
    "securitySettings.currentPasswordLabel": "Contraseña Actual",
    "securitySettings.newPasswordLabel": "Nueva Contraseña",
    "securitySettings.confirmNewPasswordLabel": "Confirmar Nueva Contraseña",
    "securitySettings.savePasswordButton": "Guardar Nueva Contraseña",
    "securitySettings.twoFactorAuthTitle": "Autenticación de Dos Factores (2FA)",
    "securitySettings.twoFactorAuthEnabledText": "La autenticación de dos factores está ACTIVADA para su cuenta.",
    "securitySettings.twoFactorAuthDisabledText": "La autenticación de dos factores está DESACTIVADA. Actívela para mayor seguridad.",
    "securitySettings.enable2FAButton": "Activar 2FA",
    "securitySettings.disable2FAButton": "Desactivar 2FA",
    "securitySettings.twoFactorAuthWarning": "Activar la 2FA añade una capa extra de seguridad a su cuenta.",
    "securitySettings.activeSessionsTitle": "Sesiones Activas",
    "securitySettings.activeSessionsDescription": "Vea y gestione los dispositivos actualmente conectados a su cuenta.",
    "securitySettings.noActiveSessions": "No se encontraron sesiones activas aparte de esta.",
    "securitySettings.revokeAllSessionsButton": "Cerrar Todas las Otras Sesiones",
    "securitySettings.toastErrorTitle": "Error",
    "securitySettings.toastPasswordMismatch": "Las nuevas contraseñas no coinciden.",
    "securitySettings.toastPasswordLength": "La nueva contraseña debe tener al menos 8 caracteres.",
    "securitySettings.toastPasswordSuccessTitle": "¡Contraseña Cambiada!",
    "securitySettings.toastPasswordSuccessDescription": "Su contraseña ha sido actualizada con éxito.",
    "securitySettings.toast2FATitle": "Autenticación 2FA",
    "securitySettings.toast2FAEnabled": "2FA activada con éxito.",
    "securitySettings.toast2FADisabled": "2FA desactivada.",
    // Configuración -> Historial de Consultas
    "consultationHistory.title": "Historial de Consultas",
    "consultationHistory.description": "Vea todas las consultas realizadas y los créditos utilizados.",
    "consultationHistory.searchPlaceholder": "Buscar por tipo o detalle de la consulta...",
    "consultationHistory.statusFilterPlaceholder": "Filtrar por estado",
    "consultationHistory.statusAll": "Todos los Estados",
    "consultationHistory.statusSuccess": "Éxito",
    "consultationHistory.statusFailure": "Fallo",
    "consultationHistory.exportButton": "Exportar Historial",
    "consultationHistory.tableHeaderDate": "Fecha",
    "consultationHistory.tableHeaderType": "Tipo de Consulta",
    "consultationHistory.tableHeaderQuery": "Consulta Realizada",
    "consultationHistory.tableHeaderCost": "Costo",
    "consultationHistory.tableHeaderStatus": "Estado",
    "consultationHistory.credits": "créditos",
    "consultationHistory.noResults": "No se encontró historial para los filtros aplicados.",
    // Configuración -> Facturación y Planes
    "billingSettings.title": "Facturación y Planes",
    "billingSettings.description": "Gestione su plan, métodos de pago e historial de facturación.",
    "billingSettings.currentPlanTitle": "Su Plan Actual",
    "billingSettings.planNameLabel": "Nombre del Plan",
    "billingSettings.planPriceLabel": "Precio",
    "billingSettings.planCreditsLabel": "Créditos",
    "billingSettings.nextBillingDateLabel": "Próxima Facturación",
    "billingSettings.changePlanButton": "Cambiar Plan",
    "billingSettings.cancelSubscriptionButton": "Cancelar Suscripción",
    "billingSettings.paymentMethodTitle": "Método de Pago",
    "billingSettings.currentMethodLabel": "Tarjeta Principal",
    "billingSettings.paymentMethodHint": "Su método de pago principal se utilizará para futuros cargos.",
    "billingSettings.editPaymentButton": "Editar Método",
    "billingSettings.addPaymentButton": "Añadir Nuevo Método",
    "billingSettings.billingHistoryTitle": "Historial de Facturación",
    "billingSettings.invoiceIdLabel": "ID de Factura",
    "billingSettings.invoiceDateLabel": "Fecha",
    "billingSettings.invoiceAmountLabel": "Cantidad",
    "billingSettings.invoiceStatusLabel": "Estado",
    "billingSettings.invoiceActionsLabel": "Acciones",
    // Configuración -> Claves de API
    "apiSettings.title": "Claves de API",
    "apiSettings.description": "Gestione sus claves de API para integrar con otros servicios.",
    "apiSettings.generateKeyTitle": "Generar Nueva Clave de API",
    "apiSettings.keyLabelLabel": "Etiqueta de Clave (Ej: 'Mi App de Integración')",
    "apiSettings.keyLabelPlaceholder": "Ingrese una etiqueta para su clave",
    "apiSettings.generateButton": "Generar Clave",
    "apiSettings.keyStorageWarning": "Guarde su clave de API en un lugar seguro. No se mostrará de nuevo.",
    "apiSettings.manageKeysTitle": "Gestionar Claves Existentes",
    "apiSettings.keyLabelHeader": "Etiqueta",
    "apiSettings.keyValueHeader": "Clave",
    "apiSettings.createdHeader": "Creada el",
    "apiSettings.lastUsedHeader": "Último Uso",
    "apiSettings.actionsHeader": "Acciones",
    "apiSettings.noKeysFound": "No se encontraron claves de API. Genere una nueva arriba.",
    "apiSettings.toastErrorTitle": "Error al Generar Clave",
    "apiSettings.toastLabelRequired": "La etiqueta de la clave es obligatoria.",
    "apiSettings.toastKeyGeneratedTitle": "¡Clave de API Generada!",
    "apiSettings.toastKeyGeneratedDescription": "Su nueva clave '{label}' ha sido generada. Cópiela y guárdela en un lugar seguro.",
    "apiSettings.toastKeyDeletedTitle": "Clave Eliminada",
    "apiSettings.toastKeyDeletedDescription": "La clave de API ha sido eliminada con éxito.",
    "apiSettings.toastKeyCopied": "¡Clave copiada al portapapeles!",
    // Configuración -> Privacidad de Datos
    "privacySettings.title": "Privacidad de Datos",
    "privacySettings.description": "Gestione sus preferencias de privacidad y datos personales.",
    "privacySettings.dataManagementTitle": "Gestión de Datos",
    "privacySettings.saveHistoryLabel": "Guardar Historial de Consultas",
    "privacySettings.saveHistoryHint": "Permite que la plataforma almacene su historial de consultas para referencia futura.",
    "privacySettings.allowDataProcessingLabel": "Permitir Procesamiento de Datos para Mejoras",
    "privacySettings.allowDataProcessingHint": "Ayúdenos a mejorar nuestros servicios permitiendo el procesamiento anónimo de datos de uso.",
    "privacySettings.personalizedAdsLabel": "Anuncios Personalizados",
    "privacySettings.personalizedAdsHint": "Permita que utilicemos sus datos para mostrarle anuncios más relevantes (no vendemos sus datos a terceros).",
    "privacySettings.saveChangesButton": "Guardar Cambios de Privacidad",
    "privacySettings.yourDataTitle": "Sus Datos",
    "privacySettings.yourDataDescription": "Tiene derecho a acceder y gestionar sus datos.",
    "privacySettings.requestDataButton": "Solicitar Mis Datos",
    "privacySettings.termsLink": "Términos de Servicio",
    "privacySettings.privacyPolicyLink": "Política de Privacidad",
    "privacySettings.deleteAccountTitle": "Eliminar Cuenta",
    "privacySettings.deleteAccountWarning": "Esta acción es irreversible. Todos sus datos, incluyendo historial y configuraciones, serán eliminados permanentemente.",
    "privacySettings.deleteAccountButton": "Eliminar Mi Cuenta Permanentemente",
    "privacySettings.toastSuccessTitle": "¡Preferencias de Privacidad Guardadas!",
    "privacySettings.toastSuccessDescription": "Su configuración de privacidad ha sido actualizada.",
    "privacySettings.toastDataRequestInitiated": "Solicitud de datos iniciada. Recibirá un correo electrónico con instrucciones.",
    "privacySettings.toastAccountDeletionTitle": "Atención: Eliminación de Cuenta",
    "privacySettings.toastAccountDeletionWarning": "La eliminación de la cuenta es permanente y no se puede deshacer. Confirme esta acción si está seguro.",
  },
};

// Function to get translated string
// It now takes the current language as an argument
export const getTranslatedText = (lang, key, replacements = {}) => {
  let translation = translations[lang]?.[key] || translations["en-US"]?.[key] || key; // Fallback chain

  // Replace placeholders like {name}
  Object.keys(replacements).forEach(placeholder => {
    const regex = new RegExp(`{${placeholder}}`, 'g');
    translation = translation.replace(regex, replacements[placeholder]);
  });

  return translation;
};


export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('datavista-language') || navigator.language || 'en-US';
  });

  useEffect(() => {
    localStorage.setItem('datavista-language', language);
    // You might want to set lang attribute on <html> for CSS selectors
    document.documentElement.lang = language.split('-')[0]; 
  }, [language]);

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    } else {
      console.warn(`Language ${newLanguage} not supported. Falling back to en-US.`);
      setLanguage('en-US'); // Fallback
    }
  };
  
  // Expose a t function that already includes the current language
  const t = (key, replacements = {}) => getTranslatedText(language, key, replacements);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};