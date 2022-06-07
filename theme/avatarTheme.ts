export const avatarTheme = {
  Avatar: {
    baseStyle: {
      container: {
        overflow: 'hidden',
        rounded: 'lg',
      },
    },
    variants: {
      square: {
        excessLabel: {
          rounded: 'lg',
        },
        container: {
          rounded: 'lg',
        },
        badge: {
          rounded: 'lg',
        },
        image: {
          rounded: 'lg',
        },
      },
      circle: {
        excessLabel: {
          rounded: 'full',
        },
        container: {
          rounded: 'full',
        },
        badge: {
          rounded: 'full',
        },
      },
    },
    sizes: {
      '2xs': {
        container: {
          width: '1.5rem',
          height: '1.5rem',
        },
        label: {
          fontSize: `calc(1.5rem / 2.5)`,
          lineHeight: '1.5rem',
        },
      },
      xs: {
        container: {
          width: '2rem',
          height: '2rem',
        },
        label: {
          fontSize: `calc(2rem / 2.5)`,
          lineHeight: '2rem',
        },
      },
      sm: {
        container: {
          width: '2.5rem',
          height: '2.5rem',
        },
        label: {
          fontSize: `calc(2.5rem / 2.5)`,
          lineHeight: '2.5rem',
        },
      },
      md: {
        container: {
          width: '2.75rem',
          height: '2.75rem',
        },
        label: {
          fontSize: `calc(2.75rem / 2.5)`,
          lineHeight: '2.75rem',
        },
      },
      lg: {
        container: {
          width: '3rem',
          height: '3rem',
        },
        label: {
          fontSize: `calc(3rem / 2.5)`,
          lineHeight: '3rem',
        },
      },
      xl: {
        container: {
          width: '3.25rem',
          height: '3.25rem',
        },
        label: {
          fontSize: `calc(3.25rem / 2.5)`,
          lineHeight: '3.25rem',
        },
      },
      '2xl': {
        container: {
          width: '4rem',
          height: '4rem',
        },
        label: {
          fontSize: `calc(4rem / 2.5)`,
          lineHeight: '4rem',
        },
      },
    },
    defaultProps: {
      size: 'md',
      variant: 'square',
    },
  },
};
