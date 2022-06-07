import * as t from 'io-ts';

import { dateTime, numberString, storyblokImage, storyblokRichText } from '@utils/io-ts';

export const loginPageConfigCodec = t.strict({
  description: storyblokRichText,
  sideImage: storyblokImage,
  headerImages: t.array(storyblokImage),
});

export type StoryblokImage = t.TypeOf<typeof storyblokImage>;
export type StoryblokRichText = t.TypeOf<typeof storyblokRichText>;

export type LoginPageConfig = t.TypeOf<typeof loginPageConfigCodec>;

const promoWidth = t.union([
  numberString.pipe(t.literal(1)),
  numberString.pipe(t.literal(2)),
  numberString.pipe(t.literal(3)),
  numberString.pipe(t.literal(4)),
  numberString.pipe(t.literal(5)),
  numberString.pipe(t.literal(6)),
  numberString.pipe(t.literal(7)),
  numberString.pipe(t.literal(8)),
  numberString.pipe(t.literal(9)),
  numberString.pipe(t.literal(10)),
  numberString.pipe(t.literal(11)),
  numberString.pipe(t.literal(12)),
]);
export const countdownComponent = t.strict({
  _uid: t.string,
  component: t.literal('countdown'),
  end_date: dateTime,
  title: t.string,
  image_desktop: storyblokImage,
  width: promoWidth,
  theme: t.union([t.literal('dark'), t.literal('light')]),
  promotion: t.string,
});
export type CountdownComponent = t.TypeOf<typeof countdownComponent>;
const promoPageBlock = t.union([
  t.strict({
    _uid: t.string,
    component: t.literal('deposit_banner'),
    image_desktop: storyblokImage,
  }),
  countdownComponent,
  t.strict({
    _uid: t.string,
    component: t.literal('leaderboard'),
    board_id: t.union([t.number, t.string]),
    width: promoWidth,
  }),
  t.strict({
    _uid: t.string,
    component: t.literal('group_title'),
    text: t.string,
  }),
  t.strict({
    _uid: t.string,
    component: t.literal('announcement'),
    message: t.string,
  }),
]);
export type PromoPageBlock = t.TypeOf<typeof promoPageBlock>;

export const promotionsPage = t.strict({
  blocks: t.array(promoPageBlock),
});
export type PromotionsPage = t.TypeOf<typeof promotionsPage>;
