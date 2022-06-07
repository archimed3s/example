import { FieldValidator } from 'final-form';
import { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  errorMessage: {
    id: 'Validator.Min.message',
    defaultMessage: `Value is lesser than {min}`,
  },
});

type HookParams = { message?: string; min: number };

export const useValidatorMin = ({ message, min }: HookParams): FieldValidator<string> => {
  const intl = useIntl();

  return useCallback(
    (value) => (+value >= min ? undefined : message || intl.formatMessage(messages.errorMessage, { min })),
    [intl, message, min],
  );
};
