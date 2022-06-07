import { Box } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SearchCard } from './SearchCard';

export default {
  title: 'SearchCard',
  component: SearchCard,
} as ComponentMeta<typeof SearchCard>;

const Template: ComponentStory<typeof SearchCard> = (args) => (
  <Box w="278px">
    <SearchCard {...args} />
  </Box>
);

export const BasicUsage = Template.bind({});

BasicUsage.args = {
  imgSrc:
    'https://images.unsplash.com/photo-1595429035839-c99c298ffdde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&h=128&q=80',
  title: 'Game Name',
  productName: 'IsoftBet',
  percent: 98.8,
  winTitle: 'Jackpot',
  winNumber: '$12,928',
};
