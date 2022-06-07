import { Configuration, PaymentiqApi } from '@lib/payment-client';

const configuration = new Configuration({
  basePath: process.env.PAYMENT_BASE_URL,
});

export const paymentiqApi = new PaymentiqApi(configuration);
