import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import bgDesktop from './static/banner_bg_desktop.png';
import bgMobile from './static/banner_bg_mobile.png';
import imgKing from './static/king.png';

type VariantKey = 'mobile' | 'desktop';

type BannerProps = {
  bannerTitle?: string;
  bannerText?: string;

  children: ReactNode;
};

const variants = {
  desktop: {
    banner: {
      height: '312px',
    },
    container: {
      bgImage: String(bgDesktop.src || bgDesktop),
      paddingLeft: '56px',
    },
    image: {
      display: 'block',
    },
    content: {
      maxWidth: '386px',
    },
    title: {
      textStyle: 'lg2',
    },
    text: {
      textStyle: 's',
    },
  },
  mobile: {
    banner: {
      height: '260px',
    },
    container: {
      bgImage: String(bgMobile.src || bgMobile),
      padding: '1.5rem',
    },
    content: {
      maxWidth: 'auto',
    },
    title: {
      textStyle: 'md2',
    },
    text: {
      textStyle: 's',
    },
    image: {
      display: 'none',
    },
  },
};

const styleProps = {
  banner: {
    bgGradient: 'linear(to-bl, gradientPurple.0, gradientPurple.100)',
    borderRadius: '16px',
    overflow: 'hidden',
  },
  container: {
    bgRepeat: 'no-repeat',
    bgPosition: '100%',
    wdth: '100%',
    height: '100%',
    alignItems: 'center',
  },
  title: {
    color: 'white',
  },
  text: {
    color: 'white',
    opacity: '0.6',
    margin: '1rem 0',
  },
  image: {
    src: String(imgKing.src || imgKing),
    quality: 100,
  },
  input: {
    size: 'md',
    borderRadius: '8px',
    p: '10px 16px',
    _placeholder: {
      fontSize: '1rem',
      lineHeight: '1.625rem',
      color: 'whiteTransparent.60',
    },
    focusBorderColor: 'auto',
  },
};

export const Banner: FC<BannerProps> = ({ bannerTitle, bannerText, children }) => {
  let variant = useBreakpointValue<VariantKey>({
    base: 'mobile',
    md: 'desktop',
  });

  if (variant === undefined) {
    variant = 'desktop';
  }

  return (
    <Box {...styleProps.banner} {...variants[variant].banner}>
      <Flex position="relative" {...styleProps.container} {...variants[variant].container}>
        <Box {...variants[variant].content}>
          <Box>
            <Text {...styleProps.title} {...variants[variant].title}>
              {bannerTitle}
            </Text>
            <Text {...styleProps.text} {...variants[variant].text}>
              {bannerText}
            </Text>
            {children}
          </Box>
        </Box>
        <Flex position="absolute" right={0} bottom={0}>
          <Image alt="king" {...styleProps.image} {...variants[variant].image} />
        </Flex>
      </Flex>
    </Box>
  );
};
