import { FieldValidator } from 'final-form';
import { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  errorMessage: {
    id: 'Validator.Max.message',
    defaultMessage: `Value is greater than {max}`,
  },
});

type HookParams = { message?: string; max: number };

export const useValidatorMax = ({ message, max }: HookParams): FieldValidator<string> => {
  const intl = useIntl();

  return useCallback(
    (value) => (+value <= max ? undefined : message || intl.formatMessage(messages.errorMessage, { max })),
    [intl, message, max],
  );
};
