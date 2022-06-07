import { ThemeComponents } from '@chakra-ui/react';

export const tableTheme: ThemeComponents = {
  Table: {
    baseStyle: {
      th: {
        fontWeight: 'normal',
        textTransform: 'none',
      },
    },
    variants: {
      striped: {
        th: {
          color: 'gray.80',
          border: 'none',
        },
        td: {
          color: 'gray.160',
          border: 'none',
        },
        tbody: {
          tr: {
            '&:nth-of-type(odd)': {
              td: {
                background: 'gray.-120',

                '&:first-of-type': {
                  borderLeftRadius: 8,
                },
                '&:last-of-type': {
                  borderRightRadius: 8,
                },
              },
            },
          },
        },
      },
    },
    sizes: {
      md: {
        th: {
          padding: '3',
          fontSize: 'md',
          lineHeight: '6',
        },
        td: {
          padding: '3',
          lineHeight: '6',
        },
      },
    },
  },
};
