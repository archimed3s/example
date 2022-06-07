import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getGameInfo } from '@api/lobby';
import { GameDetails } from '@sharedTypes/api/game';
import { post } from '@utils/fetcher';

const GAME_KEY = 'game';

export const useGameQuery = (id: string | number | undefined) => {
  const gameId = String(id);

  return useQuery([GAME_KEY, gameId], () => getGameInfo({ gameId }), { enabled: id !== undefined });
};

export const useToggleFavouriteGameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (gameDetails: GameDetails) => {
      const methodName = gameDetails.isFavourite ? 'removeGameFromFavourites' : 'addGameToFavourites';

      return post<void>(`/api/player/${methodName}`, { gameId: parseInt(gameDetails.id) });
    },
    {
      onMutate: (gameDetails) => {
        queryClient.setQueryData([GAME_KEY, gameDetails.id], {
          game: { ...gameDetails, isFavourite: !gameDetails.isFavourite },
        });
      },
      onError: (err, gameDetails) => {
        queryClient.setQueryData([GAME_KEY, gameDetails.id], {
          game: gameDetails,
        });
      },
    },
  );
};
