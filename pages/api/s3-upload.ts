import { APIRoute } from 'next-s3-upload';

import { apiRouteHandler, authMiddleware, composeMiddleware } from '@api/middleware';

type NextS3UploadResponse = {
  bucket: string;
  key: string;
  url: string;
};

/**
 * @swagger
 * /api/s3-upload:
 *   post:
 *     tags: ["Kyc"]
 *     description: Kyc file upload to S3
 *     parameters:
 *      - in: query
 *        name: filename
 *        schema:
 *          type: string
 *        required: true
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bucket:
 *                   type: string
 *                 key:
 *                   type: string
 *                 url:
 *                   type: string
 */
export default apiRouteHandler({
  get: composeMiddleware<NextS3UploadResponse>()([authMiddleware()], async (req, res) => {
    await APIRoute.configure({
      key: (_req, filename) => `${req.session.player.externalPlayerId}/${filename}`,
    })(req, res);
  }),
});
