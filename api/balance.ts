import { PlayerBalance } from '@sharedTypes/api/player';
import { get } from '@utils/fetcher';

const baseUrl = '/api';

export const QUERY_KEYS = {
  balance: 'balance',
};
export const fetchBalance = () => get<PlayerBalance>(`${baseUrl}/player/balance`);
