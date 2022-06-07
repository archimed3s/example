import { Text } from '@chakra-ui/react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import { Layout } from '../components';
import type { PaymentPageProps } from './types';

const messages = defineMessages({
  title: {
    id: 'Withdrawal.Deny.title',
    defaultMessage: 'Withdrawal Restriction',
  },
  denied: {
    id: 'Withdrawal.Deny.deny',
    defaultMessage: 'Withdrawal Restriction',
  },
  deniedDescription: {
    id: 'Withdrawal.Deny.deniedDescription',
    defaultMessage: 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
});

export const Deny = ({ onClose }: PaymentPageProps) => {
  const { formatMessage } = useIntl();
  return (
    <Layout onClick={onClose} title={formatMessage(messages.title)} onClose={onClose}>
      {/* TODO Icon */}
      <Text textStyle="md2" fontWeight="bold">
        <FormattedMessage {...messages.denied} />
      </Text>
      <Text paddingX="100px" textAlign="center" marginTop="14px" color="gray.100">
        <FormattedMessage {...messages.deniedDescription} />
      </Text>
    </Layout>
  );
};
