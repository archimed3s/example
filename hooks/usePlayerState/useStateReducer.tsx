import {
  Dispatch,
  PropsWithChildren,
  ReducerAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { useQuery } from 'react-query';

import { logoutUser } from '@api/auth';
import { QUERY_KEYS, fetchBalance } from '@api/balance';
import { fetchPlayer } from '@api/player';
import { useFastTrackConnection } from '@hooks/useFastTrackConnection';
import { useIsMounted } from '@hooks/useIsMounted';
import { Player } from '@sharedTypes/Player';
import noop from '@utils/noop';

import {
  Action,
  State,
  initialState,
  reducer,
  resetPlayer,
  setBalance,
  setGameLoadedAt,
  setPlayer,
  updatePlayer,
} from './reducer';

type ContextValue = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const UserStateContext = createContext<ContextValue>({
  state: initialState,
  dispatch: noop,
});

type ProviderProps = PropsWithChildren<{ currentPlayer?: Player | null }>;
export const PlayerStateReducerProvider = ({ children, currentPlayer }: ProviderProps) => {
  const isMounted = useIsMounted();
  const [state, dispatch] = useReducer(reducer, { ...initialState, player: currentPlayer ?? null });

  const asyncDispatch = useCallback(
    <Action extends ReducerAction<typeof reducer>>(action: Action) => {
      if (isMounted.current) {
        return dispatch(action);
      }
    },
    [isMounted],
  );

  return <UserStateContext.Provider value={{ state, dispatch: asyncDispatch }}>{children}</UserStateContext.Provider>;
};

const PlayerStateUpdater = ({ children }: PropsWithChildren<object>) => {
  const { state, dispatch } = useContext(UserStateContext);

  useEffect(() => {
    fetchPlayer()
      .then((player) => dispatch(setPlayer(player)))
      .catch(() => dispatch(resetPlayer));
  }, [dispatch]);

  useQuery([QUERY_KEYS.balance], fetchBalance, {
    enabled: Boolean(state.player),
    onSuccess: (data) => dispatch(setBalance(data)),
  });

  return <>{children}</>;
};

export const PlayerStateProvider = ({ children, currentPlayer }: ProviderProps) => {
  return (
    <PlayerStateReducerProvider currentPlayer={currentPlayer}>
      <PlayerStateUpdater>{children}</PlayerStateUpdater>
    </PlayerStateReducerProvider>
  );
};

export const usePlayerStateActions = () => {
  const { dispatch } = useContext(UserStateContext);
  const { disconnect } = useFastTrackConnection();

  return useMemo(
    () => ({
      setPlayer: (player: Player) => dispatch(setPlayer(player)),
      updatePlayer: (player: Player) => dispatch(updatePlayer(player)),
      resetPlayer: () =>
        logoutUser().then(() => {
          dispatch(resetPlayer);
          disconnect();
        }),
      refetchBalance: () => fetchBalance().then((balance) => dispatch(setBalance(balance))),
      setGameLoadedAt: (value: number) => dispatch(setGameLoadedAt(value)),
    }),
    [disconnect, dispatch],
  );
};

export const usePlayerState = () => {
  const { state } = useContext(UserStateContext);
  return state;
};
