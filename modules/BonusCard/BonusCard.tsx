import { Box, BoxProps, Flex, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { Progress } from '@components/Progress/Progress';

// TODO: align NextJS and Storybook image loaders
import bgBlue from './static/blue_bg.png';
import bgCoral from './static/coral_bg.png';
import imgCup from './static/cup.png';
import bgGreen from './static/green_bg.png';
import bgOrange from './static/orange_bg.png';
import bgPurple from './static/purple_bg.png';
import bgTeal from './static/teal_bg.png';

export type VariantKey = 'purple' | 'coral' | 'blue' | 'green' | 'orange' | 'teal';

export type BonusCardProps = BoxProps & {
  bonusName?: string;
  endsAt?: string;
  variant: VariantKey;
  children?: React.ReactNode;
};

export type BonusCardProgressProps = BoxProps & {
  wager?: string;
  remaining?: string;
  progress?: number;
  variant: VariantKey;
};

const messages = defineMessages({
  availableUntil: {
    id: 'BonusCard.availableUntil',
    defaultMessage: 'Available until ',
  },
  wager: {
    id: 'BonusCard.wager',
    defaultMessage: 'Wager ',
  },
  remaining: {
    id: 'BonusCard.remaining',
    defaultMessage: 'Remaining ',
  },
});

const variants = {
  purple: {
    bonusCard: {
      bgGradient: 'linear(to-tr, gradientPurple.100, gradientPurple.0);',
    },
    bonusCover: {
      bgImage: String(bgPurple.src || bgPurple),
    },
  },
  coral: {
    bonusCard: {
      bgGradient: 'linear(to-tr, gradientCoral.100, gradientCoral.0);',
    },
    bonusCover: {
      bgImage: String(bgCoral.src || bgCoral),
    },
  },
  blue: {
    bonusCard: {
      bgGradient: 'linear(to-tr, gradientBlue.0, gradientBlue.100);',
    },
    bonusCover: {
      bgImage: String(bgBlue.src || bgBlue),
    },
  },
  green: {
    bonusCard: {
      bgGradient: 'linear(to-tr, gradientGreen.0, gradientGreen.100);',
    },
    bonusCover: {
      bgImage: String(bgGreen.src || bgGreen),
    },
  },
  orange: {
    bonusCard: {
      bgGradient: 'linear(to-tr, gradientOrange.0, gradientOrange.100);',
    },
    bonusCover: {
      bgImage: String(bgOrange.src || bgOrange),
    },
  },
  teal: {
    bonusCard: {
      bgGradient: 'linear(to-tr, gradientTeal.0, gradientTeal.100);',
    },
    bonusCover: {
      bgImage: String(bgTeal.src || bgTeal),
    },
  },
};

const styleProps = {
  bonusCard: {
    borderRadius: '16px',
    overflow: 'hidden',
    width: '100%',
  },
  bonusCover: {
    height: { base: '192px', md: '236px' },
    paddingTop: { base: 10, md: 14 },
    bgSize: { base: '408px 192px', md: '503px 236px' },
    width: '100%',
    bgPosition: '50% 0',
    bgRepeat: 'no-repeat',
    justify: 'center',
    align: 'center',
  },
  bonusPicture: {
    width: { base: '113px', md: '139px' },
    height: { base: '132px', md: '162px' },
  },
  bonusTag: {
    textStyle: 's',
    fontWeight: '600',
    color: 'white',
    background: 'rgba(193, 206, 255, 0.3)',
    borderRadius: '100px',
    py: 1,
    px: 3,
    noOfLines: 1,
  },
  bonusImage: {
    display: 'block',
    width: '100%',
    height: '100%',
    src: String(imgCup.src || imgCup),
  },
  bonusContainer: {
    py: 4,
    px: 6,
    background: 'gray.-80',
    height: { base: '148px', md: '174px' },
  },
  bonusTitle: {
    textStyle: 'md',
    color: 'white',
    fontWeight: '600',
    noOfLines: 2,
  },
  bonusBar: {
    height: '8px',
    width: '100%',
    background: 'gray.-20',
    borderRadius: '100px',
    overflow: 'hidden',
  },
  bonusProgress: {
    height: '100%',
  },
  bonusText: {
    textStyle: 's',
    color: 'gray.120',
  },
  bonusValue: {
    textStyle: 's',
    color: 'white',
    display: { base: 'block', md: 'inline' },
  },
};

export const BonusCardProgress: FC<BonusCardProgressProps> = ({ wager, remaining, progress, variant }) => {
  return (
    <Box width="100%" position="absolute" left={0} bottom={0}>
      <Flex justify="space-between">
        <Text {...styleProps.bonusText}>
          <FormattedMessage {...messages.wager} />
          <Text as="b" {...styleProps.bonusValue}>
            {wager}
          </Text>
        </Text>
        <Text {...styleProps.bonusText} textAlign="right">
          <FormattedMessage {...messages.remaining} />
          <Text as="b" {...styleProps.bonusValue}>
            {remaining}
          </Text>
        </Text>
      </Flex>
      <Progress value={progress} variant={variant} />
    </Box>
  );
};

export const BonusCard: FC<BonusCardProps> = ({ bonusName, endsAt, variant, children, ...props }) => {
  return (
    <Box {...styleProps.bonusCard} {...variants[variant].bonusCard} {...props}>
      <Flex {...styleProps.bonusCover} {...variants[variant].bonusCover} position="relative">
        <Box {...styleProps.bonusTag} position="absolute" top="12px" left="12px">
          <FormattedMessage {...messages.availableUntil} />
          {endsAt}
        </Box>
        <Box {...styleProps.bonusPicture}>
          <Image {...styleProps.bonusImage} alt={bonusName} />
        </Box>
      </Flex>
      <Box
        {...styleProps.bonusContainer}
        height={{ base: children ? '148px' : '96px', md: children ? '174px' : '96px' }}
      >
        <Box position="relative" width="100%" height="100%">
          <Text {...styleProps.bonusTitle}>{bonusName}</Text>
          {children}
        </Box>
      </Box>
    </Box>
  );
};
