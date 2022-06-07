import * as t from 'io-ts';

import { LobbyGameStartMode } from '@sharedTypes/Game';
import { fromEnum, numberString, urlArray } from '@utils/io-ts';

export enum OrderBy {
  Id = 'id',
  Name = 'name',
  Provider = 'provider',
}

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export const lobbyGameRequest = t.intersection([
  t.strict({
    limit: numberString,
    offset: numberString,
  }),
  t.partial({
    provider: t.string,
    categoryIds: urlArray.pipe(t.array(numberString)),
    name: t.string,
    orderBy: fromEnum('OrderBy', OrderBy),
    orderDirection: fromEnum('OrderDirection', OrderDirection),
  }),
]);
export type LobbyGameRequest = t.TypeOf<typeof lobbyGameRequest>;

export type Game = {
  id: number;
  externalGameId: string;
  name: string;
  description: string;
  operatorHandle: string;
  providerHandle: string;
  gameCategoryIds: number[];
  thumbnailUrl: string;
  backgroundUrl: string | null;
  slug: string;
};

export type LobbyGamesResponse = {
  games: Game[];
  count: number;
};

export type GamesByExternalIdResponse = {
  games: Game[];
};

type GameCategory = {
  id: number;
  name: string;
  description: string;
  isActive: boolean | null;
  parentCategory: number | null;
  slug: string;
};

type GameOperatorProvider = {
  id: string;
};

export type LobbyGameFiltersResponse = {
  categories: GameCategory[];
  providers: GameOperatorProvider[];
};

export const lobbyGameStartRequest = t.strict({
  gameExternalId: t.string,
  mode: fromEnum('LobbyGameStartMode', LobbyGameStartMode),
});
export type LobbyGameStartRequest = t.TypeOf<typeof lobbyGameStartRequest>;

export type LobbyGameStartResponse = {
  url: string | null;
};

export const promoLayouts = t.union([t.literal('depositForm'), t.literal('button'), t.literal('banner')]);
export type PromoLayout = t.TypeOf<typeof promoLayouts>;

export type PromoImages = {
  desktop: {
    url: string;
    alt: string;
  };
  tablet: {
    url: string;
    alt: string;
  };
  mobile: {
    url: string;
    alt: string;
  };
};

export type Promotion = {
  id: string;
  title: string;
  triggerType: string;
  images: PromoImages;
  promoLayout: PromoLayout;
  depositMinAmount: number;
  currency: string;
  promotionDetailsPageSlug: string;
};

export type PromotionResponse = {
  promos: Promotion[];
};
