import { FieldValidator } from 'final-form';
import { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  errorMessage: {
    id: 'Validator.Required.message',
    defaultMessage: 'Value is required',
  },
});

type HookParams = { message?: string };

export const useValidatorRequired = ({ message }: HookParams = {}): FieldValidator<string> => {
  const intl = useIntl();

  return useCallback(
    (value) => (value ? undefined : message || intl.formatMessage(messages.errorMessage)),
    [intl, message],
  );
};
