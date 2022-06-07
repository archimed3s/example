import { Text } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from 'react-query';

import { QUERY_KEYS, fetchPlayerPaymentCards } from '@api/player';
import { PaymentModalPage, usePaymentContext } from '@hooks/usePaymentContext';
import { isServerError } from '@sharedTypes/ServerError';

import { Layout } from '../../components';
import { Loading } from '../Loading';
import { PaymentPageProps } from '../types';
import { SavedCards } from './SavedCards';
import { messages } from './translations';

export const CardWithdraw = (props: PaymentPageProps) => {
  const { formatMessage } = useIntl();
  const {
    state: { paymentProvider },
    actions: { setPage },
  } = usePaymentContext();
  const onBackClick = useCallback(() => setPage(PaymentModalPage.AMOUNT_AND_PROVIDER), [setPage]);
  const [subPage, setSubPage] = useState<'saved' | 'new'>('new');
  const onAddNewCard = useCallback(() => setSubPage('new'), []);

  const { data, isLoading } = useQuery([QUERY_KEYS.paymentCards, paymentProvider], () =>
    fetchPlayerPaymentCards(paymentProvider),
  );

  useEffect(() => {
    if (!isServerError(data)) {
      setSubPage(data?.length ? 'saved' : 'new');
    } else {
      setPage(PaymentModalPage.ERROR);
    }
  }, [data, setPage]);

  if (isLoading) {
    return <Loading {...props} />;
  }
  if (subPage === 'saved' && !isServerError(data)) {
    return (
      <SavedCards
        cards={data ?? []}
        providerId={paymentProvider}
        onAddNewCard={onAddNewCard}
        onSubmit={props.onSubmit}
        onClose={props.onClose}
        onBackClick={onBackClick}
      />
    );
  }
  if (subPage === 'saved' && !isServerError(data)) {
    return <Text>TODO Check deposit need before withdraw</Text>;
  }
  return (
    <Layout title={formatMessage(messages.title)} onClose={props.onClose} onBackClick={onBackClick}>
      <Text>
        <FormattedMessage {...messages.cardWithdrawError} />
      </Text>
    </Layout>
  );
};
