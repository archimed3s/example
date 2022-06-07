import { playersApi } from '@api/lib/core';
import { apiRouteHandler, authMiddleware, composeMiddleware } from '@api/middleware';
import { PlayerActiveBonus } from '@sharedTypes/api/player';

/**
 * @swagger
 * /api/player/activeBonuses:
 *  get:
 *    tags: ["Player"]
 *    description: Get active bonus for the player
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          application/json:
 *            schema:
 *              title: Player active bonuses
 *              type: array
 *              items:
 *                schema:
 *                  type: object
 *                  title: Player active bonus information
 *                  properties:
 *                    bonus:
 *                      type: string
 *                    bonusStatus:
 *                      type: string
 *                    cancelledAmount:
 *                      type: string
 *                    convertedAmount:
 *                      type: string
 *                    expiredAmount:
 *                      type: string
 *                    forfeitedAmount:
 *                      type: string
 *                    id:
 *                      type: number
 *                    initialBonus:
 *                      type: string
 *                    playerBonusId:
 *                      type: number
 *                    restrictedAmount:
 *                      type: string
 *                    wagerRequiredAmount:
 *                      type: string
 *                    wagerTotalAmount:
 *                      type: string
 *                    bonusName:
 *                      type: string
 *                    currencyId:
 *                      type: string
 *                    endsAt:
 *                      type: string
 *                    storyBlokId:
 *                      type: string
 */
export default apiRouteHandler({
  get: composeMiddleware<PlayerActiveBonus[]>()([authMiddleware()], async (req, res) => {
    const playerActiveBonuses = await playersApi.getPlayerActivebonuses(req.session.player.playerId);
    const result: PlayerActiveBonus[] = playerActiveBonuses.data;

    res.status(200).json(result);
  }),
});
