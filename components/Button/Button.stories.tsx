import { IconButton } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
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
      options: ['xs', 'sm', 'md', 'lg', 'squareXs', 'squareSm', 'squareMd', 'squareLg'],
      control: { type: 'select' },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
} as ComponentMeta<typeof Button>;

const ButtonTemplate: ComponentStory<typeof Button> = (args) => <Button {...args}>{args.children}</Button>;
const IconButtonTemplate: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />;

export const Primary = ButtonTemplate.bind({});
Primary.args = {
  variant: 'primary',
  size: 'md',
  children: 'Button',
};

export const Support = ButtonTemplate.bind({});
Support.args = {
  variant: 'support',
  size: 'md',
  children: 'Button',
};

export const Payment = ButtonTemplate.bind({});
Payment.args = {
  variant: 'payment',
  size: 'md',
  children: 'Button',
};

export const Security = ButtonTemplate.bind({});
Security.args = {
  variant: 'security',
  size: 'md',
  children: 'Button',
};

export const Outline = ButtonTemplate.bind({});
Outline.args = {
  variant: 'outline',
  size: 'md',
  children: 'Button',
};

export const Default = ButtonTemplate.bind({});
Default.args = {
  variant: 'default',
  size: 'md',
  children: 'Button',
};

export const Alternate = ButtonTemplate.bind({});
Alternate.args = {
  variant: 'alternate',
  size: 'md',
  children: 'Button',
};

export const Ghost = ButtonTemplate.bind({});
Ghost.args = {
  variant: 'ghost',
  size: 'md',
  children: 'Button',
};

export const Link = ButtonTemplate.bind({});
Link.args = {
  variant: 'link',
  size: 'md',
  children: 'Button',
};

export const Gray = ButtonTemplate.bind({});
Gray.args = {
  variant: 'gray',
  size: 'md',
  children: 'Button',
};

export const Blur = ButtonTemplate.bind({});
Blur.args = {
  variant: 'blur',
  size: 'md',
  children: 'Button',
};

export const Tag = ButtonTemplate.bind({});
Tag.args = {
  variant: 'tag',
  size: 'md',
  children: 'Button',
};

export const Icon = IconButtonTemplate.bind({});
Icon.args = {
  variant: 'round',
  size: 'squareMd',
  children: 'Button',
};
