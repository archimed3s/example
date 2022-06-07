import { playersApi } from '@api/lib/core';
import { apiRouteHandler, authMiddleware, bodyDecodeMiddleware, composeMiddleware } from '@api/middleware';
import { kycApplicationRequest } from '@sharedTypes/api/player';

/**
 * @swagger
 * /api/player/submitKycApplications:
 *   post:
 *     tags: ["Player"]
 *     description: Submit uploaded kyc documents
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                title: Kyc document
 *                properties:
 *                 document_type:
 *                  title: Document type
 *                  type: string
 *                 urls:
 *                  title: Doc images url
 *                  type: array
 *                  items:
 *                   type: string
 *                   title: Url
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               title: Response
 */
export default apiRouteHandler({
  post: composeMiddleware()([authMiddleware(), bodyDecodeMiddleware(kycApplicationRequest)], async (req, res) => {
    const data = req.body;
    const response = await playersApi.submitKycApplications(req.session.player.playerId, data.docs);
    res.status(200).json(response.data);
  }),
});
