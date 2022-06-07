import { apiRouteHandler, authMiddleware, bodyDecodeMiddleware, composeMiddleware } from '@api/middleware';
import { Bonus } from '@sharedTypes/api';

export default apiRouteHandler({
  post: composeMiddleware<Bonus.ApplyBonusResponse>()(
    [authMiddleware(), bodyDecodeMiddleware(Bonus.applyBonusRequest)],
    async (req, res) => {
      // const player = req.session.player?.playerId;

      // TODO Apply bonus

      res.status(200).json({
        isCodeValid: true,
        bonusId: 123,
      });
    },
  ),
});
