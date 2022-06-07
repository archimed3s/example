import * as t from 'io-ts';

import { LeaderboardItem } from '@sharedTypes/Game';

const gameDetails = t.strict({
  id: t.string,
  gameCategoryIds: t.array(t.number),
  name: t.string,
  providerHandle: t.string,
  thumbnailUrl: t.string,
  isNew: t.boolean,
  isFavourite: t.boolean,
});
export type GameDetails = t.TypeOf<typeof gameDetails>;

export const gameDetailsResponse = t.strict({
  game: gameDetails,
});
export type GameDetailsResponse = t.TypeOf<typeof gameDetailsResponse>;

export const gameLeaderboardRequest = t.strict({
  gameId: t.string,
});
export type GameLeaderboardRequest = t.TypeOf<typeof gameLeaderboardRequest>;

export type GameLeaderboardResponse = {
  players: LeaderboardItem[];
  count: number;
  lastUpdate: string;
};
