import { playersApi } from '@api/lib/core';
import { apiRouteHandler, authMiddleware, composeMiddleware } from '@api/middleware';

/**
 * @swagger
 * /api/player/addGameToFavourites:
 *   post:
 *     tags: ["Player"]
 *     description: Add a game to player's favourites
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                gameId:
 *                  title: Game ID
 *                  type: number
 *     responses:
 *       204:
 *         description: Successful response
 */
export default apiRouteHandler({
  post: composeMiddleware()([authMiddleware()], async (req, res) => {
    const gameId = req.body.gameId;

    await playersApi.addPlayerGameFavourites(req.session.player.playerId, {
      gameId,
    });

    res.status(204).end();
  }),
});
