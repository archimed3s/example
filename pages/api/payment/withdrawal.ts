import { paymentiqApi } from '@api/lib/paymentiq';
import { apiRouteHandler, authMiddleware, bodyDecodeMiddleware, composeMiddleware } from '@api/middleware';
import { withdrawalRequest } from '@sharedTypes/api/payment';

/**
 * @swagger
 * /api/payment/withdrawal:
 *  post:
 *    tags: ["Payment"]
 *    description: Withdraw funds from the site
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 title: Amount to withdraw
 *                 type: string
 *               currency:
 *                 title: Currency
 *                 type: string
 *               externalCardId:
 *                 title: External card ID
 *                 type: string
 *               paymentProviderId:
 *                 title: Payment provider ID
 *                 type: string
 *             required:
 *             - amount
 *             - currency
 *             - externalCardId
 *    responses:
 *      200:
 *        description: Successful
 */

export default apiRouteHandler({
  post: composeMiddleware()([authMiddleware(), bodyDecodeMiddleware(withdrawalRequest)], async (req, res) => {
    const data = req.body;

    const withdrawalResponse = await paymentiqApi.paymentiqWithdrawalRequestPost({
      amount: data.amount,
      currency: data.currency,
      externalCardID: data.externalCardId,
      playerId: req.session.player.playerId,
      paymentProviderId: data.paymentProviderId,
    });

    res.status(withdrawalResponse.status).end();
  }),
});
