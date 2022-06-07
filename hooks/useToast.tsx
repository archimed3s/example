import { RenderProps, useToast as useToastChakra } from '@chakra-ui/react';
import type { UseToastOptions } from '@chakra-ui/react';
import { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { Toast } from '@components/Toast/Toast';

type UseToastProps = { title: string; options?: UseToastOptions };

const messages = defineMessages({
  close: {
    id: 'Toast.close',
    defaultMessage: 'Close',
  },
});

export const useToast = () => {
  const toast = useToastChakra();
  const intl = useIntl();

  const success = useCallback(
    ({ title, options }: UseToastProps) =>
      toast({
        title,
        status: 'success',
        render: ({ id }: RenderProps) => (
          <Toast
            title={title}
            id={id as string}
            onClose={() => {
              toast.close(id);
            }}
            closeText={intl.formatMessage(messages.close)}
            type="success"
          />
        ),
        ...options,
      }),
    [toast, intl],
  );
  const error = useCallback(
    ({ title, options }: UseToastProps) =>
      toast({
        title,
        status: 'error',
        isClosable: true,
        duration: 3000,
        render: ({ id }: RenderProps) => (
          <Toast
            title={title}
            id={id as string}
            onClose={() => {
              toast.close(id);
            }}
            closeText={intl.formatMessage(messages.close)}
            type="error"
          />
        ),
        ...options,
      }),
    [toast, intl],
  );

  return { success, error };
};
