import { Box, CircularProgress, Text } from '@chakra-ui/react';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  loading: {
    id: 'PaymentModal.LoadingMessage.loading',
    defaultMessage: 'Please Wait..',
  },
});

export const LoadingMessage = () => (
  <>
    <Box paddingY={5}>
      <CircularProgress isIndeterminate size="100px" thickness={1} color="purple" />
    </Box>
    <Text fontStyle="lg" color="purple">
      <FormattedMessage {...messages.loading} />
    </Text>
  </>
);
