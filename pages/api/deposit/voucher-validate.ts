import { paymentiqApi } from '@api/lib/paymentiq';
import { apiRouteHandler, authMiddleware, bodyDecodeMiddleware, composeMiddleware } from '@api/middleware';
import { Payment } from '@sharedTypes/api';
import { validateVoucherRequest } from '@sharedTypes/api/payment';

/**
 * @swagger
 * /api/deposit/voucher-validate:
 *   post:
 *     tags: ["Deposit"]
 *     description: Validate voucher code
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               provider:
 *                 type: string
 *               code:
 *                 type: string
 *             required:
 *               - provider
 *               - code
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 amount:
 *                   type: string
 *                 currencyId:
 *                   type: string
 *                 result:
 *                   type: string
 *                 resultDescription:
 *                   type: string
 *                 status:
 *                   type: string
 *      400:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: string
 *                message:
 *                  type: string
 */
export default apiRouteHandler({
  post: composeMiddleware<Payment.ValidateVoucherResponse>()(
    [authMiddleware(), bodyDecodeMiddleware(validateVoucherRequest)],
    async (req, res) => {
      const { provider, code } = req.body;

      switch (provider) {
        case 'paymentiq_flexepin':
          return res.status(200).json((await paymentiqApi.flexepinVoucherValidatePost({ pin: code })).data);
        default:
          return res.status(400).json({
            code: 'WrongParameters',
            message: 'Unknown voucher provider',
          });
      }
    },
  ),
});
