import NumberFormat from 'react-number-format';

import { Input, InputProps } from '@components/Input';

type PhoneNumberInputProps = InputProps & {
  id: string;
  countryCode: string;
  name: string;
};

const getNumberFormat = (code: string | undefined): { format: string; placeholder: string } => {
  switch (code?.length) {
    case 2:
      return {
        format: '### ### ###',
        placeholder: '000 000 000',
      };
    case 3:
      return {
        format: '#### ####',
        placeholder: '0000 0000',
      };
    default:
      return {
        format: '### ### ####',
        placeholder: '000 000 0000',
      };
  }
};

export const PhoneNumberInput = ({ id, countryCode, ...field }: PhoneNumberInputProps) => (
  <Input {...field} as={NumberFormat} data-testid={`${id}-field`} {...getNumberFormat(countryCode)} />
);
