import { Box, BoxProps, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react';
import { useMemo } from 'react';
import { RenderOptions, render } from 'storyblok-rich-text-react-renderer';

import { StoryblokRichText } from '@sharedTypes/api/storyblok';

import { GLink } from './GLink/GLink';

type StoryMarkupProps = {
  data: StoryblokRichText;
  options?: RenderOptions;
} & Omit<BoxProps, 'sx'>;

const levelToHeadingType = (level: number) => {
  switch (level) {
    case 6:
      return 'h6';
    case 5:
      return 'h5';
    case 4:
      return 'h4';
    case 3:
      return 'h3';
    case 2:
      return 'h2';
    case 1:
      return 'h1';
    default:
      return 'h3';
  }
};

const defaultOptions: RenderOptions = {
  defaultStringResolver: (str) => (
    <Text textStyle="s" color="gray.120" mb={6} _last={{ mb: 0 }}>
      {str}
    </Text>
  ),
  markResolvers: {
    link: (children, { href = '', target, linktype }) => {
      const linkHref = linktype === 'email' ? `mailto:${href}` : href;
      return (
        <GLink href={linkHref} target={target}>
          <a>{children}</a>
        </GLink>
      );
    },
  },
  nodeResolvers: {
    heading: (children, { level }) => (
      <Text as={levelToHeadingType(level)} textStyle={levelToHeadingType(level)} color="white">
        {children}
      </Text>
    ),
    paragraph: (children) => (
      <Text textStyle="paragraph" _last={{ mb: 0 }}>
        {children}
      </Text>
    ),
    bullet_list: (children) => <UnorderedList>{children}</UnorderedList>,
    ordered_list: (children) => <OrderedList>{children}</OrderedList>,
    list_item: (children) => <ListItem>{children}</ListItem>,
  },
};

export const StoryMarkup = ({ data, options, ...boxProps }: StoryMarkupProps) => {
  const renderOptions = useMemo<RenderOptions>(() => {
    const { markResolvers, nodeResolvers, ...rest } = options ?? {};
    return {
      ...defaultOptions,
      ...rest,
      markResolvers: {
        ...defaultOptions,
        ...markResolvers,
      },
      nodeResolvers: {
        ...defaultOptions.nodeResolvers,
        ...nodeResolvers,
      },
    };
  }, [options]);
  return (
    <Box data-testid="page-info" {...boxProps}>
      {render(data, renderOptions)}
    </Box>
  );
};
