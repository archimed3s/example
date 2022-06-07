export type PaymentMethodLimit = {
  paymentProviderId: string;
  limitTypeDisplayName?: string;
  currency: string;
  minAmount: number;
  maxAmount: number;
};

export type SitePaymentCategory = {
  [key: string]: string[];
};

export type SiteSettings = {
  id: string;
  defaultLanguage: string;
  languages: string[];
  kycProviders: number[];
  paymentProvidersForDeposits: string[];
  paymentProvidersForWithdrawals: string[];
  paymentProviderCategory: SitePaymentCategory;
  currencies: string[];
  countries: string[];
  isPhoneVerificationRequired: boolean;
  signupFlowId: string;
  paymentDepositLimits: PaymentMethodLimit[];
  paymentWithdrawalLimits: PaymentMethodLimit[];
};
