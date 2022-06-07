import { Box, Button, Flex, Img } from '@chakra-ui/react';
import Link from 'next/link';
import { defineMessages, useIntl } from 'react-intl';

import { useRouteService } from '@common/services/RouteService';
import { Lobby } from '@sharedTypes/api';

const messages = defineMessages({
  play: {
    id: 'Games.play',
    defaultMessage: 'Play',
  },
});

type GameCardProps = {
  game: Lobby.Game;
};

export const GameCard = ({ game }: GameCardProps) => {
  const appRoutes = useRouteService();
  const { formatMessage } = useIntl();

  return (
    <Box flexDir="column" data-testid="game-categories-item">
      <Box position="relative">
        <Img htmlWidth="100%" htmlHeight={160} src={game.thumbnailUrl} rounded="2xl" alt={game.name} />

        <Flex
          position="absolute"
          backgroundColor="blackTransparent.50"
          opacity={0}
          w="100%"
          h="100%"
          top={0}
          left={0}
          alignItems="center"
          justifyContent="center"
          _hover={{
            opacity: '100%',
          }}
        >
          <Button rounded="full" color="white">
            <Link
              href={appRoutes.getGamePagePathTemplate()}
              as={appRoutes.getGamePagePath(game.providerHandle, game.id, game.externalGameId)}
            >
              {formatMessage(messages.play)}
            </Link>
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
