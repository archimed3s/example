import { useCallback, useMemo } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { useValidatorMax, useValidatorMin } from '@common/validators';
import { composeValidators } from '@common/validators/composeValidators';
import { useValidatorRequired } from '@common/validators/useValidatorRequired';
import { useCurrency } from '@hooks/useCurrency';
import { PaymentMethodLimit } from '@sharedTypes/api/siteSettings';

const messages = defineMessages({
  minMax: {
    id: 'Deposit.Amount.minMax',
    defaultMessage: 'Amount should be between {min} - {max}',
  },
});
const MIN_WITHDRAW_AMOUNT = 1;
const MAX_WITHDRAW_AMOUNT = Infinity;

export const useAmountValidator = (limits: PaymentMethodLimit[], currency: string, paymentProvider: string) => {
  const { formatMessage } = useIntl();
  const { minAmount, maxAmount } = useMemo(() => {
    const providerLimits = limits.find(
      (limit) => paymentProvider === limit.paymentProviderId && limit.currency === currency,
    );
    return {
      minAmount: providerLimits?.minAmount ?? MIN_WITHDRAW_AMOUNT,
      maxAmount: providerLimits?.maxAmount ?? MAX_WITHDRAW_AMOUNT,
    };
  }, [currency, paymentProvider, limits]);
  const { getCurrencyFormatted } = useCurrency({ currency });
  const required = useValidatorRequired();
  const message = useMemo(
    () =>
      formatMessage(messages.minMax, {
        min: getCurrencyFormatted(minAmount),
        max: getCurrencyFormatted(maxAmount),
      }),
    [formatMessage, getCurrencyFormatted, maxAmount, minAmount],
  );
  const min = useValidatorMin({ min: minAmount, message });
  const max = useValidatorMax({ max: maxAmount, message });

  const amountValidator = useMemo(() => composeValidators(required, min, max), [max, min, required]);

  return useCallback(
    (amount: number) => {
      const validationResult = amountValidator(String(amount), []);
      return {
        validationResult,
        isInvalidAmount: !Number.isNaN(amount) && validationResult,
      };
    },
    [amountValidator],
  );
};
