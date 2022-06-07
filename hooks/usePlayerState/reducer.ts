import { Reducer } from 'react';

import { Player } from '@sharedTypes/Player';
import { PlayerBalance } from '@sharedTypes/api/player';

export type State = {
  player: Player | null;
  balance: PlayerBalance | null;
  gameLoadedAt: number;
};
export const initialState: State = {
  player: null,
  balance: null,
  gameLoadedAt: 0,
};

export const setPlayer = (player: Player) =>
  ({
    type: 'setPlayer',
    payload: { player },
  } as const);

export const updatePlayer = (player: Player) =>
  ({
    type: 'updatePlayer',
    payload: { player },
  } as const);

export const resetPlayer = {
  type: 'resetPlayer',
} as const;

export const setBalance = (balance: PlayerBalance) =>
  ({
    type: 'setBalance',
    payload: { balance },
  } as const);

export const setGameLoadedAt = (gameLoadedAt: number) =>
  ({
    type: 'setGameLoadedAt',
    payload: { gameLoadedAt },
  } as const);

export type Action =
  | ReturnType<typeof setPlayer>
  | ReturnType<typeof updatePlayer>
  | ReturnType<typeof setBalance>
  | ReturnType<typeof setGameLoadedAt>
  | typeof resetPlayer;

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setPlayer':
      return {
        ...state,
        player: action.payload.player,
      };
    case 'updatePlayer':
      return {
        ...state,
        player: { ...state.player, ...action.payload.player },
      };
    case 'resetPlayer':
      return {
        ...state,
        player: null,
        balance: null,
      };
    case 'setBalance':
      return {
        ...state,
        balance: action.payload.balance,
      };
    case 'setGameLoadedAt':
      return {
        ...state,
        gameLoadedAt: action.payload.gameLoadedAt,
      };
    default:
      return state;
  }
};
