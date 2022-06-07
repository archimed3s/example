import NRouter from 'next/router';
import { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useMutation } from 'react-query';

import { resetUserPassword } from '@api/auth';
import { useToast } from '@hooks/useToast';
import { ServerError } from '@sharedTypes/ServerError';
import { Auth } from '@sharedTypes/api';

const messages = defineMessages({
  somethingWentWrong: {
    id: 'CheckEmailResetPassForm.somethingWentWrong',
    defaultMessage: 'Something went wrong',
  },
  PlayerNotFound: {
    id: 'CheckEmailResetPassForm.PlayerNotFound',
    defaultMessage: 'Player not found',
  },
  SuccessSendEmail: {
    id: 'CheckEmailResetPassForm.SuccessSendEmail',
    defaultMessage: 'The email was sent successfully!',
  },
});

export const useResetPasswordMutation = (route?: string) => {
  const toast = useToast();
  const intl = useIntl();

  const createMessageText = useCallback(
    (code: string) => {
      switch (code) {
        case 'PlayerNotFound': {
          return intl.formatMessage(messages.PlayerNotFound);
        }
        default: {
          return intl.formatMessage(messages.somethingWentWrong);
        }
      }
    },
    [intl],
  );
  return useMutation(resetUserPassword, {
    onSuccess: (response: Auth.ResetPasswordResponse) => {
      toast.success({
        title: intl.formatMessage(messages.SuccessSendEmail),
      });
      if (route) NRouter.replace({ pathname: route, query: { e: response.email } });
    },
    onError: (error: ServerError) => {
      toast.error({
        title: createMessageText(error.code),
      });
    },
  });
};
