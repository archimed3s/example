import type { NextApiRequest, NextApiResponse } from 'next';

import { apiRouteHandler } from '@api/middleware';
import { ServerError } from '@sharedTypes/ServerError';
import { Lobby } from '@sharedTypes/api';
import { OrderBy, OrderDirection, lobbyGameRequest } from '@sharedTypes/api/lobby';
import { decode } from '@utils/io-ts';

/**
 * @swagger
 * /api/lobby/games:
 *   get:
 *     tags: ["Lobby"]
 *     description: Get lobby games
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
 *        name: provider
 *        schema:
 *          type: string
 *        description: Name of the provider to filter by
 *      - in: query
 *        name: categories
 *        schema:
 *          type: array
 *          items:
 *            type: string
 *        description: Ids of the categories to filter by
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: Part of the game name
 *      - in: query
 *        name: orderBy
 *        schema:
 *          type: string
 *          enum: [id, name, provider]
 *          default: id
 *      - in: query
 *        name: orderDirection
 *        schema:
 *          type: string
 *          enum: [asc, desc]
 *          default: asc
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               title: LobbyGamesResponse
 *               properties:
 *                 count:
 *                   title: Count
 *                   type: integer
 *                 games:
 *                   title: Games
 *                   type: array
 *                   items:
 *                     schema:
 *                       type: object
 *                       title: Game
 *                       properties:
 *                         id:
 *                           title: Id
 *                           type: string
 *                         name:
 *                           title: Name
 *                           type: string
 *                         description:
 *                           title: Description
 *                           type: string
 *                         href:
 *                           type: string
 *                         operatorHandle:
 *                           type: string
 *                         providerHandle:
 *                           type: string
 *                         gameCategoryIds:
 *                           type: array
 *                           items:
 *                             type: string
 *                         thumbnailUrl:
 *                           type: string
 *                         backgroundUrl:
 *                           type: string
 *               required:
 *               - games
 */
export default apiRouteHandler({
  get: async (req: NextApiRequest, res: NextApiResponse<Lobby.LobbyGamesResponse | ServerError>) => {
    const {
      limit = Number.NaN,
      offset,
      provider,
      categoryIds,
      name,
      orderBy = OrderBy.Id,
      orderDirection = OrderDirection.ASC,
    } = decode(lobbyGameRequest, req.query) ?? {};
    if (Number.isNaN(limit)) {
      return res.status(422).json({
        code: 'WrongParameters',
        message: 'limit is required',
      });
    }

    // NOTE: where clause to count/findMany
    const _where = {
      AND: [
        { provider_handle: !Array.isArray(provider) ? provider : undefined },
        {
          game_categories_ids: categoryIds
            ? {
                hasSome: categoryIds,
              }
            : undefined,
        },
        { name: name && !Array.isArray(name) ? { contains: name } : undefined },
      ],
    };

    const [count, games]: any = [
      {
        where: _where,
      },
      {
        where: _where,
        orderBy: {
          [orderBy]: orderDirection,
        },
        take: Number(limit),
        skip: Number.isNaN(offset) ? 0 : Number(offset),
      },
    ];

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
      count,
    });
  },
});
