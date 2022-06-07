import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Switch } from './Switch';

export default {
  title: 'Switch',
  component: Switch,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const BasicUsage = Template.bind({});

BasicUsage.args = {
  isFocusable: false,
  isReadOnly: false,
  isDisabled: false,
  isInvalid: false,
  isRequired: false,
  size: 'md',
};
