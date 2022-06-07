import { VStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { getGamesPageParams } from '@common/services/RouteService';
import { Breadcrumb } from '@components/Breadcrumb/Breadcrumb';
import { Games } from '@modules/Games';
import { RecentlyGames } from '@modules/RecentlyGames/RecentlyGames';

enum ExceptionalGameCategoriesSlug {
  RECENTLY_GAMES = 'recently.played',
}

const GamePage: NextPage = () => {
  const router = useRouter();
  const { categorySlug } = getGamesPageParams(router.query);

  return (
    <VStack alignItems="flex-start" py={9} w="full" spacing={8}>
      <Breadcrumb />
      {categorySlug && categorySlug === ExceptionalGameCategoriesSlug.RECENTLY_GAMES ? (
        <RecentlyGames pageSize={30} />
      ) : (
        <Games pageSize={30} showCategories />
      )}
    </VStack>
  );
};

export default GamePage;
