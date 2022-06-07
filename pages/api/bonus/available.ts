import { apiRouteHandler, authMiddleware, composeMiddleware } from '@api/middleware';
import { Bonus } from '@sharedTypes/api';

export default apiRouteHandler({
  get: composeMiddleware<Bonus.AvailableBonus[]>()([authMiddleware(false)], async (req, res) => {
    // const player = req.session.player?.playerId;

    // TODO Fetch available bonuses

    res.status(200).json([
      {
        id: 1,
        icon: 'icon.png',
        name: 'Super duper bonus 1',
      },
      {
        id: 2,
        icon: 'icon.png',
        name: 'Super duper bonus 2',
      },
    ]);
  }),
});
