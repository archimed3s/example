import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { ButtonGroup } from './ButtonGroup';

export default {
  title: 'ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    activeButton: {
      control: false,
    },
    setActiveButton: {
      control: false,
    },
  },
} as ComponentMeta<typeof ButtonGroup>;

const Template: ComponentStory<typeof ButtonGroup> = (args) => {
  const [activeButton, setActiveButton] = useState('');

  const onChange = (value: string) => {
    setActiveButton(value);
  };

  return (
    <ButtonGroup options={args.options} activeButton={activeButton} onOptionChanged={onChange} name="activeButton" />
  );
};

export const BasicUsage = Template.bind({});
BasicUsage.args = {
  options: [
    {
      name: 'test1',
      value: 'Test 1',
    },
    {
      name: 'test2',
      value: 'Test 2',
    },
    {
      name: 'test3',
      value: 'Test 3',
    },
  ],
};
