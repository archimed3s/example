import { Avatar, Box, Button, HStack, Heading, StackDivider, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRouteService } from '@common/services/RouteService';
import { GLink } from '@components/GLink/GLink';
import { IconButton, IconButtonSizeEnum } from '@components/IconButton/IconButton';
import { NotificationsBadge } from '@components/NotificationsBadge';
import { useBreakpoint } from '@hooks/useBreakpoint';
import { useCurrency } from '@hooks/useCurrency';
import { usePaymentModal } from '@hooks/usePaymentContext';
import { usePlayerState } from '@hooks/usePlayerState';
import { Player } from '@sharedTypes/Player';

import { chakraStyleProps } from './headerStyles';
import { messages } from './translations';

type HeaderPlayerProps = {
  player: Player;
};

export const HeaderPlayer: FC<HeaderPlayerProps> = ({ player }) => {
  const { balance, gameLoadedAt } = usePlayerState();
  const { getCurrencyFormatted } = useCurrency();
  const appRoutes = useRouteService();
  const { isDesktop } = useBreakpoint();
  const intl = useIntl();
  const { openDeposit } = usePaymentModal();

  return (
    <>
      <HStack spacing={{ base: 2, md: 4 }} data-testid="header-player">
        <IconButton
          aria-label={intl.formatMessage(messages.search)}
          variant="alternate"
          size={IconButtonSizeEnum.MEDIUM}
        />

        {isDesktop ? (
          <>
            <GLink href={appRoutes.getNotificationsPath()}>
              <IconButton
                aria-label={intl.formatMessage(messages.notifications)}
                variant="alternate"
                size={IconButtonSizeEnum.MEDIUM}
                icon={
                  <>
                    <NotificationsBadge />
                  </>
                }
              />
            </GLink>
            <HStack spacing="2">
              <GLink href={appRoutes.account.getSettingsPagePath()}>
                <Avatar bg="gray.10" name={`${player.firstName} ${player.lastName}`} {...chakraStyleProps.avatar} />
              </GLink>

              {!gameLoadedAt && (
                <Box>
                  <Heading as="h6" size="xs">
                    {player.firstName} {player.lastName}
                  </Heading>

                  {balance?.totalAmount && (
                    <HStack divider={<StackDivider {...chakraStyleProps.stackDivider} />}>
                      <HStack alignItems="center" spacing={0.5}>
                        <Text {...chakraStyleProps.currency} fontSize="xs2" as="span">
                          {getCurrencyFormatted(+balance.totalAmount)}
                        </Text>
                      </HStack>

                      <HStack alignItems="center" spacing="1" fontSize="xs">
                        <Text as="span" {...chakraStyleProps.labelCurrency}>
                          <FormattedMessage {...messages.real} />
                        </Text>
                        <Text as="span" {...chakraStyleProps.currency}>
                          {getCurrencyFormatted(+balance.withdrawableAmount)}
                        </Text>
                      </HStack>

                      <HStack alignItems="center">
                        <Text as="span" {...chakraStyleProps.labelCurrency} fontSize="xs">
                          <FormattedMessage {...messages.bonus} />
                        </Text>
                        <Text as="span" {...chakraStyleProps.currency} fontSize="xs">
                          {getCurrencyFormatted(+balance.totalBonusAmount)}
                        </Text>
                      </HStack>
                    </HStack>
                  )}
                </Box>
              )}
            </HStack>

            <IconButton
              aria-label="Deposit"
              onClick={openDeposit}
              variant="payment"
              display={{ base: 'block', md: 'none' }}
            />

            <Button variant="payment" display={{ base: 'none', md: 'block' }} onClick={openDeposit}>
              <FormattedMessage {...messages.deposit} />
            </Button>
          </>
        ) : (
          <HStack spacing={0} bgColor="gray.-120" rounded="lg" shadow="b1">
            <Box>
              {balance?.totalAmount && (
                <Text {...chakraStyleProps.currency} textStyle="xs2" as="span" p="0 0.75rem">
                  {getCurrencyFormatted(+balance.totalAmount)}
                </Text>
              )}
            </Box>

            <IconButton
              aria-label="Deposit"
              onClick={openDeposit}
              variant="payment"
              display={{ base: 'block', xl: 'none' }}
            />
          </HStack>
        )}
      </HStack>
    </>
  );
};
