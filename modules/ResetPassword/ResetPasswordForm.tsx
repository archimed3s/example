import { Box, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import { useRouteService } from '@common/services/RouteService';
import { Button } from '@components/Button/Button';
import { Input } from '@components/Input';

import { ResetPasswordSchema } from './consts';
import { chakraStyleProps } from './styles';
import { useResetPasswordMutation } from './utils/useResetPasswordMutation';

type FormValues = {
  email: string;
};

const messages = defineMessages({
  resetPasswordTitle: {
    id: 'ResetPasswordForm.title',
    defaultMessage: 'Forgot password?',
  },
  resetPasswordSubtitle: {
    id: 'ResetPasswordForm.subtitle',
    defaultMessage: 'No problems! You will receive an email with instructions to reset one.',
  },
  emailLabel: {
    id: 'ResetPasswordForm.emailLabel',
    defaultMessage: 'Email',
  },
  emailPlaceholder: {
    id: 'ResetPasswordForm.emailPlaceholder',
    defaultMessage: 'Enter your email',
  },
  resetPasswordButton: {
    id: 'ResetPasswordForm.resetPasswordButton',
    defaultMessage: 'Reset password',
  },
});

export const ResetPasswordForm = () => {
  const intl = useIntl();
  const appRoutes = useRouteService();
  const { isLoading, mutate } = useResetPasswordMutation(appRoutes.getCheckEmailResetPassPagePath());

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(ResetPasswordSchema),
  });

  const onSubmit = (values: FormValues) => {
    mutate({ email: values.email });
  };

  return (
    <Box {...chakraStyleProps.container} data-testid="reset-password-form">
      <Text {...chakraStyleProps.title}>{intl.formatMessage(messages.resetPasswordTitle)}</Text>
      <Text {...chakraStyleProps.subtitle}>{intl.formatMessage(messages.resetPasswordSubtitle)}</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box pt={4}>
          <Input
            id="email"
            label={intl.formatMessage(messages.emailLabel)}
            data-testid="reset-password-email"
            placeholder={intl.formatMessage(messages.emailPlaceholder)}
            isInvalid={!!errors?.email?.message}
            errorText={errors?.email?.message}
            {...register('email')}
          />
        </Box>

        <Button
          variant="primary"
          mt="8"
          w="100%"
          textAlign="center"
          alignItems="center"
          isLoading={isLoading}
          type="submit"
          data-testid="reset-password-submit"
        >
          <FormattedMessage {...messages.resetPasswordButton} />
        </Button>
      </form>
    </Box>
  );
};
