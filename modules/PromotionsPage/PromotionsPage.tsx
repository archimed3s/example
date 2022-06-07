import { Grid, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { useQuery } from 'react-query';

import { QUERY_KEYS, loadPromotionsPage } from '@api/storyblok';
import { SEOTextsPageRoutes } from '@lib/storyblok/SEOTextsPageRoutes';
import { GroupTitle } from '@modules/PromotionsPage/GroupTitle';
import { SEOText } from '@modules/SEOText/SEOText';
import { PromoPageBlock } from '@sharedTypes/api/storyblok';
import { never } from '@utils/ts-utils';

import { Announcement } from './Announcement';
import { CardsList } from './CardsList';
import { CountdownBanner } from './CountdownBanner/CountdownBanner';
import { PromoBanner } from './PromoBanner';
import { TournamentBoard } from './TournamentBoard';

const messages = defineMessages({
  title: {
    id: 'PromotionsPage.title',
    defaultMessage: 'Promotions',
  },
});

const fullWidth = '1 / col12-end';

export const PromoPageBlockComponent = ({ block }: { block: PromoPageBlock }) => {
  switch (block.component) {
    case 'deposit_banner':
      return <PromoBanner gridColumn={fullWidth} />;
    case 'countdown':
      return <CountdownBanner gridColumn={{ base: fullWidth, xl: `auto / span ${block.width}` }} countdown={block} />;
    case 'leaderboard':
      return <TournamentBoard gridColumn={{ base: fullWidth, xl: `auto / span ${block.width}` }} />;
    case 'group_title':
      return <GroupTitle gridColumn={fullWidth} text={block.text} />;
    case 'announcement':
      return <Announcement text={block.message} gridColumn={fullWidth} />;
    default:
      never(block);
      return null;
  }
};

export const PromotionsPage = () => {
  const { data } = useQuery(QUERY_KEYS.promoPage, loadPromotionsPage);

  return (
    <VStack width={{ base: 'full', md: 'min(100%, 1264px)' }} marginY={12} spacing={4}>
      <HStack width="full" justifyContent="space-between">
        <Text flexGrow={2} color="white" textStyle="lg2" fontWeight="400">
          <FormattedMessage {...messages.title} />
        </Text>
      </HStack>
      <Grid width="full" templateColumns="repeat(12, 1fr)" rowGap={{ base: 5, xl: 8 }} columnGap={4}>
        {data ? (
          <>
            {data.map((block) => (
              <PromoPageBlockComponent key={block._uid} block={block} />
            ))}
          </>
        ) : (
          <>
            <PromoBanner gridColumn={fullWidth} />
            <PromoBanner gridColumn={{ base: fullWidth, xl: 'auto / span 7' }} />
            <TournamentBoard gridColumn={{ base: fullWidth, xl: 'auto / span 5' }} />
            <CardsList gridColumn={fullWidth} />
            <CardsList gridColumn={fullWidth} />
            <Skeleton gridColumn={fullWidth} borderRadius={8} height="84px" />
          </>
        )}
        <SEOText textsFolderSlug={SEOTextsPageRoutes.PROMOTIONS_PAGE} gridColumn={fullWidth} />
      </Grid>
    </VStack>
  );
};
