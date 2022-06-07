import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Progress } from '@components/Progress/Progress';

export default {
  title: 'Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => <Progress {...args} />;

export const BasicUsage = Template.bind({});
BasicUsage.args = {
  value: 40,
  min: 0,
  max: 100,
  hasStripe: false,
  isAnimated: true,
  isIndeterminate: false,
};
