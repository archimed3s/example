export type PaymentiqConfigApi = {
  id: string;
  merchantId: string;
  siteId: string;
  apiUrl: string;
  apiToken: string;
  successUrl: string;
  failureUrl: string;
};

export type PaymentiqConfigBff = {
  merchantId: string;
  apiUrl: string;
};

export enum PaymentLimitType {
  DepositLimit = 1,
  WithdrawLimit = 2,
}
