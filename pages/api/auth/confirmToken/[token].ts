import type { NextApiRequest, NextApiResponse } from 'next';

import { authenticationApi } from '@api/lib/core';
import { apiRouteHandler } from '@api/middleware';
import { Auth } from '@sharedTypes/api';
import { getClientIp } from '@utils/api-utils';

/**
 * @swagger
 * /api/auth/confirmToken/{token}:
 *   post:
 *     tags: ["Auth"]
 *     description: Confirm signup token
 *     parameters:
 *       - name: token
 *         in: path
 *         schema:
 *           title: Confirmation token
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 */
export default apiRouteHandler({
  post: async (req: NextApiRequest, res: NextApiResponse<Auth.ConfirmTokenResponse>) => {
    const { token } = req.query as { token: string };

    const axiosResponse = await authenticationApi.confirmToken({
      token: token,
      registrationIP: getClientIp(req),
    });

    res.status(200).json({ email: axiosResponse.data.email });
  },
});
