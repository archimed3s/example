import { VStack } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Banner } from '@components/Banner/Banner';

export default {
  title: 'Banner',
  component: Banner,
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = (args) => (
  <VStack align="stretch">
    <Banner {...args} />
  </VStack>
);

export const BasicUsage = Template.bind({});
BasicUsage.args = {
  bannerTitle: 'Subscribe to get personal bonuses',
  bannerText: 'Get started in the best way possible and watch your deposits double, twice!',
};
