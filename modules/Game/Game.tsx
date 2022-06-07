import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { defineMessages, useIntl } from 'react-intl';

import { Breadcrumb } from '@components/Breadcrumb/Breadcrumb';
import { useBreakpoint } from '@hooks/useBreakpoint';
import { GameFrame } from '@modules/Game/GameFrame';
import { GameHeading } from '@modules/Game/GameHeading/GameHeading';
import { GameInformation } from '@modules/Game/GameInformation/GameInformation';
import { GameCategory } from '@modules/GameCategory/GameCategory';
import { ThemeCards } from '@modules/ThemeCards/ThemeCards';

import { useGameQuery } from './useGameQuery';

const messages = defineMessages({
  youMayAlsoLike: {
    id: 'GameCategory.youMayAlsoLike.title',
    defaultMessage: 'You may also like',
  },
});

export const Game = () => {
  const intl = useIntl();
  const router = useRouter();
  const { isMobile } = useBreakpoint();
  const { id, externalId } = router.query as { id?: string; externalId?: string };

  const { data } = useGameQuery(id);

  return (
    <Stack paddingY={{ base: 5, md: 8 }} spacing={8} alignItems="flex-start">
      {!isMobile && <Breadcrumb />}
      <Stack spacing={{ base: 4, md: 12 }} data-testid="game-page-content">
        <Stack spacing={{ base: 5, md: 8 }}>
          <GameHeading gameDetails={data?.game} data-testid="game-heading" />
          {externalId && id ? <GameFrame gameExternalId={externalId} gameId={id} /> : null}
        </Stack>
        <GameInformation gameId={id} />
        <ThemeCards />
        <GameCategory categoryId="1" title={intl.formatMessage(messages.youMayAlsoLike)} />
      </Stack>
    </Stack>
  );
};
