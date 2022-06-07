import { Box, Button, Flex, Heading, Spinner, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Image from 'next/image';
import { FormattedMessage, defineMessages } from 'react-intl';

import { StoryMarkup } from '@components/StoryMarkup';
import { useCurrency } from '@hooks/useCurrency';
import { useSiteSettings } from '@hooks/useSiteSettings';
import { SEOTextsPageRoutes } from '@lib/storyblok/SEOTextsPageRoutes';
import { SEOText } from '@modules/SEOText/SEOText';
import { StoryblokRichText } from '@sharedTypes/api/storyblok';

const messages = defineMessages({
  paymentsTitle: {
    id: 'payments',
    defaultMessage: 'Payments',
  },
  paymentsDepositButton: {
    id: 'depositNow',
    defaultMessage: 'Deposit now',
  },
  paymentsJoinButton: {
    id: 'joinNow',
    defaultMessage: 'Join now',
  },
  paymentsTableTitleMethods: {
    id: 'paymentMethod',
    defaultMessage: 'Payment method',
  },
  paymentsTableTitleFee: {
    id: 'fee',
    defaultMessage: 'Fee',
  },
  paymentsTableTitleProcessing: {
    id: 'processingTime',
    defaultMessage: 'Processing time',
  },
  paymentsTableTitleLimits: {
    id: 'limitsPerTransaction',
    defaultMessage: 'Limits per transaction',
  },
});

type PaymentMethodsPageProps = {
  story: StoryblokRichText;
};

export const PaymentMethodsPage = ({ story }: PaymentMethodsPageProps) => {
  const siteSettings = useSiteSettings();
  const { getCurrencyFormatted } = useCurrency();

  return (
    <Box>
      <Heading fontSize={28} my={4}>
        <FormattedMessage {...messages.paymentsTitle} />
      </Heading>
      <Box color="#7781A8">{story && <StoryMarkup data={story} />}</Box>
      <Button color="white" mt={6} mb={12} background="linear-gradient(211.17deg, #1DC25F 0%, #028C84 100%)">
        <FormattedMessage {...messages.paymentsDepositButton} />
      </Button>
      {!siteSettings && (
        <Flex justify="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            data-testid={'payment-methods-loader'}
          />
        </Flex>
      )}
      {siteSettings && (
        <Table
          variant="striped"
          size="sm"
          borderRadius="22px"
          bg="#131621"
          color="#9FA9D2"
          sx={{
            '& th, & td': {
              py: 3,
              px: 7,
            },
          }}
        >
          <Thead>
            <Tr>
              <Th>
                <FormattedMessage {...messages.paymentsTableTitleMethods} />
              </Th>
              <Th>
                <FormattedMessage {...messages.paymentsTableTitleFee} />
              </Th>
              <Th>
                <FormattedMessage {...messages.paymentsTableTitleProcessing} />
              </Th>
              <Th>
                <FormattedMessage {...messages.paymentsTableTitleLimits} />
              </Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {siteSettings.paymentDepositLimits?.map((method) => (
              <Tr key={method.paymentProviderId}>
                <Td>
                  <Image
                    src={`/images/payment-logos/${method.paymentProviderId}.png`}
                    alt={method.paymentProviderId}
                    width={80}
                    height={54}
                  />
                </Td>
                <Td>Free</Td>
                <Td>Instant</Td>
                <Td>
                  Min. {getCurrencyFormatted(method.minAmount, method.currency)} / Max.{' '}
                  {getCurrencyFormatted(method.maxAmount, method.currency)}
                </Td>
                <Td textAlign="right">
                  <Button color="white" background="linear-gradient(211.17deg, #BB83F4 0%, #6A32CB 100%)">
                    <FormattedMessage {...messages.paymentsJoinButton} />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <Box my="4rem">
        <SEOText textsFolderSlug={SEOTextsPageRoutes.PAYMENTS_PAGE} />
      </Box>
    </Box>
  );
};
