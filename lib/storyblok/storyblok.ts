import getConfig from 'next/config';
import StoryblokClient from 'storyblok-js-client';

const { publicRuntimeConfig } = getConfig();

export const Storyblok = new StoryblokClient({
  accessToken: publicRuntimeConfig.storyblokAccessToken,
});
