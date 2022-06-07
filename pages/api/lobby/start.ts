import type { NextApiRequest, NextApiResponse } from 'next';

import { slotegratorApi } from '@api/lib/core';
import { apiRouteHandler, bodyDecodeMiddleware, composeMiddleware } from '@api/middleware';
import { LobbyGameStartMode } from '@sharedTypes/Game';
import { Lobby } from '@sharedTypes/api';
import { lobbyGameStartRequest } from '@sharedTypes/api/lobby';

/**
 * @swagger
 * /api/lobby/start:
 *   post:
 *     tags: ["Lobby"]
 *     description: Start lobby game
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gameExternalId:
 *                 type: string
 *               operator:
 *                 type: string
 *               mode:
 *                 type: string
 *                 enum: [demo, real]
 *             required:
 *               - gameExternalId
 *               - mode
 *               - provider
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               title: LobbyGameStartResponse
 *               properties:
 *                 url:
 *                   type: string
 *                   nullable: true
 */
export default apiRouteHandler({
  post: composeMiddleware<Lobby.LobbyGameStartResponse>()(
    [bodyDecodeMiddleware(lobbyGameStartRequest)],
    async (req: NextApiRequest, res: NextApiResponse<Lobby.LobbyGameStartResponse>) => {
      const { mode, gameExternalId } = req.body;
      const player = req.session.player;
      const siteSessionToken = req.session.siteSessionToken;

      if (mode === LobbyGameStartMode.real && player && siteSessionToken) {
        const gameStart = await slotegratorApi.slotegratorStartGame({
          playerId: player.playerId,
          currency: player.currency,
          gameId: gameExternalId,
          siteSessionToken,
        });

        return res.status(200).json({
          url: gameStart.data.url || null,
        });
      } else {
        const gameStart = await slotegratorApi.slotegratorDemoGame({
          currency: player?.currency,
          gameId: gameExternalId,
        });

        return res.status(200).json({
          url: gameStart.data.url || null,
        });
      }
    },
  ),
});
