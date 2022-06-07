import { CSSObject, Flex, FormControl, FormControlProps, FormErrorMessage } from '@chakra-ui/react';
import { ChangeEvent, useCallback } from 'react';
import { useIntl } from 'react-intl';

import { DepositInput } from '@components/DepositInput';
import { useCurrency } from '@hooks/useCurrency';
import { usePaymentContext } from '@hooks/usePaymentContext';

import { useAmountValidator } from '../utils/useAmountValidator';

type AmountInputProps = FormControlProps & {
  disabled?: boolean;
};

const disabledControlStyle: CSSObject = {
  bgColor: 'gray.-90',
  width: 'calc(100% + 48px)',
  marginX: -6,
  paddingY: 6,
};
const enabledControlStyle: CSSObject = {
  paddingBottom: 3,
};
const inputBorderStyle: CSSObject = {
  borderColor: 'transparent',
  boxShadow: 'none',
};

export const AmountInput = ({ disabled, ...controlProps }: AmountInputProps) => {
  const { formatNumber } = useIntl();
  const {
    state: { amount, currency, limits, paymentProvider },
    actions: { setAmount },
  } = usePaymentContext();
  const { getCurrencySymbol } = useCurrency({ currency });

  const onAmountChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newAmount = event.target.value.replace(getCurrencySymbol(), '');
      setAmount(Number(newAmount));
    },
    [getCurrencySymbol, setAmount],
  );

  const amountValidator = useAmountValidator(limits, currency, paymentProvider);
  const { validationResult, isInvalidAmount } = amountValidator(amount);

  return (
    <FormControl
      isInvalid={isInvalidAmount}
      {...controlProps}
      sx={disabled ? disabledControlStyle : enabledControlStyle}
    >
      <Flex alignItems="center" justifyContent="center" maxWidth="100%">
        <DepositInput
          data-testid="amount-field"
          placeholder={formatNumber(0, { style: 'currency', currency })}
          value={amount}
          prefix={getCurrencySymbol()}
          fixedDecimalScale
          onChange={onAmountChange}
          borderColor="transparent"
          fontSize="l1"
          textAlign="center"
          bgColor="transparent"
          disabled={disabled}
          _disabled={{
            color: 'white',
          }}
          _focus={inputBorderStyle}
          _invalid={inputBorderStyle}
          _hover={inputBorderStyle}
        />
      </Flex>
      <Flex alignItems="center" justifyContent="center" sx={{ '& > div': { marginTop: 0 } }}>
        <FormErrorMessage color="watermelon" h={21}>
          {validationResult}
        </FormErrorMessage>
      </Flex>
    </FormControl>
  );
};
