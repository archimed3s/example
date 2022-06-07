import { Box, Flex, FlexProps, HStack, Spacer, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

type SectionHeaderProps = FlexProps & {
  headerTitle: string;
  dataTestId?: string;
  pagination?: boolean;
  paginationText?: string;
  children?: ReactNode;
};

const styleProps = {
  iconContainer: {
    bgGradient: 'linear(to-b, #2C344E 0%, #1A1F32 100%)',
    rounded: 'full',
    w: 8,
    h: 8,
    p: 0.5,
  },
  iconContent: {
    bg: 'gray.-100',
    rounded: 'full',
    w: 'full',
    h: 'full',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export const SectionHeader: FC<SectionHeaderProps> = ({
  headerTitle,
  dataTestId,
  pagination,
  paginationText,
  children,
  ...props
}) => (
  <Flex data-testid={dataTestId} {...props}>
    <HStack spacing={2}>
      <Box color="white" textStyle="md2">
        {headerTitle}
      </Box>
    </HStack>
    <Spacer />
    {pagination && (
      <HStack flexShrink={0} spacing={4}>
        <Text textStyle="s" fontWeight={600} color="white">
          {paginationText}
        </Text>
        <HStack spacing={2}>{children}</HStack>
      </HStack>
    )}
  </Flex>
);
