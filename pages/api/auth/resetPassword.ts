import { usersApi } from '@api/lib/core';
import { apiRouteHandler, bodyDecodeMiddleware, composeMiddleware } from '@api/middleware';
import { resetPasswordRequest } from '@sharedTypes/api/auth';
import { getSiteId } from '@utils/api-utils';

/**
 * @swagger
 * /api/auth/resetPassword:
 *   post:
 *     tags: ["Auth"]
 *     description: Reset user password
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
export default apiRouteHandler({
  post: composeMiddleware()([bodyDecodeMiddleware(resetPasswordRequest)], async (req, res) => {
    const data = req.body;

    const axiosResponse = await usersApi.resetPassword({
      email: data.email,
      siteId: getSiteId(),
    });

    res.status(200).json({
      token: axiosResponse.data.token,
      email: data.email,
    });
  }),
});
