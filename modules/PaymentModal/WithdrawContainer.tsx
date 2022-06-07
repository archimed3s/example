import { useToast } from '@chakra-ui/react';
import { FC, useCallback, useEffect } from 'react';
import { useMutation } from 'react-query';

import { withdraw } from '@api/withdraw';
import { PaymentContextState, PaymentModalPage, usePaymentContext } from '@hooks/usePaymentContext';
import { usePlayerState, usePlayerStateActions } from '@hooks/usePlayerState';
import { useSiteSettings } from '@hooks/useSiteSettings';
import { ContainerProps } from '@modules/PaymentModal/types';
import { ServerError } from '@sharedTypes/ServerError';

import { PROVIDER_PAGE, WITHDRAW_PERMISSION, getPage } from './consts';
import { AmountAndProvider, CardWithdraw, Deny, Error, Loading, NotImplementedProvider, Success } from './pages';
import type { PaymentPageProps } from './pages/types';

const PAGES: Record<PaymentModalPage, FC<PaymentPageProps>> = {
  [PaymentModalPage.AMOUNT_AND_PROVIDER]: AmountAndProvider,
  [PaymentModalPage.CREDIT_CARDS]: CardWithdraw,
  [PaymentModalPage.DENY]: Deny,
  [PaymentModalPage.SUCCESS]: Success,
  [PaymentModalPage.ERROR]: Error,
  [PaymentModalPage.LOADING]: Loading,
  [PaymentModalPage.ASTROPAY]: NotImplementedProvider,
  [PaymentModalPage.JETON]: NotImplementedProvider,
  [PaymentModalPage.FLEXEPIN]: NotImplementedProvider,
  [PaymentModalPage.NOT_IMPLEMENTED_PROVIDER]: NotImplementedProvider,
  [PaymentModalPage.BONUS]: NotImplementedProvider,
};

const getNextPage = (state: PaymentContextState) => {
  switch (state.page) {
    case PaymentModalPage.AMOUNT_AND_PROVIDER:
      return PROVIDER_PAGE[state.paymentProvider] ?? PaymentModalPage.NOT_IMPLEMENTED_PROVIDER;
    default:
      return undefined;
  }
};

export const WithdrawContainer = ({ onClose }: ContainerProps) => {
  const toast = useToast();
  const siteSettings = useSiteSettings();
  const { player } = usePlayerState();
  const { refetchBalance } = usePlayerStateActions();
  const {
    state,
    actions: { setLimits, setPage, setState },
  } = usePaymentContext();

  useEffect(() => {
    if (!(!state.page || state.page === PaymentModalPage.LOADING)) {
      return;
    }
    if (!player) {
      setState({ page: PaymentModalPage.LOADING });
    } else {
      const hasPermission = player?.playerPermissions.some((permission) => permission === WITHDRAW_PERMISSION);
      setState({
        page: !hasPermission ? PaymentModalPage.DENY : PaymentModalPage.AMOUNT_AND_PROVIDER,
        currency: player?.currency,
      });
    }
  }, [player, setState, state.page]);

  useEffect(
    () => setLimits(siteSettings?.paymentWithdrawalLimits ?? []),
    [setLimits, siteSettings?.paymentWithdrawalLimits],
  );

  const { mutate } = useMutation(withdraw, {
    onMutate: () => {
      setPage(PaymentModalPage.LOADING);
    },
    onSuccess: () => {
      refetchBalance();
      toast({
        title: 'Operation successful',
        status: 'success',
      });
      setPage(PaymentModalPage.SUCCESS);
    },
    onError: (error: ServerError) => {
      toast({
        title: `Operation failed: ${error.code}: ${error.message}`,
        status: 'error',
      });
      setPage(PaymentModalPage.ERROR);
    },
  });

  const sendWithdrawRequest = useCallback(() => {
    if (!state.card) {
      return;
    }
    mutate({
      paymentProviderId: state.paymentProvider,
      externalCardId: state.card?.externalAccountId,
      amount: String(state.amount),
      currency: state.currency,
    });
  }, [mutate, state.amount, state.card, state.currency, state.paymentProvider]);

  const onSubmit = useCallback(() => {
    const nextPage = getNextPage(state);
    nextPage ? setPage(nextPage) : sendWithdrawRequest();
  }, [sendWithdrawRequest, setPage, state]);

  const Page = getPage(PAGES, state.page);
  return <Page onClose={onClose} onSubmit={onSubmit} providers={siteSettings?.paymentProvidersForWithdrawals ?? []} />;
};
