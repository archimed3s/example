export const accordionTheme = {
  Accordion: {
    baseStyle: {
      container: {
        bg: 'gray.-130',
        rounded: 'lg',
        border: 'none',
        mb: { base: 3, lg: 4 },
        _last: {
          mb: 0,
        },
      },
      button: {
        fontSize: 's2',
        fontWeight: { base: 600, lg: 500 },
        justifyContent: 'space-between',
        color: 'white',
        _focus: {
          boxShadow: 'none',
        },
        px: { base: 5, lg: 6 },
        py: { base: 4, lg: 4 },
        svg: {
          color: 'gray.100',
        },
        _expanded: {
          svg: {
            color: 'white',
          },
        },
      },
      panel: {
        fontSize: { base: 's1', lg: 's2' },
        color: 'gray.120',
        pt: 0,
        px: { base: 5, lg: 6 },
        pb: { base: 4, lg: 6 },
      },
      icon: {
        fontSize: { base: '1.25rem', lg: '2rem' },
      },
    },
    sizes: {
      sm: {
        button: {
          fontSize: 's2',
          fontWeight: 600,
          px: 4,
          py: 3,
        },
        panel: {
          pt: 0,
          px: 4,
          pb: 3,
        },
        container: {
          mb: 2,
          _last: {
            mb: 0,
          },
        },
      },
      lg: {
        button: {
          px: 8,
          py: 5,
        },
        panel: {
          pt: 0,
          px: 8,
          pb: 6,
        },
      },
    },
  },
};
