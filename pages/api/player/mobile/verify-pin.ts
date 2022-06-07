import { playersApi } from '@api/lib/core';
import { apiRouteHandler, authMiddleware, bodyDecodeMiddleware, composeMiddleware } from '@api/middleware';
import { Player } from '@sharedTypes/api';
import { verifyPinRequest } from '@sharedTypes/api/player';

/**
 * @swagger
 * /api/player/mobile/verifyPin:
 *   post:
 *     tags: ["Player"]
 *     description: Verify phone pin
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                phonePin:
 *                  title: phone pin
 *                  type: string
 *              required:
 *                - phonePin
 *     responses:
 *       200:
 *         description: Successful response
 */
export default apiRouteHandler({
  post: composeMiddleware<Player.PlayerInfoResponse>()(
    [authMiddleware(), bodyDecodeMiddleware(verifyPinRequest)],
    async (req, res) => {
      await playersApi.verifyPhoneVerification(req.session.player.playerId, {
        phonePin: req.body.phonePin,
      });

      res.status(200).end();
    },
  ),
});
