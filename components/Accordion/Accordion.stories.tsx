import { AccordionIcon, Box } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Accordion } from './Accordion';
import { AccordionButton } from './AccordionButton';
import { AccordionItem } from './AccordionItem';
import { AccordionPanel } from './AccordionPanel';

export default {
  title: 'Accordion',
  component: Accordion,
  argTypes: {
    size: {
      options: ['sm', 'md'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args}>
    <AccordionItem>
      <AccordionButton>
        <Box>Accordion title</Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionButton>
        <Box>Accordion title</Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export const BasicUsage = Template.bind({});

BasicUsage.args = {
  allowMultiple: true,
  allowToggle: true,
  size: 'md',
};
