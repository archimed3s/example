import { HStack, StackProps, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { StoryData } from 'storyblok-js-client';

import { GLink } from '@components/GLink/GLink';
import { Storyblok } from '@lib/storyblok/storyblok';
import { decode, stringArray } from '@utils/io-ts';

const Divider = () => (
  <Text textStyle="xs" color="gray.80" marginX={1}>
    •
  </Text>
);

const fetchSidebarFooter = async (): Promise<StoryData[]> => {
  const { data } = await Storyblok.getStory('footer/sidebar-footer');
  const result = decode(stringArray, data.story.content.legal_items);
  if (result) {
    const { data: links } = await Storyblok.getStories({
      by_uuids: result.join(),
    });
    return links.stories;
  }
  return [];
};

export const SidebarFooter = (props: Pick<StackProps, 'display'>) => {
  const { data: linkedStories } = useQuery('sidebar-footer', fetchSidebarFooter);

  return (
    <HStack flexWrap="wrap" marginTop={6} spacing={1} divider={<Divider />} sx={{ rowGap: 8 }} {...props}>
      {linkedStories?.map((story) => (
        <GLink textStyle="xs" color="gray.80" key={story.uuid} href={`/${story.slug}`}>
          {story.name}
        </GLink>
      ))}
    </HStack>
  );
};
