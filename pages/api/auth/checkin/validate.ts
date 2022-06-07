import { authenticationApi } from '@api/lib/core';
import { apiRouteHandler, bodyDecodeMiddleware, composeMiddleware } from '@api/middleware';
import { checkinValidateRequest } from '@sharedTypes/api/auth';
import { getSiteId } from '@utils/api-utils';

/**
 * @swagger
 * /api/auth/checkin/validate:
 *   post:
 *     tags: ["Auth"]
 *     description: Checkin signup user validate
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               country:
 *                 type: string
 *               displayName:
 *                 type: string
 *               currency:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful
 */
export default apiRouteHandler({
  post: composeMiddleware()([bodyDecodeMiddleware(checkinValidateRequest)], async (req, res) => {
    const data = req.body;
    await authenticationApi.checkinValidate({
      email: data.email,
      country: data.country,
      currency: data.currency,
      displayName: data.displayName,
      siteId: getSiteId(),
    });

    res.status(200).end();
  }),
});
