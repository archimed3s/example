import { Stack, StackProps } from '@chakra-ui/react';

import { GameDetails } from '@sharedTypes/api/game';

import { GameCard } from './GameCard';
import { GameFavouriteButton } from './GameFavouriteButton';

type Props = {
  gameDetails?: GameDetails;
} & StackProps;

export const GameHeadingDesktop = (props: Props) => {
  const { gameDetails, ...rest } = props;

  return (
    <Stack direction="row" justify="space-between" alignItems="end" {...rest}>
      <GameCard gameDetails={gameDetails} />
      {gameDetails ? <GameFavouriteButton gameDetails={gameDetails} /> : null}
    </Stack>
  );
};
