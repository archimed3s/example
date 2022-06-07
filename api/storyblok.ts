import { Storyblok } from '@lib/storyblok/storyblok';
import {
  CountdownComponent,
  LoginPageConfig,
  PromoPageBlock,
  countdownComponent,
  loginPageConfigCodec,
  promotionsPage,
} from '@sharedTypes/api/storyblok';
import { decode, stringArray } from '@utils/io-ts';

export const QUERY_KEYS = {
  sidebarMenu: 'sidebarContent',
  headerMenu: 'menuContent',
  loginPageConfig: 'loginLayout',
  promoPage: 'promoPageLayout',
};

export const loadSidebarMenuContent = async (): Promise<string[]> => {
  const { data } = await Storyblok.getStory('menu-items/menu-sidebar');
  return decode(stringArray, data.story.content?.menu_items) ?? [];
};

export const loadHeaderMenuContent = async (): Promise<string[]> => {
  const { data } = await Storyblok.getStory('menu-items/menu-header');
  return decode(stringArray, data.story.content?.menu) ?? [];
};

export const loadLoginPageConfig = async (): Promise<LoginPageConfig | undefined> => {
  const { data } = await Storyblok.getStory('login-page');
  return decode(loginPageConfigCodec, data.story.content);
};

const isBlockWithPromo = (block: PromoPageBlock): block is CountdownComponent => countdownComponent.is(block);
export const loadPromotionsPage = async (): Promise<PromoPageBlock[] | undefined> => {
  const { data } = await Storyblok.getStory('promotions/promo-page-layout');
  const promoPageBlocks = decode(promotionsPage, data.story.content)?.blocks;
  const promosUids = promoPageBlocks?.flatMap((block) => (isBlockWithPromo(block) ? [block.promotion] : [])) ?? [];
  if (promosUids.length) {
    const promotions = await Storyblok.getStories({ by_uuids: promosUids.join(',') });
    const uidSlugs = new Map(promotions.data.stories.map((story) => [story.uuid, story.slug]));

    return promoPageBlocks?.map((block) =>
      isBlockWithPromo(block)
        ? {
            ...block,
            promotion: uidSlugs.get(block.promotion) ?? block.promotion,
          }
        : block,
    );
  }
  return promoPageBlocks;
};
