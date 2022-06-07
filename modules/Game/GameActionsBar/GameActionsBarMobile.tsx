import { Box, Flex, FormControl, FormLabel, Switch, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { IconButton, IconButtonSizeEnum } from '@components/IconButton/IconButton';
import { usePlayerState } from '@hooks/usePlayerState';
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

export const GameActionsBarMobile = (props: Props) => {
  const intl = useIntl();
  const { gameLoadedAt } = usePlayerState();
  const spentTime = useSpentTime(gameLoadedAt);
  return (
    <Box>
      <Flex
        bgGradient="linear(24.13deg, rgba(89, 101, 158, 0.05) 0%, rgba(139, 153, 221, 0.1) 100%)"
        h="76px"
        borderRadius="0 0 20px 20px"
        alignItems="center"
        color="white"
        p="0 10px"
        justify="space-between"
        w="100%"
        data-testid={props.dataTestId}
      >
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
      <Flex alignItems="center" justifyContent="center" mt={4}>
        <Flex mr="5">
          <Text mr={3} color="gray.100" fontSize="16px">
            {intl.formatMessage(messages.playingTime)}
          </Text>
          <div>{spentTime}</div>
        </Flex>
      </Flex>
    </Box>
  );
};
