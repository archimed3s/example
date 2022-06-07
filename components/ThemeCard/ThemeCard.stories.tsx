import { Box, Flex, VStack } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeCard, ThemeCardProps } from '@components/ThemeCard/ThemeCard';

export default {
  title: 'ThemeCard',
  component: ThemeCard,
} as ComponentMeta<typeof ThemeCard>;

const Template: ComponentStory<typeof ThemeCard> = (args) => (
  <VStack align="stretch" m="3rem 1rem">
    <ThemeCard {...args} />
  </VStack>
);

export const BasicUsage = Template.bind({});
BasicUsage.args = {
  titleText: 'Adventure',
  subText: '1540 GAMES',
  href: '#',
  variant: 'purple',
};

const cards: ThemeCardProps[] = [
  {
    id: '1',
    titleText: 'Adventure',
    subText: '1540 GAMES',
    href: '#',
    variant: 'purple',
  },
  {
    id: '2',
    titleText: 'Adventure',
    subText: '1540 GAMES',
    href: '#',
    variant: 'coral',
  },
  {
    id: '3',
    titleText: 'Adventure',
    subText: '1540 GAMES',
    href: '#',
    variant: 'blue',
  },
];

export const AllThemeCards = () => (
  <Box p="4" width="full">
    <Flex>
      <Flex flexWrap="wrap" justify="space-between" mt="4" w="100%" sx={{ gap: '1rem' }}>
        {cards.map(({ id, titleText, subText, href, variant }) => (
          <ThemeCard key={id} id={id} titleText={titleText} subText={subText} href={href} variant={variant} />
        ))}
      </Flex>
    </Flex>
  </Box>
);
