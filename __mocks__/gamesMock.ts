import { Lobby } from '@sharedTypes/api';

export const createFakeLobbyGameResponse = (props: Partial<Lobby.LobbyGamesResponse>): Lobby.LobbyGamesResponse => ({
  games: [],
  count: 0,
  ...props,
});

export const createFakeLobbyGameFiltersResponse = (
  props: Partial<Lobby.LobbyGameFiltersResponse>,
): Lobby.LobbyGameFiltersResponse => ({
  categories: [],
  providers: [
    { id: 'onetouch' },
    { id: 'evolution' },
    { id: 'habanero' },
    { id: 'blueprint' },
    { id: 'playson' },
    { id: 'betsoft' },
    { id: 'tomhorn' },
    { id: 'quickspin' },
    { id: 'thunderkick' },
    { id: 'spinmatic' },
    { id: 'amatic' },
    { id: 'gameart' },
  ],
  ...props,
});

export const createFakeGame = (id: number, props: Partial<Lobby.Game>): Lobby.Game => ({
  id,
  externalGameId: 'test',
  name: `test${id}` || 'test',
  providerHandle: +id % 2 === 0 ? 'amatic' : 'tomhorn',
  description: '',
  operatorHandle: '',
  gameCategoryIds: [],
  thumbnailUrl: '',
  backgroundUrl: '',
  slug: 'wild-spin',
  ...props,
});
