import { GetServerSideProps } from 'next';
import { StoryData } from 'storyblok-js-client';

import { error } from '@common/services/LogService';
import { Storyblok } from '@lib/storyblok/storyblok';
import { PlayerCommunicationPage } from '@modules/PlayerAccountPage/PlayerCommunicationPage';

type PlayerCommunicationProps = {
  stories: StoryData[];
};

const PlayerCommunication = ({ stories }: PlayerCommunicationProps) => {
  return <PlayerCommunicationPage stories={stories} />;
};

export default PlayerCommunication;

export const getServerSideProps: GetServerSideProps<PlayerCommunicationProps> = async ({ preview = false, locale }) => {
  const sbParams = {
    version: preview ? ('draft' as const) : undefined,
    starts_with: 'profile/communication-preferences/',
    language: locale,
  };

  const { data } = await Storyblok.getStories(sbParams);

  if (!data) {
    error(`Slug profile/communication-preferences/ story or content type is not found`, { data });
    return {
      notFound: true,
    };
  }

  return {
    props: {
      stories: data.stories,
    },
  };
};
