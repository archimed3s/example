import { VStack } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { GameThumbnail } from '@components/GameThumbnail/GameThumbnail';

import imageFile from './static/thumb.png';

export default {
  title: 'GameThumbnail',
  component: GameThumbnail,
} as ComponentMeta<typeof GameThumbnail>;

const Template: ComponentStory<typeof GameThumbnail> = (args) => (
  <VStack align="stretch">
    <GameThumbnail {...args} />
  </VStack>
);

export const BasicUsage = Template.bind({});
BasicUsage.args = {
  image: String(imageFile),
  buttonsPrimaryTitle: 'Fun',
  buttonsPrimaryLink: '#',
  buttonsSecondaryTitle: 'Real',
  buttonsSecondaryLink: '#',
};
