import { Grid, GridItem, Stack, useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { IconButton, IconButtonSizeEnum } from '@components/IconButton/IconButton';
import { SectionHeader } from '@components/SectionHeader/SectionHeader';
import { useBreakpoint } from '@hooks/useBreakpoint';

import { ReviewAuthor, ReviewAvatar, ReviewMessage, ReviewWrapper } from './Review';

const messages = defineMessages({
  title: {
    id: 'Reviews.title',
    defaultMessage: 'User reviews',
  },
  allReviews: {
    id: 'Reviews.seeAllReviews',
    defaultMessage: 'See all reviews',
  },
  previousReviews: {
    id: 'Reviews.previousReviews',
    defaultMessage: 'Previous reviews',
  },
  nextReviews: {
    id: 'Reviews.nextReviews',
    defaultMessage: 'Next reviews',
  },
});

type Props = {
  reviews: Array<{
    _uid: string;
    avatarSrc: string;
    author: string;
    message: string;
  }>;
};

export const Reviews = (props: Props) => {
  const intl = useIntl();
  const [page, setPage] = useState<number>(1);
  const { isMobile } = useBreakpoint();
  const baseValue = isMobile ? 1 : 3;
  const pageSize = useBreakpointValue({ base: 1, md: 2, xl: 3 }, 'base') ?? baseValue;

  const reviews = props.reviews.slice((page - 1) * pageSize, page * pageSize);

  const handlePreviousClick = (): void => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = (): void => {
    if (props.reviews.length > page * pageSize) {
      setPage(page + 1);
    }
  };

  return (
    <Stack spacing={6}>
      <SectionHeader
        headerTitle={intl.formatMessage(messages.title)}
        paginationText={intl.formatMessage(messages.allReviews)}
        pagination
      >
        <IconButton
          isRound
          variant="alternate"
          aria-label={intl.formatMessage(messages.previousReviews)}
          onClick={handlePreviousClick}
          size={IconButtonSizeEnum.XSMALL}
        />
        <IconButton
          isRound
          variant="alternate"
          aria-label={intl.formatMessage(messages.nextReviews)}
          icon={<ChevronNextIcon />}
          onClick={handleNextClick}
          size={IconButtonSizeEnum.XSMALL}
        />
      </SectionHeader>
      <Grid templateColumns={`repeat(${pageSize}, 1fr)`} gap={3}>
        {reviews.map((review) => (
          <GridItem key={review._uid}>
            <ReviewWrapper height="100%">
              <ReviewAvatar src={review.avatarSrc} alt={review.author} />
              <ReviewMessage>{review.message}</ReviewMessage>
              <ReviewAuthor>{review.author}</ReviewAuthor>
            </ReviewWrapper>
          </GridItem>
        ))}
      </Grid>
    </Stack>
  );
};
