import { Box, BoxProps, Button, Skeleton, Stack, Text } from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { useQuery } from 'react-query';

import { startGame } from '@api/startGame';
import { useBreakpoint } from '@hooks/useBreakpoint';
import { usePlayerState } from '@hooks/usePlayerState';
import { useRegistration } from '@hooks/useRegistration';
import { GameActionsBar } from '@modules/Game/GameActionsBar/GameActionsBar';
import { LobbyGameStartMode } from '@sharedTypes/Game';

import { GamePlayer, GamePlayerApi } from './GamePlayer';
import { useGameQuery } from './useGameQuery';

type UseStartGameUrlQueryProps = {
  gameExternalId: string;
  mode: LobbyGameStartMode;
};

const useStartGameUrlQuery = (props: UseStartGameUrlQueryProps) => {
  return useQuery(['startGame', props], () => {
    return startGame({ startParams: props });
  });
};

type GameWrapperProps = {
  ratio: number;
} & BoxProps;

const GameFrameWrapper = (props: GameWrapperProps) => {
  const { ratio, children, ...rest } = props;
  return (
    <Box position="relative" width="100%" paddingBottom={`${100 / ratio}%`} background="gray.-140" {...rest}>
      <Box
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        display="flex"
        alignItems="center"
        justifyContent="space-around"
      >
        {children}
      </Box>
    </Box>
  );
};

const GameErrorDialog = (props: BoxProps) => (
  <Box
    borderRadius={16}
    padding={6}
    backgroundColor="gray.-100"
    backgroundImage="radial-gradient(84.78% 87.29% at 50.15% 79.56%, rgba(135, 49, 255, 0.2) 0%, rgba(107, 0, 255, 0) 100%)"
    {...props}
  />
);
const messages = defineMessages({
  startGameUnhandledError: {
    id: 'GameFrame.startGameUnhandledError',
    defaultMessage: 'Unfortunately, this game is not available during error. Please, choose a different game.',
  },
});
type Props = {
  gameExternalId: string;
  gameId: string;
};

const DESKTOP_RATIO = 16 / 9;
const MOBILE_RATIO = 9 / 16;

export const GameFrame = (props: Props) => {
  const [mode, setMode] = useState<LobbyGameStartMode>(LobbyGameStartMode.demo);
  const breakpoint = useBreakpoint();
  const { player } = usePlayerState();
  const { onOpen } = useRegistration();

  const gameQuery = useGameQuery(props.gameId);

  const startGameUrlQuery = useStartGameUrlQuery({
    mode,
    gameExternalId: props.gameExternalId,
  });

  const gamePlayerRef = useRef<GamePlayerApi>(null);

  const onFullScreenFrame = () => {
    gamePlayerRef.current?.requestFullscreen();
  };

  const onToggleGameMode = (event: ChangeEvent<HTMLInputElement>) => {
    const isRealMode = event.target.checked;
    if (isRealMode) {
      if (!player) {
        onOpen();
      } else {
        setMode(LobbyGameStartMode.real);
      }
    } else {
      setMode(LobbyGameStartMode.demo);
    }
  };

  const startGameUrl = startGameUrlQuery.data?.url;

  const renderGameFrame = () => {
    if (startGameUrlQuery.isFetching || gameQuery.isLoading) {
      return <Skeleton width="100%" height="100%" />;
    }

    if (startGameUrl && gameQuery.data) {
      return (
        <GamePlayer
          ref={gamePlayerRef}
          src={startGameUrl}
          gameStartedAt={startGameUrlQuery.dataUpdatedAt}
          gameDetails={gameQuery.data.game}
        />
      );
    }

    return (
      <GameErrorDialog width="335px">
        <Stack spacing={6}>
          <Text color="white">
            <FormattedMessage {...messages.startGameUnhandledError} />
          </Text>
          <Button
            onClick={() => {
              startGameUrlQuery.refetch();
            }}
          >
            Retry
          </Button>
        </Stack>
      </GameErrorDialog>
    );
  };

  return (
    <Box>
      <GameFrameWrapper ratio={breakpoint.isMobile ? MOBILE_RATIO : DESKTOP_RATIO}>
        {renderGameFrame()}
      </GameFrameWrapper>
      <GameActionsBar
        onFullScreen={onFullScreenFrame}
        onToggleGameMode={onToggleGameMode}
        dataTestId="game-actions-bar"
        gameMode={mode}
        gameStartedAt={startGameUrlQuery.dataUpdatedAt}
      />
    </Box>
  );
};
