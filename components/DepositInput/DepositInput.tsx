import { useCallback } from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';

import { Input, InputProps } from '@components/Input';

type DepositInputProps = InputProps & {
  max: number;
};

export const DepositInput = ({ max = 10000000, ...props }: DepositInputProps) => {
  const isAllowed = useCallback(
    (values: NumberFormatValues) => {
      const value = Number(values.value);
      return value <= max;
    },
    [max],
  );

  return (
    <Input
      id="amount"
      as={NumberFormat}
      isAllowed={isAllowed}
      decimalScale={2}
      borderColor="transparent"
      bgColor="transparent"
      allowNegative={false}
      {...props}
    />
  );
};
