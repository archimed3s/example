import { Box, chakra } from '@chakra-ui/react';

export const TableWrapper = chakra(Box, {
  baseStyle: {
    paddingX: '3',
    paddingBottom: '3',
    background: 'gray.-140',
    borderRadius: 22,
  },
});
