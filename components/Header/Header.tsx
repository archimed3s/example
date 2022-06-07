import { Center, Flex, HStack, useBreakpointValue } from '@chakra-ui/react';
import { ReactElement, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';

import { QUERY_KEYS, loadHeaderMenuContent } from '@api/storyblok';
import { useRouteService } from '@common/services/RouteService';
import { GLink } from '@components/GLink/GLink';
import { usePlayerState } from '@hooks/usePlayerState/useStateReducer';

import { HeaderGuest } from './HeaderGuest';
import { HeaderPlayer } from './HeaderPlayer';
import { messages } from './translations';

type HeaderMenuType = {
  key: string;
  title: ReactElement;
  href: string;
};

export const Header = () => {
  const breakpoint = useBreakpointValue({ base: 'base', xl: 'xl' });
  const appRoutes = useRouteService();
  const { player } = usePlayerState();

  const { data } = useQuery(QUERY_KEYS.headerMenu, loadHeaderMenuContent);

  const headerMenu: HeaderMenuType[] = useMemo(
    () =>
      [
        {
          key: 'games',
          title: <FormattedMessage {...messages.games} />,
          href: appRoutes.getGamesPagePath(),
        },
        {
          key: 'jackpots',
          title: <FormattedMessage {...messages.jackpots} />,
          href: appRoutes.getJackpotsPath(),
        },
        {
          key: 'promotions',
          title: <FormattedMessage {...messages.promotions} />,
          href: appRoutes.getPromotionsPath(),
        },
        {
          key: 'loyalty',
          title: <FormattedMessage {...messages.loyalty} />,
          href: appRoutes.getLoyaltyPath(),
        },
        {
          key: 'sport',
          title: <FormattedMessage {...messages.sport} />,
          href: appRoutes.getSportPath(),
        },
      ].filter(({ key }) => data && data?.includes(key)),
    [appRoutes, data],
  );

  return (
    <Flex py={4} px={{ base: 5, lg: 6 }} justify="space-between" grow={1} data-testid="header" h="80px">
      <Center>
        {breakpoint === 'xl' && (
          <HStack spacing="10" pl={10}>
            {headerMenu.map((item) => (
              <GLink key={item.key} href={item.href} variant="menu">
                {item.title}
              </GLink>
            ))}
          </HStack>
        )}
      </Center>
      {player ? <HeaderPlayer player={player} /> : <HeaderGuest />}
    </Flex>
  );
};
