import * as t from 'io-ts';
import { StoryData } from 'storyblok-js-client';

import { error } from '@common/services/LogService';
import { Storyblok } from '@lib/storyblok/storyblok';
import { decode } from '@utils/io-ts';

const storyblokImage = t.type({
  id: t.number,
  // TODO Check if 'null' should be the case
  alt: t.union([t.string, t.null]),
  filename: t.string,
});
const footerConfig = t.type({
  logo: storyblokImage,
  other: t.array(t.string),
  company: t.array(t.string),
  assets: t.array(storyblokImage),
  copyright: t.string,
});

export type FooterConfig = t.TypeOf<typeof footerConfig>;

export const fetchFooterConfig = async (): Promise<FooterConfig | null> => {
  const { data } = await Storyblok.getStory('footer/main-footer');
  const result = decode(footerConfig, data.story.content);
  if (result) {
    return result;
  }
  error('Error fetching footer config');
  return null;
};

export const fetchStoriesByUuid = async (uuids: string[]): Promise<StoryData[]> => {
  const { data } = await Storyblok.getStories({
    by_uuids: uuids.join(),
  });
  return data.stories;
};
