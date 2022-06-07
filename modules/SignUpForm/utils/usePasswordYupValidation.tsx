import { defineMessages, useIntl } from 'react-intl';
import * as yup from 'yup';

import { PasswordRulesType } from '@common/validators/constants';

const messages = defineMessages({
  requiredPassword: {
    id: 'ChangePasswordForm.requiredPassword',
    defaultMessage: 'Password is a required field',
  },
  minCharPassword: {
    id: 'ChangePasswordForm.minCharPassword',
    defaultMessage: 'Password must be at least {number} characters',
  },
  maxCharPassword: {
    id: 'ChangePasswordForm.maxCharPassword',
    defaultMessage: 'Password must have maximum {number} characters',
  },
  nNumbersPassword: {
    id: 'ChangePasswordForm.nNumbersPassword',
    defaultMessage: 'Password must have at least {number} numbers',
  },
  nUpperCharsPassword: {
    id: 'ChangePasswordForm.nUpperCharsPassword',
    defaultMessage: 'Password must have at least {number} uppercase letters',
  },
});

export const usePasswordYupValidation = (passwordRules: PasswordRulesType) => {
  const intl = useIntl();
  return yup
    .string()
    .min(passwordRules.min, intl.formatMessage(messages.minCharPassword, { number: passwordRules.min }))
    .max(passwordRules.max, intl.formatMessage(messages.maxCharPassword, { number: passwordRules.max }))
    .test(
      'has-n-numbers',
      intl.formatMessage(messages.nNumbersPassword, { number: passwordRules.numbers }),
      (value) => String(value).replace(/([^1-9]*)/g, '').length >= passwordRules.numbers,
    )
    .test(
      'has-n-uppers',
      intl.formatMessage(messages.nUpperCharsPassword, { number: passwordRules.upper }),
      (value) => String(value).replace(/([^A-Z]*)/g, '').length >= passwordRules.upper,
    )
    .required(intl.formatMessage(messages.requiredPassword));
};
