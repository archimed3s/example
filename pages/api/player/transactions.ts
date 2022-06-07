import { apiRouteHandler, authMiddleware, composeMiddleware } from '@api/middleware';
import { Player } from '@sharedTypes/api';
import { PlayerTransaction, PlayerTransactionStatus } from '@sharedTypes/api/player';

const parseInteger = (value: unknown) => {
  const parsed = parseInt(String(value));
  return !isNaN(parsed) ? parsed : undefined;
};

const parseDate = (value: unknown) => {
  const parsed = new Date(String(value));
  return !isNaN(parsed.getTime()) ? parsed : undefined;
};

const parseString = (value: unknown) => {
  return typeof value === 'string' ? value : undefined;
};

/**
 * @swagger
 * /api/player/transaction:
 *  get:
 *    tags: ["Player"]
 *    description: Get player transactions list
 *    parameters:
 *      - in: query
 *        name: after
 *        type: string
 *        title: Filter transactions after certain date
 *      - in: query
 *        name: currency
 *        type: string
 *        title: Filter transactions by certain currency
 *      - in: query
 *        name: type
 *        type: string
 *        title: Filter transactions by certain payment type (withdrawal or deposit)
 *      - in: query
 *        name: limit
 *        type: number
 *        required: true
 *      - in: query
 *        name: offset
 *        type: number
 *        required: true
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                title: Transaction ID
 *                type: string
 *              status:
 *                title: Transaction status (pending, cancelled, confirmed)
 *                type: string
 *              amount:
 *                title: Transaction amount
 *                type: number
 *              currency:
 *                title: Transaction currency
 *                type: string
 *              createdAt:
 *                title: Transaction creation date (ISO format)
 *                type: string
 *              info:
 *                title: Additional transaction info
 *                type: string
 *    responses:
 *      200:
 *        description: Successful
 */
export default apiRouteHandler({
  get: composeMiddleware<Player.PlayerTransaction[]>()([authMiddleware()], async (req, res) => {
    const query = {
      limit: parseInteger(req.query.limit) ?? 5,
      offset: parseInteger(req.query.offset) ?? 0,
      after: parseDate(req.query.after),
      currency: parseString(req.query.currency),
      type: parseString(req.query.type),
    };

    const paymentHistory: any = {
      where: {
        player_id: req.session.player.playerId,
        payment_type: query.type,
        currency_id: query.currency,
        created_at: {
          gt: query.after,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: query.limit,
      skip: query.offset,
    };

    const getDepositStatus = (transactionStatus: string): PlayerTransactionStatus => {
      if (transactionStatus === 'funded') {
        return 'confirmed';
      }

      if (transactionStatus === 'blocked') {
        return 'cancelled';
      }

      return 'pending';
    };

    const getWithdrawalStatus = (transactionStatus: string): PlayerTransactionStatus => {
      if (transactionStatus === 'approved' || transactionStatus === 'executed') {
        return 'confirmed';
      }

      if (transactionStatus === 'canceled' || transactionStatus === 'failed' || transactionStatus === 'rejected') {
        return 'cancelled';
      }

      return 'pending';
    };

    const playerTransactions: PlayerTransaction[] = paymentHistory.map((historyItem, index) => ({
      id: historyItem.created_at?.getTime() ?? index,
      amount: Number(historyItem.amount),
      currency: historyItem.currency_id,
      status:
        historyItem.payment_type === 'deposit'
          ? getDepositStatus(historyItem.status)
          : getWithdrawalStatus(historyItem.status),
      createdAt: historyItem.created_at?.toISOString() ?? null,
      info: null,
    }));

    res.status(200).json(playerTransactions);
  }),
});
