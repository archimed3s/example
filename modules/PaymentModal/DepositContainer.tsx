import { FC, useCallback, useEffect } from 'react';

import { PaymentContextState, PaymentModalPage, usePaymentContext } from '@hooks/usePaymentContext';
import { usePlayerState, usePlayerStateActions } from '@hooks/usePlayerState';
import { useSiteSettings } from '@hooks/useSiteSettings';

import { DEPOSIT_PERMISSION, PROVIDER_PAGE, getPage } from './consts';
import {
  AmountAndProvider,
  AstroPayDeposit,
  CardDeposit,
  Deny,
  Error,
  FlexepinDeposit,
  JetonDeposit,
  Loading,
  NotImplementedProvider,
  SelectBonus,
  Success,
} from './pages';
import type { PaymentPageProps } from './pages/types';
import { ContainerProps } from './types';
import { usePaymentIqScript } from './utils/usePaymentIqScript';

const PAGES: Record<PaymentModalPage, FC<PaymentPageProps>> = {
  [PaymentModalPage.AMOUNT_AND_PROVIDER]: AmountAndProvider,
  [PaymentModalPage.CREDIT_CARDS]: CardDeposit,
  [PaymentModalPage.DENY]: Deny,
  [PaymentModalPage.SUCCESS]: Success,
  [PaymentModalPage.ERROR]: Error,
  [PaymentModalPage.LOADING]: Loading,
  [PaymentModalPage.ASTROPAY]: AstroPayDeposit,
  [PaymentModalPage.JETON]: JetonDeposit,
  [PaymentModalPage.FLEXEPIN]: FlexepinDeposit,
  [PaymentModalPage.BONUS]: SelectBonus,
  [PaymentModalPage.NOT_IMPLEMENTED_PROVIDER]: NotImplementedProvider,
};

const getNextPage = (state: PaymentContextState) => {
  switch (state.page) {
    case PaymentModalPage.BONUS:
      return PaymentModalPage.AMOUNT_AND_PROVIDER;
    case PaymentModalPage.AMOUNT_AND_PROVIDER:
      return PROVIDER_PAGE[state.paymentProvider] ?? PaymentModalPage.NOT_IMPLEMENTED_PROVIDER;
    default:
      return undefined;
  }
};

export const DepositContainer = ({ onClose }: ContainerProps) => {
  const siteSettings = useSiteSettings();
  const { player } = usePlayerState();
  const { refetchBalance } = usePlayerStateActions();
  const {
    state,
    actions: { setLimits, setPage, setState },
  } = usePaymentContext();
  const { PaymentIqScript } = usePaymentIqScript();

  useEffect(() => {
    if (!(!state.page || state.page === PaymentModalPage.LOADING)) {
      return;
    }
    if (!player) {
      return setState({ page: PaymentModalPage.LOADING });
    }
    const hasPermission = player?.playerPermissions.some((permission) => permission === DEPOSIT_PERMISSION);
    return setState({
      page: !hasPermission ? PaymentModalPage.DENY : PaymentModalPage.BONUS,
      currency: player?.currency,
    });
  }, [player, setState, state.page]);

  useEffect(() => setLimits(siteSettings?.paymentDepositLimits ?? []), [setLimits, siteSettings?.paymentDepositLimits]);

  const onSubmit = useCallback(() => {
    const nextPage = getNextPage(state);
    nextPage !== undefined ? setPage(nextPage) : refetchBalance();
  }, [refetchBalance, setPage, state]);

  const Page = getPage(PAGES, state.page);
  return (
    <>
      <PaymentIqScript />
      <Page onClose={onClose} onSubmit={onSubmit} providers={siteSettings?.paymentProvidersForDeposits ?? []} />
    </>
  );
};
