import { Box } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { LeaderboardPlayerItem } from './LeaderboardPlayerItem';

export default {
  title: 'LeaderboardPlayerItem',
  component: LeaderboardPlayerItem,
} as ComponentMeta<typeof LeaderboardPlayerItem>;

const Template: ComponentStory<typeof LeaderboardPlayerItem> = (args) => (
  <Box w="450px">
    <LeaderboardPlayerItem {...args} />
  </Box>
);

export const BasicUsage = Template.bind({});
BasicUsage.args = {
  isAuthPlayer: false,
  player: {
    name: 'Benito Hernandez',
    username: 'Benito123',
    avatarSrc: 'https://bit.ly/dan-abramov',
    position: 1,
    id: 1,
    prize: 5099,
  },
};
