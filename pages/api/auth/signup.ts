import { authenticationApi } from '@api/lib/core';
import { apiRouteHandler, bodyDecodeMiddleware, composeMiddleware } from '@api/middleware';
import { signupRequest } from '@sharedTypes/api/auth';
import { getClientIp, getReferrer, getSiteId, getUserAgent } from '@utils/api-utils';

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags: ["Auth"]
 *     description: Signup new player
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               currency:
 *                 type: string
 *               displayName:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - currency
 *               - displayName
 *     responses:
 *       200:
 *         description: Successful
 */
export default apiRouteHandler({
  post: composeMiddleware()([bodyDecodeMiddleware(signupRequest)], async (req, res) => {
    const data = req.body;

    const site: any = {
      where: {
        id: getSiteId(),
      },
    };

    if (site === null) {
      return res.status(404).json({
        code: 'SiteNotFound',
        message: 'Site not found',
      });
    }

    await authenticationApi.signup({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      languageId: site.default_language_id,
      siteId: site.id,
      countryId: data.countryId,
      currencyId: data.currency,
      ipAddress: getClientIp(req),
      userAgent: getUserAgent(req),
      referrer: getReferrer(req),
      displayName: data.displayName,
      genderId: data.genderId,
      dateOfBirth: data.dateOfBirth,
    });

    res.status(200).end();
  }),
});
