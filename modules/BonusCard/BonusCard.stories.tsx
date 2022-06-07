import { SimpleGrid, VStack } from '@chakra-ui/react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BonusCard, BonusCardProgress } from '@modules/BonusCard/BonusCard';
import { bonusCards } from '@modules/BonusCard/mocks';

export default {
  title: 'BonusCard',
  component: BonusCard,
} as ComponentMeta<typeof BonusCard>;

const Template: ComponentStory<typeof BonusCard> = (args) => (
  <VStack align="stretch" m="3rem 1rem">
    <BonusCard {...args} />
  </VStack>
);

export const BasicUsage = Template.bind({});
BasicUsage.args = {
  variant: 'blue',
  bonusName: 'The bonus card title that may take up to two lines in height',
  endsAt: '2021/11/30',
};

export const AllActiveBonusCards = () => (
  <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
    {bonusCards.map((card) => {
      return (
        <BonusCard key={card.id} variant={card.variant} bonusName={card.bonusName} endsAt={card.endsAt}>
          <BonusCardProgress
            progress={card.progress}
            wager={card.wager}
            remaining={card.remaining}
            variant={card.variant}
          />
        </BonusCard>
      );
    })}
  </SimpleGrid>
);
