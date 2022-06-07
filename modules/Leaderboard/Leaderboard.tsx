import { Box, Flex, HStack, Spacer, Spinner, Stack, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useQuery } from 'react-query';

import { getGameLeaderboard } from '@api/lobby';
import { usePlayerState } from '@hooks/usePlayerState';
import { LeaderboardPlayerItem } from '@modules/Leaderboard/LeaderboardPlayerItem';

type LeaderboardProps = {
  gameId: string | undefined;
};

const messages = defineMessages({
  position: {
    id: 'Games.Leaderboard.position',
    defaultMessage: 'Position',
  },
  prize: {
    id: 'Games.Leaderboard.prize',
    defaultMessage: 'Prize',
  },
  noPlayersFound: {
    id: 'Games.Leaderboard.noPlayersFound',
    defaultMessage: "This game doesn't count with players yet.",
  },
});

const styleProps = {
  headerTitle: {
    color: 'white',
    fontWeight: 600,
  },
  headerUpdateTime: {
    textStyle: 'xs2',
  },
  noPlayersText: {
    color: 'white',
    fontWeight: 500,
    textAlign: 'center' as const,
  },
};

export const Leaderboard = ({ gameId }: LeaderboardProps) => {
  const { formatMessage } = useIntl();
  const { player } = usePlayerState();
  const { data, isLoading } = useQuery(
    ['getGameLeaderboard', gameId],
    () => getGameLeaderboard({ gameId: String(gameId) }),
    {
      enabled: gameId !== undefined,
    },
  );
  const players = useMemo(() => data?.players?.slice(0, 15) ?? [], [data]);

  return (
    <Box>
      <Stack>
        <Flex px={3} mb={4}>
          <HStack spacing={0}>
            <Text {...styleProps.headerTitle} mr={1}>
              {formatMessage(messages.position)}
            </Text>
            {data?.lastUpdate && <Text {...styleProps.headerUpdateTime}>(Updated {data.lastUpdate})</Text>}
          </HStack>
          <Spacer />
          <Text {...styleProps.headerTitle}>{formatMessage(messages.prize)}</Text>
        </Flex>
        <Box px={3} overflow={'scroll'} maxHeight={'500px'}>
          {isLoading ? (
            <Spinner size="lg" alignSelf="center" my={3} />
          ) : players.length > 0 ? (
            players.map((item) => <LeaderboardPlayerItem key={item.id} player={item} />)
          ) : (
            <Text {...styleProps.noPlayersText}>{formatMessage(messages.noPlayersFound)}</Text>
          )}
        </Box>
      </Stack>
      {!isLoading && player && <LeaderboardPlayerItem isAuthPlayer player={players[0]} />}
    </Box>
  );
};
