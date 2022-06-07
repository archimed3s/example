import { Box, Stack } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { QUERY_KEYS, getLobbyGameFilters } from '@api/lobby';
import { SEOTextsPageRoutes } from '@lib/storyblok/SEOTextsPageRoutes';
import { GameCategory } from '@modules/GameCategory/GameCategory';
import { Reviews } from '@modules/Reviews/Reviews';
import { SEOText } from '@modules/SEOText/SEOText';
import { SubscribeBlock } from '@modules/SubscribeBlock/SubscribeBlock';
import { ThemeCards } from '@modules/ThemeCards/ThemeCards';

import { MainLayout } from '../../layouts/MainLayout';
import { useHomePageStoryContent } from './useHomePageStoryContent';

const PRESELECTED_MAIN_PAGE_KEY = 'main_page';

export const HomePage = () => {
  const { data: gameFiltersData } = useQuery([QUERY_KEYS.lobbyGameFilters], getLobbyGameFilters);
  const mainPageParentCategory = gameFiltersData?.categories.find((item) => item.name === PRESELECTED_MAIN_PAGE_KEY);

  const homePageStoryContent = useHomePageStoryContent();

  return (
    <MainLayout>
      <Stack spacing={{ base: 9, lg: 6, xl: 12 }}>
        {mainPageParentCategory &&
          gameFiltersData?.categories
            .filter((category) => category.isActive === true && category.parentCategory === mainPageParentCategory.id)
            .map((category) =>
              category.parentCategory === mainPageParentCategory.id ? (
                <GameCategory key={category.id} categoryId={String(category.id)} title={category.name} />
              ) : null,
            )}
        <ThemeCards />

        {homePageStoryContent?.blocks.map((block) => {
          if (block.component === 'subscribe_promo') {
            return (
              <SubscribeBlock
                key={block._uid}
                action={block.action}
                title={block.title}
                description={block.description}
              />
            );
          }

          if (block.component === 'user_reviews') {
            return (
              <Reviews
                key={block._uid}
                reviews={block.reviews.map((review) => ({
                  _uid: review._uid,
                  author: review.author,
                  message: review.message,
                  avatarSrc: review.avatar.filename,
                }))}
              />
            );
          }

          return null;
        })}
        <SEOText textsFolderSlug={SEOTextsPageRoutes.HOME_PAGE} />
      </Stack>
    </MainLayout>
  );
};
