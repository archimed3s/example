import { Box, IconButton, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { defineMessages, useIntl } from 'react-intl';

import { PasswordRulesType } from '@common/validators/constants';
import { Input, InputProps } from '@components/Input';
import { ProgressBar } from '@components/ProgressBar/ProgressBar';
import { useToggle } from '@hooks/useToggle';

const messages = defineMessages({
  passwordToggle: {
    id: 'PasswordInput.passwordToggle',
    defaultMessage: 'Toggle password',
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

type PasswordInputProps<Obj extends Record<string, string>> = InputProps & {
  control: Control<Obj>;
  withBar?: boolean;
  passwordRules: PasswordRulesType;
};

export const PasswordInput = <Obj extends Record<string, string>>({
  control,
  withBar = true,
  passwordRules,
  ...props
}: PasswordInputProps<Obj>) => {
  const { name } = props;
  const [togglePassword, setTogglePassword] = useToggle();
  const intl = useIntl();
  const amountPossibleErrors = Object.keys(passwordRules).length;
  const validationColors = ['red', 'yellow', 'nephrite.100'];
  const validationText = useMemo(
    () => [
      intl.formatMessage(messages.progressbarPasswordInsecure),
      intl.formatMessage(messages.progressbarPasswordMiddle),
      intl.formatMessage(messages.progressbarPasswordSecure),
    ],
    [intl],
  );
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => {
        const currentValidationStep = isDirty ? amountPossibleErrors - Object.keys(error?.types || {}).length : 0;
        const validationPosition = Math.floor(currentValidationStep / 2);
        return (
          <Box>
            <Input
              id={name}
              type={togglePassword ? 'text' : 'password'}
              value={value}
              onChange={onChange}
              errorText={error?.message}
              isInvalid={!!error?.message}
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
              {...props}
            />
            {withBar && (
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
            )}
          </Box>
        );
      }}
    />
  );
};
