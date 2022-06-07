import { ThemeConfig, extendTheme } from '@chakra-ui/react';
import { StyleFunctionProps, mode } from '@chakra-ui/theme-tools';
import { Dict } from '@chakra-ui/utils';

import { accordionTheme } from './accordionTheme';
import { alertTheming } from './alertTheme';
import { avatarTheme } from './avatarTheme';
import { buttonsTheme } from './buttonsTheme';
import { checkboxTheme } from './checkboxTheme';
import { colors } from './colorsTheme';
import { inputsTheme } from './inputsTheme';
import { modalTheming } from './modalTheming';
import { progressTheme } from './progressTheme';
import { radioTheme } from './radioTheme';
import { switchTheme } from './switchTheme';
import { tableTheme } from './tableTheme';
import { tooltipTheme } from './tooltipTheme';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const fonts = {
  body: 'AvertaStd, system-ui, sans-serif',
  heading: 'AvertaStd, system-ui, sans-serif',
  mono: 'AvertaStd, system-ui, sans-serif',
};

const textStyles = {
  h1: {
    color: colors.white,
    fontSize: '2.3125rem',
    fontWeight: 600,
    lineHeight: '2.75rem',
    letterSpacing: '-1px',
    mb: 8,
  },
  h2: {
    color: colors.white,
    fontSize: '1.75rem',
    lineHeight: '2.25rem',
    letterSpacing: '-0.5px',
    mb: 3,
  },
  h3: {
    color: colors.white,
    fontSize: '1.5rem',
    lineHeight: '2rem',
    letterSpacing: '-0.5px',
    mb: 3,
  },
  paragraph: {
    color: 'gray.120',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    mb: 6,
  },
  xs: {
    fontSize: '0.75rem',
    lineHeight: '1rem',
  },
  xs2: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
  s: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
  s2: {
    fontSize: '1.125rem',
    lineHeight: '1.625rem',
  },
  md: {
    fontSize: '1.3125rem',
    lineHeight: '1.625rem',
    letterSpacing: '-0.5px',
  },
  md2: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    letterSpacing: '-0.5px',
  },
  lg: {
    fontSize: '1.75rem',
    lineHeight: '2.25rem',
    letterSpacing: '-0.5px',
  },
  lg2: {
    fontSize: '2.3125rem',
    lineHeight: '2.75rem',
    letterSpacing: '-1px',
  },
  xl: {
    fontSize: '3.0625rem',
    lineHeight: '106%',
    letterSpacing: '-1px',
  },
  xl2: {
    fontSize: '3.5rem',
    lineHeight: '107%',
    letterSpacing: '-1.5px',
  },
  xl3: {
    fontSize: '4.0625rem',
    lineHeight: '98%',
    letterSpacing: '-2px',
    fontWeight: '600',
  },
};

const fontSizes = {
  xs1: '0.75rem',
  xs2: '0.875rem',
  s1: '0.875rem',
  s2: '1rem',
  s3: '1.125rem',
  m1: '1.313rem',
  m2: '1.5rem',
  m3: '1.75rem',
  l1: '2.313rem',
  l2: '3.063rem',
  l3: '3.25rem',
  xl1: '3.5rem',
  xl2: '4.063rem',
};

const components = {
  ...alertTheming,
  ...avatarTheme,
  ...accordionTheme,
  ...buttonsTheme,
  ...tooltipTheme,
  ...inputsTheme,
  ...modalTheming,
  ...checkboxTheme,
  ...radioTheme,
  ...switchTheme,
  ...tableTheme,
  ...progressTheme,
  Link: {
    baseStyle: {
      _hover: {
        textDecoration: 'none',
      },
    },
    variants: {
      menu: {
        color: 'gray.160',
        _hover: {
          color: 'white',
          svg: {
            color: 'primary.70',
          },
        },
      },
    },
  },
  Divider: {
    variants: {
      gradient: {
        bgGradient:
          'linear-gradient(90deg, rgba(103, 117, 169, 0.01) 0%, rgba(103, 117, 169, 0.2) 48.96%, rgba(103, 117, 169, 0.01) 100%)',
      },
    },
  },
  StackDivider: {
    variants: {
      gradient: {
        bgGradient:
          'linear-gradient(90deg, rgba(103, 117, 169, 0.01) 0%, rgba(103, 117, 169, 0.2) 48.96%, rgba(103, 117, 169, 0.01) 100%)',
      },
    },
  },
};

const radii = {
  none: '0',
  sm: '0.5rem',
  base: '0.5rem',
  md: '0.5rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

const shadows = {
  b1: 'inset 0px 1.4px 0px rgba(139, 150, 190, 0.15)',
  b2: 'inset 0px 1.4px 0px rgba(139, 150, 190, 0.3)',
  b3: 'inset 0px 1.4px 0px rgba(173, 118, 249, 0.2)',
  b4: 'inset 0px 1.4px 0px rgba(255, 255, 255, 0.22)',
};

// Default breakpoints
const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
};

const globalStyles = {
  global: (props: Dict | StyleFunctionProps) => ({
    body: {
      bg: mode('', colors.gray['-140'])(props),
      bgGradient: mode('', 'linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 12.6%), #131621;')(props),
      color: 'gray.120',
    },
    '*::-webkit-scrollbar': {
      width: '4px',
      height: '4px',
    },
    '*::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: mode('', colors.gray['40'])(props),
      borderRadius: '6px',
    },
    '*': {
      scrollbarWidth: 'thin',
      scrollbarColor: mode('', `${colors.gray['40']} transparent`)(props),
    },
  }),
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  fontSizes,
  components,
  styles: globalStyles,
  radii,
  shadows,
  textStyles,
  breakpoints,
});

export { theme };
