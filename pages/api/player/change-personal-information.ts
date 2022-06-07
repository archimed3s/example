import { playersApi } from '@api/lib/core';
import { apiRouteHandler, authMiddleware, bodyDecodeMiddleware, composeMiddleware } from '@api/middleware';
import { Player } from '@sharedTypes/api';
import { changePersonalInformationRequest } from '@sharedTypes/api/player';
import { getPlayerInfoResponse } from '@utils/api-models';

/**
 * @swagger
 * /api/player/changePersonalInformation:
 *   post:
 *     tags: ["Player"]
 *     description: Change personal information
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                genderId:
 *                  title: Enable Sms Subscription
 *                  type: string
 *                phoneNumber:
 *                  title: Enable Email Subscription
 *                  type: string
 *                phoneCode:
 *                  title: enable Consent Phone
 *                  type: string
 *                displayName:
 *                  type: string
 *              required:
 *              - genderId
 *              - phoneNumber
 *              - phoneCode
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
 *                 displayName:
 *                  type: string
 */
export default apiRouteHandler({
  post: composeMiddleware<Player.PlayerInfoResponse>()(
    [authMiddleware(), bodyDecodeMiddleware(changePersonalInformationRequest)],
    async (req, res) => {
      const data = req.body;

      const response = await playersApi.changePersonalInformation(req.session.player.playerId, {
        genderId: data.genderId,
        phoneNumber: data.phoneNumber,
        phoneCode: data.phoneCode,
        displayName: data.displayName,
      });

      res.status(200).json(getPlayerInfoResponse(response.data));
    },
  ),
});
