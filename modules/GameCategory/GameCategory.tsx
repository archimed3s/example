import { Flex, Stack, useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useQuery } from 'react-query';

import { getLobbyGames } from '@api/lobby';
import { useRouteService } from '@common/services/RouteService';
import { GameCard, GameSkeleton, GameThumbnail } from '@components/GameThumbnail/GameThumbnail';
import { IconButton, IconButtonSizeEnum } from '@components/IconButton/IconButton';
import { SectionHeader } from '@components/SectionHeader/SectionHeader';
import { useBreakpoint } from '@hooks/useBreakpoint';

type GameCategoryProps = {
  categoryId: string;
  title: string;
};

const messages = defineMessages({
  allGames: {
    id: 'GameCategory.seeAllGames',
    defaultMessage: 'See all games',
  },
  noGames: {
    id: 'GameCategory.noGames',
    defaultMessage: 'There are currently no games!',
  },
  fun: {
    id: 'GameCategory.funGames',
    defaultMessage: 'Fun',
  },
  real: {
    id: 'GameCategory.realGames',
    defaultMessage: 'Real',
  },
  previousReviews: {
    id: 'GameCategory.previousReviews',
    defaultMessage: 'Previous reviews',
  },
  nextReviews: {
    id: 'GameCategory.nextReviews',
    defaultMessage: 'Next reviews',
  },
});

export const GameCategory = ({ categoryId, title }: GameCategoryProps) => {
  const appRoutes = useRouteService();
  const intl = useIntl();
  const [page, setPage] = useState<number>(0);
  const { isMobile } = useBreakpoint();
  const baseValue = isMobile ? 2 : 7; // NOTE: get proper media query for mobile screen
  const pageSize = useBreakpointValue({ base: baseValue, sm: 3, md: 4, lg: 5, xl: 6, '2xl': 7 }, 'base') as number;

  const { data } = useQuery([['lobbyGames', categoryId], { limit: pageSize, offset: page * pageSize }], () =>
    getLobbyGames({
      pageParam: {
        limit: pageSize,
        offset: page * pageSize,
        filter: {
          categoryIds: [categoryId],
        },
      },
    }),
  );

  const handlePreviousClick = (): void => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const handleNextClick = (): void => {
    if (data && data.count > (page + 1) * pageSize) {
      setPage(page + 1);
    }
  };

  return (
    <Stack spacing={6}>
      <SectionHeader
        headerTitle={title}
        dataTestId="game-categories-header"
        paginationText={intl.formatMessage(messages.allGames)}
        pagination
      >
        <IconButton
          isRound
          variant="alternate"
          aria-label={intl.formatMessage(messages.previousReviews)}
          onClick={handlePreviousClick}
          size={IconButtonSizeEnum.XSMALL}
        />
        <IconButton
          isRound
          variant="alternate"
          aria-label={intl.formatMessage(messages.nextReviews)}
          onClick={handleNextClick}
          size={IconButtonSizeEnum.XSMALL}
        />
      </SectionHeader>
      <Flex justify="space-between">
        {!data
          ? new Array(pageSize).fill(null).map((_, index) => (
              <GameCard key={index}>
                <GameSkeleton />
              </GameCard>
            ))
          : data.games.map((game) => (
              <GameThumbnail
                key={game.id}
                dataTestId="game-categories-card"
                image={game.thumbnailUrl}
                buttonsPrimaryTitle={intl.formatMessage(messages.fun)}
                buttonsPrimaryLink={appRoutes.getGamePagePath(game.providerHandle, game.id, game.externalGameId)}
                buttonsSecondaryTitle={intl.formatMessage(messages.real)}
                buttonsSecondaryLink={appRoutes.getGamePagePath(game.providerHandle, game.id, game.externalGameId)}
              />
            ))}
      </Flex>
    </Stack>
  );
};
