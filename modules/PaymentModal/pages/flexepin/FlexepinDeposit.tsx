import { isRight } from 'fp-ts/Either';
import * as t from 'io-ts';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';

import { usePaymentContext } from '@hooks/usePaymentContext';
import { VoucherProviderDeposit } from '@modules/PaymentModal/pages/_VoucherProviderDeposit';
import { PaymentPageProps } from '@modules/PaymentModal/pages/types';
import { Payment } from '@sharedTypes/api';
import { ValidateVoucherResponse } from '@sharedTypes/api/payment';
import { stringLength } from '@utils/io-ts';

import { messages } from './translations';

const flexepinData = t.strict({
  pin: stringLength(16),
});

const createError = (message: string) => ({
  values: {},
  errors: {
    pin: {
      type: 'validation',
      message,
    },
  },
});

const useFlexepinValidationResolver = (
  mutate: (req: Payment.ValidateVoucherRequest) => Promise<ValidateVoucherResponse>,
) => {
  const { formatMessage } = useIntl();
  const {
    state: { amount, paymentProvider },
  } = usePaymentContext();
  return useCallback(
    async (data: unknown) => {
      const value = flexepinData.decode(data);
      if (isRight(value)) {
        try {
          const validationResult = await mutate({ provider: paymentProvider, code: value.right.pin });
          if (validationResult.status === '0') {
            if (Number(validationResult.amount) < amount) {
              return createError(formatMessage(messages.wrongAmount, { amount: validationResult.amount }));
            }
            return {
              values: value.right,
              errors: {},
            };
          }
        } catch {
          return createError(formatMessage(messages.wrongVoucher));
        }
      }
      return createError(formatMessage(messages.errorFormat));
    },
    [amount, formatMessage, mutate, paymentProvider],
  );
};

export const FlexepinDeposit = (props: PaymentPageProps) => {
  const { formatMessage } = useIntl();
  return (
    <VoucherProviderDeposit
      onClose={props.onClose}
      inputProps={{
        maxLength: 16,
      }}
      messages={{
        titleDeposit: formatMessage(messages.titleDeposit),
        title: formatMessage(messages.title),
        continue: formatMessage(messages.continue),
        voucherNumber: formatMessage(messages.voucherNumber),
      }}
      validationResolver={useFlexepinValidationResolver}
    />
  );
};
