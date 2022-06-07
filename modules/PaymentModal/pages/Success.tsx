import { Box, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useMemo } from 'react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import { useCurrency } from '@hooks/useCurrency';
import { usePaymentContext } from '@hooks/usePaymentContext';

import SuccessCheckmark from '../assets/successCheckmark.png';
import { Layout } from '../components';
import { PaymentPageProps } from './types';

const messages = defineMessages({
  titleWithdraw: {
    id: 'PaymentModal.Success.titleWithdraw',
    defaultMessage: 'Withdrawal successful',
  },
  titleDeposit: {
    id: 'PaymentModal.Success.titleDeposit',
    defaultMessage: 'Deposit successful',
  },
  completed: {
    id: 'PaymentModal.Success.completed',
    defaultMessage: 'Complete!',
  },
  balanceWithdraw: {
    id: 'PaymentModal.Success.balanceWithdraw',
    defaultMessage: 'We sent money to you!',
  },
  balanceDeposit: {
    id: 'PaymentModal.Success.balanceDeposit',
    defaultMessage: 'Added to you balance!',
  },
});

export const Success = ({ onClose }: PaymentPageProps) => {
  const { formatMessage, formatNumber } = useIntl();
  const { getCurrencySymbol } = useCurrency();
  const {
    state: { amount, flow },
  } = usePaymentContext();

  const currency = useMemo(() => {
    try {
      return getCurrencySymbol();
    } catch {
      return '';
    }
  }, [getCurrencySymbol]);

  return (
    <Layout
      onClick={onClose}
      onClose={onClose}
      title={formatMessage(flow === 'deposit' ? messages.titleDeposit : messages.titleWithdraw)}
      modalBodyProps={{
        paddingLeft: 0,
        paddingRight: 0,
        justifyContent: Number.isNaN(amount) ? 'center' : 'flex-start',
      }}
    >
      <Stack height="263px" direction="column" width="full" textAlign="center" spacing={0} justifyContent="center">
        <Box>
          <Image src={SuccessCheckmark} width="130px" height="110px" />
        </Box>
        <Text color="green" textStyle="md" style={{ marginTop: '24px' }}>
          <FormattedMessage {...messages.completed} />
        </Text>
      </Stack>
      {!Number.isNaN(amount) && (
        <Stack
          direction="column"
          width="full"
          textAlign="center"
          height="182px"
          justifyContent="center"
          backgroundColor="gray.-100"
        >
          <Text textStyle="lg2" fontWeight="600">
            {currency}
            <Text color="white" as="span" marginLeft=".5rem">
              {formatNumber(amount, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
          </Text>
          <Text textStyle="s2" color="gray.160">
            <FormattedMessage {...(flow === 'deposit' ? messages.balanceDeposit : messages.balanceWithdraw)} />
          </Text>
        </Stack>
      )}
    </Layout>
  );
};
