import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { QUERY_KEYS, fetchPlayerPaymentCards } from '@api/player';
import { PaymentModalPage, usePaymentContext } from '@hooks/usePaymentContext';
import { PaymentIQDepositResponse, PaymentIQDepositResponseUrl } from '@lib/payment-client';
import { isServerError } from '@sharedTypes/ServerError';

import { PaymentIqIFrame } from '../../components/PaymnetIqIFrame';
import { Loading } from '../Loading';
import { PaymentPageProps } from '../types';
import { NewCard } from './NewCard';
import { SavedCards } from './SavedCards';

export const CardDeposit = (props: PaymentPageProps) => {
  const [subPage, setSubPage] = useState<['saved'] | ['new'] | ['3ds', PaymentIQDepositResponseUrl]>();
  const {
    state: { paymentProvider },
    actions: { setPage },
  } = usePaymentContext();

  const { data, error, isLoading } = useQuery([QUERY_KEYS.paymentCards, paymentProvider], () =>
    fetchPlayerPaymentCards(paymentProvider),
  );

  const onBackClick = useCallback(() => setPage(PaymentModalPage.AMOUNT_AND_PROVIDER), [setPage]);
  const addNewCardClick = useCallback(() => setSubPage(['new']), []);
  const onSuccess = useCallback(() => {
    setPage(PaymentModalPage.SUCCESS);
    props.onSubmit?.();
  }, [props, setPage]);
  const onError = useCallback(() => setPage(PaymentModalPage.ERROR), [setPage]);

  const onSubmit = useCallback(
    (response?: PaymentIQDepositResponse) => {
      if (response?.url?.url) {
        setSubPage(['3ds', response.url]);
      } else {
        onSuccess();
      }
    },
    [onSuccess],
  );

  useEffect(() => {
    if (data) {
      if (isServerError(data)) {
        setPage(PaymentModalPage.ERROR);
      } else {
        setSubPage([data?.length ? 'saved' : 'new']);
      }
    }
    if (error) {
      setPage(PaymentModalPage.ERROR);
    }
  }, [data, error, setPage]);

  if (isLoading) {
    return <Loading {...props} />;
  }

  switch (subPage?.[0]) {
    case 'new':
      return <NewCard onClose={props.onClose} onSubmit={onSubmit} onBackClick={onBackClick} onError={onError} />;
    case 'saved':
      return (
        <SavedCards
          providerId={paymentProvider}
          cards={(!isServerError(data) && data) || []}
          onAddNewCard={addNewCardClick}
          onBackClick={onBackClick}
          onClose={props.onClose}
          onSubmit={onSubmit}
        />
      );
    case '3ds':
      return <PaymentIqIFrame paymentIqParams={subPage[1]} onSuccess={onSuccess} onError={onError} />;
    default:
      return null;
  }
};
