import { FieldValidator } from 'final-form';
import { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { PasswordRulesType } from '@common/validators/constants';

const messages = defineMessages({
  rulesMessage: {
    id: 'Validator.PasswordRules.message',
    defaultMessage: `Doesn't match password rules`,
  },
});

type HookParams = { message?: string; passwordRules: PasswordRulesType };

export const useValidatorPasswordRules = ({
  message,
  passwordRules: { min, max, numbers, upper },
}: HookParams): FieldValidator<string> => {
  const intl = useIntl();
  const rulesMessage = intl.formatMessage(messages.rulesMessage);

  return useCallback(
    (value) => {
      if (
        value.length < min ||
        value.length > max ||
        value.replace(/([^1-9]*)/g, '').length < numbers ||
        value.replace(/([^A-Z]*)/g, '').length < upper
      ) {
        return message || rulesMessage;
      }

      return undefined;
    },
    [max, min, numbers, upper, message, rulesMessage],
  );
};
