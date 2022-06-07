import type { NextApiRequest, NextApiResponse } from 'next';

import { apiRouteHandler } from '@api/middleware';
import { ServerError } from '@sharedTypes/ServerError';
import { Lobby } from '@sharedTypes/api';

/**
 * @swagger
 * /api/player/recentlyPlayedGames:
 *  get:
 *     tags: ["Lobby"]
 *     description: Get games list matches the externalIds
 *     parameters:
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        required: true
 *        description: The number of items to return
 *      - in: query
 *        name: offset
 *        schema:
 *          type: integer
 *        description: The number of items to skip before starting to collect the result set
 *      - in: query
 *        name: gameExternalIds
 *        schema:
 *          type: array
 *        description: Array or single entry with game external ids, that will be used to filtering by ids.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               title: GamesByExternalIdResponse
 *               properties:
 *                 games:
 *                  title: Array with game objects matched by external ids
 *                  type: array
 */

export default apiRouteHandler({
  get: async (req: NextApiRequest, res: NextApiResponse<Lobby.GamesByExternalIdResponse | ServerError>) => {
    const { limit, offset, gameExternalIds = [] } = req.query;

    if (Number.isNaN(limit)) {
      return res.status(422).json({
        code: 'WrongParameters ',
        message: 'limit is required',
      });
    }

    const games: any = {
      where: {
        external_game_id: { in: Array.isArray(gameExternalIds) ? [...gameExternalIds] : gameExternalIds },
      },
      take: Number(limit),
      skip: Number.isNaN(offset) ? 0 : Number(offset),
    };

    res.status(200).json({
      games: games.map((game: any) => {
        return {
          id: Number(game.id),
          externalGameId: game.external_game_id,
          name: game.name,
          description: game.description,
          operatorHandle: game.operator_handle,
          providerHandle: game.provider_handle,
          gameCategoryIds: game.game_categories_ids.map((i) => Number(i)),
          thumbnailUrl: game.thumbnail_url,
          backgroundUrl: game.background_url,
          slug: game.slug,
        };
      }),
    });
  },
});
