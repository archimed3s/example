import { Box, Stack } from '@chakra-ui/react';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Typography',
  component: Box,
};

export const AllButtons = () => (
  <>
    <Stack>
      <Box textStyle="xs">XS - 12px/16px</Box>
      <Box textStyle="xs2">XS2 - 14px/20px</Box>
      <Box textStyle="s">S - 16px/24px</Box>
      <Box textStyle="s2">S2 - 18px/26px</Box>
      <Box textStyle="md">MD - 21px/26px</Box>
      <Box textStyle="md2">MD2 - 24px/32px</Box>
      <Box textStyle="lg">LG - 28px/36px</Box>
      <Box textStyle="lg2">LG2 - 37px/44px</Box>
      <Box textStyle="xl">XL - 49px/52px</Box>
      <Box textStyle="xl2">XL2 - 56px/60px</Box>
      <Box textStyle="xl3">XL3 - 65px/64px</Box>
    </Stack>
  </>
);
