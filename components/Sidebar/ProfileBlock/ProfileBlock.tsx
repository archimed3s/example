import { Box, HStack, StackDivider, Text, VStack } from '@chakra-ui/react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { Avatar } from '@components/Avatar/Avatar';
import { IconButton, IconButtonSizeEnum } from '@components/IconButton/IconButton';
import { useCurrency } from '@hooks/useCurrency';
import { usePaymentModal } from '@hooks/usePaymentContext';
import { usePlayerState } from '@hooks/usePlayerState';
import { Player } from '@sharedTypes/Player';

export const messages = defineMessages({
  real: {
    id: 'Header.real',
    defaultMessage: 'Real',
  },
  bonus: {
    id: 'Header.bonus',
    defaultMessage: 'Bonus',
  },
});

type ProfileBlockProps = {
  player: Player;
};
export const ProfileBlock = ({ player }: ProfileBlockProps) => {
  const { balance } = usePlayerState();
  const { getCurrencyFormatted } = useCurrency();
  const { openDeposit } = usePaymentModal();

  return (
    <VStack alignItems="flex-start" pb="20px">
      <Text fontWeight="semibold">
        {player.firstName} {player.lastName}
      </Text>

      <HStack bg="gray.-120" borderRadius="12px" w="100%" p={2} justifyContent="space-between">
        <Avatar bg="gray.10" name={`${player.firstName} ${player.lastName}`} />
        <Box flex={1}>
          {balance?.totalAmount && (
            <VStack alignItems="flex-start">
              <HStack alignItems="center" spacing={0.5}>
                <Text as="span">{getCurrencyFormatted(+balance.withdrawableAmount)}</Text>
              </HStack>

              <HStack alignItems="center" spacing="1" fontSize="xs" divider={<StackDivider />}>
                <HStack>
                  <Text as="span" color="gray.100">
                    <FormattedMessage {...messages.real} />
                  </Text>
                  <Text as="span">{getCurrencyFormatted(+balance.totalAmount)}</Text>
                </HStack>
                <HStack alignItems="center">
                  <Text as="span" color="gray.100">
                    <FormattedMessage {...messages.bonus} />
                  </Text>
                  <Text as="span">{getCurrencyFormatted(+balance.totalBonusAmount)}</Text>
                </HStack>
              </HStack>
            </VStack>
          )}
        </Box>
        <IconButton aria-label="Deposit" onClick={openDeposit} variant="payment" size={IconButtonSizeEnum.MEDIUM} />
      </HStack>
    </VStack>
  );
};
