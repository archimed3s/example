import { FormattedMessage, defineMessages } from 'react-intl';

import { Layout, LoadingMessage } from '../components';
import type { PaymentPageProps } from './types';

const messages = defineMessages({
  title: {
    id: 'PaymentModal.Loading.title',
    defaultMessage: 'Please Wait...',
  },
});

export const Loading = ({ onClose }: PaymentPageProps) => (
  <Layout onClose={onClose} title={<FormattedMessage {...messages.title} />}>
    <LoadingMessage />
  </Layout>
);
