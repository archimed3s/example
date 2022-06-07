export const checkboxTheme = {
  Checkbox: {
    baseStyle: {
      boxShadow: 'none',
      _hover: {
        control: {
          borderColor: 'gray.40',
        },
      },
      control: {
        bg: 'transparent',
        borderColor: 'gray.-20',
        rounded: 'lg',
        outline: 'none',
        _hover: {
          borderColor: 'gray.40',
        },
        _checked: {
          bg: 'transparent',
          borderColor: 'primary.60',
          color: 'white',
          outline: 'none',
          css: '& svg { display: block; }',
          boxShadow: 'none',
          _hover: {
            bg: 'transparent',
            borderColor: 'primary.60',
          },
        },
        _focus: {
          outline: 'none',
          boxShadow: 'none',
        },
        icon: {
          display: 'none',
        },
      },
      label: {
        fontSize: 's',
        color: 'gray.160',
        _checked: {
          color: 'white',
        },
      },
    },
    sizes: {
      md: {
        control: {
          w: 5,
          h: 5,
        },
        icon: {
          fontSize: '1rem',
        },
      },
    },
  },
};
