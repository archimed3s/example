import { apiRouteHandler, authMiddleware, composeMiddleware } from '@api/middleware';
import { PaymentiqConfigBff } from '@sharedTypes/Payment';
import { getSiteId } from '@utils/api-utils';

/**
 * @swagger
 * /api/deposit/paymentiqConfig:
 *   get:
 *     tags: ["Deposit"]
 *     description: Get Paymentiq config
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               title: PaymentIQConfigResponse
 *               properties:
 *                 merchantId:
 *                  title: Merchant ID
 *                  type: string
 *                 site_id:
 *                  title: Site ID
 *                  type: string
 *                 api_url:
 *                  title: API URL
 *                  type: string
 *                 api_token:
 *                  title: API Token
 *                  type: string
 *                 success_url:
 *                  title: Success URL
 *                  type: string
 *                 failure_url:
 *                  title: Failure URL
 *                  type: string
 */
export default apiRouteHandler({
  get: composeMiddleware<PaymentiqConfigBff>()([authMiddleware()], async (req, res) => {
    const paymentiqConfig: any = { where: { site_id: getSiteId() } };

    if (paymentiqConfig === null) {
      return res.status(422).json({ code: '422', message: 'No data found' });
    }

    res.status(200).json({
      merchantId: paymentiqConfig.merchant_id,
      apiUrl: paymentiqConfig.api_url,
    });
  }),
});
