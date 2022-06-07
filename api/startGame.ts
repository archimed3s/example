import { Lobby } from '@sharedTypes/api';
import { LobbyGameStartRequest } from '@sharedTypes/api/lobby';
import { post } from '@utils/fetcher';

const baseUrl = '/api';

export const startGame = ({ startParams }: { startParams: LobbyGameStartRequest }) => {
  const { mode, gameExternalId } = startParams;

  const body = {
    mode,
    gameExternalId,
  };

  return post<Lobby.LobbyGameStartResponse>(`${baseUrl}/lobby/start`, body);
};
