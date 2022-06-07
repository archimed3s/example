import { Box, Heading } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { StoryblokResult } from 'storyblok-js-client';

import { error } from '@common/services/LogService';
import { Breadcrumb } from '@components/Breadcrumb/Breadcrumb';
import { StoryAccordion } from '@components/StoryAccordion';
import { StoryMarkup } from '@components/StoryMarkup';
import { ROUTES } from '@lib/storyblok/routes';
import { Storyblok } from '@lib/storyblok/storyblok';

type ContentType = 'rich_text' | 'blocks';

type PageProps = {
  story?: StoryblokResult['data'];
  contentType: ContentType;
  preview?: boolean;
};

const boxSx = {
  '& p': {
    marginY: 3,
  },
};

const Pages = ({ story, contentType }: PageProps) => {
  return (
    <Box sx={boxSx} width="full">
      <Box margin="1rem 0 0.1875rem 0">
        <Breadcrumb />
      </Box>
      {story.content.heading && <Heading fontWeight={500}>{story.content.heading}</Heading>}
      <Box bgColor="gray.-140" rounded="xl" p="0.75rem 1.5rem" my={10}>
        {contentType === 'blocks' ? (
          <StoryAccordion blocks={story.content.blocks} />
        ) : (
          <StoryMarkup data={story.content.rich_text} />
        )}
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps, { slug: string }> = async ({
  params,
  preview = false,
  locale,
}) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { slug } = params;
  const staticPageInfo = ROUTES.find((route) => route.slug === slug);

  if (!staticPageInfo) {
    return {
      notFound: true,
    };
  }

  const contentType = staticPageInfo.content_type;
  const fullSlug = staticPageInfo.fullSlug ?? '';
  const sbParams = {
    version: preview ? ('draft' as const) : undefined,
    language: locale,
  };

  try {
    const { data } = await Storyblok.getStory(fullSlug, sbParams);

    if (!data?.story || !contentType) {
      error(`Slug ${fullSlug} story or content type is not found`, { data, contentType });
      return {
        notFound: true,
      };
    }

    return {
      props: {
        story: data.story,
        contentType,
        preview,
      },
    };
  } catch (e) {
    error(`Slug ${slug} story or content type is not found`, { contentType, e });
    return {
      notFound: true,
    };
  }
};

export default Pages;
