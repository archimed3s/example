import { Box, Center, Flex, Grid, Heading, Spinner, Text } from '@chakra-ui/react';
import { useCallback } from 'react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useInfiniteQuery, useQuery } from 'react-query';

import { GetGamesByExternalIdPageParams, getUserRecentlyGames } from '@api/lobby';
import { fetchRecentlyPlayedGames } from '@api/player';
import { Button } from '@components/Button/Button';
import { usePlayerState } from '@hooks/usePlayerState';
import { GameCard } from '@modules/Games/GameCard';
import { SEOText } from '@modules/SEOText/SEOText';
import { ThemeCards } from '@modules/ThemeCards';

const messages = defineMessages({
  title: {
    id: 'RecentlyPlayed.title',
    defaultMessage: 'Recently Played Games',
  },
  noGames: {
    id: 'Games.noGames',
    defaultMessage: 'There are currently no games.',
  },
  showMoreGames: {
    id: 'Games.showMoreGames',
    defaultMessage: 'Show more games',
  },
});

type GamesProps = {
  pageSize: number;
  showCategories?: boolean;
};

export const RecentlyGames = ({ pageSize: limit }: GamesProps) => {
  const { player } = usePlayerState();
  const { formatMessage } = useIntl();

  const { data: recentlyPlayedGamesData } = useQuery([player?.playerId], () =>
    fetchRecentlyPlayedGames({ playerId: player?.playerId ? player?.playerId : -1 }),
  );

  const getRecentlyPlayedGames = useCallback(
    ({ pageParam }: { pageParam?: Pick<GetGamesByExternalIdPageParams, 'limit' | 'offset'> }) =>
      getUserRecentlyGames({
        pageParam: {
          ...(pageParam ?? { limit, offset: 0 }),
          gameExternalIds: recentlyPlayedGamesData?.games.map((game) => game.gameExternalId),
        },
      }),
    [limit, recentlyPlayedGamesData?.games],
  );

  const {
    data: { pages } = { pages: [] },
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery([recentlyPlayedGamesData?.games], getRecentlyPlayedGames, {
    getNextPageParam: (lastPage, allPages) =>
      lastPage.games.length === limit ? { limit, offset: allPages.length * limit } : undefined,
  });

  const showMore = useCallback(() => fetchNextPage(), [fetchNextPage]);
  const isPages = pages && pages.length && pages[0].games.length;
  return (
    <>
      <Flex width="100%" justifyContent="space-between" alignItems="center" pb={6}>
        <Text textStyle={{ base: 'lg', md: 'lg2' }} fontWeight={600} color="white">
          <FormattedMessage {...messages.title} />
        </Text>
      </Flex>

      <Grid
        gridTemplateColumns="repeat(auto-fit, minmax(240px, 1fr))"
        gap={5}
        justifyItems="center"
        alignItems="center"
        w="100%"
      >
        {isPages ? (
          pages.flatMap(({ games }) => games.map((game) => <GameCard key={game.id} game={game} />))
        ) : isLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            data-testid="game-categories-loader"
          />
        ) : (
          <Heading size="md" p={3}>
            {formatMessage(messages.noGames)}
          </Heading>
        )}
      </Grid>

      {hasNextPage && (
        <Center alignSelf="center" pt={8}>
          <Button variant="default" onClick={showMore} data-testid="show-more-btn">
            {formatMessage(messages.showMoreGames)}
          </Button>
        </Center>
      )}

      <Box paddingY={6} width="full">
        <ThemeCards />
      </Box>

      <Box paddingY={6} width="full">
        <SEOText textsFolderSlug="providers" defaultCollapsed />
      </Box>
    </>
  );
};
