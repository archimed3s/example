import { apiRouteHandler, authMiddleware, composeMiddleware } from '@api/middleware';
import { PlayerBalance } from '@sharedTypes/api/player';

/**
 * @swagger
 * /api/player/balance:
 *   get:
 *     tags: ["Player"]
 *     description: Get player balance
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               title: BalanceResponse
 *               properties:
 *                 totalAmount:
 *                  title: Total amount of player balance
 *                  type: string
 *                 totalBonusAmount:
 *                  title: Total amount of player bonus balance
 *                  type: string
 *                 withdrawableAmount:
 *                  title: Amount player can withdraw
 *                  type: string
 */
export default apiRouteHandler({
  get: composeMiddleware<PlayerBalance>()([authMiddleware()], async (req, res) => {
    const player = req.session.player;
    const balanceResponse: any = {
      where: {
        AND: [{ player_id: player.playerId }, { currency_id: player.currency }],
      },
    };

    if (!balanceResponse) {
      return res.status(422).json({
        code: 'BalanceNotFound',
        message: 'Player balance not found',
      });
    }

    return res.status(200).json({
      totalAmount: String(balanceResponse.total_amount),
      totalBonusAmount: String(balanceResponse.total_bonus_amount),
      withdrawableAmount: String(balanceResponse.withdrawable_amount),
    });
  }),
});
