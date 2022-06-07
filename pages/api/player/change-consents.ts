import { playersApi } from '@api/lib/core';
import { apiRouteHandler, authMiddleware, bodyDecodeMiddleware, composeMiddleware } from '@api/middleware';
import { Player } from '@sharedTypes/api';
import { changeConsentsRequest } from '@sharedTypes/api/player';
import { getPlayerInfoResponse } from '@utils/api-models';

/**
 * @swagger
 * /api/player/changeConsents:
 *   post:
 *     tags: ["Player"]
 *     description: Change consents
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                enableSmsSubscription:
 *                  title: Enable Sms Subscription
 *                  type: boolean
 *                enableEmailSubscription:
 *                  title: Enable Email Subscription
 *                  type: boolean
 *                consentPhone:
 *                  title: enable Consent Phone
 *                  type: boolean
 *                consentPostmail:
 *                  title: Enable Consent Postmail
 *                  type: boolean
 *                consentPush:
 *                  title: Enable Consent Push
 *                  type: boolean
 *              required:
 *              - enableSmsSubscription
 *              - enableEmailSubscription
 *              - consentPhone
 *              - consentPostmail
 *              - consentPush
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               title: PlayerInfo
 *               properties:
 *                 playerId:
 *                  title: Player
 *                  type: integer
 *                 externalPlayerId:
 *                  title: External Player ID
 *                  type: string
 *                 email:
 *                  title: Amount player can withdraw
 *                  type: string
 *                 agreementTermsAccepted:
 *                  title: Agreement terms accepted
 *                  type: boolean
 *                 subscriptionSmsEnabled:
 *                  title: Subscription sms
 *                  type: boolean
 *                 subscriptionEmailEnabled:
 *                  title: Subscription email
 *                  type: boolean
 *                 consentPhone:
 *                  title: consent phone
 *                  type: boolean
 *                 consentPostmail:
 *                  title: Consent postmail
 *                  type: boolean
 *                 consentPush:
 *                  title: Consent push
 *                  type: boolean
 */
export default apiRouteHandler({
  post: composeMiddleware<Player.PlayerInfoResponse>()(
    [authMiddleware(), bodyDecodeMiddleware(changeConsentsRequest)],
    async (req, res) => {
      const response = await playersApi.changePlayerConsents(req.session.player.playerId, {
        enableEmailSubscription: !!req.body.enableEmailSubscription,
        enableSmsSubscription: !!req.body.enableSmsSubscription,
        consentPhone: !!req.body.consentPhone,
        consentPostmail: !!req.body.consentPostmail,
        consentPush: !!req.body.consentPush,
      });

      res.status(200).json(getPlayerInfoResponse(response.data));
    },
  ),
});
