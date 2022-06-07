import { Box, Link as ChakraLink, IconButton, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import NRouter from 'next/router';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { loginUser } from '@api/auth';
import { useRouteService } from '@common/services/RouteService';
import { Button } from '@components/Button/Button';
import { Input } from '@components/Input/Input';
import { usePlayerStateActions } from '@hooks/usePlayerState';
import { useRegistration } from '@hooks/useRegistration';
import { useToast } from '@hooks/useToast';
import { useToggle } from '@hooks/useToggle';

import { ServerError } from '../../types/ServerError';

type FormValues = {
  email: string;
  password: string;
};

const messages = defineMessages({
  logIn: {
    id: 'LoginForm.logIn',
    defaultMessage: 'Log in',
  },
  dontHaveAccount: {
    id: 'LoginForm.dontHaveAccount',
    defaultMessage: `Don't have an account?`,
  },
  loginButton: {
    id: 'LoginForm.loginButton',
    defaultMessage: 'Continue',
  },
  registerNow: {
    id: 'LoginForm.registerNow',
    defaultMessage: 'Register now',
  },
  emailLabel: {
    id: 'LoginForm.emailLabel',
    defaultMessage: 'Email',
  },
  emailPlaceholder: {
    id: 'LoginForm.emailPlaceholder',
    defaultMessage: 'Enter your email',
  },
  passwordLabel: {
    id: 'LoginForm.passwordLabel',
    defaultMessage: 'Password',
  },
  passwordToggle: {
    id: 'LoginForm.passwordToggle',
    defaultMessage: 'Toggle password',
  },
  passwordPlaceholder: {
    id: 'LoginForm.passwordPlaceholder',
    defaultMessage: 'Enter your password',
  },
  wrongEmailOrPassword: {
    id: 'LoginForm.wrongEmailOrPassword',
    defaultMessage: 'Email or password is incorrect',
  },
  backToHome: {
    id: 'LoginForm.backToHome',
    defaultMessage: 'Back to Home page',
  },
  createNewAccount: {
    id: 'LoginForm.createNewAccount',
    defaultMessage: 'CREATE NEW ACCOUNT',
  },
  forgotPasswordLink: {
    id: 'LoginForm.forgotPasswordLink',
    defaultMessage: 'Forgot password?',
  },
  PlayerLoginAttemptsLimitReached: {
    id: 'LoginForm.PlayerLoginAttemptsLimitReached',
    defaultMessage: 'Player login attempts max limit reached',
  },
  ApiRequestError: {
    id: 'LoginForm.ApiRequestError',
    defaultMessage: 'Api request error',
  },
  validEmail: {
    id: 'LoginForm.validEmail',
    defaultMessage: 'Email must be a valid email',
  },
  requiredEmail: {
    id: 'LoginForm.requiredEmail',
    defaultMessage: 'Email is required field',
  },
  requiredPassword: {
    id: 'LoginForm.requiredPassword',
    defaultMessage: 'Password is required field',
  },
  minCharPassword: {
    id: 'LoginForm.minCharPassword',
    defaultMessage: 'Password must be at least {number} characters',
  },
  successLoggedIn: {
    id: 'LoginForm.successLoggedIn',
    defaultMessage: 'You successfully logged in',
  },
});

const getErrorMessage = (code: string) => {
  switch (code) {
    case 'PlayerLoginAttemptsLimitReached': {
      return messages.PlayerLoginAttemptsLimitReached;
    }
    case 'ApiRequestError': {
      return messages.ApiRequestError;
    }
    default: {
      return messages.wrongEmailOrPassword;
    }
  }
};

export const LoginPage = () => {
  const [togglePassword, setTogglePassword] = useToggle();
  const toast = useToast();
  const { setPlayer, resetPlayer } = usePlayerStateActions();
  const { formatMessage } = useIntl();
  const appRoutes = useRouteService();
  const { onOpen } = useRegistration();
  const schema = useMemo(
    () =>
      yup.object().shape({
        email: yup.string().email(formatMessage(messages.validEmail)).required(formatMessage(messages.requiredEmail)),
        password: yup
          .string()
          .min(6, formatMessage(messages.minCharPassword, { number: 6 }))
          .required(formatMessage(messages.requiredPassword)),
      }),
    [formatMessage],
  );

  const { isLoading, mutate } = useMutation(loginUser, {
    onSuccess: (data) => {
      setPlayer(data);
      toast.success({ title: formatMessage(messages.successLoggedIn) });
      NRouter.replace(appRoutes.getHomePagePath());
    },
    onError: (error: ServerError) => {
      resetPlayer();
      toast.error({
        title: formatMessage(getErrorMessage(error.code)),
      });
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    mutate({ email: values.email, password: values.password });
  };

  return (
    <Box>
      <Text color="white" fontSize="m3" fontWeight="600">
        <FormattedMessage {...messages.logIn} />
      </Text>
      <Text color="gray.120" pt={2}>
        <FormattedMessage {...messages.dontHaveAccount} />{' '}
        <ChakraLink onClick={onOpen}>
          <Text color="primary.30" as="span">
            <FormattedMessage {...messages.registerNow} />
          </Text>
        </ChakraLink>
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box pt={6}>
          <Input
            id="email"
            label={formatMessage(messages.emailLabel)}
            data-testid="login-email"
            placeholder={formatMessage(messages.emailPlaceholder)}
            isInvalid={!!errors?.email?.message}
            errorText={errors?.email?.message}
            {...register('email')}
          />
        </Box>
        <Box pt={4}>
          <Input
            id="password"
            type={togglePassword ? 'text' : 'password'}
            data-testid="login-password"
            label={
              <Box display="flex" justifyContent="space-between" mr={0}>
                <Text color="white" fontSize="s" fontWeight="600">
                  <FormattedMessage {...messages.passwordLabel} />
                </Text>
                <Text color="primary.30" fontSize="s1">
                  <Link href={appRoutes.getResetPasswordPagePath()}>
                    <a>
                      <FormattedMessage {...messages.forgotPasswordLink} />
                    </a>
                  </Link>
                </Text>
              </Box>
            }
            placeholder={formatMessage(messages.passwordPlaceholder)}
            errorText={errors?.password?.message}
            isInvalid={!!errors?.password?.message}
            rightElement={
              <IconButton
                colorScheme="gray.80"
                variant="link"
                minWidth="auto"
                px={0}
                onClick={setTogglePassword}
                aria-label={formatMessage(messages.passwordToggle)}
              />
            }
            {...register('password')}
          />
        </Box>
        <Button
          variant="primary"
          mt="8"
          isFullWidth
          textAlign="center"
          alignItems="center"
          isLoading={isLoading}
          type="submit"
          data-testid="login-submit"
        >
          {formatMessage(messages.loginButton)}
        </Button>
      </form>
      <Box mt={6}>
        <Link href={appRoutes.getHomePagePath()} passHref>
          <Button variant="link">{formatMessage(messages.backToHome)}</Button>
        </Link>
      </Box>
    </Box>
  );
};
