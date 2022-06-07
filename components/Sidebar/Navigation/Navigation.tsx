import { VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';

import { QUERY_KEYS, loadSidebarMenuContent } from '@api/storyblok';
import { error } from '@common/services/LogService';
import { routeService } from '@common/services/RouteService';
import { messages } from '@components/Sidebar/translations';
import { usePlayerStateActions } from '@hooks/usePlayerState';
import { useToast } from '@hooks/useToast';
import { Player } from '@sharedTypes/Player';

import { NavDivider } from './NavDivider';
import { MenuItemType, NavIconProps, NavMenu } from './NavMenu';

type NavigationProps = {
  isSidebarOpen: boolean;
  player: Player | null;
};

const appRoutes = routeService();

const primaryNav: MenuItemType[] = [
  {
    key: 'home',
    title: messages.home,
    route: appRoutes.getHomePagePath(),
  },
];
const authNav: MenuItemType[] = [
  {
    key: 'my.favourites',
    title: messages.favourites,
    route: appRoutes.getCategoryLink('my.favourites'),
  },
  {
    key: 'recent',
    title: messages.recent,
    route: appRoutes.getRecentPlayedPath(),
  },
];
const secondaryNav: MenuItemType[] = [
  {
    key: 'promotions',
    title: messages.promotions,
    route: appRoutes.getPromotionsPath(),
  },
  {
    key: 'tournaments',
    title: messages.tournaments,
    route: appRoutes.getTournamentsPath(),
  },
  {
    key: 'loyalty',
    title: messages.loyalty,
    route: appRoutes.getLoyaltyPath(),
  },
];
const tertiaryNav: MenuItemType[] = [
  {
    key: 'all.games',
    title: messages.allGames,
    route: appRoutes.getCategoryLink(),
  },
  {
    key: 'slots',
    title: messages.slots,
    route: appRoutes.getCategoryLink('slots'),
  },
  {
    key: 'jackpots',
    title: messages.jackpots,
    route: appRoutes.getCategoryLink('jackpots'),
  },
  {
    key: 'live.casino',
    title: messages.liveCasino,
    route: appRoutes.getCategoryLink('live.casino'),
  },
  {
    key: 'table.games',
    title: messages.tableGames,
    route: appRoutes.getCategoryLink('table.games'),
  },
];

const filterActive = (list: MenuItemType[], active: string[] | undefined): MenuItemType[] => {
  return (active && list.filter(({ key }) => key && active.includes(key))) || [];
};

export const Navigation = ({ isSidebarOpen, player }: NavigationProps) => {
  const { asPath } = useRouter();
  const { resetPlayer } = usePlayerStateActions();
  const toast = useToast();
  const intl = useIntl();

  const { data } = useQuery(QUERY_KEYS.sidebarMenu, loadSidebarMenuContent);

  const authActions = useMemo<MenuItemType[]>(
    () => [
      {
        title: messages.logout,
        route: '',
        onClick: async () => {
          try {
            await resetPlayer();
            toast.success({ title: intl.formatMessage(messages.logoutSuccess) });
          } catch (e) {
            error('Error logging out', { error: e });
            toast.error({ title: intl.formatMessage(messages.logoutFailed) });
          }
        },
        getIcon: ({ color }: NavIconProps) => <LogoutIcon color={color} />,
      },
    ],
    [intl, resetPlayer, toast],
  );

  return (
    <VStack alignItems="flex-start" justifyContent="stretch" spacing={{ base: 5, md: 4 }}>
      {player ? (
        <>
          <NavMenu
            isSidebarOpen={isSidebarOpen}
            nav={filterActive([...primaryNav, ...authNav], data)}
            pathname={asPath}
          />
          <NavDivider />
          <NavMenu isSidebarOpen={isSidebarOpen} nav={filterActive(secondaryNav, data)} pathname={asPath} />
          <NavDivider />
          <NavMenu isSidebarOpen={isSidebarOpen} nav={filterActive(tertiaryNav, data)} pathname={asPath} />
          <NavDivider />
          <NavMenu isSidebarOpen={isSidebarOpen} nav={authActions} pathname={asPath} />
        </>
      ) : (
        <>
          <NavMenu
            isSidebarOpen={isSidebarOpen}
            nav={filterActive([...primaryNav, ...secondaryNav], data)}
            pathname={asPath}
          />
          <NavDivider />
          <NavMenu isSidebarOpen={isSidebarOpen} nav={filterActive(tertiaryNav, data)} pathname={asPath} />
        </>
      )}
    </VStack>
  );
};
