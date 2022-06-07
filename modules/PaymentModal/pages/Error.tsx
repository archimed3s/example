import { Box, Center, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import { usePaymentContext } from '@hooks/usePaymentContext';

import ErrorCross from '../assets/errorCross.png';
import { Layout } from '../components/Layout';
import type { PaymentPageProps } from './types';

const messages = defineMessages({
  titleWithdraw: {
    id: 'PaymentModal.Error.titleWithdraw',
    defaultMessage: 'Withdrawal declined',
  },
  titleDeposit: {
    id: 'PaymentModal.Error.titleDeposit',
    defaultMessage: 'Deposit declined',
  },
  declined: {
    id: 'PaymentModal.Error.declined',
    defaultMessage: 'Declined!',
  },
  tryAgain: {
    id: 'PaymentModal.Error.tryAgain',
    defaultMessage: 'Please try again.',
  },
});

export const Error = ({ onClose }: PaymentPageProps) => {
  const { formatMessage } = useIntl();
  const {
    state: { flow },
  } = usePaymentContext();
  return (
    <Layout
      onClick={onClose}
      onClose={onClose}
      title={formatMessage(flow === 'deposit' ? messages.titleDeposit : messages.titleWithdraw)}
      modalBodyProps={{
        paddingLeft: 0,
        paddingRight: 0,
        justifyContent: 'flex-start',
      }}
    >
      <Stack height="242px" direction="column" width="full" textAlign="center" spacing={0} justifyContent="center">
        <Box>
          <Image src={ErrorCross} width="150px" height="100px" />
        </Box>
        <Text textStyle="md" color="watermelon" style={{ marginTop: '16px' }}>
          <FormattedMessage {...messages.declined} />
        </Text>
      </Stack>
      <Center width="full" height="94px" backgroundColor="gray.-100">
        <Text textStyle="s2" color="gray.160">
          <FormattedMessage {...messages.tryAgain} />
        </Text>
      </Center>
    </Layout>
  );
};
