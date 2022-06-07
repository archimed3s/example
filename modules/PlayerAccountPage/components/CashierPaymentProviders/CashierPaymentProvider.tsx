import { Flex } from '@chakra-ui/react';
import { FC, useCallback, useMemo } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { ProviderListItemCard } from '@components/ProviderListItemCard';
import { useBreakpoint } from '@hooks/useBreakpoint';
import { useCurrency } from '@hooks/useCurrency';
import { usePaymentModal } from '@hooks/usePaymentContext';
import { PaymentMethodLimit } from '@sharedTypes/api/siteSettings';

const messages = defineMessages({
  minimumDeposit: {
    id: 'ProviderListItemCard.minimumDeposit',
    defaultMessage: 'Minimum deposit {min}',
  },
  limits: {
    id: 'ProviderListItemCard.limits',
    defaultMessage: 'Min {min} • Max {max}',
  },
});

export type CashierProvider = {
  name: string;
};

type CashierPaymentProviderProps = {
  provider: CashierProvider;
  providerKey: string;
  limits: PaymentMethodLimit | undefined;
};

const CardDescription = ({ limits }: { limits: PaymentMethodLimit | undefined }) => {
  const { getCurrencyFormatted } = useCurrency();
  const { isMobile } = useBreakpoint();

  const values = useMemo(
    () => ({
      min: getCurrencyFormatted(limits?.minAmount, limits?.currency),
      max: getCurrencyFormatted(limits?.maxAmount, limits?.currency),
    }),
    [getCurrencyFormatted, limits?.currency, limits?.maxAmount, limits?.minAmount],
  );

  return isMobile ? (
    <FormattedMessage {...messages.minimumDeposit} values={values} />
  ) : (
    <FormattedMessage {...messages.limits} values={values} />
  );
};

export const CashierPaymentProvider: FC<CashierPaymentProviderProps> = ({ provider, providerKey, limits }) => {
  const { openDepositWithProps } = usePaymentModal();

  const onClick = useCallback(
    (paymentProvider) =>
      openDepositWithProps({
        paymentProvider,
      }),
    [openDepositWithProps],
  );

  return (
    <Flex
      _hover={{
        cursor: 'pointer',
        '& .arrow-right-icon': {
          color: 'var(--chakra-colors-white)',
        },
      }}
      alignItems="center"
      justifyContent="space-between"
      w="100%"
    >
      <ProviderListItemCard
        iconSrc={`/images/payment-logos/${providerKey}.png`}
        iconAlt={`${provider.name} logo`}
        title={provider.name}
        description={<CardDescription limits={limits} />}
        onClick={onClick}
        value={providerKey}
      />
    </Flex>
  );
};
