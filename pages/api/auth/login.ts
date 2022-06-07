import { authenticationApi } from '@api/lib/core';
import { apiRouteHandler, bodyDecodeMiddleware, composeMiddleware } from '@api/middleware';
import { Player } from '@sharedTypes/Player';
import { loginRequest } from '@sharedTypes/api/auth';
import { getClientIp, getSiteId, getUserAgent } from '@utils/api-utils';

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: ["Auth"]
 *     description: Login player
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 playerId:
 *                   type: number
 *                 externalPlayerId:
 *                   type: string
 *                 agreementTermsAccepted:
 *                   type: boolean
 */
export default apiRouteHandler({
  post: composeMiddleware<Player>()([bodyDecodeMiddleware(loginRequest)], async (req, res) => {
    const data = req.body;

    const axiosResponse = await authenticationApi.login({
      email: data.email,
      password: data.password,
      siteId: getSiteId(),
      loginIP: getClientIp(req),
      userAgent: getUserAgent(req),
    });

    const player: Player = {
      playerId: axiosResponse.data.playerId,
      externalPlayerId: axiosResponse.data.externalPlayerId,
      agreementTermsAccepted: axiosResponse.data.agreementTermsAccepted,
      currency: axiosResponse.data.currency,
      firstName: axiosResponse.data.firstName,
      lastName: axiosResponse.data.lastName,
      displayName: axiosResponse.data.displayName ?? null,
      gender: axiosResponse.data.genderId,
      phoneCode: axiosResponse.data.phoneCode,
      phoneNumber: axiosResponse.data.phoneNumber,
      email: axiosResponse.data.email,
      countryId: axiosResponse.data.countryId,
      dateOfBirth: axiosResponse.data.dateOfBirth,
      languageId: axiosResponse.data.languageId,
      isVerified: false,
      playerPermissions: axiosResponse.data.permissions,
      street: axiosResponse.data.street,
      zipCode: axiosResponse.data.postalCode,
      subscriptionEmailEnabled: axiosResponse.data.subscriptionEmailEnabled,
      subscriptionSmsEnabled: axiosResponse.data.subscriptionSmsEnabled,
      consentPhone: axiosResponse.data.consentPhone,
      consentPostmail: axiosResponse.data.consentPostmail,
      consentPush: axiosResponse.data.consentPush,
      externalToken: axiosResponse.data.siteSessionToken,
    };
    req.session.player = player;
    req.session.siteSessionToken = axiosResponse.data.siteSessionToken;

    await req.session.save();

    res.status(200).json(player);
  }),
});
