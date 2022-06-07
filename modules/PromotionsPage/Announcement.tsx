import { Box, BoxProps, HStack, Text } from '@chakra-ui/react';

import { HornIcon } from './HornIcon';

type AnnouncementProps = Pick<BoxProps, 'gridArea' | 'width' | 'gridColumn'> & {
  text: string;
};

export const Announcement = ({ text, ...stackProps }: AnnouncementProps) => {
  return !text ? null : (
    <HStack
      {...stackProps}
      backgroundColor="gray.-100"
      borderRadius={16}
      padding={4}
      spacing={4}
      alignItems="flex-start"
    >
      <Box>
        <HornIcon />
      </Box>
      <Text textStyle="s2" color="white">
        {text}
      </Text>
    </HStack>
  );
};
