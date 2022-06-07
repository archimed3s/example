import { FieldValidator } from 'final-form';
import { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  errorMessage: {
    id: 'Validator.PasswordEquality.message',
    defaultMessage: "Doesn't match to password",
  },
});

type HookParams = { message?: string; passwordFieldName: string };
type ValuesType = { [key: string]: string };

export const useValidatorPasswordEquality = ({ message, passwordFieldName }: HookParams): FieldValidator<string> => {
  const intl = useIntl();

  return useCallback(
    (value, values) => {
      return value === (values as ValuesType)[passwordFieldName]
        ? undefined
        : message || intl.formatMessage(messages.errorMessage);
    },
    [intl, message, passwordFieldName],
  );
};
