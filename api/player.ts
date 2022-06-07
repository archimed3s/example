import { routeService } from '@common/services/RouteService';
import { Player, PlayerConsentValues } from '@sharedTypes/Player';
import { ServerError } from '@sharedTypes/ServerError';
import { Player as PlayerApi } from '@sharedTypes/api';
import {
  ChangePersonalInformationRequest,
  PlayerActiveBonus,
  PlayerEligibleBonus,
  PlayerPaymentCard,
  PlayerTransaction,
  RecentlyGamesResponse,
} from '@sharedTypes/api/player';
import { get, post } from '@utils/fetcher';

export const QUERY_KEYS = {
  player: 'player',
  paymentCards: 'paymentCards',
};

export const fetchPlayer = () => get<Player>(routeService().api.player.fetchPlayer());

export const fetchPlayerPaymentCards = (paymentProviderId: string) =>
  get<PlayerPaymentCard[] | ServerError>(routeService().api.player.getPlayerPaymentCards(), {
    params: { paymentProviderId },
  });

export const changePlayerConsents = (consentValues: PlayerConsentValues): Promise<Player> =>
  post<Player>(routeService().api.player.changePlayerConsents(), consentValues);

export const changePlayerInformation = (playerValues: ChangePersonalInformationRequest) =>
  post<Player>(routeService().api.player.changePlayerInformation(), playerValues);

export const fetchPlayerTransactions = () => get<PlayerTransaction[]>(routeService().api.getPlayerTransactions());

export const submitKycApplications = (req: PlayerApi.KycApplicationRequest) =>
  post<void>(routeService().api.player.submitKycApplications(), req);

export const fetchPlayerActiveBonuses = () => get<PlayerActiveBonus[]>(routeService().api.player.activeBonuses());

export const fetchPlayerEligibleBonuses = () => get<PlayerEligibleBonus[]>(routeService().api.player.eligibleBonuses());

export const fetchRecentlyPlayedGames = ({ playerId }: { playerId: number }) => {
  return get<RecentlyGamesResponse>(routeService().api.player.recentlyPlayedGames(playerId));
};
