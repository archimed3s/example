import { Box, BoxProps, Image, ImageProps, Stack, StackProps } from '@chakra-ui/react';

export const ReviewWrapper = (props: StackProps) => (
  <Stack
    rounded="xl"
    bgGradient={{
      base: 'linear(to-tr, gray.-130, gray.-100)',
      sm: 'radial(gray.-110 0%, gray.-130 100%)',
    }}
    padding={5}
    width="full"
    {...props}
  />
);

export const ReviewAvatar = (props: ImageProps) => <Image width="40px" height="40px" {...props} />;

export const ReviewMessage = (props: BoxProps) => (
  <Box
    textStyle={{
      base: 's2',
      sm: 'md',
    }}
    color="white"
    maxHeight="200px"
    overflow="hidden"
    {...props}
  />
);

export const ReviewAuthor = (props: BoxProps) => <Box textStyle="s2" color="gray.120" {...props} />;
