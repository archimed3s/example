import { usersApi } from '@api/lib/core';
import { apiRouteHandler, bodyDecodeMiddleware, composeMiddleware } from '@api/middleware';
import { Auth } from '@sharedTypes/api';
import { changePasswordRequest } from '@sharedTypes/api/auth';

/**
 * @swagger
 * /api/auth/changePassword:
 *   post:
 *     tags: ["Auth"]
 *     description: Change user password by token
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *               token:
 *                 type: string
 *             required:
 *             - newPassword
 *             - token
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   playerId: string
 */
export default apiRouteHandler({
  post: composeMiddleware<Auth.ChangePasswordResponse>()(
    [bodyDecodeMiddleware(changePasswordRequest)],
    async (req, res) => {
      const data = req.body;

      const axiosResponse = await usersApi.changePassword({
        token: data.token,
        newPassword: data.newPassword,
      });

      res.status(200).json({
        playerId: axiosResponse.data.playerId,
      });
    },
  ),
});
