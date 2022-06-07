import { ComponentMeta } from '@storybook/react';

import { Counter } from './Counter';

export default {
  title: 'Counter',
  component: Counter,
  argTypes: {
    size: {
      control: {
        type: 'number',
      },
      defaultValue: 32,
    },
    value: {
      control: {
        type: 'number',
      },
      defaultValue: 10,
    },
  },
} as ComponentMeta<typeof Counter>;

export const Example = Counter;
