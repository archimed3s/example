export const inputsTheme = {
  Input: {
    sizes: {
      md: '40px',
    },
    baseStyle: {
      field: {
        color: 'white',
        padding: '8px 16px',
        bg: 'gray.-140',
        borderRadius: 'xl',
        border: '1px solid gray.-80',
        _placeholder: {
          color: 'gray.40',
        },
        _hover: {
          borderColor: 'gray.0',
        },
      },
    },
    defaultProps: {
      size: 'md',
      focusBorderColor: 'gray.120',
      errorBorderColor: 'watermelon',
    },
  },
  Textarea: {
    defaultProps: {
      size: 'md',
      focusBorderColor: 'gray.120',
      errorBorderColor: 'watermelon',
    },
  },
  Switch: {
    baseStyle: {
      track: {
        bg: 'gray.-80',
        boxShadow: 'inset 0px 1.4px 0px rgba(139, 150, 190, 0.15)',
        _checked: {
          boxShadow: 'inset 0px 1.4px 0px rgba(255, 255, 255, 0.22)',
          bgGradient: 'linear-gradient(211.17deg, primary.60 0%, primary.50 100%);',
        },
      },
    },
  },
};
