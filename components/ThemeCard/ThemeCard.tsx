import { Box, BoxProps, Flex, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';

// TODO: align NextJS and Storybook image loaders
import bgBlue from './static/blue_bg.png';
import bgCoral from './static/coral_bg.png';
import imgKing from './static/king.png';
import imgMage from './static/mage.png';
import bgPurple from './static/purple_bg.png';
import imgThief from './static/thief.png';

export type ThemeCardProps = BoxProps & {
  id: string;
  titleText?: string;
  subText?: string;
  href?: string;
  variant: 'purple' | 'coral' | 'blue';
};

const variants = {
  purple: {
    themeCard: {
      bgGradient: 'linear(to-bl, gradientPurple.0, gradientPurple.100);',
    },
    themeCardContainer: {
      bgImage: String(bgPurple.src || bgPurple),
    },
    themeCardPicture: {
      src: String(imgKing.src || imgKing),
      height: 221,
      width: 240,
    },
  },
  coral: {
    themeCard: {
      bgGradient: 'linear(to-bl, gradientCoral.0, gradientCoral.100)',
    },
    themeCardContainer: {
      bgImage: String(bgCoral.src || bgCoral),
    },
    themeCardPicture: {
      src: String(imgMage.src || imgMage),
      height: 221,
      width: 240,
    },
  },
  blue: {
    themeCard: {
      bgGradient: 'linear(to-bl, gradientBlue.0, gradientBlue.100)',
    },
    themeCardContainer: {
      bgImage: String(bgBlue.src || bgBlue),
    },
    themeCardPicture: {
      src: String(imgThief.src || imgThief),
      height: 221,
      width: 240,
    },
  },
};

const styleProps = {
  themeCard: {
    h: '178px',
    borderRadius: '0.75rem',
    pl: '2rem',
    flexGrow: 1,
    minW: '335px',
  },
  themeCardContainer: {
    justify: 'flex-start',
    align: 'center',
    h: '100%',
    bgPosition: '100%',
    bgRepeat: 'no-repeat',
  },
};

export const ThemeCard: FC<ThemeCardProps> = ({ titleText, subText, href, variant }) => (
  <Box as="a" href={href} {...styleProps.themeCard} {...variants[variant].themeCard}>
    <Flex position="relative" {...styleProps.themeCardContainer} {...variants[variant].themeCardContainer}>
      <Box>
        <Text textStyle="lg" color="white" fontWeight="600">
          {titleText}
        </Text>
        <Text textStyle="s" color="whiteTransparent.60" fontWeight="600">
          {subText}
        </Text>
      </Box>
      <Flex position="absolute" bottom={0} right={0}>
        <Image alt={titleText} {...variants[variant].themeCardPicture} />
      </Flex>
    </Flex>
  </Box>
);
