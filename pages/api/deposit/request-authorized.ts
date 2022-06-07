import { paymentiqApi } from '@api/lib/paymentiq';
import { apiRouteHandler, authMiddleware, composeMiddleware } from '@api/middleware';
import { PaymentIQDepositResponse } from '@lib/payment-client';

/**
 * @swagger
 * /api/deposit/request/authorized:
 *   post:
 *     tags: ["Deposit"]
 *     description: Request deposit via PaymentIQ checkout with specific card id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bonusId:
 *                 type: number
 *               amount:
 *                 type: string
 *               encCvv:
 *                 type: string
 *               paymentAccountId:
 *                 type: string
 *               paymentProviderId:
 *                 type: string
 *               currency:
 *                 type: string
 *               playerId:
 *                 type: string
 *             required:
 *               - amount
 *               - encCvv
 *               - paymentAccountId
 *               - paymentProviderId
 *               - currency
 *               - playerId
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 url:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     html:
 *                       type: string
 *                     method:
 *                       type: string
 *                     parameters:
 *                       type: object
 *                     url:
 *                       type: string
 */
export default apiRouteHandler({
  post: composeMiddleware<PaymentIQDepositResponse>()([authMiddleware()], async (req, res) => {
    const values = req.body;

    const response = await paymentiqApi.paymentiqDepositRequestAuthorizedPost({
      bonusId: values.bonusId,
      amount: values.amount,
      encCvv: values.encCvv,
      paymentAccountId: values.paymentAccountId,
      paymentProviderId: values.paymentProviderId,
      currency: req.session.player.currency,
      playerId: req.session.player.playerId,
    });

    res.status(200).json(response.data);
  }),
});
