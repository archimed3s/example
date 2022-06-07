import { Box, BoxProps, Stack, StackProps, Text, TextProps } from '@chakra-ui/react';
import { ComponentPropsWithoutRef, Fragment, forwardRef, useImperativeHandle, useLayoutEffect } from 'react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import { IconButton, IconButtonProps, IconButtonSizeEnum } from '@components/IconButton/IconButton';
import { usePlayerState, usePlayerStateActions } from '@hooks/usePlayerState';
import { useToast } from '@hooks/useToast';
import { GameDetails } from '@sharedTypes/api/game';

import { useFullscreenState } from './useFullscreenState';
import { useToggleFavouriteGameMutation } from './useGameQuery';
import { useSpentTime } from './useSpentTime';

const GameIFrame = (props: ComponentPropsWithoutRef<'iframe'>) => (
  <iframe width="100%" height="100%" scrolling="yes" frameBorder="yes" {...props} />
);

const GamePlayerWrapper = forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <Box width="100%" height="100%" position="relative" ref={ref} {...props} />
));

GamePlayerWrapper.displayName = 'GamePlayerWrapper';

const TopLeftControls = (props: StackProps) => (
  <Stack direction="row" position="absolute" spacing={3} top="18px" left="24px" {...props} />
);

const PlayerButton = (props: IconButtonProps) => (
  <IconButton
    variant="default"
    size={IconButtonSizeEnum.MEDIUM}
    backgroundColor="rgba(29, 34, 52, 0.6)"
    backdropFilter="blur(20px)"
    icon={<ArrowBackIcon />}
    {...props}
  />
);

const BackButton = (props: IconButtonProps) => (
  <PlayerButton width="48px" height="48px" icon={<ArrowBackIcon />} {...props} />
);

const GameInfo = (props: StackProps) => <Stack spacing={1} {...props} />;

const GameName = (props: BoxProps) => <Box textStyle="m2" color="white" {...props} />;

const GameDescription = (props: TextProps) => <Text color="whiteAlpha.70" {...props} />;

const TopRightControls = (props: StackProps) => (
  <Stack position="absolute" top="24px" right="24px" direction="column" spacing={2} {...props} />
);

const messages = defineMessages({
  exitFullscreenMode: {
    id: 'GamePlayer.exitFullScreenMode',
    defaultMessage: 'Exit full screen mode',
  },
  addToFavourites: {
    id: 'GamePlayer.addToFavourites',
    defaultMessage: 'Add to favourites',
  },
  removeFromFavourites: {
    id: 'GamePlayer.removeFromFavourites',
    defaultMessage: 'Remove from favourites',
  },
  playingTime: {
    id: 'GamePlayer.playingTime',
    defaultMessage: 'Playing time',
  },
  startGameUnhandledError: {
    id: 'GameFrame.startGameUnhandledError',
    defaultMessage: 'Unfortunately, this game is not available during error. Please, choose a different game.',
  },
});

type GamePlayerFavouriteButtonProps = {
  gameDetails: GameDetails;
};

const GamePlayerFavouriteButton = (props: GamePlayerFavouriteButtonProps) => {
  const intl = useIntl();
  const toggleFavouriteGameMutation = useToggleFavouriteGameMutation();
  const isFavourite = props.gameDetails.isFavourite;
  const handleButtonClick = () => toggleFavouriteGameMutation.mutate(props.gameDetails);
  const title = intl.formatMessage(isFavourite ? messages.removeFromFavourites : messages.addToFavourites);

  return <PlayerButton aria-label={title} title={title} onClick={handleButtonClick} />;
};

export type GamePlayerApi = {
  requestFullscreen: () => void;
};

type Props = {
  src: string;
  gameStartedAt: number;
  gameDetails: GameDetails;
};

export const GamePlayer = forwardRef<GamePlayerApi, Props>((props: Props, ref) => {
  const intl = useIntl();
  const { setGameLoadedAt } = usePlayerStateActions();
  const toast = useToast();
  const playerIsLoggedIn = !!usePlayerState().player;
  const fullscreenState = useFullscreenState<HTMLDivElement>();
  const spentTime = useSpentTime(props.gameStartedAt);

  useImperativeHandle(ref, () => ({
    requestFullscreen: () => {
      fullscreenState.setFullscreen(true);
    },
  }));

  const onLoad = () => {
    setGameLoadedAt(new Date().getTime());
  };
  const onError = () => {
    setGameLoadedAt(0);
    toast.error({
      title: intl.formatMessage(messages.startGameUnhandledError),
    });
  };

  useLayoutEffect(() => {
    return () => setGameLoadedAt(0);
  }, [setGameLoadedAt]);

  return (
    <GamePlayerWrapper ref={fullscreenState.elementRef}>
      <GameIFrame src={props.src} onLoad={onLoad} onError={onError} onErrorCapture={onError} />
      {fullscreenState.fullscreen ? (
        <Fragment>
          <TopLeftControls>
            <BackButton
              aria-label={intl.formatMessage(messages.exitFullscreenMode)}
              title={intl.formatMessage(messages.exitFullscreenMode)}
              onClick={() => {
                fullscreenState.setFullscreen(false);
              }}
            />
            <GameInfo>
              <GameName>{props.gameDetails.name}</GameName>
              <GameDescription>
                <Text as="span" textTransform="capitalize">
                  {props.gameDetails.providerHandle}
                </Text>
                • <FormattedMessage {...messages.playingTime} /> {spentTime}
              </GameDescription>
            </GameInfo>
          </TopLeftControls>
          <TopRightControls>
            <PlayerButton
              aria-label={intl.formatMessage(messages.exitFullscreenMode)}
              title={intl.formatMessage(messages.exitFullscreenMode)}
              onClick={() => fullscreenState.setFullscreen(false)}
            />
            {playerIsLoggedIn ? <GamePlayerFavouriteButton gameDetails={props.gameDetails} /> : null}
          </TopRightControls>
        </Fragment>
      ) : null}
    </GamePlayerWrapper>
  );
});

GamePlayer.displayName = 'GamePlayer';
