import { playersApi } from '@api/lib/core';
import { apiRouteHandler, authMiddleware, composeMiddleware } from '@api/middleware';
import { Player } from '@sharedTypes/api';

/**
 * @swagger
 * /api/player/mobile/requestPin:
 *   post:
 *     tags: ["Player"]
 *     description: Request to validate phone number
 *     responses:
 *       200:
 *         description: Successful response
 */
export default apiRouteHandler({
  post: composeMiddleware<Player.PlayerInfoResponse>()([authMiddleware()], async (req, res) => {
    await playersApi.requestPinVerification(req.session.player.playerId);

    res.status(200).end();
  }),
});
