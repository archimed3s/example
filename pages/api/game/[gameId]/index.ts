import type { NextApiRequest, NextApiResponse } from 'next';

import { apiRouteHandler } from '@api/middleware';
import { ServerError } from '@sharedTypes/ServerError';
import { Game } from '@sharedTypes/api';
import { gameLeaderboardRequest } from '@sharedTypes/api/game';
import { decode } from '@utils/io-ts';

/**
 * @swagger
 * /api/game/{gameId}:
 *   get:
 *     tags: ["Game"]
 *     description: Get game by id
 *     parameters:
 *      - in: path
 *        name: gameId
 *        schema:
 *          type: string
 *        required: true
 *        description: id of the game
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               title: LobbyGamesResponse
 *               properties:
 *                 game:
 *                     type: object
 *                     title: Game
 *                     properties:
 *                       id:
 *                         title: Id
 *                         type: string
 *                       name:
 *                         title: Name
 *                         type: string
 *                       providerHandle:
 *                         title: Provider handle
 *                         type: string
 *                       isNew:
 *                         title: The game is new
 *                         type: boolean
 *                       thumbnailUrl:
 *                         title: Thumbnail
 *                         type: string
 *                       isFavourite:
 *                         title: Says that game is in player's favourites or not.
 *                         type: boolean
 *               required:
 *               - game
 */
export default apiRouteHandler({
  get: async (req: NextApiRequest, res: NextApiResponse<Game.GameDetailsResponse | ServerError>) => {
    const { gameId } = decode(gameLeaderboardRequest, req.query) ?? {};

    if (!gameId) {
      return res.status(404).json({
        code: 'GameNotFound',
        message: 'Game not found',
      });
    }

    const [game, gameMeta]: any = await Promise.all([
      {
        where: {
          id: Number(gameId),
        },
      },
      {
        where: {
          id: Number(gameId),
        },
      },
    ]);

    if (!game || !gameMeta) {
      return res.status(404).json({
        code: 'GameNotFound',
        message: 'Game not found',
      });
    }

    const playerId = req.session.player?.playerId;

    const isFavourite: any = playerId
      ? Boolean({
          where: {
            game_id: Number(gameId),
            player_id: playerId,
          },
        })
      : false;

    return res.status(200).json({
      game: {
        id: gameId,
        name: game.name,
        gameCategoryIds: game.game_categories_ids.map((i) => Number(i)),
        providerHandle: game.provider_handle,
        isNew: gameMeta.is_new,
        thumbnailUrl: game.thumbnail_url,
        isFavourite,
      },
    });
  },
});
