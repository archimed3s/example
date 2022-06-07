import { Stack, StackProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FormattedMessage, defineMessages } from 'react-intl';

import { Button } from '@components/Button/Button';
import { IconButton, IconButtonSizeEnum } from '@components/IconButton/IconButton';
import { usePlayerState } from '@hooks/usePlayerState';
import { useRegistration } from '@hooks/useRegistration';
import { GameDeposit } from '@modules/Game/GameDeposit';
import { GameDetails } from '@sharedTypes/api/game';

import { GameCard } from './GameCard';
import { GameFavouriteButton } from './GameFavouriteButton';

const messages = defineMessages({
  depositBtn: {
    id: 'GamePage.depositButton',
    defaultMessage: 'Deposit',
  },
  register: {
    id: 'GamePage.register',
    defaultMessage: 'Register',
  },
});

type Props = {
  gameDetails?: GameDetails;
} & StackProps;

export const GameHeadingMobile = ({ gameDetails, ...rest }: Props) => {
  const { back } = useRouter();
  const { player } = usePlayerState();
  const { onOpen } = useRegistration();

  return (
    <Stack spacing={5} {...rest}>
      <Stack direction="row" justifyContent="space-between" alignItems="start">
        <GameCard gameDetails={gameDetails} />
        <IconButton aria-label="close" onClick={back} variant="default" size={IconButtonSizeEnum.MEDIUM} />
      </Stack>

      <Stack spacing={3}>
        {player && <GameDeposit width="full" />}
        {!player && (
          <Button onClick={onOpen}>
            <FormattedMessage {...messages.register} />
          </Button>
        )}
        {player && gameDetails ? <GameFavouriteButton gameDetails={gameDetails} width="full" /> : null}
      </Stack>
    </Stack>
  );
};
