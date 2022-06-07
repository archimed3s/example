import { Center, Flex, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { useCurrency } from '@hooks/useCurrency';
import { usePaymentContext } from '@hooks/usePaymentContext';

type ProviderLimitsProps = {
  minAmount: number;
  maxAmount: number;
};

const messages = defineMessages({
  minLimit: {
    id: 'PaymentProvider.min',
    defaultMessage: 'Min.',
  },
  maxLimits: {
    id: 'PaymentProvider.max',
    defaultMessage: 'Max.',
  },
});

const ItemWrapper = ({ children }: PropsWithChildren<Record<string, unknown>>) => (
  <Center>
    <Text marginX={3}>{children}</Text>
  </Center>
);

export const ProviderLimits = ({ minAmount, maxAmount }: ProviderLimitsProps) => {
  const {
    state: { currency },
  } = usePaymentContext();

  const { getCurrencyFormatted } = useCurrency({ currency });

  return (
    <Flex justifyContent="center" height={12} bgColor="gray.-90" borderRadius={8}>
      <ItemWrapper>
        <FormattedMessage {...messages.minLimit} />
      </ItemWrapper>
      <ItemWrapper>{getCurrencyFormatted(minAmount)}</ItemWrapper>
      <ItemWrapper>
        <FormattedMessage {...messages.maxLimits} />
      </ItemWrapper>
      <ItemWrapper>{getCurrencyFormatted(maxAmount)}</ItemWrapper>
    </Flex>
  );
};
