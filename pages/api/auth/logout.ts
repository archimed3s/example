import type { NextApiRequest, NextApiResponse } from 'next';

import { siteSessionsApi } from '@api/lib/core';
import { apiRouteHandler } from '@api/middleware';
import { getSiteId } from '@utils/api-utils';

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: ["Auth"]
 *     description: Logout user session
 *     responses:
 *       204:
 *         description: Successful
 */
export default apiRouteHandler({
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    // Invalidate core web session
    if (req.session.siteSessionToken) {
      await siteSessionsApi.invalidateSiteSession({
        token: req.session.siteSessionToken,
        siteId: getSiteId(),
      });
    }
    req.session.destroy();
    res.status(204).end();
  },
});
