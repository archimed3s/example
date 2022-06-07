import { Box, CSSObject, Image, Text, VStack } from '@chakra-ui/react';
import { RenderOptions } from 'storyblok-rich-text-react-renderer';

import { StoryMarkup } from '@components/StoryMarkup';
import { StoryblokImage, StoryblokRichText } from '@sharedTypes/api/storyblok';

type SideBannerProps = {
  image: StoryblokImage;
  text: StoryblokRichText;
};

const styles: Record<string, CSSObject> = {
  h1: {
    fontSize: 'min(2.5vw, 2.3125rem)',
    lineHeight: '110%',
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 'min(1.5vw, 1.5rem)',
    lineHeight: '125%',
  },
  p: {
    fontSize: '1vw',
    opacity: 0.8,
    color: 'white',
  },
};

const storyMarkupOptions: RenderOptions = {
  nodeResolvers: {
    heading: (children, { level }) => (
      <Text as="span" sx={styles[`h${level}`]} color="white">
        {children}
      </Text>
    ),
    paragraph: (children) => (
      <Text as="p" sx={styles.p}>
        {children}
      </Text>
    ),
  },
};

export const SideBanner = ({ image, text }: SideBannerProps) => {
  return (
    <Box padding="1.25rem" position="relative">
      {image && <Image width="100%" height="100%" src={image.filename} alt={image.alt ?? image.filename} />}
      <Box
        position="absolute"
        left="min(5.25rem, 12%)"
        top="min(5.25rem, 10%)"
        right="min(5.25rem, 12%)"
        userSelect="none"
      >
        <StoryMarkup data={text} options={storyMarkupOptions} as={VStack} alignItems="start" />
      </Box>
    </Box>
  );
};
