export const switchTheme = {
  Switch: {
    baseStyle: {
      container: {},
      track: {
        bg: 'gray.-80',
        shadow: 'b1',
        p: 1,
        _checked: {
          bg: 'gradientPurple.100',
          bgGradient: 'linear-gradient(211.17deg, gradientPurple.0 0%, gradientPurple.100 100%);',
          shadow: 'b4',
          _invalid: {
            bg: 'gradientCoral.100',
            bgGradient: 'linear-gradient(45deg, gradientCoral.0 0%, gradientCoral.100 100%);',
          },
        },
      },
      thumb: {
        w: 4,
        h: 4,
      },
    },
    sizes: {
      sm: {
        container: {
          w: '1.375rem',
          h: '0.75rem',
        },
        track: {
          p: 0.5,
        },
        thumb: {
          w: 3,
          h: 3,
        },
      },
      md: {
        container: {
          w: '2.5rem',
          h: '1.5rem',
        },
      },
      lg: {
        container: {
          w: '2.875rem',
          h: '1.5rem',
        },
        thumb: {
          w: 6,
          h: 6,
        },
      },
    },
  },
};
