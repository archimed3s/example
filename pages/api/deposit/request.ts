import { paymentiqApi } from '@api/lib/paymentiq';
import { apiRouteHandler, authMiddleware, bodyDecodeMiddleware, composeMiddleware } from '@api/middleware';
import { PaymentIQDepositRequestCryptoCurrencyEnum, PaymentIQDepositResponse } from '@lib/payment-client';
import { Payment } from '@sharedTypes/api';

/**
 * @swagger
 * /api/deposit/request:
 *   post:
 *     tags: ["Deposit"]
 *     description: Request deposit via PaymentIQ checkout
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: string
 *               expiryMonth:
 *                 type: string
 *               expiryYear:
 *                 type: string
 *               encCreditcardNumber:
 *                 type: string
 *               encCvv:
 *                 type: string
 *               cardHolder:
 *                 type: string
 *               currency:
 *                 type: string
 *               playerId:
 *                 type: string
 *               paymentProviderId:
 *                 type: string
 *               cryptoCurrency:
 *                 type: string
 *               voucherNumber:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               bonusId:
 *                 type: string
 *             required:
 *               - amount
 *               - currency
 *               - playerId
 *               - paymentProviderId
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
  post: composeMiddleware<PaymentIQDepositResponse>()(
    [authMiddleware(), bodyDecodeMiddleware(Payment.depositRequest)],
    async (req, res) => {
      const data = req.body;
      const player = req.session.player;

      const response = await paymentiqApi.paymentiqDepositRequestPost({
        currency: player.currency,
        playerId: player.playerId,
        amount: data.amount,
        bonusId: data.bonusId,
        paymentProviderId: data.paymentProviderId,
        expiryMonth: data.expiryMonth,
        expiryYear: data.expiryYear,
        encCreditcardNumber: data.encCreditcardNumber,
        encCvv: data.encCvv,
        cardHolder: data.cardHolder,
        cryptoCurrency: data.cryptoCurrency
          ? PaymentIQDepositRequestCryptoCurrencyEnum[data.cryptoCurrency]
          : undefined,
        phoneNumber: data.phoneNumber,
        voucherNumber: data.voucherNumber,
      });

      res.status(200).json(response.data);
    },
  ),
});
