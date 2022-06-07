import { Box, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import NRouter, { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { changePlayerPassword } from '@api/auth';
import { useRouteService } from '@common/services/RouteService';
import { PasswordRulesType } from '@common/validators/constants';
import { Button } from '@components/Button/Button';
import { IconButton } from '@components/IconButton/IconButton';
import { Input } from '@components/Input';
import { ProgressBar } from '@components/ProgressBar/ProgressBar';
import { useToast } from '@hooks/useToast';
import { useToggle } from '@hooks/useToggle';
import { ServerError } from '@sharedTypes/ServerError';

import { chakraStyleProps } from './styles';

type FormValues = {
  password: string;
  password2: string;
};

const messages = defineMessages({
  changePasswordTitle: {
    id: 'ChangePasswordForm.title',
    defaultMessage: 'Create a new password',
  },
  newPasswordLabel: {
    id: 'ChangePasswordForm.passwordLabel',
    defaultMessage: 'New password',
  },
  passwordPlaceholder: {
    id: 'ChangePasswordForm.passwordPlaceholder',
    defaultMessage: 'Enter your new password',
  },
  confirmPasswordLabel: {
    id: 'ChangePasswordForm.confirmPasswordLabel',
    defaultMessage: 'Confirm new password',
  },
  password2Placeholder: {
    id: 'ChangePasswordForm.password2Placeholder',
    defaultMessage: 'Repeat your password',
  },
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
  passwordEqualityMsg: {
    id: 'ChangePasswordForm.PasswordEqualityMsg',
    defaultMessage: "The passwords don't match",
  },
  resetPasswordButton: {
    id: 'ChangePasswordForm.resetPasswordButton',
    defaultMessage: 'Change password',
  },
  passwordToggle: {
    id: 'ChangePasswordForm.passwordToggle',
    defaultMessage: 'Toggle password',
  },
  somethingWentWrong: {
    id: 'ChangePasswordForm.somethingWentWrong',
    defaultMessage: 'Something went wrong',
  },
  PlayerPasswordDoesNotMeetRequirements: {
    id: 'ChangePasswordForm.PlayerPasswordDoesNotMeetRequirements',
    defaultMessage: 'Player password does not meet requirements',
  },
  passwordSuccessChanged: {
    id: 'ChangePasswordForm.passwordSuccessChanged',
    defaultMessage: 'Password changed successfully!',
  },
  rulesMessage: {
    id: 'ChangePasswordForm.rulesMessage',
    defaultMessage: '{min} characters and a mix of small and capital letters, numbers and a special symbol.',
  },
  progressbarPasswordInsecure: {
    id: 'ChangePasswordForm.progressbarPasswordInsecure',
    defaultMessage: 'Insecure',
  },
  progressbarPasswordMiddle: {
    id: 'ChangePasswordForm.progressbarPasswordMiddle',
    defaultMessage: 'Middle',
  },
  progressbarPasswordSecure: {
    id: 'ChangePasswordForm.progressbarPasswordSecure',
    defaultMessage: 'Secure',
  },
});

type ChangePasswordFormProps = {
  passwordRules: PasswordRulesType;
};

export const ChangePasswordForm = ({ passwordRules }: ChangePasswordFormProps) => {
  const toast = useToast();
  const [togglePassword, setTogglePassword] = useToggle();
  const [toggleConfirmPassword, setToggleConfirmPassword] = useToggle();
  const intl = useIntl();
  const appRoutes = useRouteService();
  const router = useRouter();
  const { token } = router.query;
  const schema = useMemo(
    () =>
      yup.object().shape({
        password: yup
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
          .required(intl.formatMessage(messages.requiredPassword)),
        password2: yup.string().oneOf([yup.ref('password'), null], intl.formatMessage(messages.passwordEqualityMsg)),
      }),
    [intl, passwordRules],
  );
  const createMessageText = useCallback(
    (code: string) => {
      switch (code) {
        case 'PlayerPasswordDoesNotMeetRequirements': {
          return intl.formatMessage(messages.PlayerPasswordDoesNotMeetRequirements);
        }
        default: {
          return intl.formatMessage(messages.somethingWentWrong);
        }
      }
    },
    [intl],
  );
  const { isLoading, mutate } = useMutation(changePlayerPassword, {
    onSuccess: () => {
      toast.success({
        title: intl.formatMessage(messages.passwordSuccessChanged),
      });
      NRouter.replace(appRoutes.getSignInPagePath());
    },
    onError: (error: ServerError) => {
      toast.error({
        title: createMessageText(error.code),
      });
    },
  });
  const {
    handleSubmit,
    register,
    formState: { isDirty, errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: yupResolver(schema),
  });
  const onSubmit = (values: FormValues) => {
    mutate({ newPassword: values.password, token: String(token) });
  };
  const amountPossibleErrors = Object.keys(passwordRules).length;
  const currentValidationStep = isDirty ? amountPossibleErrors - Object.keys(errors.password?.types || {}).length : 0;
  const validationPosition = Math.floor(currentValidationStep / 2);
  const validationColors = ['red', 'yellow', 'nephrite.100'];
  const validationText = [
    intl.formatMessage(messages.progressbarPasswordInsecure),
    intl.formatMessage(messages.progressbarPasswordMiddle),
    intl.formatMessage(messages.progressbarPasswordSecure),
  ];

  return (
    <Box {...chakraStyleProps.container} data-testid="change-password-form">
      <Text {...chakraStyleProps.title}>{intl.formatMessage(messages.changePasswordTitle)}</Text>
      <Text {...chakraStyleProps.subtitle}>{intl.formatMessage(messages.rulesMessage, passwordRules)}</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box pt={4}>
          <Input
            id="password"
            type={togglePassword ? 'text' : 'password'}
            data-testid="change-password-field"
            label={intl.formatMessage(messages.newPasswordLabel)}
            placeholder={intl.formatMessage(messages.passwordPlaceholder)}
            errorText={errors?.password?.message}
            isInvalid={!!errors?.password?.message}
            errorTextPlacement={'bottom-start'}
            rightElement={
              <IconButton
                colorScheme="gray.80"
                variant="link"
                minWidth="auto"
                px={0}
                onClick={setTogglePassword}
                aria-label={intl.formatMessage(messages.passwordToggle)}
              />
            }
            {...register('password')}
          />
        </Box>
        <Box mt={3}>
          <ProgressBar
            currentStep={currentValidationStep}
            color={validationColors[validationPosition]}
            nSteps={amountPossibleErrors}
          />
          <Text mt={2} textAlign={'right'} color={validationColors[validationPosition]}>
            {validationText[validationPosition]}
          </Text>
        </Box>
        <Box>
          <Input
            label={intl.formatMessage(messages.confirmPasswordLabel)}
            id="password2"
            type={toggleConfirmPassword ? 'text' : 'password'}
            data-testid="change-password-field2"
            placeholder={intl.formatMessage(messages.password2Placeholder)}
            errorText={errors?.password2?.message}
            isInvalid={!!errors?.password2?.message}
            errorTextPlacement={'bottom-start'}
            rightElement={
              <IconButton
                colorScheme="gray.80"
                variant="link"
                minWidth="auto"
                px={0}
                onClick={setToggleConfirmPassword}
                aria-label={intl.formatMessage(messages.passwordToggle)}
              />
            }
            {...register('password2')}
          />
        </Box>
        <Button
          variant="primary"
          mt="8"
          w="100%"
          isLoading={isLoading}
          type="submit"
          data-testid="change-password-submit"
          disabled={!isValid}
        >
          <FormattedMessage {...messages.resetPasswordButton} />
        </Button>
      </form>
    </Box>
  );
};
