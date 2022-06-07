import { apiRouteHandler, authMiddleware, composeMiddleware } from '@api/middleware';
import { PlayerPaymentCard } from '@sharedTypes/api/player';

/**
 * @swagger
 * /api/player/paymentCards:
 *   get:
 *     tags: ["Player"]
 *     description: Get player payment cards
 *     parameters:
 *      - in: query
 *        name: paymentProviderId
 *        schema:
 *          type: string
 *        required: true
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               title: PaymentCardsResponse
 *               properties:
 *                 cardHolder:
 *                  title: Card holder name
 *                  type: string
 *                 maskedCardNumber:
 *                  title: Masked card number
 *                  type: string
 *                 currency:
 *                  title: Currency code
 *                  type: string
 *                 expirationYear:
 *                  title: Expiration year
 *                  type: string
 *                 expirationMonth:
 *                  title: Expiration month
 *                  type: string
 *                 externalAccountId:
 *                  title: External account ID
 *                  type: string
 *                 schema:
 *                  title: Card schema
 *                  type: string
 *                 paymentProviderId:
 *                  title: Payment provider ID
 *                  type: string
 */
export default apiRouteHandler({
  get: composeMiddleware<PlayerPaymentCard[]>()([authMiddleware()], async (req, res) => {
    const values = req.query;
    const { player } = req.session;

    const paymentCardsResponse: any = {
      where: {
        AND: [
          { player_id: player.playerId },
          { currency_id: player.currency },
          { payment_provider_id: String(values.paymentProviderId) },
        ],
      },
    };

    return res.status(200).json(
      paymentCardsResponse.map((item: any) => {
        return {
          cardHolder: item.card_holder,
          maskedCardNumber: item.masked_account,
          currency: item.currency_id,
          expirationYear: item.expiry_year,
          expirationMonth: item.expiry_month,
          externalAccountId: item.external_account_id,
          paymentProviderId: item.payment_provider_id,
          schema: item.schema,
        };
      }),
    );
  }),
});
