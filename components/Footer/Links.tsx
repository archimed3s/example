import { Skeleton, StackProps, Text, VStack } from '@chakra-ui/react';
import { StoryData } from 'storyblok-js-client';

import { GLink } from '@components/GLink/GLink';

type LinksProps = {
  links: StoryData[] | undefined;
} & StackProps;

export const Links = ({ links, children, ...stackProps }: LinksProps) => (
  <VStack alignItems="flex-start" spacing={3} marginY={{ base: 10, md: 'initial' }} {...stackProps}>
    {links && (
      <>
        <Text textStyle="s" opacity="80%" fontWeight="600">
          {children}
        </Text>
        {links.map((story) => (
          <GLink textStyle="xs" opacity="60%" key={story.uuid} href={`/${story.slug}`}>
            {story.name}
          </GLink>
        ))}
      </>
    )}
    {!links && (
      <>
        <Skeleton width="100%" height={6} marginBottom={2} />
        <Skeleton width="80%" height={3} />
        <Skeleton width="100%" height={3} />
        <Skeleton width="80%" height={3} />
        <Skeleton width="90%" height={3} />
      </>
    )}
  </VStack>
);
