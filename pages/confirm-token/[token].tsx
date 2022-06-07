import { Center, Spinner } from '@chakra-ui/react';
import NRouter, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useMutation } from 'react-query';

import { confirmToken } from '@api/auth';
import { useToast } from '@hooks/useToast';

const messages = defineMessages({
  verifyEmailSucceed: {
    id: 'verifyEmail.verifyEmailSucceed',
    defaultMessage: 'Successfully verified email',
  },
  verifyEmailFailed: {
    id: 'verifyEmail.verifyEmailFailed',
    defaultMessage: 'Failed verified email',
  },
});

const ConfirmTokenPage = () => {
  const toast = useToast();
  const router = useRouter();
  const intl = useIntl();

  const { token } = router.query;
  const { mutate, isLoading } = useMutation(confirmToken, {
    onSuccess: () => {
      toast.success({
        title: intl.formatMessage(messages.verifyEmailSucceed),
      });
      NRouter.replace('/signin');
    },
    onError: () => {
      toast.error({
        title: intl.formatMessage(messages.verifyEmailFailed),
      });
      NRouter.replace('/');
    },
  });

  useEffect(() => {
    if (token) {
      mutate(String(token));
    }
  }, [mutate, token]);

  return (
    <Center height="100vh" data-testid="confirm-token-container">
      {isLoading && <Spinner size="xl" color="purple.400" data-testid="confirm-token-spinner" />}
    </Center>
  );
};

export default ConfirmTokenPage;
