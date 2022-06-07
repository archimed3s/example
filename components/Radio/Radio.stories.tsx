import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Radio as RadioComponent } from './Radio';

export default {
  title: 'Radio',
  component: RadioComponent,
} as ComponentMeta<typeof RadioComponent>;

const RadioStoryTemplate: ComponentStory<typeof RadioComponent> = (args) => (
  <RadioComponent {...args}>Checkbox</RadioComponent>
);

export const Radio = RadioStoryTemplate.bind({});

Radio.args = {
  isDisabled: false,
  isChecked: false,
};
