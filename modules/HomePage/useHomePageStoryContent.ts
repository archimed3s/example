import * as t from 'io-ts';
import { useQuery } from 'react-query';

import { Storyblok } from '@lib/storyblok/storyblok';

const Asset = t.strict({
  filename: t.string,
});

const UserReviewBlock = t.strict({
  component: t.literal('user_review'),
  _uid: t.string,
  message: t.string,
  author: t.string,
  avatar: Asset,
});

const UserReviewsBlock = t.strict({
  component: t.literal('user_reviews'),
  _uid: t.string,
  reviews: t.array(UserReviewBlock),
});

const SubscribeStoryBlock = t.strict({
  component: t.literal('subscribe_promo'),
  _uid: t.string,
  action: t.keyof({ subscribe: null, register: null }),
  title: t.string,
  description: t.string,
});

const HomePageBlock = t.union([UserReviewsBlock, SubscribeStoryBlock]);

const HomePageStoryContent = t.strict({
  main_blocks: t.array(SubscribeStoryBlock),
  blocks: t.array(HomePageBlock),
});

export const useHomePageStoryContent = () => {
  const content = useQuery(['homePageStory'], () => Storyblok.getStory('home')).data?.data.story.content;

  return HomePageStoryContent.is(content) ? content : undefined;
};
