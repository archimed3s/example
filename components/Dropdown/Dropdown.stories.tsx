import { VStack } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Flags } from '@components/Flags/Flags';

import { Dropdown } from './Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const items = [
  { value: '1', label: 'First', icon: <Flags country="CA" /> },
  { value: '2', label: 'Second' },
  { value: '3', label: 'Third' },
  { value: '4', label: 'Fourth' },
  { value: '5', label: 'Fifth' },
];

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <VStack align="stretch">
    <Dropdown {...args} items={items} />
  </VStack>
);

export const BasicUsage = Template.bind({});
BasicUsage.args = {
  placeholder: 'Placeholder',
  label: 'Label',
  labelBg: 'gray.-140',
};
