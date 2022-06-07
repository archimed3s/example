import { playersApi } from '@api/lib/core';
import { apiRouteHandler, authMiddleware, composeMiddleware } from '@api/middleware';
import { PlayerEligibleBonus } from '@sharedTypes/api/player';

/**
 * @swagger
 * /api/player/eligibleBonuses:
 *  get:
 *    tags: ["Player"]
 *    description: Get bonus campaigns available for the player
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
 *                    autoforfeitMaxAmount:
 *                      type: string
 *                    awardMaxAmount:
 *                      type: string
 *                    betMaxAmount:
 *                      type: string
 *                    bonusId:
 *                      type: number
 *                    bonusName:
 *                      type: string
 *                    createdAt:
 *                      type: string
 *                    currencyId:
 *                      type: string
 *                    depositMinAmount:
 *                      type: string
 *                    depositNumber:
 *                      type: number
 *                    endsAt:
 *                      type: string
 *                    expiresInDays:
 *                      type: number
 *                    maxReceivedCount:
 *                      type: number
 *                    maxReceivedResetInDays:
 *                      type: number
 *                    productTypeId:
 *                      type: number
 *                    rewardPercent:
 *                      type: number
 *                    rewardType:
 *                      type: string
 *                    startsAt:
 *                      type: string
 *                    storyBlockId:
 *                      type: string
 *                    triggerDescription:
 *                      type: string
 *                    triggerName:
 *                      type: string
 *                    triggerTypeId:
 *                      type: number
 *                    utcOffset:
 *                      type: number
 *                    wagerMultiplier:
 *                      type: number
 */
export default apiRouteHandler({
  get: composeMiddleware<PlayerEligibleBonus[]>()([authMiddleware()], async (req, res) => {
    const playerEligibleBonuses = await playersApi.getPlayerEligibleBonuses(req.session.player.playerId, {
      // TODO: add triggerType parameter
    });
    const result: PlayerEligibleBonus[] = playerEligibleBonuses.data;

    res.status(200).json(result);
  }),
});
