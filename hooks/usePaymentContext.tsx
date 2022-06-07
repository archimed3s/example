import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

import { PlayerPaymentCard } from '@sharedTypes/api/player';
import { PaymentMethodLimit } from '@sharedTypes/api/siteSettings';
import noop from '@utils/noop';

export type PaymentFlow = 'deposit' | 'withdraw';

export enum PaymentModalPage {
  AMOUNT_AND_PROVIDER = 1,
  CREDIT_CARDS,
  DENY,
  SUCCESS,
  ERROR,
  LOADING,
  NOT_IMPLEMENTED_PROVIDER,
  ASTROPAY,
  JETON,
  FLEXEPIN,
  BONUS,
}

export type PaymentContextState = {
  flow: PaymentFlow | null;
  isOpen: boolean;
  page: string | number;
  amount: number;
  currency: string;
  paymentProvider: string;
  card: PlayerPaymentCard | undefined;
  limits: PaymentMethodLimit[];
  bonusId: number | undefined;
};

type PaymentProviderActions = {
  setState: (update: Partial<PaymentContextState>) => void;
  setProvider: (provider: string) => void;
  setPage: (page: string | number) => void;
  setCard: (card: PlayerPaymentCard | undefined) => void;
  setAmount: (value: number) => void;
  setLimits: (limits: PaymentMethodLimit[]) => void;
  setBonusId: (bonusId: number | undefined) => void;
};

type PaymentContextProvider = {
  state: PaymentContextState;
  actions: PaymentProviderActions;
};

const defaultContext: PaymentContextProvider = {
  state: {
    flow: null,
    isOpen: false,
    page: '',
    amount: Number.NaN,
    currency: '',
    paymentProvider: '',
    card: undefined,
    limits: [],
    bonusId: undefined,
  },
  actions: {
    setState: noop,
    setProvider: noop,
    setPage: noop,
    setCard: noop,
    setAmount: noop,
    setLimits: noop,
    setBonusId: noop,
  },
};

const PaymentContext = createContext<PaymentContextProvider>(defaultContext);

export const PaymentContextProvider = ({ children }: PropsWithChildren<Record<string, unknown>>) => {
  const [state, setState] = useState<PaymentContextState>(defaultContext.state);

  const actions = useMemo<PaymentProviderActions>(() => {
    const createUpdateState =
      <P extends keyof PaymentContextState>(property: P) =>
      (value: PaymentContextState[P]) => {
        setState((prev) => ({
          ...prev,
          [property]: value,
        }));
      };
    return {
      setState: (stateUpdate) => setState((prev) => ({ ...prev, ...stateUpdate })),
      setProvider: createUpdateState('paymentProvider'),
      setPage: createUpdateState('page'),
      setCard: createUpdateState('card'),
      setAmount: createUpdateState('amount'),
      setLimits: createUpdateState('limits'),
      setBonusId: createUpdateState('bonusId'),
    };
  }, []);

  return <PaymentContext.Provider value={{ state, actions }}>{children}</PaymentContext.Provider>;
};

export const usePaymentContext = () => useContext(PaymentContext);

type PaymentModalProps = {
  amount?: number;
  currency?: string;
  paymentProvider?: string;
  bonusId?: number;
  page?: PaymentModalPage;
};

export const usePaymentModal = () => {
  const {
    actions: { setState },
  } = usePaymentContext();
  return useMemo(
    () => ({
      openDeposit: () => setState({ ...defaultContext.state, flow: 'deposit', isOpen: true }),
      openDepositWithProps: (dialogProps?: PaymentModalProps) => {
        setState({
          ...defaultContext.state,
          ...dialogProps,
          flow: 'deposit',
          isOpen: true,
        });
      },
      openWithdraw: () => setState({ ...defaultContext.state, flow: 'withdraw', isOpen: true }),
      openSuccess: (flow: PaymentFlow, amount: number) => {
        setState({
          ...defaultContext.state,
          flow,
          amount,
          isOpen: true,
          page: PaymentModalPage.SUCCESS,
        });
      },
      openError: (flow: PaymentFlow) =>
        setState({
          ...defaultContext.state,
          flow,
          isOpen: true,
          page: PaymentModalPage.ERROR,
        }),
    }),
    [setState],
  );
};
