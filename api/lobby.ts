import { Lobby } from '@sharedTypes/api';
import { GameDetailsResponse, GameLeaderboardRequest, GameLeaderboardResponse } from '@sharedTypes/api/game';
import { get } from '@utils/fetcher';

const baseUrl = '/api';

export const QUERY_KEYS = {
  lobbyGames: 'lobbyGames',
  lobbyGameFilters: 'lobbyGameFilters',
};

export type GetLobbyGamesPageParams = {
  limit: number;
  offset: number;
  filter: {
    provider?: string;
    categoryIds: string[];
  };
};

export type GetGamesByExternalIdPageParams = {
  limit: number;
  offset: number;
  gameExternalIds: string[] | undefined;
};

export const getLobbyGames = ({ pageParam }: { pageParam: GetLobbyGamesPageParams }) => {
  const { limit, offset, filter } = pageParam;
  const queryParams = new URLSearchParams({ limit: String(limit), offset: String(offset) });

  filter.provider && queryParams.append('provider', filter.provider);
  filter.categoryIds.length && filter.categoryIds.forEach((id) => queryParams.append('categoryIds', id));

  return get<Lobby.LobbyGamesResponse>(`${baseUrl}/lobby/games?${queryParams.toString()}`);
};

export const getUserRecentlyGames = ({ pageParam }: { pageParam: GetGamesByExternalIdPageParams }) => {
  const { limit, offset, gameExternalIds } = pageParam;
  const queryParams = new URLSearchParams({ limit: String(limit), offset: String(offset) });

  if (gameExternalIds && gameExternalIds?.length > 0) {
    gameExternalIds.forEach((id) => queryParams.append('gameExternalIds', id));
  }

  return get<Lobby.GamesByExternalIdResponse>(`${baseUrl}/lobby/gamesByExternalId?${queryParams.toString()}`);
};

export const getLobbyGameFilters = () => get<Lobby.LobbyGameFiltersResponse>(`${baseUrl}/lobby/gameFilters`);

export const getPromotions = () => get<Lobby.PromotionResponse>(`${baseUrl}/lobby/promotions`);

export const getGameInfo = ({ gameId }: { gameId: string }) => get<GameDetailsResponse>(`${baseUrl}/game/${gameId}`);

export const getGameLeaderboard = ({ gameId }: GameLeaderboardRequest) =>
  get<GameLeaderboardResponse>(`${baseUrl}/game/${gameId}/leaderboard`);
