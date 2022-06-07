import { Box, Heading } from '@chakra-ui/react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { Breadcrumb } from '@components/Breadcrumb/Breadcrumb';
import { SEOTextsPageRoutes } from '@lib/storyblok/SEOTextsPageRoutes';
import { SEOText } from '@modules/SEOText/SEOText';

const messages = defineMessages({
  title: {
    id: 'PaymentsFAQ.title',
    defaultMessage: 'Frequently Asked Questions',
  },
});

export const PaymentsFAQPage = () => {
  return (
    <Box width="full">
      <Box margin="2rem 0 0.1875rem 0">
        <Breadcrumb />
      </Box>
      <Box my={5}>
        <Box>
          <Heading as="h1" size="xl" color="white" fontWeight={500} mb={10}>
            <FormattedMessage {...messages.title} />
          </Heading>
        </Box>
        <SEOText fullStoryblokSlugToFolder={SEOTextsPageRoutes.PAYMENTS_FAQ_PAGE} />
      </Box>
    </Box>
  );
};
