import { apiRouteHandler, authMiddleware, composeMiddleware } from '@api/middleware';
import { Player, PlayerRuleId } from '@sharedTypes/Player';

/**
 * @swagger
 * /api/player:
 *   get:
 *     tags: ["Player"]
 *     description: Get current player profile data
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 displayName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 countryId:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 phoneCode:
 *                   type: string
 *                 address:
 *                   type: string
 *                 gender:
 *                   type: string
 *                 zipCode:
 *                   type: string
 *                 dateOfBirth:
 *                   type: string
 *                 languageId:
 *                   type: string
 *                 isVerified:
 *                   type: boolean
 *                 playerPermissions:
 *                   type: array
 *                   items:
 *                     type: string
 */
export default apiRouteHandler({
  get: composeMiddleware<Player>()([authMiddleware()], async (req, res) => {
    const player = req.session.player;
    const playerDetails: any = { where: { id: player.playerId } };

    if (!playerDetails) {
      return res.status(404).json({
        code: 'PlayerNotFound',
        message: 'Player not found',
      });
    }

    res.status(200).json({
      playerId: Number(playerDetails.id),
      externalPlayerId: playerDetails.external_id,
      firstName: playerDetails.first_name,
      lastName: playerDetails.last_name,
      displayName: playerDetails.display_name,
      email: playerDetails.email,
      countryId: playerDetails.country_id,
      phoneNumber: playerDetails.phone_number,
      dateOfBirth: playerDetails.date_of_birth?.toDateString() || '',
      languageId: playerDetails.language_id,
      isVerified: playerDetails.player_rules.includes(PlayerRuleId.KycVerified),
      playerPermissions: playerDetails.player_permissions,
      phoneCode: playerDetails.phone_prefix,
      street: playerDetails.street,
      gender: playerDetails.gender_id,
      zipCode: playerDetails.postal_code,
      currency: playerDetails.base_currency_id,
      agreementTermsAccepted: playerDetails.agreement_accepted,
      subscriptionSmsEnabled: playerDetails.subscription_sms_enabled,
      subscriptionEmailEnabled: playerDetails.subscription_email_enabled,
      consentPhone: playerDetails.consent_phone,
      consentPostmail: playerDetails.consent_postmail,
      consentPush: playerDetails.consent_push,
      externalToken: player.externalToken,
    });
  }),
});
