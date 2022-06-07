import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Select } from './Select';

export default {
  title: 'Select',
  component: Select,
  argTypes: {
    activeOption: {
      control: false,
    },
    setActiveOption: {
      control: false,
    },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => {
  const [activeOption, setActiveOption] = useState<string>(args.activeOption);

  return (
    <Select {...args} activeOption={activeOption} setActiveOption={setActiveOption}>
      {args.children}
    </Select>
  );
};

export const BasicUsage = Template.bind({});
BasicUsage.args = {
  label: 'Select label',
  placeholder: 'Select an option',
  options: ['Option 1', 'Option 2', 'Option 3'],
  activeOption: '',
  setActiveOption: () => undefined,
  size: 'md',
};
