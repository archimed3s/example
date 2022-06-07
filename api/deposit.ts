import { routeService } from '@common/services/RouteService';
import { PaymentIQDepositResponse } from '@lib/payment-client';
import { CardDepositAuthorizedValues } from '@sharedTypes/Deposit';
import { PaymentiqConfigBff } from '@sharedTypes/Payment';
import { Payment } from '@sharedTypes/api';
import { ValidateVoucherResponse } from '@sharedTypes/api/payment';
import { get, post } from '@utils/fetcher';

export const QUERY_KEYS = {
  paymentiqConfig: 'paymentiqConfig',
};

export const fetchPaymentiqConfig = () => get<PaymentiqConfigBff>(routeService().api.deposit.getPaymentiqConfig());

export const postPaymentiqDepositRequest = (reqValues: Payment.DepositRequest) =>
  post<PaymentIQDepositResponse>(routeService().api.deposit.getPaymentIQDeposit(), reqValues);

export const postPaymentiqDepositRequestAuthorized = (reqValues: CardDepositAuthorizedValues) =>
  post<PaymentIQDepositResponse>(routeService().api.deposit.getPaymentiqDepositAuthorized(), reqValues);

export const postValidateVoucher = (req: Payment.ValidateVoucherRequest) =>
  post<ValidateVoucherResponse>(routeService().api.deposit.getValidateVoucher(), req);
