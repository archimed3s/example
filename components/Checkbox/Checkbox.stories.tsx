import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Checkbox } from './Checkbox';

export default {
  title: 'Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => {
  const [isChecked, setIsChecked] = useState(args.defaultChecked);

  return (
    <Checkbox
      isChecked={isChecked}
      isDisabled={args.isDisabled}
      onChange={() => setIsChecked((prevState) => !prevState)}
    >
      Checkbox
    </Checkbox>
  );
};

export const BasicUsage = Template.bind({});

BasicUsage.args = {
  isDisabled: false,
  defaultChecked: false,
};
