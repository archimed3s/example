import { ThemeComponents } from '@chakra-ui/react';

export const modalTheming: ThemeComponents = {
  ModalBody: {
    baseStyle: {
      padding: 6,
    },
  },
  Modal: {
    baseStyle: {
      dialog: {
        bg: 'gray.-120',
      },

      header: {
        padding: 6,
      },

      body: {
        padding: 6,
      },

      footer: {
        padding: 6,
      },
    },
    variants: {
      payment: {
        dialogContainer: {
          overflow: 'unset',
        },
      },
    },
  },
};
