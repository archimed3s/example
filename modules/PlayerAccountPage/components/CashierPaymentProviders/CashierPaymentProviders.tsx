import { Box, Button, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import { FC } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { PAYMENT_METHODS, PaymentMethod } from '@modules/PlayerAccountPage/PaymentMethods';
import { CashierPaymentProvider } from '@modules/PlayerAccountPage/components/CashierPaymentProviders/CashierPaymentProvider';
import { PaymentMethodLimit } from '@sharedTypes/api/siteSettings';

type CashierPaymentProvidersProps = {
  providers: string[] | undefined;
  limits: PaymentMethodLimit[] | undefined;
  onLoadMore: () => void;
  isLoadMoreButton: boolean;
};

const messages = defineMessages({
  loadMoreButton: {
    id: 'User.loadMoreButton',
    defaultMessage: 'Load More',
  },
});

export const CashierPaymentProviders: FC<CashierPaymentProvidersProps> = ({
  providers,
  limits,
  onLoadMore,
  isLoadMoreButton,
}) => {
  const breakpoint = useBreakpointValue({ base: 'base', sm: 'sm', md: 'md', lg: 'lg' });
  const isMobileView = breakpoint === 'base' || breakpoint === 'sm';

  return (
    <Box>
      <Grid templateColumns={!isMobileView ? 'repeat(2, 1fr)' : undefined} gap={isMobileView ? 3 : 6} mt={5}>
        {providers?.map((provider) =>
          PAYMENT_METHODS.has(provider) ? (
            <GridItem
              key={provider}
              display="flex"
              borderRadius="10px"
              w="100%"
              bgGradient="linear(250.36deg, rgba(29, 34, 52, 0.7) 30.17%, rgba(29, 34, 52, 0.392) 65.65%)"
              _hover={{ bgGradient: 'linear(250.36deg, gray.-100 0%, rgba(29, 34, 52, 0.56) 100%)' }}
            >
              <CashierPaymentProvider
                provider={PAYMENT_METHODS.get(provider) as PaymentMethod}
                providerKey={provider}
                limits={limits?.find((limit) => limit.paymentProviderId === provider)}
              />
            </GridItem>
          ) : null,
        )}
      </Grid>
      {isLoadMoreButton && (
        <Box w="100%" textAlign="center" mt={5}>
          <Button variant="default" onClick={() => onLoadMore()}>
            <span>
              <FormattedMessage {...messages.loadMoreButton} />
            </span>
          </Button>
        </Box>
      )}
    </Box>
  );
};
