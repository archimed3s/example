import { Text } from '@chakra-ui/react';

import { PaymentModalPage, usePaymentContext } from '@hooks/usePaymentContext';

import { Layout } from '../components';
import { PaymentPageProps } from './types';

export const NotImplementedProvider = (props: PaymentPageProps) => {
  const {
    actions: { setPage },
  } = usePaymentContext();
  return (
    <Layout title="Error" onClose={props.onClose} onBackClick={() => setPage(PaymentModalPage.AMOUNT_AND_PROVIDER)}>
      <Text textStyle="lg" color="red">
        Working with current provider is not implemented yet
      </Text>
    </Layout>
  );
};
