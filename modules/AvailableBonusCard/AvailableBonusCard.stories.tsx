import { Box, Flex, VStack } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AvailableBonusCard } from '@modules/AvailableBonusCard/AvailableBonusCard';
import { availableBonusCards } from '@modules/AvailableBonusCard/mocks';

export default {
  title: 'AvailableBonusCard',
  component: AvailableBonusCard,
} as ComponentMeta<typeof AvailableBonusCard>;

const Template: ComponentStory<typeof AvailableBonusCard> = (args) => (
  <VStack align="stretch" m="3rem 1rem">
    <AvailableBonusCard {...args} />
  </VStack>
);

export const BasicUsage = Template.bind({});
BasicUsage.args = {
  variant: 'locked',
  caption: '1ST DEPOSIT',
  title: 'Get 100% up to € 500',
  code: 'BLAZE001',
  text: 'Available only 7 days from registration.',
  claimURL: '#',
  cancelURL: '#',
  linkText: 'Welcome Bonus T&amp;C',
  linkURL: '#',
};

export const AllAvailableBonusCards = () => (
  <Box p="4" width="full">
    <Flex direction={{ base: 'column', md: 'row' }} flexWrap="wrap" justify="space-between" mt={4}>
      {availableBonusCards.map((card) => (
        <Box flex="0 32%" mt={4} key={card.id}>
          <AvailableBonusCard {...card} />
        </Box>
      ))}
    </Flex>
  </Box>
);
