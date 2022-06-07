const brandRing = {
  ring: 2,
  ringColor: 'gray.-60',
  ringInset: 'inset',
};

export const buttonsTheme = {
  Button: {
    baseStyle: {
      fontSize: 's2',
      fontWeight: '600',
      color: 'white',
      lineHeight: '24px',
      padding: '8px 20px',
      _focus: {
        outline: 'none',
        boxShadow: 'none',
      },
      _disabled: {
        bg: 'gray.-60',
        opacity: '0.5',
        color: 'gray.100',
      },
    },
    variants: {
      gray: {
        bg: 'gray.-120',
        bgGradient: 'linear-gradient(24.13deg, #59659E 0%, #8B99DD 100%)',
        shadow: 'b4',
        _hover: {
          bgGradient:
            'linear-gradient(0deg, rgba(169, 183, 255, 0.2), rgba(169, 183, 255, 0.2)), linear-gradient(24.13deg, #59659E 0%, #8B99DD 100%)',
        },
      },
      primary: {
        bg: 'primary.60',
        bgGradient: 'linear-gradient(211.17deg, #BB83F4 0%, #6A32CB 100%)',
        shadow: 'b4',
        _hover: {
          bgGradient:
            'linear-gradient(0deg, rgba(252, 96, 255, 0.1), rgba(252, 96, 255, 0.1)), linear-gradient(211.17deg, #BB83F4 0%, #6A32CB 100%)',
        },
      },
      support: {
        bg: '#27B1DD',
        bgGradient: 'linear-gradient(24.13deg, #4166E9 0%, #27B1DD 100%)',
        shadow: 'b4',
        _hover: {
          bgGradient:
            'linear-gradient(0deg, rgba(87, 255, 225, 0.1), rgba(87, 255, 225, 0.1)), linear-gradient(24.13deg, #4166E9 0%, #27B1DD 100%)',
        },
      },
      payment: {
        bg: '#028C84',
        bgGradient: 'linear-gradient(211.17deg, #1DC25F 0%, #028C84 100%)',
        shadow: 'b4',
        _hover: {
          bgGradient:
            'linear-gradient(0deg, rgba(149, 255, 191, 0.1), rgba(149, 255, 191, 0.1)), linear-gradient(211.17deg, #1DC25F 0%, #028C84 100%)',
        },
      },
      blur: {
        bg: 'rgba(29, 34, 52, 0.45)',
        backdropFilter: 'auto',
        backdropBlur: '30px',
        _hover: {
          bg: 'rgba(29, 34, 52, 0.45)',
        },
      },
      security: {
        bg: '#E57B2E',
        bgGradient: 'linear-gradient(225deg, #F3D227 0%, #E57B2E 100%)',
        shadow: 'b4',
        _hover: {
          bgGradient:
            'linear-gradient(0deg, rgba(255, 251, 154, 0.1), rgba(255, 251, 154, 0.1)), linear-gradient(225deg, #F3D227 0%, #E57B2E 100%)',
        },
      },
      outline: {
        ...brandRing,
        border: '0',
        bg: 'transparent',
        _hover: {
          bg: 'transparent',
          ringColor: 'gray.30',
        },
        _focus: {
          boxShadow: 'gray.30',
        },
      },
      default: {
        bg: 'gray.-60',
        shadow: 'b1',
        _hover: {
          bgGradient: 'linear-gradient(24.13deg, rgba(89, 101, 158, 0.5) 0%, rgba(139, 153, 221, 0.5) 100%)',
          shadow: 'b2',
        },
      },
      alternate: {
        bg: 'gray.-120',
        shadow: 'b1',
        svg: {
          color: 'gra.160',
        },
        _hover: {
          bgGradient: 'linear-gradient(24.13deg, rgba(89, 101, 158, 0.5) 0%, rgba(139, 153, 221, 0.5) 100%)',
          shadow: 'b2',
          svg: {
            color: 'white',
          },
        },
      },
      ghost: {
        bg: 'transparent',
        _hover: {
          bg: 'gray.-50',
          bgGradient: 'linear-gradient(24.13deg, rgba(89, 101, 158, 0.5) 0%, rgba(139, 153, 221, 0.5) 100%)',
          shadow: 'b2',
        },
      },
      link: {
        color: 'gray.120',
        svg: {
          color: 'gray.120',
        },
        _hover: {
          color: 'white',
          textDecoration: 'none',
          svg: {
            color: 'white',
          },
        },
        _disabled: {
          bg: 'none',
        },
      },
      round: {
        bg: 'gray.-120',
        rounded: 'full',
        shadow: 'b1',
        fontSize: '1.5rem',
        svg: {
          color: 'gray.160',
        },
        _hover: {
          bgGradient: 'linear-gradient(24.13deg, rgba(89, 101, 158, 0.5) 0%, rgba(139, 153, 221, 0.5) 100%)',
          shadow: 'b2',
          svg: {
            color: 'white',
          },
        },
      },
      tag: {
        bg: 'gray.-120',
        shadow: 'b1',
        rounded: 'full',
        color: 'gray.160',
        textTransform: 'uppercase',
        _focus: {
          shadow: 'b1',
        },
        _active: {
          bg: 'rgba(128, 63, 217, 0.2)',
          shadow: 'b3',
          color: 'white',
        },
      },
      flatGray: {
        bg: 'gray.-60',
        color: 'white',
      },
      unstyled: {
        bg: 'none',
        color: 'inherit',
        display: 'inline',
        lineHeight: 'inherit',
        m: 0,
        p: 0,
      },
    },
    sizes: {
      xs: {
        height: '24px',
        minWidth: '24px',
      },
      sm: {
        height: '32px',
        minWidth: '32px',
      },
      md: {
        height: '44px',
        minWidth: '44px',
      },
      squareXs: {
        px: '1',
        py: '1',
      },
      squareSm: {
        px: '2',
        py: '2',
      },
      squareMd: {
        px: '2.5',
        py: '2.5',
      },
      squareLg: {
        px: '4',
        py: '4',
      },
    },
    defaultProps: {
      variant: 'primary',
      size: 'md',
    },
  },
};
