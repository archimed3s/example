import { playersApi } from '@api/lib/core';
import { apiRouteHandler, authMiddleware, composeMiddleware } from '@api/middleware';
import { GameHistoryItem } from '@sharedTypes/api/player';

const isNotUndefined = <T>(value: T | undefined): value is T => value !== undefined;

const parseInteger = (value: unknown) => {
  const parsed = parseInt(String(value));
  return !isNaN(parsed) ? parsed : undefined;
};

/**
 * @swagger
 * /api/player/gameHistory:
 *  get:
 *    tags: ["Player"]
 *    description: Get player's game history
 *    parameters:
 *      - in: query
 *        name: days
 *        description: Filter history session with days period
 *        type: number
 *        required: true
 *      - in: query
 *        name: limit
 *        type: number
 *        required: true
 *      - in: query
 *        name: offset
 *        type: number
 *        required: true
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            schema:
 *              title: Game sessions
 *              type: array
 *              items:
 *                schema:
 *                  type: object
 *                  title: Game session information
 *                  properties:
 *                    txid:
 *                      type: number
 *                      title: Transaction id
 *                    amount:
 *                      type: string
 *                      title: Amount of credits that has been win in game session (negative value for losses)
 *                    currency:
 *                      type: string
 *                      title: Game session currency
 *                    createdAt:
 *                      type: string
 *                      title: Game session date
 *                    gameName:
 *                      type: string
 *                      title: External game id
 *                    game:
 *                      type: object
 *                      title: Short game information
 *                      properties:
 *                        id:
 *                          type: number
 *                          title: Game id
 *                        name:
 *                          type: string
 *                          title: Game name
 *                        external_game_id:
 *                          type: string
 *                          title: External game id
 *                        provider:
 *                          type: string
 *                          title: Provider name
 */
export default apiRouteHandler({
  get: composeMiddleware<GameHistoryItem[]>()([authMiddleware()], async (req, res) => {
    const query = {
      limit: parseInteger(req.query.limit) ?? 10,
      offset: parseInteger(req.query.offset) ?? 0,
      days: parseInteger(req.query.days) ?? 1,
    };

    const playerGameHistory = await playersApi.getPlayerGameHistory(req.session.player.playerId, {
      days: query.days,
    });

    const sessions = playerGameHistory.data.slice(query.offset, query.offset + query.limit);

    const externalIds = Array.from(new Set(sessions.map((session) => session.gameName).filter(isNotUndefined)));

    const games: any = {
      where: {
        external_game_id: {
          in: externalIds,
        },
      },
    };

    const gamesByExternalId = new Map(games.map((game: any) => [game.external_game_id, game]));

    const result = sessions.map((session): GameHistoryItem => {
      const externalId = session.gameName;
      const game: any = externalId ? gamesByExternalId.get(externalId) : undefined;

      return {
        ...session,
        game: game && {
          id: Number(game.id),
          name: game.name,
          externalGameId: game.external_game_id,
          provider: game.provider_handle,
        },
      };
    });

    res.status(200).json(result);
  }),
});
