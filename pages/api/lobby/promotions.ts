import * as t from 'io-ts';

import { apiRouteHandler, authMiddleware, composeMiddleware } from '@api/middleware';
import { error } from '@common/services/LogService';
import { Storyblok } from '@lib/storyblok/storyblok';
import { Lobby } from '@sharedTypes/api';
import { promoLayouts } from '@sharedTypes/api/lobby';
import { getSiteId } from '@utils/api-utils';
import { decode, fromEnum } from '@utils/io-ts';

enum PromotionTriggerType {
  Deposit = 'deposit',
  Manual = 'manual',
  Login = 'login',
}

const promotionTriggerType = fromEnum('PromotionTriggerType', PromotionTriggerType);
const richText = t.type({
  content: t.array(t.UnknownRecord),
});
const storyblokImage = t.strict({
  filename: t.string,
  alt: t.string,
});
type StoryblokImage = t.TypeOf<typeof storyblokImage>;
const cmsDataCodec = t.intersection([
  t.type({
    title: t.string,
    image_desktop: t.array(storyblokImage),
    image_tablet: t.array(storyblokImage),
    image_mobile: t.array(storyblokImage),
    layout: promoLayouts,
    promotion_details_slug: t.string,
  }),
  t.partial({
    description_rich_text: richText,
    display_name_rich_text: richText,
  }),
]);

const findImageForCurrency = (currency: string, images: StoryblokImage[]) => {
  const image = images.find(({ filename }) => filename.toLocaleLowerCase().includes(currency)) ?? images[0];
  return {
    url: image.filename,
    alt: image.alt,
  };
};

/**
 * @swagger
 * /api/lobby/promotions:
 *  get:
 *    tags: ["Lobby"]
 *    description: Get active site promotions
 *    responses:
 *      200:
 *        description: Successful
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              title: PromotionResponse
 *              properties:
 *                promos:
 *                  title: Promotions
 *                  type: array
 *                  items:
 *                    type: object
 *                    title: Promotion
 *                    properties:
 *                      id:
 *                        title: Promotions id
 *                        type: string
 *                      name:
 *                        title: Promotion name
 *                        type: string
 *                      description:
 *                        title: Promotion description
 *                        type: string
 *                      displayName:
 *                        title: Promotion display name
 *                        type: string
 *                      imageUrl:
 *                        title: Promotion image URL
 *                        type: string
 *                      depositMinAmount:
 *                        title: Minimum deposit amount (0 for no deposit bonuses)
 *                        type: string
 *                      currency:
 *                        title: Currency code
 *                        type: string
 *                    required:
 *                    - id
 *                    - name
 *                    - description
 *                    - displayName
 *                    - depositMinAmount
 *                    - currency
 *              required:
 *              - promos
 */

export default apiRouteHandler({
  get: composeMiddleware<Lobby.PromotionResponse>()([authMiddleware(false)], async (req, res) => {
    const currency: any = req.session.player?.currency ?? {
      select: { currencies: true },
      where: { id: getSiteId() },
    };

    if (!currency) {
      return res.status(500).json({
        code: 'WrongParameters',
        message: "Can't get currency",
      });
    }

    const bonusPromotions: any = {
      where: {
        site_id: getSiteId(),
        currency_id: currency,
        has_started: true,
      },
    };

    const promos: Lobby.Promotion[] = [];

    for (const bonus of bonusPromotions) {
      try {
        if (bonus.storyblok_id) {
          // There is no documented storyblok api method to fetch multiple stories by ids
          const {
            data: {
              story: { content },
            },
          } = await Storyblok.getStory(bonus.storyblok_id);
          const cmsData = decode(cmsDataCodec, content);
          if (decode(promotionTriggerType, bonus.trigger_name) && cmsData) {
            promos.push({
              id: String(bonus.id),
              title: bonus.bonus_name,
              triggerType: bonus.trigger_name,
              images: {
                desktop: findImageForCurrency(currency, cmsData.image_desktop),
                tablet: findImageForCurrency(currency, cmsData.image_tablet),
                mobile: findImageForCurrency(currency, cmsData.image_mobile),
              },
              promoLayout: cmsData.layout,
              depositMinAmount: Number(bonus.deposit_min_amount),
              currency: bonus.currency_id,
              promotionDetailsPageSlug: cmsData.promotion_details_slug,
            });
          } else {
            error('Unsupported bonus.trigger_name or cmsData', { bonus, cmsData });
          }
        }
      } catch (err) {
        error('/api/lobby/promotions getStory failed', { id: bonus.storyblok_id, error: err });
      }
    }

    res.status(200).json({
      promos,
    });
  }),
});
