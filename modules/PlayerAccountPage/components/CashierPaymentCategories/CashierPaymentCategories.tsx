import { Box, HStack, Spinner, Tag, useBreakpointValue } from '@chakra-ui/react';
import css from '@emotion/css';
import { FormattedMessage, defineMessages } from 'react-intl';

import { SitePaymentCategory } from '@sharedTypes/api/siteSettings';

type CashierPaymentCategoriesProps = {
  paymentProviders: SitePaymentCategory | undefined;
  activeCategory?: string;
  changeActiveCategory: (category: string) => void;
};

const messages = defineMessages({
  emptyPaymentMethods: {
    id: 'User.emptyPaymentMethods',
    defaultMessage: 'No payment methods',
  },
});

export const CashierPaymentCategories = ({
  paymentProviders,
  activeCategory,
  changeActiveCategory,
}: CashierPaymentCategoriesProps) => {
  const breakpoint = useBreakpointValue({ base: 'base', sm: 'sm', md: 'md', lg: 'lg' });
  const isMobileView = breakpoint === 'base' || breakpoint === 'sm';

  if (!paymentProviders) return <Spinner />;

  const paymentProviderTypes = Object.keys(paymentProviders);
  const customScrollBarStyle = css`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(${paymentProviderTypes.length}, 36%);
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0;
      display: none;
    },
  `;

  return (
    <Box overflow="hidden">
      <HStack spacing={4} css={isMobileView ? customScrollBarStyle : null}>
        {paymentProviderTypes.length ? (
          paymentProviderTypes.map((category) => {
            return (
              <Tag
                key={category}
                padding="10px 15px"
                fontSize="s2"
                variant="solid"
                cursor="pointer"
                bgColor="gray.-100"
                userSelect={'none'}
                whiteSpace={isMobileView ? 'nowrap' : 'inherit'}
                justifyContent="center"
                bgGradient={activeCategory === category ? 'linear(to-t, #59659E 0%, #8B99DD 100%)' : 'none'}
                onClick={() => changeActiveCategory(category)}
              >
                {category}
              </Tag>
            );
          })
        ) : (
          <Box>
            <FormattedMessage {...messages.emptyPaymentMethods} />
          </Box>
        )}
      </HStack>
    </Box>
  );
};
