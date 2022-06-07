import { Stack } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Badge } from './Badge';

export default {
  title: 'Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

export const BasicUsage = () => (
  <Stack direction="row">
    <Badge>Default type</Badge>
    <Badge type="green">Green type</Badge>
    <Badge type="red">Red type</Badge>
  </Stack>
);

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args}>Badge content</Badge>;

export const Default = Template.bind({});
Default.args = {
  type: 'default',
};

export const Green = Template.bind({});
Green.args = {
  type: 'green',
};

export const Red = Template.bind({});
Red.args = {
  type: 'red',
};
