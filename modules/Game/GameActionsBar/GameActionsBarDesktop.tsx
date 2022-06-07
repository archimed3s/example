import { Box, Button, Flex, FormControl, FormLabel, Switch, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { IconButton, IconButtonSizeEnum } from '@components/IconButton/IconButton';
import { usePlayerState } from '@hooks/usePlayerState';
import { useRegistration } from '@hooks/useRegistration';
import { GameDeposit } from '@modules/Game/GameDeposit';
import { LobbyGameStartMode } from '@sharedTypes/Game';

import { useSpentTime } from '../useSpentTime';

const messages = defineMessages({
  depositBtn: {
    id: 'GamePage.depositButton',
    defaultMessage: 'Deposit',
  },
  playingTime: {
    id: 'GamePage.playingTime',
    defaultMessage: 'Playing time',
  },
  jackpot: {
    id: 'GamePage.jackpot',
    defaultMessage: 'Jackpot',
  },
  funMode: {
    id: 'GamePage.funMode',
    defaultMessage: 'Fun Mode',
  },
  realMode: {
    id: 'GamePage.realMode',
    defaultMessage: 'Real Mode',
  },
  register: {
    id: 'GamePage.register',
    defaultMessage: 'Register',
  },
  enterFullscreenMode: {
    id: 'GamePage.enterFullscreenMode',
    defaultMessage: 'Enter full screen mode',
  },
});

type Props = {
  onFullScreen: () => void;
  onToggleGameMode: (isChecked: ChangeEvent<HTMLInputElement>) => void;
  dataTestId?: string;
  gameMode: LobbyGameStartMode;
  gameStartedAt: number;
};

export const GameActionsBarDesktop = (props: Props) => {
  const intl = useIntl();
  const { player, gameLoadedAt } = usePlayerState();
  const { onOpen } = useRegistration();
  const spentTime = useSpentTime(gameLoadedAt);

  return (
    <Flex
      bgGradient="linear(24.13deg, rgba(89, 101, 158, 0.05) 0%, rgba(139, 153, 221, 0.1) 100%)"
      h="76px"
      borderRadius="0 0 20px 20px"
      alignItems="center"
      color="white"
      p="0 10px"
      justify="space-between"
      data-testid={props.dataTestId}
    >
      <Flex alignItems="center">
        <Flex mr="5" alignItems="center">
          {player && <GameDeposit width="17rem" />}
          {!player && (
            <Button bgGradient="linear-gradient(211.17deg, #BB83F4 0%, #6A32CB 100%)" onClick={onOpen}>
              {intl.formatMessage(messages.register)}
            </Button>
          )}
        </Flex>

        <Flex mr="5">
          <Text mr={3} color="gray.100" fontSize="16px">
            {intl.formatMessage(messages.playingTime)}
          </Text>
          <div>{spentTime}</div>
        </Flex>
      </Flex>
      <Flex alignItems="center">
        <Box>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0" userSelect="none">
              {intl.formatMessage(messages.funMode)}
            </FormLabel>
            <Switch
              id="email-alerts"
              size="md"
              colorScheme="purple"
              isChecked={LobbyGameStartMode.real === props.gameMode}
              onChange={(event) => props.onToggleGameMode(event)}
            />
            <FormLabel mb="0" ml={3} userSelect="none">
              {intl.formatMessage(messages.realMode)}
            </FormLabel>
          </FormControl>
        </Box>
        <Box>
          <IconButton
            aria-label={intl.formatMessage(messages.enterFullscreenMode)}
            title={intl.formatMessage(messages.enterFullscreenMode)}
            variant="default"
            size={IconButtonSizeEnum.MEDIUM}
            onClick={props.onFullScreen}
          />
        </Box>
      </Flex>
    </Flex>
  );
};
