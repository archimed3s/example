/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next';

import { slotegratorApi } from '@api/lib/core';
import { apiRouteHandler } from '@api/middleware';
import { ErrorMessage } from '@lib/core-client/api';

/**
 * @swagger
 * /api/operator/slotegrator/selfValidate:
 *   get:
 *     tags: ["operator"]
 *     description: Perform self-validation
 *     responses:
 *       200:
 *         description: Successful response
 */
export default apiRouteHandler({
  get: async (req: NextApiRequest, res: NextApiResponse<undefined | ErrorMessage>) => {
    await slotegratorApi.slotegratorSelfValidate();
    res.status(200).end();
  },
});
