import { ComponentMeta, ComponentStory } from '@storybook/react';

import { IconButton, IconButtonSizeEnum } from './IconButton';

export default {
  title: 'Icon Button',
  component: IconButton,
  argTypes: {
    variant: {
      options: [
        'gray',
        'primary',
        'support',
        'payment',
        'security',
        'outline',
        'default',
        'alternate',
        'ghost',
        'link',
        'round',
      ],
      control: { type: 'select' },
    },
    size: {
      options: IconButtonSizeEnum,
      control: { type: 'select' },
    },
    isRound: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<typeof IconButton>;

const IconButtonTemplate: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />;

export const Default = IconButtonTemplate.bind({});
Default.args = {
  variant: 'default',
  size: IconButtonSizeEnum.MEDIUM,
  isRound: false,
};
