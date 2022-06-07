import { authenticationApi } from '@api/lib/core';
import { apiRouteHandler, bodyDecodeMiddleware, composeMiddleware } from '@api/middleware';
import { checkInSignUpRequest } from '@sharedTypes/api/auth';
import { getReferrer, getSiteId, getUserAgent } from '@utils/api-utils';

/**
 * @swagger
 * /api/auth/checkin/signup:
 *   post:
 *     tags: ["Auth"]
 *     description: Signup new player with checkIn
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               acceptEmailsOffer:
 *                 type: boolean
 *               acceptPrivacy:
 *                 type: boolean
 *               acceptSmsOffer:
 *                 type: boolean
 *               acceptTermsConditions:
 *                 type: boolean
 *               address:
 *                 type: string
 *               birthdate:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               currency:
 *                 type: string
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               language:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               phonePrefix:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               provinceCode:
 *                 type: string
 *               provinceName:
 *                 type: string
 *               genderId:
 *                 type: string
 *              displayName:
 *                 type: string
 *             required:
 *               - acceptEmailsOffer
 *               - acceptPrivacy
 *               - acceptSmsOffer
 *               - acceptTermsConditions
 *               - address
 *               - birthdate
 *               - city
 *               - country
 *               - currency
 *               - email
 *               - firstName
 *               - lastName
 *               - language
 *               - password
 *               - displayName
 *               - phoneNumber
 *               - phonePrefix
 *               - postalCode
 *               - genderId
 *     responses:
 *       200:
 *         description: Successful
 */
export default apiRouteHandler({
  post: composeMiddleware()([bodyDecodeMiddleware(checkInSignUpRequest)], async (req, res) => {
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

    await authenticationApi.checkinSignup({
      ...data,
      language: site.default_language_id,
      siteId: getSiteId(),
      userAgent: getUserAgent(req),
      referrer: getReferrer(req),
    });

    res.status(200).end();
  }),
});
