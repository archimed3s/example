import { Box, Flex, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import { Button } from '@components/Button/Button';
import { Input } from '@components/Input';

import { ResetPasswordSchema } from './consts';
import { chakraStyleProps } from './styles';
import { useResetPasswordMutation } from './utils/useResetPasswordMutation';

type FormValues = {
  email: string;
};

const messages = defineMessages({
  checkEmailResetPassTitle: {
    id: 'CheckEmailResetPassForm.title',
    defaultMessage: 'Check your email',
  },
  checkEmailResetPassSubtitle: {
    id: 'CheckEmailResetPassForm.subtitle',
    defaultMessage:
      'Follow the instructions we sent to {givenEmail}, reset your password and you’ll be playing in no time!',
  },
  emailLabel: {
    id: 'CheckEmailResetPassForm.emailLabel',
    defaultMessage: 'Email',
  },
  emailPlaceholder: {
    id: 'CheckEmailResetPassForm.emailPlaceholder',
    defaultMessage: 'Enter your email',
  },
  checkEmailResetPassNote: {
    id: 'CheckEmailResetPassForm.note',
    defaultMessage: 'Note: it can take a minute or two to arrive',
  },
  checkEmailResetPassButtonLabel: {
    id: 'CheckEmailResetPassForm.checkEmailResetPassButtonLabel',
    defaultMessage: 'Didn’t recieve an email?',
  },
  checkEmailResetPassButton: {
    id: 'CheckEmailResetPassForm.checkEmailResetPassButton',
    defaultMessage: 'Send again',
  },
});

export const CheckEmailResetPassForm = () => {
  const intl = useIntl();
  const router = useRouter();
  const { e } = router.query;
  const { isLoading, mutate } = useResetPasswordMutation();

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
      <Text {...chakraStyleProps.title}>{intl.formatMessage(messages.checkEmailResetPassTitle)}</Text>
      <Text {...chakraStyleProps.subtitle}>
        {intl.formatMessage(messages.checkEmailResetPassSubtitle, {
          givenEmail: (
            <Text color="primary.30" as="span">
              {e}
            </Text>
          ),
        })}
      </Text>
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
        <Flex {...chakraStyleProps.noteContainer}>
          <Text {...chakraStyleProps.noteText}>{intl.formatMessage(messages.checkEmailResetPassNote)}</Text>
        </Flex>

        <Flex flexDirection={'row'} justifyContent={'right'} alignItems={'center'} mt="24px">
          <Text color={'gray.160'} mr={5}>
            {intl.formatMessage(messages.checkEmailResetPassButtonLabel)}
          </Text>
          <Button variant="default" isLoading={isLoading} type="submit" data-testid="reset-password-submit">
            <Text color="white" fontSize={'s'} fontWeight={'600'}>
              <FormattedMessage {...messages.checkEmailResetPassButton} />
            </Text>
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
