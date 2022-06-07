export const radioTheme = {
  Radio: {
    baseStyle: {
      _hover: {
        control: {
          borderColor: 'gray.40',
        },
      },
      control: {
        bg: 'transparent',
        borderColor: 'gray.-20',
        _hover: {
          borderColor: 'gray.40',
        },
        _checked: {
          bg: 'transparent',
          borderColor: 'primary.60',
          color: 'white',
          outline: 'none',
          _before: {
            w: '100%',
            h: '100%',
            bg: 'primary.90',
            opacity: '0.4',
          },
          _hover: {
            bg: 'transparent',
            borderColor: 'primary.60',
          },
        },
        _disabled: {
          bg: 'transparent',
          borderColor: 'gray.-20',
          _hover: {
            borderColor: 'gray.-20',
          },
        },
        _focus: {
          outline: 'none',
        },
      },
      label: {
        fontSize: 's',
      },
    },
    sizes: {
      md: {
        control: {
          w: 5,
          h: 5,
        },
      },
    },
  },
};
