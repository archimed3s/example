import { AccordionIcon, AccordionProps, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { StoryData } from 'storyblok-js-client';

import { Accordion } from '@components/Accordion/Accordion';
import { AccordionButton } from '@components/Accordion/AccordionButton';
import { AccordionItem } from '@components/Accordion/AccordionItem';
import { AccordionPanel } from '@components/Accordion/AccordionPanel';
import { StoryMarkup } from '@components/StoryMarkup';
import { Storyblok } from '@lib/storyblok/storyblok';

const fetchSEOText = async (
  textsFolderSlug?: string | undefined,
  fullStoryblokSlugToFolder?: string | undefined,
  language?: string | undefined,
): Promise<StoryData[]> => {
  const { data } = await Storyblok.getStories({
    language,
    by_slugs: (fullStoryblokSlugToFolder || (textsFolderSlug ? `seo-text/${textsFolderSlug}` : 'seo-text')) + '/*',
  });

  return data?.stories;
};

type SEOTextProps = {
  textsFolderSlug?: string;
  defaultCollapsed?: boolean;
  fullStoryblokSlugToFolder?: string;
} & AccordionProps;

export const SEOText = ({
  textsFolderSlug,
  defaultCollapsed,
  fullStoryblokSlugToFolder,
  ...accordionProps
}: SEOTextProps) => {
  const { locale } = useRouter();
  const { data } = useQuery('seo-text', () => fetchSEOText(textsFolderSlug, fullStoryblokSlugToFolder, locale));

  if (data) {
    return (
      <Accordion
        defaultIndex={defaultCollapsed ? undefined : [0]}
        allowMultiple
        allowToggle
        {...accordionProps}
        pb={{ base: 6, lg: 9, xl: 12 }}
      >
        {data?.map((story) => (
          <AccordionItem key={story.id}>
            <AccordionButton>
              <Box textStyle="s2">{story.content.title}</Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <StoryMarkup data={story.content.description} />
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  return null;
};
