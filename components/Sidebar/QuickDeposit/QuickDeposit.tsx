import { Box, Button, CSSObject, Text } from '@chakra-ui/react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { usePaymentModal } from '@hooks/usePaymentContext';
import { Player } from '@sharedTypes/Player';

const messages = defineMessages({
  welcome: {
    id: 'QuickDeposit.welcome',
    defaultMessage: 'Welcome {name} to Test!',
  },
  deposit: {
    id: 'QuickDeposit.desopit',
    defaultMessage: 'Quick deposit',
  },
});

type QuickDepositProps = {
  player: Player;
};

const containerStyles: CSSObject = {
  background:
    'radial-gradient(48.39% 91.61% at 23.39% 89%, rgba(11, 255, 0, 0.1) 0%, rgba(0, 255, 56, 0) 100%), linear-gradient(0deg, #1D2234 0%, rgba(29, 34, 52, 0.47) 100%)',
};

export const QuickDeposit = ({ player }: QuickDepositProps) => {
  const { openDeposit } = usePaymentModal();
  return (
    <Box width="full" pt={3} pb={4} px={4} mb={{ base: 5, md: 4 }} sx={containerStyles} borderRadius={8} shadow="b1">
      <Text as="h4" size="s2" color="white" marginBottom=".5rem" fontWeight="400">
        <FormattedMessage {...messages.welcome} values={{ name: player.firstName }} />
      </Text>
      <Button variant="payment" display={{ base: 'none', md: 'block' }} onClick={openDeposit}>
        <FormattedMessage {...messages.deposit} />
      </Button>
    </Box>
  );
};
