import { FC } from 'react';

import { PaymentModalPage } from '@hooks/usePaymentContext';
import { PaymentPageProps } from '@modules/PaymentModal/pages/types';

export const isPaymentModalPage = (input: unknown): input is PaymentModalPage =>
  Object.values(PaymentModalPage).includes(input as PaymentModalPage);

export const WITHDRAW_PERMISSION = 'withdraw';

export const DEPOSIT_PERMISSION = 'deposit';

export const PROVIDERS: Record<string, { name: string }> = {
  paymentiq_credit_card_master: { name: 'MasterCard' },
  paymentiq_credit_card_visa: { name: 'Visa' },
  paymentiq_instadebit: { name: 'InstaDebit' },
  paymentiq_interac: { name: 'Interac' },
  paymentiq_echeck: { name: 'echeck' },
  paymentiq_ibebit: { name: 'IDebit' },
  paymentiq_muchbetter: { name: 'MuchBetter' },
  paymentiq_ecopayz: { name: 'ecoPayz' },
  paymentiq_jeton: { name: 'Jeton' },
  paymentiq_astropay: { name: 'AstroPay' },
  paymentiq_neosurf: { name: 'NeoSurf' },
  paymentiq_coinspaid: { name: 'CoinsPaid' },
  paymentiq_flexepin: { name: 'Flexepin' },
};
export const getProviderName = (id: string) => PROVIDERS[id].name ?? '';

export const PROVIDER_PAGE: Record<string, PaymentModalPage> = {
  paymentiq_credit_card_master: PaymentModalPage.CREDIT_CARDS,
  paymentiq_credit_card_visa: PaymentModalPage.CREDIT_CARDS,
  paymentiq_astropay: PaymentModalPage.ASTROPAY,
  paymentiq_jeton: PaymentModalPage.JETON,
  paymentiq_flexepin: PaymentModalPage.FLEXEPIN,
};

export const getPaymentProviderPage = (providerId: string) => {
  return PROVIDER_PAGE[providerId] ?? PaymentModalPage.NOT_IMPLEMENTED_PROVIDER;
};

export const getPage = (map: Record<PaymentModalPage, FC<PaymentPageProps>>, state: string | number) =>
  isPaymentModalPage(state) && map[state] ? map[state] : () => null;
