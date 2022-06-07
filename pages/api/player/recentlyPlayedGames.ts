import type { NextApiRequest, NextApiResponse } from 'next';

import { apiRouteHandler } from '@api/middleware';
import { ServerError } from '@sharedTypes/ServerError';
import { Player } from '@sharedTypes/api';

/**
 * @swagger
 * /api/player/recentlyPlayedGames:
 *  get:
 *     tags: ["Player"]
 *     description: Get player recently played games list
 *     parameters:
 *      - in: query
 *        name: playerId
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               title: RecentlyPlayedGamesResponse
 *               properties:
 *                 recentlyGames:
 *                  title: List with user recently played games
 *                  type: array
 */

export default apiRouteHandler({
  get: async (req: NextApiRequest, res: NextApiResponse<Player.RecentlyGamesResponse | ServerError>) => {
    const { playerId } = req.query;

    const recentlyPlayedGames: any = {
      where: {
        player_id: Number(playerId),
      },
    };

    res.status(200).json({
      games: recentlyPlayedGames.map((game: any) => {
        return {
          playerId: Number(game.player_id),
          gameProvider: game.game_provider,
          gameExternalId: game.game_external_id,
          playedAt: game.played_at,
          slug: game.slug,
        };
      }),
    });
  },
});
