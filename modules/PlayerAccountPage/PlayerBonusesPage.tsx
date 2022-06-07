import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import * as t from 'io-ts';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useQuery } from 'react-query';

import { fetchPlayerActiveBonuses, fetchPlayerEligibleBonuses } from '@api/player';
import { Breadcrumb } from '@components/Breadcrumb/Breadcrumb';
import { SectionHeader } from '@components/SectionHeader/SectionHeader';
import { useCurrency } from '@hooks/useCurrency';
import { useDateTimeFormat } from '@hooks/useDateTimeFormat';
import { PaymentModalPage, usePaymentModal } from '@hooks/usePaymentContext';
import { Storyblok } from '@lib/storyblok/storyblok';
import { AvailableBonusCard } from '@modules/AvailableBonusCard/AvailableBonusCard';
import { availableBonusCards } from '@modules/AvailableBonusCard/mocks';
import { BonusCard, BonusCardProgress, VariantKey } from '@modules/BonusCard/BonusCard';
import { PlayerActiveBonus, PlayerEligibleBonus } from '@sharedTypes/api/player';
import { decode } from '@utils/io-ts';

type PlayerActiveBonusItemProps = {
  id: number;
  bonus: PlayerActiveBonus;
};

type PlayerEligibleBonusItemProps = {
  id: number;
  bonus: PlayerEligibleBonus;
};

const messages = defineMessages({
  pageTitle: {
    id: 'PlayerBonuses.pageTitle',
    defaultMessage: 'Bonuses',
  },
  activeBonusesTitle: {
    id: 'PlayerBonuses.activeBonusesTitle',
    defaultMessage: 'Bonuses',
  },
  eligibleBonusesTitle: {
    id: 'PlayerBonuses.eligibleBonusesTitle',
    defaultMessage: 'Available Bonuses',
  },
});

// NOTE: temporary, variants should be set in storyblok
const variants: VariantKey[] = ['purple', 'coral', 'blue', 'green', 'orange', 'teal'];

const getProgress = (partial: number, total: number): number => Math.floor((100 * partial) / total);

const getRemaining = (partial: number, total: number): number => total - partial;

const getStoryContentById = async (storyId?: string) => {
  const {
    data: {
      story: { content },
    },
  } = await Storyblok.getStory(storyId ?? '');

  return decode(t.strict({ display_name: t.string }), content);
};

const PlayerActiveBonusItem: FC<PlayerActiveBonusItemProps> = ({ id, bonus }) => {
  const { locale } = useRouter();
  const { data } = useQuery(`bonus-campaign-${bonus.storyBlokId}`, () => getStoryContentById(bonus.storyBlokId));
  const { getCurrencyFormatted } = useCurrency({ currency: bonus.currencyId });
  const { getDateFormat } = useDateTimeFormat({ locale });

  const remaining = getCurrencyFormatted(
    getRemaining(parseInt(bonus.wagerTotalAmount), parseInt(bonus.wagerRequiredAmount)),
  );
  const progress = getProgress(parseInt(bonus.wagerTotalAmount), parseInt(bonus.wagerRequiredAmount));
  const endsAt = getDateFormat({ date: bonus.endsAt });
  const wager = getCurrencyFormatted(bonus.wagerTotalAmount);
  const variant = variants[id % variants.length];

  const bonusName = data?.display_name ?? bonus.bonusName;

  return (
    <BonusCard variant={variant} bonusName={bonusName} endsAt={endsAt}>
      <BonusCardProgress variant={variant} progress={progress} wager={`${wager}`} remaining={`${remaining}`} />
    </BonusCard>
  );
};

const PlayerEligibleBonusItem: FC<PlayerEligibleBonusItemProps> = ({ id, bonus }) => {
  const { locale } = useRouter();
  const { getDateFormat } = useDateTimeFormat({ locale });
  const { data } = useQuery(`bonus-campaign-${bonus.storyBlockId}`, () => getStoryContentById(bonus.storyBlockId));
  const endsAt = getDateFormat({ date: bonus.endsAt });
  const variant = variants[id % variants.length];
  const bonusName = data?.display_name ?? bonus.bonusName;
  const { openDepositWithProps } = usePaymentModal();

  return (
    <BonusCard
      variant={variant}
      bonusName={bonusName}
      endsAt={endsAt}
      onClick={() => {
        openDepositWithProps({ bonusId: bonus.bonusId, page: PaymentModalPage.AMOUNT_AND_PROVIDER });
      }}
    />
  );
};

export const PlayerBonusesPage = () => {
  const { formatMessage } = useIntl();
  const playerActiveBonuses = useQuery('playerActiveBonuses', fetchPlayerActiveBonuses);
  const playerEligibleBonuses = useQuery('playerEligibleBonuses', fetchPlayerEligibleBonuses);

  return (
    <Box maxW="1290" width="100%" mx="auto" py={{ base: 0, md: 8 }} pb="8">
      <Box ml={{ base: 0, md: '10%' }}>
        <Breadcrumb />
        <Text color="white" mt={{ base: 4, md: 0 }} py={2} fontSize={{ base: 'm1', md: 'l1' }} fontWeight="600">
          <FormattedMessage {...messages.pageTitle} />
        </Text>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
          {availableBonusCards.map((card) => (
            <AvailableBonusCard key={card.id} {...card} />
          ))}
        </SimpleGrid>

        {playerActiveBonuses?.data?.length ? (
          <>
            <SectionHeader headerTitle={formatMessage(messages.activeBonusesTitle)} mt={12} mb={4} />
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
              {playerActiveBonuses?.data?.map((bonus, index) => (
                <PlayerActiveBonusItem key={index} id={index} bonus={bonus} />
              ))}
            </SimpleGrid>
          </>
        ) : null}

        {playerEligibleBonuses?.data?.length ? (
          <>
            <SectionHeader headerTitle={formatMessage(messages.eligibleBonusesTitle)} mt={12} mb={4} />
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
              {playerEligibleBonuses?.data?.map((bonus, index) => (
                <PlayerEligibleBonusItem key={index} id={index} bonus={bonus} />
              ))}
            </SimpleGrid>
          </>
        ) : null}
      </Box>
    </Box>
  );
};
