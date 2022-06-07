import { Box, BoxProps, Image, Skeleton, Stack, Tag, TagLabel, Text } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { useRouteService } from '@common/services/RouteService';
import { GLink } from '@components/GLink/GLink';
import { CountdownComponent } from '@sharedTypes/api/storyblok';

import { getRemainingTime } from '../getRemainingTime';
import { messages } from '../messages';
import { Countdown } from './Countdown';

type CountdownBannerProps = Pick<BoxProps, 'gridColumn'> & {
  countdown?: CountdownComponent;
};

type CounterVariant = 'small' | 'big';
export const CountdownBanner = ({ countdown, ...containerProps }: CountdownBannerProps) => {
  const routeService = useRouteService();
  const variant: CounterVariant = (countdown?.width ?? 0) > 4 ? 'big' : 'small';

  if (!countdown) {
    return (
      <Skeleton
        borderRadius={8}
        height={{ base: 'auto', md: '430px', xl: '449px' }}
        minHeight={{ base: '470px', md: 'auto' }}
        {...containerProps}
      />
    );
  }

  return (
    <Box {...containerProps} width="full" position="relative" borderRadius="16px">
      <Image
        src={countdown.image_desktop.filename}
        alt={countdown.image_desktop.alt ?? ''}
        borderTopRadius="2xl"
        borderBottomRadius={variant === 'big' ? '2xl' : ''}
      />
      <Box
        position="absolute"
        top={variant === 'small' ? '.75rem' : '1.5rem'}
        left={variant === 'small' ? '.75rem' : '1.5rem'}
      >
        <Tag
          size="lg"
          borderRadius="full"
          variant="solid"
          bgGradient={countdown.theme === 'dark' ? 'linear(45deg, gradientRed.0, gradientRed.100)' : ''}
          backgroundColor="blackTransparent.15"
        >
          <TagLabel color="white">{variant === 'big' ? 'Price Drop €50,000' : '€50,000'}</TagLabel>
        </Tag>
        {variant === 'small' && (
          <Tag size="lg" borderRadius="full" variant="solid" marginLeft=".5rem">
            <TagLabel color="white">
              <FormattedMessage {...messages.availableFor} values={getRemainingTime(countdown.end_date)} />
            </TagLabel>
          </Tag>
        )}
      </Box>
      {variant === 'big' && <Countdown end={countdown.end_date} promoSlug={countdown.promotion} />}
      {variant === 'small' && (
        <GLink href={routeService.getPromotionDetailsPagePath(countdown.promotion)}>
          <Stack
            direction="row"
            paddingX="1.5rem"
            paddingY="1rem"
            height="58px"
            bgColor="gray.0"
            borderBottomRadius="2xl"
            justifyContent="space-between"
          >
            <Text color="white">{countdown.title}</Text>
          </Stack>
        </GLink>
      )}
    </Box>
  );
};
