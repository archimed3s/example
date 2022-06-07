import { Bonus } from '@sharedTypes/api';
import { get, post } from '@utils/fetcher';

const baseUrl = '/api';

export const QUERY_KEYS = {
  getAvailableBonuses: 'getAvailableBonuses',
};

export const getAvailableBonuses = () => get<Bonus.AvailableBonus[]>(`${baseUrl}/bonus/available`);

export const validateBonusCode = (req: Bonus.ApplyBonusRequest) =>
  post<Bonus.ApplyBonusResponse>(`${baseUrl}/bonus/validate`, req);
