import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Flags } from './Flags';

export default {
  title: 'Flags',
  component: Flags,
} as ComponentMeta<typeof Flags>;

const Template: ComponentStory<typeof Flags> = (args) => <Flags {...args} />;

export const FlagsStory = Template.bind({});
