import { apiRouteHandler, composeMiddleware, multiFormParsedMiddleware } from '@api/middleware';
import { addFile, createNewTicket } from '@lib/ladesk/ladesk';
import { verifyCaptcha } from '@lib/recaptcha/recaptcha';
import { contactUsRequest } from '@sharedTypes/api/contact-us';

// Remove bodyParse to parse
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * @swagger
 * /api/contact-us:
 *   post:
 *     tags: ["Help"]
 *     description: Contact us request
 *     requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                reason:
 *                  type: string
 *               recaptchaValue:
 *                  type: string
 *                message:
 *                  type: string
 *               files:
 *                  type: array
 *                  items:
 *                     type: string
 *                     format: binary
 *              required:
 *              - name
 *              - email
 *              - reason
 *              - recaptchaValue
 *     responses:
 *       200:
 *         description: Successful
 */
export default apiRouteHandler({
  post: composeMiddleware()([multiFormParsedMiddleware(contactUsRequest)], async (req, res) => {
    const isValidCaptcha = await verifyCaptcha(req.body.recaptchaValue);

    if (isValidCaptcha) {
      const files = await Promise.all(req.files.map((file) => addFile(file.filepath)));

      await createNewTicket({ ...req.body, attachments: files.map((f) => f.id).join(',') });

      res.status(200).end();
    } else {
      return res.status(422).json({
        code: 'RecaptchaError',
        message: 'Unproccesable request, Invalid captcha code',
      });
    }
  }),
});
