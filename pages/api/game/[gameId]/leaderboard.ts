import { NextApiRequest, NextApiResponse } from 'next';

import { apiRouteHandler } from '@api/middleware';
import { LeaderboardItem } from '@sharedTypes/Game';
import { ServerError } from '@sharedTypes/ServerError';
import { Game } from '@sharedTypes/api';
import { gameLeaderboardRequest } from '@sharedTypes/api/game';
import { decode } from '@utils/io-ts';

export default apiRouteHandler({
  get: async (req: NextApiRequest, res: NextApiResponse<Game.GameLeaderboardResponse | ServerError>) => {
    const { gameId } = decode(gameLeaderboardRequest, req.query) ?? {};

    if (!gameId) {
      return res.status(404).json({
        code: 'GameNotFound',
        message: 'Game not found',
      });
    }

    const mocked: Array<LeaderboardItem> = Array(50)
      .fill({})
      .map((item, index) => {
        const i = index + 1;
        return {
          id: i,
          name: `name${i}`,
          prize: Math.floor(Math.random() * 10000) + 100,
          username: `username${i}`,
          avatarSrc: 'https://bit.ly/dan-abramov',
        };
      })
      .sort((prev, curr) => curr.prize - prev.prize)
      .map((item, index) => ({ ...item, position: index + 1 }));

    return res.status(200).json({
      players: mocked,
      count: mocked.length,
      lastUpdate: new Date().toDateString(),
    });
  },
});
