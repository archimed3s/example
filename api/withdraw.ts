import { routeService } from '@common/services/RouteService';
import { Payment } from '@sharedTypes/api';
import { post } from '@utils/fetcher';

export const withdraw = (data: Payment.WithdrawalRequest) => post(routeService().api.withdrawal(), data);
