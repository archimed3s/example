import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Avatar } from './Avatar';

export default {
  title: 'Avatar',
  component: Avatar,
  argTypes: {
    size: {
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
      control: { type: 'select' },
    },
    variant: {
      options: ['square', 'circle'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const BasicUsage = Template.bind({});

BasicUsage.args = {
  name: 'Dan Abramov',
  src: 'https://bit.ly/dan-abramov',
  size: 'md',
  variant: 'circle',
};
