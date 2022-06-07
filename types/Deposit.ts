export type CardDepositAuthorizedValues = {
  amount: string;
  encCvv: string;
  paymentProviderId: string;
  paymentAccountId?: string;
  bonusId?: number;
};
