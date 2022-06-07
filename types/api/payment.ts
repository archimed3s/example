import * as t from 'io-ts';

import { PaymentIQDepositRequestCryptoCurrencyEnum } from '@lib/payment-client';
import { fromEnum } from '@utils/io-ts';

export const depositRequest = t.intersection([
  t.strict({
    amount: t.string,
    paymentProviderId: t.string,
  }),
  t.partial({
    bonusId: t.union([t.null, t.number]),
    cardHolder: t.union([t.null, t.string]),
    encCreditcardNumber: t.union([t.null, t.string]),
    encCvv: t.union([t.null, t.string]),
    expiryMonth: t.union([t.null, t.string]),
    expiryYear: t.union([t.null, t.string]),
    cryptoCurrency: t.union([
      t.null,
      fromEnum('PaymentIQDepositRequestCryptoCurrencyEnum', PaymentIQDepositRequestCryptoCurrencyEnum),
    ]),
    phoneNumber: t.union([t.null, t.string]),
    voucherNumber: t.union([t.null, t.string]),
  }),
]);
export type DepositRequest = t.TypeOf<typeof depositRequest>;

export const withdrawalRequest = t.strict({
  amount: t.string,
  currency: t.string,
  externalCardId: t.string,
  paymentProviderId: t.string,
});
export type WithdrawalRequest = t.TypeOf<typeof withdrawalRequest>;

export const validateVoucherRequest = t.strict({
  provider: t.string,
  code: t.string,
});
export type ValidateVoucherRequest = t.TypeOf<typeof validateVoucherRequest>;

export type ValidateVoucherResponse = {
  amount: string;
  currencyId: string;
  result: string;
  resultDescription: string;
  status: string;
};
