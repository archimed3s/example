import { Text } from '@chakra-ui/react';
import { defineMessages, useIntl } from 'react-intl';

import { Button, ButtonProps } from '@components/Button/Button';
import { Tooltip } from '@components/Tooltip/Tooltip';
import { usePlayerState } from '@hooks/usePlayerState';
import { GameDetails } from '@sharedTypes/api/game';

import { useToggleFavouriteGameMutation } from '../useGameQuery';

type Props = {
  gameDetails: GameDetails;
} & ButtonProps;

const messages = defineMessages({
  addToFavourites: {
    id: 'GamePage.addToFavourites',
    defaultMessage: 'Add to favourites',
  },
  removeFromFavourites: {
    id: 'GamePage.removeFromFavourites',
    defaultMessage: 'Favourite',
  },
  pleaseLoginToAddFavourites: {
    id: 'GamePage.pleaseLoginToAddFavourites',
    defaultMessage: 'Please login to add favourite games',
  },
});

export const GameFavouriteButton = ({ gameDetails, ...rest }: Props) => {
  const intl = useIntl();
  const { player } = usePlayerState();
  const isFavourite = gameDetails.isFavourite;
  const toggleFavouriteGameMutation = useToggleFavouriteGameMutation();

  const handleButtonClick = () => toggleFavouriteGameMutation.mutate(gameDetails);

  return (
    <Tooltip
      shouldWrapChildren
      isDisabled={!!player}
      placement="bottom-end"
      label={intl.formatMessage(messages.pleaseLoginToAddFavourites)}
    >
      <Button {...rest} variant="outline" isActive={isFavourite} isDisabled={!player} onClick={handleButtonClick}>
        <Text color="gray.160">
          {isFavourite
            ? intl.formatMessage(messages.removeFromFavourites)
            : intl.formatMessage(messages.addToFavourites)}
        </Text>
      </Button>
    </Tooltip>
  );
};
