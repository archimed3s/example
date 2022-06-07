export type PaymentMethod = {
  name: string;
};

export const PAYMENT_METHODS: Map<string, PaymentMethod> = new Map([
  ['paymentiq_credit_card_master', { name: 'Master Card' }],
  ['paymentiq_credit_card_visa', { name: 'Visa' }],
  ['paymentiq_instadebit', { name: 'InstaDebit' }],
  ['paymentiq_interac', { name: 'Interac' }],
  ['paymentiq_echeck', { name: 'echeck' }],
  ['paymentiq_ibebit', { name: 'IDebit' }],
  ['paymentiq_muchbetter', { name: 'MuchBetter' }],
  ['paymentiq_ecopayz', { name: 'ecoPayz' }],
  ['paymentiq_jeton', { name: 'Jeton' }],
  ['paymentiq_astropay', { name: 'AstroPay' }],
  ['paymentiq_neosurf', { name: 'NeoSurf' }],
  ['paymentiq_coinspaid', { name: 'CoinsPaid' }],
  ['paymentiq_flexepin', { name: 'Flexepin' }],
]);
