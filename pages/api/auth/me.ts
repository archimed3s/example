import { apiRouteHandler, authMiddleware, composeMiddleware } from '@api/middleware';

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     tags: ["Auth"]
 *     description: Get current player
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
  get: composeMiddleware()([authMiddleware()], async (req, res) => {
    res.status(200).json(req.session.player);
  }),
});
