import { Stack } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { IconButton, IconButtonSizeEnum } from '@components/IconButton/IconButton';
import { SectionHeader } from '@components/SectionHeader/SectionHeader';

export default {
  title: 'SectionHeader',
  component: SectionHeader,
} as ComponentMeta<typeof SectionHeader>;

const Template: ComponentStory<typeof SectionHeader> = (args) => (
  <Stack spacing={6}>
    <SectionHeader {...args}>
      <IconButton isRound variant="alternate" aria-label="Previous" size={IconButtonSizeEnum.XSMALL} />
      <IconButton isRound variant="alternate" aria-label="Next" size={IconButtonSizeEnum.XSMALL} />
    </SectionHeader>
  </Stack>
);

export const BasicUsage = Template.bind({});
BasicUsage.args = {
  headerTitle: 'Theme',
  paginationText: 'See all games',
  pagination: true,
};
