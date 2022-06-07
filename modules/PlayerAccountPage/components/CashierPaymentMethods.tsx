import { Box, Flex, Heading } from '@chakra-ui/react';
import { FC, useMemo, useState } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { useSiteSettings } from '@hooks/useSiteSettings';
import { CashierPaymentCategories } from '@modules/PlayerAccountPage/components/CashierPaymentCategories/CashierPaymentCategories';
import { CashierPaymentProviders } from '@modules/PlayerAccountPage/components/CashierPaymentProviders/CashierPaymentProviders';

const messages = defineMessages({
  paymentMethods: {
    id: 'User.paymentMethods',
    defaultMessage: 'Payment methods',
  },
});

const PAGINATION_STEP_SIZE = 8;

export const CashierPaymentMethods: FC = () => {
  const [activePaymentCategory, setActivePaymentCategory] = useState<string>('All');
  const [paymentProvidersDisplayAmount, setPaymentProvidersDisplayAmount] = useState<number>(PAGINATION_STEP_SIZE);
  const siteSettings = useSiteSettings();

  const providersLength = useMemo(() => {
    return siteSettings?.paymentProviderCategory?.[activePaymentCategory].length ?? 0;
  }, [activePaymentCategory, siteSettings?.paymentProviderCategory]);

  const loadMore = () => {
    const displayAmount =
      providersLength <= PAGINATION_STEP_SIZE ? providersLength : paymentProvidersDisplayAmount + PAGINATION_STEP_SIZE;
    setPaymentProvidersDisplayAmount(displayAmount);
  };

  const changePaymentCategory = (category: string) => {
    setActivePaymentCategory(category);
    setPaymentProvidersDisplayAmount(PAGINATION_STEP_SIZE);
  };

  return (
    <Flex flexDir="column" mt={10} w="100%">
      <Heading as="h2" size="s">
        <FormattedMessage {...messages.paymentMethods} />
      </Heading>
      <Box mt={3}>
        <CashierPaymentCategories
          paymentProviders={siteSettings?.paymentProviderCategory}
          activeCategory={activePaymentCategory}
          changeActiveCategory={changePaymentCategory}
        />

        <CashierPaymentProviders
          providers={siteSettings?.paymentProviderCategory[activePaymentCategory].slice(
            0,
            paymentProvidersDisplayAmount,
          )}
          limits={siteSettings?.paymentDepositLimits}
          onLoadMore={loadMore}
          isLoadMoreButton={providersLength > paymentProvidersDisplayAmount}
        />
      </Box>
    </Flex>
  );
};
