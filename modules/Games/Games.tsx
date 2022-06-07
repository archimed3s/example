import { Center, Flex, Grid, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useInfiniteQuery, useQuery } from 'react-query';

import { GetLobbyGamesPageParams, QUERY_KEYS, getLobbyGameFilters, getLobbyGames } from '@api/lobby';
import { getGamesPageParams, routeService } from '@common/services/RouteService';
import { Button } from '@components/Button/Button';
import { CheckboxButtons, Tag } from '@components/CheckboxButtons/CheckboxButtons';
import { Counter } from '@components/Counter';
import { Select } from '@components/Select/Select';
import { GameCard } from '@modules/Games/GameCard';
import { SEOText } from '@modules/SEOText/SEOText';
import { ThemeCards } from '@modules/ThemeCards';

const messages = defineMessages({
  title: {
    id: 'Games.title',
    defaultMessage: 'All Games',
  },
  providers: {
    id: 'Games.providers',
    defaultMessage: 'Providers',
  },
  selectProvider: {
    id: 'Games.selectProvider',
    defaultMessage: 'Select a provider',
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

const parentCategoriesMapping = {
  [routeService().getHomePagePath()]: 'main_page',
  [routeService().getGamesPagePath()]: 'games_page',
};

type GamesProps = {
  pageSize: number;
  showCategories?: boolean;
};

const getActiveCategoriesId = (categories: Tag[]) =>
  categories.reduce<string[]>((acc, { isActive, id }) => {
    if (isActive) {
      acc.push(id);
    }
    return acc;
  }, []);

export const Games = ({ pageSize: limit, showCategories = false }: GamesProps) => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const [provider, setProvider] = useState<string>('');
  const [categories, setCategories] = useState<Tag[]>([]);
  const { categorySlug } = getGamesPageParams(router.query);

  const { data: filters } = useQuery(QUERY_KEYS.lobbyGameFilters, getLobbyGameFilters);

  useEffect(() => {
    const parentCategoryId = filters?.categories.find(
      (cat) => cat.name === parentCategoriesMapping[router.pathname],
    )?.id;
    if (!filters || !parentCategoryId) {
      return;
    }

    setCategories(
      filters.categories.reduce<Tag[]>((acc, { id, name, isActive, slug, parentCategory }) => {
        if (isActive && parentCategory === parentCategoryId) {
          acc.push({ id: String(id), name, isActive: slug === categorySlug });
        }
        return acc;
      }, []),
    );
  }, [filters, router.pathname, router.query, categorySlug]);

  const getLobbyGamesWithFilter = useCallback(
    ({ pageParam }: { pageParam?: Pick<GetLobbyGamesPageParams, 'limit' | 'offset'> }) =>
      getLobbyGames({
        pageParam: {
          ...(pageParam ?? { limit, offset: 0 }),
          filter: { provider, categoryIds: getActiveCategoriesId(categories) },
        },
      }),
    [categories, limit, provider],
  );

  const {
    data: { pages } = { pages: [] },
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery(
    [QUERY_KEYS.lobbyGames, provider, getActiveCategoriesId(categories).join()],
    getLobbyGamesWithFilter,
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.games.length === limit ? { limit, offset: allPages.length * limit } : undefined,
    },
  );

  const showMore = useCallback(() => fetchNextPage(), [fetchNextPage]);

  return (
    <>
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Stack alignItems="center" spacing={5} direction="row">
          <Text textStyle={{ base: 'lg', md: 'lg2' }} color="white">
            <FormattedMessage {...messages.title} />
          </Text>
          <Counter value={pages[0]?.count} />
        </Stack>

        <Select
          label={formatMessage(messages.providers)}
          placeholder={formatMessage(messages.selectProvider)}
          options={filters?.providers?.map((provider) => provider.id) || []}
          activeOption={provider}
          setActiveOption={setProvider}
        />
      </Flex>

      {showCategories && <CheckboxButtons tags={categories} setTags={setCategories} />}

      <Grid
        gridTemplateColumns="repeat(auto-fit, minmax(240px, 1fr))"
        gap={5}
        justifyItems="center"
        alignItems="center"
        w="100%"
      >
        {pages.length && pages[0].games.length ? (
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
        <Center alignSelf="center">
          <Button variant="alternate" onClick={showMore} data-testid="show-more-btn">
            {formatMessage(messages.showMoreGames)}
          </Button>
        </Center>
      )}

      <ThemeCards w="full" pt="68px" />

      <SEOText textsFolderSlug="providers" defaultCollapsed w="full" pt="15px" />
    </>
  );
};
