import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ProgressBar } from './ProgressBar';

export default {
  title: 'ProgressBar',
  component: ProgressBar,
  argTypes: {
    nSteps: {
      control: { type: 'range', min: 1, max: 20, step: 1 },
    },
    currentStep: {
      control: { type: 'range', min: 1, max: 20, step: 1 },
    },
  },
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => <ProgressBar {...args} />;

export const BasicUsage = Template.bind({});
BasicUsage.args = {
  nSteps: 5,
  currentStep: 2,
};
